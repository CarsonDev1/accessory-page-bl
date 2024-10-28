'use client';

import ProductList from '../../components/ComponentPageHalloween/product/index';
import AppleList from '../../components/ComponentPageTeacher/apple/index';
import ProductPercent from '../../components/ComponentPageTeacher/99percent/index';
import AndroidList from '../../components/ComponentPageTeacher/android/index';
import LaptopList from '../../components/ComponentPageTeacher/laptop/index';
import ToyList from '../../components/ComponentPageTeacher/toy/index';
import Rules from '../../components/ComponentPageTeacher/rules/index';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './teacher.scss';
import AccessoriesList from '@/components/ComponentPageTeacher/accessories';
import IpadList from '@/components/ComponentPageTeacher/ipad';
import BannerTeacher from '@/components/ComponentPageTeacher/BannerTeacher/page';
import HeaderHalloween from '@/components/ComponentPageTeacher/HeaderHalloween/HeaderHalloween';

const categories = [
	{ id: 'item-access', name: 'Phụ kiện' },
	{ id: 'item-iphone', name: 'iPhone' },
	{ id: 'item-airpods', name: 'Máy 99%' },
	{ id: 'item-ipad', name: 'iPad' },
	{ id: 'item-mac', name: 'Laptop' },
	{ id: 'item-watch', name: 'Android' },
	{ id: 'item-toy', name: 'Phụ kiện Apple' },
];

export default function HalloweenPage() {
	const categoryRef = useRef(null);
	const [isStickyVisible, setIsStickyVisible] = useState(false);
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const scrollThreshold = 500;

	const handleClick = (id: string, offset = 0) => {
		const element = document.getElementById(id);
		if (element) {
			const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
			setActiveCategory(id);
		}
	};

	const handleScrollToRules = () => {
		const customOffset = 500;
		handleClick('item-rules', customOffset);
	};

	useEffect(() => {
		const handleScroll = () => {
			setIsStickyVisible(window.scrollY > scrollThreshold);
		};

		const sectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveCategory(entry.target.id);
					}
				});
			},
			{ root: null, threshold: 0.1 }
		);

		const observeSections = () => {
			categories.forEach((category) => {
				const element = document.getElementById(category.id);
				if (element) {
					sectionObserver.observe(element);
				}
			});
		};

		window.addEventListener('scroll', handleScroll);
		const timeoutId = setTimeout(observeSections, 0);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(timeoutId);
			categories.forEach((category) => {
				const element = document.getElementById(category.id);
				if (element) {
					sectionObserver.unobserve(element);
				}
			});
		};
	}, []);

	return (
		<div className='halloween'>
			<BannerTeacher />
			<HeaderHalloween onScrollToRules={handleScrollToRules} />
			{/* <div id='item-hot'>
				<ProductList />
			</div> */}
			<div id='item-access'>
				<AccessoriesList />
			</div>
			<div id='item-iphone'>
				<AppleList />
			</div>
			<div id='item-airpods'>
				<ProductPercent />
			</div>
			<div id='item-ipad'>
				<IpadList />
			</div>
			<div id='item-mac'>
				<LaptopList />
			</div>
			<div className='item-watch'>
				<AndroidList />
			</div>
			<div id='item-toy'>
				<ToyList />
			</div>
			<div id='item-rules'>
				<Rules />
			</div>

			<div className={`sticky-category ${isStickyVisible ? 'visible' : 'hidden'}`}>
				<div className='category-desktop'>
					{categories.map((category, index) => (
						<div
							key={index}
							className={`category-item ${activeCategory === category.id ? 'active' : 'default'}`}
							onClick={() => handleClick(category.id)}
						>
							<span className='category-name'>{category.name}</span>
						</div>
					))}
				</div>
				<div className='category-mobile'>
					<Swiper
						centeredSlides={true}
						slideToClickedSlide={true}
						spaceBetween={10}
						watchSlidesProgress={true} // Track slide progress to update center
						onSlideChange={(swiper) => setActiveCategory(categories[swiper.activeIndex].id)} // Set active category on change
						breakpoints={{
							300: {
								slidesPerView: 3.5,
							},
							850: {
								slidesPerView: 5,
							},
						}}
						slidesPerView='auto'
					>
						{categories.map((category, index) => (
							<SwiperSlide key={index} onClick={() => handleClick(category.id)}>
								<div
									className={`swiper-slide ${activeCategory === category.id ? 'active' : 'default'}`}
								>
									<span className='category-name'>{category.name}</span>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	);
}
