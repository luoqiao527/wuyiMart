import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../store/useStore';

const AuthGuard = ({ requireRole }) => {
    const { userInfo } = useStore();

    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }

    // 角色：0管理员，1商家，2用户
    if (requireRole !== undefined && userInfo.role !== requireRole) {
        return <div>您没有权限访问该页面！</div>;
    }

    return <Outlet />;
};

export default AuthGuard;
