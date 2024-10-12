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
    const [visibleCount, setVisibleCount] = useState(3); // State to track the number of visible posts
    const variablesNew = {
        filter: {
            category_id: {
                eq: activeTab2, // Updated to handle multiple IDs
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
        let fetchedData: BlogPost[] = []; // Initialize an array to hold all fetched data

        if (activeTab2 === 19) {
            const categoryIds = [9, 10, 12, 14, 20, 27, 21]; // Đảm bảo ID 9 có trong danh sách
            const fetchPromises = categoryIds.map(async (id) => {
                const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: queryBNew,
                        variables: {
                            filter: {
                                category_id: { eq: id }, // Fetch for each category ID
                            },
                            pageSize: 500,
                            currentPage: 1,
                            sortFiled: "publish_time",
                            allPosts: false,
                            sort: ["DESC"],
                        },
                    }),
                });
                const data = await response.json();
                return data.data.blogPosts.items; // Return the fetched items
            });

            // Wait for all fetch promises to resolve
            const results = await Promise.all(fetchPromises);
            fetchedData = results.flat(); // Flatten the array of arrays
        } else {
            // Use variablesNew only for other activeTab2 values
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
            fetchedData = data.data.blogPosts.items; // Use the single fetch result
        }

        // Remove duplicates based on post_id
        const uniquePosts = Array.from(new Map(fetchedData.map(post => [post.post_id, post])).values());

        // Sắp xếp theo ngày gần đây nhất
        uniquePosts.sort((a, b) => new Date(b.creation_time).getTime() - new Date(a.creation_time).getTime());
        setNewsData2(uniquePosts); // Set the combined data
    }

    const loadMorePosts = () => {
        setVisibleCount(prevCount => prevCount + 3); // Increase the count by 3
    };

    useEffect(() => {
        fetchBlogPostsDataNew();
        setVisibleCount(3);
    }, [activeTab2]);

    console.log("New news data 2:>>>>>", newsData2);

    return (
        <div className="header-BodyBNew2">
            {newsData2 && newsData2.length > 0 ? (
                <>
                    <h2 className='header-BodyBNew2-title'>Tin tức mới nhất</h2>
                    <Row>
                        <Col span={14}>
                            {newsData2.slice(0, visibleCount).map((post, index) => (
                                <div style={{ display: 'flex', marginBottom: "10px" }} key={index}>
                                    <a style={{ display: 'flex' }} href={post.post_url}>
                                        <img className='header-BodyBNew2-img' src={post.first_image} alt='' />
                                        <div style={{ padding: "10px" }}>
                                            <h2 className='header-BodyBNew2-titleSub'>{post.title}</h2>
                                            <div className="header-BodyBNew2-cardPostView-tabInfo">
                                                <div className="author">
                                                    <Image
                                                        alt="User icon"
                                                        loading="lazy"
                                                        className='header-BodyBNew2-icUser'
                                                        src={icUser}
                                                    />
                                                </div>
                                                <span>{post.author.name}</span>
                                                <div>
                                                    <span>{post.creation_time}</span>
                                                </div>
                                            </div>
                                            <p className='header-BodyBNew2-cardPostView-view'>{post.views_count} lượt xem</p>
                                        </div>
                                    </a>
                                </div>
                            ))}
                            {visibleCount < (newsData2.length) && (
                                <button onClick={loadMorePosts} className="header-BodyBNew2-cardPostView-load-more-button">Xem thêm</button>
                            )}
                        </Col>
                        <Col span={10}>
                            hello
                        </Col>
                    </Row>

                </>
            ) : null}
        </div>
    );
}