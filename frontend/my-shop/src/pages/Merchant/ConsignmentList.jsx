import React, { useState } from 'react';
import { Card, Tabs, Table, Button, Space, Avatar, Typography, Tag, Input } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const ConsignmentList = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('pending');

    // 模拟数据
    const dataPending = [
        {
            id: 'C10086',
            name: '清代 乾隆年间 景泰蓝花瓶',
            cover: 'https://img.alicdn.com/imgextra/i3/O1CN01Z2X9Y21t3J9H2X9M_!!6000000005844-0-tps-800-800.jpg',
            consignor: '张三 (ID: 8932)',
            expectedPrice: 150000,
            submitTime: '2023-10-25 14:30',
        },
        {
            id: 'C10087',
            name: '劳力士 绿水鬼 116610LV',
            cover: 'https://api.dicebear.com/7.x/shapes/svg?seed=watch2',
            consignor: '李先生 (ID: 1024)',
            expectedPrice: 85000,
            submitTime: '2023-10-25 09:15',
        }
    ];

    const columns = [
        {
            title: '委托拍品',
            dataIndex: 'name',
            key: 'name',
            width: 350,
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Avatar shape="square" size={64} src={record.cover} style={{ borderRadius: 8, border: '1px solid #f0f0f0' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, fontSize: 15, color: '#1a1a1a' }}>{text}</span>
                        <Text type="secondary" style={{ fontSize: 12 }}>委托单号: {record.id}</Text>
                    </div>
                </div>
            )
        },
        {
            title: '委托人',
            dataIndex: 'consignor',
            render: (text) => (
                <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <Text>{text}</Text>
                </Space>
            )
        },
        {
            title: '买家期望起拍价',
            dataIndex: 'expectedPrice',
            render: val => (
                <span style={{ fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 'bold' }}>
                    ¥{val.toLocaleString()}
                </span>
            )
        },
        { title: '提交时间', dataIndex: 'submitTime', render: val => <Text type="secondary">{val}</Text> },
        {
            title: '操作',
            render: (_, record) => (
                <Button
                    type="primary"
                    onClick={() => navigate(`/merchant/consignment-detail/${record.id}`)}
                    style={{ background: '#1a1a1a', borderColor: '#1a1a1a', borderRadius: 6 }}
                >
                    审查鉴定
                </Button>
            )
        }
    ];

    return (
        <Card
            title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 20, fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                        拍品征集审核 / Consignments
                    </span>
                    <Input prefix={<SearchOutlined />} placeholder="搜索单号/拍品名称..." style={{ width: 240, borderRadius: 20 }} />
                </div>
            }
            bordered={false}
            style={{ padding: '0 12px' }}
        >
            <Tabs defaultActiveKey="pending" onChange={setActiveTab} type="card" tabBarStyle={{ marginBottom: 24 }}>
                <Tabs.TabPane tab="待审核 (Pending)" key="pending">
                    <Table columns={columns} dataSource={dataPending} rowKey="id" pagination={false} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="已接纳 (Accepted)" key="accepted">
                    {/* 结构同上，替换数据源即可 */}
                </Tabs.TabPane>
                <Tabs.TabPane tab="已驳回 (Rejected)" key="rejected">
                    {/* 结构同上，替换数据源即可 */}
                </Tabs.TabPane>
            </Tabs>
        </Card>
    );
};

export default ConsignmentList;
