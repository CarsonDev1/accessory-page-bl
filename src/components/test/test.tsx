// components/InstallmentCard.tsx

import React from 'react';
import { Card, Button } from 'antd';
import styles from './test.module.css';

interface InstallmentCardProps {
	totalPayment: number;
	orderValue: number;
	monthlyPayment: number;
	paymentDifference: number;
	downPayment: number;
	term: number; // in months
}

const InstallmentCard: React.FC<InstallmentCardProps> = ({}) => {
	return (
		<Card className={styles.card}>
			<div className={styles.header}>
				<span className={styles.termNumber}>1</span>
				<span>Kỳ hạn 12 tháng</span>
			</div>
			<h2 className={styles.totalPayment}>11111 VNĐ</h2>
			<ul className={styles.details}>
				<li>
					<span>Giá trị đơn hàng</span>
					<span>1111 VNĐ</span>
				</li>
				<li>
					<span>Giá trả góp</span>
					<span>1111 VNĐ</span>
				</li>
				<li className={styles.redText}>
					<span>Góp mỗi tháng</span>
					<span>1111 VNĐ</span>
				</li>
				<li>
					<span>Chênh lệch trả thẳng</span>
					<span>11111 VNĐ</span>
				</li>
				<li className={styles.redText}>
					<span>Thanh toán khi nhận máy</span>
					<span>1111 VNĐ</span>
				</li>
			</ul>
			<Button type='primary' className={styles.button}>
				Chọn
			</Button>
		</Card>
	);
};

export default InstallmentCard;
