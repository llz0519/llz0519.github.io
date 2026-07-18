// ============================================
// 博客文章数据 - 在这里添加你的文章
// ============================================
//
// 添加新文章：
//   1. 在 posts 数组开头添加一个对象（最新的在前面）
//   2. id 唯一，slug 是 URL 友好的标识
//   3. content 支持 Markdown 格式
// ============================================

export interface Post {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;      // 文章摘要（列表页显示）
  content: string;      // 完整内容（详情页显示，支持 Markdown）
}

export const posts: Post[] = [
  {
    id: "spring-ioc-aop",
    slug: "spring-ioc-aop",
    title: "轻松吃透 Spring 核心：IoC 与 AOP 极简入门",
    category: "后端",
    date: "2025.04.15",
    excerpt:
      "在学习 Java 后端开发时，Spring 框架是绕不开的核心技术栈。本文以数据库配置和计算器两个最小化示例，直接呈现 IoC 与 AOP 要解决的核心问题及其使用方式。",
    content: `# 轻松吃透 Spring 核心：IoC 与 AOP 极简入门

在学习 Java 后端开发时，Spring 框架是绕不开的核心技术栈。Spring 最核心的两个基石——**IoC（控制反转）**与 **AOP（面向切面编程）**——不仅是框架的设计哲学，也是理解后续 Spring Boot、Spring Cloud 等技术的前提。

本文抛开复杂的企业级分层架构，以**数据库配置（DataConfig）**和**计算器（Calculator）**两个最小化示例，直接呈现 IoC 与 AOP 要解决的核心问题及其使用方式。

---

## 一、IoC 与 AOP 解决了什么问题

### 1.1 控制反转（IoC）

在传统开发模式下，对象的创建由开发者手动控制：

\`\`\`java
DataConfig config = new DataConfig();
config.setUrl("jdbc:mysql://localhost:3306/mydb");
config.setDriverName("com.mysql.cj.jdbc.Driver");
// ...
\`\`\`

当项目规模扩大，这种手动创建方式会导致两个问题：

- **耦合严重**：调用方必须知道被调用方的构造细节
- **维护困难**：依赖关系变更时，需要逐处修改代码

IoC 的本质是将**对象创建与依赖关系管理的控制权**从程序代码转移给外部容器。Spring 容器负责实例化对象、注入依赖，开发者只需声明"我需要什么"，而无需关心"它怎么来"。

### 1.2 依赖注入（DI）

DI 是实现 IoC 的具体技术手段。Spring 容器在运行时自动将依赖对象或属性值"注入"到目标组件中。注入方式主要有两种：

- **构造器注入**：通过构造函数传入依赖
- **设值注入**：通过 setter 方法或字段反射注入属性值

### 1.3 面向切面编程（AOP）

在业务开发中，日志记录、权限校验、性能监控等**横切关注点**往往散落在多个业务方法中。传统做法是在每个方法内重复编写这些辅助代码，导致：

- 业务逻辑与非功能性代码混杂
- 代码冗余度高，修改成本大

AOP 允许将这些横切关注点抽取为独立的**切面（Aspect）**，通过声明式配置在指定连接点动态织入，实现业务代码与通用逻辑的解耦。

---

## 二、IoC 实践：基于 XML 配置

XML 配置虽非当下主流，但能最直观地展示 Spring 容器的属性注入机制。

### 2.1 定义配置类

\`\`\`java
package com.southwind.ioc;

import lombok.Data;

@Data
public class DataConfig {
    private String url;
    private String driverName;
    private String username;
    private String password;
}
\`\`\`

\`@Data\` 注解由 Lombok 提供，自动生成 getter、setter 及 \`toString\` 方法。

### 2.2 编写 spring.xml

在 \`resources\` 目录下创建配置文件：

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="dataConfig" class="com.southwind.ioc.DataConfig">
        <property name="url" value="jdbc:mysql://localhost:3306/mydb" />
        <property name="driverName" value="com.mysql.cj.jdbc.Driver" />
        <property name="username" value="root" />
        <property name="password" value="123456" />
    </bean>

</beans>
\`\`\`

\`<bean>\` 标签声明受容器管理的对象，\`<property>\` 标签完成属性注入。Spring 通过反射调用对应 setter 方法完成赋值。

### 2.3 启动容器并获取 Bean

\`\`\`java
package com.southwind.ioc;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestXml {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");
        DataConfig config = context.getBean("dataConfig", DataConfig.class);
        System.out.println(config);
    }
}
\`\`\`

\`ClassPathXmlApplicationContext\` 从类路径加载 XML 配置，初始化容器后通过 \`getBean\` 获取已装配完成的实例。

---

## 三、IoC 实践：基于注解配置（两种方式）

注解配置摆脱了 XML 文件，是现代 Spring 开发的主流方式。

| 方式 | 核心注解 | 特点 |
|------|---------|------|
| **配置类 + \`@Bean\`** | \`@Configuration\`、\`@Bean\` | 手动声明 Bean，适合第三方库类的注册 |
| **扫包 + 类注解** | \`@ComponentScan\`、\`@Component\` | 自动扫描并注册，适合自定义业务类 |

### 方式一：配置类 + \`@Bean\` 显式定义

\`\`\`java
@Configuration
public class BeanConfig {
    @Bean
    public DataConfig dataConfig() {
        DataConfig config = new DataConfig();
        config.setUrl("jdbc:mysql://localhost:3306/mydb");
        config.setDriverName("com.mysql.cj.jdbc.Driver");
        config.setUsername("root");
        config.setPassword("123456");
        return config;
    }
}
\`\`\`

### 方式二：扫包 + \`@Component\` 自动扫描

\`\`\`java
@Data
@Component
public class DataConfig {
    @Value("jdbc:mysql://localhost:3306/mydb")
    private String url;
    @Value("com.mysql.cj.jdbc.Driver")
    private String driverName;
    @Value("root")
    private String username;
    @Value("123456")
    private String password;
}
\`\`\`

---

## 四、AOP 实践：日志切面

### 4.1 目标业务类

\`\`\`java
@Component
public class Calculator {
    public int add(int a, int b) {
        System.out.println("--- 正在执行核心计算逻辑 ---");
        return a + b;
    }
}
\`\`\`

### 4.2 编写切面类

\`\`\`java
@Aspect
@Component
public class LogAspect {
    @Before("execution(* com.southwind.ioc.Calculator.*(..))")
    public void before() {
        System.out.println("[日志通知] 计算开始，准备执行...");
    }

    @After("execution(* com.southwind.ioc.Calculator.*(..))")
    public void after() {
        System.out.println("[日志通知] 计算结束！");
    }
}
\`\`\`

### 4.3 启用 AOP 自动代理

\`\`\`java
@Configuration
@ComponentScan("com.southwind.ioc")
@EnableAspectJAutoProxy
public class AppConfig {}
\`\`\`

---

## 五、总结

- **IoC/DI** 通过容器接管对象创建与依赖注入，消除了组件间的硬编码依赖
- **AOP** 将横切关注点抽离为独立切面，在不侵入业务代码的前提下实现通用逻辑的复用
- 掌握这两个机制后，再去理解 Spring 的事务管理、声明式缓存、安全控制等功能，会发现它们本质上都是 IoC 与 AOP 的组合应用`,
  },
  {
    id: "ml-intro",
    slug: "machine-learning-intro",
    title: "机器学习简介：从监督学习到无监督学习",
    category: "AI",
    date: "2025.03.28",
    excerpt:
      "机器学习的应用在我们的生活中无处不在——搜索引擎排序、购物推荐、语音转文字，背后都有机器学习的身影。本文介绍机器学习的基本概念和两大主要类型。",
    content: `# 机器学习简介：从监督学习到无监督学习

机器学习的应用在我们的生活中无处不在。

当你在百度这一类搜索引擎中搜索怎么做西红柿炒鸡蛋，你会得到一系列的搜索结果，而这些结果的排序使用到了机器学习。当你在购物软件买过或者搜索过某些商品时，软件可能使用机器学习方法向你推荐可能喜欢的东西。当你使用手机上的语音转文字的功能时，那也用到了机器学习。此外，在工业、医疗等领域，都会用到机器学习。

---

## 1.1 机器学习是什么？

机器学习是一门在**没有明确编程的情况下让计算机学习**的科学。

我们学过的排序算法、最短路径算法等，这些有明确规则的算法，可以根据算法原理去编程实现。但是在一些复杂的领域，比如自动驾驶，我们没有办法去编程实现，所以需要让一台机器自己去学会做这些事。

机器学习的两种主要类型是**监督学习（Supervised Learning）**和**无监督学习（Unsupervised Learning）**。强化学习（Reinforcement Learning）是另一种机器学习算法。

---

## 1.2 监督学习

监督学习是学习 X→Y 的映射关系的算法。监督学习中提供给算法的示例（数据）要包含正确答案，即正确的标签 Y，通过不断地学习，算法学到 X→Y 的映射关系。

监督学习主要分为**分类（Classification）**和**回归（Regression）**两类。

**回归案例**：根据房屋面积预测房屋价格。图中红色的叉是给定的样本数据，它包含房屋面积（X）和房屋价格（Y）。回归指我们试图从无数可能的数字中预测一个数字。

**分类案例**：乳腺癌预测。给定一些数据，包括肿瘤的大小（X）和肿瘤的性质（Y，良性/恶性）。分类的输出只有有限种可能。

---

## 1.3 无监督学习

在无监督学习中，给定的样本数据仅有输入 X 而不包含输出标签 Y，算法必须在数据中找到一些结构或模式。

**聚类算法**将未标记的数据放入不同的集群中。聚类算法有很多应用，比如 Google News 将每天数十万篇新闻文章的相关内容组合在一起。

此外，还有一些其他常用的无监督学习算法：
- **异常检测**：用于检测异常事件，可用于金融系统中的欺诈检测
- **数据降维**：将一个大数据集压缩成一个小得多的数据集，同时丢失尽可能少的信息`,
  },
  {
    id: "linear-regression",
    slug: "linear-regression",
    title: "线性回归：从模型到梯度下降",
    category: "AI",
    date: "2025.03.20",
    excerpt:
      "以房价预测为例，介绍线性回归模型的基本思想、代价函数的定义，以及梯度下降法如何自动找到最优参数。",
    content: `# 线性回归：从模型到梯度下降

## 2.1 线性回归模型

以房价预测为例。首先介绍机器学习中常用的术语：

1. **数据集（Dataset）**：用于训练和评估机器学习模型的数据集合
2. **输入特征 x（input）**：用于描述输入数据的变量或属性
3. **输出目标 y（output）**：希望模型预测的目标值（标签）
4. **m**：数据集训练样本的总数

机器学习的训练和工作的过程：将训练集给到训练算法中，经过训练得到一个公式 f，这个公式就是所谓的**模型（model）**，再将测试集的 x 输入到模型，模型会给出一个对目标 y 的估计或预测。

假设 f 是一条直线：f_w,b(x) = wx + b

学习算法通过不断学习来确定参数 w 和 b，这就是机器学习的训练过程。

---

## 2.2 代价函数（Cost Function）

为了实现线性回归，需要定义一个**代价函数**来告诉我们模型的运行情况。

参数 w 和 b 有时也被称为系数（coefficient）或权重（weight）。

**均方误差代价函数**：

J(w,b) = (1/2m) * Σ(f_w,b(xⁱ) - yⁱ)²

线性回归的目标是要找到使代价函数最小化的 w 和 b 的值。

---

## 2.3 梯度下降法（Gradient Descent）

梯度下降法是一种用于尝试最小化任何函数的算法，不仅用于线性回归，也用于训练一些最复杂的人工智能模型。

repeat until convergence:
  w = w - α * (∂J/∂w)
  b = b - α * (∂J/∂b)

其中 α 是**学习率**，控制每次更新的步长。学习率太小会导致收敛速度慢，学习率太大会导致代价函数发散。`,
  },
  {
    id: "logistic-regression",
    slug: "logistic-regression",
    title: "逻辑回归：从 sigmoid 到决策边界",
    category: "AI",
    date: "2025.03.15",
    excerpt:
      "逻辑回归是用于分类问题的模型，通过 sigmoid 函数估计样本属于正样本的概率。本文介绍逻辑回归模型、决策边界和梯度下降法在分类问题中的应用。",
    content: `# 逻辑回归：从 sigmoid 到决策边界

## 3.1 逻辑回归模型

回归问题的目标是从无数种可能的数值中预测一个数字，接下来介绍用于**分类问题**的模型。

通常线性回归模型不适合做分类任务，因此引入另外一种模型：**逻辑回归（Logistic Regression）**。

垃圾邮件分类、肿瘤判断都属于**二分类（Binary Classification）**问题。二分类问题中的类别可以用 0 和 1 表示，0 表示负类（Negative Class），1 表示正类（Positive Class）。

---

## 3.2 sigmoid 函数

逻辑回归用 **sigmoid 函数** 估计出样本属于正样本的概率：

g(z) = 1 / (1 + e⁻ᶻ)

sigmoid 函数的取值范围是 0~1，当 x=0 时，y=0.5。

使用 sigmoid 函数构建逻辑回归模型的步骤：

**第一步**：用一个线性函数将输入特征向量映射成一个实数 z：z = w·x + b

**第二步**：将 z 作为输入给到 sigmoid 函数：f(x) = g(z) = g(w·x + b)

---

## 3.3 决策边界（Decision Boundary）

逻辑回归模型输出一个概率，那么如何根据这个概率判断其标签是 0 还是 1？

通常设置阈值为 0.5：
- 当概率 ≥ 0.5 时，预测标签是 1
- 当概率 < 0.5 时，预测标签是 0

在 sigmoid 函数中，z=0 的位置函数值是 0.5，所以 w·x + b = 0 这条线就是**决策边界**。

---

## 3.4 逻辑回归中的梯度下降法

逻辑回归的代价函数（对数损失）：

J(w,b) = -(1/m) * Σ [yⁱ·log(f(xⁱ)) + (1-yⁱ)·log(1-f(xⁱ))]

这个损失函数是通过概率论中的**最大似然估计**推理出来的，得到的代价函数是一个凸函数，便于使用梯度下降法进行求解。`,
  },
  {
    id: "neural-networks",
    slug: "neural-networks",
    title: "神经网络：从感知机到前向传播",
    category: "AI",
    date: "2025.03.10",
    excerpt:
      "神经网络是深度学习的基石。本文介绍神经网络的基本结构、前向传播算法，以及如何用链式法则理解反向传播。",
    content: `# 神经网络：从感知机到前向传播

## 4.1 神经网络的基本结构

神经网络由**输入层、隐藏层和输出层**组成。每一层包含若干个神经元（节点），相邻层之间的神经元通过权重连接。

**感知机（Perceptron）**是最简单的神经网络单元，接收多个输入，加权求和后通过激活函数输出。

---

## 4.2 前向传播（Forward Propagation）

前向传播是神经网络计算输出的过程：

1. 输入层接收特征向量 x
2. 每一层计算：z = W·a + b，然后 a = g(z)
3. 输出层给出最终预测结果

其中 g 是**激活函数**，常用的有：
- **ReLU**：g(z) = max(0, z)
- **sigmoid**：g(z) = 1 / (1 + e⁻ᶻ)
- **tanh**：g(z) = (eᶻ - e⁻ᶻ) / (eᶻ + e⁻ᶻ)

---

## 4.3 反向传播（Backpropagation）

反向传播是训练神经网络的核心算法，通过**链式法则**计算代价函数对每个参数的梯度：

1. 先通过前向传播计算每一层的激活值
2. 从输出层开始，计算每一层的误差项 δ
3. 用 δ 计算代价函数对权重和偏置的梯度
4. 使用梯度下降更新参数

---

## 4.4 激活函数的选择

| 激活函数 | 优点 | 缺点 | 适用场景 |
|---------|------|------|---------|
| ReLU | 计算简单，缓解梯度消失 | 可能导致"神经元死亡" | 隐藏层默认选择 |
| sigmoid | 输出在 0~1 之间 | 梯度消失问题 | 输出层（二分类） |
| tanh | 输出在 -1~1 之间，零中心化 | 仍有梯度消失问题 | 隐藏层 |

ReLU 是目前最常用的隐藏层激活函数，因为它计算简单且能有效缓解梯度消失问题。`,
  },
  {
    id: "model-evaluation",
    slug: "model-evaluation",
    title: "模型诊断：如何评估你的机器学习模型",
    category: "AI",
    date: "2025.03.05",
    excerpt:
      "训练模型只是第一步，知道模型表现如何、哪里出了问题才是关键。本文介绍模型评估的核心指标和常见问题的诊断方法。",
    content: `# 模型诊断：如何评估你的机器学习模型

## 5.1 训练集 vs 测试集

在机器学习实践中，我们通常将数据集分为**训练集（Training Set）**和**测试集（Test Set）**：

- **训练集**：用于训练模型参数
- **测试集**：用于评估模型泛化能力

一个好的模型不仅要在训练集上表现好，更要在测试集上表现好——这称为**泛化能力（Generalization）**。

---

## 5.2 偏差与方差（Bias vs Variance）

**高偏差（Underfitting）**：模型过于简单，无法捕捉数据的规律。训练误差和测试误差都很大。

**高方差（Overfitting）**：模型过于复杂，记住了训练数据的噪声。训练误差很小，但测试误差很大。

| 问题 | 表现 | 解决方法 |
|------|------|---------|
| 欠拟合 | 训练误差大，测试误差大 | 增加模型复杂度、增加特征 |
| 过拟合 | 训练误差小，测试误差大 | 正则化、增加数据、简化模型 |

---

## 5.3 正则化（Regularization）

**L1 正则化（Lasso）**：在代价函数中添加参数绝对值之和

**L2 正则化（Ridge）**：在代价函数中添加参数平方和

正则化通过在代价函数中增加对参数大小的惩罚，防止模型过于复杂，从而缓解过拟合。

正则化后的代价函数：

J_regularized = J + λ * Σw²

其中 λ 是正则化参数，控制正则化的强度。

---

## 5.4 模型评估指标

**回归问题**：
- **MSE（均方误差）**：预测值与真实值差的平方的平均
- **RMSE（均方根误差）**：MSE 的平方根，与目标变量同量纲
- **MAE（平均绝对误差）**：预测值与真实值差的绝对值的平均
- **R² 分数**：模型解释数据变异的比例，1 为完美拟合

**分类问题**：
- **准确率（Accuracy）**：正确预测的样本占总样本的比例
- **精确率（Precision）**：预测为正类中真正为正类的比例
- **召回率（Recall）**：真正为正类中被正确预测的比例
- **F1 分数**：精确率和召回率的调和平均`,
  },
];

// 通过 slug 查找文章
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
