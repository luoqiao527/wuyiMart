import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Input, Space, Popconfirm } from 'antd';
import { useParams } from 'react-router-dom';

const OnlineProducts = () => {
    const { merchantId } = useParams(); // 如果路由是 /admin/merchant-products/:merchantId，这里会有值
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = () => {
        setLoading(true);
        // TODO: 获取商品列表 API
        // const url = merchantId ? `/api/admin/products?merchantId=${merchantId}` : '/api/admin/products';
        // axios.get(url).then(res => setData(res.data.list)).finally(() => setLoading(false));
        setTimeout(() => setLoading(false), 500);
    };

    useEffect(() => { fetchProducts(); }, [merchantId]);

    const handleOffline = (productId) => {
        // TODO: 强制下架违规商品 API
    };

    const columns = [
        { title: '商品ID', dataIndex: 'id', key: 'id' },
        {
            title: '商品主图', dataIndex: 'image', key: 'image',
            render: () => <div style={{ width: 50, height: 50, background: '#eee' }}>图</div>
        },
        { title: '商品名称', dataIndex: 'name', key: 'name' },
        { title: '所属商家', dataIndex: 'merchantName', key: 'merchantName' },
        { title: '价格(元)', dataIndex: 'price', key: 'price' },
        { title: '库存', dataIndex: 'stock', key: 'stock' },
        {
            title: '状态', key: 'status',
            render: () => <Tag color="success">售卖中</Tag>
        },
        {
            title: '操作', key: 'action',
            render: (_, record) => (
                <Popconfirm title="确定要强制下架该商品吗？" onConfirm={() => handleOffline(record.id)}>
                    <Button type="link" danger>违规下架</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2>{merchantId ? `商家 ${merchantId} 的已上架商品` : '全站在售商品管理'}</h2>
                <Space>
                    <Input.Search placeholder="搜索商品名称" style={{ width: 250 }} />
                    {!merchantId && <Input.Search placeholder="搜索商家名称" style={{ width: 200 }} />}
                </Space>
            </div>
            <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
        </div>
    );
};

export default OnlineProducts;
