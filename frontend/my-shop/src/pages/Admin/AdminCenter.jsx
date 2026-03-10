import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { ShopOutlined, UserOutlined, FileTextOutlined, WarningOutlined } from '@ant-design/icons';

const AdminCenter = () => {
    const [stats, setStats] = useState({
        userCount: 0, merchantCount: 0, pendingMerchants: 0, pendingProducts: 0
    });

    useEffect(() => {
        // TODO: 调用后端接口获取看板数据
        // axios.get('/api/admin/statistics').then(res => setStats(res.data));
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: 20 }}>工作台数据概览</h2>
            <Row gutter={16}>
                <Col span={6}>
                    <Card bordered={false} style={{ background: '#f6ffed' }}>
                        <Statistic title="总注册用户数" value={stats.userCount} prefix={<UserOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} style={{ background: '#e6f7ff' }}>
                        <Statistic title="入驻商家总数" value={stats.merchantCount} prefix={<ShopOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} style={{ background: '#fffbe6' }}>
                        <Statistic title="待审核商家入驻" value={stats.pendingMerchants} prefix={<FileTextOutlined />} valueStyle={{ color: '#faad14' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} style={{ background: '#fff1f0' }}>
                        <Statistic title="待审核商品上架" value={stats.pendingProducts} prefix={<WarningOutlined />} valueStyle={{ color: '#cf1322' }} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminCenter;
