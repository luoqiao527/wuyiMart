import React from 'react';
import { Card, Form, Input, InputNumber, Select, Button, Upload, message, DatePicker, Tooltip } from 'antd';
import { PlusOutlined, InfoCircleOutlined, VideoCameraAddOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const ProductPublish = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        message.success('艺术品拍卖申请已提交，等待策展人审核！');
        console.log('表单数据:', values);
        // 注意：values.auctionTime 是一个数组 [开始时间, 结束时间]，提交给后端前需要格式化
    };

    return (
        <Card
            title={<span style={{ fontSize: 20, fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>发布拍品 / Publish Auction</span>}
            bordered={false} // 去掉边框，配合全局 CSS 的弥散阴影
            style={{ padding: '10px 24px' }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ stock: 1 }} // 拍卖品默认库存为 1
                style={{ maxWidth: 880 }}
            >
                {/* --- 1. 基础信息区 --- */}
                <div style={{ display: 'flex', gap: 24 }}>
                    <Form.Item name="name" label="拍品名称" rules={[{ required: true, message: '请输入拍品名称' }]} style={{ flex: 2 }}>
                        <Input size="large" placeholder="请输入具有吸引力的拍品名称" />
                    </Form.Item>
                    <Form.Item name="category" label="拍品分类" rules={[{ required: true, message: '请选择分类' }]} style={{ flex: 1 }}>
                        <Select size="large" placeholder="请选择分类" options={[
                            { label: '数字艺术 (NFT)', value: 'nft' },
                            { label: '潮流手办', value: 'toys' },
                            { label: '实体画作', value: 'painting' }
                        ]} />
                    </Form.Item>
                </div>

                {/* --- 2. 拍卖核心规则区 (高亮背景区分) --- */}
                <div style={{ background: '#faf9f7', padding: '24px 24px 4px 24px', borderRadius: 12, marginBottom: 24, border: '1px solid #f0f0f0' }}>
                    <Form.Item name="auctionTime" label="竞拍起止时间" rules={[{ required: true, message: '请选择竞拍时间段' }]}>
                        {/* showTime 表示精确到时分秒 */}
                        <RangePicker size="large" showTime style={{ width: '100%' }} placeholder={['开始竞拍时间', '结束竞拍时间']} />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: 24 }}>
                        <Form.Item name="startPrice" label="起拍价 (¥)" rules={[{ required: true, message: '请输入起拍价' }]} style={{ flex: 1 }}>
                            <InputNumber size="large" min={1} style={{ width: '100%' }} placeholder="0.00" />
                        </Form.Item>

                        <Form.Item name="stepPrice" label="加价幅度 (¥)" rules={[{ required: true, message: '请输入加价幅度' }]} style={{ flex: 1 }}>
                            <InputNumber size="large" min={1} style={{ width: '100%' }} placeholder="0.00" />
                        </Form.Item>

                        <Form.Item
                            name="deposit"
                            label={
                                <span>
                                    参拍保证金 (¥)&nbsp;
                                    <Tooltip title="买家参与此商品竞拍前，必须先冻结交纳的金额。若买家违约未支付尾款，此保证金将赔付给您。">
                                        <InfoCircleOutlined style={{ color: '#999' }} />
                                    </Tooltip>
                                </span>
                            }
                            rules={[{ required: true, message: '请输入保证金' }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber size="large" min={0} style={{ width: '100%' }} placeholder="0.00" />
                        </Form.Item>
                    </div>
                </div>

                {/* --- 3. 媒体与描述区 --- */}
                <Form.Item
                    label={
                        <span>
                            拍品主图 / 视频&nbsp;
                            <span style={{ color: '#999', fontSize: 13, fontWeight: 'normal' }}>(最多支持上传9个文件，建议首图为视频以提升转化)</span>
                        </span>
                    }
                >
                    {/* accept 限制了只能选择图片或视频 */}
                    <Upload listType="picture-card" maxCount={9} accept="image/*,video/*" multiple>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#666' }}>
                            <VideoCameraAddOutlined style={{ fontSize: 24, marginBottom: 8 }} />
                            <div style={{ fontSize: 13 }}>上传图/视</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item name="description" label="拍品故事 / 详细描述">
                    <Input.TextArea
                        rows={6}
                        placeholder="讲述这件拍品背后的故事、材质、年份、瑕疵等详细信息..."
                        style={{ borderRadius: 8, padding: 12 }}
                    />
                </Form.Item>

                {/* --- 4. 提交按钮 --- */}
                <Form.Item style={{ marginTop: 32 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        style={{
                            background: '#1a1a1a', // 采用高级黑
                            borderColor: '#1a1a1a',
                            width: 200,
                            height: 48,
                            fontSize: 16,
                            borderRadius: 8
                        }}
                    >
                        提交上拍审核
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ProductPublish;
