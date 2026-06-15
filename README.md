# 古着衣橱 - 搭配租赁与归还系统

一个复古风格的古着店搭配租赁与归还管理页面，提供顾客端浏览收藏和店员端归还检查双角色体验。

## 原始需求

> 请制作古着店搭配租赁与归还页面，React 页面呈现单品照片、年代标签、尺码、磨损等级、押金、租期、搭配组合和归还日历。顾客在手机上浏览穿搭、收藏套装、选择租赁日期并查看押金规则；店员在平板上检查污渍、缺扣、拉链、内衬和续租请求。这个页面要像一个可租赁的复古衣橱，图片瀑布流有氛围，但尺码、租期、押金、损耗责任和归还提醒必须比装饰更清楚。

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 3
- **路由**: React Router DOM 7
- **状态管理**: Zustand 5
- **图标**: Lucide React
- **字体**: Playfair Display (标题) + Noto Sans SC (正文)

## 功能特性

### 顾客端
- 🧥 古着单品瀑布流浏览，支持按年代、品类、磨损等级筛选
- 👗 搭配套装展示，一键收藏喜欢的套装
- 📅 租赁日期选择日历，可视化租期范围
- 💰 押金与费用明细，清晰的押金退还规则说明
- ⏰ 归还提醒倒计时

### 店员端
- 📋 租赁订单管理，区分进行中、已逾期、续租待审、已归还状态
- 🔍 归还物品逐项检查（污渍、缺扣、拉链、内衬）
- ✏️ 检查结果备注记录
- 🔄 续租请求审批（批准/拒绝）
- 📊 押金扣减依据记录

## 启动方式

### 前置要求

- Node.js >= 18
- npm >= 9 或 pnpm >= 8

### 启动步骤

#### 1. 安装依赖

```bash
npm install
```

#### 2. 启动开发服务

```bash
npm run dev
```

访问地址：http://localhost:5173

#### 3. 生产构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

#### 4. 预览生产构建

```bash
npm run preview
```

### 其他命令

- `npm run lint` - 运行 ESLint 代码检查
- `npm run check` - 运行 TypeScript 类型检查

## Docker 一键启动

### 前置要求

- Docker >= 20.10
- Docker Compose >= 2.0

### 启动步骤

#### 1. 构建并启动服务

```bash
docker compose up --build
```

后台运行：

```bash
docker compose up --build -d
```

访问地址：http://localhost:5173

#### 2. 查看日志

```bash
docker compose logs -f
```

#### 3. 停止并清理服务

```bash
docker compose down
```

## 目录结构

```
wl-329/
├── src/
│   ├── components/       # 可复用组件
│   │   ├── CheckForm.tsx      # 归还检查表单
│   │   ├── DatePicker.tsx     # 日期选择器
│   │   ├── DepositPanel.tsx   # 押金规则面板
│   │   ├── DepositTag.tsx     # 押金标签
│   │   ├── EraTag.tsx         # 年代标签
│   │   ├── FilterBar.tsx      # 筛选栏
│   │   ├── Header.tsx         # 顶部导航
│   │   ├── ItemCard.tsx       # 单品卡片
│   │   └── WearBadge.tsx      # 磨损等级徽章
│   ├── pages/            # 页面组件
│   │   ├── BrowsePage.tsx      # 顾客浏览页
│   │   ├── OutfitDetailPage.tsx # 套装详情页
│   │   └── ReturnsPage.tsx     # 店员归还检查页
│   ├── data/             # Mock 数据
│   ├── store/            # Zustand 状态管理
│   ├── types/            # TypeScript 类型定义
│   ├── hooks/            # 自定义 Hooks
│   └── lib/              # 工具函数
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 角色切换

页面顶部右侧的角色切换按钮可在「顾客」和「店员」角色间切换：
- **顾客模式**: 浏览单品和套装、收藏、选择租赁日期
- **店员模式**: 查看订单列表、执行归还检查、审批续租请求

## 主题配色

采用复古暖色调配色方案：
- 米白底色 `#F5E6CC`
- 深棕主色 `#3E2723`
- 金色强调 `#C5A55A`
- 酒红警示 `#8B2252`
