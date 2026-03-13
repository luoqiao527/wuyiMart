import React from 'react';
import { Card, List, Tag } from 'antd';

const OrderAfterSales = () => {
    return (
        <div style={{ padding: 40, maxWidth: 800, margin: '0 auto' }}>
            <h2>售后处理中</h2>
            <Card bordered={false}>
                <List.Item>
                    <List.Item.Meta title="售后单号: AS-001" description="关联订单: ART-0003 | 原因: 画框轻微划痕" />
                    <Tag color="orange">画廊鉴定中</Tag>
                </List.Item>
            </Card>
        </div>
    );
};
export default OrderAfterSales;
