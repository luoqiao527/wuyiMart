// src/pages/user/UserCenter.jsx
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Avatar, Typography, Modal, Form, Input, Upload, message, Button } from 'antd';
import {
    UserOutlined,
    WalletOutlined,
    CarOutlined,
    CheckCircleOutlined,
    EnvironmentOutlined,
    FormOutlined,
    HistoryOutlined,
    AccountBookOutlined,
    PlusOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const UserCenter = () => {
    const navigate = useNavigate();
    const BASE_URL = 'http://localhost:8080'; // 您的后端基地址

    // 状态管理
    const [userInfo, setUserInfo] = useState(null); // 存储从后端获取的用户信息
    const [isModalVisible, setIsModalVisible] = useState(false); // 控制弹窗显示
    const [uploading, setUploading] = useState(false); // 头像上传 loading
    const [submitting, setSubmitting] = useState(false); // 表单提交 loading
    const [form] = Form.useForm(); // 表单实例

    // 获取本地存储的用户 ID (假设您登录时将用户信息存入了 localStorage)
    const getUserId = () => {
        try {
            const localUser = JSON.parse(localStorage.getItem('userInfo') || '{}');
            return localUser.id || 1; // 💡 测试阶段可以写死 1，联调时换成真实获取的 id
        } catch (e) {
            return 1;
        }
    };

    // 1. 初始化获取用户个人信息
    const fetchUserProfile = async () => {
        const userId = getUserId();
        if (!userId) {
            message.warning('请先登录');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/user/profile`, {
                method: 'GET',
                headers: {
                    'X-User-Id': userId.toString() // 根据您的后端要求传入
                }
            });
            const resData = await response.json();

            if (response.ok && (resData.code === 200 || resData.code === 0)) {
                setUserInfo(resData.data);
            } else {
                message.error(resData.message || '获取用户信息失败');
            }
        } catch (error) {
            console.error('获取用户信息异常:', error);
            // message.error('网络错误，请检查后端是否启动');
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    // 2. 自定义头像上传逻辑
    const customUpload = async (options) => {
        const { file, onSuccess, onError } = options;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'avatars');

        setUploading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/upload`, {
                method: 'POST',
                body: formData,
                // 注意：使用 fetch 传 FormData 时，不需要手动设置 Content-Type，浏览器会自动设置并加上 boundary
            });

            // 假设您的后端上传接口直接返回 url 字符串，或者在 data 中返回
            // 请根据实际接口响应结构调整解析逻辑！
            const resData = await response.json();

            if (response.ok) {
                // 假设返回的 URL 在 resData.data 中
                const imageUrl = resData.data || resData;

                // 将上传成功的 URL 塞入表单
                form.setFieldsValue({ avatar: imageUrl });
                onSuccess("ok");
                message.success('头像上传成功');
            } else {
                onError("上传失败");
                message.error('上传失败');
            }
        } catch (error) {
            console.error('上传异常:', error);
            onError(error);
            message.error('上传网络异常');
        } finally {
            setUploading(false);
        }
    };

    // 3. 打开弹窗，并回填数据
    const handleOpenModal = () => {
        if (!userInfo) return;

        // 密码默认不回填，留空表示不修改
        form.setFieldsValue({
            avatar: userInfo.avatar,
            username: userInfo.username,
            phone: userInfo.phone,
            email: userInfo.email,
            password: '',
            confirmPassword: ''
        });
        setIsModalVisible(true);
    };

    // 4. 提交修改表单
    const handleUpdateProfile = async (values) => {
        const userId = getUserId();
        setSubmitting(true);
        try {
            // 过滤掉前端确认密码，并剔除空字符串字段（用户没填的就不传）
            const params = {};
            Object.keys(values).forEach(key => {
                if (key !== 'confirmPassword' && values[key] && values[key].trim() !== '') {
                    params[key] = values[key];
                }
            });

            const response = await fetch(`${BASE_URL}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-Id': userId.toString()
                },
                body: JSON.stringify(params)
            });

            const resData = await response.json();

            if (response.ok && (resData.code === 200 || resData.code === 0)) {
                message.success('个人信息修改成功！');
                setIsModalVisible(false);
                fetchUserProfile(); // 刷新页面数据
            } else {
                message.error(resData.message || resData.msg || '修改失败');
            }
        } catch (error) {
            console.error('修改信息异常:', error);
            message.error('网络请求失败');
        } finally {
            setSubmitting(false);
        }
    };

    // 定义页面下方的菜单
    const orderMenu = [
        { title: '待支付', icon: <WalletOutlined />, path: '/user/orders/pending-pay', count: userInfo?.orderStats?.unpaid || 0 },
        { title: '待发货', icon: <CarOutlined />, path: '/user/orders/pending-ship', count: userInfo?.orderStats?.unshipped || 0 },
        { title: '待收货', icon: <CarOutlined />, path: '/user/orders/pending-receive', count: userInfo?.orderStats?.unreceived || 0 },
        { title: '售后中', icon: <CheckCircleOutlined />, path: '/user/orders/after-sales', count: userInfo?.orderStats?.afterSales || 0 },
    ];

    const serviceMenu = [
        { title: '我的竞拍', icon: <AccountBookOutlined />, path: '/mall/bids' },
        { title: '地址管理', icon: <EnvironmentOutlined />, path: '/user/address' },
        { title: '委托售卖申请', icon: <FormOutlined />, path: '/user/consign/apply' },
        { title: '我的委托记录', icon: <HistoryOutlined />, path: '/user/consign/records' },
    ];

    // 获取当前表单中的 avatar，用于头像预览展示
    const currentAvatarUrl = Form.useWatch('avatar', form);

    return (
        <div style={{ padding: '40px', maxWidth: 1200, margin: '0 auto' }}>

            {/* 顶部用户信息卡片 (点击触发弹窗) */}
            <Card
                variant="borderless"
                hoverable
                onClick={handleOpenModal}
                style={{ marginBottom: 40, background: '#1a1a1a', color: '#fff', borderRadius: 8, cursor: 'pointer' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <Avatar
                        size={80}
                        icon={<UserOutlined />}
                        // 如果后端没返回头像，使用默认的艺术风格占位图
                        src={userInfo?.avatar || "https://api.dicebear.com/7.x/notionists/svg?seed=art"}
                        style={{ border: '2px solid #d4af37' }}
                    />
                    <div>
                        <h2 style={{ color: '#fff', margin: 0, fontFamily: 'Playfair Display', fontSize: 28 }}>
                            {userInfo?.username || 'Art Collector'}
                        </h2>
                        <p style={{ color: '#aaa', margin: '8px 0 0 0', letterSpacing: 1 }}>
                            开启您的艺术鉴赏与投资之旅 (点击修改资料)
                        </p>
                    </div>
                </div>
            </Card>

            {/* 修改个人信息弹窗 */}
            <Modal
                title={<span style={{ fontFamily: 'Playfair Display', fontSize: 20 }}>Edit Profile</span>}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdateProfile}
                    style={{ marginTop: 24 }}
                >
                    {/* 隐藏的 input 用来存储最终的 avatar url 提交给后端 */}
                    <Form.Item name="avatar" hidden><Input /></Form.Item>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                        <Upload
                            name="file"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            customRequest={customUpload}
                        >
                            {currentAvatarUrl ? (
                                <img src={currentAvatarUrl} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <div>
                                    {uploading ? <LoadingOutlined /> : <PlusOutlined />}
                                    <div style={{ marginTop: 8 }}>更换头像</div>
                                </div>
                            )}
                        </Upload>
                    </div>

                    <Form.Item label="用户名" name="username">
                        <Input placeholder="输入新的用户名" />
                    </Form.Item>

                    <Form.Item label="电话号码" name="phone">
                        <Input placeholder="输入新的手机号" />
                    </Form.Item>

                    <Form.Item label="电子邮箱" name="email" rules={[{ type: 'email', message: '请输入有效的邮箱格式' }]}>
                        <Input placeholder="输入新的邮箱" />
                    </Form.Item>

                    <Form.Item label="新密码 (若不修改请留空)" name="password">
                        <Input.Password placeholder="输入新密码" />
                    </Form.Item>

                    <Form.Item
                        label="确认新密码"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    // 只有当填了新密码时，才校验两次输入是否一致
                                    if (!value && !getFieldValue('password')) {
                                        return Promise.resolve();
                                    }
                                    if (getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致！'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="再次输入新密码" />
                    </Form.Item>

                    <Form.Item style={{ marginTop: 32, marginBottom: 0 }}>
                        <Button type="primary" htmlType="submit" block loading={submitting} style={{ height: 40, background: '#1a1a1a' }}>
                            保存修改
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* 订单管理 */}
            <div style={{ marginBottom: 40 }}>
                <Title level={4} style={{ marginBottom: 20 }}>订单管理 / Orders</Title>
                <Row gutter={24}>
                    {orderMenu.map((item, index) => (
                        <Col xs={12} sm={6} key={index}>
                            <Card hoverable onClick={() => navigate(item.path)} style={{ textAlign: 'center', borderRadius: 8, borderColor: '#eaeaea' }}>
                                <div style={{ fontSize: 28, color: '#1a1a1a' }}>{item.icon}</div>
                                <div style={{ marginTop: 12, fontSize: 15 }}>{item.title} {item.count > 0 && <span style={{ color: '#d32f2f' }}>({item.count})</span>}</div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* 我的服务 */}
            <div>
                <Title level={4} style={{ marginBottom: 20 }}>送拍与服务 / Services & Consignment</Title>
                <Row gutter={24}>
                    {serviceMenu.map((item, index) => (
                        <Col xs={12} sm={6} key={index}>
                            <Card hoverable onClick={() => navigate(item.path)} style={{ textAlign: 'center', borderRadius: 8, borderColor: '#eaeaea' }}>
                                <div style={{ fontSize: 28, color: '#666' }}>{item.icon}</div>
                                <div style={{ marginTop: 12, fontSize: 15, color: '#1a1a1a' }}>{item.title}</div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

        </div>
    );
};

export default UserCenter;
