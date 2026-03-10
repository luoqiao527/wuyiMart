// src/layouts/MerchantLayout.jsx
import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
    DashboardOutlined,
    ShopOutlined,
    ProfileOutlined,
    SettingOutlined,
    UserOutlined,
    AppstoreAddOutlined,
    CarOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MerchantLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // 左侧菜单配置
    const menuItems = [
        { key: '/merchant/center', icon: <DashboardOutlined />, label: '工作台' },
        {
            key: 'products', icon: <ShopOutlined />, label: '商品管理',
            children: [
                { key: '/merchant/product-publish', label: '发布商品' },
                { key: '/merchant/product-list', label: '商品列表' },
                { key: '/merchant/consignment-list', label: '委托列表' },
                { key: '/merchant/category-request', icon: <AppstoreAddOutlined />, label: '分类申请' },
            ]
        },
        {
            key: 'orders', icon: <ProfileOutlined />, label: '订单管理',
            children: [
                { key: '/merchant/pending-shipments', icon: <CarOutlined />, label: '待发货订单' },
                { key: '/merchant/after-sales', label: '售后订单处理' },
            ]
        },
        {
            key: 'profile', icon: <SettingOutlined />, label: '我的店铺',
            children: [
                { key: '/merchant/profile', label: '店铺设置' },
                { key: '/merchant/fund-management', label: '我的钱包' },
            ]
        }
    ];

    // 顶部右侧下拉菜单
    const userMenu = {
        items: [
            { key: 'profile', label: '修改个人信息', onClick: () => navigate('/merchant/profile') },
            { type: 'divider' }, // 加一条分割线更精致
            { key: 'logout', label: '退出登录', danger: true, onClick: () => navigate('/login') }
        ]
    };

    return (
        // 外层背景色改为偏暖的浅灰，与白色的卡片形成高级对比
        <Layout style={{ minHeight: '100vh', background: '#faf9f7' }}>

            {/* 侧边栏：改为纯白亮色主题，增加柔和右侧阴影，去掉右边框 */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme="light" // 改为 light
                style={{
                    boxShadow: '2px 0 20px rgba(0,0,0,0.04)', // 高级弥散阴影
                    zIndex: 10 // 确保阴影能盖住右侧背景
                }}
            >
                {/* Logo 区域：使用登录页同款高级字体 */}
                <div style={{
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1a1a1a',
                    fontSize: collapsed ? 20 : 24,
                    fontFamily: 'Playfair Display, serif', // 高级衬线体
                    fontWeight: 'bold',
                    letterSpacing: collapsed ? '0' : '2px',
                    borderBottom: '1px solid #f0f0f0', // 细致的分割线
                    transition: 'all 0.3s'
                }}>
                    {collapsed ? 'G.' : 'GALLERY.'}
                </div>

                <Menu
                    theme="light" // 改为 light
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                    style={{ borderRight: 'none', padding: '12px 8px' }} // 去掉默认的丑陋右边框，增加内边距让菜单项更圆润
                />
            </Sider>

            <Layout style={{ background: 'transparent' }}>
                {/* 顶部导航：纯白，柔和下阴影 */}
                <Header style={{
                    padding: '0 32px',
                    background: '#fff',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                    zIndex: 9
                }}>
                    <Dropdown menu={userMenu} placement="bottomRight">
                        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 12px', borderRadius: '8px', transition: 'background 0.3s' }} className="user-dropdown-hover">
                            {/* 头像变得更精致 */}
                            <Avatar size={36} icon={<UserOutlined />} src="https://api.dicebear.com/7.x/miniavs/svg?seed=merchant" style={{ border: '1px solid #f0f0f0' }} />
                            <span style={{ color: '#333', fontWeight: 500 }}>AppleStore_01</span>
                        </div>
                    </Dropdown>
                </Header>

                {/* 内容区域：增加圆角，去掉自带的背景，让各个页面的卡片自己决定样式 */}
                <Content style={{
                    margin: '24px 32px', // 稍微拉开一点间距，更有呼吸感
                    minHeight: 280,
                    borderRadius: '16px', // 大圆角
                }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MerchantLayout;
