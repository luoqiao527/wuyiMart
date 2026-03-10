import React from 'react';
import { Card, Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PendingShipmentList = () => {
    const navigate = useNavigate();
    const columns = [
        { title: '订单编号', dataIndex: 'orderId' },
        { title: '商品信息', dataIndex: 'productName' },
        { title: '买家昵称', dataIndex: 'buyer' },
        { title: '付款时间', dataIndex: 'payTime' },
        {
            title: '操作',
            render: (_, record) => (
                <Button type="primary" size="small" onClick={() => navigate(`/merchant/shipping/${record.orderId}`)}>
                    去发货
                </Button>
            )
        }
    ];

    const data = [
        { orderId: 'ORD-20231024-001', productName: '纯棉T恤 x2', buyer: '张三', payTime: '2023-10-24 14:30' },
        { orderId: 'ORD-20231024-002', productName: '机械键盘', buyer: '李四', payTime: '2023-10-24 15:00' },
    ];

    return (
        <Card title="待发货订单">
            <Table columns={columns} dataSource={data} rowKey="orderId" />
        </Card>
    );
};
export default PendingShipmentList;
