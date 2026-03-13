import React from 'react';
import { Card, Button, List, Tag } from 'antd';

const OrderPendingReceive = () => {
    return (
        <div style={{ padding: 40, maxWidth: 800, margin: '0 auto' }}>
            <h2>待收货 (运输中)</h2>
            <Card bordered={false}>
                <List.Item actions={[<Button type="primary">确认签收</Button>, <Button>查看物流</Button>]}>
                    <List.Item.Meta title="订单号: ART-0002" description="顺丰特快 (专业防震包装) - 单号 SF123456" />
                    <Tag color="blue">运输中</Tag>
                </List.Item>
            </Card>
        </div>
    );
};
export default OrderPendingReceive;
