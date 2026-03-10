// src/pages/admin/ProductAuditDetail.jsx
import React, { useEffect, useState } from 'react';
import { Descriptions, Card, Button, Space, message, Modal, Input, Tag, Divider, Typography } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayCircleOutlined, PictureOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProductAuditDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(false);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    useEffect(() => {
        // 模拟获取拍卖详情数据
        setDetail({
            id: id,
            title: '19世纪末 法国铜鎏金珐琅座钟',
            merchantName: '巴黎古董画廊',
            category: '古董与钟表 > 欧洲座钟',
            startPrice: 50000,
            stepPrice: 2000,
            startTime: '2023-11-01 10:00:00',
            endTime: '2023-11-03 22:00:00',
            status: 0,
            description: '此座钟铸造精美，通体鎏金，镶嵌细腻的珐琅彩绘。钟盘带有制作者签名，走时准确，是19世纪末法国宫廷风格的典型代表作。附带原装钥匙与鉴定证书。',
            // 模拟媒体列表：第一个是视频，后面是图片
            media: [
                { type: 'video', url: 'video_placeholder' },
                { type: 'image', url: 'img_placeholder_1' },
                { type: 'image', url: 'img_placeholder_2' },
                { type: 'image', url: 'img_placeholder_3' },
            ]
        });
    }, [id]);

    const handleAudit = (isPass) => {
        if (!isPass && !rejectReason.trim()) return message.warning('驳回时必须填写详细原因');

        setLoading(true);
        // 模拟提交 0-待审核, 1-通过, 2-驳回
        setTimeout(() => {
            setLoading(false);
            message.success(isPass ? '已准予上拍' : '已驳回申请');
            setRejectModalVisible(false);
            navigate('/admin/product-audit');
        }, 800);
    };

    return (
        <div style={{ paddingBottom: 80 }}>
            <Card bordered={false}>
                <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={4} style={{ margin: 0, fontFamily: 'Playfair Display' }}>
                        {detail.title}
                    </Title>
                    <Tag color="default" style={{ color: '#d4af37', borderColor: '#d4af37', background: 'transparent', padding: '4px 12px' }}>待审核</Tag>
                </div>

                <Descriptions title="基本档案" bordered column={2} size="middle" labelStyle={{ width: '150px' }}>
                    <Descriptions.Item label="拍品编号">{detail.id}</Descriptions.Item>
                    <Descriptions.Item label="委托方/画廊">{detail.merchantName}</Descriptions.Item>
                    <Descriptions.Item label="所属分类" span={2}>{detail.category}</Descriptions.Item>
                </Descriptions>

                <div style={{ marginTop: 32 }}></div>

                <Descriptions title="拍卖规则设置" bordered column={2} size="middle" labelStyle={{ width: '150px' }}>
                    <Descriptions.Item label="起拍价">
                        <span style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Playfair Display' }}>
                            ¥ {detail.startPrice?.toLocaleString()}
                        </span>
                    </Descriptions.Item>
                    <Descriptions.Item label="加价幅度">
                        <span style={{ color: '#d4af37', fontWeight: 'bold' }}>
                            ¥ {detail.stepPrice?.toLocaleString()}
                        </span>
                    </Descriptions.Item>
                    <Descriptions.Item label="起拍时间">{detail.startTime}</Descriptions.Item>
                    <Descriptions.Item label="截拍时间">{detail.endTime}</Descriptions.Item>
                </Descriptions>

                <Divider style={{ borderColor: '#f0f0f0' }}>视觉资料 (视频与图片)</Divider>
                <Space size="middle" wrap>
                    {detail.media?.map((item, index) => (
                        <div key={index} style={{
                            width: 160, height: 160,
                            background: '#faf9f7',
                            border: '1px solid #e0e0e0',
                            borderRadius: 12,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            position: 'relative', overflow: 'hidden'
                        }}>
                            {item.type === 'video' ? (
                                <>
                                    <PlayCircleOutlined style={{ fontSize: 32, color: '#1a1a1a', opacity: 0.7 }} />
                                    <span style={{ marginTop: 8, fontSize: 12, color: '#666' }}>展示视频</span>
                                </>
                            ) : (
                                <>
                                    <PictureOutlined style={{ fontSize: 32, color: '#ccc' }} />
                                    <span style={{ marginTop: 8, fontSize: 12, color: '#999' }}>细节图 {index}</span>
                                </>
                            )}
                        </div>
                    ))}
                </Space>

                <Divider style={{ borderColor: '#f0f0f0' }}>拍品详情描述</Divider>
                <div style={{
                    padding: 24,
                    background: '#faf9f7',
                    borderRadius: 12,
                    minHeight: 120,
                    color: '#333',
                    lineHeight: '1.8'
                }}>
                    {detail.description}
                </div>
            </Card>

            {/* 底部固定操作栏：使用粘性定位，适配各种屏幕和侧边栏宽度 */}
            <div style={{
                position: 'fixed', bottom: 0, right: 0, left: 0,
                padding: '16px 32px', background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)', borderTop: '1px solid #f0f0f0',
                display: 'flex', justifyContent: 'flex-end', zIndex: 99
            }}>
                <Space size="middle">
                    <Button size="large" onClick={() => navigate(-1)} style={{ borderRadius: 8 }}>暂不处理，返回</Button>
                    <Button size="large" danger onClick={() => setRejectModalVisible(true)} style={{ borderRadius: 8 }}>驳回申请</Button>
                    {/* Primary 按钮受 global.css 控制，会自动变成极简黑 */}
                    <Button size="large" type="primary" loading={loading} onClick={() => handleAudit(true)}>
                        通过并准予上拍
                    </Button>
                </Space>
            </div>

            <Modal
                title="驳回拍品申请"
                open={rejectModalVisible}
                onOk={() => handleAudit(false)}
                onCancel={() => setRejectModalVisible(false)}
                confirmLoading={loading}
                okText="确认驳回"
                okButtonProps={{ danger: true }}
            >
                <p style={{ color: '#666', marginBottom: 16 }}>请详细说明驳回原因，委托方将在画廊后台看到此修改建议：</p>
                <Input.TextArea
                    rows={5}
                    placeholder="例如：视频清晰度不足无法辨认细节；起拍价设置高于市场评估价..."
                    value={rejectReason}
                    onChange={e => setRejectReason(e.target.value)}
                    style={{ borderRadius: 8 }}
                />
            </Modal>
        </div>
    );
};

export default ProductAuditDetail;
