export interface Post {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
}

export const posts: Post[] = [
  {
    id: "spring-ioc-handwritten",
    slug: "spring-ioc-handwritten",
    title: "从零手写注解，实现一个简易的 Spring IoC 容器",
    category: "后端",
    date: "2025.04.20",
    excerpt: "不依赖任何第三方框架，仅用 Java 原生的注解和反射，一步步构建一个拥有自动包扫描、Bean 自动注册功能的迷你 IoC 容器。",
  },
  {
    id: "spring-ioc-aop",
    slug: "spring-ioc-aop",
    title: "轻松吃透 Spring 核心：IoC 与 AOP 极简入门",
    category: "后端",
    date: "2025.04.15",
    excerpt: "在学习 Java 后端开发时，Spring 框架是绕不开的核心技术栈。本文以数据库配置和计算器两个最小化示例，直接呈现 IoC 与 AOP 要解决的核心问题及其使用方式。",
  },
  {
    id: "ml-intro",
    slug: "machine-learning-intro",
    title: "机器学习简介：从监督学习到无监督学习",
    category: "AI",
    date: "2025.03.28",
    excerpt: "机器学习的应用在我们的生活中无处不在——搜索引擎排序、购物推荐、语音转文字，背后都有机器学习的身影。本文介绍机器学习的基本概念和两大主要类型。",
  },
  {
    id: "linear-regression",
    slug: "linear-regression",
    title: "线性回归：从模型到梯度下降",
    category: "AI",
    date: "2025.03.20",
    excerpt: "以房价预测为例，介绍线性回归模型的基本思想、代价函数的定义，以及梯度下降法如何自动找到最优参数。",
  },
  {
    id: "logistic-regression",
    slug: "logistic-regression",
    title: "逻辑回归：从 sigmoid 到决策边界",
    category: "AI",
    date: "2025.03.15",
    excerpt: "逻辑回归是用于分类问题的模型，通过 sigmoid 函数估计样本属于正样本的概率。本文介绍逻辑回归模型、决策边界和梯度下降法在分类问题中的应用。",
  },
  {
    id: "neural-networks",
    slug: "neural-networks",
    title: "神经网络：从感知机到前向传播",
    category: "AI",
    date: "2025.03.10",
    excerpt: "神经网络是深度学习的基石。本文介绍神经网络的基本结构、前向传播算法，以及如何用链式法则理解反向传播。",
  },
  {
    id: "model-evaluation",
    slug: "model-evaluation",
    title: "模型诊断：如何评估你的机器学习模型",
    category: "AI",
    date: "2025.03.05",
    excerpt: "训练模型只是第一步，知道模型表现如何、哪里出了问题才是关键。本文介绍模型评估的核心指标和常见问题的诊断方法。",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
