"use client";
import React, { useEffect, useState } from "react";
import "./BodyBNew2.scss";
import { Col, Row } from "antd";
import Image from "next/image";
import test from "../../../../public/test.png";
import icUser from "../../../../public/ic-user-4.svg";
import { BlogPost, queryBNew } from "../../../app/utils/utils";
import { useRouter } from "next/navigation";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface ProductModalProps {
  activeTab2: number;
}
export default function BodyBNew2({ activeTab2 }: ProductModalProps) {
  const router = useRouter();
  const [newsData2, setNewsData2] = useState<BlogPost[] | null>(null);
  const [newsData3, setNewsData3] = useState<BlogPost[] | null>(null);
  const [visibleCount, setVisibleCount] = useState(5); // State to track the number of visible posts
  const variablesNew = {
    filter: {
      category_id: {
        eq: activeTab2, // này truyền cứng id của danh mục bài viết
      },
      is_featured: {
        eq: 1, //set cứng là 1 để để ra bài viết nổi bật
      },
    },
    pageSize: 1000,
    currentPage: 1,
    sortFiled: "publish_time",
    allPosts: false,
    sort: ["DESC"],
  };

  const variablesProduct = {
    filter: {
      category_id: {
        eq: 26,
      },
    },
    pageSize: 1000,
    currentPage: 1,
    sortFiled: "publish_time",
    allPosts: false,
    sort: ["DESC"],
  };

  async function fetchBlogPostsDataProduct() {
    const response = await fetch(
      "https://beta-api.bachlongmobile.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryBNew,
          variables: variablesProduct,
        }),
      }
    );
    const data = await response.json();
    setNewsData3(data.data.blogPosts.items);
  }
  async function fetchBlogPostsDataNew() {
    const response = await fetch(
      "https://beta-api.bachlongmobile.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryBNew,
          variables: variablesNew,
        }),
      }
    );
    const data = await response.json();
    console.log("dataaaa", data);
    setNewsData2(data.data.blogPosts.items);
  }

  const loadMorePosts = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Increase the count by 3
  };

  useEffect(() => {
    fetchBlogPostsDataNew();
    setVisibleCount(5);
    fetchBlogPostsDataProduct();
  }, [activeTab2]);

  console.log("New news data 3:>>>>>>>>>>>>>>>>>>", newsData3);

  return (
    <div className="header-BodyBNew2">
      {newsData2 && newsData2.length > 0 ? (
        <>
          <h2 className="header-BodyBNew2-title">Tin tức nổi bật</h2>
          <Row className="header-BodyBNew2-cardRow">
            <Col span={14} className="header-BodyBNew2-CardCol">
              {newsData2
                .sort(
                  (a, b) =>
                    new Date(b.creation_time).getTime() -
                    new Date(a.creation_time).getTime()
                ) // Sort by creation_time descending
                .slice(0, visibleCount)
                .map((post, index) => (
                  <div
                    style={{ display: "flex", marginBottom: "10px" }}
                    key={index}
                  >
                    <a
                      style={{ display: "flex" }}
                      onClick={() =>
                        router.push(
                          `/NewSub?page=${new URL(post.post_url).pathname
                            .split("/")
                            .pop()}`
                        )
                      }
                    >
                      <img
                        className="header-BodyBNew2-img"
                        src={post.first_image}
                        alt=""
                      />
                      <div style={{ padding: "10px" }}>
                        <h2 className="header-BodyBNew2-titleSub">
                          {post.title}
                        </h2>
                        <div className="header-BodyBNew2-cardPostView-tabInfo">
                          <div className="author">
                            <Image
                              alt="User icon"
                              loading="lazy"
                              className="header-BodyBNew2-icUser"
                              src={icUser}
                            />
                          </div>
                          <span>{post.author.name}</span>
                          <div>
                            <span>
                              {new Date(
                                post.creation_time
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="header-BodyBNew2-cardPostView-view">
                          {post.views_count} lượt xem
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              {visibleCount < newsData2.length && (
                <button
                  onClick={loadMorePosts}
                  className="header-BodyBNew2-cardPostView-load-more-button"
                >
                  Xem thêm
                </button>
              )}
            </Col>
            <Col span={10} className="header-BodyBNew2-CardCol">
              {newsData3 && newsData3.length > 0 ? (
                <>
                  <h2
                    className=""
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      padding: "10px 0",
                    }}
                  >
                    Tin tức về sản phẩm
                  </h2>{" "}
                  {/* Title added when data is available */}
                  {newsData3
                    .sort(
                      (a, b) =>
                        new Date(b.creation_time).getTime() -
                        new Date(a.creation_time).getTime()
                    ) // Sort by creation_time descending
                    .map((post, index) => (
                      <div
                        style={{ display: "flex", marginBottom: "10px" }}
                        key={index}
                      >
                        <a
                          style={{ display: "flex" }}
                          onClick={() =>
                            router.push(
                              `/NewSub?page=${new URL(post.post_url).pathname
                                .split("/")
                                .pop()}`
                            )
                          }
                        >
                          <img
                            className="header-BodyBNew2-imgProduct"
                            src={post.first_image}
                            alt=""
                          />
                          <div style={{ padding: " 0px 10px" }}>
                            <h2 className="header-BodyBNew2-titleSubProduct">
                              {post.title}
                            </h2>
                            {/* <div className="header-BodyBNew2-cardPostView-tabInfo">
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
                                                        </div> */}
                            <p className="header-BodyBNew2-cardPostView-view">
                              {post.views_count} lượt xem
                            </p>
                          </div>
                        </a>
                      </div>
                    ))}
                </>
              ) : (
                // Title will not be displayed if there is no data
                <p>No data available</p> // Optional: message when no data is available
              )}
            </Col>
          </Row>
        </>
      ) : null}
    </div>
  );
}
