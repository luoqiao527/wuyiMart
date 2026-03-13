import React from 'react';
import { Result, Button, Space } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
    return (
        <div style={{ padding: '100px 40px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <Result
                icon={<QrcodeOutlined style={{ color: '#1a1a1a' }} />}
                title="订单提交成功，请扫描支付"
                subTitle="订单号：ART-20231024-001 | 待支付金额：¥ 12,000"
                extra={[
                    <div key="qr" style={{ width: 200, height: 200, background: '#eee', margin: '0 auto 32px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>模拟支付二维码</div>,
                    <Space key="btns">
                        <Button type="primary" onClick={() => navigate('/user/orders/pending-ship')}>我已支付</Button>
                        <Button onClick={() => navigate('/user/orders/pending-pay')}>稍后支付</Button>
                    </Space>
                ]}
            />
        </div>
    );
};
export default Payment;
