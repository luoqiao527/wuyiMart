// src/pages/admin/ProductAudit.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Input, Space, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ClockCircleOutlined, PictureOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ProductAudit = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    // 模拟获取待审核拍品列表
    const fetchData = (page = 1) => {
        setLoading(true);
        // 模拟数据：0-待审核, 1-通过, 2-驳回
        setTimeout(() => {
            setData([
                {
                    id: 'LOT-202310-001',
                    title: '19世纪 法国铜鎏金珐琅座钟',
                    merchantName: '巴黎古董画廊',
                    category: '古董钟表',
                    startPrice: 50000,
                    stepPrice: 2000,
                    startTime: '2023-11-01 10:00',
                    endTime: '2023-11-03 22:00',
                    status: 0
                },
                {
                    id: 'LOT-202310-002',
                    title: '赵无极《无题》限量版画',
                    merchantName: '当代艺术空间',
                    category: '当代艺术 > 版画',
                    startPrice: 15000,
                    stepPrice: 500,
                    startTime: '2023-11-05 10:00',
                    endTime: '2023-11-06 20:00',
                    status: 0
                },
            ]);
            setPagination({ ...pagination, current: page, total: 20 });
            setLoading(false);
        }, 500);
    };

    useEffect(() => { fetchData(); }, []);

    const columns = [
        { title: '拍品编号', dataIndex: 'id', key: 'id', width: 140 },
        {
            title: '主图/视频', key: 'media', width: 90,
            render: () => (
                <div style={{ width: 50, height: 50, background: '#faf9f7', borderRadius: 6, border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PictureOutlined style={{ color: '#ccc', fontSize: 18 }} />
                </div>
            )
        },
        {
            title: '拍品标题', dataIndex: 'title', key: 'title',
            render: (text) => <Text style={{ fontWeight: 500, fontFamily: 'Playfair Display' }}>{text}</Text>
        },
        { title: '委托方 / 画廊', dataIndex: 'merchantName', key: 'merchantName' },
        { title: '分类', dataIndex: 'category', key: 'category' },
        {
            title: '起拍价 (¥)', dataIndex: 'startPrice', key: 'startPrice',
            render: (text) => <Text style={{ fontWeight: 'bold' }}>{text.toLocaleString()}</Text>
        },
        {
            title: '拍卖时间', key: 'auctionTime',
            render: (_, record) => (
                <div style={{ fontSize: 12, color: '#666' }}>
                    <div>起: {record.startTime}</div>
                    <div>止: {record.endTime}</div>
                </div>
            )
        },
        {
            title: '状态', key: 'status', width: 100,
            render: (text, record) => {
                if (record.status === 0) return <Tag color="default" style={{ color: '#d4af37', borderColor: '#d4af37', background: 'transparent' }}>待审核</Tag>;
                if (record.status === 1) return <Tag color="success">已通过</Tag>;
                if (record.status === 2) return <Tag color="error">已驳回</Tag>;
            }
        },
        {
            title: '操作', key: 'action', width: 100,
            render: (_, record) => (
                <Button type="primary" size="small" onClick={() => navigate(`/admin/product-audit/${record.id}`)}>
                    审查
                </Button>
            ),
        },
    ];

    return (
        <Card title="拍品上拍审核" bordered={false} style={{ minHeight: '80vh' }}>
            <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text type="secondary">严格审核拍品信息，确保平台艺术品质量</Text>
                <Space>
                    <Input.Search placeholder="搜索拍品编号 / 标题 / 委托方" onSearch={() => fetchData()} style={{ width: 320 }} />
                </Space>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={{ ...pagination, onChange: fetchData }}
            />
        </Card>
    );
};

export default ProductAudit;
