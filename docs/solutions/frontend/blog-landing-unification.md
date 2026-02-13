# 博客系统统一到 Landing 设计

## 问题/需求

博客页面（列表页、文章详情页、分类、标签、归档）仍使用 Chirpy 原始的 `default.html` 布局，与新的 Landing 设计系统割裂。需要统一设计语言。

## 解决方案

### 架构设计

采用继承式布局结构：

```
landing.html (基础布局)
├── blog-post.html      (文章详情)
├── blog-list.html      (文章列表)
└── blog-taxonomy.html  (分类/标签/归档)
```

### 多宽度容器系统

| 容器类 | 宽度 | 使用场景 |
|--------|------|----------|
| `.container-article` | 680px | 文章正文、About 页面 |
| `.container-medium` | 900px | 项目详情、设计详情 |
| `.container-wide` | 1100px | 首页、博客列表、项目列表 |
| `.container-full` | 1400px | 全宽图片突破 |

### 实现细节

#### 1. 创建博客专用样式 (`_sass/landing/_blog.scss`)

```scss
// 容器
.container-article {
  max-width: $width-article;  // 680px
  margin: 0 auto;
}

.container-wide {
  max-width: $width-wide;  // 1100px
  margin: 0 auto;
}

// 文章头部
.post-header { ... }
.post-title { font-family: $font-family-serif; }

// 正文
.post-content {
  font-size: 1.125rem;  // 18px
  line-height: 1.75;
}
```

#### 2. 文章详情布局 (`_layouts/blog-post.html`)

基于 `landing.html`，结构：
- 头部：窄容器 (680px)，衬线体标题
- 封面图：宽容器 (1100px)
- 正文：窄容器
- 标签、分享、上下篇导航、评论

#### 3. 文章列表布局 (`_layouts/blog-list.html`)

- 页面标题
- 文章卡片列表（图片 + 标题 + 摘要）
- 分页导航

#### 4. 分类/标签/归档布局 (`_layouts/blog-taxonomy.html`)

通用布局，内容区使用 `.container-wide`

#### 5. 更新配置 (`_config.yml`)

```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      layout: blog-post  # 从 post 改为 blog-post
      comments: true
```

### 样式特点

**排版**
- 标题：Playfair Display 衬线体
- 正文：Inter / 系统无衬线字体
- 基准字号：18px
- 正文行高：1.75

**配色**
- 背景：#FFFFFF（纯白）
- 文字：#1A1A1A（近黑）
- 强调：#1A1A1A（黑色）
- 边框：#E5E5E5（浅灰）

**交互**
- 链接悬停：下划线动画
- 列表项悬停：图片放大 1.03 倍
- 标签/分类悬停：背景反色

### 兼容处理

**保留功能**
- Giscus 评论系统（`{% include comment.html %}`）
- 文章结构化数据（SEO）
- 深色模式（CSS 变量）
- 分页（paginator）

**移除依赖**
- Chirpy 原侧边栏
- Bootstrap 卡片组件
- 复杂的折叠展开交互

---

## 文件变更

| 文件 | 变更 |
|------|------|
| `_sass/landing/_blog.scss` | 创建 - 博客专用样式 |
| `_sass/landing/index.scss` | 修改 - 引入 blog 样式 |
| `_layouts/blog-post.html` | 创建 - 文章详情布局 |
| `_layouts/blog-list.html` | 创建 - 博客列表布局 |
| `_layouts/blog-taxonomy.html` | 创建 - 分类标签通用布局 |
| `_config.yml` | 修改 - posts 使用 blog-post |
| `_layouts/archives.html` | 修改 - 改用 blog-taxonomy |
| `_layouts/categories.html` | 修改 - 改用 blog-taxonomy |
| `_layouts/category.html` | 修改 - 改用 blog-taxonomy |
| `_layouts/tags.html` | 修改 - 改用 blog-taxonomy |
| `_layouts/tag.html` | 修改 - 改用 blog-taxonomy |

---

## 使用方式

### 文章 Front Matter
```yaml
---
title: "文章标题"
description: "文章描述"
image: /assets/img/cover.jpg
categories: [技术]
tags: [jekyll, css]
comments: true
toc: true
---
```

### 样式类参考
```scss
// 容器
.container-article   // 680px
.container-medium    // 900px
.container-wide      // 1100px
.container-full      // 1400px

// 标题
.page-title          // 页面大标题
.post-title          // 文章标题

// 内容
.post-content        // 正文内容区
.blog-list-item      // 列表项
```

---

## 注意事项

1. **评论功能**：需要确保 Giscus 配置正确（repo, category_id 等）
2. **图片**：建议使用 16:10 或 21:9 比例的封面图
3. **分页**：需要安装 jekyll-paginate 插件
4. **字体**：确保 Google Fonts 正确加载

---

**创建时间**: 2026-02-14
**标签**: #jekyll #css #blog #layout #design-system
