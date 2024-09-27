/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./product-list-watch.scss";
// import { Carousel } from "antd";
import CardProduct from "../CardProduct/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import noProducts from "../../../public/img-no-pro-matching.webp";
export interface Product {
  id: number;
  name: string;
  url_key: string;
  image: {
    url: string;
  };
  price_range: {
    minimum_price: {
      final_price: {
        value: number;
        currency: string;
      };
    };
  };
}

const query = `
query getProducts(
$search: String
$filter: ProductAttributeFilterInput
$sort: ProductAttributeSortInput
$pageSize: Int
$currentPage: Int
) {
products(
  search: $search
  filter: $filter
  sort: $sort
  pageSize: $pageSize
  currentPage: $currentPage
) {
  items {
    ...ProductInterfaceField
  }
}
}
fragment ProductInterfaceField on ProductInterface {
id
name
url_key
image {
  url
}
price_range {
  minimum_price {
    final_price {
      value
      currency
    }
  }
}
}
`;

const variables = {
  filter: {
    category_uid: {
      eq: "NjY=",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductListDataDongHo() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();
  return data.data.products.items as Product[];
}

const Section5: React.FC = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    dots: true,
    arrows: true,
    slidesToShow: 5,
    rows: 1,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productListDataDongHo"],
    queryFn: fetchProductListDataDongHo,
    staleTime: 300000,
  });

  const [activeTab, setActiveTab] = useState<string>("All");
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredData(data || []);
    } else {
      const filtered = data?.filter((product) =>
        product.name.toLowerCase().includes(activeTab.toLowerCase())
      );
      setFilteredData(filtered || []);
    }
  }, [activeTab, data]);

  if (isLoading) {
    return (
      <div className="loading container-spin">
        <Spin />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="OldForNew-Section5" id="item-watch">
      <div className="container">
        <div className="OldForNew-Section5-Container">
          <div className="title-loai-pk" style={{ marginTop: "0" }}>
            <span>Đồng Hồ</span>
          </div>

          {filteredData.length === 0 ? (
            <div className="no-products-message">
              <Image
                src={noProducts}
                alt="no-products"
                className="no-products-image"
              />
              <span>Không có sản phẩm</span>
            </div>
          ) : (
            <div className="OldForNew-Section5-ItemSlider">
              <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView="auto"
                speed={1000}
                navigation
                breakpoints={{
                  300: {
                    slidesPerView: 2,
                  },
                  576: {
                    slidesPerView: 3,
                  },
                  850: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                }}
              >
                {filteredData.map((product, index) => (
                  <SwiperSlide key={index}>
                    <CardProduct
                      key={product.id}
                      name={product.name}
                      url_key={product.url_key}
                      image={product.image}
                      price_range={product.price_range}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Section5;
