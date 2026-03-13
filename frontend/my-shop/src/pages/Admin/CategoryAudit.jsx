import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Input, message, Tooltip, Badge } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const CategoryAudit = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rejectModal, setRejectModal] = useState({ visible: false, id: null });
    const [reason, setReason] = useState('');

    const fetchData = () => {
        setLoading(true);
        // TODO: 获取分类申请列表 /api/admin/categories/audit
        setTimeout(() => {
            setData([
                { id: 1, merchantName: '华为旗舰店', categoryName: '折叠屏手机', parentCategory: '电子产品 > 手机', reason: '现有分类无法涵盖新品类', createTime: '2023-10-24 14:00' },
                { id: 2, merchantName: '耐克官方', categoryName: '复古篮球鞋', parentCategory: '服装鞋帽 > 男鞋', reason: '细分市场需求', createTime: '2023-10-23 09:20' },
            ]);
            setLoading(false);
        }, 500);
    };

    useEffect(() => { fetchData(); }, []);

    const handlePass = (record) => {
        Modal.confirm({
            title: `确认通过分类【${record.categoryName}】吗？`,
            content: '通过后，该分类将立即对所有商家可见。',
            onOk: () => {
                // TODO: 调用通过API
                message.success('分类已创建成功');
                fetchData();
            }
        });
    };

    const handleReject = () => {
        if (!reason) return message.error('请输入拒绝原因');
        // TODO: 调用驳回API
        message.success('已拒绝申请');
        setRejectModal({ visible: false, id: null });
        setReason('');
        fetchData();
    };

    const columns = [
        { title: '申请ID', dataIndex: 'id', width: 80 },
        { title: '申请商家', dataIndex: 'merchantName' },
        {
            title: '拟新增分类名', dataIndex: 'categoryName',
            render: (text) => <b style={{ color: '#1890ff' }}>{text}</b>
        },
        { title: '父级分类', dataIndex: 'parentCategory' },
        { title: '申请理由', dataIndex: 'reason', ellipsis: true }, // 内容过长自动省略
        { title: '申请时间', dataIndex: 'createTime' },
        {
            title: '操作', key: 'action', width: 200,
            render: (_, record) => (
                <Space>
                    <Tooltip title="通过并创建">
                        <Button type="primary" shape="circle" icon={<CheckCircleOutlined />} onClick={() => handlePass(record)} />
                    </Tooltip>
                    <Tooltip title="驳回申请">
                        <Button danger shape="circle" icon={<CloseCircleOutlined />} onClick={() => setRejectModal({ visible: true, id: record.id })} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div style={{ marginBottom: 16 }}>
                <h2>新增分类审核 <Badge count={data.length} offset={[10, 0]} /></h2>
                <p style={{ color: '#999' }}>商家提交的新分类申请，审核通过后将加入全站公共分类树。</p>
            </div>

            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={false}
            />

            <Modal
                title="拒绝分类申请"
                open={rejectModal.visible}
                onOk={handleReject}
                onCancel={() => setRejectModal({ visible: false, id: null })}
            >
                <Input.TextArea
                    rows={3}
                    placeholder="请输入拒绝原因，如：该分类已存在、分类名称不规范等"
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default CategoryAudit;
