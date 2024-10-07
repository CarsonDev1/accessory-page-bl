/* eslint-disable @next/next/no-img-element */
import React from 'react';
import './CardProduct.css';
import iconconhang from '../../../public/ic-shipped.png';
import Image from 'next/image';
export interface Product {
	name: string;
	images: string;
	price1: number;
}
function CardProduct({ name, images, price1 }: Omit<Product, 'id'>) {
	return (
		<div className='CardProductOldAutumn2'>
			<figure className='product__img'>
				<img className='product__img-detail' alt={name} src={images} />
			</figure>
			<div className='product__title' style={{ textDecoration: 'none' }}>
				{name}
			</div>
			<div className='product__groupPrice' style={{ textAlign: 'center' }}>
				<span className='product__price'>Đang bán: </span>
				<span className='product__priceSpecial'>{price1.toLocaleString()} VND</span>
			</div>
			<div className='product__groupPrice' style={{ textAlign: 'center' }}>
				<span className='product__price'>Giá thu: </span>
				<span className='product__priceSpecial'>{price1.toLocaleString()} VND</span>
			</div>
			<div className='product__groupPrice' style={{ textAlign: 'center' }}>
				<span className='product__price'>Trả thêm: </span>
				<span className='product__priceSpecial'>{price1.toLocaleString()} VND</span>
			</div>
		</div>
	);
}

export default CardProduct;
