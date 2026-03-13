import React from 'react';
import { Card, Table, Tag, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const AfterSalesList = () => {
    const navigate = useNavigate();
    const columns = [
        { title: '售后单号', dataIndex: 'id' },
        { title: '关联订单', dataIndex: 'orderId' },
        { title: '售后类型', dataIndex: 'type', render: t => <Tag color={t === 'refund' ? 'orange' : 'red'}>{t === 'refund' ? '仅退款' : '退货退款'}</Tag> },
        { title: '申请状态', dataIndex: 'status', render: () => <Tag color="processing">待商家处理</Tag> },
        {
            title: '操作',
            render: (_, record) => <Button type="link" onClick={() => navigate(`/merchant/after-sales/${record.id}`)}>处理售后</Button>
        }
    ];

    const data = [
        { id: 'AS-001', orderId: 'ORD-111', type: 'refund', status: 0 },
        { id: 'AS-002', orderId: 'ORD-222', type: 'return', status: 0 },
    ];

    return (
        <Card title="售后申请列表">
            <Table columns={columns} dataSource={data} rowKey="id" />
        </Card>
    );
};
export default AfterSalesList;
