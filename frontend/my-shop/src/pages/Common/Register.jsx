// 文件路径：src/pages/Common/Register.jsx
import React, { useState } from 'react';
import { Form, Input, Button, Tabs, message, Card, Row, Col } from 'antd';
import { UserOutlined, ShopOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [activeRole, setActiveRole] = useState('2'); // '2': 用户, '1': 商家
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // ✅ 定义您的后端基地址
    const BASE_URL = 'http://localhost:8080';

    const onFinish = async (values) => {
        setLoading(true);
        try {
            let url = '';
            let payload = {};

            // 1. 拼接完整的请求路径
            if (activeRole === '2') {
                url = `${BASE_URL}/api/auth/register/user`;
                payload = {
                    username: values.username,
                    password: values.password,
                    phone: values.phone,
                    email: values.email
                };
            } else {
                url = `${BASE_URL}/api/auth/register/merchant`;
                payload = {
                    username: values.username,
                    password: values.password,
                    phone: values.phone,
                    realName: values.realName,
                    idCard: values.idCard,
                    shopName: values.shopName
                };
            }

            console.log(`发送到 ${url} 的数据:`, payload);

            // 2. 发起网络请求
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            // 3. 解析后端返回的数据 (假设您的后端统一返回 JSON 格式)
            const resData = await response.json();
            console.log('后端返回结果:', resData);

            // ⚠️ 注意：这里的判断逻辑请根据您后端的实际返回结构调整！
            // 假设您的后端成功时返回类似 { code: 200, message: "成功", data: null }
            if (response.ok && (resData.code === 200 || resData.code === 0)) {
                message.success(`${activeRole === '1' ? '机构' : '藏家'} 注册成功！`);
                setTimeout(() => navigate('/login'), 1500);
            } else {
                // 如果后端返回了错误提示，优先显示后端的提示，否则显示默认提示
                message.error(resData.message || resData.msg || '注册失败，请检查填写信息或稍后重试');
            }

        } catch (error) {
            console.error('注册异常:', error);
            message.error('网络请求失败，请检查后端服务是否启动');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 0',
            backgroundImage: `linear-gradient(rgba(250, 249, 247, 0.7), rgba(250, 249, 247, 0.9)), url('https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        }}>
            <Card
                bordered={false}
                style={{
                    width: 700,
                    padding: '10px 30px',
                    borderRadius: '2px',
                    background: '#fff',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <h1 style={{ fontSize: 32, margin: 0, fontFamily: 'Playfair Display' }}>Join the Gallery</h1>
                </div>

                <Tabs
                    centered
                    activeKey={activeRole}
                    onChange={(key) => { setActiveRole(key); form.resetFields(); }}
                    items={[
                        { key: '2', label: <span style={{ fontSize: 16, padding: '0 20px' }}><UserOutlined /> 藏家注册</span> },
                        { key: '1', label: <span style={{ fontSize: 16, padding: '0 20px' }}><ShopOutlined /> 机构入驻</span> }
                    ]}
                    style={{ marginBottom: 32 }}
                />

                <Form form={form} name="register" onFinish={onFinish} layout="vertical" size="large">
                    {/* 基础公共信息 */}
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item name="username" label="用户名 / Username" rules={[{ required: true, message: '必填' }]}>
                                <Input placeholder="如: ArtLover99" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="phone" label="手机号码 / Phone" rules={[{ required: true, message: '必填' }]}>
                                <Input placeholder="11位手机号码" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="password" label="设置密码 / Password" rules={[{ required: true, message: '必填' }]}>
                                <Input.Password placeholder="至少 6 位" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="confirmPassword" label="确认密码 / Confirm" dependencies={['password']}
                                rules={[
                                    { required: true, message: '必填' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) return Promise.resolve();
                                            return Promise.reject(new Error('两次密码不一致!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="再次输入密码" />
                            </Form.Item>
                        </Col>

                        {/* 藏家专属字段 */}
                        {activeRole === '2' && (
                            <Col span={24}>
                                <Form.Item name="email" label="电子邮箱 / Email Address" rules={[{ required: true, type: 'email', message: '需有效邮箱' }]}>
                                    <Input placeholder="example@art.com" />
                                </Form.Item>
                            </Col>
                        )}

                        {/* 机构入驻专属字段 */}
                        {activeRole === '1' && (
                            <>
                                <Col span={24}>
                                    <div style={{ height: 1, background: '#eee', margin: '8px 0 24px 0' }}></div>
                                    <p style={{ fontWeight: 'bold', marginBottom: 16, color: '#555' }}>认证信息 (机构入驻必填)</p>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="shopName" label="店铺/机构名称" rules={[{ required: true, message: '必填' }]}>
                                        <Input placeholder="如：张三的古玩店" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="realName" label="真实姓名" rules={[{ required: true, message: '必填' }]}>
                                        <Input placeholder="请与证件一致" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: '必填' }]}>
                                        <Input placeholder="18位法定证件号" />
                                    </Form.Item>
                                </Col>
                            </>
                        )}
                    </Row>

                    <Form.Item style={{ marginTop: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            style={{ height: 50, fontSize: 14, letterSpacing: '2px', background: '#1a1a1a' }}
                        >
                            {activeRole === '1' ? 'SUBMIT APPLICATION' : 'CREATE ACCOUNT'}
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#888' }}>
                        Already have an account?
                        <a onClick={() => navigate('/login')} style={{ color: '#1a1a1a', fontWeight: 'bold', marginLeft: 8 }}>SIGN IN</a>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Register;
