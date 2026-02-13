# Chirpy 旧代码清理报告

## 清理时间
2026-02-14

## 清理范围
部分清理 - 仅删除明显无用的布局文件

## 删除的文件

| 文件 | 原用途 | 替代方案 |
|------|--------|----------|
| `_layouts/home.html` | Chirpy 原博客首页 | `_layouts/blog-list.html` |
| `_layouts/post.html` | Chirpy 原文章布局 | `_layouts/blog-post.html` |

## 备份位置
文件已备份到：
- `backup/layouts/home.html.bak`
- `backup/layouts/post.html.bak`

## 保留的文件

### 新系统布局
- `landing.html` - 基础布局
- `blog-post.html` - 文章详情
- `blog-list.html` - 文章列表
- `blog-taxonomy.html` - 分类/标签/归档

### 其他布局
- `project.html` - 项目详情
- `design.html` - 设计详情
- `video.html` - 视频详情

### Chirpy 保留（可能有依赖）
- `default.html` - 默认布局（可能有页面使用）
- `page.html` - 简单页面布局
- `compress.html` - 被 landing.html 依赖

## 回滚方法

如需恢复删除的文件：

```bash
# 方法 1: 从备份恢复
cp backup/layouts/home.html.bak _layouts/home.html
cp backup/layouts/post.html.bak _layouts/post.html

# 方法 2: 从 git 历史恢复
git checkout HEAD~1 -- _layouts/home.html _layouts/post.html
```

## 后续清理建议

如需进一步清理，建议：

1. **本地测试验证** - 运行 `bundle exec jekyll serve`
2. **检查 default.html 引用** - 确认是否还有页面使用
3. **检查 includes** - 清理 sidebar.html, topbar.html 等
4. **清理 backup 目录** - 一周后删除备份

## 相关提交

- `1b4990c` chore: 清理 Chirpy 旧代码（部分）
