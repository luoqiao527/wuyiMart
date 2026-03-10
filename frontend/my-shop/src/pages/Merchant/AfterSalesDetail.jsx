import React from 'react';
import { Card, Descriptions, Button, Space, message, Divider } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const AfterSalesDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleAction = (isPass) => {
        message.success(isPass ? '已同意退款' : '已拒绝该售后申请');
        navigate('/merchant/after-sales');
    };

    return (
        <Card title={`售后处理 - ${id || 'AS-001'}`} style={{ maxWidth: 800, margin: '24px auto' }}>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="申请原因">商品发错货了</Descriptions.Item>
                <Descriptions.Item label="退款金额"><span style={{ color: 'red', fontWeight: 'bold' }}>¥ 199.00</span></Descriptions.Item>
                <Descriptions.Item label="买家留言">请尽快处理，发错了颜色。</Descriptions.Item>
                <Descriptions.Item label="凭证图片">
                    <div className="image-placeholder" style={{ width: 100, height: 100 }}>图片凭证</div>
                </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div style={{ textAlign: 'center' }}>
                <Space size="large">
                    <Button onClick={() => navigate(-1)}>返回列表</Button>
                    <Button danger onClick={() => handleAction(false)}>拒绝申请</Button>
                    <Button type="primary" onClick={() => handleAction(true)}>同意并退款</Button>
                </Space>
            </div>
        </Card>
    );
};
export default AfterSalesDetail;
