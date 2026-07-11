# 轻松吃透 Spring 核心：IoC 与 AOP 极简入门

在学习 Java 后端开发时，Spring 框架是绕不开的核心技术栈。Spring 最核心的两个基石——**IoC（控制反转）**与 **AOP（面向切面编程）**——不仅是框架的设计哲学，也是理解后续 Spring Boot、Spring Cloud 等技术的前提。

本文抛开复杂的企业级分层架构，以**数据库配置（DataConfig）**和**计算器（Calculator）**两个最小化示例，直接呈现 IoC 与 AOP 要解决的核心问题及其使用方式。

---

## 一、IoC 与 AOP 解决了什么问题

### 1.1 控制反转（IoC）

在传统开发模式下，对象的创建由开发者手动控制：

```java
DataConfig config = new DataConfig();
config.setUrl("jdbc:mysql://localhost:3306/mydb");
config.setDriverName("com.mysql.cj.jdbc.Driver");
// ...
```

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

```java
package com.southwind.ioc;

import lombok.Data;

@Data
public class DataConfig {
    private String url;
    private String driverName;
    private String username;
    private String password;
}
```

`@Data` 注解由 Lombok 提供，自动生成 getter、setter 及 `toString` 方法。

### 2.2 编写 spring.xml

在 `resources` 目录下创建配置文件：

```xml
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
```

`<bean>` 标签声明受容器管理的对象，`<property>` 标签完成属性注入。Spring 通过反射调用对应 setter 方法完成赋值。

### 2.3 启动容器并获取 Bean

```java
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
```

`ClassPathXmlApplicationContext` 从类路径加载 XML 配置，初始化容器后通过 `getBean` 获取已装配完成的实例。

---

## 三、IoC 实践：基于注解配置（两种方式）

注解配置摆脱了 XML 文件，是现代 Spring 开发的主流方式。基于注解的实现有两条路径：

| 方式 | 核心注解 | 特点 |
|------|---------|------|
| **配置类 + `@Bean`** | `@Configuration`、`@Bean` | 手动声明 Bean，与 XML `<bean>` 逻辑等价，适合第三方库类的注册 |
| **扫包 + 类注解** | `@ComponentScan`、`@Component` | 自动扫描并注册，适合自定义业务类 |

### 方式一：配置类 + `@Bean` 显式定义

在配置类中通过方法返回 Bean 实例，Spring 自动将返回值注册为容器中的 Bean。这种方式与 XML 配置在逻辑上等价，只是形式不同。

```java
package com.southwind.ioc;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration  // 声明该类为配置类
public class BeanConfig {

    @Bean  // 手动声明一个名为 dataConfig 的 Bean
    public DataConfig dataConfig() {
        DataConfig config = new DataConfig();
        config.setUrl("jdbc:mysql://localhost:3306/mydb");
        config.setDriverName("com.mysql.cj.jdbc.Driver");
        config.setUsername("root");
        config.setPassword("123456");
        return config;
    }
}
```

启动容器：

```java
public class TestBeanConfig {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(BeanConfig.class);
        
        DataConfig config = context.getBean(DataConfig.class);
        System.out.println(config);
    }
}
```

> 这种方式下，`DataConfig` 类本身**不需要**添加 `@Component` 注解。Bean 的创建完全由配置类掌控，适合注册第三方库中的类（如数据源 `DataSource`、模板引擎等无法修改源码的类）。

### 方式二：扫包 + `@Component` 自动扫描

核心是让 Spring 自动扫描指定包下的注解类并完成注册。

**改造 DataConfig 类：**

```java
package com.southwind.ioc;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component  // 声明该类受 Spring 容器管理
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
```

**配置类开启扫描：**

```java
package com.southwind.ioc;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("com.southwind.ioc")  // 自动扫描当前包及子包下的 @Component
public class AppConfig {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);
        
        DataConfig config = context.getBean(DataConfig.class);
        System.out.println(config);
    }
}
```

> 这种方式下，**每个需要被管理的类自身**要打上 `@Component`（或其派生注解 `@Service`、`@Repository`、`@Controller`），Spring 通过扫包自动发现并注册。适合项目中的自定义业务类。

### 两种方式怎么选？

| 场景 | 推荐方式 | 原因 |
|------|---------|------|
| 自定义业务类（Service、DAO 等） | 扫包 + `@Component` | 类是自己写的，可以直接贴注解，代码更简洁 |
| 第三方库的类（DataSource、SqlSessionFactory 等） | 配置类 + `@Bean` | 无法修改第三方源码，只能在配置类中手动声明 |
| 需要精细控制 Bean 的创建过程 | 配置类 + `@Bean` | 可以在方法中编写创建逻辑（如条件判断、多步初始化） |

---

## 四、AOP 实践：日志切面

### 4.1 目标业务类

```java
package com.southwind.ioc;

import org.springframework.stereotype.Component;

@Component
public class Calculator {
    public int add(int a, int b) {
        System.out.println("--- 正在执行核心计算逻辑 ---");
        return a + b;
    }
}
```

### 4.2 编写切面类

```java
package com.southwind.ioc;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

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
```

关键点解析：

- `@Aspect`：标识该类为切面，需配合 `aspectjweaver` 依赖使用
- `@Before` / `@After`：分别声明前置通知与后置通知
- `execution(* com.southwind.ioc.Calculator.*(..))`：切点表达式，匹配 `Calculator` 类下所有方法

### 4.3 启用 AOP 自动代理

在配置类上添加 `@EnableAspectJAutoProxy`：

```java
@Configuration
@ComponentScan("com.southwind.ioc")
@EnableAspectJAutoProxy
public class AppConfig {}
```

该注解指示 Spring 为匹配切点表达式的目标 Bean 生成动态代理对象。默认使用 JDK 动态代理（目标类实现接口时）或 CGLIB 子类代理。

### 4.4 运行结果

当调用 `calculator.add(1, 2)` 时，实际执行流程为：

```
[日志通知] 计算开始，准备执行...
--- 正在执行核心计算逻辑 ---
[日志通知] 计算结束！
Result: 3
```

日志逻辑与计算逻辑完全分离，后续若需调整日志格式或移除日志，仅需修改 `LogAspect`，无需触碰 `Calculator` 源码。

---

## 五、IoC 与 AOP 的关系

| 维度 | IoC | AOP |
|------|-----|-----|
| 核心职责 | 对象生命周期管理与依赖装配 | 横切关注点的模块化与动态织入 |
| 解决的问题 | 对象创建耦合 | 代码重复与逻辑混杂 |
| 技术实现 | 反射 + 工厂模式 | 动态代理（JDK / CGLIB） |
| 典型注解 | `@Component`, `@Value`, `@Autowired` | `@Aspect`, `@Before`, `@After`, `@Around` |

两者共同支撑 Spring **低耦合、高内聚**的设计目标：IoC 管理对象"怎么来"，AOP 管理功能"怎么加"。

---

## 六、总结

- **IoC/DI** 通过容器接管对象创建与依赖注入，消除了组件间的硬编码依赖。XML 配置适合理解底层注入原理，注解配置更适合生产环境开发。基于注解又有两种实现路径：`@Bean` 显式声明适合第三方类注册，扫包 + `@Component` 适合自定义业务类。
- **AOP** 将横切关注点抽离为独立切面，在不侵入业务代码的前提下实现通用逻辑的复用。Spring AOP 基于动态代理实现，适用于方法级的拦截场景。
- 掌握这两个机制后，再去理解 Spring 的事务管理（`@Transactional`）、声明式缓存、安全控制等功能，会发现它们本质上都是 IoC 与 AOP 的组合应用。
