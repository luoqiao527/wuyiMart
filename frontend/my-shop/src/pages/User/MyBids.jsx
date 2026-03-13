// src/pages/user/MyBids.jsx
import React, { useState } from 'react';
import { Typography, Tabs, List, Tag, Button, Space, Row, Col, Divider } from 'antd';
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    TrophyOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const MyBids = () => {
    const navigate = useNavigate();

    // 模拟用户的竞拍数据
    const [bidsData] = useState([
        {
            id: 'BID-001',
            lotId: 'LOT-001',
            title: '晨雾中的威尼斯',
            artist: 'Claude Monet',
            image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=300&q=80',
            myMaxBid: 125000,
            currentBid: 125000,
            endTime: '今日 22:00',
            status: 'winning', // leading/winning: 领先
        },
        {
            id: 'BID-002',
            lotId: 'LOT-004',
            title: '现代几何',
            artist: 'Piet Mondrian',
            image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&w=300&q=80',
            myMaxBid: 200000,
            currentBid: 210000, // 别人的出价更高
            endTime: '今日 23:30',
            status: 'outbid', // outbid: 被超越
        },
        {
            id: 'BID-003',
            lotId: 'LOT-008',
            title: '星夜布面习作',
            artist: 'Vincent van Gogh',
            image: 'https://images.unsplash.com/photo-1578301978693-85fa9c026f43?auto=format&fit=crop&w=300&q=80',
            myMaxBid: 850000,
            currentBid: 850000,
            endTime: '已截拍',
            status: 'won', // won: 竞拍成功
            orderId: 'ORD-20231101'
        },
        {
            id: 'BID-004',
            lotId: 'LOT-012',
            title: '无题 1984',
            artist: 'Jean-Michel Basquiat',
            image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=300&q=80',
            myMaxBid: 450000,
            currentBid: 520000,
            endTime: '已截拍',
            status: 'lost', // lost: 未中标
        }
    ]);

    // 根据状态渲染不同的标签和颜色
    const renderStatus = (status) => {
        switch (status) {
            case 'winning':
                return <Tag icon={<CheckCircleOutlined />} color="success" style={{ padding: '4px 12px', fontSize: 13 }}>当前领先</Tag>;
            case 'outbid':
                return <Tag icon={<ExclamationCircleOutlined />} color="error" style={{ padding: '4px 12px', fontSize: 13 }}>被超越 (Outbid)</Tag>;
            case 'won':
                return <Tag icon={<TrophyOutlined />} color="#d4af37" style={{ padding: '4px 12px', fontSize: 13 }}>竞拍成功</Tag>;
            case 'lost':
                return <Tag color="default" style={{ padding: '4px 12px', fontSize: 13 }}>未中标</Tag>;
            default:
                return null;
        }
    };

    // 渲染单条竞拍记录
    const renderBidItem = (item) => (
        <div style={{
            background: '#fff',
            padding: 24,
            marginBottom: 24,
            border: '1px solid #eaeaea',
            transition: 'box-shadow 0.3s',
            ':hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }
        }}>
            <Row gutter={32} align="middle">
                {/* 1. 拍品图片 */}
                <Col>
                    <div style={{ width: 120, height: 120, overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/mall/product/${item.lotId}`)}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </Col>

                {/* 2. 拍品基础信息 */}
                <Col flex="1">
                    <div style={{ marginBottom: 8 }}>
                        <Text type="secondary" style={{ fontFamily: 'Playfair Display', marginRight: 12 }}>{item.lotId}</Text>
                        {renderStatus(item.status)}
                    </div>
                    <Title level={4} style={{ margin: '0 0 4px 0', fontSize: 18, cursor: 'pointer' }} onClick={() => navigate(`/mall/product/${item.lotId}`)}>
                        {item.title}
                    </Title>
                    <Text type="secondary" style={{ fontStyle: 'italic', display: 'block', marginBottom: 12 }}>{item.artist}</Text>
                    <Text type="secondary" style={{ fontSize: 13 }}>
                        <ClockCircleOutlined style={{ marginRight: 6 }} />
                        {item.endTime === '已截拍' ? '已截拍' : `截拍时间: ${item.endTime}`}
                    </Text>
                </Col>

                {/* 3. 价格对比区 */}
                <Col style={{ minWidth: 200, borderLeft: '1px solid #eaeaea', paddingLeft: 32 }}>
                    <div style={{ marginBottom: 12 }}>
                        <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>您的最高出价</Text>
                        <Text style={{ fontFamily: 'Playfair Display', fontSize: 18, color: item.status === 'won' ? '#d4af37' : '#1a1a1a' }}>
                            ¥ {item.myMaxBid.toLocaleString()}
                        </Text>
                    </div>
                    <div>
                        <Text type="secondary" style={{ fontSize: 12, display: 'block', color: item.status === 'outbid' ? '#d32f2f' : '#888' }}>
                            当前最高竞价
                        </Text>
                        <Text style={{ fontFamily: 'Playfair Display', fontSize: 18, fontWeight: 'bold', color: item.status === 'outbid' ? '#d32f2f' : '#1a1a1a' }}>
                            ¥ {item.currentBid.toLocaleString()}
                        </Text>
                    </div>
                </Col>

                {/* 4. 操作按钮区 */}
                <Col style={{ minWidth: 150, textAlign: 'right' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        {item.status === 'outbid' && (
                            <Button type="primary" danger style={{ width: '100%' }} onClick={() => navigate(`/mall/product/${item.lotId}`)}>
                                立即加价
                            </Button>
                        )}
                        {item.status === 'winning' && (
                            <Button style={{ width: '100%', background: '#1a1a1a', color: '#fff' }} onClick={() => navigate(`/mall/product/${item.lotId}`)}>
                                提高限额
                            </Button>
                        )}
                        {item.status === 'won' && (
                            <Button type="primary" style={{ width: '100%', background: '#d4af37', borderColor: '#d4af37' }}>
                                支付结算
                            </Button>
                        )}
                        <Button type="text" style={{ width: '100%', color: '#666' }} onClick={() => navigate(`/mall/product/${item.lotId}`)}>
                            查看详情
                        </Button>
                    </Space>
                </Col>
            </Row>
        </div>
    );

    // 过滤数据逻辑
    const getFilteredBids = (filterType) => {
        if (filterType === 'active') return bidsData.filter(b => b.status === 'winning' || b.status === 'outbid');
        if (filterType === 'won') return bidsData.filter(b => b.status === 'won');
        return bidsData; // 'all'
    };

    return (
        <div style={{ padding: '40px', maxWidth: 1200, margin: '0 auto', minHeight: '80vh' }}>

            {/* 页面标题 */}
            <div style={{ marginBottom: 40 }}>
                <Title level={2} style={{ fontFamily: 'Playfair Display', margin: 0, letterSpacing: 1 }}>My Bids</Title>
                <Text type="secondary" style={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: 12 }}>我的竞拍记录</Text>
            </div>

            {/* 竞拍分类 Tab */}
            <Tabs
                defaultActiveKey="active"
                tabBarStyle={{ marginBottom: 32 }}
                items={[
                    {
                        key: 'active',
                        label: <span style={{ fontSize: 16 }}>进行中 ({getFilteredBids('active').length})</span>,
                        children: (
                            <List
                                dataSource={getFilteredBids('active')}
                                renderItem={renderBidItem}
                                locale={{ emptyText: '暂无进行中的竞拍' }}
                            />
                        )
                    },
                    {
                        key: 'won',
                        label: <span style={{ fontSize: 16 }}>竞拍成功 ({getFilteredBids('won').length})</span>,
                        children: (
                            <List
                                dataSource={getFilteredBids('won')}
                                renderItem={renderBidItem}
                                locale={{ emptyText: '暂无成功记录' }}
                            />
                        )
                    },
                    {
                        key: 'all',
                        label: <span style={{ fontSize: 16 }}>全部记录</span>,
                        children: (
                            <List
                                dataSource={getFilteredBids('all')}
                                renderItem={renderBidItem}
                                locale={{ emptyText: '暂无竞拍记录' }}
                            />
                        )
                    }
                ]}
            />
        </div>
    );
};

export default MyBids;
