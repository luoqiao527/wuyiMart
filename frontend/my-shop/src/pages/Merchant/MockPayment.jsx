// src/pages/merchant/MockPayment.jsx
import React from 'react';
import { Card, Typography, Button, Space, message, Result } from 'antd';
import { QrcodeOutlined, SafetyCertificateFilled } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';

const { Title, Text } = Typography;

const MockPayment = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const amount = Number(searchParams.get('amount')) || 0;

    const handleSuccess = () => {
        // 读取当前余额
        const currentBalance = parseFloat(localStorage.getItem('merchantBalance') || '0');
        // 累加上充值金额
        const newBalance = currentBalance + amount;
        // 存回 localStorage
        localStorage.setItem('merchantBalance', newBalance.toString());

        message.success(`成功充值 ¥${amount}！资金已到账。`);
        // 跳回资金管理页
        navigate('/merchant/fund-management');
    };

    const handleCancel = () => {
        message.info('已取消支付');
        navigate('/merchant/fund-management');
    };

    // 如果没有金额参数直接访问此页面，给予错误提示
    if (!amount) {
        return (
            <Result
                status="error"
                title="无效的支付请求"
                subTitle="未获取到充值金额，请返回重新发起。"
                extra={<Button type="primary" onClick={() => navigate('/merchant/fund-management')}>返回资金管理</Button>}
            />
        );
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <Card
                bordered={false}
                style={{
                    width: 480,
                    textAlign: 'center',
                    borderRadius: 16,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                }}
            >
                <div style={{ marginBottom: 24, color: '#52c41a' }}>
                    <SafetyCertificateFilled style={{ fontSize: 32 }} />
                    <span style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 8, verticalAlign: 'top' }}>
                        平台安全收银台
                    </span>
                </div>

                <Text type="secondary" style={{ fontSize: 16 }}>扫码支付保证金</Text>
                <Title level={1} style={{ margin: '8px 0 24px', fontFamily: 'Playfair Display' }}>
                    ¥ {amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                </Title>

                {/* 模拟二维码区块 */}
                <div style={{
                    width: 200,
                    height: 200,
                    margin: '0 auto',
                    background: '#f5f5f5',
                    borderRadius: 12,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #e0e0e0'
                }}>
                    <Space direction="vertical">
                        <QrcodeOutlined style={{ fontSize: 100, color: '#1a1a1a' }} />
                        <Text type="secondary" style={{ fontSize: 12 }}>请使用微信/支付宝扫码</Text>
                    </Space>
                </div>

                <div style={{ marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center' }}>
                    <Button
                        size="large"
                        onClick={handleCancel}
                        style={{ width: 140, borderRadius: 8 }}
                    >
                        取消支付
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleSuccess}
                        style={{ width: 140, background: '#1a1a1a', borderRadius: 8 }}
                    >
                        确认充值成功
                    </Button>
                </div>

                <Text type="secondary" style={{ display: 'block', marginTop: 24, fontSize: 12 }}>
                    * 当前为模拟支付环境，点击“确认充值成功”即可完成模拟到账。
                </Text>
            </Card>
        </div>
    );
};

export default MockPayment;
