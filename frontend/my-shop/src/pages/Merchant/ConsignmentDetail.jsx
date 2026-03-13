import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Space, Divider, Modal, Input, message, Progress, Image, Tag } from 'antd';
import { ArrowLeftOutlined, RobotOutlined, CheckCircleFilled, CloseCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ConsignmentDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // 获取路由中的 id

    // 弹窗与 AI 状态
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiResult, setAiResult] = useState(null);

    // 模拟数据：多图/视频
    const mockData = {
        id: 'C10086',
        name: '清代 乾隆年间 景泰蓝花瓶',
        consignor: '张三 (ID: 8932)',
        expectedPrice: 150000,
        description: '家传老物件，祖上留下来的。底款大明成化年制，整体无磕碰，包浆自然。高45cm，口径15cm。希望平台能帮忙拍个好价钱。',
        images: [
            'https://img.alicdn.com/imgextra/i3/O1CN01Z2X9Y21t3J9H2X9M_!!6000000005844-0-tps-800-800.jpg',
            'https://img.alicdn.com/imgextra/i2/O1CN013tL8Yh1ZJtJ9H2X9M_!!6000000003175-0-tps-800-800.jpg' // 仅作占位示意
        ]
    };

    // 模拟 AI 识别过程
    const handleAIAnalyze = () => {
        setIsAnalyzing(true);
        setAiResult(null);

        // 模拟 2.5 秒的 AI 计算延迟
        setTimeout(() => {
            setIsAnalyzing(false);
            setAiResult({
                matchScore: 92,
                analysisText: '图像中检测到【瓷器/景泰蓝】特征，高度 45cm 比例相符。未发现明显裂痕。但描述中的【大明成化年制】在当前图片分辨率下无法清晰识别，建议商家要求用户补充底款特写照片。整体图文匹配度极高。',
                status: 'success' // success, warning, exception
            });
            message.success('AI 图文比对完成');
        }, 2500);
    };

    // 拒绝操作
    const handleRejectSubmit = () => {
        if (!rejectReason) {
            message.warning('请填写驳回理由');
            return;
        }
        message.success('已驳回该委托申请');
        setIsRejectModalVisible(false);
        navigate(-1); // 返回列表
    };

    // 接受操作
    const handleAccept = () => {
        Modal.confirm({
            title: '确认接纳此委托？',
            content: '接纳后，此商品将进入您的“待发布拍品”草稿箱，您可以修改起拍价和规则后上拍。',
            okText: '确认接纳',
            cancelText: '取消',
            onOk: () => {
                message.success('接纳成功，已转入拍品库');
                navigate(-1);
            }
        });
    };

    return (
        <div style={{ padding: '0 10px' }}>
            {/* 顶部导航 */}
            <Space align="center" style={{ marginBottom: 24 }}>
                <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
                <Title level={4} style={{ margin: 0, fontFamily: 'Playfair Display' }}>委托审查详情 / Review</Title>
            </Space>

            <Row gutter={32}>
                {/* 左侧：媒体库（主图+缩略图） */}
                <Col span={10}>
                    <Card bordered={false} style={{ borderRadius: 16 }}>
                        <Image.PreviewGroup>
                            <Image
                                width="100%"
                                height={400}
                                src={mockData.images[0]}
                                style={{ borderRadius: 12, objectFit: 'cover' }}
                            />
                            <div style={{ display: 'flex', gap: 12, marginTop: 12, overflowX: 'auto' }}>
                                {mockData.images.map((img, index) => (
                                    <Image key={index} width={80} height={80} src={img} style={{ borderRadius: 8, objectFit: 'cover' }} />
                                ))}
                                {/* 如果有视频，可以在这里渲染一个带有播放图标的框 */}
                            </div>
                        </Image.PreviewGroup>
                    </Card>
                </Col>

                {/* 右侧：信息与操作区 */}
                <Col span={14}>
                    <Card bordered={false} style={{ borderRadius: 16, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1 }}>
                            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Title level={3} style={{ margin: 0 }}>{mockData.name}</Title>
                                    <Tag color="blue" style={{ borderRadius: 12 }}>单号: {mockData.id}</Tag>
                                </div>
                                <Text type="secondary">委托人: <strong style={{ color: '#1a1a1a' }}>{mockData.consignor}</strong></Text>

                                <Divider style={{ margin: '16px 0' }} />

                                <Text type="secondary">期望起拍价</Text>
                                <div style={{ fontFamily: 'Playfair Display', fontSize: 32, fontWeight: 'bold', color: '#1a1a1a' }}>
                                    ¥{mockData.expectedPrice.toLocaleString()}
                                </div>

                                <div style={{ marginTop: 16 }}>
                                    <Text type="secondary">物品描述</Text>
                                    <Paragraph style={{ background: '#faf9f7', padding: 16, borderRadius: 8, marginTop: 8 }}>
                                        {mockData.description}
                                    </Paragraph>
                                </div>
                            </Space>

                            {/* --- AI 智能比对区块 --- */}
                            <div style={{ marginTop: 24, padding: 20, background: '#f0f2f5', borderRadius: 12, border: '1px solid #e6e8eb' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <Space>
                                        <RobotOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                                        <span style={{ fontSize: 16, fontWeight: 'bold' }}>AI 图文匹配度分析</span>
                                    </Space>
                                    <Button
                                        type="primary"
                                        ghost
                                        loading={isAnalyzing}
                                        onClick={handleAIAnalyze}
                                    >
                                        {aiResult ? '重新分析' : '开始一键鉴定'}
                                    </Button>
                                </div>

                                {/* AI 分析结果展示 */}
                                {aiResult && (
                                    <div style={{ display: 'flex', gap: 24, alignItems: 'center', animation: 'fadeIn 0.5s' }}>
                                        <Progress
                                            type="dashboard"
                                            percent={aiResult.matchScore}
                                            size={80}
                                            strokeColor={aiResult.matchScore > 80 ? '#52c41a' : '#faad14'}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <Text strong style={{ color: aiResult.matchScore > 80 ? '#52c41a' : '#faad14', fontSize: 16 }}>
                                                {aiResult.matchScore > 80 ? '极高匹配' : '需人工介入'}
                                            </Text>
                                            <Paragraph style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
                                                {aiResult.analysisText}
                                            </Paragraph>
                                        </div>
                                    </div>
                                )}
                                {!aiResult && !isAnalyzing && (
                                    <Text type="secondary" style={{ fontSize: 13 }}>
                                        <InfoCircleOutlined style={{ marginRight: 8 }} />
                                        点击按钮，AI 将自动提取图片特征并与委托人填写的描述进行多维度交叉比对。
                                    </Text>
                                )}
                            </div>
                        </div>

                        {/* 底部操作按钮 */}
                        <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
                            <Button size="large" type="primary" style={{ flex: 1, background: '#1a1a1a', height: 48 }} onClick={handleAccept}>
                                接纳委托 (转入拍品库)
                            </Button>
                            <Button size="large" danger style={{ width: 120, height: 48 }} onClick={() => setIsRejectModalVisible(true)}>
                                驳回请求
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* 驳回理由弹窗 */}
            <Modal
                title={<span><CloseCircleFilled style={{ color: '#ff4d4f', marginRight: 8 }} /> 填写驳回理由</span>}
                open={isRejectModalVisible}
                onOk={handleRejectSubmit}
                onCancel={() => setIsRejectModalVisible(false)}
                okText="确认驳回"
                okButtonProps={{ danger: true }}
            >
                <div style={{ marginTop: 16 }}>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>请告知委托人拒绝的原因，这将通过站内信发送给用户：</Text>
                    <TextArea
                        rows={4}
                        placeholder="例如：图片过于模糊、估价严重偏离市场、不符合本画廊征集类目等..."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ConsignmentDetail;
