import React from 'react';
import { Card, Form, Input, Upload, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AfterSalesApply = () => {
    return (
        <Card title="售后申请" bordered={false} style={{ maxWidth: 600, margin: '40px auto' }}>
            <Form layout="vertical">
                <Form.Item label="售后类型">
                    <Select defaultValue="return">
                        <Select.Option value="return">退货退款</Select.Option>
                        <Select.Option value="exchange">换货/维修画框</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="问题描述">
                    <Input.TextArea rows={4} placeholder="请描述画作受损或与预期不符的情况..." />
                </Form.Item>
                <Form.Item label="上传凭证 (受损细节)">
                    <Upload listType="picture-card"><PlusOutlined /></Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size="large" block>提交申请</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
export default AfterSalesApply;
