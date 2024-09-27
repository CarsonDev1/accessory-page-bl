import Banner from "@/components/banner";
import BannerSlide from "@/components/banner-slide";
import ProductList from "@/components/product-list";
import ProductListBaoda from "../components/product-list-leather-case/product-list-leather-case";
import ProductListCuongLuc from "../components/product-list-strength/product-list-strength";
import ProductListTaiNghe from "../components/product-list-earphone/product-list-earphone";
import ProductListDongHo from "../components/product-list-watch/product-list-watch";
import ProductListSacDuPhong from "../components/product-list-backup-charger/product-list-backup-charger";
import ProductListCapsac from "../components/product-list-charging-cable/product-list-charging-cable";
import ProductListLoa from "../components/product-list-loudspeaker/product-list-loudspeaker";
import ProductListTheNho from "../components/product-list-usb/product-list-usb";
import ProductListApple from "../components/product-list-apple/product-list-apple";
import ProductListLaptop from "../components/product-list-laptop/product-list-laptop";
import ProductListSmartHome from "../components/product-list-smart-home/product-list-smart-home";
import ProductListSamsung from "../components/product-list-samsung/product-list-samsung";
import ProductListKhac from "../components/product-list-khac/product-list-khac";
export default function Home() {
  return (
    <div className="bg-page">
      <Banner />
      <BannerSlide />
      <ProductList />
      <ProductListBaoda />
      <ProductListCuongLuc />
      <ProductListSacDuPhong />
      <ProductListTaiNghe />
      <ProductListDongHo />
      <ProductListCapsac />
      <ProductListLoa />
      <ProductListTheNho />
      <ProductListApple />
      <ProductListLaptop />
      <ProductListSmartHome />
      <ProductListSamsung />
      <ProductListKhac />
    </div>
  );
}
