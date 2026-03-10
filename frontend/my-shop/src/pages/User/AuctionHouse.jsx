// src/pages/AuctionHouse.jsx
import React from 'react';
import { Card, Button, InputNumber, Row, Col, Statistic, Space, Typography } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Countdown } = Statistic;
const { Title, Text } = Typography;

const AuctionHouse = () => {
    const navigate = useNavigate();

    // 1. 模拟多条拍卖商品数据
    const mockAuctions = [
        {
            id: '10001',
            title: '文艺复兴复刻石雕',
            image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=500&q=80',
            currentBid: 45000,
            nextBid: 46000,
            deadline: Date.now() + 1000 * 60 * 60 * 24 * 2, // 2天后结束
            bidsCount: 12
        },
        {
            id: '10002',
            title: '清代乾隆年间青花瓷瓶',
            image: 'https://images.unsplash.com/photo-1615592389070-bcc97e05ad01?auto=format&fit=crop&w=500&q=80',
            currentBid: 120000,
            nextBid: 125000,
            deadline: Date.now() + 1000 * 60 * 60 * 5, // 5小时后结束
            bidsCount: 34
        },
        {
            id: '10003',
            title: '现代抽象综合材料《无题》',
            image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=500&q=80',
            currentBid: 8500,
            nextBid: 9000,
            deadline: Date.now() + 1000 * 60 * 30, // 30分钟后结束 (火热)
            bidsCount: 8
        }
    ];

    // 跳转到商品详情页
    const handleGoDetail = (id) => {
        navigate(`/mall/product/${id}`);
    };

    // 处理举牌出价
    const handleBid = (e, id) => {
        // 阻止事件冒泡，防止点击按钮时触发卡片的跳转事件
        e.stopPropagation();
        console.log(`对商品 ${id} 进行了出价`);
    };

    return (
        <div style={{ padding: '60px 40px', maxWidth: 1000, margin: '0 auto' }}>
            <Title level={2} style={{ fontFamily: 'Playfair Display', margin: 0 }}>
                Live Auction <FireOutlined style={{ color: '#cf1322' }} />
            </Title>
            <div style={{ width: 60, height: 4, background: '#1a1a1a', margin: '16px 0 40px 0' }}></div>

            {/* 2. 使用 Space 组件垂直排列多个卡片 */}
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {mockAuctions.map((item) => (
                    <Card
                        key={item.id}
                        bordered={false}
                        hoverable // 增加悬浮阴影，提示用户可点击
                        onClick={() => handleGoDetail(item.id)} // 卡片点击事件
                        style={{
                            borderRadius: 12,
                            overflow: 'hidden',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                        }}
                        bodyStyle={{ padding: 24 }}
                    >
                        <Row gutter={40} align="middle">
                            {/* 左侧：商品图片 */}
                            <Col span={10}>
                                <div style={{ overflow: 'hidden', borderRadius: 8 }}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            height: 280, // 固定高度，防止图片比例不同导致列表错落不齐
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                    />
                                </div>
                            </Col>

                            {/* 右侧：商品信息与竞拍操作 */}
                            <Col span={14}>
                                <Title level={3} style={{ marginTop: 0, marginBottom: 16 }}>
                                    {item.title}
                                </Title>

                                <Countdown
                                    title="距离落槌仅剩"
                                    value={item.deadline}
                                    format="D 天 H 时 m 分 s 秒"
                                    valueStyle={{ fontSize: 24, color: '#cf1322', fontWeight: 'bold' }}
                                />

                                <div style={{ marginTop: 24, background: '#fafafa', padding: '16px 24px', borderRadius: 8 }}>
                                    <Text type="secondary">当前最高出价 (共 {item.bidsCount} 次出价)</Text>
                                    <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>
                                        ¥ {item.currentBid.toLocaleString()}
                                    </Title>
                                </div>

                                {/* 
                                    重要：onClick={(e) => e.stopPropagation()} 
                                    这里阻断了点击事件向上层（Card）传递，
                                    这样用户在输入框打字、点击加减号、点击按钮时，就不会突然跳转到详情页了。
                                */}
                                <div style={{ marginTop: 24, display: 'flex', gap: 16 }} onClick={(e) => e.stopPropagation()}>
                                    <InputNumber
                                        min={item.nextBid}
                                        step={1000}
                                        defaultValue={item.nextBid}
                                        size="large"
                                        style={{ flex: 1 }}
                                        addonBefore="¥"
                                    />
                                    <Button
                                        type="primary"
                                        size="large"
                                        style={{ background: '#cf1322', borderColor: '#cf1322', width: 140 }}
                                        onClick={(e) => handleBid(e, item.id)}
                                    >
                                        确认举牌
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </Space>
        </div>
    );
};

export default AuctionHouse;
