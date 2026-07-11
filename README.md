# Linze Li (李林泽) — Personal Portfolio

个人作品集网站，基于 React + TypeScript + Tailwind CSS 构建。

**线上地址**: https://lilinze.me

---

## 技术栈

- React 19 + TypeScript + Vite
- Tailwind CSS
- Framer Motion（动画）
- react-router-dom（路由）
- Lenis（平滑滚动）
- Lucide React（图标）

---

## 项目结构

```
├── index.html              # 入口 HTML
├── src/
│   ├── App.tsx             # 主组件（路由配置）
│   ├── main.tsx            # 入口文件
│   ├── index.css           # 全局样式
│   ├── components/         # 可复用组件
│   │   ├── Navigation.tsx      # 导航栏
│   │   ├── FadeUp.tsx          # 淡入动画
│   │   ├── WordsPullUp.tsx     # 文字上拉动画
│   │   ├── WordsPullUpMultiStyle.tsx
│   │   ├── AnimatedLetter.tsx  # 滚动字符动画
│   │   ├── CustomCursor.tsx    # 自定义光标
│   │   └── HorizontalScroll.tsx # 横向滚动容器
│   ├── sections/           # 页面板块
│   │   ├── Hero.tsx            # 首页大标题
│   │   ├── About.tsx           # 关于我
│   │   ├── Projects.tsx        # 项目列表（横向滚动）
│   │   ├── Writing.tsx         # 博客列表
│   │   └── Life.tsx            # 生活相册（横向滚动）
│   ├── pages/              # 详情页
│   │   ├── ProjectDetail.tsx   # 项目详情
│   │   ├── AlbumDetail.tsx     # 相册详情
│   │   └── BlogDetail.tsx      # 博客详情
│   ├── data/               # 数据文件
│   │   ├── projects.ts         # 项目数据
│   │   ├── albums.ts           # 相册数据
│   │   └── posts.ts            # 博客文章数据
│   └── hooks/              # 自定义 Hooks
├── public/
│   └── assets/             # 图片资源
│       ├── avatar.jpg          # 头像
│       ├── life-1.jpg ~ life-6.jpg  # my life 照片
│       ├── 2. 1.jpg ~ 2. 4.jpg      # career&study 照片
│       ├── 3.1.jpg ~ 3.5.jpg         # moments with her 照片
│       └── project-icon-*.jpg        # 项目图标
```

---

## 修改内容指南

所有文字内容都集中在 `src/data/` 目录下的三个文件中，**不需要修改任何组件代码**。

---

### 1. 修改项目（Projects）

文件：`src/data/projects.ts`

每个项目包含以下字段：

```typescript
{
  id: "voice-agent",              // 唯一标识（URL 中使用）
  index: "01",                    // 显示编号
  title: "项目名称",               // 项目标题
  subtitle: "一句话描述",          // 卡片上显示的描述
  description: "详细描述...",      // 详情页显示的长描述
  techStack: ["Python", "LangChain"],  // 技术栈标签
  features: ["特性1", "特性2"],    // 关键特性列表
  links: [
    { label: "GitHub", url: "https://github.com/..." }
  ],
}
```

**添加新项目**：在 `projects` 数组末尾添加新对象即可。

**修改现有项目**：直接编辑对应字段。

---

### 2. 修改生活相册（Life）

文件：`src/data/albums.ts`

相册结构：

```typescript
{
  id: "career-study",              // 唯一标识
  title: "career&study",           // 显示标题
  description: "相册简介...",       // 详情页顶部的描述
  coverImage: "/assets/2.%201.jpg", // 封面图路径
  entries: [
    {
      photos: ["/assets/2.%201.jpg", "/assets/2.%202.jpg"],  // 照片路径（1-3张）
      text: "对应这段照片的文字描述..."                       // 文字内容
    },
    // 更多条目...
  ],
}
```

**添加新相册**：在 `albums` 数组末尾添加新对象。

**修改照片和文字**：编辑 `entries` 数组中的 `photos` 和 `text`。

**添加新条目**：在 `entries` 数组末尾添加新的 `{photos, text}` 对象。

**照片路径规则**：
- 照片放在 `public/assets/` 目录下
- 路径格式：`/assets/文件名.jpg`
- 文件名有空格时，空格要编码为 `%20`，如 `2. 1.jpg` → `2.%201.jpg`

---

### 3. 修改博客文章（Writing）

文件：`src/data/posts.ts`

文章结构：

```typescript
{
  id: "spring-ioc-aop",
  slug: "spring-ioc-aop",          // URL 路径
  title: "文章标题",
  category: "后端",                 // 分类标签
  date: "2025.04.15",
  excerpt: "文章摘要...",           // 列表页显示的摘要
  content: "## 标题\\n\\n正文...",  // 完整内容（支持 Markdown 格式）
}
```

**content 支持的 Markdown 格式**：
- `# 标题` / `## 二级标题` / `### 三级标题`
- `**加粗文字**`
- `` `代码` ``
- ``` 代码块 ```
- `- 列表项`
- `| 表格 | 表格 |`
- `> 引用`
- `---` 分割线

**添加新文章**：在 `posts` 数组**开头**添加新对象（最新的文章放前面）。

---

### 4. 修改 Hero 区域（首页大标题）

文件：`src/sections/Hero.tsx`

修改以下内容：
- 头像：修改 `src="/assets/avatar.jpg"`
- 副标题文字：修改 `(00) HELLO — 李林泽`
- 简介文字：修改 `<p>` 标签内的文字

---

### 5. 修改 About 区域

文件：`src/sections/About.tsx`

修改以下内容：
- 三行标题文字（多样式动画）
- 个人简介（滚动字符动画）
- 教育背景、科研经历
- 技能标签

---

### 6. 添加/替换照片

步骤：

1. 将新照片放到 `public/assets/` 目录下
2. 在 `src/data/albums.ts` 中引用照片路径（格式：`/assets/文件名.jpg`）
3. 重新构建部署

**照片命名建议**：
- 不要用中文文件名
- 不要有空格（用 `-` 或 `_` 代替）
- 使用 `.jpg` 格式
- 推荐尺寸：800x600 以上

---

## 构建和部署

### 本地构建

```bash
# 安装依赖
npm install

# 构建
npm run build

# 构建结果在 dist/ 目录下
```

### 部署到 GitHub Pages

```bash
# 将 dist/ 下的文件复制到仓库根目录
cp -r dist/* .

# 提交并推送
git add -A
git commit -m "Update content"
git push origin main
```

推送后等待 1-2 分钟，访问 https://lilinze.me 查看更新。

---

## 常见问题

**Q: 修改后页面没有更新？**
A: GitHub Pages 有缓存，等 1-2 分钟后强制刷新（Ctrl+F5 / Cmd+Shift+R）。

**Q: 照片显示不出来？**
A: 检查照片路径是否正确，文件名是否一致（区分大小写），照片是否在 `public/assets/` 目录下。

**Q: 新增页面后 404？**
A: 本网站使用 HashRouter，所有路由都带 `#` 前缀。不要直接访问 `/blog/xxx`，要通过首页链接跳转。

**Q: 微信打开显示异常？**
A: 微信内置浏览器对 CSS 动画和视频支持有限。手机浏览器（Safari/Chrome）和电脑端显示正常即可。

---

## 域名配置

域名 `lilinze.me` 通过 CNAME 文件绑定到 GitHub Pages：

- 仓库根目录下的 `CNAME` 文件内容为：`lilinze.me`
- 在仓库 **Settings → Pages** 中设置 Custom domain
- 勾选 **Enforce HTTPS**

DNS 配置：添加 CNAME 记录指向 `llz0519.github.io`
