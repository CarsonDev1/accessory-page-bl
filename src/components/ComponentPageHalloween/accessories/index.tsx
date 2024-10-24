'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import DecorWomen from '../../../../public/halloween/decor-women-07.png';
import Access20k from '@/components/ComponentPageHalloween/accessories-halloween/acess-20k';
import Access110 from '@/components/ComponentPageHalloween/accessories-halloween/acess-110';
import Access210 from '@/components/ComponentPageHalloween/accessories-halloween/acess-210';
import Access310 from '@/components/ComponentPageHalloween/accessories-halloween/acess-310';
import AccessTo210 from '@/components/ComponentPageHalloween/accessories-halloween/acess-to210';
import Access290 from '@/components/ComponentPageHalloween/accessories-halloween/acess-290';
import './product.scss';
import 'swiper/css';

const AccessoriesList: React.FC = () => {
	const [activeTab, setActiveTab] = useState<number>(0);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [disabledTabs, setDisabledTabs] = useState<number[]>([]);

	const tabs = [
		{
			index: 0,
			name: (
				<span>
					SAMSUNG <br /> <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>GIÁ TỪ 20K</span>
				</span>
			),
			component: <Access20k />,
		},
		{
			index: 1,
			name: (
				<span>
					IPHONE 13 SERIES <br />{' '}
					<span style={{ fontSize: '1.2rem', fontWeight: '600' }}>GIÁ TỪ 110,000</span>
				</span>
			),
			component: <Access110 />,
		},
		{
			index: 2,
			name: (
				<span>
					IPHONE 14 SERIES <br />{' '}
					<span style={{ fontSize: '1.2rem', fontWeight: '600' }}>GIÁ TỪ 210,000</span>
				</span>
			),
			component: <Access210 />,
		},
		{
			index: 3,
			name: (
				<span>
					IPHONE 15 SERIES <br />{' '}
					<span style={{ fontSize: '1.2rem', fontWeight: '600' }}>GIÁ TỪ 310,000</span>
				</span>
			),
			component: <Access310 />,
		},
		{
			index: 4,
			name: (
				<span>
					PIN DỰ PHÒNG <br /> <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>GIÁ TỪ 210.000</span>
				</span>
			),
			component: <AccessTo210 />,
		},
		{
			index: 5,
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
		<div className='product-list-halloween'>
			<div className='container'>
				<div className='upgrade-list'>
					<div className='women-decor'>
						<Image
							src={DecorWomen}
							width={1400}
							height={1200}
							quality={100}
							priority
							alt='product-banner-07'
							sizes='(max-width: 768px) 100vw, (min-width: 768px) 50vw, (min-width: 1200px) 33vw'
						/>
					</div>

					{isMobile ? (
						<Swiper spaceBetween={10} slidesPerView={2.8}>
							{tabs.map((tab) => (
								<SwiperSlide key={tab.index} style={{ padding: '1.2rem 0' }}>
									<button
										onClick={() => setActiveTab(tab.index)}
										className={activeTab === tab.index ? 'tab-access active' : 'tab-access'}
										style={{
											width: '100%',
											color: activeTab === tab.index ? '#fff' : '#333',
											backgroundColor: activeTab === tab.index ? '#ff7518' : '#fff',
											borderRadius: '8px',
											cursor: 'pointer',
											transition: 'all 0.3s ease',
											boxShadow:
												activeTab === tab.index ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
											fontSize: '1.2rem',
											minHeight: '4rem',
										}}
										disabled={disabledTabs.includes(tab.index)}
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
										className={activeTab === tab.index ? 'tab-access active' : 'tab-access'}
										style={{
											width: '100%',
											color: activeTab === tab.index ? '#fff' : '#333',
											backgroundColor: activeTab === tab.index ? '#ff7518' : '#fff',
											borderRadius: '8px',
											cursor: 'pointer',
											transition: 'all 0.3s ease',
											boxShadow:
												activeTab === tab.index ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
										}}
										disabled={disabledTabs.includes(tab.index)}
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

export default AccessoriesList;
