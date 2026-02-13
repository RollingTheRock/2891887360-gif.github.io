# Every.to 风格设计系统变量重构

## 问题/需求

将 Jekyll 博客的紫蓝色科技风格配色系统重构为 Every.to 风格的黑白极简设计，并引入衬线字体系统。

## 解决方案

### 1. 配色系统重构

从多级灰度色板简化为语义化颜色变量：

```scss
// 亮色模式
$bg-primary: #FFFFFF;
$bg-secondary: #FFFFFF;
$bg-tertiary: #F7F7F7;
$text-primary: #1A1A1A;
$text-secondary: #666666;
$text-muted: #999999;
$accent: #1A1A1A;        // 黑色强调（Every.to 特征）
$border: #E5E5E5;

// 暗色模式
$dark-bg-primary: #0A0A0A;
$dark-text-primary: #EEEEEE;
$dark-accent: #FFFFFF;
```

**关键决策**: 使用近黑(#1A1A1A)而非纯黑(#000000)，纯黑对比度过强，近黑更柔和易读。

### 2. 字体系统引入

通过 Google Fonts 加载衬线字体：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Noto+Serif+SC:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**字体栈设计**:
```scss
$font-family-serif: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
$font-family-sans: 'Inter', -apple-system, 'PingFang SC', sans-serif;
$font-family-base: $font-family-sans;      // 正文
$font-family-heading: $font-family-serif;  // 标题
```

**为什么选 Playfair Display**: 高对比度衬线，优雅且易读，适合大标题。

### 3. 字号系统调整

| 层级 | 旧值 | 新值 | 用途 |
|-----|------|------|------|
| base | 16px | 18px | 正文基准 |
| lg | 18px | 20px | 大正文 |
| xl | 20px | 24px | 小标题 |
| 2xl | 24px | 32px | 副标题 |
| 3xl | 30px | 40px | H3 |
| 4xl | 36px | 56px | H2 |
| 5xl | 48px | 64px | H1 |

### 4. 内容宽度收窄

```scss
$content-width: 680px;     // 阅读内容（最佳行宽 65-75 字符）
$wide-width: 1100px;       // 宽屏布局
```

**680px 的依据**: 英文/中文混合文本在 18px 字号下，680px 宽度约等于 60-70 字符每行，符合可读性最佳实践。

### 5. 行高优化

```scss
$line-height-tight: 1.3;     // 标题
$line-height-normal: 1.7;    // 正文（宽松）
$line-height-relaxed: 1.9;   // 舒适阅读
```

## 代码示例

### 使用新变量

```scss
// 文章正文样式
.article-content {
  max-width: $content-width;
  font-size: $text-base;
  line-height: $line-height-normal;
  color: $text-primary;
}

// 标题样式
.article-title {
  @include serif-heading;
  font-size: $text-3xl;
  margin-bottom: $space-8;
}

// 暗色模式适配
@media (prefers-color-scheme: dark) {
  body {
    background-color: $dark-bg-primary;
    color: $dark-text-primary;
  }
}
```

## 注意事项

1. **Google Fonts 加载**: 使用 `preconnect` 减少 DNS 和 TLS 握手时间
2. **字体回退**: 始终提供系统字体回退栈
3. **暗色模式**: 变量已定义，需配合 CSS 变量或媒体查询实现切换
4. **向后兼容**: 保留了 `$indigo-500` 等原变量，避免其他文件编译错误

## 相关文件

- `_sass/landing/_variables.scss` - 设计系统变量
- `_includes/head.html` - 字体加载

## 参考

- [Every.to](https://every.to) - 设计参考
- [Google Fonts - Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- [最佳行宽研究](https://baymard.com/blog/line-length-readability)

---

**创建时间**: 2026-02-14
**标签**: #css #scss #design-system #typography #jekyll
