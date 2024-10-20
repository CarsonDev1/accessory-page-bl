"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./HeaderHalloween.scss";
import bannerDesktop from "../../../../public/halloween/banner-halloween-PC.png";
import bannerMobile from "../../../../public/BnewMB.png";
import icon_dragon from "../../../../public/halloween/ICON-DRAGON.png";
import icon_bingo from "../../../../public/halloween/icon-bingo.png";
import { Button } from "antd";
import Link from "next/link";
import Privilege01 from "../../../../public/halloween/privilege-01.png";
import Privilege02 from "../../../../public/halloween/privilege-02.png";
import Privilege03 from "../../../../public/halloween/privilege-03.png";
import Privilege04 from "../../../../public/halloween/privilege-04.png";
import Privilege05 from "../../../../public/halloween/privilege-05.png";
import Promotion01 from "../../../../public/halloween/promotion-01.png";
import Promotion02 from "../../../../public/halloween/promotion-02.png";
import Promotion03 from "../../../../public/halloween/promotion-03.png";
import Promotion04 from "../../../../public/halloween/promotion-04.png";
import Promotion05 from "../../../../public/halloween/promotion-05.png";
import Promotion06 from "../../../../public/halloween/promotion-06.png";
import Promotion07 from "../../../../public/halloween/promotion-07.png";
import Promotion08 from "../../../../public/halloween/promotion-08.png";
function HeaderHalloween() {
  const [count, setCount] = useState(20);

  const [startDate, setStartDate] = useState(new Date("2024-10-20")); // Ngày bắt đầu
  const [endDate, setEndDate] = useState(new Date("2024-11-01T21:30:00"));

  const [timeArray, setTimeArray] = useState([
    { date: endDate.toDateString(), days: 0, hours: 0, minutes: 0, seconds: 0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = endDate.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeArray([
        { date: endDate.toDateString(), days, hours, minutes, seconds },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="HeaderHalloween">
      <div
        className="banner-HeaderHalloween shine-banner"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div className="banner-HeaderHalloween-desktop">
          <Image src={bannerDesktop} alt="banner desktop" />
        </div>
        <div className="banner-HeaderHalloween-mobile">
          <Image src={bannerMobile} alt="banner mobile" />
        </div>
        <div className="HeaderHalloween-shine"></div>
      </div>
      <div className="container">
        <div className="HeaderHalloween-time-line">
          <div className="HeaderHalloween-time-line-container">
            <div className="HeaderHalloween-time-line-card-container">
              {timeArray.map((time, index) => (
                <div className="HeaderHalloween-time-line-card-key" key={index}>
                  <div className="HeaderHalloween-time-line-card">
                    <div style={{ padding: "10px", display: "block" }}>
                      <p className="HeaderHalloween-time-line-count">
                        {`${time.days} `}
                      </p>
                      <p className="HeaderHalloween-time-line-subtext">Ngày</p>
                    </div>
                  </div>
                  <div className="HeaderHalloween-time-line-card">
                    <div style={{ padding: "10px", display: "block" }}>
                      <p className="HeaderHalloween-time-line-count">
                        {`${time.hours} `}
                      </p>
                      <p className="HeaderHalloween-time-line-subtext">Giờ</p>
                    </div>
                  </div>
                  <div className="HeaderHalloween-time-line-card">
                    <div style={{ padding: "10px", display: "block" }}>
                      <p className="HeaderHalloween-time-line-count">
                        {`${time.minutes} `}
                      </p>
                      <p className="HeaderHalloween-time-line-subtext">Phút</p>
                    </div>
                  </div>
                  <div className="HeaderHalloween-time-line-card">
                    <div style={{ padding: "10px", display: "block" }}>
                      <p className="HeaderHalloween-time-line-count">
                        {`${time.seconds} `}
                      </p>
                      <p className="HeaderHalloween-time-line-subtext">Giây</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="HeaderHalloween-promotion-header">
          5 đặc quyền mua hàng tại Bạch Long Mobile
        </div>
        <div className="HeaderHalloween-promotion-list-privilege">
          <div style={{ cursor: "pointer" }} className="privilege-img">
            <Image
              src={Privilege01}
              alt="privilege-01"
              width={270}
              height={117}
            />
          </div>
          <Link
            href="https://bachlongmobile.com/thu-cu-doi-moi/"
            className="privilege-img"
          >
            <Image
              src={Privilege02}
              alt="privilege-02"
              width={270}
              height={117}
            />
          </Link>
          <Link
            href="https://bachlongmobile.com/promotion/tet-apple-bao-hanh-toan-dien/"
            className="privilege-img"
          >
            <Image
              src={Privilege03}
              alt="privilege-03"
              width={270}
              height={117}
            />
          </Link>
          <Link
            href="https://bachlongmobile.com/combo-phu-kien/"
            className="privilege-img"
          >
            <Image
              src={Privilege04}
              alt="privilege-04"
              width={270}
              height={117}
            />
          </Link>
          <div style={{ cursor: "pointer" }} className="privilege-img">
            <Image
              src={Privilege05}
              alt="privilege-05"
              width={270}
              height={117}
            />
          </div>
        </div>
        <div className="HeaderHalloween-promotion-list">
          <Link
            href="https://bachlongmobile.com/news/tin-cong-nghe/cung-mpos-x-bach-long-mobile-so-huu-iphone-16-series-gia-tot-qua-tang-khung/"
            className="HeaderHalloween-promotion-img"
          >
            <Image
              src={Promotion01}
              alt="promotion-01"
              width={270}
              height={117}
            />
          </Link>
          <Link
            href="https://bachlongmobile.com/promotion/home-pay-later/"
            className="promotion-img"
          >
            <Image
              src={Promotion02}
              alt="promotion-02"
              width={270}
              height={117}
            />
          </Link>
          <Link
            href="https://bachlongmobile.com/promotion/tra-gop-kredivo/"
            className="promotion-img"
          >
            <Image
              src={Promotion03}
              alt="promotion-03"
              width={270}
              height={117}
            />
          </Link>
          <Link
            href="https://bachlongmobile.com/tra-gop-muadee/"
            className="promotion-img"
          >
            <Image
              src={Promotion04}
              alt="promotion-04"
              width={270}
              height={117}
            />
          </Link>
          <Link
            href="https://bachlongmobile.com/promotion/tra-gop-tai-chinh/"
            className="promotion-img"
          >
            <Image
              src={Promotion05}
              alt="promotion-05"
              width={270}
              height={117}
            />
          </Link>
          <Link
            href="https://bachlongmobile.com/promotion/tra-gop-tai-chinh/"
            className="promotion-img"
          >
            <Image
              src={Promotion06}
              alt="promotion-06"
              width={270}
              height={117}
            />
          </Link>
          <Link
            href="https://bachlongmobile.com/promotion/tra-gop-tai-chinh/"
            className="promotion-img"
          >
            <Image
              src={Promotion07}
              alt="promotion-07"
              width={270}
              height={117}
            />
          </Link>
          <Link
            href="https://bachlongmobile.com/promotion/tra-gop-tai-chinh/"
            className="promotion-img"
          >
            <Image
              src={Promotion08}
              alt="promotion-08"
              width={270}
              height={117}
            />
          </Link>
        </div>
        <Image
          className="HeaderHalloween-ic-dragon"
          src={icon_dragon}
          alt="dragon"
        />
        <Image
          className="HeaderHalloween-ic-bingo"
          src={icon_bingo}
          alt="bingo"
        />
      </div>
    </div>
  );
}

export default HeaderHalloween;
