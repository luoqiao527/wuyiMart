import React, { useState } from 'react';
import { Card, Form, Input, Button, Table, Select, Tag, message } from 'antd';

const CategoryRequest = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        message.success('新增分类申请已提交至平台管理员！');
        form.resetFields();
    };

    const columns = [
        { title: '申请时间', dataIndex: 'time' },
        { title: '拟新增分类', dataIndex: 'name' },
        { title: '归属父类', dataIndex: 'parent' },
        {
            title: '状态', dataIndex: 'status', render: s => (
                <Tag color={s === 1 ? 'success' : s === 0 ? 'processing' : 'error'}>
                    {s === 1 ? '已通过' : s === 0 ? '审核中' : '已驳回'}
                </Tag>
            )
        }
    ];

    const data = [
        { id: 1, time: '2023-10-24 10:00', name: '折叠屏手机', parent: '手机数码', status: 0 },
        { id: 2, time: '2023-10-20 14:00', name: 'VR眼镜', parent: '数码配件', status: 1 },
    ];

    return (
        <div>
            <Card title="申请新增分类" style={{ marginBottom: 24 }}>
                <Form form={form} layout="inline" onFinish={onFinish}>
                    <Form.Item name="parentId" label="父级分类" rules={[{ required: true }]}>
                        <Select style={{ width: 200 }} placeholder="选择已有父分类" options={[{ label: '手机数码', value: '3c' }, { label: '服装', value: 'clothes' }]} />
                    </Form.Item>
                    <Form.Item name="newCategoryName" label="新分类名称" rules={[{ required: true }]}>
                        <Input placeholder="输入拟新增分类名称" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">提交申请</Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card title="分类申请记录">
                <Table columns={columns} dataSource={data} rowKey="id" />
            </Card>
        </div>
    );
};
export default CategoryRequest;
