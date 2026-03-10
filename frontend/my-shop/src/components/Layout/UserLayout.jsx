// src/components/Layout/UserLayout.jsx
import React from 'react';
import { Layout, Space } from 'antd';
import { HeartOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const UserLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 简易的导航高亮逻辑
    const getNavStyle = (path) => ({
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: location.pathname.includes(path) ? 600 : 400,
        color: location.pathname.includes(path) ? '#d4af37' : '#1a1a1a', // 选中状态变为暗金色
        transition: 'all 0.3s',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    });

    return (
        <Layout style={{ minHeight: '100vh', background: '#faf9f7' }}>
            {/* 极简风顶部导航 */}
            <Header style={{
                background: 'rgba(250, 249, 247, 0.95)',
                backdropFilter: 'blur(10px)',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 60px',
                borderBottom: '1px solid #eaeaea',
                height: 80 // 稍微增加头部高度，显得更大气
            }}>
                {/* 左侧 Logo */}
                <div
                    onClick={() => navigate('/mall/home')}
                    style={{
                        fontSize: '26px',
                        fontWeight: 'bold',
                        letterSpacing: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Playfair Display',
                        color: '#1a1a1a'
                    }}
                >
                    GALLERY.
                </div>

                {/* 中间菜单 - 纯拍卖模式 */}
                <Space size={48}>
                    <span style={getNavStyle('/mall/home')} onClick={() => navigate('/mall/home')}>首页大厅</span>
                    <span style={getNavStyle('/mall/auction')} onClick={() => navigate('/mall/auction')}>正在热拍</span>
                </Space>

                {/* 右侧操作区 - 移除购物车 */}
                <Space size={28} style={{ fontSize: '20px' }}>
                    {/* 新增：我的竞拍记录入口 */}
                    <ClockCircleOutlined
                        style={{ cursor: 'pointer', color: '#1a1a1a', transition: 'color 0.3s' }}
                        onClick={() => navigate('/mall/bids')}
                        title="我的竞拍"
                        onMouseOver={e => e.currentTarget.style.color = '#d4af37'}
                        onMouseOut={e => e.currentTarget.style.color = '#1a1a1a'}
                    />
                    <HeartOutlined
                        style={{ cursor: 'pointer', color: '#1a1a1a', transition: 'color 0.3s' }}
                        onClick={() => navigate('/user/favorites')}
                        title="关注的拍品"
                        onMouseOver={e => e.currentTarget.style.color = '#d4af37'}
                        onMouseOut={e => e.currentTarget.style.color = '#1a1a1a'}
                    />
                    <UserOutlined
                        style={{ cursor: 'pointer', color: '#1a1a1a', transition: 'color 0.3s' }}
                        onClick={() => navigate('/user/center')}
                        title="个人中心"
                        onMouseOver={e => e.currentTarget.style.color = '#d4af37'}
                        onMouseOut={e => e.currentTarget.style.color = '#1a1a1a'}
                    />
                </Space>
            </Header>

            {/* 页面内容渲染区 */}
            <Content style={{ minHeight: 'calc(100vh - 160px)' }}>
                <Outlet />
            </Content>

            {/* 极简底部 */}
            <Footer style={{
                textAlign: 'center',
                background: '#1a1a1a', // 底部改为高级黑
                color: '#888',
                padding: '40px 50px',
                fontFamily: 'Playfair Display',
                letterSpacing: '2px'
            }}>
                © {new Date().getFullYear()} GALLERY AUCTION HOUSE. ALL RIGHTS RESERVED.
            </Footer>
        </Layout>
    );
};

export default UserLayout;
