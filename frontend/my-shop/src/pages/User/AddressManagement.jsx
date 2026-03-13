import React from 'react';
import { Card, Button, List, Tag } from 'antd';

const AddressManagement = () => {
    const data = [
        { title: '张先生', phone: '13800138000', address: '上海市黄浦区中山东一路美术馆 101室', isDefault: true }
    ];
    return (
        <Card title="收货地址管理" bordered={false} style={{ maxWidth: 800, margin: '40px auto' }} extra={<Button type="primary">新增地址</Button>}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={[<a>修改</a>, <a style={{ color: 'red' }}>删除</a>]}>
                        <List.Item.Meta
                            title={<>{item.title} {item.phone} {item.isDefault && <Tag color="black">默认</Tag>}</>}
                            description={item.address}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};
export default AddressManagement;
