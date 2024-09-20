import Banner from "@/components/banner";
import BannerSlide from "@/components/banner-slide";
import ProductList from "@/components/product-list";

export default function Home() {
  return (
    <div className="bg-page">
      <Banner />
      <BannerSlide />
      <ProductList />
    </div>
  );
}
