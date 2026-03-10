// src/pages/mall/ProductDetail.jsx
import React, { useState } from 'react';
import { Row, Col, Button, Divider, Space, Typography, Tag, InputNumber, Modal, message, Tabs } from 'antd';
// 将所有的图标统一在顶部使用 import 引入，解决 require is not defined 报错
import { HeartOutlined, ClockCircleOutlined, SafetyCertificateOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;

const ProductDetail = () => {
    // 模拟拍卖状态数据
    const [currentBid, setCurrentBid] = useState(125000); // 当前最高价
    const [bidsCount, setBidsCount] = useState(12);       // 出价次数
    const step = 5000;                                    // 出价阶梯
    const [myBid, setMyBid] = useState(currentBid + step);// 用户输入框的出价

    // 处理出价逻辑
    const handlePlaceBid = () => {
        if (!myBid || myBid <= currentBid) {
            message.warning(`您的出价必须高于当前最高价 ¥${currentBid.toLocaleString()}`);
            return;
        }

        // 弹出严肃的确认框，模拟真实拍卖行的防误触机制
        Modal.confirm({
            title: <span style={{ fontFamily: 'Playfair Display', fontSize: 20 }}>Confirm Your Bid / 确认出价</span>,
            icon: <ExclamationCircleOutlined style={{ color: '#d4af37' }} />,
            content: (
                <div style={{ marginTop: 16, fontSize: 16 }}>
                    <p>您即将对 <strong>LOT-001 晨雾中的威尼斯</strong> 提出最高竞价：</p>
                    <div style={{ fontFamily: 'Playfair Display', fontSize: 28, color: '#d4af37', fontWeight: 'bold', margin: '16px 0' }}>
                        ¥ {myBid.toLocaleString('zh-CN')}
                    </div>
                    <p style={{ fontSize: 13, color: '#888' }}>
                        * 出价即代表您同意本平台的拍卖条款。竞拍成功后若拒不支付，将扣除您的保证金。
                    </p>
                </div>
            ),
            okText: '确认出价',
            cancelText: '取消',
            okButtonProps: { style: { background: '#1a1a1a', borderRadius: 4, height: 40 } },
            cancelButtonProps: { style: { borderRadius: 4, height: 40 } },
            centered: true,
            onOk() {
                // 模拟网络请求
                return new Promise((resolve) => {
                    setTimeout(() => {
                        setCurrentBid(myBid);
                        setBidsCount(prev => prev + 1);
                        setMyBid(myBid + step); // 自动将下次输入框金额推高一个阶梯
                        message.success({
                            content: '出价成功！您目前为该拍品的最高出价者。',
                            style: { marginTop: '10vh' },
                        });
                        resolve();
                    }, 800);
                });
            },
        });
    };

    return (
        <div style={{ padding: '60px 40px', maxWidth: 1200, margin: '0 auto', minHeight: '80vh' }}>
            <Row gutter={[80, 40]}>
                {/* 左侧：艺术品展示区 */}
                <Col xs={24} md={12}>
                    <div style={{ position: 'relative' }}>
                        {/* 状态角标 */}
                        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
                            <Tag color="#1a1a1a" style={{ border: 'none', borderRadius: 2, padding: '4px 12px', fontSize: 14, fontFamily: 'Playfair Display' }}>
                                LOT 001
                            </Tag>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1000&q=80"
                            alt="Claude Monet - Venice"
                            style={{
                                width: '100%',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                                display: 'block'
                            }}
                        />
                    </div>
                </Col>

                {/* 右侧：竞拍交互区 */}
                <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column' }}>

                    {/* 艺术家与作品名 */}
                    <div style={{ marginBottom: 24 }}>
                        <Title level={1} style={{ fontFamily: 'Playfair Display', margin: '0 0 8px 0', fontSize: 36, color: '#1a1a1a' }}>
                            Claude Monet
                        </Title>
                        <Text style={{ fontSize: 20, color: '#666', fontStyle: 'italic', fontFamily: 'Playfair Display' }}>
                            晨雾中的威尼斯 (Venice in the Morning Fog), 1908
                        </Text>
                        <div style={{ marginTop: 12, color: '#888', fontSize: 14 }}>
                            布面油画 / Oil on canvas, 73 x 92 cm <br />
                            附艺术家亲笔签名 (右下)
                        </div>
                    </div>

                    {/* 竞价信息核心面板 */}
                    <div style={{
                        background: '#faf9f7',
                        border: '1px solid #eaeaea',
                        borderTop: '4px solid #1a1a1a',
                        padding: '32px',
                        marginBottom: 32
                    }}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>

                            {/* 估价 */}
                            <Row justify="space-between" align="middle">
                                <Text type="secondary" style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
                                    估价 / Estimate
                                </Text>
                                <Text style={{ fontFamily: 'Playfair Display', fontSize: 18, color: '#666' }}>
                                    ¥ 100,000 - 150,000
                                </Text>
                            </Row>

                            <Divider style={{ margin: 0 }} />

                            {/* 当前最高价 */}
                            <div>
                                <Row justify="space-between" align="bottom" style={{ marginBottom: 8 }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1a1a1a' }}>
                                        当前最高竞价 / Current Bid
                                    </Text>
                                    <Text type="secondary" style={{ fontSize: 13 }}>
                                        {bidsCount} 次出价
                                    </Text>
                                </Row>
                                <div style={{ fontFamily: 'Playfair Display', fontSize: 42, color: '#d4af37', fontWeight: 'bold', lineHeight: 1 }}>
                                    ¥ {currentBid.toLocaleString('zh-CN')}
                                </div>
                            </div>

                            {/* 截拍倒计时 */}
                            <div style={{ display: 'flex', alignItems: 'center', color: '#d32f2f', background: '#ffebee', padding: '12px 16px', borderRadius: 4 }}>
                                <ClockCircleOutlined style={{ marginRight: 8, fontSize: 16 }} />
                                <span style={{ fontWeight: 500 }}>距离截拍剩余：05 小时 23 分 45 秒</span>
                            </div>

                        </Space>
                    </div>

                    {/* 出价操作区 */}
                    <div style={{ marginBottom: 40 }}>
                        <Text type="secondary" style={{ display: 'block', marginBottom: 8, fontSize: 13 }}>
                            最低出价阶梯: ¥ {step.toLocaleString()}
                        </Text>
                        <Space.Compact style={{ width: '100%' }} size="large">
                            <InputNumber
                                value={myBid}
                                onChange={(val) => setMyBid(val)}
                                prefix={<span style={{ color: '#1a1a1a', fontWeight: 'bold', marginRight: 4 }}>¥</span>}
                                min={currentBid + step}
                                step={step}
                                style={{ width: '60%', fontSize: 20, fontFamily: 'Playfair Display' }}
                            />
                            <Button
                                type="primary"
                                style={{ width: '40%', background: '#1a1a1a', color: '#fff', fontSize: 16, fontWeight: 500 }}
                                onClick={handlePlaceBid}
                            >
                                出价竞拍 / Place Bid
                            </Button>
                        </Space.Compact>

                        <div style={{ marginTop: 24, textAlign: 'center' }}>
                            <Button type="text" icon={<HeartOutlined />} style={{ fontSize: 15, color: '#666' }}>
                                关注此拍品 (Watch Lot)
                            </Button>
                        </div>
                    </div>

                    {/* 拍品详细信息 Tab */}
                    <Tabs defaultActiveKey="1" style={{ marginTop: 'auto' }}>
                        <Tabs.TabPane tab="拍品描述 (Description)" key="1">
                            <Paragraph style={{ color: '#555', lineHeight: 1.8, fontSize: 14 }}>
                                这幅画作是莫奈晚年对威尼斯水城光影探索的杰作。画面捕捉了清晨薄雾中，圣马可大教堂若隐若现的轮廓。柔和的蓝紫色调与水面的金色反光交织，展现了印象派对瞬间视觉感受的极致追求。
                            </Paragraph>
                        </Tabs.TabPane>
                    </Tabs>

                </Col>
            </Row>
        </div>
    );
};

export default ProductDetail;
