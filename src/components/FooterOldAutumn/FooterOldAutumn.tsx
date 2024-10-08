import React from 'react';
import './FooterOldAutumn.scss'; // Import the global SCSS

const FooterOldAutumn = () => {
	return (
		<div style={{ backgroundColor: '#FFFEED', padding: '10px 0' }}>
			<div className='container'>
				<footer className='FooterOldAutumn'>
					<div className='FooterOldAutumn-mainSection'>
						<div className='FooterOldAutumn-mainSection-info'>
							<p className='FooterOldAutumn-heading'>Bạn không tìm thấy sản phẩm cần định giá?</p>
							<button className='FooterOldAutumn-ctaButton'>Nhấn tại đây</button>
						</div>

						<p className='FooterOldAutumn-description'>
							Nhằm chào đón sự kiện ra mắt cửa hàng mới, từ ngày <strong>15/09 đến 31/10/2024</strong>,
							Bạch Long Mobile chính thức khởi động chương trình <strong>Thu Cũ Đổi Mới </strong> cực kỳ
							hấp dẫn, mang đến cho khách hàng cơ hội nâng cấp thiết bị với hàng loạt ưu đãi và tiện ích
							vượt trội.
						</p>
						<p className='FooterOldAutumn-supportText'>1. Thu Nhanh – Lên Đời Trong Tích Tắc</p>
						<button className='FooterOldAutumn-readMoreButton'>Xem thêm</button>
					</div>

					<div className='FooterOldAutumn-extraSection'>
						<div className='FooterOldAutumn-videoSection'>
							<iframe
								src='https://www.youtube.com/embed/eoLHZmo5XrA'
								title='HƯỚNG DẪN QUY TRÌNH THU CŨ ĐỔI MỚI TẠI BẠCH LONG MOBILE'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							></iframe>
						</div>
						<div className='FooterOldAutumn-contactSection'>
							<p>
								Liên hệ tư vấn: <span className='FooterOldAutumn-hotline'>1900.63.64.69</span>
							</p>
							<ul>
								<li>Gọi trực tiếp</li>
								<li>Chat với nhân viên tư vấn</li>
								<li>Để lại bình luận bên dưới</li>
							</ul>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default FooterOldAutumn;
