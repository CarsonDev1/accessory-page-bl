'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Radio } from 'antd';
import Image from 'next/image';
import './ProductModalComponent2.scss';
import { useQuery } from '@tanstack/react-query';
import CardProductOldAutumn2 from '../../components/CardProductOldAutumn2/CardProductOldAutumn';
interface Product {
	item: {
		name: string;
		img: string;
		price1: number;
		price2: number;
		price3: number;
	};
}
interface ProductModalProps {
	modalOpen: boolean;
	onCancelModal: () => void;
	selectedProduct: Product | null;
}
export interface ProductData {
	id: number;
	name: string;
	url_key: string;
	modalOpen: boolean;
	image: {
		url: string;
	};
	price_range: {
		minimum_price: {
			final_price: {
				value: number;
				currency: string;
			};
		};
	};
}
const ProductModal2: React.FC<ProductModalProps> = ({ modalOpen, selectedProduct, onCancelModal }) => {
	const [visibleProducts, setVisibleProducts] = useState<number>(10);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [filteredData, setFilteredData] = useState<Product[]>([]);
	const query = `
query getProducts(
$search: String
$filter: ProductAttributeFilterInput
$sort: ProductAttributeSortInput
$pageSize: Int
$currentPage: Int
) {
products(
  search: $search
  filter: $filter
  sort: $sort
  pageSize: $pageSize
  currentPage: $currentPage
) {
  items {
    ...ProductInterfaceField
  }
}
}
fragment ProductInterfaceField on ProductInterface {
id
name
url_key
image {
  url
}
price_range {
  minimum_price {
    final_price {
      value
      currency
    }
  }
}
}
`;
	const [activeTab, setActiveTab] = useState<string>('iPhone');
	const [categoryUid, setCategoryUid] = useState<string>('Mjgx');

	const fetchProductListDataBuyPhone = async (category_uid: string) => {
		const variables = {
			filter: {
				category_uid: {
					eq: category_uid,
				},
			},
			pageSize: 200,
			currentPage: 1,
		};

		const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		});

		const data = await response.json();
		console.log('data máy mới', data);
		return data.data.products.items as ProductData[];
	};
	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
		switch (tab) {
			case 'iPhone':
				setCategoryUid('Mjgx'); // Gán categoryUid cho iPhone
				break;
			case 'iPad':
				setCategoryUid('NA=='); // Gán categoryUid cho iPad
				break;
			case 'Samsung':
				setCategoryUid('MzAy'); // Gán categoryUid cho Samsung
				break;
			default:
				setCategoryUid('Mjgx'); // Gán mặc định
		}
	};
	const { data, error, isLoading } = useQuery({
		queryKey: ['productListDataBuyPhone', activeTab],
		queryFn: () => fetchProductListDataBuyPhone(categoryUid),
		staleTime: 300000,
	});
	const toggleProducts = () => {
		if (isExpanded) {
			setVisibleProducts(10);
			setIsExpanded(false);
		} else {
			setVisibleProducts(data ? data.length : 0); // Check if data is defined
			setIsExpanded(true);
		}
	};
	console.log('data detail', selectedProduct);
	return (
		<Modal visible={modalOpen} onCancel={onCancelModal} footer={null} width={800}>
			<h2 className='BodyOldAutumn-titleModal'>DANH SÁCH SẢN PHẨM ĐỔI MÁY</h2>
			<div className='BodyOldAutumn-tab-button'>
				<button className={`BodyOldAutumn-button`} onClick={() => handleTabChange('iPhone')}>
					iPhone
				</button>
				<button className={`BodyOldAutumn-button`} onClick={() => handleTabChange('Samsung')}>
					Samsung
				</button>
				<button className={`BodyOldAutumn-button`} onClick={() => handleTabChange('Apple Watch')}>
					Apple Watch
				</button>
				<button className={`BodyOldAutumn-button`} onClick={() => handleTabChange('iPad')}>
					iPad
				</button>
				<button className={`BodyOldAutumn-button`} onClick={() => handleTabChange('Laptop')}>
					Laptop
				</button>
				<button className={`BodyOldAutumn-button`} onClick={() => handleTabChange('Apple Watch')}>
					Apple Watch
				</button>
				<button className={`BodyOldAutumn-button`} onClick={() => handleTabChange('Macbook')}>
					Macbook
				</button>
			</div>
			{data && data.length === 0 ? (
				<div className='no-products-message'>
					<span>Không có sản phẩm</span>
				</div>
			) : (
				<>
					<div className='BodyOldAutumn-Section-ItemSlider'>
						{data?.slice(0, visibleProducts).map((product) => (
							<CardProductOldAutumn2
								key={product.id}
								name={product.name}
								images={product.image.url}
								price1={product.price_range.minimum_price.final_price.value}
							/>
						))}
					</div>

					{data && data.length > 10 && (
						<div className='load-more-container'>
							<button onClick={toggleProducts}>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</button>
						</div>
					)}
				</>
			)}
		</Modal>
	);
};

export default ProductModal2;
