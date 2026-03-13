import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ProfileEdit = () => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState('');

    const handleFinish = (values) => {
        message.success('个人信息更新成功！');
        console.log('提交的数据:', values);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传头像</div>
        </div>
    );

    return (
        <Card title="修改个人信息" style={{ maxWidth: 600, margin: '24px auto' }}>
            <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ username: 'AppleStore_01' }}>
                <Form.Item label="店铺头像">
                    <Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} action="/api/upload">
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item name="username" label="账号名称" rules={[{ required: true, message: '请输入账号名' }]}>
                    <Input placeholder="请输入新的账号名" />
                </Form.Item>
                <Form.Item name="password" label="新密码">
                    <Input.Password placeholder="不修改请留空" />
                </Form.Item>
                <Form.Item name="confirmPassword" label="确认新密码" dependencies={['password']}
                    rules={[({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) return Promise.resolve();
                            return Promise.reject(new Error('两次输入的密码不一致!'));
                        },
                    })]}>
                    <Input.Password placeholder="请再次输入新密码" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>保存修改</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
export default ProfileEdit;
