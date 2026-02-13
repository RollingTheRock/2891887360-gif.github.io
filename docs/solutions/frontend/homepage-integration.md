# 首页内容整合方案

## 问题/需求

首页内容过于简单，需要整合最新博客文章和精选项目，提升首页吸引力和实用性。

## 解决方案

### 首页新结构

```
首页 (/)
├── Hero 区域 (保留)
├── 特色文章区 (大图展示)
├── 最新博客 (3篇卡片)
├── 精选项目 (3个项目)
└── 页脚
```

### 实现细节

#### 1. 特色文章区 (`_includes/home/featured-post.html`)

**逻辑**：
- 优先显示 `pin: true` 的文章
- 如无置顶文章，显示最新文章
- 大图展示 (21:9 比例)
- 显示分类、标题、摘要、日期

**使用方式**：
在文章 front matter 中添加 `pin: true` 置顶：
```yaml
---
title: "重要文章"
pin: true
---
```

#### 2. 最新博客 (`_includes/home/recent-posts.html`)

**逻辑**：
- 排除已置顶的文章
- 显示最近 3 篇
- 卡片网格布局 (3列/2列/1列响应式)
- "查看全部"链接到 /blog/

#### 3. 精选项目 (`_includes/home/featured-projects.html`)

**逻辑**：
- 显示 `featured: true` 的项目
- 最多 3 个
- 显示技术标签
- "查看全部"链接到 /projects/

**使用方式**：
在项目 front matter 中添加 `featured: true`：
```yaml
---
title: "项目名"
featured: true
tech: [React, Node.js]
---
```

### 样式特点

| 元素 | 样式 |
|------|------|
| 特色文章图 | 21:9 比例，hover 放大 1.02 倍 |
| 卡片 | 圆角 8px，边框 1px，hover 阴影 |
| 标题 | Playfair Display 衬线体 |
| 网格 | 3列 → 2列 → 1列 响应式 |

### 响应式断点

- **Desktop**: 3 列网格
- **Tablet (≤1024px)**: 2 列网格
- **Mobile (≤640px)**: 1 列网格

## 文件变更

| 文件 | 操作 | 说明 |
|------|------|------|
| `_includes/home/featured-post.html` | 创建 | 特色文章组件 |
| `_includes/home/recent-posts.html` | 创建 | 最新博客组件 |
| `_includes/home/featured-projects.html` | 创建 | 精选项目组件 |
| `_sass/landing/_home.scss` | 创建 | 首页样式 |
| `_sass/landing/index.scss` | 修改 | 引入 home 样式 |
| `index.html` | 修改 | 更新首页结构 |

## 使用指南

### 置顶文章
在文章 front matter 中添加：
```yaml
pin: true
```

### 精选项目
在项目 front matter 中添加：
```yaml
featured: true
tech:
  - Python
  - Blockchain
```

## 后续优化建议

1. **空状态处理**：当没有文章或项目时的占位显示
2. **加载动画**：图片懒加载时的占位
3. **更多区块**：如 newsletter 订阅、社交媒体链接等

## 相关提交

- `b86fbb4` feat: 首页内容整合
