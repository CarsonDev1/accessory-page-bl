"use client";
import React, { useEffect, useState } from 'react';
import './BodyBNew2.scss';
import { Col, Row } from 'antd';
import Image from 'next/image';
import test from "../../../../public/test.png";
import icUser from "../../../../public/ic-user-4.svg";
import { BlogPost, queryBNew } from '../../../app/utils/utils';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface ProductModalProps {
    activeTab2: number;
}
export default function BodyBNew2({ activeTab2 }: ProductModalProps) {
    const [newsData2, setNewsData2] = useState<BlogPost[] | null>(null);
    const variablesNew = {
        filter: {
            category_id: {
                eq: activeTab2,
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

    async function fetchBlogPostsDataNew() {
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
    }

    useEffect(() => {
        fetchBlogPostsDataNew();
    }, [activeTab2]);

    console.log("New news data 2:>>>>>", newsData2);


    return (
        <div className="header-BodyBNew2">
            <h2 className='header-BodyBNew2-title'>Tin tức mới nhất</h2>
            <Row>

                <Col span={12}>
                    {newsData2 && newsData2.map((post, index) => (
                        <div style={{ display: 'flex' }} key={index}>
                            <img className='header-BodyBNew2-img' src={post.featured_image} alt='' />
                            <div>
                                <h2>{post.title}</h2> {/* Displaying the title of the post */}
                                <div className="header-BodyBNew2-cardPostView-tabInfo">
                                    <div className="author">
                                        <Image
                                            alt="User icon"
                                            loading="lazy"
                                            className='header-BodyBNew2-icUser'
                                            src={icUser}
                                        />
                                    </div>
                                    <span>{post.author.name}</span> {/* Assuming post has an authorName */}
                                    <div>
                                        <span>{post.creation_time}</span> {/* Assuming post has a publishTime */}
                                    </div>
                                </div>
                                <p>{post.views_count} lượt xem</p> {/* Assuming post has a viewCount */}
                            </div>
                        </div>
                    ))}    </Col>

                <Col span={12}>
                    hello
                </Col>
            </Row>
        </div>
    );
}
