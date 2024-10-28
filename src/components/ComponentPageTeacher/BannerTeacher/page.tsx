'use client';
import React from 'react';
import Image from 'next/image';
import BgHallo from '../../../../public/halloween/bg-hallo.png';
import BgHalloMobile from '../../../../public/halloween/bg-hallo-mobile.png';
import HeadHallo from '../../../../public/teacher/head-teacher.jpg';
import TableBanner01 from '../../../../public/halloween/table-banner-01.png';
import TableBanner02 from '../../../../public/halloween/table-banner-02.png';
import TableBanner03 from '../../../../public/halloween/table-banner-03.png';
import TableBanner04 from '../../../../public/halloween/table-banner-04.png';
import './banner-halloween.scss';

const BannerTeacher = () => {
	const handleClickiPhone = () => {
		const iPhone = document.getElementById('item-iphone');
		if (iPhone) {
			iPhone.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleClickiPad = () => {
		const iPad = document.getElementById('item-ipad');
		if (iPad) {
			iPad.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleClickWatch = () => {
		const Watch = document.getElementById('item-watch');
		if (Watch) {
			Watch.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleClickMac = () => {
		const Mac = document.getElementById('item-mac');
		if (Mac) {
			Mac.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleClickAirpods = () => {
		const AirPods = document.getElementById('item-airpods');
		if (AirPods) {
			AirPods.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleClickAccess = () => {
		const Access = document.getElementById('item-toy');
		if (Access) {
			Access.scrollIntoView({ behavior: 'smooth' });
		}
	};
	return (
		<div>
			<div className='halloween-wrap'>
				<div className='banner-hallo'>
					<div className='banner-hallo-table'>
						<div className='banner-hallo-table-item' onClick={handleClickiPhone}>
							<Image
								src={TableBanner01}
								width={1000}
								height={1000}
								alt='table-banner-01'
								priority
								className='banner-hallo-table-01'
							/>
						</div>
						<div className='banner-hallo-table-item' onClick={handleClickWatch}>
							<Image
								src={TableBanner02}
								width={1000}
								height={1000}
								alt='table-banner-02'
								priority
								className='banner-hallo-table-02'
							/>
						</div>
						<div className='banner-hallo-table-item' onClick={handleClickiPad}>
							<Image
								src={TableBanner03}
								width={1000}
								height={1000}
								alt='table-banner-03'
								priority
								className='banner-hallo-table-03'
							/>
						</div>
						<div className='banner-hallo-table-item' onClick={handleClickAccess}>
							<Image
								src={TableBanner04}
								width={1000}
								height={1000}
								alt='table-banner-03'
								priority
								className='banner-hallo-table-03'
							/>
						</div>
					</div>
					<Image
						src={HeadHallo}
						width={1820}
						height={1200}
						alt='head-hallo'
						quality={100}
						priority
						className='head-hallo'
					/>
					<Image
						src={BgHalloMobile}
						width={1820}
						height={1500}
						alt='bg-hallo-mobile'
						className='bg-hallo-mobile'
					/>
				</div>
				<Image src={BgHallo} width={1820} height={1500} alt='bg-hallo' className='bg-hallo' />
			</div>
		</div>
	);
};

export default BannerTeacher;
