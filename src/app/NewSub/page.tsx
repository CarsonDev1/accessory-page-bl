"use client"

import React, { useEffect, useState } from 'react';
import { queryBNewDetail } from '../../app/utils/utils';
import "./NewSub.scss"
import icBachLong from "../../../public/ic-bachlong.webp"
export interface Author {
    author_id: number;
    author_url: string;
    content: string | null;
    creation_time: string | null;
    custom_layout: string | null;
    custom_layout_update_xml: string | null;
    custom_theme: string | null;
    custom_theme_from: string | null;
    custom_theme_to: string | null;
    facebook_page_url: string | null;
    featured_image: string | null;
    filtered_content: string | null;
    identifier: string;
    instagram_page_url: string | null;
    is_active: number;
    layout_update_xml: string | null;
    linkedin_page_url: string | null;
    meta_description: string;
    meta_title: string;
    name: string;
    page_layout: string | null;
    relative_url: string | null;
    role: string | null;
    short_content: string | null;
    short_filtered_content: string | null;
    title: string;
    twitter_page_url: string | null;
    type: string | null;
    url: string | null;
}

export interface BlogPost {
    author: Author;
    author_id: number;
    canonical_url: string;
    categories: Array<{
        canonical_url: string;
        category_id: number;
        category_level: number;
        category_url: string;
        category_url_path: string;
        content: string | null;
        content_heading: string | null;
        custom_layout: string | null;
        custom_layout_update_xml: string | null;
        custom_theme: string | null;
        custom_theme_from: string | null;
        custom_theme_to: string | null;
        display_mode: number;
        identifier: string;
        include_in_menu: number;
        is_active: number;
        layout_update_xml: string | null;
        meta_description: string;
        meta_keywords: string | null;
        meta_title: string;
        page_layout: string | null;
        parent_category_id: number | null;
        path: string | null;
        position: number;
        posts_count: number;
        posts_sort_by: number;
        relative_url: string | null;
        title: string;
        type: string | null;
    }>;
    category_id: number | null;
    content_heading: string | null;
    creation_time: string;
    custom_layout: string | null;
    custom_layout_update_xml: string | null;
    custom_theme: string | null;
    custom_theme_from: string | null;
    custom_theme_to: string | null;
    end_time: string | null;
    featured_list_image: string;
    featured_list_img_alt: string | null;
    filtered_content: string;
    first_image: string;
    include_in_recent: number;
    is_active: number;
    is_recent_posts_skip: string | null;
    layout_update_xml: string | null;
    media_gallery: Array<{ url: string }>;
    meta_description: string;
    meta_keywords: string | null;
    meta_title: string;
    og_description: string;
    og_image: string;
    og_title: string;
    og_type: string;
    page_layout: string | null;
    publish_time: string;
    related_posts: Array<any>;
    relatedproduct_id: number | null;
    relative_url: string | null;
    search: string | null;
    secret: string | null;
    short_content: string | null;
    short_filtered_content: string;
    tag_id: number | null;
    tags: Array<any>;
    type: string | null;
    update_time: string;
    views_count: number;
    featured_image: string;
    featured_img_alt: string | null;
    identifier: string;
    position: number;
    post_id: number;
    post_url: string;
    title: string;
}
// ... existing code ...
export default function PostDetail() {
    const [dataParam, setDataParam] = useState<string | null>(null);
    const [newsData, setNewsData] = useState<BlogPost | null>(null);
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const dataValue = queryParams.get('data');
        setDataParam(dataValue);
    }, []);
    const variables = {
        "url_key": dataParam

    }

    async function fetchBlogPostsData() {
        const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: queryBNewDetail,
                variables,
            }),
        });
        const data = await response.json();
        console.log("data data", data);

        // Check if data exists before setting state
        if (data && data.data && data.data.blogPostByUrlKey) {
            setNewsData(data.data.blogPostByUrlKey);
        } else {
            console.error("No data found for the given URL key.");
        }
    }
    useEffect(() => {
        fetchBlogPostsData();
    }, [dataParam]);

    console.log("dataaaaaaaaaa", newsData)
    return (
        <div className=''>
            <div className='container'>
                <div className='NewSub-box-shadow'>
                    <p className='NewSub-title'>{newsData?.title}</p>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <img className='NewSub-img-author' src={icBachLong.src} alt='' />
                        <div style={{ padding: "10px" }}>
                            <p style={{ paddingBottom: "6px" }}>{newsData?.author.name}</p>
                            <p>{newsData?.update_time ? new Date(newsData.update_time).toLocaleDateString() : ''}</p>

                        </div>
                    </div>
                    <div contentEditable='false' dangerouslySetInnerHTML={{ __html: `${newsData?.filtered_content}` }}></div>
                </div>
            </div>
        </div>
    );
}
