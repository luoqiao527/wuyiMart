#!/bin/bash

# 数据库密码
DB_PASSWORD=${DB_PASSWORD:-Password123!}

# 等待SQL Server完全启动
echo "等待 SQL Server 启动..."
until /opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P "$DB_PASSWORD" -Q "SELECT 1" &> /dev/null
do
    echo "SQL Server 尚未就绪，等待 5 秒..."
    sleep 5
done

echo "SQL Server 已就绪！"

# 创建数据库
echo "创建数据库 wuyi_mall..."
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P "$DB_PASSWORD" -Q "IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'wuyi_mall') CREATE DATABASE wuyi_mall;"

# 等待数据库创建完成
sleep 2

# 执行测试数据脚本
echo "导入测试数据..."
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P "$DB_PASSWORD" -d wuyi_mall -i /test-data.sql

echo "数据库初始化完成！"
