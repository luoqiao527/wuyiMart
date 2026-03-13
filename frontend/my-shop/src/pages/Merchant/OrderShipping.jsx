import React from 'react';
import { Card, Form, Input, Select, Button, message, Descriptions } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const OrderShipping = () => {
    const { id } = useParams(); // 获取路由里的 orderId
    const navigate = useNavigate();

    const onFinish = (values) => {
        message.success(`订单 ${id} 发货成功！`);
        navigate('/merchant/pending-shipments');
    };

    return (
        <Card title="处理订单发货" style={{ maxWidth: 800, margin: '24px auto' }}>
            <Descriptions bordered column={1} style={{ marginBottom: 24 }}>
                <Descriptions.Item label="订单编号">{id || 'ORD-TEST-000'}</Descriptions.Item>
                <Descriptions.Item label="收件人信息">张三，13800138000，广东省深圳市南山区科技园</Descriptions.Item>
            </Descriptions>

            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="expressCompany" label="物流公司" rules={[{ required: true }]}>
                    <Select placeholder="请选择快递公司" options={[
                        { label: '顺丰速运', value: 'sf' },
                        { label: '中通快递', value: 'zto' },
                        { label: '圆通速递', value: 'yto' },
                        { label: '京东物流', value: 'jd' },
                    ]} />
                </Form.Item>
                <Form.Item name="trackingNumber" label="快递单号" rules={[{ required: true }]}>
                    <Input placeholder="请输入物流单号" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">确认发货</Button>
                    <Button style={{ marginLeft: 16 }} onClick={() => navigate(-1)}>取消</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
export default OrderShipping;
