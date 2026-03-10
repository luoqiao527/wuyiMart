import React from 'react';
import { Form, Input, Button, Upload, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const UserProfile = () => {
    return (
        <Card title="编辑个人资料" bordered={false} style={{ maxWidth: 600, margin: '40px auto' }}>
            <Form layout="vertical">
                <Form.Item label="头像">
                    <Upload listType="picture-card" showUploadList={false}>
                        <div><PlusOutlined /><div style={{ marginTop: 8 }}>上传</div></div>
                    </Upload>
                </Form.Item>
                <Form.Item label="用户名">
                    <Input size="large" defaultValue="Art Collector" />
                </Form.Item>
                <Form.Item label="修改密码">
                    <Input.Password size="large" placeholder="不修改请留空" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size="large" block>保存设置</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
export default UserProfile;
