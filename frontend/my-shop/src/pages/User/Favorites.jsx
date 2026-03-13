import React from 'react';
import { Row, Col, Card, Button } from 'antd';

const Favorites = () => {
    return (
        <div style={{ padding: '40px' }}>
            <h2 style={{ fontSize: 24, marginBottom: 24 }}>我的心愿单 (1)</h2>
            <Row gutter={24}>
                <Col span={6}>
                    <Card cover={<img src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&w=400&q=80" alt="art" />} className="art-card">
                        <h4>抽象空间 No.3</h4>
                        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="primary" size="small">加入推车</Button>
                            <Button type="text" size="small" danger>取消收藏</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default Favorites;
