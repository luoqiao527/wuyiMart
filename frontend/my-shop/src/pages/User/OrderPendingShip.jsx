import React from 'react';
import { Card, List, Tag } from 'antd';

const OrderPendingShip = () => {
    return (
        <div style={{ padding: 40, maxWidth: 800, margin: '0 auto' }}>
            <h2>待发货 (策展包装中)</h2>
            <Card bordered={false}>
                <List.Item>
                    <List.Item.Meta title="订单号: ART-0001" description="印象派风景油画 x 1" />
                    <Tag color="default">画廊打包中</Tag>
                </List.Item>
            </Card>
        </div>
    );
};
export default OrderPendingShip;
