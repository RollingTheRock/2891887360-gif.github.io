---
title: "AI Daily Digest"
description: "自动抓取 AI 论文并生成日报的邮件系统，支持多数据源聚合，通过 GitHub Actions 定时触发。"
image: /assets/img/projects/ai-daily.png
github: https://github.com/RollingTheRock/ai-daily-digest
link: https://github.com/RollingTheRock/ai-daily-digest
tech: ["Python", "GitHub Actions", "LLM", "Email"]
featured: true
date: 2026-01-15
status: in-progress
role: 独立开发
---

## 项目简介

AI Daily Digest 是一个自动化的 AI 论文聚合和摘要系统。它会定期抓取 arXiv、HackerNews、GitHub Trends 等数据源的最新内容，使用大语言模型生成中文摘要，并通过邮件发送给订阅者。

## 核心功能

### 1. 多数据源聚合
- **arXiv**: 自动获取最新 AI/ML 论文
- **HackerNews**: 热门技术讨论
- **GitHub Trends**:  trending 开源项目

### 2. 智能摘要
- 使用 DeepSeek API 生成高质量中文摘要
- 自动提取关键信息：研究背景、方法、结果
- 支持长文分段处理

### 3. 定时投递
- GitHub Actions 每日定时触发
- 支持自定义投递时间
- 邮件模板美观简洁

## 技术架构

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Data      │───▶│  Processor  │───▶│   Email     │
│  Sources    │    │   (LLM)     │    │   Sender    │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 使用方式

1. **Fork 仓库**
2. **配置 Secrets**: 设置 API Keys
3. **启用 Actions**: 开启 GitHub Actions
4. **添加订阅者**: 在配置文件中添加邮箱

## 未来计划

- [ ] Web 界面管理订阅
- [ ] 支持更多数据源 (Twitter, Reddit)
- [ ] 个性化推荐算法
- [ ] RSS 订阅支持

## 相关链接

- [GitHub 仓库](https://github.com/RollingTheRock/ai-daily-digest)
- [使用文档](https://github.com/RollingTheRock/ai-daily-digest#readme)
