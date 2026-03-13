import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, message, Modal, Form, Input } from 'antd';

const CategoryManage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [currentParentId, setCurrentParentId] = useState(null); // null表示添加一级分类

    const fetchCategories = () => {
        setLoading(true);
        // TODO: 请求全部分类树 API
        // axios.get('/api/admin/categories/tree').then(res => setData(res.data)).finally(() => setLoading(false));
        setTimeout(() => setLoading(false), 500);
    };

    useEffect(() => { fetchCategories(); }, []);

    const handleDelete = (id) => {
        // TODO: 调用删除API
        // axios.delete(`/api/admin/categories/${id}`).then(() => { message.success('删除成功'); fetchCategories(); });
    };

    const handleAdd = async () => {
        try {
            const values = await form.validateFields();
            // TODO: 调用新增API。如果 currentParentId 有值，则是二级分类
            // const payload = { ...values, parentId: currentParentId };
            // await axios.post('/api/admin/categories', payload);
            message.success('分类添加成功');
            setIsModalOpen(false);
            form.resetFields();
            fetchCategories();
        } catch (error) {
            console.log('表单校验失败');
        }
    };

    const openAddModal = (parentId = null) => {
        setCurrentParentId(parentId);
        form.resetFields();
        setIsModalOpen(true);
    };

    const columns = [
        { title: '分类名称', dataIndex: 'name', key: 'name' },
        {
            title: '级别', key: 'level',
            render: (_, record) => record.parentId ? '二级分类' : '一级分类'
        },
        { title: '该分类下商品数量', dataIndex: 'productCount', key: 'productCount' },
        {
            title: '操作', key: 'action', width: 300,
            render: (_, record) => (
                <Space size="middle">
                    {!record.parentId && <Button type="link" size="small" onClick={() => openAddModal(record.id)}>新增子分类</Button>}
                    <Button type="link" size="small" style={{ color: 'orange' }}>编辑</Button>
                    <Popconfirm title="确定删除该分类吗？如果是父分类将删除下属所有子类！" onConfirm={() => handleDelete(record.id)}>
                        <Button type="link" danger size="small">删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2>商城分类管理</h2>
                <Button type="primary" onClick={() => openAddModal(null)}>新增一级分类</Button>
            </div>

            {/* 开启 expandable 自动支持含有 children 属性的树形数据展现 */}
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={false} // 分类一般不分页，直接展示树
            />

            <Modal title={currentParentId ? "新增二级分类" : "新增一级分类"} open={isModalOpen} onOk={handleAdd} onCancel={() => setIsModalOpen(false)}>
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="分类名称" rules={[{ required: true, message: '请输入分类名称' }]}>
                        <Input placeholder="例如：电子产品" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryManage;
