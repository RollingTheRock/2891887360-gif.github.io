# 设计系统基础变量重构计划

## 概览

| 项目 | 内容 |
|------|------|
| **任务类型** | style refactor |
| **目标** | 重写 CSS 变量系统，建立 Every.to 风格的设计基础 |
| **影响范围** | `_sass/landing/_variables.scss`, `_includes/head.html` |
| **预计工作量** | 2 个文件 |

---

## 背景与动机

当前设计系统采用紫蓝色科技风格（Indigo/Pink），需要重构为 Every.to 风格的黑白极简设计：

- **当前问题**: 配色过于科技感，不够简约
- **目标风格**: 黑白极简、衬线标题、更大字号、更宽松行高
- **参考**: Every.to 的设计语言

---

## 现有状态分析

### 当前变量文件位置
- `_sass/landing/_variables.scss` -  landing 页面变量（主要目标）
- `_sass/abstracts/_variables.scss` - 主题基础变量

### 当前配色（需要替换）
```scss
// Indigo 科技风
$indigo-500: #6366F1;  // 主强调色
$pink-500: #EC4899;

// 灰度系统
$gray-50: #FAFAFA;     // 背景
$gray-900: #18181B;    // 文字
```

---

## 实施方案

### 任务 1: 重构 `_sass/landing/_variables.scss`

**变更内容:**

1. **简化色彩系统** - 从多级灰度改为极简黑白
2. **新增语义化 CSS 变量** - 使用 CSS 自定义属性
3. **引入衬线字体** - Playfair Display + Noto Serif SC
4. **增大字号系统** - 基准从 16px 提升到 18px
5. **调整内容宽度** - 从 1200px 收窄到 680px/1100px

**新变量定义:**

```scss
// ============================================
// Every.to Style Design System - Variables
// ============================================

// ----------------------------------------
// Colors - Every.to 黑白极简风格
// ----------------------------------------

// 亮色模式
$bg-primary: #FFFFFF;
$bg-secondary: #FFFFFF;
$bg-tertiary: #F7F7F7;
$text-primary: #1A1A1A;
$text-secondary: #666666;
$text-muted: #999999;
$accent: #1A1A1A;
$border: #E5E5E5;

// 暗色模式
$dark-bg-primary: #0A0A0A;
$dark-text-primary: #EEEEEE;
$dark-accent: #FFFFFF;

// ----------------------------------------
// Typography - 衬线字体系统
// ----------------------------------------

$font-family-serif: 'Playfair Display', 'Noto Serif SC', serif;
$font-family-sans: 'Inter', -apple-system, 'PingFang SC', sans-serif;
$font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;

// 增大的字号系统
$text-xs: 0.75rem;      // 12px
$text-sm: 0.875rem;     // 14px
$text-base: 1.125rem;   // 18px（基准）
$text-lg: 1.25rem;      // 20px
$text-xl: 1.5rem;       // 24px
$text-2xl: 2rem;        // 32px
$text-3xl: 2.5rem;      // 40px
$text-4xl: 3.5rem;      // 56px
$text-5xl: 4rem;        // 64px

// 字重
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// 更宽松的行高
$line-height-tight: 1.3;
$line-height-normal: 1.7;
$line-height-relaxed: 1.9;

// ----------------------------------------
// Layout - 更窄的内容宽度
// ----------------------------------------

$content-width: 680px;
$wide-width: 1100px;
$container-max-width: $wide-width;
```

---

### 任务 2: 更新 `_includes/head.html`

**变更内容:**

在 `<!-- Web Font -->` 注释之前添加 Google Fonts 引入：

```html
<!-- Google Fonts - Playfair Display & Noto Serif SC -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Noto+Serif+SC:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 变更文件清单

| 文件路径 | 变更类型 | 说明 |
|---------|---------|------|
| `_sass/landing/_variables.scss` | 重写 | 新设计系统变量 |
| `_includes/head.html` | 修改 | 添加 Google Fonts |

---

## 验收标准

- [ ] 新变量文件语法正确，无编译错误
- [ ] Google Fonts 正确加载
- [ ] 页面背景变为纯白色（#FFFFFF）
- [ ] 变量可被其他 SCSS 文件引用

---

## Commit Message

```
style: 重构设计系统变量 - Every.to 风格

- 配色从紫蓝色改为黑白极简
- 引入 Playfair Display 衬线字体
- 增大基准字号至 18px
- 调整内容宽度至 680px
```

---

## 风险与注意事项

1. **向后兼容** - 本次修改会改变现有样式，需要后续更新引用变量的文件
2. **字体加载** - Google Fonts 在国内可能需要预连接优化
3. **暗色模式** - 暗色变量已定义，但实际切换逻辑需另行实现

---

## 执行检查清单

- [ ] 备份原 `_variables.scss`
- [ ] 编写新变量文件
- [ ] 更新 `head.html`
- [ ] 本地验证 SCSS 编译
- [ ] 提交 commit
