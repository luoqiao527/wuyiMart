import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Avatar, Typography, Space } from 'antd';
import {
    ArrowLeftOutlined,
    FireFilled,
    EyeOutlined,
    UserOutlined,
    TrophyFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Countdown } = Statistic;

// 模拟截止时间：当前时间往后推 2 小时
const deadline = Date.now() + 1000 * 60 * 60 * 2;

// 模拟出价记录数据
const bidHistoryData = [
    { key: '1', time: '10:42:15', user: 'ArtCollector_99', price: 45000, status: 'leading' },
    { key: '2', time: '10:35:02', user: 'Wang_Design', price: 42000, status: 'outbid' },
    { key: '3', time: '10:15:44', user: 'CryptoWhale', price: 40000, status: 'outbid' },
    { key: '4', time: '09:50:11', user: 'Wang_Design', price: 35000, status: 'outbid' },
    { key: '5', time: '09:00:00', user: '系统', price: 30000, status: 'start' }, // 起拍价
];

const AuctionDetail = () => {
    const navigate = useNavigate();

    // 出价记录表格列配置
    const columns = [
        {
            title: '竞买人',
            dataIndex: 'user',
            key: 'user',
            render: (text) => (
                <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <span style={{ fontWeight: 500, color: '#1a1a1a' }}>{text}</span>
                </Space>
            ),
        },
        {
            title: '出价金额 (¥)',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <span style={{ fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 'bold' }}>
                    {price.toLocaleString()}
                </span>
            ),
        },
        {
            title: '出价时间',
            dataIndex: 'time',
            key: 'time',
            render: (text) => <Text type="secondary">{text}</Text>,
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            render: (status) => {
                if (status === 'leading') {
                    return <Tag color="green" icon={<TrophyFilled />}>当前领先</Tag>;
                }
                if (status === 'start') {
                    return <Tag color="default">起拍</Tag>;
                }
                return <Tag color="red">出局</Tag>;
            },
        },
    ];

    return (
        <div style={{ padding: '0 10px' }}>
            {/* 顶部导航与状态 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Space align="center" size="middle">
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate(-1)}
                        style={{ fontSize: 16 }}
                    />
                    <Title level={4} style={{ margin: 0, fontFamily: 'Playfair Display' }}>
                        拍品实况监控
                    </Title>
                    <Tag
                        color="error"
                        icon={<FireFilled />}
                        style={{ borderRadius: 12, padding: '0 12px', border: 'none', background: '#fff1f0', color: '#cf1322' }}
                    >
                        火热竞拍中
                    </Tag>
                </Space>
                <Button>提前结束竞拍</Button>
            </div>

            {/* 核心数据大盘 */}
            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col span={8}>
                    <Card bordered={false} style={{ borderRadius: 16 }}>
                        <Statistic
                            title={<span style={{ color: '#888' }}>当前最高价 (¥)</span>}
                            value={45000}
                            precision={2}
                            valueStyle={{ color: '#cf1322', fontSize: 36, fontFamily: 'Playfair Display', fontWeight: 'bold' }}
                            prefix={<TrophyFilled style={{ fontSize: 24, marginRight: 8, color: '#faad14' }} />}
                        />
                        <div style={{ marginTop: 8, color: '#666' }}>
                            领先买家: <strong style={{ color: '#1a1a1a' }}>ArtCollector_99</strong>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} style={{ borderRadius: 16 }}>
                        <Countdown
                            title={<span style={{ color: '#888' }}>距离竞拍结束还剩</span>}
                            value={deadline}
                            valueStyle={{ color: '#1a1a1a', fontSize: 36, fontFamily: 'Playfair Display', fontWeight: 'bold' }}
                        />
                        <div style={{ marginTop: 8, color: '#666' }}>
                            预计结束: 今天 12:42
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} style={{ borderRadius: 16 }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic title="累计出价次数" value={12} valueStyle={{ fontSize: 28, fontWeight: 'bold' }} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="围观人数" value={1342} prefix={<EyeOutlined />} valueStyle={{ fontSize: 28, fontWeight: 'bold' }} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            {/* 底部详细信息：左侧商品图，右侧出价记录 */}
            <Row gutter={24}>
                {/* 左侧：拍品信息速览 */}
                <Col span={8}>
                    <Card bordered={false} style={{ borderRadius: 16, height: '100%' }}>
                        <Title level={5} style={{ marginBottom: 16 }}>拍品信息</Title>
                        {/* 占位图，实际开发中替换为商品首图 */}
                        <div style={{
                            width: '100%',
                            height: 240,
                            borderRadius: 12,
                            backgroundImage: 'url(https://img.alicdn.com/imgextra/i4/O1CN013tL8Yh1ZJtJ9H2X9M_!!6000000003175-0-tps-800-800.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            marginBottom: 16
                        }} />
                        <Title level={4} style={{ fontFamily: 'Playfair Display', margin: '0 0 8px 0' }}>
                            19世纪 印象派原作 油画《日出》
                        </Title>
                        <Space direction="vertical" style={{ width: '100%', color: '#666' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>拍品编号:</span>
                                <span>#ART-2023-091A</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>起拍价:</span>
                                <span>¥ 30,000</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>加价幅度:</span>
                                <span>¥ 1,000</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>参拍保证金:</span>
                                <span>¥ 5,000</span>
                            </div>
                        </Space>
                    </Card>
                </Col>

                {/* 右侧：实时出价记录 */}
                <Col span={16}>
                    <Card
                        bordered={false}
                        style={{ borderRadius: 16, height: '100%' }}
                        title={<span style={{ fontSize: 16 }}>实时出价记录</span>}
                        extra={<Button type="link" style={{ color: '#1a1a1a' }}>刷新</Button>}
                    >
                        <Table
                            columns={columns}
                            dataSource={bidHistoryData}
                            pagination={{ pageSize: 5 }} // 每页显示5条，保持页面清爽
                            size="middle"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AuctionDetail;
