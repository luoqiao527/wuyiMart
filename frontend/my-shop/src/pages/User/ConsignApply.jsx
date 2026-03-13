// src/pages/user/ConsignApply.jsx
import React from 'react';
import { Form, Input, Select, Upload, Button, Typography, message, Space, Divider } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

const ConsignApply = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('提交的送拍信息:', values);
        message.success('送拍申请提交成功！商家的业务专家将在 3-5 个工作日内与您联系。');
        setTimeout(() => {
            navigate('/user/consign/records'); // 提交成功后跳转到记录页
        }, 1500);
    };

    return (
        <div style={{ padding: '40px', maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <Title level={2} style={{ fontFamily: 'Playfair Display', margin: 0 }}>Sell with Us</Title>
                <Text type="secondary" style={{ letterSpacing: 2, textTransform: 'uppercase' }}>委托送拍申请</Text>
                <Paragraph style={{ color: '#666', marginTop: 16 }}>
                    请选择您意向的委托商家，并尽可能详细地提供藏品信息。清晰的图片和完善的流传记录将有助于专家为您提供更准确的估价。
                </Paragraph>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                size="large"
            >
                <Divider orientation="left" style={{ borderColor: '#1a1a1a' }}>基础信息</Divider>

                {/* 新增：委托商家选择 */}
                <Form.Item
                    label="意向委托机构 / 商家"
                    name="merchantId"
                    rules={[{ required: true, message: '请选择您意向委托的商家或拍卖机构' }]}
                >
                    <Select
                        placeholder="请选择您要委托送拍的商家"
                        showSearch
                        optionFilterProp="children"
                    >
                        <Select.Option value="m_poly">保利拍卖 (北京总部)</Select.Option>
                        <Select.Option value="m_guardian">中国嘉德 (北京总部)</Select.Option>
                        <Select.Option value="m_sothebys_hk">苏富比 Sotheby's (香港分部)</Select.Option>
                        <Select.Option value="m_christies_sh">佳士得 Christie's (上海分部)</Select.Option>
                        <Select.Option value="m_gallery_x">X 现代艺术独立画廊</Select.Option>
                        <Select.Option value="m_antiques_y">聚宝斋古董行</Select.Option>
                    </Select>
                </Form.Item>

                <Space direction="vertical" style={{ width: '100%' }} size={0}>
                    <Form.Item label="作品名称" name="title" rules={[{ required: true, message: '请输入作品名称' }]}>
                        <Input placeholder="例如：晨雾中的威尼斯" />
                    </Form.Item>

                    <Form.Item label="艺术家/作者" name="artist" rules={[{ required: true, message: '请输入艺术家姓名' }]}>
                        <Input placeholder="例如：Claude Monet" />
                    </Form.Item>

                    <Space style={{ display: 'flex' }} align="start">
                        <Form.Item label="作品分类" name="category" rules={[{ required: true, message: '请选择分类' }]} style={{ width: 200 }}>
                            <Select placeholder="请选择">
                                <Select.Option value="oil">油画 / Oil Painting</Select.Option>
                                <Select.Option value="ink">水墨 / Chinese Ink</Select.Option>
                                <Select.Option value="sculpture">雕塑 / Sculpture</Select.Option>
                                <Select.Option value="antique">古董 / Antique</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="创作年份" name="year" style={{ width: 200 }}>
                            <Input placeholder="例如：1908" />
                        </Form.Item>
                        <Form.Item label="尺寸 (高 x 宽 x 深)" name="dimensions" style={{ flex: 1 }}>
                            <Input placeholder="例如：73 x 92 cm" />
                        </Form.Item>
                    </Space>
                </Space>

                <Divider orientation="left" style={{ borderColor: '#1a1a1a' }}>递藏与期望</Divider>
                <Form.Item label="作品简介 (Provenance)" name="provenance">
                    <TextArea rows={4} placeholder="请描述您的作品的外观，材质..." />
                </Form.Item>

                <Form.Item label="您的期望估价 (RMB)" name="estimatedPrice">
                    <Input placeholder="例如：100,000 - 150,000" />
                </Form.Item>

                <Divider orientation="left" style={{ borderColor: '#1a1a1a' }}>图片上传</Divider>
                <Form.Item label="上传高清图片 (正面、背面、签名细节、证书等)" name="images" rules={[{ required: true, message: '请至少上传一张图片' }]}>
                    <Dragger multiple listType="picture" action="/api/upload" maxCount={10}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined style={{ color: '#1a1a1a' }} />
                        </p>
                        <p className="ant-upload-text">点击或将图片拖拽到此处上传</p>
                        <p className="ant-upload-hint">支持 jpg, png 格式。单张图片不超过 10MB。</p>
                    </Dragger>
                </Form.Item>

                <Form.Item style={{ marginTop: 40 }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', background: '#1a1a1a', height: 48, fontSize: 16 }}>
                        提交送拍评估
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ConsignApply;
