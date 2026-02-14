# Every.to 风格迁移到 Jekyll

## 问题背景

项目中的测试文件 `test-blog-system.html` 包含了一套优雅的 Every.to 风格设计（纯黑白配色、衬线标题、18px 正文），但实际网站仍在使用旧的 landing 系统样式（紫色、大卡片、科技感）。

## 解决方案

将测试文件的 CSS 转换为 SCSS，并创建一套完整的 Jekyll 布局系统。

## 实现步骤

### 1. 创建主样式文件

**文件**: `assets/css/main.scss`

将测试文件的 CSS 转换为 Jekyll SCSS，添加 Jekyll front matter:

```scss
---
---

// CSS 变量定义
:root {
  --bg-primary: #FFFFFF;
  --text-primary: #1A1A1A;
  // ...
}
```

### 2. 创建布局文件

**Base 布局** (`_layouts/base.html`):
- HTML 骨架
- 字体加载（Google Fonts）
- 导航栏（固定顶部、毛玻璃效果）
- 主题切换按钮
- 页脚

**Post 布局** (`_layouts/post.html`):
- 文章头部（分类、标题、副标题、作者）
- 封面图
- 正文内容
- 标签
- 上一篇/下一篇导航

**Home 布局** (`_layouts/home.html`):
- 特色文章展示
- 最新文章列表

### 3. 更新入口文件

**首页** (`index.html`):
```yaml
---
layout: home
title: ""
---
```

**博客列表页** (`blog/index.html`):
- 使用 base 布局
- 显示所有文章列表

### 4. 更新配置

**`_config.yml`**:
```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      layout: post  # 改为新的 post 布局
```

## 设计规范

### 颜色系统

| Token | Light | Dark |
|-------|-------|------|
| bg-primary | #FFFFFF | #0A0A0A |
| text-primary | #1A1A1A | #EEEEEE |
| text-secondary | #666666 | #A3A3A3 |
| border | #E5E5E5 | #292929 |

### 字体系统

- **标题**: Playfair Display + Noto Serif SC
- **正文**: Inter + 系统字体回退
- **代码**: JetBrains Mono + Fira Code

### 容器宽度

| Class | Width | Use Case |
|-------|-------|----------|
| .container-article | 680px | 文章正文 |
| .container-medium | 900px | 中等宽度内容 |
| .container-wide | 1100px | 列表页面 |
| .container-full | 1400px | 全宽布局 |

### 字号系统

| Token | Size | Use Case |
|-------|------|----------|
| text-base | 18px | 正文 |
| text-lg | 20px | 大段落 |
| text-xl | 24px | H3 |
| text-2xl | 32px | H2 |
| text-4xl | 56px | H1/页面标题 |

## 技术要点

### 深色模式实现

使用 CSS 自定义属性 + data-mode 属性:

```css
:root {
  --bg-primary: #FFFFFF;
}

[data-mode="dark"] {
  --bg-primary: #0A0A0A;
}
```

JavaScript 切换:
```javascript
function setTheme(theme) {
  html.setAttribute('data-mode', theme);
  localStorage.setItem('theme', theme);
}
```

### SCSS 嵌套语法

使用 SCSS 嵌套提高可读性:

```scss
.site-nav {
  margin-left: auto;
  display: flex;

  a {
    color: var(--text-secondary);

    &:hover {
      color: var(--text-primary);
    }
  }
}
```

### Jekyll Liquid 模板

使用过滤器处理内容:

```liquid
{{ post.excerpt | strip_html | truncate: 120 }}
{{ page.date | date: "%Y年%m月%d日" }}
```

## 文件清单

```
assets/css/main.scss          # 主样式 (14KB)
_layouts/base.html            # 基础布局
_layouts/post.html            # 文章布局
_layouts/home.html            # 首页布局
blog/index.html               # 博客列表页
index.html                    # 首页 (更新)
_config.yml                   # 配置 (更新)
```

## 验收标准

- [x] 首页显示特色文章 + 文章列表
- [x] 文章页使用新样式
- [x] 标题使用衬线体
- [x] 配色为黑白系
- [x] 正文 18px，行高 1.7
- [x] 深色模式正常
- [x] 移动端正常

## 参考

- 测试文件: `test-blog-system.html`
- 设计灵感: Every.to
- 日期: 2026-02-14
