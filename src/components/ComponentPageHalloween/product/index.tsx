'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './product.scss';
import DecorWomen from '../../../../public/halloween/decor-women-01.png';
import BgProduct from '../../../../public/halloween/bg-product.png';
import AccessWomen from '../accessories20_10/acess-women/index';
import Access10k from '../accessories20_10/acess-10k/index';
import Access20k from '../accessories20_10/acess-20k/index';
import Access110 from '../accessories20_10/acess-110/index';
import AccessTo210 from '../accessories20_10/acess-to210/index';
import Access310 from '../accessories20_10/acess-310/index';
import Access290 from '../accessories20_10/acess-290/index';
import Access210 from '../accessories20_10/acess-210/index';

const ProductList: React.FC = () => {
	const [activeTab, setActiveTab] = useState<number>(0);
	const [isMobile, setIsMobile] = useState<boolean>(false);

	const tabs = [
		{
			index: 0,
			name: (
				<p>
					PHỤ KIỆN <br /> <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>PHÁI NỮ</span>
				</p>
			),
			component: <AccessWomen />,
		},
		{
			index: 1,
			name: (
				<span>
					IPHONE <br /> <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>GIÁ TỪ 10K</span>
				</span>
			),
			component: <Access10k />,
		},
		{
			index: 2,
			name: (
				<span>
					SAMSUNG <br /> <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>GIÁ TỪ 20K</span>
				</span>
			),
			component: <Access20k />,
		},
		{
			index: 3,
			name: (
				<span>
					IPHONE 13 SERIES <br />{' '}
					<span style={{ fontSize: '1.2rem', fontWeight: '600' }}>GIÁ TỪ 110,000</span>
				</span>
			),
			component: <Access110 />,
		},
		{
			index: 4,
			name: (
				<span>
					IPHONE 14 SERIES <br />{' '}
					<span style={{ fontSize: '1.2rem', fontWeight: '600' }}>GIÁ TỪ 210,000</span>
				</span>
			),
			component: <Access210 />,
		},
		{
			index: 5,
			name: (
				<span>
					IPHONE 15 SERIES <br />{' '}
					<span style={{ fontSize: '1.2rem', fontWeight: '600' }}>GIÁ TỪ 310,000</span>
				</span>
			),
			component: <Access310 />,
		},
		{
			index: 6,
			name: (
				<span>
					PIN DỰ PHÒNG <br /> <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>GIÁ TỪ 210.000</span>
				</span>
			),
			component: <AccessTo210 />,
		},
		{
			index: 7,
			name: (
				<span>
					CÓC /CÁP SẠC <br /> <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>GIÁ TỪ 290.000</span>
				</span>
			),
			component: <Access290 />,
		},
	];

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div
			className='product-list-halloween'
			id='item-iphone'
			style={{
				background: 'linear-gradient(180deg, #5D0069 0, var(--bg-gradient-white, #15001B) 90%)',
			}}
		>
			<div className='container'>
				<div className='upgrade-list'>
					<div className='bg-product'>
						<Image src={BgProduct} width={1820} height={1200} alt='bg-product' />
					</div>
					<div className='women-decor'>
						<Image
							src={DecorWomen}
							width={1400}
							height={1200}
							quality={100}
							priority
							alt='product-banner-01'
							sizes='(max-width: 768px) 100vw, (min-width: 768px) 50vw, (min-width: 1200px) 33vw'
						/>
					</div>

					{isMobile ? (
						<Swiper spaceBetween={10} slidesPerView={2.8}>
							{tabs.map((tab) => (
								<SwiperSlide key={tab.index} style={{ padding: '1.2rem 0' }}>
									<button
										onClick={() => setActiveTab(tab.index)}
										className={activeTab === tab.index ? 'tab active' : 'tab'}
										style={{
											width: '100%',
											color: activeTab === tab.index ? '#fff' : '#333',
											backgroundColor: activeTab === tab.index ? '#ff4d4f' : '#fff',
											border: activeTab === tab.index ? '2px solid #ff4d4f' : '2px solid #eee',
											borderRadius: '8px',
											cursor: 'pointer',
											transition: 'all 0.3s ease',
											boxShadow:
												activeTab === tab.index ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
											fontSize: '1.2rem',
											minHeight: '4rem',
										}}
									>
										{tab.name}
									</button>
								</SwiperSlide>
							))}
						</Swiper>
					) : (
						<div className='tabs-grid'>
							{tabs.map((tab) => (
								<div key={tab.index} style={{ flex: 1 }}>
									<button
										onClick={() => setActiveTab(tab.index)}
										className={activeTab === tab.index ? 'tab active' : 'tab'}
										style={{
											width: '100%',
											color: activeTab === tab.index ? '#fff' : '#333',
											backgroundColor: activeTab === tab.index ? '#ff4d4f' : '#fff',
											border: activeTab === tab.index ? '2px solid #ff4d4f' : '2px solid #eee',
											borderRadius: '8px',
											cursor: 'pointer',
											transition: 'all 0.3s ease',
											boxShadow:
												activeTab === tab.index ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
										}}
									>
										{tab.name}
									</button>
								</div>
							))}
						</div>
					)}

					<div>{tabs[activeTab]?.component}</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
