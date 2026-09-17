# 陈嘉烨 · 个人主页

上海杉达学院 计算机科学与技术专业 · 个人展示平台

一个纯手写的个人主页，用来展示个人能力与做过的所有项目。
**不依赖任何框架和构建工具**，双击 `index.html` 就能打开，可直接部署到 GitHub Pages。

---

## 一、文件结构

```
personalweb-new/
├── index.html                  # 页面主体（结构 + 文案）
├── assets/
│   ├── css/
│   │   └── style.css           # 全部样式（含深色/浅色主题、响应式）
│   └── js/
│       ├── skills.js           # ★ 技能数据（改这里）
│       ├── projects.js         # ★ 项目数据（改这里）
│       └── main.js             # 交互逻辑（一般不用动）
└── README.md
```

日常维护只需要改两个文件：`skills.js`（技能）和 `projects.js`（项目）。

---

## 二、怎么添加 / 修改项目

打开 `assets/js/projects.js`，在 `window.PROJECTS = [ ... ]` 里面操作。

### 新增一个项目

复制下面这段，粘到数组里（注意上一项结尾要有英文逗号）：

```js
{
  title: "项目名称",
  icon: "🚀",                    // 卡片图标，随便挑个 emoji
  category: "web",              // 分类，见下方可选值
  year: "2025",
  summary: "一句话简介，卡片上显示，建议 40~80 字。",
  intro: "详细介绍，点击卡片弹窗里显示，可以写长一点。",
  highlights: [                 // 我做了什么，逐条列出
    "实现了 xxx 功能",
    "解决了 xxx 问题"
  ],
  tech: ["Java", "MySQL"],      // 技术栈标签
  role: "独立完成",              // 可选：担任角色
  github: "https://github.com/你的用户名/仓库名",   // 没有就写 ""
  demo: ""                      // 在线演示地址，没有就写 ""
}
```

### 分类可选值（`category` 字段）

| 填什么 | 显示为 |
|---|---|
| `web` | Web 开发 |
| `java` | Java 后端 |
| `course` | 课程设计 |
| `tool` | 小工具 / 游戏 |

如果想让筛选按钮显示成别的名字，改 `projects.js` 最上面的 `window.CATEGORIES`。

### 删项目

直接删掉对应的整个 `{ ... }` 代码块即可，筛选按钮上的数量会自动更新。

---

## 三、怎么修改技能

打开 `assets/js/skills.js`，把 `level` 改成你真实的掌握程度（0~100），
进度条长度会自动跟着变。`note` 是括号里那行小字，可以写「主力语言」「学习中」之类。

---

## 四、怎么修改个人信息

| 想改什么 | 改哪里 |
|---|---|
| 首屏的介绍文字、打字机文案 | `index.html` 里搜 `hero-desc`、`main.js` 里搜 `phrases` |
| 首屏那四个数字 | `index.html` 里搜 `data-count` |
| 关于我、成长轨迹 | `index.html` 对应板块 |
| 邮箱 / GitHub / 微信 | `index.html` 里搜 `contact-card` |
| 主题色 | `style.css` 最上面的 `--accent-1` / `--accent-2` / `--accent-3` |

---

## 五、本地预览

直接双击 `index.html` 即可。

如果要用服务器方式打开（推荐）：

```bash
# 在项目目录下执行
python -m http.server 8000
# 然后浏览器访问 http://localhost:8000
```

---

## 六、部署上线（免费）

### 方式一：GitHub Pages（推荐）

1. 在 GitHub 新建一个仓库，命名建议 `<你的用户名>.github.io`
2. 把本项目所有文件上传（不要上传 `.workbuddy` 文件夹）
3. 进入仓库 `Settings → Pages`，Source 选择 `main` 分支、根目录，保存
4. 等 1~2 分钟，访问 `https://<你的用户名>.github.io` 即可

### 方式二：其他静态托管

Vercel / Netlify / 腾讯云静态托管都支持直接拖拽文件夹上传，零配置。

---

## 七、已实现的功能

- 深色 / 浅色主题切换，并记住你的选择
- 首屏打字机效果、数字滚动动画
- 技能进度条滚动到视口时自动填充
- 项目分类筛选 + 关键词实时搜索
- 项目详情弹窗（介绍 / 亮点 / 技术栈 / 仓库链接）
- 滚动进度条、导航高亮、回到顶部
- 完整响应式，手机端有折叠菜单
- 支持无障碍减弱动效偏好（`prefers-reduced-motion`）

---

## 八、待补充

- [ ] 把 `projects.js` 里的示例项目替换成自己真实的项目
- [ ] 补上真实的邮箱、GitHub 地址
- [ ] 如果有项目截图，可以在 `assets/img/` 放图片并在弹窗里展示
- [ ] 按自己的真实水平微调 `skills.js` 里的 `level` 数值
