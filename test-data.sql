-- ==========================================
-- 无艺商城 - 测试数据脚本 (SQL Server 版)
-- 包含不同身份的账号，密码都是123456
-- ==========================================

USE wuyi_mall;
GO

-- 插入测试用户数据
-- 密码使用MD5加密: 123456 -> e10adc3949ba59abbe56e057f20f883e
MERGE INTO users AS target
USING (VALUES
-- 管理员账号
('admin', 'e10adc3949ba59abbe56e057f20f883e', 0, 'https://example.com/avatar/admin.jpg', '13800138000', 'admin@wuyimall.com', '管理员', '110101199001010001', 1),
-- 商家账号
('merchant1', 'e10adc3949ba59abbe56e057f20f883e', 1, 'https://example.com/avatar/merchant1.jpg', '13800138001', 'merchant1@wuyimall.com', '商家1', '110101199001010002', 1),
('merchant2', 'e10adc3949ba59abbe56e057f20f883e', 1, 'https://example.com/avatar/merchant2.jpg', '13800138002', 'merchant2@wuyimall.com', '商家2', '110101199001010003', 1),
-- 普通用户账号
('user1', 'e10adc3949ba59abbe56e057f20f883e', 2, 'https://example.com/avatar/user1.jpg', '13800138003', 'user1@wuyimall.com', '用户1', '110101199001010004', 1),
('user2', 'e10adc3949ba59abbe56e057f20f883e', 2, 'https://example.com/avatar/user2.jpg', '13800138004', 'user2@wuyimall.com', '用户2', '110101199001010005', 1),
('user3', 'e10adc3949ba59abbe56e057f20f883e', 2, 'https://example.com/avatar/user3.jpg', '13800138005', 'user3@wuyimall.com', '用户3', '110101199001010006', 1)
) AS source (username, password, role, avatar, phone, email, real_name, id_card, status)
ON target.username = source.username
WHEN NOT MATCHED BY TARGET THEN
    INSERT (username, password, role, avatar, phone, email, real_name, id_card, status)
    VALUES (source.username, source.password, source.role, source.avatar, source.phone, source.email, source.real_name, source.id_card, source.status);
GO

-- 插入商家扩展信息
MERGE INTO merchant_profiles AS target
USING (VALUES
-- 关联商家账号
((SELECT id FROM users WHERE username = 'merchant1'), '精品服饰店', '经营各类精品服饰，质量保证', 1, 10000.00),
((SELECT id FROM users WHERE username = 'merchant2'), '数码电子产品店', '销售各类数码电子产品', 1, 15000.00)
) AS source (user_id, shop_name, shop_desc, audit_status, balance)
ON target.user_id = source.user_id
WHEN NOT MATCHED BY TARGET THEN
    INSERT (user_id, shop_name, shop_desc, audit_status, balance)
    VALUES (source.user_id, source.shop_name, source.shop_desc, source.audit_status, source.balance);
GO

-- 插入分类数据
MERGE INTO categories AS target
USING (VALUES
('服饰', 0, 1),
('数码', 0, 1),
('家居', 0, 1),
('食品', 0, 1),
('运动', 0, 1)
) AS source (name, creator_id, audit_status)
ON target.name = source.name
WHEN NOT MATCHED BY TARGET THEN
    INSERT (name, creator_id, audit_status)
    VALUES (source.name, source.creator_id, source.audit_status);
GO

-- 插入商品数据
MERGE INTO products AS target
USING (VALUES
-- 商家1的商品
((SELECT id FROM users WHERE username = 'merchant1'), (SELECT id FROM categories WHERE name = '服饰'), '时尚牛仔裤', '高品质牛仔裤，舒适耐穿', '["https://example.com/images/jeans1.jpg", "https://example.com/images/jeans2.jpg"]', 199.00, 50.00, 199.00, 10.00, GETDATE(), DATEADD(DAY, 7, GETDATE()), 1, 1),
((SELECT id FROM users WHERE username = 'merchant1'), (SELECT id FROM categories WHERE name = '服饰'), '休闲T恤', '纯棉休闲T恤，透气舒适', '["https://example.com/images/tshirt1.jpg", "https://example.com/images/tshirt2.jpg"]', 99.00, 20.00, 99.00, 5.00, GETDATE(), DATEADD(DAY, 5, GETDATE()), 1, 1),
-- 商家2的商品
((SELECT id FROM users WHERE username = 'merchant2'), (SELECT id FROM categories WHERE name = '数码'), '智能手机', '最新款智能手机，功能强大', '["https://example.com/images/phone1.jpg", "https://example.com/images/phone2.jpg"]', 2999.00, 500.00, 2999.00, 100.00, GETDATE(), DATEADD(DAY, 10, GETDATE()), 1, 1),
((SELECT id FROM users WHERE username = 'merchant2'), (SELECT id FROM categories WHERE name = '数码'), '无线耳机', '高品质无线耳机，音质出色', '["https://example.com/images/headphones1.jpg", "https://example.com/images/headphones2.jpg"]', 499.00, 100.00, 499.00, 20.00, GETDATE(), DATEADD(DAY, 6, GETDATE()), 1, 1)
) AS source (merchant_id, category_id, title, description, images, start_price, deposit, current_price, increment, start_time, end_time, audit_status, sale_status)
ON target.title = source.title
WHEN NOT MATCHED BY TARGET THEN
    INSERT (merchant_id, category_id, title, description, images, start_price, deposit, current_price, increment, start_time, end_time, audit_status, sale_status)
    VALUES (source.merchant_id, source.category_id, source.title, source.description, source.images, source.start_price, source.deposit, source.current_price, source.increment, source.start_time, source.end_time, source.audit_status, source.sale_status);
GO

-- 插入收货地址数据
INSERT INTO addresses (user_id, name, phone, province, city, detail, is_default)
VALUES
-- 用户1的地址
((SELECT id FROM users WHERE username = 'user1'), '张三', '13800138003', '北京市', '北京市', '朝阳区建国路88号', 1),
((SELECT id FROM users WHERE username = 'user1'), '张三', '13800138003', '上海市', '上海市', '浦东新区陆家嘴环路1000号', 0),
-- 用户2的地址
((SELECT id FROM users WHERE username = 'user2'), '李四', '13800138004', '广东省', '广州市', '天河区天河路385号', 1);
GO

-- 插入收藏数据
INSERT INTO favorites (user_id, product_id)
VALUES
-- 用户1收藏的商品
((SELECT id FROM users WHERE username = 'user1'), (SELECT id FROM products WHERE title = '时尚牛仔裤')),
((SELECT id FROM users WHERE username = 'user1'), (SELECT id FROM products WHERE title = '智能手机')),
-- 用户2收藏的商品
((SELECT id FROM users WHERE username = 'user2'), (SELECT id FROM products WHERE title = '休闲T恤')),
((SELECT id FROM users WHERE username = 'user2'), (SELECT id FROM products WHERE title = '无线耳机'));
GO

-- 插入出价记录
INSERT INTO bids (product_id, user_id, bid_price)
VALUES
-- 智能手机的出价记录
((SELECT id FROM products WHERE title = '智能手机'), (SELECT id FROM users WHERE username = 'user1'), 3099.00),
((SELECT id FROM products WHERE title = '智能手机'), (SELECT id FROM users WHERE username = 'user2'), 3199.00),
-- 时尚牛仔裤的出价记录
((SELECT id FROM products WHERE title = '时尚牛仔裤'), (SELECT id FROM users WHERE username = 'user3'), 209.00);
GO

-- 更新商品当前价格
UPDATE products SET current_price = 3199.00 WHERE title = '智能手机';
UPDATE products SET current_price = 209.00 WHERE title = '时尚牛仔裤';
GO

-- 插入订单数据
INSERT INTO orders (order_no, user_id, merchant_id, product_id, status, deposit_amount, final_amount, deposit_deadline, final_pay_deadline)
VALUES
-- 智能手机订单
('ORDER' + CAST(DATEPART(YEAR, GETDATE()) AS VARCHAR) + CAST(DATEPART(MONTH, GETDATE()) AS VARCHAR) + CAST(DATEPART(DAY, GETDATE()) AS VARCHAR) + '001',
 (SELECT id FROM users WHERE username = 'user2'),
 (SELECT id FROM users WHERE username = 'merchant2'),
 (SELECT id FROM products WHERE title = '智能手机'),
 2, -- 待付尾款
 500.00,
 2699.00,
 DATEADD(MINUTE, 15, GETDATE()),
 DATEADD(DAY, 2, GETDATE())),
-- 时尚牛仔裤订单
('ORDER' + CAST(DATEPART(YEAR, GETDATE()) AS VARCHAR) + CAST(DATEPART(MONTH, GETDATE()) AS VARCHAR) + CAST(DATEPART(DAY, GETDATE()) AS VARCHAR) + '002',
 (SELECT id FROM users WHERE username = 'user3'),
 (SELECT id FROM users WHERE username = 'merchant1'),
 (SELECT id FROM products WHERE title = '时尚牛仔裤'),
 1, -- 竞拍中
 50.00,
 159.00,
 DATEADD(MINUTE, 15, GETDATE()),
 NULL);
GO

-- 插入委托售卖数据
INSERT INTO entrustments (user_id, merchant_id, item_name, item_desc, images, expected_price, status)
VALUES
-- 用户1的委托
((SELECT id FROM users WHERE username = 'user1'),
 (SELECT id FROM users WHERE username = 'merchant1'),
 '二手笔记本电脑',
 '使用一年的笔记本电脑，性能良好',
 '["https://example.com/images/laptop1.jpg", "https://example.com/images/laptop2.jpg"]',
 2000.00,
 0),
-- 用户2的委托
((SELECT id FROM users WHERE username = 'user2'),
 NULL, -- 不指定商家
 '二手相机',
 '使用半年的相机，无损坏',
 '["https://example.com/images/camera1.jpg", "https://example.com/images/camera2.jpg"]',
 1500.00,
 0);
GO

-- 插入售后数据
INSERT INTO after_sales (order_id, user_id, merchant_id, type, reason, images, status)
VALUES
-- 假设有一个订单的售后
((SELECT TOP 1 id FROM orders),
 (SELECT id FROM users WHERE username = 'user2'),
 (SELECT id FROM users WHERE username = 'merchant2'),
 2, -- 退货退款
 '商品与描述不符',
 '["https://example.com/images/aftersales1.jpg"]',
 0);
GO

-- 插入AI生成的商品英文详情和简介
UPDATE products 
SET 
    description_en = CASE 
        WHEN title = '时尚牛仔裤' THEN 'High quality jeans, comfortable and durable' 
        WHEN title = '休闲T恤' THEN 'Cotton casual T-shirt, breathable and comfortable' 
        WHEN title = '智能手机' THEN 'Latest smartphone with powerful features' 
        WHEN title = '无线耳机' THEN 'High quality wireless headphones with excellent sound quality' 
        ELSE description_en 
    END,
    summary = CASE 
        WHEN title = '时尚牛仔裤' THEN '高品质牛仔裤，舒适耐穿' 
        WHEN title = '休闲T恤' THEN '纯棉休闲T恤，透气舒适' 
        WHEN title = '智能手机' THEN '最新款智能手机，功能强大' 
        WHEN title = '无线耳机' THEN '高品质无线耳机，音质出色' 
        ELSE summary 
    END;
GO

-- 插入财务流水数据
INSERT INTO finance_flow (user_id, amount, type, status, create_time)
VALUES
-- 商家1的财务流水
((SELECT id FROM users WHERE username = 'merchant1'), 1000.00, 1, 1, GETDATE()),
((SELECT id FROM users WHERE username = 'merchant1'), 500.00, 2, 1, GETDATE()),
-- 商家2的财务流水
((SELECT id FROM users WHERE username = 'merchant2'), 1500.00, 1, 1, GETDATE()),
((SELECT id FROM users WHERE username = 'merchant2'), 300.00, 2, 1, GETDATE());
GO

-- 插入提现记录
INSERT INTO withdrawal (user_id, amount, status, create_time)
VALUES
-- 商家1的提现
((SELECT id FROM users WHERE username = 'merchant1'), 800.00, 1, GETDATE()),
-- 商家2的提现
((SELECT id FROM users WHERE username = 'merchant2'), 1000.00, 0, GETDATE());
GO

-- 插入管理员操作日志
INSERT INTO admin_logs (admin_id, action, target_id, target_type, create_time)
VALUES
((SELECT id FROM users WHERE username = 'admin'), '审核商家', (SELECT id FROM users WHERE username = 'merchant1'), 1, GETDATE()),
((SELECT id FROM users WHERE username = 'admin'), '审核商品', (SELECT id FROM products WHERE title = '智能手机'), 2, GETDATE());
GO

-- 插入系统配置
MERGE INTO system_config AS target
USING (VALUES
('site_name', '无艺商城', '网站名称'),
('site_description', '专业的拍卖购物平台', '网站描述'),
('max_bid_count', '100', '最大出价次数'),
('deposit_rate', '0.2', '保证金比例'),
('final_pay_days', '2', '尾款支付天数')
) AS source (config_key, config_value, description)
ON target.config_key = source.config_key
WHEN NOT MATCHED BY TARGET THEN
    INSERT (config_key, config_value, description)
    VALUES (source.config_key, source.config_value, source.description);
GO

-- 插入轮播图
INSERT INTO banners (image_url, link_url, sort, status)
VALUES
('https://example.com/banners/banner1.jpg', '/products', 1, 1),
('https://example.com/banners/banner2.jpg', '/promotions', 2, 1),
('https://example.com/banners/banner3.jpg', '/merchants', 3, 1);
GO

-- 插入公告
INSERT INTO notices (title, content, status, create_time)
VALUES
('网站上线公告', '无艺商城正式上线，欢迎大家使用！', 1, GETDATE()),
('系统更新公告', '系统已更新至最新版本，新增多项功能', 1, GETDATE());
GO

-- 插入评价数据
INSERT INTO product_reviews (product_id, user_id, rating, content, images, create_time)
VALUES
((SELECT id FROM products WHERE title = '时尚牛仔裤'), (SELECT id FROM users WHERE username = 'user1'), 5, '质量很好，穿着舒适', '["https://example.com/reviews/review1.jpg"]', GETDATE()),
((SELECT id FROM products WHERE title = '休闲T恤'), (SELECT id FROM users WHERE username = 'user2'), 4, '面料不错，款式好看', NULL, GETDATE());
GO

-- 插入客服消息
INSERT INTO customer_service_messages (user_id, content, status, create_time, reply_content, reply_time)
VALUES
((SELECT id FROM users WHERE username = 'user1'), '请问如何修改密码？', 1, GETDATE(), '在个人中心-账号设置中修改', GETDATE()),
((SELECT id FROM users WHERE username = 'user2'), '商品什么时候发货？', 0, GETDATE(), NULL, NULL);
GO

-- 插入用户浏览历史
INSERT INTO user_browse_history (user_id, product_id, browse_time)
VALUES
((SELECT id FROM users WHERE username = 'user1'), (SELECT id FROM products WHERE title = '智能手机'), GETDATE()),
((SELECT id FROM users WHERE username = 'user1'), (SELECT id FROM products WHERE title = '无线耳机'), DATEADD(HOUR, -1, GETDATE())),
((SELECT id FROM users WHERE username = 'user2'), (SELECT id FROM products WHERE title = '时尚牛仔裤'), DATEADD(HOUR, -2, GETDATE())),
((SELECT id FROM users WHERE username = 'user2'), (SELECT id FROM products WHERE title = '休闲T恤'), DATEADD(HOUR, -3, GETDATE()));
GO

-- 插入用户收藏店铺
INSERT INTO user_favorite_shops (user_id, merchant_id, create_time)
VALUES
((SELECT id FROM users WHERE username = 'user1'), (SELECT id FROM users WHERE username = 'merchant1'), GETDATE()),
((SELECT id FROM users WHERE username = 'user2'), (SELECT id FROM users WHERE username = 'merchant2'), GETDATE());
GO

-- 插入商家运营数据
INSERT INTO merchant_operation_data (merchant_id, date, order_count, sales_amount, visitor_count, create_time)
VALUES
((SELECT id FROM users WHERE username = 'merchant1'), CAST(GETDATE() AS DATE), 10, 5000.00, 100, GETDATE()),
((SELECT id FROM users WHERE username = 'merchant2'), CAST(GETDATE() AS DATE), 15, 8000.00, 150, GETDATE()),
((SELECT id FROM users WHERE username = 'merchant1'), DATEADD(DAY, -1, CAST(GETDATE() AS DATE)), 8, 4000.00, 80, GETDATE()),
((SELECT id FROM users WHERE username = 'merchant2'), DATEADD(DAY, -1, CAST(GETDATE() AS DATE)), 12, 6000.00, 120, GETDATE());
GO

-- 插入系统日志
INSERT INTO system_logs (level, message, create_time)
VALUES
('INFO', '系统启动', GETDATE()),
('INFO', '数据库初始化完成', GETDATE()),
('INFO', '测试数据导入完成', GETDATE());
GO
