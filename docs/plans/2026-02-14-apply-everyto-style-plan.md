# 计划文档：将 Every.to 风格应用到 Jekyll 网站

## 任务概述

将测试文件 `test-blog-system.html` 的设计风格（Every.to 风格）应用到实际 Jekyll 网站，替换现有的 landing 系统样式。

## 问题分析

- **现状**: 实际网站仍使用旧的 `landing` 系统样式（紫色、大卡片、科技感）
- **目标**: 应用测试文件中的 Every.to 风格（黑白系、衬线标题、优雅排版）

## 实现步骤

### Part 1: 创建新的样式文件

**文件**: `assets/css/main.scss`

内容：
- CSS Custom Properties（颜色、字体、尺寸）
- 容器系统（680px/900px/1100px/1400px）
- 导航栏样式
- 页面/文章头部样式
- 文章正文排版
- 文章列表样式
- 标签/分类样式
- 归档样式
- 深色模式支持
- 响应式布局

### Part 2: 创建新的基础布局

**文件**: `_layouts/base.html`

内容：
- HTML 骨架
- 字体加载（Google Fonts）
- 头部导航（Logo + 导航链接 + 主题切换）
- 页脚
- 主题切换 JavaScript

### Part 3: 创建页面布局

**文件**: `_layouts/post.html`
- 文章详情页布局
- 文章头部（分类、标题、副标题、作者信息）
- 封面图
- 正文内容
- 标签
- 上一篇/下一篇导航
- 评论区

**文件**: `_layouts/home.html`
- 首页布局
- 特色文章展示
- 最新文章列表

### Part 4: 更新入口文件

**文件**: `index.html`
- 改为使用 `home` 布局

**文件**: `blog/index.html`
- 改为使用 `base` 布局
- 显示文章列表

### Part 5: 更新 _config.yml

- 设置文章默认布局为 `post`

## 设计规范

### 颜色系统
| Token | Light | Dark |
|-------|-------|------|
| bg-primary | #FFFFFF | #0A0A0A |
| text-primary | #1A1A1A | #EEEEEE |
| text-secondary | #666666 | #A3A3A3 |
| border | #E5E5E5 | #292929 |

### 字体系统
- **标题**: Playfair Display, Noto Serif SC
- **正文**: Inter, 系统字体回退
- **代码**: JetBrains Mono, Fira Code

### 容器宽度
- `.container-article`: 680px（文章正文）
- `.container-medium`: 900px
- `.container-wide`: 1100px（列表页面）
- `.container-full`: 1400px（全宽）

### 字号系统
- Base: 18px (1.125rem)
- Line Height: 1.7
- H1: 56px, H2: 32px, H3: 24px

## 验收标准

- [ ] 首页显示特色文章 + 文章列表
- [ ] 文章页使用测试文件中的样式
- [ ] 标题使用衬线体（Playfair Display）
- [ ] 配色为黑白系
- [ ] 正文 18px，行高 1.7
- [ ] 深色模式正常切换
- [ ] 移动端响应式正常
- [ ] 导航栏固定在顶部

## 执行顺序

1. 创建 `assets/css/main.scss`
2. 创建 `_layouts/base.html`
3. 创建 `_layouts/post.html`
4. 创建 `_layouts/home.html`
5. 更新 `index.html`
6. 更新 `blog/index.html`
7. 更新 `_config.yml`
8. 测试验证

## Commit Message

```
feat: 应用 Every.to 风格设计

- 基于 test-blog-system.html 创建新样式系统
- 创建 base/post/home 布局
- 统一使用新的容器宽度系统
- 移除旧 landing 系统依赖
```

## 风险评估

| 风险 | 缓解措施 |
|------|----------|
| 样式冲突 | 新样式使用独立命名空间 |
| 布局损坏 | 保留备份，分步骤验证 |
| Jekyll 构建失败 | 检查 YAML front matter 格式 |
