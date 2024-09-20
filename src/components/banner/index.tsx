'use client';
import React from 'react';
import Image from 'next/image';
import './banner.scss';

const Banner = () => {
    return (
        <div className='banner'>
            <picture>
                <source media="(max-width: 768px)" srcSet="/banner-accessory-mobile.png" />
                <Image
                    src="/banner-accessory.png"
                    width={1820}
                    height={1200}
                    alt="banner-accessory"
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 1820px"
                />
            </picture>
        </div>
    );
};

export default Banner;
