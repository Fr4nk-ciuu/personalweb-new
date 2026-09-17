/* =========================================================
   技能数据 —— 想改技能，只改这个文件就行
   level 表示自评掌握程度（0-100），会自动渲染成进度条
   ========================================================= */

window.SKILLS = [
  {
    icon: "⌨️",
    title: "编程语言",
    desc: "写代码的看家本领",
    items: [
      { name: "Java", level: 78, note: "主力语言" },
      { name: "C / C++", level: 65, note: "课程基础" },
      { name: "Python", level: 62, note: "脚本 / 数据处理" },
      { name: "JavaScript", level: 60, note: "前端交互" },
      { name: "SQL", level: 65, note: "查询与建表" }
    ]
  },
  {
    icon: "🎨",
    title: "前端开发",
    desc: "把设计稿变成真页面",
    items: [
      { name: "HTML5 / CSS3", level: 80, note: "语义化 + 响应式" },
      { name: "响应式布局", level: 75, note: "Flex / Grid" },
      { name: "原生 JS / DOM", level: 68, note: "交互逻辑" },
      { name: "Vue 基础", level: 45, note: "入门学习中" }
    ]
  },
  {
    icon: "⚙️",
    title: "后端与数据库",
    desc: "让数据真正流动起来",
    items: [
      { name: "Java 面向对象", level: 75, note: "类 / 集合 / 异常" },
      { name: "MySQL", level: 66, note: "建表 / 增删改查 / 关联" },
      { name: "JDBC", level: 62, note: "数据库连接" },
      { name: "Spring Boot", level: 40, note: "入门学习中" },
      { name: "RESTful API", level: 50, note: "接口设计概念" }
    ]
  },
  {
    icon: "🧰",
    title: "工具与工程",
    desc: "让开发更顺手",
    items: [
      { name: "Git / GitHub", level: 70, note: "提交 / 分支 / 协作" },
      { name: "IntelliJ IDEA", level: 78, note: "主力 IDE" },
      { name: "VS Code", level: 76, note: "前端 / 脚本" },
      { name: "Linux 基础命令", level: 55, note: "环境部署" },
      { name: "Markdown", level: 80, note: "文档写作" }
    ]
  },
  {
    icon: "🧠",
    title: "计算机基础",
    desc: "支撑长期成长的地基",
    items: [
      { name: "数据结构与算法", level: 62, note: "刷题中" },
      { name: "计算机网络", level: 58, note: "课程学习" },
      { name: "操作系统", level: 52, note: "课程学习" },
      { name: "面向对象设计", level: 65, note: "设计模式入门" }
    ]
  },
  {
    icon: "🤝",
    title: "通用能力",
    desc: "代码之外的加分项",
    items: [
      { name: "问题拆解", level: 78, note: "把大问题切小" },
      { name: "自学能力", level: 85, note: "看文档解决问题" },
      { name: "团队沟通", level: 72, note: "小组作业主力" },
      { name: "文档与复盘", level: 75, note: "写 README 好习惯" }
    ]
  }
];
