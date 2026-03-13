import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const MerchantAudit = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const fetchData = (page = 1) => {
        setLoading(true);
        // TODO: 替换为真实API
        // axios.get(`/api/admin/merchants/audit-list?page=${page}`).then(res => {
        //   setData(res.data.list);
        //   setPagination({ ...pagination, current: page, total: res.data.total });
        // }).finally(() => setLoading(false));

        // 占位清空 loading，防止页面卡死
        setTimeout(() => setLoading(false), 500);
    };

    useEffect(() => { fetchData(); }, []);

    const columns = [
        { title: '申请ID', dataIndex: 'id', key: 'id' },
        { title: '真实姓名', dataIndex: 'realName', key: 'realName' },
        { title: '手机号', dataIndex: 'phone', key: 'phone' },
        { title: '申请时间', dataIndex: 'createTime', key: 'createTime' },
        {
            title: '状态', key: 'status',
            render: () => <Tag color="processing">待审核</Tag>
        },
        {
            title: '操作', key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => navigate(`/admin/merchant-audit/${record.id || 'test_id'}`)}>
                    去审核
                </Button>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2>商家入驻申请</h2>
                <Input.Search placeholder="搜索姓名/手机号" style={{ width: 300 }} onSearch={() => fetchData()} />
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={{ ...pagination, onChange: fetchData }}
            />
        </div>
    );
};

export default MerchantAudit;
