// src/pages/mall/MallHome.jsx
import React from 'react';
import { Row, Col, Card, Tag, Typography, Space } from 'antd';
import { ClockCircleOutlined, FireOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const MallHome = () => {
    const navigate = useNavigate();

    // 模拟纯拍卖数据
    const auctionLots = [
        {
            id: 'LOT-001',
            title: '晨雾中的威尼斯',
            artist: 'Claude Monet',
            currentBid: 125000,
            bidsCount: 12,
            endTime: '今日 22:00 截拍',
            status: 'live', // live: 正在热拍, preview: 预展中
            img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 'LOT-002',
            title: '抽象空间 No.3',
            artist: 'Wassily Kandinsky',
            currentBid: 85000,
            bidsCount: 0,
            endTime: '明日 20:00 截拍',
            status: 'live',
            img: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 'LOT-003',
            title: '静物与陶罐',
            artist: 'Paul Cézanne',
            currentBid: 45000,
            bidsCount: 0,
            endTime: '11月25日 10:00 开拍',
            status: 'preview',
            img: 'https://images.unsplash.com/photo-1580136608260-4ebf15bac371?auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 'LOT-004',
            title: '现代几何',
            artist: 'Piet Mondrian',
            currentBid: 210000,
            bidsCount: 34,
            endTime: '今日 23:30 截拍',
            status: 'live',
            img: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&w=600&q=80'
        },
    ];

    return (
        <div style={{ padding: '60px 40px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
                <h1 style={{ fontFamily: 'Playfair Display', fontSize: 36, letterSpacing: '2px', margin: 0 }}>Autumn Auction 2023</h1>
                <p style={{ color: '#888', marginTop: 12, letterSpacing: '4px', textTransform: 'uppercase', fontSize: 12 }}>
                    当代与印象派艺术 秋季专场
                </p>
                <div style={{ width: 40, height: 2, background: '#d4af37', margin: '24px auto 0' }}></div>
            </div>

            <Row gutter={[48, 64]}>
                {auctionLots.map(lot => (
                    <Col xs={24} sm={12} md={6} key={lot.id}>
                        <Card
                            hoverable
                            bordered={false}
                            bodyStyle={{ padding: '20px 0 0 0' }}
                            style={{ background: 'transparent' }}
                            cover={
                                <div style={{ position: 'relative', overflow: 'hidden' }}>
                                    <img
                                        alt={lot.title}
                                        src={lot.img}
                                        style={{ width: '100%', height: 350, objectFit: 'cover', transition: 'transform 0.5s' }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    {/* 状态角标 */}
                                    <div style={{ position: 'absolute', top: 12, left: 12 }}>
                                        {lot.status === 'live' ? (
                                            <Tag color="#d4af37" style={{ border: 'none', borderRadius: 2 }}><FireOutlined /> 正在热拍</Tag>
                                        ) : (
                                            <Tag color="default" style={{ border: 'none', borderRadius: 2, background: 'rgba(255,255,255,0.9)' }}>预展中</Tag>
                                        )}
                                    </div>
                                </div>
                            }
                            onClick={() => navigate(`/mall/product/${lot.id}`)}
                        >
                            <div style={{ color: '#999', fontSize: 12, marginBottom: 8, fontFamily: 'Playfair Display' }}>{lot.id}</div>
                            <h3 style={{ margin: '0 0 4px 0', fontSize: 16, fontWeight: 500, color: '#1a1a1a' }}>{lot.title}</h3>
                            <p style={{ color: '#888', fontStyle: 'italic', margin: '0 0 16px 0', fontSize: 13 }}>{lot.artist}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #eee', paddingTop: 16 }}>
                                <div>
                                    <div style={{ fontSize: 12, color: '#999' }}>{lot.bidsCount > 0 ? '当前最高出价' : '起拍价'}</div>
                                    <div style={{ fontFamily: 'Playfair Display', fontSize: 20, fontWeight: 'bold', color: lot.bidsCount > 0 ? '#d4af37' : '#1a1a1a' }}>
                                        ¥ {lot.currentBid.toLocaleString()}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <Text type="secondary" style={{ fontSize: 12 }}><ClockCircleOutlined /> {lot.endTime}</Text>
                                    <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{lot.bidsCount} 次出价</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default MallHome;
