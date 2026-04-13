# 无艺商城 - 服务器部署指南

## 一、前置准备

### 1. 服务器要求
- 操作系统：Linux (推荐 Ubuntu 20.04+ 或 CentOS 7+)
- 内存：至少 4GB
- 磁盘：至少 20GB 可用空间
- 网络：能够访问外网（用于拉取 Docker 镜像）

### 2. 软件安装
在服务器上安装 Docker 和 Docker Compose：

#### Ubuntu/Debian:
```bash
# 更新软件包
sudo apt-get update

# 安装依赖
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# 添加 Docker 官方 GPG 密钥
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 设置 Docker 仓库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker

# 添加当前用户到 docker 组（可选，避免每次使用 sudo）
sudo usermod -aG docker $USER
# 重新登录后生效
```

#### CentOS/RHEL:
```bash
# 安装 Docker
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker
```

### 3. 验证安装
```bash
# 检查 Docker 版本
docker --version

# 检查 Docker Compose 版本
docker compose version
```

---

## 二、项目部署步骤

### 1. 上传项目到服务器
将整个项目文件夹上传到服务器，例如上传到 `/root/wuyiMart`

```bash
# 使用 scp 上传（本地执行）
scp -r wuyiMart root@your-server-ip:/root/

# 或者使用 git 克隆（推荐）
git clone -b release/v0 https://gitee.com/your-username/wuyiMart.git /root/wuyiMart
```

### 2. 配置环境变量
进入项目目录，复制环境变量模板：

```bash
cd /root/wuyiMart
cp .env.example .env

# 编辑 .env 文件，修改数据库密码（生产环境必须修改！）
vim .env
```

### 3. 启动服务
```bash
# 构建并启动所有服务
docker compose up -d --build

# 查看服务状态
docker compose ps

# 查看日志
docker compose logs -f
```

### 4. 等待服务启动
首次启动需要等待：
- SQL Server 启动（约 1-2 分钟）
- 数据库初始化（约 30 秒）
- 后端服务启动（约 30 秒）
- 前端服务启动（约 10 秒）

查看日志确认所有服务正常：
```bash
docker compose logs -f
```

---

## 三、访问应用

服务启动成功后，通过以下地址访问：

| 服务 | 地址 | 说明 |
|------|------|------|
| 前端 | http://your-server-ip | 无艺商城首页 |
| 后端 | http://your-server-ip:8080 | 后端 API 接口 |
| 数据库 | your-server-ip:1433 | SQL Server（需要开放端口） |

### 测试账号
所有账号密码都是：`123456`

| 角色 | 用户名 | 说明 |
|------|--------|------|
| 管理员 | admin | 系统管理员 |
| 商家 | merchant1 | 测试商家账号 |
| 商家 | merchant2 | 测试商家账号 |
| 用户 | user1 | 测试用户账号 |
| 用户 | user2 | 测试用户账号 |
| 用户 | user3 | 测试用户账号 |

---

## 四、常用管理命令

### 1. 查看服务状态
```bash
docker compose ps
```

### 2. 查看日志
```bash
# 查看所有服务日志
docker compose logs -f

# 查看特定服务日志
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f sqlserver
```

### 3. 停止服务
```bash
# 停止所有服务（保留数据）
docker compose down

# 停止并删除所有数据（谨慎使用！）
docker compose down -v
```

### 4. 重启服务
```bash
# 重启所有服务
docker compose restart

# 重启特定服务
docker compose restart backend
```

### 5. 更新服务
```bash
# 拉取最新代码
git pull origin release/v0

# 重新构建并启动
docker compose up -d --build
```

### 6. 数据库备份
```bash
# 进入 SQL Server 容器
docker exec -it wuyimart-sqlserver /bin/bash

# 备份数据库
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourPassword -Q "BACKUP DATABASE wuyi_mall TO DISK = '/var/opt/mssql/backup/wuyi_mall.bak'"

# 复制备份文件到宿主机
docker cp wuyimart-sqlserver:/var/opt/mssql/backup/wuyi_mall.bak ./backup/
```

---

## 五、本地开发

### 1. 前端开发
```bash
cd frontend/my-shop

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端会运行在 http://localhost:5173，API 请求会自动代理到 http://localhost:8080

### 2. 后端开发
```bash
cd backend

# 使用 Maven 运行
mvn spring-boot:run

# 或者先打包再运行
mvn clean package -DskipTests
java -jar target/wuyi-mall-backend-1.0.0.jar
```

后端会运行在 http://localhost:8080

### 3. 数据库
本地需要安装 SQL Server 或使用 Docker 运行：
```bash
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Password123!' -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2019-latest
```

---

## 六、常见问题

### 1. 端口被占用
如果 80 端口被占用，可以修改 docker-compose.yml 中的端口映射：
```yaml
frontend:
  ports:
    - "8081:80"  # 将宿主机端口改为 8081
```

### 2. 内存不足
SQL Server 需要至少 2GB 内存，如果服务器内存不足，可以：
- 增加服务器内存
- 或者修改 SQL Server 配置限制内存使用

### 3. 构建失败
如果镜像构建失败，可以：
```bash
# 清理 Docker 缓存
docker system prune -a

# 重新构建
docker compose build --no-cache
```

### 4. 数据库连接失败
查看后端日志确认数据库连接：
```bash
docker compose logs backend
```

确认：
- SQL Server 容器已启动
- 数据库密码配置正确
- 数据库 wuyi_mall 已创建

---

## 七、安全建议

### 1. 修改默认密码
生产环境必须修改以下密码：
- 数据库 SA 密码（在 .env 文件中）
- 测试账号密码（登录后修改）

### 2. 配置防火墙
只开放必要的端口：
```bash
# Ubuntu
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# CentOS
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

### 3. 配置 HTTPS
建议使用 Nginx 或 Traefik 配置 HTTPS：
- 使用 Let's Encrypt 免费证书
- 强制 HTTPS 访问

### 4. 定期备份
设置定时任务定期备份数据库：
```bash
# 编辑 crontab
crontab -e

# 每天凌晨 2 点备份数据库
0 2 * * * /root/wuyiMart/backup-db.sh
```

---

## 八、技术支持

如有问题，请查看：
- Docker 日志：`docker compose logs`
- 项目文档：README.md
- 代码仓库：https://gitee.com/your-username/wuyiMart
