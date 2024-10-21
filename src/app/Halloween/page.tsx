import HeaderHalloween from "../../components/ComponentPageHalloween/HeaderHalloween/HeaderHalloween";
import BodyHallowween from "../../components/ComponentPageHalloween/BodyHalloween/BodyHalloween";
import ProductList from "../../components/ComponentPageHalloween/product/index";
import AppleList from "../../components/ComponentPageHalloween/apple/index";
import ProductPercent from "../../components/ComponentPageHalloween/99percent/index";
import AndroidList from "../../components/ComponentPageHalloween/android/index";
import LaptopList from "../../components/ComponentPageHalloween/laptop/index";
import ToyList from "../../components/ComponentPageHalloween/toy/index";
import AccessoriesList from "../../components/ComponentPageHalloween/accessories/index";
import Rules from "../../components/ComponentPageHalloween/rules/index";
import React from "react";
import BannerHalloween from "../../components/ComponentPageHalloween/BannerHalloween/page";

export default function page() {
  return (
    <div>
      <BannerHalloween />
      <HeaderHalloween />
      <BodyHallowween />
      <div id="item-iphone">
        <ProductList />
      </div>
      <div id="item-ipad">
        <AppleList />
      </div>
      <div id="item-airpods">
        <ProductPercent />
      </div>
      <div id="item-mac">
        <AndroidList />
      </div>
      <div id="item-watch">
        <LaptopList />
      </div>
      <div id="item-toy">
        <ToyList />
      </div>
      <div id="item-accessories">
        <AccessoriesList />
      </div>

      <div id="item-rules">
        <Rules />
      </div>
    </div>
  );
}
