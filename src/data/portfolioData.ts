export interface Skill {
  name: string;
  category: 'agent' | 'engineering' | 'creative' | 'marketing' | 'solution';
  icon: string;
  level: number; // 0-100
  color: string;
  bgLight: string;
}

export interface Experience {
  title: string;
  company_name: string;
  iconBg: string;
  date: string;
  points: string[];
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: 'AI & Agent' | '大模型与安全' | '3D & 视觉' | '海外商业与运营';
  tags: { name: string; color: string }[];
  gradient: string;
  source_code_link: string;
  live_demo_link?: string; // Optional: 没提到在线演示的就不要有这个入口
  highlights: string[];
  stats: { label: string; value: string }[];
}

export const PROFILE = {
  name: "Yiping Wang",
  shortName: "王毅评",
  tagline: "2027 届本科生 · AI 应用交付工程师 (Agent/FDE) / 海外营销 & KOL 合作",
  location: "福建厦门 🇨🇳",
  school: "福建师范大学",
  major: "网络空间安全 (本科 2023.09 - 2027.06)",
  phone: "15348306742",
  email: "1191728729@qq.com",
  wechat: "aaabbcyy",
  github: "https://github.com/Shirleypp012",
  douyin: "https://v.douyin.com/qmKLvVURuL0/",
  xiaohongshu: "https://xhslink.cn/o/3oU7UzyayGw",
  headline: "兼具 AI 工作流开发（n8n/MCP/大模型API）、海外营销与跨境电商、多平台爆款内容生产及政企安全大模型落地交付的多维复合型人才。",
  about: "福建师范大学网络空间安全专业 2027 届本科生。拥有启明星辰（安全服务与安全大模型评测）与杭州天音（研发部 K3s / 智慧教育测试）实习经历，连续两学年荣获校二等奖学金，斩获福建省计算科学与智能创新大赛二等奖、“数信杯”全国铜奖。熟练运用 n8n、MCP 飞书对接、Codex、ChatGPT、Gemini 跑通“生图—生视频—剪辑—生成文案—导出”AI 电商内容流水线；在跨境商业中独立对接韩国供应商、协调跨境物流并实现社群闭环盈利；在自媒体领域打造单条 111.5 万播放爆款短视频与小红书品牌合作。",
  dimensions: [
    {
      title: "AI 应用交付 & Agent 工作流",
      desc: "熟练实操 n8n 工作流编排，通过 MCP 协议打通飞书多维表格与协同体系；熟练调用大模型 API 与 Function Calling，将复杂业务拆解为标准化输入、智能处理与自动化输出流水线。"
    },
    {
      title: "海外营销 & 跨境电商实践",
      desc: "通过 CET-4、CET-6，具备流利英文资料检索与涉外商务沟通基础。熟悉 YouTube、TikTok、Instagram 与 X 科技生态；拥有长期对接韩国周边供应商、跨境物流集运协同与国内私域粉丝销售的完整商业闭环经验。"
    },
    {
      title: "爆款内容制作与自媒体运营",
      desc: "熟练运用剪映专业剪辑、无限画布图文设计与 AI 提示词工程。独立打造单条自然播放超 111.5 万的抖音爆款视频、视频号累计播放 10 万+、小红书图文种草获得品牌置换邀约，具备淘宝商家商品推广视频真实交付能力。"
    },
    {
      title: "云原生工程与大模型安全",
      desc: "具备国产服务器 10 节点 K8s 集群搭建与开源 3B 大模型私有化部署实战经验，量化推理延迟下降 68%；参与启明星辰安全大模型响应速度/准确率/合规性评测体系，熟练编写部署 SOP 与排障文档。"
    }
  ],
  honors: [
    "连续两学年校二等奖学金",
    "福建省计算科学与智能创新大赛二等奖（国产大模型集群）",
    "“数信杯”全国铜奖（隐私计算协同审计平台）",
    "校级三好学生 · 优秀共青团员",
    "英语 CET-4 / CET-6 认证",
    "曾任年级办公室部长、班级心理委员"
  ]
};

export const SKILLS: Skill[] = [
  // 1. AI 工作流 & Agent (agent)
  { name: 'n8n 工作流编排', category: 'agent', icon: 'Workflow', level: 95, color: '#ea580c', bgLight: '#ffedd5' },
  { name: 'MCP 协议 & 飞书接入', category: 'agent', icon: 'Layers', level: 93, color: '#0284c7', bgLight: '#e0f2fe' },
  { name: 'Prompt 工程 & RAG', category: 'agent', icon: 'Zap', level: 96, color: '#7c3aed', bgLight: '#ede9fe' },
  { name: 'Codex / ChatGPT / Gemini', category: 'agent', icon: 'Bot', level: 97, color: '#059669', bgLight: '#d1fae5' },
  { name: '大模型 API & 工具调用', category: 'agent', icon: 'Cpu', level: 92, color: '#d97706', bgLight: '#fef3c7' },

  // 2. 工程与环境运维 (engineering)
  { name: 'Python & Shell 脚本', category: 'engineering', icon: 'Terminal', level: 88, color: '#2563eb', bgLight: '#dbeafe' },
  { name: 'K3s / K8s 集群部署', category: 'engineering', icon: 'Server', level: 86, color: '#3b82f6', bgLight: '#eff6ff' },
  { name: 'Linux & Docker 容器', category: 'engineering', icon: 'Container', level: 90, color: '#0ea5e9', bgLight: '#e0f2fe' },
  { name: 'Vue3 / TS / 前端工程', category: 'engineering', icon: 'Code', level: 88, color: '#10b981', bgLight: '#d1fae5' },
  { name: 'SQL & 云效协作测试', category: 'engineering', icon: 'Database', level: 87, color: '#6366f1', bgLight: '#e0e7ff' },

  // 3. 内容创作与视觉电商 (creative)
  { name: '剪映专业剪辑 & 镜头', category: 'creative', icon: 'Video', level: 96, color: '#db2777', bgLight: '#fce7f3' },
  { name: 'AI 生图与详情图设计', category: 'creative', icon: 'Palette', level: 94, color: '#f43f5e', bgLight: '#ffe4e6' },
  { name: '无限画布商品视觉设计', category: 'creative', icon: 'Layout', level: 92, color: '#8b5cf6', bgLight: '#ede9fe' },
  { name: '抖音/小红书内容爆款', category: 'creative', icon: 'TrendingUp', level: 95, color: '#ef4444', bgLight: '#fee2e2' },
  { name: '飞书多维表格信息梳理', category: 'creative', icon: 'Table', level: 96, color: '#06b6d4', bgLight: '#cffafe' },

  // 4. 海外营销与跨境商业 (marketing)
  { name: '英语 CET-4 / CET-6 涉外', category: 'marketing', icon: 'Globe', level: 93, color: '#0284c7', bgLight: '#e0f2fe' },
  { name: '韩国供应链采购对接', category: 'marketing', icon: 'PackageCheck', level: 91, color: '#16a34a', bgLight: '#dcfce7' },
  { name: '跨境国际物流统筹', category: 'marketing', icon: 'Truck', level: 89, color: '#ca8a04', bgLight: '#fef9c3' },
  { name: '海外社媒 (TikTok/X/Insta)', category: 'marketing', icon: 'Share2', level: 92, color: '#9333ea', bgLight: '#f3e8ff' },
  { name: '公域获客与私域下单转化', category: 'marketing', icon: 'Users', level: 94, color: '#e11d48', bgLight: '#ffe4e6' },

  // 5. 售前与方案交付 (solution)
  { name: '政企解决方案撰写', category: 'solution', icon: 'FileText', level: 91, color: '#0f172a', bgLight: '#f1f5f9' },
  { name: '客户需求拆解与挖掘', category: 'solution', icon: 'Search', level: 93, color: '#0284c7', bgLight: '#e0f2fe' },
  { name: '架构拓扑图 & 标书制作', category: 'solution', icon: 'Network', level: 90, color: '#16a34a', bgLight: '#dcfce7' },
  { name: '技术宣讲 PPT 与路演答辩', category: 'solution', icon: 'Presentation', level: 94, color: '#ca8a04', bgLight: '#fef9c3' },
  { name: '安全大模型评测体系', category: 'solution', icon: 'ShieldCheck', level: 90, color: '#e11d48', bgLight: '#ffe4e6' },
];

export const EXPERIENCES: Experience[] = [
  {
    title: "研发部实习生",
    company_name: "杭州天音计算机系统工程有限公司",
    iconBg: "#38bdf8",
    date: "2026.07 - 2026.10",
    points: [
      "环境搭建与工具应用：搭建 K3s 测试环境，配置节点调度及 Gateway 路由；利用 Codex 辅助调试与故障定位，排查 Pod、服务路由和数据库连接问题，沉淀部署 SOP 与排障文档。",
      "测试与业务支持：参与智慧教育平台功能测试，借助 Codex 编写测试用例；使用云效完成缺陷提报、进度跟进、回归测试与上线验证，处理账号权限、学科绑定和数据同步问题。"
    ],
    skills: ["K3s 集群搭建", "Gateway 路由", "Codex 辅助排障", "云效协同测试", "部署 SOP", "Linux"]
  },
  {
    title: "安全服务工程师 实习",
    company_name: "北京启明星辰信息安全技术有限公司",
    iconBg: "#818cf8",
    date: "2026.03 - 2026.06",
    points: [
      "AI 评测与调研：参与安全大模型测试，从响应速度、准确率及合规性维度设计测试用例，输出选型评估材料；调研 AI 与安全行业方案、竞品动态，制作行业 PPT、选型评估报告和投标材料。",
      "项目实施与交付：参与政企服务器、安全设备（NFT、NAC）及靶场平台部署，完成环境配置、功能验证和故障排查；对接客户与内部团队，输出技术方案及交付文档，跟进问题处理与验收。"
    ],
    skills: ["安全大模型评测", "政企方案撰写", "NFT / NAC 安全设备", "网络靶场部署", "标书与宣讲 PPT"]
  },
  {
    title: "海外营销 / 跨境电商周边销售与社群运营",
    company_name: "CORTIS 周边跨境采购与社群销售 ｜ 自主经营",
    iconBg: "#ca8a04",
    date: "2024 - 至今",
    points: [
      "海外资源对接与履约：长期对接韩国周边供应商，确认采购数量与发货周期，协调韩国物流寄送至中国，推进采购、跨境运输及订单履约全流程。",
      "社媒获客与转化：通过国内社交平台、抖音垂直内容及社群互动精准触达粉丝，收集购买需求、解答产品疑问，推动公域获客向私域下单转化。",
      "用户维护与商业复盘：持续跟踪粉丝消费偏好，运用 AI 辅助整理订单与收货信息，结合用户反馈动态调整产品资讯与推广内容；累计经营利润 2,000+ 元。"
    ],
    skills: ["韩国供应商对接", "跨境国际物流", "公私域转化", "社群营销", "AI 订单数据整理", "用户偏好复盘"]
  },
  {
    title: "多平台内容运营与电商内容交付",
    company_name: "自主自媒体账号 & 淘宝商家服务实践",
    iconBg: "#f43f5e",
    date: "2024 - 至今",
    points: [
      "自媒体爆款制作：独立完成抖音书摘内容的脚本、剪映剪辑及 AI 配图，单条视频获自然播放量 111.5 万+；视频号 AI 科普内容累计播放 10 万+，积累高粘性垂直粉丝。",
      "种草与品牌合作：在小红书发布图文种草与美食笔记，收到品牌置换邀约；根据内容表现与用户反馈调整选题，积累深厚的受众洞察与品牌沟通经验。",
      "淘宝商家视频交付：为淘宝商家剪辑商品推广视频，围绕商品卖点组织素材与视觉表达，高质量输出成片，积累面向真实业务方的内容交付经验。"
    ],
    skills: ["111.5W 爆款视频", "剪映专业剪辑", "小红书品牌合作", "淘宝视频交付", "受众心理洞察"]
  },
  {
    title: "本科学习 · 竞赛荣誉与核心课程",
    company_name: "福建师范大学 ｜ 网络空间安全专业",
    iconBg: "#34d399",
    date: "2023.09 - 2027.06",
    points: [
      "学业优异：主修人工智能与大数据、计算机网络、操作系统、Linux、数据安全等核心课程；连续两学年荣获校二等奖学金，获评校级三好学生、优秀共青团员，通过英语 CET-4 与 CET-6。",
      "顶级科创竞赛：参与国产服务器 K8s 集群与开源 3B 大模型部署优化，荣获福建省计算科学与智能创新大赛二等奖；参与隐私计算协同审计平台开发与答辩，荣获“数信杯”全国铜奖。",
      "学生组织：曾任年级办公室部长、班级心理委员，组织协调多场大型校园活动，具备扎实的跨团队沟通协作与组织抗压能力。"
    ],
    skills: ["网络空间安全", "省赛二等奖", "国赛铜奖", "连续两年二等奖学金", "CET-4 / CET-6", "年级学生骨干"]
  }
];

export const PROJECTS: Project[] = [
  // 1. 隐私计算数据资产协同审计平台 (Has live demo)
  {
    id: "privacy-computing-audit",
    name: "隐私计算数据资产协同审计平台 (国赛铜奖)",
    description: "基于安全多方计算与隐私保护技术搭建数据资产协同审计平台，接入大模型自动生成合规审计规则与分析报告，适配政务与医疗数据安全场景。",
    category: "大模型与安全",
    tags: [
      { name: "安全多方计算", color: "#0f172a" },
      { name: "大模型审计报告", color: "#16a34a" },
      { name: "数据合规", color: "#e11d48" },
      { name: "国赛铜奖", color: "#ca8a04" },
    ],
    gradient: "from-emerald-600 via-teal-700 to-slate-800",
    source_code_link: "https://github.com/Shirleypp012",
    live_demo_link: "https://gorgeous-praline-cf3d0a.netlify.app/", // 提供的有效在线演示
    highlights: [
      "参与协同审计平台研发，集成安全多方计算协议与隐私数据安全流转",
      "接入大模型针对敏感数据自动生成合规审计规则与结构化审计报告",
      "负责制作项目交互 Demo，完成方案表达、技术路演与现场答辩",
      "荣获“数信杯”全国铜奖"
    ],
    stats: [
      { label: "竞赛奖项", value: "全国铜奖" },
      { label: "应用场景", value: "政务 / 医疗" },
      { label: "在线演示", value: "可直接访问" }
    ]
  },

  // 2. 新年上上签 (Has live demo)
  {
    id: "new-year-fortune",
    name: "新年上上签 · AI 互动祈福应用",
    description: "富有中国传统文化仪式感的新年祈福抽签交互应用，结合轻量生动的动效设计与定制祝福语生成，支持移动端流畅求签与运势结果分享。",
    category: "AI & Agent",
    tags: [
      { name: "AI 祈福生成", color: "#e11d48" },
      { name: "传统文化交互", color: "#ca8a04" },
      { name: "响应式轻应用", color: "#0284c7" },
    ],
    gradient: "from-red-600 via-rose-600 to-amber-500",
    source_code_link: "https://github.com/Shirleypp012",
    live_demo_link: "https://fantastic-lily-fb0e95.netlify.app/", // 提供的有效在线演示
    highlights: [
      "还原传统摇签、解签交互细节，营造浓郁节日吉庆氛围",
      "个性化吉运签文与寓意解读，兼顾趣味性与社交传播属性",
      "针对移动端轻量优化，首屏秒级加载，支持一键保存分享"
    ],
    stats: [
      { label: "体验类型", value: "互动轻应用" },
      { label: "交互设计", value: "沉浸式摇签" },
      { label: "在线演示", value: "已部署上线" }
    ]
  },

  // 3. 金剪卡片 (JinJian Cards) (Has live demo)
  {
    id: "jinjian-cards",
    name: "金剪卡片 (JinJian Cards) · 视觉图文工坊",
    description: "专为内容创作者与自媒体打造的精美卡片渲染与排版工具，支持多款主题质感、动态排版及高分辨率一键导出分享。",
    category: "3D & 视觉",
    tags: [
      { name: "视觉排版", color: "#7c3aed" },
      { name: "自媒体生产力", color: "#db2777" },
      { name: "高分辨率导出", color: "#059669" },
    ],
    gradient: "from-purple-600 via-pink-600 to-indigo-600",
    source_code_link: "https://github.com/Shirleypp012",
    live_demo_link: "https://jinjian-cards-ypp648.netlify.app/?card=b064e5ad3be05f5c172fbba73187f238", // 提供的有效在线演示
    highlights: [
      "精心设计的视觉卡片布局比例与字体层级，赋能自媒体图文高质量产出",
      "支持参数化卡片样式微调、主题配色与结构化内容一键载入",
      "集成高性能 Canvas 图片合成渲染，支持即时分享与下载"
    ],
    stats: [
      { label: "应用方向", value: "视觉内容生产" },
      { label: "导出质量", value: "高清矢量级" },
      { label: "在线演示", value: "支持特定卡片载入" }
    ]
  },

  // 4. Shirley Chaos 创意交互作品 (Has live demo)
  {
    id: "shirley-chaos",
    name: "Shirley Chaos · 动态交互艺术实验室",
    description: "融合前沿网页交互艺术、动态粒子演化与创意视觉表达的实验性 Web 作品，展现富有生命力的数字美学与趣味交互体验。",
    category: "3D & 视觉",
    tags: [
      { name: "创意交互", color: "#0ea5e9" },
      { name: "数字艺术", color: "#f59e0b" },
      { name: "动效实验", color: "#8b5cf6" },
    ],
    gradient: "from-cyan-600 via-blue-600 to-indigo-700",
    source_code_link: "https://github.com/Shirleypp012",
    live_demo_link: "https://shirleychaos.netlify.app/", // 提供的有效在线演示
    highlights: [
      "富有冲击力的视觉色彩构图与流畅的帧率动画物理反馈",
      "探索混沌演化、随机生成与人机互动的艺术结合点",
      "轻量纯净的前端代码架构，兼容多端屏幕交互"
    ],
    stats: [
      { label: "设计风格", value: "实验交互艺术" },
      { label: "动画表现", value: "流畅 60FPS" },
      { label: "在线演示", value: "实时在线体验" }
    ]
  },

  // 5. Lively Druid AI 探索应用 (Has live demo)
  {
    id: "lively-druid",
    name: "Lively Druid · AI 智能与多模态创作应用",
    description: "探索多模态交互与智能生成的创意 Web 应用，结合大模型能力与直观操作界面，赋予用户灵动随心的人机共创体验。",
    category: "AI & Agent",
    tags: [
      { name: "多模态 AI", color: "#10b981" },
      { name: "智能交互", color: "#6366f1" },
      { name: "人机共创", color: "#ec4899" },
    ],
    gradient: "from-teal-600 via-emerald-600 to-sky-700",
    source_code_link: "https://github.com/Shirleypp012",
    live_demo_link: "https://lively-druid-64a380.netlify.app/", // 提供的有效在线演示
    highlights: [
      "整合大模型能力与敏捷用户界面，探索自然人机对话与内容交互",
      "注重界面微交互与即时响应反馈，降低 AI 工具使用门槛",
      "云端高可用托管，支持跨平台随时访问"
    ],
    stats: [
      { label: "项目类型", value: "多模态 AI 应用" },
      { label: "响应机制", value: "即时交互" },
      { label: "在线演示", value: "支持在线体验" }
    ]
  },

  // 6. 3D 交互浮岛个人主页 (Has live demo -> #home)
  {
    id: "3d-portfolio",
    name: "3D 交互浮岛个人主页 (Three.js & Web Audio)",
    description: "纯代码程序化打造的 3D 浮岛作品集。采用真实 PBR 光照材质、动态双翼机飞行机动与 Web Audio 纯代码合成环境 Lo-fi 音乐。",
    category: "3D & 视觉",
    tags: [
      { name: "Three.js", color: "#059669" },
      { name: "React 19", color: "#0284c7" },
      { name: "TailwindCSS", color: "#06b6d4" },
      { name: "Web Audio", color: "#8b5cf6" },
    ],
    gradient: "from-blue-600 via-indigo-600 to-cyan-500",
    source_code_link: "https://github.com/Shirleypp012",
    live_demo_link: "#home", // 站内 3D 体验
    highlights: [
      "实时 3D 浮岛，包含日式宝塔、鸟居、樱花与石灯笼等 30+ 复合部件",
      "根据海岛旋转角度触发 4 大地标弹窗交互（Welcome、Skills、Projects、Contact）",
      "响应式老式双翼机，伴随海岛旋转产生真实倾斜转弯机动与螺旋桨加速",
      "纯代码 Web Audio API 环境和弦合成器，零外部音频依赖"
    ],
    stats: [
      { label: "渲染帧率", value: "60 FPS" },
      { label: "外部资源", value: "0 依赖 (纯代码)" },
      { label: "在线演示", value: "当前主页探索" }
    ]
  },

  // 7. 国产 K8s 大模型高可用集群 (NO live demo - internal/hardware project)
  {
    id: "k8s-llm-cluster",
    name: "国产 K8s 大模型高可用集群 (省赛二等奖)",
    description: "在国产服务器环境下搭建 10 节点 K8s 集群，私有化部署开源 3B 大模型，进行深度量化推理优化，输出政企标准化 AI 落地部署方案。",
    category: "大模型与安全",
    tags: [
      { name: "K8s 集群", color: "#3b82f6" },
      { name: "国产服务器", color: "#0f172a" },
      { name: "3B 大模型部署", color: "#059669" },
      { name: "量化推理优化", color: "#ca8a04" },
    ],
    gradient: "from-blue-600 via-indigo-700 to-cyan-600",
    source_code_link: "https://github.com/Shirleypp012",
    // 注意：未提供在线演示，按用户明确要求：没提到在线演示的就不要有这个入口！
    highlights: [
      "国产服务器搭建 10 节点高可用 K8s 集群，配置网关路由与弹性调度",
      "私有化部署开源 3B 大模型，实现模型服务健康检测与高并发承载",
      "结合模型权重轻量化与量化推理优化，端到端延迟显著下降 68%",
      "荣获福建省计算科学与智能创新大赛二等奖"
    ],
    stats: [
      { label: "竞赛奖项", value: "省赛二等奖" },
      { label: "推理延迟", value: "下降 68%" },
      { label: "集群规模", value: "10 节点" }
    ]
  },

  // 8. AI 电商内容生产流水线 (NO live demo - workflow/pipeline)
  {
    id: "ai-ecommerce-pipeline",
    name: "AI 电商内容生产流水线 (端到端跑通)",
    description: "围绕商品详情图、营销文案及短视频分散制作痛点，将业务拆解为资料输入、图像生成、视频生成、剪辑整合和素材导出，已跑通端到端生产流水线。",
    category: "AI & Agent",
    tags: [
      { name: "n8n 工作流", color: "#ea580c" },
      { name: "Prompt 工程", color: "#7c3aed" },
      { name: "剪映自动化", color: "#db2777" },
      { name: "飞书多维表格", color: "#06b6d4" },
    ],
    gradient: "from-rose-500 via-pink-600 to-indigo-600",
    source_code_link: "https://github.com/Shirleypp012",
    // 未提供在线演示，按用户要求：不设置在线演示入口
    highlights: [
      "完成生图—生视频—剪辑—生成文案—导出全流程自动化闭环",
      "使用无限画布组织商品图、卖点说明与场景素材，制作高质感商品详情图",
      "结合商品特点编写精细化 Prompt，产出可直接投放短视频平台的成品素材",
      "支持接入飞书多维表格与淘宝商家批量内容交付"
    ],
    stats: [
      { label: "流程状态", value: "已跑通全流程" },
      { label: "短视频播放", value: "111.5 万+" },
      { label: "交付标准", value: "商用投放级" }
    ]
  },

  // 9. CORTIS 周边跨境采购与社群销售 (NO live demo - commercial practice)
  {
    id: "cross-border-ecommerce",
    name: "CORTIS 周边跨境采购与海外营销实践",
    description: "深度对接韩国周边供应商与跨境物流集运，通过社交平台触达粉丝与公域获客，推动私域下单转化与社群维护，实现盈利商业闭环。",
    category: "海外商业与运营",
    tags: [
      { name: "韩国供应链对接", color: "#0f172a" },
      { name: "跨境物流协调", color: "#ca8a04" },
      { name: "社群获客与复盘", color: "#059669" },
      { name: "累计盈利 2000+", color: "#e11d48" },
    ],
    gradient: "from-amber-500 via-orange-600 to-rose-600",
    source_code_link: "https://github.com/Shirleypp012",
    // 未提供在线演示，不展示演示入口
    highlights: [
      "长期对接韩国供应商确认采购配额、排期与跨境物流，协调报关与国内履约",
      "结合粉丝垂直消费偏好持续优化资讯与商品内容，公域获客向私域高效转化",
      "运用 AI 工具辅助订单与物流信息整理，累计经营利润 2,000+ 元"
    ],
    stats: [
      { label: "经营利润", value: "2,000+ 元" },
      { label: "供应链", value: "韩国直采" },
      { label: "运营形态", value: "跨境社群" }
    ]
  }
];
