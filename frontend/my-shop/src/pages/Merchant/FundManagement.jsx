// src/pages/merchant/FundManagement.jsx
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Space, Row, Col, Alert, Radio, message, InputNumber, Divider } from 'antd';
import { WalletOutlined, SafetyCertificateOutlined, ExclamationCircleOutlined, SwapOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const FundManagement = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [rechargeAmount, setRechargeAmount] = useState(200);
    const [withdrawAmount, setWithdrawAmount] = useState(null);

    // 初始化读取余额
    useEffect(() => {
        const storedBalance = localStorage.getItem('merchantBalance');
        if (storedBalance) {
            setBalance(parseFloat(storedBalance));
        } else {
            // 初始化默认给个0
            localStorage.setItem('merchantBalance', '0');
        }
    }, []);

    // 处理充值
    const handleRecharge = () => {
        if (!rechargeAmount) {
            message.warning('请选择充值金额');
            return;
        }
        // 跳转到模拟支付页面，并携带金额参数
        navigate(`/merchant/mock-payment?amount=${rechargeAmount}`);
    };

    // 处理提现 (即刻扣除，无需审核)
    const handleWithdraw = () => {
        if (!withdrawAmount || withdrawAmount <= 0) {
            message.warning('请输入有效的提现金额');
            return;
        }
        if (withdrawAmount > balance) {
            message.error('提现金额不能超过当前账户余额');
            return;
        }

        // 模拟即刻提现逻辑：直接扣除余额
        const newBalance = balance - withdrawAmount;
        setBalance(newBalance);
        localStorage.setItem('merchantBalance', newBalance.toString()); // 更新本地存储

        message.success({
            content: `成功提现 ¥${withdrawAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}，资金已即刻退回您的结算账户`,
            duration: 3
        });

        setWithdrawAmount(null); // 清空输入框
    };

    // 是否满足上架门槛
    const isQualified = balance >= 200;

    return (
        <Card bordered={false} style={{ borderRadius: 16, minHeight: '80vh' }}>
            <Title level={3} style={{ fontFamily: 'Playfair Display', marginBottom: 32 }}>
                资金与保证金 / Funds & Deposit
            </Title>

            <Row gutter={48}>
                {/* 左侧：余额与状态面板 */}
                <Col span={11}>
                    {/* 余额卡片：高级黑金风格 */}
                    <div style={{
                        background: 'linear-gradient(145deg, #1a1a1a, #333333)',
                        borderRadius: 16, padding: '40px 32px', color: '#fff',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                        position: 'relative', overflow: 'hidden'
                    }}>
                        {/* 装饰性背景 */}
                        <WalletOutlined style={{ position: 'absolute', fontSize: 180, right: -40, bottom: -40, opacity: 0.05, color: '#fff' }} />

                        <Space align="center" style={{ marginBottom: 16 }}>
                            <WalletOutlined style={{ fontSize: 24, color: '#d4af37' }} />
                            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, letterSpacing: '1px' }}>当前账户余额</Text>
                        </Space>
                        <div style={{ fontFamily: 'Playfair Display', fontSize: 56, fontWeight: 'bold', color: '#d4af37', lineHeight: 1 }}>
                            ¥ {balance.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                        </div>
                    </div>

                    {/* 状态提示 */}
                    <div style={{ marginTop: 32 }}>
                        {isQualified ? (
                            <Alert
                                message="资金状态良好：您当前可以上拍艺术品"
                                description="您的余额已达到发布拍品所需的保证金下限（200元）。请注意：若发生拒不发货等违约行为，系统将直接扣除相应余额作为违约金。"
                                type="success"
                                showIcon
                                icon={<SafetyCertificateOutlined />}
                                style={{ borderRadius: 12, border: '1px solid #b7eb8f' }}
                            />
                        ) : (
                            <Alert
                                message="余额不足：目前受限，无法上拍新艺术品"
                                description="平台规定，画廊账户余额必须大于等于 200 元才可上拍。若您刚刚进行了提现操作导致余额不足，请重新充值以恢复上拍权限。"
                                type="error"
                                showIcon
                                icon={<ExclamationCircleOutlined />}
                                style={{ borderRadius: 12, border: '1px solid #ffa39e' }}
                            />
                        )}
                    </div>
                </Col>

                {/* 右侧：资金操作区 (充值 + 提现) */}
                <Col span={13}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>

                        {/* 充值卡片 */}
                        <Card title="资金充值 / Recharge" bordered style={{ borderRadius: 12, borderColor: '#f0f0f0' }} headStyle={{ borderBottom: '1px solid #f0f0f0', fontFamily: 'Playfair Display' }}>
                            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                                建议保持余额充足，以免影响拍品上架：
                            </Text>

                            <Radio.Group
                                onChange={(e) => setRechargeAmount(e.target.value)}
                                value={rechargeAmount}
                                style={{ width: '100%' }}
                            >
                                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                                    <Radio.Button value={200} style={{ width: '100%', textAlign: 'center', height: 48, lineHeight: '46px', borderRadius: 8 }}>
                                        ¥ 200 (最低上架门槛)
                                    </Radio.Button>
                                    <Radio.Button value={500} style={{ width: '100%', textAlign: 'center', height: 48, lineHeight: '46px', borderRadius: 8 }}>
                                        ¥ 500
                                    </Radio.Button>
                                    <Radio.Button value={1000} style={{ width: '100%', textAlign: 'center', height: 48, lineHeight: '46px', borderRadius: 8 }}>
                                        ¥ 1,000
                                    </Radio.Button>
                                </Space>
                            </Radio.Group>

                            <Button
                                type="primary"
                                size="large"
                                block
                                style={{ marginTop: 24, background: '#1a1a1a', height: 50, fontSize: 16, borderRadius: 8 }}
                                onClick={handleRecharge}
                            >
                                确认充值 ¥{rechargeAmount}
                            </Button>
                        </Card>

                        {/* 提现卡片 */}
                        <Card title="资金提现 / Withdraw" bordered style={{ borderRadius: 12, borderColor: '#f0f0f0' }} headStyle={{ borderBottom: '1px solid #f0f0f0', fontFamily: 'Playfair Display' }}>
                            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                                输入提现金额，资金将即刻免审核退回您的结算账户：
                            </Text>

                            <div style={{ position: 'relative' }}>
                                <InputNumber
                                    prefix={<span style={{ color: '#1a1a1a', fontWeight: 'bold', marginRight: 4 }}>¥</span>}
                                    value={withdrawAmount}
                                    onChange={(val) => setWithdrawAmount(val)}
                                    style={{ width: '100%', height: 50, fontSize: 18, borderRadius: 8 }}
                                    placeholder="0.00"
                                    min={0}
                                    max={balance}
                                    precision={2}
                                />
                                <Button
                                    type="link"
                                    onClick={() => setWithdrawAmount(balance)}
                                    style={{ position: 'absolute', right: 8, top: 9, color: '#d4af37', fontWeight: 500 }}
                                >
                                    全部提现
                                </Button>
                            </div>

                            <Button
                                size="large"
                                block
                                icon={<SwapOutlined />}
                                style={{
                                    marginTop: 24, height: 50, fontSize: 16, borderRadius: 8,
                                    color: '#1a1a1a', borderColor: '#1a1a1a'
                                }}
                                onClick={handleWithdraw}
                            >
                                确认即刻提现
                            </Button>
                        </Card>

                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export default FundManagement;
