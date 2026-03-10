// src/pages/user/ConsignRecords.jsx
import React, { useState } from 'react';
import { Typography, Tabs, List, Tag, Button, Space, Row, Col } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const ConsignRecords = () => {
    const navigate = useNavigate();

    // 模拟的委托记录数据
    const [records] = useState([
        {
            id: 'CON-20231101',
            title: '无名风景图',
            artist: '吴冠中 (传)',
            category: '水墨 / Chinese Ink',
            submitDate: '2023-10-25',
            status: 'pending', // 申请中
            image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=200&q=80',
            expertFeedback: '正在为您安排亚洲二十世纪及当代艺术部专家评估。'
        },
        {
            id: 'CON-20230915',
            title: '静物苹果与水罐',
            artist: 'Paul Cézanne',
            category: '油画 / Oil Painting',
            submitDate: '2023-09-15',
            status: 'approved', // 已通过
            estimatedValue: '¥ 2,500,000 - 3,000,000',
            image: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&w=200&q=80',
            expertFeedback: '真迹无疑。品相良好。已为您安排进入秋季主场拍卖。',
            productId: '10001' // ✅ 新增：关联的拍品详情页ID
        },
        {
            id: 'CON-20230510',
            title: '当代抽象系列03',
            artist: '新人艺术家',
            category: '综合材料',
            submitDate: '2023-05-10',
            status: 'rejected', // 被拒绝
            image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=200&q=80',
            expertFeedback: '感谢您的送拍。经专家组评估，该作品暂不符合我们近期的专场主题要求。'
        }
    ]);

    // 状态渲染逻辑
    const renderStatus = (status) => {
        switch (status) {
            case 'pending':
                return <Tag icon={<ClockCircleOutlined />} color="processing">评估中 (Pending)</Tag>;
            case 'approved':
                return <Tag icon={<CheckCircleOutlined />} color="success">已通过 (Approved)</Tag>;
            case 'rejected':
                return <Tag icon={<CloseCircleOutlined />} color="error">未采纳 (Declined)</Tag>;
            default:
                return null;
        }
    };

    // 获取分类数据
    const getFilteredRecords = (status) => {
        if (status === 'all') return records;
        return records.filter(item => item.status === status);
    };

    // 点击跳转到商品详情页的逻辑
    const handleGoDetail = (item) => {
        if (item.status === 'approved' && item.productId) {
            navigate(`/mall/product/${item.productId}`);
        }
    };

    // 列表项渲染
    const renderItem = (item) => {
        const isApproved = item.status === 'approved';

        return (
            <div style={{
                background: '#fff',
                padding: 24,
                marginBottom: 24,
                border: '1px solid #eaeaea',
                borderRadius: 8,
                transition: 'box-shadow 0.3s',
            }}
                onMouseEnter={(e) => isApproved && (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)')}
                onMouseLeave={(e) => isApproved && (e.currentTarget.style.boxShadow = 'none')}
            >
                <Row gutter={24} align="middle">
                    {/* 图片：如果是已通过状态，增加鼠标手型并绑定点击事件 */}
                    <Col>
                        <div
                            style={{
                                width: 100,
                                height: 100,
                                backgroundColor: '#f5f5f5',
                                borderRadius: 4,
                                overflow: 'hidden',
                                cursor: isApproved ? 'pointer' : 'default' // ✅ 鼠标手型
                            }}
                            onClick={() => handleGoDetail(item)}
                        >
                            <img
                                src={item.image}
                                alt="artwork"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s'
                                }}
                                onMouseEnter={(e) => isApproved && (e.currentTarget.style.transform = 'scale(1.05)')}
                                onMouseLeave={(e) => isApproved && (e.currentTarget.style.transform = 'scale(1)')}
                            />
                        </div>
                    </Col>

                    {/* 核心信息 */}
                    <Col flex="1">
                        <div style={{ marginBottom: 8 }}>
                            <Text type="secondary" style={{ marginRight: 12 }}>单号: {item.id}</Text>
                            {renderStatus(item.status)}
                        </div>

                        {/* 标题：如果是已通过状态，改为可点击的链接样式 */}
                        <Title
                            level={5}
                            style={{
                                margin: '0 0 4px 0',
                                fontSize: 18,
                                cursor: isApproved ? 'pointer' : 'default',
                                color: isApproved ? '#1a1a1a' : 'inherit'
                            }}
                            onClick={() => handleGoDetail(item)}
                        >
                            {/* 加个下划线特效让它更像链接 */}
                            <span style={{ textDecoration: isApproved ? 'underline' : 'none', textUnderlineOffset: 4 }}>
                                {item.title}
                            </span>
                        </Title>

                        <Text type="secondary" style={{ marginRight: 16 }}>{item.artist}</Text>
                        <Text type="secondary" style={{ fontSize: 13 }}>提交时间: {item.submitDate}</Text>

                        {/* 专家反馈框 */}
                        <div style={{ marginTop: 12, padding: '8px 12px', background: '#faf9f7', borderLeft: '3px solid #d4af37', fontSize: 13, color: '#666' }}>
                            <strong>专家反馈：</strong>{item.expertFeedback}
                        </div>
                    </Col>

                    {/* 操作与状态结果 */}
                    <Col style={{ minWidth: 160, textAlign: 'right', borderLeft: '1px solid #eaeaea', paddingLeft: 24 }}>
                        {isApproved && (
                            <div style={{ marginBottom: 16 }}>
                                <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>官方估价</Text>
                                <Text style={{ fontFamily: 'Playfair Display', color: '#1a1a1a', fontWeight: 'bold' }}>{item.estimatedValue}</Text>
                            </div>
                        )}
                        <Space direction="vertical" style={{ width: '100%' }}>
                            {/* ✅ 新增：针对已通过的商品，提供明确的跳转按钮 */}
                            {isApproved && (
                                <Button
                                    icon={<EyeOutlined />}
                                    onClick={() => handleGoDetail(item)}
                                    style={{ width: '100%', borderColor: '#1a1a1a', color: '#1a1a1a' }}
                                >
                                    查看拍品
                                </Button>
                            )}
                            {isApproved && <Button type="primary" style={{ background: '#1a1a1a', width: '100%' }}>签署委托协议</Button>}
                            {item.status === 'pending' && <Button disabled style={{ width: '100%' }}>等待专家审核</Button>}
                            {item.status === 'rejected' && <Button style={{ width: '100%' }}>重新提交</Button>}
                        </Space>
                    </Col>
                </Row>
            </div>
        );
    };

    // Tab 切换配置
    const tabItems = [
        { key: 'all', label: '全部记录', children: <List dataSource={getFilteredRecords('all')} renderItem={renderItem} locale={{ emptyText: '暂无记录' }} /> },
        { key: 'pending', label: '评估中', children: <List dataSource={getFilteredRecords('pending')} renderItem={renderItem} locale={{ emptyText: '暂无评估中的记录' }} /> },
        { key: 'approved', label: '已通过', children: <List dataSource={getFilteredRecords('approved')} renderItem={renderItem} locale={{ emptyText: '暂无已通过的记录' }} /> },
        { key: 'rejected', label: '未采纳', children: <List dataSource={getFilteredRecords('rejected')} renderItem={renderItem} locale={{ emptyText: '暂无记录' }} /> },
    ];

    return (
        <div style={{ padding: '40px', maxWidth: 1000, margin: '0 auto', minHeight: '80vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <Title level={2} style={{ fontFamily: 'Playfair Display', margin: 0 }}>Consignment Records</Title>
                    <Text type="secondary" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>我的委托送拍记录</Text>
                </div>
                <Button type="primary" size="large" style={{ background: '#d4af37', borderColor: '#d4af37' }} onClick={() => navigate('/user/consign/apply')}>
                    发起新委托
                </Button>
            </div>

            <Tabs defaultActiveKey="all" items={tabItems} size="large" />
        </div>
    );
};

export default ConsignRecords;
