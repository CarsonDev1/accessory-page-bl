"use client";
import React, { useEffect, useState } from 'react';
import './BodyBNew.scss';
import { Col, Row, Spin } from 'antd';
import Image from 'next/image';
import test from "../../../../public/test.png";
import icUser from "../../../../public/ic-user-4.svg";
import { Author, BlogPost, queryBNew } from '../../../app/utils/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import BodyBnew2 from "../BodyBNew2/BodyBNew2"
import { useRouter } from 'next/navigation'
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';

export default function BodyBNew() {
    const [activeTab, setActiveTab] = useState('Trang Chủ');
    const [activeTab2, setActiveTab2] = useState(19);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const tabIds: { [key: string]: number } = {
        'Trang Chủ': 19,
        'Tin Công Nghệ': 9,
        'Khám Phá': 10,
        'Đánh Giá': 12,
        'Thủ Thuật, Q&A': 14,
        'Khuyến Mãi': 20,
        'Tin Tức Sự Kiện': 27,
        'Tuyển Dụng': 21,
    };

    const [newsData, setNewsData] = useState<BlogPost[] | null>(null);
    const [newsData2, setNewsData2] = useState<BlogPost[] | null>(null);

    const variables = {
        filter: {
            category_id: {
                eq: tabIds[activeTab],
            },
            is_featured: {
                eq: 1,
            },
        },
        pageSize: 20,
        currentPage: 1,
        sortFiled: "publish_time",
        allPosts: false,
        sort: [
            "DESC"
        ],
    };

    const variablesNew = {
        filter: {
            category_id: {
                eq: tabIds[activeTab2],
            },
        },
        pageSize: 100,
        currentPage: 1,
        sortFiled: "publish_time",
        allPosts: false,
        sort: [
            "DESC"
        ],
    };

    // Fetch data for the main blog posts based on the active tab
    async function fetchBlogPostsData() {
        setLoading(true); // Set loading to true before fetching
        const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: queryBNew,
                variables,
            }),
        });
        const data = await response.json();
        setNewsData(data.data.blogPosts.items);
        setLoading(false); // Set loading to false after fetching
    }

    // Fetch data for the new blog posts based on the active tab2
    async function fetchBlogPostsDataNew() {
        setLoading(true); // Set loading to true before fetching
        const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: queryBNew,
                variables: variablesNew,
            }),
        });
        const data = await response.json();
        setNewsData2(data.data.blogPosts.items);
        setLoading(false); // Set loading to false after fetching
    }

    useEffect(() => {
        fetchBlogPostsData(); // Fetch main posts when activeTab changes
        fetchBlogPostsDataNew(); // Fetch new posts based on activeTab2

    }, [activeTab, activeTab2]);

    console.log("Main news data:", newsData);
    console.log("New news data:", newsData2);

    const tabs = [
        'Trang Chủ',
        'Tin Công Nghệ',
        'Khám phá',
        'Đánh Giá',
        'Thủ Thuật, Q&A',
        'Khuyến Mãi',
        'Tin Tức Sự Kiện',
        'Tuyển Dụng'
    ];

    return (
        <div className="header-BodyBNew">
            <nav>
                <ul className="BodyBNew-tab-list">
                    {tabs.map((tab) => (
                        <li
                            key={tab}
                            className={`BodyBNew-tab-item ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab(tab);
                                setActiveTab2(tabIds[tab]);
                            }}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </nav>
            {loading ? ( // Show loading spinner while loading
                <div className="loading-containerBnew"> {/* Centering container */}
                    <Spin size="large" />
                </div>
            ) : (
                <>

                    <div className="container">
                        <Row className='header-BodyBNew-CardRow'>
                            <Col span={14} className='header-BodyBNew-CardCol' >
                                {newsData && newsData.length > 0 && (
                                    <div className="header-BodyBNew-news-first-box">
                                        <h2 className='header-BodyBNew-titleNew'>Tin nổi bật</h2>
                                        <a className="header-BodyBNew-card-a" onClick={() => router.push(`/NewSub?data=${new URL(newsData[newsData.length - 1].post_url).pathname.split('/').pop()}`)}>
                                            <img className='header-BodyBNew-news-first-image' alt={newsData[newsData.length - 1].title} src={newsData[newsData.length - 1].first_image} />
                                        </a>
                                        <div className="header-BodyBNew-news-first-content">
                                            <h1 className="header-BodyBNew-news-first-title header-BodyBNew-t-title header-BodyBNew-c-white relative">
                                                <a className="header-BodyBNew-line-clamp-2" onClick={() => router.push(`/NewSub?data=${new URL(newsData[newsData.length - 1].post_url).pathname.split('/').pop()}`)}>
                                                    {newsData[newsData.length - 1].title}
                                                </a>
                                            </h1>
                                            <div className="header-BodyBNew-news-first-created">

                                                <div className="author">
                                                    <Image
                                                        alt="User icon"
                                                        loading="lazy"
                                                        className='header-BodyBNew-icUser'
                                                        src={icUser}
                                                    />
                                                </div>
                                                <span>{newsData[newsData.length - 1].author.name}</span>
                                                <div>
                                                    <span>{newsData[newsData.length - 1].creation_time}</span>
                                                </div>


                                                <span>{newsData[newsData.length - 1].views_count} lượt xem</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Col>
                            <Col span={10} className='header-BodyBNew-CardCol'>
                                {newsData && newsData.slice(-4, -1).map((post, index) => (
                                    <div key={index} className="header-BodyBNew-news-box">
                                        <div className="header-BodyBNew-news-image">
                                            <a className="inner-img" onClick={() => router.push(`/NewSub?data=${new URL(post.post_url).pathname.split('/').pop()}`)}>
                                                <img alt={post.title} src={post.first_image} />
                                            </a>
                                        </div>
                                        <div className="header-BodyBNew-news-content">
                                            <div className="header-BodyBNew-news-tag">Tin công nghệ</div>
                                            <h2 className="news-title t16 fw-7 relative">
                                                <a className="header-BodyBNew-line" onClick={() => router.push(`/NewSub?data=${new URL(post.post_url).pathname.split('/').pop()}`)} style={{ marginBottom: "6px" }}>
                                                    {post.title}
                                                </a>
                                            </h2>
                                            <div className="header-BodyBNew-news-first-created2">
                                                <div className="author">
                                                    <Image
                                                        alt=""
                                                        loading="lazy"
                                                        className='header-BodyBNew-icUser'
                                                        src={icUser}
                                                    />
                                                </div>
                                                <span>{post.author.name}</span>
                                                <div>
                                                    <span>{post.creation_time}</span>
                                                </div>
                                            </div>
                                            <span >{post.views_count} lượt xem</span>
                                        </div>
                                    </div>
                                ))}
                            </Col>
                        </Row>
                        <div className='header-BodyBNew-newHot'>
                            {newsData2 && newsData2.length > 0 && ( // Check if newsData2 has items
                                <>
                                    <h2 className='header-BodyBNew-titleNew'>Tin xem nhiều nhất</h2>
                                    <Swiper
                                        breakpoints={{
                                            240: {
                                                slidesPerView: 2,
                                            },
                                            768: {
                                                slidesPerView: 3,
                                            },
                                            1024: {
                                                slidesPerView: 3.6,
                                            },
                                        }}
                                        autoplay
                                        modules={[Pagination]}
                                        className="mySwiper"
                                    >
                                        {newsData2.sort((a, b) => b.views_count - a.views_count).map((post, index) => (
                                            <SwiperSlide key={index}>
                                                <a onClick={() => router.push(`/NewSub?data=${new URL(post.post_url).pathname.split('/').pop()}`)}>
                                                    <div className='header-BodyBNew-cardPostView'>
                                                        <img className='header-BodyBNew-cardPostView-img' src={post.first_image} alt={post.title} />
                                                        <h2 className='header-BodyBNew-cardPostView-title'>{post.title}</h2>
                                                        <div className="header-BodyBNew-cardPostView-tabInfo">
                                                            <div className="author">
                                                                <Image
                                                                    alt="User icon"
                                                                    loading="lazy"
                                                                    className='header-BodyBNew-icUser'
                                                                    src={icUser}
                                                                />
                                                            </div>
                                                            <span>{post.author.name}</span>
                                                            <div>
                                                                <span>{post.creation_time}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </>
                            )}
                        </div>
                        <BodyBnew2 activeTab2={activeTab2} />
                    </div>
                </>
            )}
        </div>
    );
}
