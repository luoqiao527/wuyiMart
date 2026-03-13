import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, CarOutlined, CustomerServiceOutlined } from '@ant-design/icons';

const MerchantCenter = () => {
    return (
        <div style={{ padding: 24 }}>
            <h2 style={{ marginBottom: 24 }}>商家工作台</h2>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card hoverable bordered={false}>
                        <Statistic title="今日营业额 (元)" value={5430.00} precision={2} prefix={<DollarOutlined />} valueStyle={{ color: '#cf1322' }} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card hoverable bordered={false}>
                        <Statistic title="出售中商品" value={120} prefix={<ShoppingCartOutlined />} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card hoverable bordered={false}>
                        <Statistic title="待发货订单" value={15} prefix={<CarOutlined />} valueStyle={{ color: '#faad14' }} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card hoverable bordered={false}>
                        <Statistic title="待处理售后" value={3} prefix={<CustomerServiceOutlined />} valueStyle={{ color: '#722ed1' }} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default MerchantCenter;
