// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    DashboardOutlined, ShopOutlined, UserSwitchOutlined,
    AppstoreOutlined, AuditOutlined, LogoutOutlined, CrownOutlined, WalletOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    // 菜单配置保持不变，仅优化显示
    const menuItems = [
        { key: '/admin/center', icon: <DashboardOutlined />, label: '数据中心' },
        { key: '/admin/products', icon: <ShopOutlined />, label: '在线拍品管理' }, // 文案贴合拍卖
        {
            key: 'sub1', icon: <UserSwitchOutlined />, label: '画廊入驻管理',
            children: [
                { key: '/admin/merchant-audit', label: '入驻申请列表' },
            ]
        },
        {
            key: 'sub2', icon: <AuditOutlined />, label: '拍品上架审核',
            children: [
                { key: '/admin/product-audit', label: '拍品申请列表' },
            ]
        },
        {
            key: 'sub3', icon: <AppstoreOutlined />, label: '分类管理',
            children: [
                { key: '/admin/category-manage', label: '全部分类' },
                { key: '/admin/category-audit', label: '新增分类审核' },
            ]
        },
    ];

    const adminMenu = {
        items: [
            { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', danger: true, onClick: () => navigate('/login') }
        ]
    };

    return (
        // 外层背景色改为偏暖的浅灰，与白色的卡片形成高级对比 (同 Merchant)
        <Layout style={{ minHeight: '100vh', background: '#faf9f7' }}>

            {/* 侧边栏：纯白亮色主题，增加柔和右侧阴影，去掉右边框 */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                theme="light"
                style={{
                    boxShadow: '2px 0 20px rgba(0,0,0,0.04)', // 高级弥散阴影
                    zIndex: 10
                }}
            >
                {/* Logo 区域：使用极简高级字体 */}
                <div style={{
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1a1a1a',
                    fontSize: collapsed ? 18 : 20,
                    fontFamily: 'Playfair Display, serif', // 高级衬线体
                    fontWeight: 'bold',
                    letterSpacing: collapsed ? '0' : '2px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'all 0.3s'
                }}>
                    {collapsed ? 'G.A' : 'GALLERY. ADMIN'}
                </div>

                <Menu
                    theme="light"
                    selectedKeys={[location.pathname]}
                    mode="inline"
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                    style={{ borderRight: 'none', padding: '12px 8px' }} // 增加内边距让菜单项更圆润
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
                    <Dropdown menu={adminMenu} placement="bottomRight">
                        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 12px', borderRadius: '8px' }}>
                            {/* 头像改为黑金配色，彰显最高权限 */}
                            <Avatar size={36} style={{ backgroundColor: '#1a1a1a', color: '#d4af37', border: '1px solid #f0f0f0', fontFamily: 'Playfair Display', fontWeight: 'bold' }}>
                                A
                            </Avatar>
                            <span style={{ color: '#1a1a1a', fontWeight: 600 }}>Super Admin</span>
                        </div>
                    </Dropdown>
                </Header>

                {/* 内容区域：增加圆角，去掉自带的纯白背景，交给各个子页面的 Card 去渲染 */}
                <Content style={{
                    margin: '24px 32px',
                    minHeight: 280,
                    borderRadius: '16px'
                }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
