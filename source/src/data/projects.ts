// ============================================
// 项目数据 - 在这里添加你的项目
// ============================================
// 每个项目会生成：
//   - 首页一个横向预览卡片
//   - 一个 /project/:id 详情页
//
// 添加新项目：
//   1. 在数组末尾添加一个对象
//   2. 确保 id 唯一
//   3. 图片放到 public/assets/projects/ 目录下
// ============================================

export interface Project {
  id: string;
  index: string;        // 显示编号，如 "01"
  title: string;        // 项目标题
  subtitle: string;     // 一句话描述（卡片上显示）
  description: string;  // 详细描述（详情页显示）
  techStack: string[];  // 技术栈标签
  features: string[];   // 关键特性列表
  links: {              // 外部链接
    label: string;
    url: string;
  }[];
  coverImage?: string;  // 封面图路径（可选）
}

export const projects: Project[] = [
  {
    id: "voice-agent",
    index: "01",
    title: "双Agent语音驱动自动化系统",
    subtitle: "Voice Agent + Computer Agent 异步协同",
    description:
      "针对低空飞行计划申报场景，设计Voice Agent与Computer Agent双线程异步协同系统，解决单Agent架构下浏览器多模态推理阻塞语音链路的问题，实现边讲边填、随时纠偏的语音驱动自动化体验。",
    techStack: ["Python", "GPT-4o-Vision", "Browser-use", "异步并发", "消息队列"],
    features: [
      "Voice Agent与Computer Agent双线程异步协同架构设计",
      "双队列消息总线与跨Agent通信协议定义",
      "Prompt驱动四步业务工作流与状态同步",
      "集成Silero VAD + 流式LLM + 流式TTS实时语音交互",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/llz0519" },
    ],
  },
  {
    id: "rag-search",
    index: "02",
    title: "多模态RAG个人影像搜索引擎",
    subtitle: "自然语言搜图、以图搜图、时间语义查询",
    description:
      "面向本地相册的多模态检索系统，支持自然语言搜图、以图搜图、上传临时图片检索，以及「去年夏天傍晚」等时间语义查询。",
    techStack: ["Python", "GPT-4o", "Qwen-v4", "FAISS", "Elasticsearch"],
    features: [
      "自然语言搜图、以图搜图、时间语义查询",
      "Vision结构化分析 → EXIF → Embedding → FAISS批处理索引",
      "QueryFormatter + TimeParser + FAISS向量与ES BM25融合检索",
      "77张图全量索引535s，Vision占72%，索引成功率100%",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/llz0519" },
    ],
  },
];

// 通过 id 查找项目
export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
