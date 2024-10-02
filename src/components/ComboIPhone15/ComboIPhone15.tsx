"use client"
import React, { useEffect, useState } from 'react';
import "./ComboIPhone15.scss"
import Image from 'next/image';
import { Button, Form, Input, message, Modal, Select } from 'antd';

interface ProductCombo16 {
    combo: string;
    items: {
        type: string;
        items: {
            nameproduct: string;
            priceorigin: number;
            comboprice: number;
        }[];
    }[];
}

type FieldType = {
    username?: string;
    phone?: string;
    [key: string]: string | undefined;
};

const ComboIPhone15: React.FC = () => {
    const [fetchedData, setFetchedData] = useState<ProductCombo16[]>([]);
    const [selectedCombo, setSelectedCombo] = useState<ProductCombo16 | null>(null);
    const [modalIsOpenTest, setModalIsOpenTest] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const fetchData = async () => {
        const response = await fetch(
            'https://script.google.com/macros/s/AKfycbysamsKFA9Pbr0czRuXVDWKpnCo5BM3HxutpKXLPY_jemM6GZTBCkR6_5oe-nlnK92pbw/exec?id=iphone15',
            {
                method: 'GET',
            }
        );
        const data: ProductCombo16[] = await response.json();
        setFetchedData(data);
        console.log('data from', data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleClickTest = (combo: ProductCombo16) => {
        setSelectedCombo(combo);
        setModalIsOpenTest(true);
        form.resetFields();
        setTotalPrice(0);
    };

    const closeModalTest = () => {
        setModalIsOpenTest(false);
    };

    const onFinish = async (values: FieldType) => {
        setLoading(true);

        const selectedProducts = selectedCombo?.items.map(item => values[item.type]).filter(Boolean);
        const productString = selectedProducts?.join(', ');

        const formData = {
            username: values.username,
            phone: values.phone,
            product: productString,
            totalPrice: totalPrice
        };

        console.log('Form data to be sent:', formData);

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzHD0Ji9_DtyiTGJUQn4PPkmOtNIFSYo-RRcU8vn49Tff_T7lJ8COdalOhbKEdKBG2g/exec', {
                method: 'POST',
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200 || response.status === 302) {
                console.log('Success:', response);
                message.success('Đơn hàng đã được gửi thành công!');
                closeModalTest();
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const onValuesChange = (changedValues: any, allValues: FieldType) => {
        if (selectedCombo) {
            let newTotalPrice = 0;
            selectedCombo.items.forEach((item) => {
                const selectedProduct = item.items.find(
                    (subItem) => subItem.nameproduct === allValues[item.type]
                );
                if (selectedProduct) {
                    newTotalPrice += selectedProduct.comboprice;
                }
            });
            setTotalPrice(newTotalPrice);
        }
    };

    return (
        <div className='banner-slide'>
            <div className='container'>
                <div className='banner-slide-combo15'>
                    {fetchedData.map((combo, index) => (
                        <div
                            key={index}
                            className='banner-slide-combo15-wrap'
                            onClick={() => handleClickTest(combo)}>
                            <div className='banner-slide-combo15-card'>
                                <div className='banner-slide-combo15-button'>{combo.combo}</div>
                                <Image
                                    src="/coc-sac.png"
                                    width={400}
                                    height={400}
                                    alt='banner-slide-combo15-image'
                                    className='banner-slide-combo15-image'
                                />
                                <div className='banner-slide-combo15-price'>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal visible={modalIsOpenTest} onCancel={closeModalTest} footer={false}>
                    {selectedCombo && (
                        <Form
                            form={form}
                            name='basic'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={onFinish}
                            onValuesChange={onValuesChange}
                            autoComplete='off'
                        >
                            <Form.Item<FieldType>
                                label='Họ và tên khách hàng'
                                name='username'
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label='Số điện thoại'
                                name='phone'
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

                            <div className='modal-content'>
                                {selectedCombo.items.map((item, index) => (
                                    <Form.Item
                                        className='modal-select'
                                        key={`form-item-${index}`}
                                        name={item.type}
                                        rules={[{ required: true, message: `Vui lòng chọn ${item.type}` }]}
                                    >
                                        <Select placeholder={`Chọn ${item.type}`}>
                                            {item.items.map((subItem, subIndex) => (
                                                <Select.Option
                                                    key={`option-${index}-${subIndex}`}
                                                    value={subItem.nameproduct}
                                                >
                                                    <div className='option-content'>
                                                        <span className='option-name'>{subItem.nameproduct}</span>
                                                        <span className='option-price'>
                                                            {subItem.comboprice.toLocaleString()} VND
                                                        </span>
                                                    </div>
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                ))}
                            </div>
                            <div className='modal-price-wrap'>
                                <span>Tổng tiền: </span>
                                <h3 className='modal-price'>{totalPrice.toLocaleString()} VND</h3>
                            </div>
                            <Form.Item wrapperCol={{ span: 16 }} className='modal-btn-wrap'>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    loading={loading}
                                    className='modal-btn'
                                >
                                    {loading ? 'Đang đặt hàng...' : 'Đặt hàng ngay'}
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default ComboIPhone15;