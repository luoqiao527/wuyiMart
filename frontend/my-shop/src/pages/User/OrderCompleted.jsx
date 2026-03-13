import React from 'react';
import { Card, Button, List } from 'antd';
import { useNavigate } from 'react-router-dom';

const OrderCompleted = () => {
    const navigate = useNavigate();
    return (
        <div style={{ padding: 40, maxWidth: 800, margin: '0 auto' }}>
            <h2>已完成典藏</h2>
            <Card bordered={false}>
                <List.Item actions={[<Button onClick={() => navigate('/user/orders/after-sales-apply')}>申请售后</Button>]}>
                    <List.Item.Meta title="订单号: ART-0003" description="静物与陶罐 x 1 | 已于 2023-10-01 签收" />
                </List.Item>
            </Card>
        </div>
    );
};
export default OrderCompleted;
