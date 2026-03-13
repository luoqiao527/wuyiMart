import React, { useState } from 'react';
import { Card, Tabs, Table, Button, Tag, Space, Badge, Avatar, Typography, Tooltip, Input } from 'antd';
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    FireFilled,
    ClockCircleOutlined,
    StopOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const ProductList = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('1');

    // --- 模拟数据 (加入了 hasNewBid 字段来模拟是否有新出价) ---
    const dataOnline = [
        {
            id: '1001',
            name: '19世纪 印象派原作 油画《日出》',
            cover: 'https://img.alicdn.com/imgextra/i4/O1CN013tL8Yh1ZJtJ9H2X9M_!!6000000003175-0-tps-800-800.jpg',
            currentPrice: 45000,
            startPrice: 30000,
            bids: 12,
            endTime: '2h 15m',
            hasNewBid: true, // 核心字段：是否有新竞价
            status: 'active'
        },
        {
            id: '1002',
            name: 'KAWS 2021 限量版公仔',
            cover: 'https://api.dicebear.com/7.x/shapes/svg?seed=kaws',
            currentPrice: 8500,
            startPrice: 8500,
            bids: 0,
            endTime: '5h 30m',
            hasNewBid: false,
            status: 'active'
        }
    ];

    const dataPending = [
        {
            id: '2001',
            name: '清代 景泰蓝花瓶 (待鉴定)',
            cover: 'https://api.dicebear.com/7.x/shapes/svg?seed=vase',
            startPrice: 12000,
            submitTime: '2023-10-24 14:20',
            status: 'pending'
        }
    ];

    const dataRejected = [
        {
            id: '3001',
            name: '高仿 劳力士绿水鬼',
            cover: 'https://api.dicebear.com/7.x/shapes/svg?seed=watch',
            startPrice: 200,
            reason: '涉及侵权/假冒伪劣',
            status: 'rejected'
        }
    ];

    // --- 1. 已上架表格列定义 ---
    const columnsOnline = [
        {
            title: '拍品信息',
            dataIndex: 'name',
            key: 'name',
            width: 300,
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Avatar shape="square" size={64} src={record.cover} style={{ borderRadius: 8, border: '1px solid #f0f0f0' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, fontSize: 15, color: '#1a1a1a' }}>{text}</span>
                        <Text type="secondary" style={{ fontSize: 12 }}>ID: {record.id}</Text>
                        <div style={{ marginTop: 4 }}>
                            <Tag color="error" icon={<ClockCircleOutlined />} style={{ borderRadius: 4, fontSize: 12, padding: '0 6px' }}>
                                剩 {record.endTime}
                            </Tag>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '当前价 / 起拍价',
            dataIndex: 'currentPrice',
            key: 'price',
            render: (val, record) => (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' }}>
                            ¥{val.toLocaleString()}
                        </span>
                        {/* 如果有新出价，显示一个小火苗或者 Up 标签 */}
                        {record.hasNewBid && (
                            <Tooltip title="价格变动：有新的买家出价！">
                                <Badge status="processing" color="red" />
                                <span style={{ color: '#cf1322', fontSize: 12, fontWeight: 'bold' }}>New!</span>
                            </Tooltip>
                        )}
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>起: ¥{record.startPrice.toLocaleString()}</Text>
                </div>
            )
        },
        {
            title: '热度',
            dataIndex: 'bids',
            render: (val) => (
                <Space>
                    <FireFilled style={{ color: val > 0 ? '#faad14' : '#e0e0e0' }} />
                    <span>{val} 次出价</span>
                </Space>
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* 重点：带红点的详情按钮 */}
                    <Badge dot={record.hasNewBid} offset={[-5, 5]}>
                        <Button
                            type={record.hasNewBid ? "primary" : "default"}
                            ghost={record.hasNewBid} // 如果有新消息，用幽灵按钮样式突出
                            icon={<EyeOutlined />}
                            onClick={() => navigate(`/merchant/auction-detail/${record.id}`)}
                            style={{
                                borderColor: record.hasNewBid ? '#cf1322' : '#d9d9d9',
                                color: record.hasNewBid ? '#cf1322' : 'inherit'
                            }}
                        >
                            实况详情
                        </Button>
                    </Badge>

                    <Tooltip title="修改拍品信息（有人出价后不可修改核心参数）">
                        <Button type="text" icon={<EditOutlined />} />
                    </Tooltip>

                    <Tooltip title="提前结束或下架">
                        <Button type="text" danger icon={<StopOutlined />} />
                    </Tooltip>
                </Space>
            )
        }
    ];

    // --- 2. 待审核表格列定义 ---
    const columnsPending = [
        {
            title: '拍品信息',
            dataIndex: 'name',
            render: (text, record) => (
                <Space>
                    <Avatar shape="square" size={48} src={record.cover} />
                    <span>{text}</span>
                </Space>
            )
        },
        {
            title: '起拍价',
            dataIndex: 'startPrice',
            render: val => `¥${val.toLocaleString()}`
        },
        {
            title: '提交时间',
            dataIndex: 'submitTime',
            render: val => <Text type="secondary">{val}</Text>
        },
        {
            title: '操作',
            render: () => <Space><Button type="link">撤回申请</Button></Space>
        }
    ];

    // --- 3. 未通过表格列定义 ---
    const columnsRejected = [
        { title: '拍品名称', dataIndex: 'name' },
        {
            title: '驳回原因',
            dataIndex: 'reason',
            render: text => <Text type="danger">{text}</Text>
        },
        {
            title: '操作',
            render: () => (
                <Space>
                    <Button type="primary" size="small" style={{ background: '#1a1a1a', borderColor: '#1a1a1a' }}>重新编辑</Button>
                    <Button type="text" danger size="small">删除</Button>
                </Space>
            )
        }
    ];

    const items = [
        { key: '1', label: '竞拍中 (Active)', children: <Table columns={columnsOnline} dataSource={dataOnline} rowKey="id" pagination={false} /> },
        { key: '2', label: '待审核 (Pending)', children: <Table columns={columnsPending} dataSource={dataPending} rowKey="id" /> },
        { key: '3', label: '未通过 (Rejected)', children: <Table columns={columnsRejected} dataSource={dataRejected} rowKey="id" /> },
    ];

    return (
        <Card
            title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 20, fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                        拍品管理 / Auctions
                    </span>
                    <Input
                        prefix={<SearchOutlined style={{ color: '#ccc' }} />}
                        placeholder="搜索拍品名称/ID..."
                        style={{ width: 240, borderRadius: 20 }}
                    />
                </div>
            }
            bordered={false}
            style={{ padding: '0 12px' }}
        >
            <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={setActiveTab}
                type="card"
                tabBarStyle={{ marginBottom: 24 }}
            />
        </Card>
    );
};

export default ProductList;
