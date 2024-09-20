'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Button, Form, Input, Select, Modal, FormProps } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './banner-slide.scss';
import Image from 'next/image';

type FieldType = {
  username?: string;
  phone?: string;
  selectedOptions?: { [key: string]: string };
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const BannerSlide = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const allOptionsSelected = modalData.details.every(
      (item: any) => selectedOptions[item.name] !== undefined,
    );

    if (!allOptionsSelected) {
      toast.error('Vui lòng chọn đầy đủ các tùy chọn.');
      return;
    }

    setLoading(true);

    const selectedOptionsForSubmit = modalData.details.map((item: any) => ({
      name: item.name,
      selectedOption: item.options.find(
        (option: any) => option.name === values[item.name as keyof FieldType],
      ),
      selectedPrice: item.selectedPrice || 0,
    }));

    fetch(
      'https://script.google.com/macros/s/AKfycbxut5e6PaLVe5TXZK5fsplzTlKrefCqaUfn4pDiQdMzYUT79DdPwz5f70jQjvEYwaxykw/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          username: values.username,
          phone: values.phone,
          selectedOptions: selectedOptionsForSubmit,
          comboName: modalData.name,
          totalPrice: formatPrice(totalPrice),
        }),
      },
    )
      .then((response) => {
        toast.success('Đặt hàng thành công!');
        setModalIsOpen(false);
        setLoading(false);
        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Đặt hàng thất bại. Vui lòng thử lại.');
        setLoading(false);
      });
  };

  const combos = [
    {
      id: 0,
      name: 'COMBO TẾT APPLE 1',
      price: 960000,
      originalPrice: 2070000,
      image: '/combo-01-16.png',
      percent: 40,
      details: [
        {
          name: 'ỐP LƯNG TRONG',
          image: '/op-lung.png',
          options: [
            { name: 'Transparent Case for iPhone 16 6.1" 2024', price: 310000 },
            { name: 'Transparent Case for iPhone 16 6.3" 2024', price: 310000 },
            { name: 'Transparent Case for iPhone 16 6.7" 2024', price: 310000 },
            { name: 'Transparent Case for iPhone 16 6.9" 2024', price: 310000 },
            { name: 'Ốp lưng Jinya Crystal 16', price: 310000 },
            { name: 'Ốp lưng Jinya Crystal 16 PLUS', price: 310000 },
            { name: 'Ốp lưng Jinya Crystal 16 PRO', price: 310000 },
            { name: 'Ốp lưng Jinya Crystal 16 PRO MAX', price: 310000 },
            {
              name: ' Ốp lưng UNIQ HYBRID IPHONE 16 (2024) 6.1 AIR FENDER - NUDE (TRANSPARENT) ',
              price: 310000,
            },
            {
              name: '  Ốp lưng UNIQ HYBRID IPHONE 16 (2024) 6.7 AIR FENDER - NUDE (TRANSPARENT)  ',
              price: 310000,
            },
            {
              name: ' Ốp lưng UNIQ HYBRID IPHONE 16 PRO (2024) 6.3 AIR FENDER - NUDE (TRANSPARENT) ',
              price: 310000,
            },
            {
              name: ' Ốp lưng UNIQ HYBRID IPHONE 16 PRO (2024) 6.9 AIR FENDER - NUDE (TRANSPARENT) ',
              price: 310000,
            },
          ],
        },
        {
          name: 'CƯỜNG LỰC',
          image: '/cuong-luc.jpg',
          options: [
            {
              name: ' Kính cường lực UNIQ OPTIX VIVID CLEAR IPHONE 16 (2024) 6.1 GLASS SCREEN PROTECTOR - VIVID CLEAR ',
              price: 340000,
            },
            {
              name: ' Kính cường lực UNIQ OPTIX VIVID CLEAR IPHONE 16 plus (2024) 6.7 GLASS SCREEN PROTECTOR - VIVID CLEAR ',
              price: 340000,
            },
            {
              name: ' Kính cường lực UNIQ OPTIX VIVID CLEAR IPHONE 16 PRO (2024) 6.3 GLASS SCREEN PROTECTOR - VIVID CLEAR ',
              price: 340000,
            },
            {
              name: ' Kính cường lực UNIQ OPTIX VIVID CLEAR IPHONE 16 PRO (2024) 6.9 GLASS SCREEN PROTECTOR - VIVID CLEAR ',
              price: 340000,
            },
            {
              name: ' Miếng dán kính cao cấp Jcpal 16 ',
              price: 340000,
            },
            {
              name: '  Miếng dán kính cao cấp Jcpal  16 PLUS ',
              price: 340000,
            },
            {
              name: ' Miếng dán kính cao cấp Jcpal  16 PRO ',
              price: 340000,
            },
            {
              name: ' Miếng dán kính cao cấp Jcpal  16 PRO MAX ',
              price: 340000,
            },
            {
              name: ' HD Premium Silk for iPhone 16 6.1" 2024 ',
              price: 340000,
            },
            {
              name: ' HD Premium Silk for iPhone 16 6.3" 2024 ',
              price: 340000,
            },
            {
              name: ' HD Premium Silk for iPhone 16 6.7" 2024 ',
              price: 340000,
            },
            {
              name: ' HD Premium Silk for iPhone 16 6.9" 2024 ',
              price: 340000,
            },
            {
              name: 'DEKEY 3D MASTER GLASS DELUXE iPhone 16',
              price: 340000,
            },
            {
              name: 'DEKEY 3D MASTER GLASS DELUXE iPhone 16 Plus',
              price: 340000,
            },
            {
              name: 'DEKEY 3D MASTER GLASS DELUXE iPhone 16 Pro',
              price: 340000,
            },
            {
              name: 'DEKEY 3D MASTER GLASS DELUXE iPhone 16 Pro Max',
              price: 340000,
            },
          ],
        },
        {
          name: 'CÓC',
          image: '/coc-sac.png',
          options: [{ name: ' SẠC NHANH 20W INNOSTYLE ', price: 310000 }],
        },
      ],
    },
    {
      id: 1,
      name: 'COMBO TẾT APPLE 2',
      price: 1060000,
      originalPrice: 2660000,
      image: '/combo-02-16.png',
      percent: 60,
      details: [
        {
          name: 'ỐP LƯNG TRONG',
          image: '/op-lung.png',
          options: [
            { name: 'Transparent Case for iPhone 16 6.1" 2024', price: 290000 },
            { name: 'Transparent Case for iPhone 16 6.3" 2024', price: 290000 },
            { name: 'Transparent Case for iPhone 16 6.7" 2024', price: 290000 },
            { name: 'Transparent Case for iPhone 16 6.9" 2024', price: 290000 },
            { name: 'Ốp lưng Jinya Crystal 16', price: 290000 },
            { name: 'Ốp lưng Jinya Crystal 16 PLUS', price: 290000 },
            { name: 'Ốp lưng Jinya Crystal 16 PRO', price: 290000 },
            { name: 'Ốp lưng Jinya Crystal 16 PRO MAX', price: 290000 },
            {
              name: ' Ốp lưng UNIQ HYBRID IPHONE 16 (2024) 6.1 AIR FENDER - NUDE (TRANSPARENT) ',
              price: 290000,
            },
            {
              name: '  Ốp lưng UNIQ HYBRID IPHONE 16 (2024) 6.7 AIR FENDER - NUDE (TRANSPARENT)  ',
              price: 290000,
            },
            {
              name: ' Ốp lưng UNIQ HYBRID IPHONE 16 PRO (2024) 6.3 AIR FENDER - NUDE (TRANSPARENT) ',
              price: 290000,
            },
            {
              name: ' Ốp lưng UNIQ HYBRID IPHONE 16 PRO (2024) 6.9 AIR FENDER - NUDE (TRANSPARENT) ',
              price: 290000,
            },
          ],
        },
        {
          name: 'CƯỜNG LỰC',
          image: '/cuong-luc.jpg',
          options: [
            {
              name: ' Kính cường lực UNIQ OPTIX VIVID CLEAR IPHONE 16 (2024) 6.1 GLASS SCREEN PROTECTOR - VIVID CLEAR ',
              price: 290000,
            },
            {
              name: ' Kính cường lực UNIQ OPTIX VIVID CLEAR IPHONE 16 plus (2024) 6.7 GLASS SCREEN PROTECTOR - VIVID CLEAR ',
              price: 290000,
            },
            {
              name: ' Kính cường lực UNIQ OPTIX VIVID CLEAR IPHONE 16 PRO (2024) 6.3 GLASS SCREEN PROTECTOR - VIVID CLEAR ',
              price: 290000,
            },
            {
              name: ' Kính cường lực UNIQ OPTIX VIVID CLEAR IPHONE 16 PRO (2024) 6.9 GLASS SCREEN PROTECTOR - VIVID CLEAR ',
              price: 290000,
            },
            {
              name: ' Miếng dán kính cao cấp Jcpal 16 ',
              price: 290000,
            },
            {
              name: '  Miếng dán kính cao cấp Jcpal  16 PLUS ',
              price: 290000,
            },
            {
              name: ' Miếng dán kính cao cấp Jcpal  16 PRO ',
              price: 290000,
            },
            {
              name: ' Miếng dán kính cao cấp Jcpal  16 PRO MAX ',
              price: 290000,
            },
            {
              name: ' HD Premium Silk for iPhone 16 6.1" 2024 ',
              price: 290000,
            },
            {
              name: ' HD Premium Silk for iPhone 16 6.3" 2024 ',
              price: 290000,
            },
            {
              name: ' HD Premium Silk for iPhone 16 6.7" 2024 ',
              price: 290000,
            },
            {
              name: ' HD Premium Silk for iPhone 16 6.9" 2024 ',
              price: 290000,
            },
            {
              name: 'DEKEY 3D MASTER GLASS DELUXE iPhone 16',
              price: 290000,
            },
            {
              name: 'DEKEY 3D MASTER GLASS DELUXE iPhone 16 Plus',
              price: 290000,
            },
            {
              name: 'DEKEY 3D MASTER GLASS DELUXE iPhone 16 Pro',
              price: 290000,
            },
            {
              name: 'DEKEY 3D MASTER GLASS DELUXE iPhone 16 Pro Max',
              price: 290000,
            },
          ],
        },
        {
          name: 'CƯỜNG LỰC CAMERA',
          image: '/cuong-luc.jpg',
          options: [
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 (2024) 6.1/6.7 ALUMINIUM CAMERA LENS PROTECTOR - MIDNIGHT (BLACK) ',
              price: 290000,
            },
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 (2024) 6.1/6.7 ALUMINIUM CAMERA LENS PROTECTOR - PEARL BLUE (PEARL BLUE) ',
              price: 290000,
            },
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 (2024) 6.1/6.7 ALUMINIUM CAMERA LENS PROTECTOR - GRAPE PINK (GRAPE PINK) ',
              price: 290000,
            },
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 PRO (2024) 6.3/6.9 ALUMINIUM CAMERA LENS PROTECTOR - MIDNIGHT (BLACK) ',
              price: 290000,
            },
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 PRO (2024) 6.3/6.9 ALUMINIUM CAMERA LENS PROTECTOR - TITANIUM (GREY) ',
              price: 290000,
            },
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 PRO (2024) 6.3/6.9 ALUMINIUM CAMERA LENS PROTECTOR - STERLING (SILVER) ',
              price: 290000,
            },
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 PRO (2024) 6.3/6.9 ALUMINIUM CAMERA LENS PROTECTOR - TAUPE GOLD (TAUPE GOLD) ',
              price: 290000,
            },
            {
              name: ' LENS CAMERA Protector for iPhone 16 Pro / 16 Pro Max 2024 ',
              price: 290000,
            },
            {
              name: ' LENS CAMERA Protector for iPhone 16 / 16 Plus 2024 ',
              price: 290000,
            },
            {
              name: '  Lens Camera Jcpal 16 ',
              price: 290000,
            },
            {
              name: '  Lens Camera Jcpal 16 PLUS ',
              price: 290000,
            },
            {
              name: '  Lens Camera Jcpal 16 PRO  ',
              price: 290000,
            },
            {
              name: ' Lens Camera Jcpal 16 PRO MAX ',
              price: 290000,
            },
          ],
        },
        {
          name: 'CÓC',
          image: '/coc-sac.png',
          options: [{ name: ' SẠC NHANH 20W INNOSTYLE ', price: 190000 }],
        },
      ],
    },
    {
      id: 2,
      name: 'COMBO TẾT APPLE 3',
      price: 1360000,
      originalPrice: 2660000,
      image: '/combo-03-16.png',
      percent: 50,
      details: [
        {
          name: 'ỐP LƯNG TRONG',
          image: '/op-lung.png',
          options: [
            { name: 'Transparent Case for iPhone 16 6.1" 2024', price: 290000 },
            { name: 'Transparent Case for iPhone 16 6.3" 2024', price: 290000 },
            { name: 'Transparent Case for iPhone 16 6.7" 2024', price: 290000 },
            { name: 'Transparent Case for iPhone 16 6.9" 2024', price: 290000 },
            { name: 'Ốp lưng Jinya Crystal 16', price: 290000 },
            { name: 'Ốp lưng Jinya Crystal 16 PLUS', price: 290000 },
            { name: 'Ốp lưng Jinya Crystal 16 PRO', price: 290000 },
            { name: 'Ốp lưng Jinya Crystal 16 PRO MAX', price: 290000 },
            {
              name: ' Ốp lưng UNIQ HYBRID IPHONE 16 (2024) 6.1 AIR FENDER - NUDE (TRANSPARENT) ',
              price: 290000,
            },
            {
              name: '  Ốp lưng UNIQ HYBRID IPHONE 16 (2024) 6.7 AIR FENDER - NUDE (TRANSPARENT)  ',
              price: 290000,
            },
            {
              name: ' Ốp lưng UNIQ HYBRID IPHONE 16 PRO (2024) 6.3 AIR FENDER - NUDE (TRANSPARENT) ',
              price: 290000,
            },
            {
              name: ' Ốp lưng UNIQ HYBRID IPHONE 16 PRO (2024) 6.9 AIR FENDER - NUDE (TRANSPARENT) ',
              price: 290000,
            },
          ],
        },
        {
          name: 'CƯỜNG LỰC',
          image: '/cuong-luc.jpg',
          options: [
            {
              name: ' Kính cường lực UNIQ OPTIX VIVID CLEAR IPHONE 16 (2024) 6.1 GLASS SCREEN PROTECTOR - VIVID CLEAR ',
              price: 290000,
            },
            {
              name: ' Kính cường lực UNIQ OPTIX VIVID CLEAR IPHONE 16 plus (2024) 6.7 GLASS SCREEN PROTECTOR - VIVID CLEAR ',
              price: 290000,
            },
            {
              name: ' Kính cường lực UNIQ OPTIX VIVID CLEAR IPHONE 16 PRO (2024) 6.3 GLASS SCREEN PROTECTOR - VIVID CLEAR ',
              price: 290000,
            },
            {
              name: ' Kính cường lực UNIQ OPTIX VIVID CLEAR IPHONE 16 PRO (2024) 6.9 GLASS SCREEN PROTECTOR - VIVID CLEAR ',
              price: 290000,
            },
            {
              name: ' Miếng dán kính cao cấp Jcpal 16 ',
              price: 290000,
            },
            {
              name: '  Miếng dán kính cao cấp Jcpal  16 PLUS ',
              price: 290000,
            },
            {
              name: ' Miếng dán kính cao cấp Jcpal  16 PRO ',
              price: 290000,
            },
            {
              name: ' Miếng dán kính cao cấp Jcpal  16 PRO MAX ',
              price: 290000,
            },
            {
              name: ' HD Premium Silk for iPhone 16 6.1" 2024 ',
              price: 290000,
            },
            {
              name: ' HD Premium Silk for iPhone 16 6.3" 2024 ',
              price: 290000,
            },
            {
              name: ' HD Premium Silk for iPhone 16 6.7" 2024 ',
              price: 290000,
            },
            {
              name: ' HD Premium Silk for iPhone 16 6.9" 2024 ',
              price: 290000,
            },
            {
              name: 'DEKEY 3D MASTER GLASS DELUXE iPhone 16',
              price: 290000,
            },
            {
              name: 'DEKEY 3D MASTER GLASS DELUXE iPhone 16 Plus',
              price: 290000,
            },
            {
              name: 'DEKEY 3D MASTER GLASS DELUXE iPhone 16 Pro',
              price: 290000,
            },
            {
              name: 'DEKEY 3D MASTER GLASS DELUXE iPhone 16 Pro Max',
              price: 290000,
            },
          ],
        },
        {
          name: 'CƯỜNG LỰC CAMERA',
          image: '/cuong-luc.jpg',
          options: [
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 (2024) 6.1/6.7 ALUMINIUM CAMERA LENS PROTECTOR - MIDNIGHT (BLACK) ',
              price: 250000,
            },
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 (2024) 6.1/6.7 ALUMINIUM CAMERA LENS PROTECTOR - PEARL BLUE (PEARL BLUE) ',
              price: 250000,
            },
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 (2024) 6.1/6.7 ALUMINIUM CAMERA LENS PROTECTOR - GRAPE PINK (GRAPE PINK) ',
              price: 250000,
            },
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 PRO (2024) 6.3/6.9 ALUMINIUM CAMERA LENS PROTECTOR - MIDNIGHT (BLACK) ',
              price: 250000,
            },
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 PRO (2024) 6.3/6.9 ALUMINIUM CAMERA LENS PROTECTOR - TITANIUM (GREY) ',
              price: 250000,
            },
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 PRO (2024) 6.3/6.9 ALUMINIUM CAMERA LENS PROTECTOR - STERLING (SILVER) ',
              price: 250000,
            },
            {
              name: ' Kính bảo vệ camera UNIQ OPTIX IPHONE 16 PRO (2024) 6.3/6.9 ALUMINIUM CAMERA LENS PROTECTOR - TAUPE GOLD (TAUPE GOLD) ',
              price: 250000,
            },
            {
              name: ' LENS CAMERA Protector for iPhone 16 Pro / 16 Pro Max 2024 ',
              price: 190000,
            },
            {
              name: ' LENS CAMERA Protector for iPhone 16 / 16 Plus 2024 ',
              price: 190000,
            },
            {
              name: '  Lens Camera Jcpal 16 ',
              price: 190000,
            },
            {
              name: '  Lens Camera Jcpal 16 PLUS ',
              price: 190000,
            },
            {
              name: '  Lens Camera Jcpal 16 PRO  ',
              price: 190000,
            },
            {
              name: ' Lens Camera Jcpal 16 PRO MAX ',
              price: 190000,
            },
          ],
        },
        {
          name: 'CÓC',
          image: '/coc-sac.png',
          options: [
            { name: '  SẠC APPLE 20W USB-C MHJE3ZA/A ', price: 530000 },
          ],
        },
      ],
    },
  ];

  const combos15 = [
    {
      id: 0,
      name: 'COMBO SIÊU RẺ 1',
      price: 640000,
      image: '/combo-01-15.png',
      details: [
        {
          name: 'ỐP LƯNG TRONG',
          image: '/op-lung.png',
          options: [
            { name: ' Ốp Lưng JINYA Crystal iPhone 15 JA6524 ', price: 300000 },
            {
              name: ' Ốp Lưng JINYA Crystal iPhone 15 Plus JA6526 ',
              price: 300000,
            },
            {
              name: ' Ốp Lưng JINYA Crystal iPhone 15 Pro JA6525 ',
              price: 300000,
            },
            {
              name: ' Ốp Lưng JINYA Crystal iPhone 15 Pro Max JA6527 ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG TRONG SUỐT SILICON TPU IPHONE 15 PLUS SOFT TRANSPARENT CASE – ST15B ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG TRONG SUỐT SILICON TPU IPHONE 15 PRO SOFT TRANSPARENT CASE – ST15C ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG TRONG SUỐT SILICON TPU IPHONE 15 PRO MAX SOFT TRANSPARENT CASE – ST15D ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG IPHONE 15 MIPOW TEMPERED TRANSPARNET CASE – PS15A ',
              price: 300000,
            },
            {
              name: '  ỐP LƯNG IPHONE 15 PLUS MIPOW TEMPERED TRANSPARNET CASE – PS15B  ',
              price: 300000,
            },
            {
              name: '   ỐP LƯNG IPHONE 15 PRO MIPOW TEMPERED TRANSPARNET CASE – PS15C  ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG IPHONE 15 PRO MAX MIPOW TEMPERED TRANSPARNET CASE – PS15D  ',
              price: 300000,
            },
          ],
        },
        {
          name: 'CƯỜNG LỰC',
          image: '/cuong-luc.jpg',
          options: [
            {
              name: ' Cường Lực Jcpal Preserver IPhone 15 - JCP4280 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Jcpal Preserver IPhone 15 Pro - JCP4281 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Jcpal Preserver IPhone 15 Plus - JCP4282 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Jcpal Preserver IPhone 15 Pro Max - JCP4283 ',
              price: 340000,
            },
            {
              name: 'Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 Pro Max - BJ532 ',
              price: 340000,
            },
            {
              name: '  Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 Pro - BJ531 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 Plus - BJ530 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 - BJ529 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 Pro Max - BJ516 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 Pro - BJ515 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 Plus - BJ514 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 - BJ513 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 - BJ501 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PLUS - BJ502 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PRO - BJ503 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PRO MAX - BJ504 ',
              price: 340000,
            },
            {
              name: '  CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PRO MAX - BJ504  ',
              price: 340000,
            },
          ],
        },
      ],
    },
    {
      id: 1,
      name: 'COMBO SIÊU RẺ 2',
      price: 880000,
      image: '/combo-02-15.png',
      details: [
        {
          name: 'CƯỜNG LỰC',
          image: '/cuong-luc.jpg',
          options: [
            {
              name: '  Cường Lực Jcpal Preserver IPhone 15 - JCP4280  ',
              price: 340000,
            },
            {
              name: ' Cường Lực Jcpal Preserver IPhone 15 Pro - JCP4281  ',
              price: 340000,
            },
            {
              name: '  Cường Lực Jcpal Preserver IPhone 15 Plus - JCP4282  ',
              price: 340000,
            },
            {
              name: ' Cường Lực Jcpal Preserver IPhone 15 Pro Max - JCP4283  ',
              price: 340000,
            },
            {
              name: ' Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 Pro Max - BJ532  ',
              price: 340000,
            },
            {
              name: '  Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 Pro - BJ531 ',
              price: 340000,
            },
            {
              name: '  Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 Plus - BJ530  ',
              price: 340000,
            },
            {
              name: '  Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 - BJ529  ',
              price: 340000,
            },
            {
              name: '  Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 Pro Max - BJ516  ',
              price: 340000,
            },
            {
              name: '  Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 Pro - BJ515 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 Plus - BJ514 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 - BJ513 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 - BJ501 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PLUS - BJ502 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PRO - BJ503 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PRO MAX - BJ504 ',
              price: 340000,
            },
          ],
        },
        {
          name: 'CÓC',
          image: '/coc-sac.png',
          options: [{ name: ' SẠC APPLE 20W USB-C MHJE3ZA/A ', price: 540000 }],
        },
      ],
    },
    {
      id: 2,
      name: 'COMBO SIÊU RẺ 3',
      price: 890000,
      image: '/combo-03-15.png',
      details: [
        {
          name: 'ỐP LƯNG TRONG',
          image: '/op-lung.png',
          options: [
            { name: ' Ốp Lưng JINYA Crystal iPhone 15 JA6524 ', price: 300000 },
            {
              name: ' Ốp Lưng JINYA Crystal iPhone 15 Plus JA6526 ',
              price: 300000,
            },
            {
              name: ' Ốp Lưng JINYA Crystal iPhone 15 Pro JA6525 ',
              price: 300000,
            },
            {
              name: ' Ốp Lưng JINYA Crystal iPhone 15 Pro Max JA6527 ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG TRONG SUỐT SILICON TPU IPHONE 15 PLUS SOFT TRANSPARENT CASE – ST15B ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG TRONG SUỐT SILICON TPU IPHONE 15 PRO SOFT TRANSPARENT CASE – ST15C ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG TRONG SUỐT SILICON TPU IPHONE 15 PRO MAX SOFT TRANSPARENT CASE – ST15D ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG IPHONE 15 MIPOW TEMPERED TRANSPARNET CASE – PS15A ',
              price: 300000,
            },
            {
              name: '  ỐP LƯNG IPHONE 15 PLUS MIPOW TEMPERED TRANSPARNET CASE – PS15B ',
              price: 300000,
            },
            {
              name: '  ỐP LƯNG IPHONE 15 PRO MIPOW TEMPERED TRANSPARNET CASE – PS15C ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG IPHONE 15 PRO MAX MIPOW TEMPERED TRANSPARNET CASE – PS15D ',
              price: 300000,
            },
          ],
        },
        {
          name: 'CƯỜNG LỰC',
          image: '/cuong-luc.jpg',
          options: [
            {
              name: ' Cường Lực Jcpal Preserver IPhone 15 - JCP4280 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Jcpal Preserver IPhone 15 Pro - JCP4281 ',
              price: 340000,
            },
            {
              name: 'Cường Lực Jcpal Preserver IPhone 15 Plus - JCP4282 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Jcpal Preserver IPhone 15 Pro Max - JCP4283 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 Pro Max - BJ532 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 Pro - BJ531 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 Plus - BJ530 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 - BJ529 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 Pro Max - BJ516 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 Pro - BJ515 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 Plus - BJ514 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 - BJ513 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 - BJ501 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PLUS - BJ502 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PRO - BJ503 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PRO MAX - BJ504 ',
              price: 340000,
            },
          ],
        },
        {
          name: 'CƯỜNG LỰC CAMERA',
          image: '/cuong-luc.jpg',
          options: [
            {
              name: '  Lens Camera JCPAL Preserver Iphone 15/15 Plus - Silver - JCP4293 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15/15 Plus - Black - JCP4294 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15/15 Plus - Blue - JCP4295 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15/15 Plus - Pink - JCP4296 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15/15 Plus - Yellow - JCP4297 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15 Pro Blue - JCP4299 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15 Pro Space Black - JCP4300 ',
              price: 250000,
            },
            {
              name: '  Lens Camera JCPAL Preserver Iphone 15 Pro Silver - JCP4301 ',
              price: 250000,
            },
            {
              name: '  Lens Camera JCPAL Preserver Iphone 15 Pro Grey - JCP4302 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15 Promax Blue - JCP4304 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15 Promax Space Black - JCP4305 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15 Promax Silver - JCP4306 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15 Promax Grey - JCP4307 ',
              price: 250000,
            },
            {
              name: '  Dán cường lực bảo vệ camera MIPOW iPhone 15 |15 Plus BJ15A - GREEN ',
              price: 250000,
            },
            {
              name: ' Dán cường lực bảo vệ camera MIPOW iPhone 15 |15 Plus BJ15A - BLACK ',
              price: 250000,
            },
            {
              name: ' Dán cường lực bảo vệ camera MIPOW iPhone 15 Pro |15 Pro Max BJ15B - Titan Gray ',
              price: 250000,
            },
            {
              name: ' Dán cường lực bảo vệ camera MIPOW iPhone 15 Pro |15 Pro Max BJ15B - WHITE ',
              price: 250000,
            },
            {
              name: ' Dán cường lực bảo vệ camera MIPOW iPhone 15 Pro |15 Pro Max BJ15B - BLACK ',
              price: 250000,
            },
            {
              name: ' Dán cường lực bảo vệ camera MIPOW iPhone 15 Pro |15 Pro Max BJ15B - BLUE  ',
              price: 250000,
            },
            {
              name: ' Dán cường lực bảo vệ camera MIPOW iPhone 15 Pro |15 Pro Max BJ15B - Titan Gray   ',
              price: 250000,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'COMBO SIÊU RẺ 4',
      price: 1380000,
      image: '/combo-04-15.png',
      details: [
        {
          name: 'ỐP LƯNG TRONG',
          image: '/op-lung.png',
          options: [
            { name: ' Ốp Lưng JINYA Crystal iPhone 15 JA6524 ', price: 300000 },
            {
              name: ' Ốp Lưng JINYA Crystal iPhone 15 Plus JA6526 ',
              price: 300000,
            },
            {
              name: ' Ốp Lưng JINYA Crystal iPhone 15 Pro JA6525 ',
              price: 300000,
            },
            {
              name: ' Ốp Lưng JINYA Crystal iPhone 15 Pro Max JA6527 ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG TRONG SUỐT SILICON TPU IPHONE 15 PLUS SOFT TRANSPARENT CASE – ST15B ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG TRONG SUỐT SILICON TPU IPHONE 15 PRO SOFT TRANSPARENT CASE – ST15C ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG TRONG SUỐT SILICON TPU IPHONE 15 PRO MAX SOFT TRANSPARENT CASE – ST15D ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG IPHONE 15 MIPOW TEMPERED TRANSPARNET CASE – PS15A ',
              price: 300000,
            },
            {
              name: '  ỐP LƯNG IPHONE 15 PLUS MIPOW TEMPERED TRANSPARNET CASE – PS15B ',
              price: 300000,
            },
            {
              name: '  ỐP LƯNG IPHONE 15 PRO MIPOW TEMPERED TRANSPARNET CASE – PS15C ',
              price: 300000,
            },
            {
              name: ' ỐP LƯNG IPHONE 15 PRO MAX MIPOW TEMPERED TRANSPARNET CASE – PS15D ',
              price: 300000,
            },
          ],
        },
        {
          name: 'CƯỜNG LỰC',
          image: '/cuong-luc.jpg',
          options: [
            {
              name: ' Cường Lực Jcpal Preserver IPhone 15 - JCP4280 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Jcpal Preserver IPhone 15 Pro - JCP4281 ',
              price: 340000,
            },
            {
              name: 'Cường Lực Jcpal Preserver IPhone 15 Plus - JCP4282 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Jcpal Preserver IPhone 15 Pro Max - JCP4283 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 Pro Max - BJ532 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 Pro - BJ531 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 Plus - BJ530 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Mờ Chống Vân Tay Mipow Kingbull iPhone 15 - BJ529 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 Pro Max - BJ516 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 Pro - BJ515 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 Plus - BJ514 ',
              price: 340000,
            },
            {
              name: ' Cường Lực Chống Nhìn Trộm Mipow Kingbull IPhone 15 - BJ513 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 - BJ501 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PLUS - BJ502 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PRO - BJ503 ',
              price: 340000,
            },
            {
              name: ' CƯỜNG LỰC MIPOW KINGBULL PREMIUM IPHONE 15 PRO MAX - BJ504 ',
              price: 340000,
            },
          ],
        },
        {
          name: 'CƯỜNG LỰC CAMERA',
          image: '/cuong-luc.jpg',
          options: [
            {
              name: '  Lens Camera JCPAL Preserver Iphone 15/15 Plus - Silver - JCP4293 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15/15 Plus - Black - JCP4294 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15/15 Plus - Blue - JCP4295 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15/15 Plus - Pink - JCP4296 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15/15 Plus - Yellow - JCP4297 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15 Pro Blue - JCP4299 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15 Pro Space Black - JCP4300 ',
              price: 250000,
            },
            {
              name: '  Lens Camera JCPAL Preserver Iphone 15 Pro Silver - JCP4301 ',
              price: 250000,
            },
            {
              name: '  Lens Camera JCPAL Preserver Iphone 15 Pro Grey - JCP4302 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15 Promax Blue - JCP4304 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15 Promax Space Black - JCP4305 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15 Promax Silver - JCP4306 ',
              price: 250000,
            },
            {
              name: ' Lens Camera JCPAL Preserver Iphone 15 Promax Grey - JCP4307 ',
              price: 250000,
            },
            {
              name: '  Dán cường lực bảo vệ camera MIPOW iPhone 15 |15 Plus BJ15A - GREEN ',
              price: 250000,
            },
            {
              name: ' Dán cường lực bảo vệ camera MIPOW iPhone 15 |15 Plus BJ15A - BLACK ',
              price: 250000,
            },
            {
              name: ' Dán cường lực bảo vệ camera MIPOW iPhone 15 Pro |15 Pro Max BJ15B - Titan Gray ',
              price: 250000,
            },
            {
              name: ' Dán cường lực bảo vệ camera MIPOW iPhone 15 Pro |15 Pro Max BJ15B - WHITE ',
              price: 250000,
            },
            {
              name: ' Dán cường lực bảo vệ camera MIPOW iPhone 15 Pro |15 Pro Max BJ15B - BLACK ',
              price: 250000,
            },
            {
              name: ' Dán cường lực bảo vệ camera MIPOW iPhone 15 Pro |15 Pro Max BJ15B - BLUE  ',
              price: 250000,
            },
            {
              name: ' Dán cường lực bảo vệ camera MIPOW iPhone 15 Pro |15 Pro Max BJ15B - Titan Gray   ',
              price: 250000,
            },
          ],
        },
        {
          name: 'CÓC',
          image: '/coc-sac.png',
          options: [{ name: 'SẠC APPLE 20W USB-C MHJE3ZA/A', price: 490000 }],
        },
      ],
    },
  ];

  const openModalWithCombo = (comboId: number) => {
    const selectedCombo = combos.find((combo) => combo.id === comboId);
    setModalData(selectedCombo);
    setTotalPrice(0);
    setModalIsOpen(true);
  };

  const openModalWithCombo15 = (comboId: number) => {
    const selectedCombo = combos15.find((combo) => combo.id === comboId);
    setModalData(selectedCombo);
    setTotalPrice(0);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const isAllOptionsSelected =
    modalData?.details?.every(
      (item: any) => selectedOptions[item.name] !== undefined,
    ) ?? false;

  const handleOptionChange = (itemIndex: number, value: string) => {
    const selectedItem = modalData.details[itemIndex].options.find(
      (option: any) => option.name === value,
    );

    if (selectedItem) {
      modalData.details[itemIndex].selectedPrice = selectedItem.price;

      const newTotalPrice = modalData.details.reduce(
        (acc: number, item: any) => {
          return acc + (item.selectedPrice || 0);
        },
        0,
      );

      setTotalPrice(newTotalPrice);

      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [modalData.details[itemIndex].name]: value,
      }));
    }
  };

  return (
    <div className="banner-slide">
      <div className="container">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView="auto"
          autoplay
          speed={1000}
          navigation
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
        >
          <SwiperSlide>
            <Image
              src="/banner-slide-01.png"
              width={1200}
              height={900}
              alt="banner-slide-01"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/banner-slide-02.png"
              width={1200}
              height={900}
              alt="banner-slide-02"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/banner-slide-03.png"
              width={1200}
              height={900}
              alt="banner-slide-03"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/banner-slide-04.jpg"
              width={1200}
              height={900}
              alt="banner-slide-04"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/banner-slide-05.png"
              width={1200}
              height={900}
              alt="banner-slide-05"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/banner-slide-06.jpg"
              width={1200}
              height={900}
              alt="banner-slide-06"
            />
          </SwiperSlide>
        </Swiper>

        <Image
          src="/banner-60-percent.png"
          width={1820}
          height={1200}
          alt="banner-60-percent"
          className="banner-percent"
        />

        <h3 className="banner-slide-combo-title">COMBO PHỤ KIỆN iPHONE 16</h3>

        <div className="banner-slide-combo">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="banner-slide-combo-wrap"
              onClick={() => openModalWithCombo(combo.id)}
            >
              <div className="banner-slide-combo-card">
                <div className="banner-slide-combo-header">
                  <div className="combo-txt">
                    <span>-{combo.percent}%</span>
                  </div>
                </div>
                <div className="banner-slide-combo-button">{combo.name}</div>
                <Image
                  src={combo.image}
                  width={400}
                  height={400}
                  alt="banner-slide-combo-image"
                  className="banner-slide-combo-image"
                />
              </div>
              <div className="banner-slide-combo-reduced">
                <span> </span>
                <span className="banner-slide-combo-reduced-pirce">
                  {formatPrice(combo.originalPrice)}
                </span>
              </div>
              <div className="banner-slide-combo-price">
                <span className="banner-slide-combo-price-sub">Giá bán: </span>
                <span className="banner-slide-combo-price-txt">
                  {formatPrice(combo.price)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="banner-slide-combo-title">COMBO PHỤ KIỆN iPHONE 15</h3>

        <div className="banner-slide-combo15">
          {combos15.map((combo) => (
            <div
              key={combo.id}
              className="banner-slide-combo15-wrap"
              onClick={() => openModalWithCombo15(combo.id)}
            >
              <div className="banner-slide-combo15-card">
                <div className="banner-slide-combo15-button">{combo.name}</div>
                <Image
                  src={combo.image}
                  width={400}
                  height={400}
                  alt="banner-slide-combo15-image"
                  className="banner-slide-combo15-image"
                />
                <div className="banner-slide-combo15-price">
                  <span className="banner-slide-combo15-price-txt">
                    {formatPrice(combo.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalIsOpen && modalData && (
          <Modal visible={modalIsOpen} onCancel={closeModal} footer={false}>
            <h2 className="modal-title">{modalData.name}</h2>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Họ và tên khách hàng"
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại' },
                  {
                    pattern: /^\d{10}$/,
                    message: 'Số điện thoại phải có 10 chữ số',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <div className="modal-content">
                {modalData.details.map((item: any, index: number) => (
                  <div key={index} className="modal-detail-item">
                    <Image
                      src={item.image}
                      width={100}
                      height={100}
                      alt={item.name}
                      className="modal-item-image"
                    />
                    <div className="modal-item-wrap-select">
                      <h4>{item.name}</h4>
                      <Form.Item className="modal-select" name={item.name}>
                        <Select
                          placeholder={`Chọn ${item.name}`}
                          onChange={(value) => handleOptionChange(index, value)}
                        >
                          {item.options.map((option: any, optIndex: number) => (
                            <Select.Option key={optIndex} value={option.name}>
                              <div className="option-content">
                                <span className="option-name">
                                  {option.name}
                                </span>
                                <span className="option-price">
                                  {formatPrice(option.price)}
                                </span>
                              </div>
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-price-wrap">
                <span>Tổng tiền: </span>
                <h3 className="modal-price">{formatPrice(totalPrice)}</h3>
              </div>
              <Form.Item wrapperCol={{ span: 16 }} className="modal-btn-wrap">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="modal-btn"
                  disabled={!isAllOptionsSelected}
                >
                  {loading ? 'Đang đặt hàng...' : 'Đặt hàng ngay'}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default BannerSlide;
