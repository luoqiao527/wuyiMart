import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import MainLayout from './components/Layout/MainLayout';
import AuthGuard from './components/AuthGuard';
import './styles/merchant-global.css';

// 管理员页面 (角色 0)
import AdminCenter from './pages/Admin/AdminCenter';
import OnlineProducts from './pages/Admin/OnlineProducts';
import MerchantAudit from './pages/Admin/MerchantAudit';
import MerchantAuditDetail from './pages/Admin/MerchantAuditDetail';
import ProductAudit from './pages/Admin/ProductAudit';
import ProductAuditDetail from './pages/Admin/ProductAuditDetail';
import CategoryAudit from './pages/Admin/CategoryAudit';
import CategoryManage from './pages/Admin/CategoryManage';
// import MerchantProductList from './pages/Admin/MerchantProductList';
// ... 其他管理员页面导入
import AdminLayout from './components/Layout/AdminLayout';
// // 商家页面 (角色 1)
import MerchantLayout from './components/Layout/MerchantLayout';
import MerchantCenter from './pages/Merchant/MerchantCenter';
import ProfileEdit from './pages/Merchant/ProfileEdit';
import ProductPublish from './pages/Merchant/ProductPublish';
import ProductList from './pages/Merchant/ProductList';
import PendingShipmentList from './pages/Merchant/PendingShipmentList';
import OrderShipping from './pages/Merchant/OrderShipping';
import AfterSalesList from './pages/Merchant/AfterSalesList';
import AfterSalesDetail from './pages/Merchant/AfterSalesDetail';
import CategoryRequest from './pages/Merchant/CategoryRequest';
import AuctionDetail from './pages/Merchant/AuctionDetail';
import ConsignmentList from './pages/Merchant/ConsignmentList';
import ConsignmentDetail from './pages/Merchant/ConsignmentDetail';
import FundManagement from './pages/Merchant/FundManagement';
import MockPayment from './pages/Merchant/MockPayment';
// import MerchantHome from './pages/Merchant/MerchantHome';
// import ProductPublish from './pages/Merchant/ProductPublish';
// // ... 其他商家页面导入

// // 用户页面 (角色 2)
import UserLayout from './components/Layout/UserLayout';
// 📦 引入用户端 (User) 的 16 个页面 (完全按照你的截图命名)
import MallHome from './pages/User/MallHome';
import ProductDetail from './pages/User/ProductDetail';
import AuctionHouse from './pages/User/AuctionHouse';
import MyBids from './pages/User/MyBids';
import Checkout from './pages/User/Checkout';
import Payment from './pages/User/Payment';
import UserCenter from './pages/User/UserCenter';
import UserProfile from './pages/User/UserProfile';
import Favorites from './pages/User/Favorites';
import AddressManagement from './pages/User/AddressManagement';
import OrderPendingPay from './pages/User/OrderPendingPay';
import OrderPendingShip from './pages/User/OrderPendingShip';
import OrderPendingReceive from './pages/User/OrderPendingReceive';
import OrderCompleted from './pages/User/OrderCompleted';
import AfterSalesApply from './pages/User/AfterSalesApply';
import OrderAfterSales from './pages/User/OrderAfterSales';
import ConsignApply from './pages/User/ConsignApply';
import ConsignRecords from './pages/User/ConsignRecords';
// import UserHome from './pages/User/UserHome';
// import Mall from './pages/User/Mall';
// import Orders from './pages/User/Orders';
// ... 其他用户页面导入
import Login from './pages/Common/Login';
import Register from './pages/Common/Register';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 公共无需登录的路由 */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 需要登录和布局的路由 */}
        {/* <Route path="/" element={<MainLayout />}> */}
        {/* 管理员路由 (role: 0) */}
        <Route path="/admin" element={<AdminLayout />}>{/*requireRole={0}*/}
          <Route index element={<Navigate to="center" replace />} />
          <Route path="center" element={<AdminCenter />} />
          <Route path="products" element={<OnlineProducts />} />
          <Route path="merchant-audit" element={<MerchantAudit />} />
          <Route path="merchant-audit/:id" element={<MerchantAuditDetail />} />
          <Route path="product-audit" element={<ProductAudit />} />
          <Route path="product-audit/:id" element={<ProductAuditDetail />} />
          <Route path="category-audit" element={<CategoryAudit />} />
          <Route path="category-manage" element={<CategoryManage />} />
          {/* <Route path="merchant-products/:merchantId" element={<MerchantProductList />} /> */}
        </Route>

        {/* 商家路由 (role: 1) */}
        <Route path="/merchant" element={<MerchantLayout />}>
          {/* 1. 个人中心页 */}
          <Route path="center" element={<MerchantCenter />} />

          {/* 2. 个人信息修改页 */}
          <Route path="profile" element={<ProfileEdit />} />

          {/* 3. 商品上架填写页 */}
          <Route path="product-publish" element={<ProductPublish />} />

          {/* 4. 商品列表页 */}
          <Route path="product-list" element={<ProductList />} />

          {/* 5. 待发货订单列表页 */}
          <Route path="pending-shipments" element={<PendingShipmentList />} />

          {/* 6. 订单发货页 (带动态参数 :id) */}
          <Route path="shipping/:id" element={<OrderShipping />} />

          {/* 7. 售后订单列表页 */}
          <Route path="after-sales" element={<AfterSalesList />} />

          {/* 8. 售后订单详情页 (带动态参数 :id) */}
          <Route path="after-sales/:id" element={<AfterSalesDetail />} />

          {/* 9. 分类申请页面 */}
          <Route path="category-request" element={<CategoryRequest />} />

          {/* 10. 商品详情页面 */}
          <Route path="auction-detail/:id" element={<AuctionDetail />} />
          <Route path="consignment-list" element={<ConsignmentList />} />
          <Route path="fund-management" element={<FundManagement />} />
          <Route path="mock-payment" element={<MockPayment />} />
          <Route path="consignment-detail/:id" element={<ConsignmentDetail />} />
        </Route>
        {/* <Route element={<AuthGuard requireRole={1} />}>
          <Route path="merchant/center" element={<MerchantHome />} />
          <Route path="merchant/publish" element={<ProductPublish />} /> */}
        {/* 对应需求：订单发货、售后列表等 */}
        {/* </Route> */}

        {/* 用户路由 (role: 2) */}
        <Route element={<UserLayout />}>

          {/* 访问根目录直接跳转到商城首页 */}
          <Route path="/user" element={<Navigate to="/mall/home" replace />} />
          {/* 🛒 1. 商城核心浏览 & 交易链路 */}
          <Route path="/mall/home" element={<MallHome />} />                 {/* 3. 商城首页（拍卖大厅） */}
          <Route path="/mall/product/:id" element={<ProductDetail />} />     {/* 4. 商品详情页 */}
          <Route path="/mall/auction" element={<AuctionHouse />} />          {/* 9. 热拍页面 */}
          <Route path="/mall/bids" element={< MyBids />} />                     {/* 5. 我的竞拍页面 */}
          <Route path="/mall/checkout" element={<Checkout />} />             {/* 7. 商品下单页面 */}
          <Route path="/mall/payment" element={<Payment />} />               {/* 8. 商品支付页面 */}
          {/* 👤 2. 用户个人中心 & 设置 */}
          <Route path="/user/center" element={<UserCenter />} />             {/* 1. 个人中心页 */}
          <Route path="/user/profile" element={<UserProfile />} />           {/* 2. 个人信息修改页 */}
          <Route path="/user/favorites" element={<Favorites />} />           {/* 6. 收藏页面 */}
          <Route path="/user/address" element={<AddressManagement />} />     {/* 10. 地址管理页面 */}
          <Route path="/user/consign/records" element={<ConsignRecords />} /> {/* 14. 待收货 */}
          <Route path="/user/consign/apply" element={<ConsignApply />} />            {/* 15. 已完成 */}
          {/* 📦 3. 订单流转状态页面 */}
          <Route path="/user/orders/pending-pay" element={<OrderPendingPay />} />         {/* 12. 待支付 */}
          <Route path="/user/orders/pending-ship" element={<OrderPendingShip />} />       {/* 13. 待发货 */}
          <Route path="/user/orders/pending-receive" element={<OrderPendingReceive />} /> {/* 14. 待收货 */}
          <Route path="/user/orders/completed" element={<OrderCompleted />} />            {/* 15. 已完成 */}

          {/* 🔧 4. 售后相关页面 */}
          <Route path="/user/orders/after-sales-apply" element={<AfterSalesApply />} />   {/* 11. 售后申请页 */}
          <Route path="/user/orders/after-sales" element={<OrderAfterSales />} />         {/* 16. 售后中列表 */}
        </Route>
        {/* <Route element={<AuthGuard requireRole={2} />}>
          <Route path="user/center" element={<UserHome />} />
          <Route path="mall" element={<Mall />} />
          <Route path="user/orders" element={<Orders />} /> */}
        {/* 对应需求：购物车、收藏、地址管理等 */}
        {/* </Route> */}
        {/* </Route> */}

        {/* 404重定向 */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
