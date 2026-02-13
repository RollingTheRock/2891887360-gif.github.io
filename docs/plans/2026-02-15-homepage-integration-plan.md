# 首页内容整合计划

## 概览

| 项目 | 内容 |
|------|------|
| **任务类型** | feature |
| **目标** | 优化首页内容展示，整合最新博客和精选项目 |
| **影响范围** | `_includes/home/`, `_sass/landing/`, `index.html` |
| **预计工作量** | 5 个文件 |

---

## 当前首页结构

```
index.html
├── landing/hero.html
├── landing/nav-cards.html
├── landing/featured.html
```

## 目标首页结构

```
index.html
├── landing/hero.html (保留，可简化)
├── home/featured-post.html (特色文章 - 大图)
├── home/recent-posts.html (最新 3 篇博客)
└── home/featured-projects.html (精选项目)
```

---

## 实施方案

### 任务 1: 创建 `_includes/home/featured-post.html`

展示置顶或最新文章（大图展示）

### 任务 2: 创建 `_includes/home/recent-posts.html`

展示最近 3 篇博客（卡片网格）

### 任务 3: 创建 `_includes/home/featured-projects.html`

展示 featured: true 的项目

### 任务 4: 创建 `_sass/landing/_home.scss`

首页专用样式

### 任务 5: 更新 `index.html`

引入新组件

---

## 文件清单

| 文件 | 操作 |
|------|------|
| `_includes/home/featured-post.html` | 创建 |
| `_includes/home/recent-posts.html` | 创建 |
| `_includes/home/featured-projects.html` | 创建 |
| `_sass/landing/_home.scss` | 创建 |
| `_sass/landing/index.scss` | 修改（引入 home）|
| `index.html` | 修改 |

---

## 验收标准

- [ ] 首页显示特色文章（大图）
- [ ] 首页显示最新 3 篇博客
- [ ] 首页显示精选项目
- [ ] "查看全部"链接正常
- [ ] 响应式布局正常
- [ ] hover 效果正常

---

## Commit Message

```
feat: 首页内容整合

- 添加特色文章展示区
- 添加最新博客列表
- 添加精选项目展示
- 优化首页布局结构
```
