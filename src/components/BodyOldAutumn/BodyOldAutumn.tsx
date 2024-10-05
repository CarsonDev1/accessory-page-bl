'use client';
import React, { useEffect, useState } from 'react';
import './BodyOldAutumn.scss';
import Image from 'next/image';
import icsSearch from '../../../public/ic-search.png';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import CardProduct from '../../components/CardProductOldAutumn/CardProductOldAutumn';
import { Pagination } from 'antd';
export interface Product {
	id: number;
	name: string;
	price: string;
	products: any[];
}

// Create a QueryClient instance
const queryClient = new QueryClient();

const BodyOldAutumn = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Searching for:', searchTerm);
	};
	const [selectedSeries, setSelectedSeries] = useState<string>('iphone15');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1); // Trạng thái trang hiện tại

	const handleChange = (value: string) => {
		setSelectedSeries(value);
	};

	const showModal = (product: Product) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				'https://script.google.com/macros/s/AKfycbz9mbHofFp5aVxWWZQMnvDDDcW0OKPjp6O17xtQ9IkPZ1EWGkWiDv1spMuQu1xOjM4/exec'
			);
			const data = await response.json();
			setFilteredProducts(data);
			return data;
		};

		fetchData();
	}, []);

	const itemsPerPage = 15; // Tổng số sản phẩm hiển thị trên mỗi trang
	const itemsPerRow = 4; // Sản phẩm trên mỗi hàng

	// Tính toán số lượng trang
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	// Lấy sản phẩm cho trang hiện tại
	const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	return (
		<QueryClientProvider client={queryClient}>
			<div style={{ backgroundColor: '#FFFEED', padding: '20px 0' }}>
				<div className='container'>
					<div className='BodyOldAutumn-card'>
						<h2 className='BodyOldAutumn-title'>THU CŨ ĐỔI MỚI - KHÔNG LO BÙ TIỀN</h2>
						<form onSubmit={handleSearch} className='searchBar'>
							<input
								type='text'
								placeholder='Tìm sản phẩm bạn cần thu cũ...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='searchInput'
							/>
							<button type='submit' className='searchButton'>
								<Image src={icsSearch} alt='Search' />
							</button>
						</form>
						<div className='BodyOldAutumn-tab-button'>
							<button className='BodyOldAutumn-button'>Apple</button>
							<button className='BodyOldAutumn-button'>SamSung</button>
							<button className='BodyOldAutumn-button'>iPhone 99%</button>
							<button className='BodyOldAutumn-button'>Máy 99%</button>
						</div>
						<div className='BodyOldAutumn-tab-item'>
							{currentProducts.map((product: any, index: number) => (
								<div key={index}>
									<CardProduct
										name={product?.item.name}
										image={product?.item.img}
										price={Number(product?.item.price)}
									/>
								</div>
							))}
						</div>

						<Pagination
							style={{ padding: '20px 0' }}
							align='center'
							current={currentPage}
							total={filteredProducts.length}
							pageSize={itemsPerPage}
							onChange={(page) => setCurrentPage(page)} // Cập nhật trang hiện tại
						/>
					</div>
				</div>
			</div>
		</QueryClientProvider>
	);
};

export default BodyOldAutumn;
