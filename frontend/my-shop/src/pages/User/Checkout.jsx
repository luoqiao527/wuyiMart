import React from 'react';
import { Card, Button, Radio, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    return (
        <div style={{ padding: '60px 40px', maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 24, marginBottom: 24 }}>确认订单</h2>
            <Card title="配送地址" bordered={false} style={{ marginBottom: 24 }}>
                <Radio.Group defaultValue={1}>
                    <Radio value={1} style={{ display: 'block', marginBottom: 16, fontSize: 16 }}>
                        张先生 13800138000 <br /><span style={{ color: '#888', fontSize: 14 }}>上海市黄浦区中山东一路美术馆 101室</span>
                    </Radio>
                    <Button type="link" style={{ padding: 0 }}>管理地址</Button>
                </Radio.Group>
            </Card>
            <Card title="艺术品明细" bordered={false}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>印象派风景油画 x 1</span>
                    <span>¥ 12,000</span>
                </div>
                <Divider />
                <div style={{ textAlign: 'right', fontSize: 20 }}>
                    需支付: <strong>¥ 12,000</strong>
                </div>
                <div style={{ textAlign: 'right', marginTop: 24 }}>
                    <Button type="primary" size="large" onClick={() => navigate('/mall/payment')}>提交订单</Button>
                </div>
            </Card>
        </div>
    );
};
export default Checkout;
