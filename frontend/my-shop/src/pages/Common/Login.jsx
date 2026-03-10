import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/back1.png';

// 如果你有 zustand/redux 等全局状态管理，可以在这里引入
// import useStore from '../../store/useStore'; 

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // 按钮防抖 loading 状态

    // 后端接口基地址
    const BASE_URL = 'http://localhost:8080';

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // 1. 发起登录请求
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password
                })
            });

            const resData = await response.json();
            console.log('登录响应数据:', resData);

            // ⚠️ 判断后端返回是否成功 (请根据你后端的实际结构调整，如 resData.code === 200)
            if (response.ok && (resData.code === 200 || resData.code === 0)) {

                // 2. 从后端返回的数据中解构出需要的信息 (假设数据在 resData.data 中)
                const userData = resData.data || resData;
                const { token, role, username, avatar } = userData;

                // 3. 将 Token 和用户信息持久化保存到浏览器 (这样刷新页面不会掉线)
                localStorage.setItem('token', token);
                localStorage.setItem('userInfo', JSON.stringify({ role, username, avatar }));

                // 💡 注意：你的 AuthGuard 中使用了 useStore 获取 userInfo
                // 所以如果你有 zustand store，请在这里调用 store 的 action 更新状态：
                // useStore.getState().setUserInfo({ token, role, username, avatar });

                message.success('登录成功，欢迎回来！');

                // 4. 根据不同的 role 进行页面分发
                // role: 0-管理员, 1-商家, 2-用户
                if (role === 0) {
                    navigate('/admin/center');
                } else if (role === 1) {
                    navigate('/merchant/center');
                } else if (role === 2) {
                    navigate('/mall/home');
                } else {
                    message.error('未知的用户角色配置');
                }
            } else {
                message.error(resData.message || resData.msg || '登录失败，请检查账号密码');
            }
        } catch (error) {
            console.error('登录异常:', error);
            message.error('网络请求失败，请检查后端服务是否启动');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            background: '#f0f2f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                display: 'flex',
                width: '1000px',
                height: '600px',
                background: '#fff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
            }}>
                <div style={{
                    flex: 1,
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                }}>
                    <div style={{ position: 'absolute', bottom: 40, left: 40, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        <h1 style={{ fontSize: 40, margin: 0, fontFamily: 'Playfair Display' }}>GALLERY.</h1>
                    </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 60px' }}>
                    <h2 style={{ fontSize: 32, marginBottom: 8, fontFamily: 'Playfair Display' }}>Sign In</h2>
                    <p style={{ color: '#888', marginBottom: 40 }}>进入您的专属艺术空间</p>
                    <Form name="login" onFinish={onFinish} size="large" layout="vertical">
                        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                            <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder="用户名 / 手机号" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                            <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder="密码" />
                        </Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                            <Checkbox>记住我</Checkbox>
                            <a>忘记密码？</a>
                        </div>
                        <Form.Item>
                            {/* 增加了 loading 属性，防止用户狂点按钮 */}
                            <Button type="primary" htmlType="submit" block loading={loading} style={{ height: 48, background: '#1a1a1a' }}>
                                登 录
                            </Button>
                        </Form.Item>
                        <div style={{ textAlign: 'center', marginTop: 10 }}>
                            <span style={{ color: '#888' }}>还没有账号？</span>
                            <a onClick={() => navigate('/register')} style={{ color: '#1a1a1a', fontWeight: 'bold' }}> 立即注册</a>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
