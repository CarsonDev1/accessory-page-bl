'use client';
import React from 'react';
import Image from 'next/image';
import bannerPC from '../../../public/HEAD PK THANG 10 1920x500 0410.jpg';
import bannerMB from '../../../public/HEADER-MOBILE.jpg';
import './HeaderOldAutumn.scss';
const HeaderOldAutumn = () => {
	return (
		<div>
			<Image src={bannerPC} alt='' className='HeaderOldAutumn-bannerPC' />
			<Image src={bannerMB} alt='' className='HeaderOldAutumn-bannerMB' />
		</div>
	);
};

export default HeaderOldAutumn;
