---
title: "个人网站重设计"
description: "参考 Every.to 风格的极简个人门户网站设计，融合现代设计语言与实用功能。"
image: /assets/img/designs/website-redesign.png
category: ui
date: 2026-02-10
tools: ["Figma", "Jekyll", "SCSS"]
featured: true
color: "linear-gradient(135deg, #6366F1 0%, #EC4899 100%)"
---

## 设计背景

这个项目是对我个人网站的全面重设计。之前的网站基于 Jekyll Chirpy 主题，虽然功能完善，但在视觉呈现上较为传统。我希望创造一个更现代、更个性化的展示空间。

## 设计灵感

主要参考了 **Every.to** 的设计风格：
- 极简的排版与大量留白
- 精致的渐变与阴影
- 流畅的交互动效
- 深色/浅色模式切换

## 设计过程

### 1. 信息架构
重新梳理了网站结构：
```
首页 (Landing)
├── 博客 (Blog)
├── 项目 (Projects)
├── 设计 (Design)
└── 视频 (Videos)
```

### 2. 视觉设计
- **主色调**: Indigo (#6366F1) + Pink (#EC4899) 渐变
- **字体**: Inter + PingFang SC
- **间距系统**: 8px 为基础单位

### 3. 组件设计
设计了完整的组件库：
- 导航栏（固定顶部 + 毛玻璃效果）
- Hero 区域（大标题 + 渐变文字）
- 卡片组件（悬停动效 + 顶部渐变条）
- 按钮（多种变体）

## 技术实现

使用 Jekyll + SCSS 构建：
- 模块化的 SCSS 架构
- CSS 变量支持深色模式
- Intersection Observer 实现滚动动画

## 设计亮点

1. **响应式优先**: 从移动端开始设计
2. **性能优化**: 懒加载图片、精简动画
3. **无障碍**: ARIA 标签、键盘导航

## 相关文件

- [Figma 设计稿](#)
- [源代码](https://github.com/RollingTheRock/2891887360-gif.github.io)
