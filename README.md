# Linze Li (李林泽) — Personal Portfolio

个人作品集网站。

**线上地址**: https://lilinze.me

---

## 仓库结构

```
├── assets/              ← 构建产物（JS、CSS、图片）
├── index.html           ← 网站入口（GitHub Pages 部署用）
├── CNAME                ← 域名绑定
├── README.md            ← 本文件
└── source/              ← 完整源码
    ├── src/
    │   ├── components/      ← 可复用组件
    │   ├── sections/        ← 页面板块
    │   ├── pages/           ← 详情页
    │   ├── data/            ← 数据文件
    │   │   ├── projects.ts      ← 项目数据
    │   │   ├── albums.ts        ← 相册数据
    │   │   └── posts.ts         ← 博客文章数据
    │   └── App.tsx          ← 主组件（路由）
    ├── public/assets/       ← 图片资源
    ├── package.json         ← 依赖
    ├── vite.config.ts       ← 构建配置
    └── tailwind.config.js   ← Tailwind 配置
```

---

## 修改内容

所有文字内容都在 `source/src/data/` 目录下的三个文件中：

| 文件 | 内容 |
|------|------|
| `source/src/data/projects.ts` | 项目卡片 |
| `source/src/data/albums.ts` | 生活相册（照片+文字） |
| `source/src/data/posts.ts` | 博客文章 |

**修改步骤**：
1. 编辑 `source/src/data/` 下的对应文件
2. 运行 `cd source && npm install && npm run build`
3. 把 `source/dist/` 里的文件复制到仓库根目录
4. `git add -A && git commit -m "update" && git push`

---

## 图片资源

照片放在 `source/public/assets/` 目录下，修改后需要重新构建。

照片命名建议：
- 不要中文、不要空格
- 使用 `.jpg` 格式
