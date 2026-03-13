import React from 'react';
import { Card, Button, List } from 'antd';

const OrderPendingPay = () => {
    return (
        <div style={{ padding: 40, maxWidth: 800, margin: '0 auto' }}>
            <h2>待支付典藏</h2>
            <Card bordered={false} style={{ marginBottom: 16 }}>
                <List.Item actions={[<Button type="primary">立即付款</Button>, <Button type="text">取消订单</Button>]}>
                    <List.Item.Meta title="订单号: ART-8899" description="现代几何 - Mondrian x 1" />
                    <div className="art-price" style={{ fontSize: 18, color: '#1a1a1a' }}>¥ 15,000</div>
                </List.Item>
            </Card>
        </div>
    );
};
export default OrderPendingPay;
