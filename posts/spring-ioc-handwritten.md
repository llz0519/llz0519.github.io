# 从零手写注解，实现一个简易的 Spring IoC 容器

## 导语

在 Java 开发中，Spring 框架的注解（如 `@Component`、`@Autowired`）几乎是每天都会打交道的工具。它们看似散发着神秘的"魔法"，但底层的运转逻辑其实非常朴素。

为了拆解这一机制，最好的办法就是自己动手写一个简易版的 Spring 容器。本文将不依赖任何第三方框架，仅用 Java 原生的注解和反射，带大家一步步构建一个拥有自动包扫描、Bean 自动注册功能的迷你 IoC 容器。

---

## 一、前置基础：静态对象（new）与 动态反射 的本质区别

在动手写代码前，我们必须先厘清一个底层问题：我们平时用 new 创建对象，和用动态反射创建对象，到底有什么区别？

| 特性 | 静态对象创建（new） | 动态反射创建（Reflection） |
|------|-------------------|--------------------------|
| 决定时期 | 编译期（Compile-time）：写代码时就已经定死了类型。 | 运行期（Runtime）：程序运行的时候才去决定创建什么类型。 |
| 耦合度 | 强耦合。如果类不存在，项目直接报错无法通过编译。 | 极低耦合。写代码时只需写一个"占位符"（如字符串），类不存在也能编译成功。 |
| 语法实现 | `UserService service = new UserService();` | `Class.forName("org.example.UserService").newInstance();` |
| 底层依据 | 依赖程序员在源码里写死的类型。 | 依赖运行时的配置信息（如配置文件、注解、用户输入）。 |
| 应用场景 | 适用于日常业务开发中，类型固定、关系明确的场景。 | 适用于通用框架开发，用于解耦和批量对象管理。 |

### 为什么手写 Spring 不能用 new？

因为 Spring 框架在多年前编写、打包并发布时，我们今天写的 UserService 类甚至都还没有被创建出来。

如果框架里用 new，代码就得写死：

```java
public Object getBean() {
    return new UserService(); // 无法通过编译，因为框架不知道 UserService 是什么
}
```

因此，框架必须采用动态反射。框架只保留一条通用的"对象创建流水线"，在运行期动态地将类加载并实例化：

```java
public Object getBean(String className) {
    // 只要运行期传来类名，不管是什么类，都能动态创建出来
    return Class.forName(className).getDeclaredConstructor().newInstance(); 
}
```

---

## 二、疑惑：直接反射不香吗？注解到底解决了什么问题？

既然用反射可以直接创建对象，那为什么还要定义注解、贴注解、判断注解？

如果我们的代码是这样写的：

```java
Class<?> clazz = Class.forName("org.example.UserService");
if (clazz.isAnnotationPresent(MyComponent.class)) {
    Object instance = clazz.getDeclaredConstructor().newInstance();
}
```

此时，因为类名 `"org.example.UserService"` 依然是硬编码写死在代码里的，注解确实形同鸡肋。

但当反射遇上"批量自动化扫描"时，注解就成了唯一的"通行证"和"过滤器"。

在一个真实的项目中，一个文件夹下存在各种各样的类：

- UserService（需要容器管理的业务类）
- User（普通数据实体类，不需要创建单例）
- StringUtils（工具类，不需要实例化）

当程序自动遍历该文件夹下所有的 .class 文件时，它面对的是一组未知的类群。程序如何知道哪些类该实例化，哪些该跳过？

此时，注解就起到了筛选的作用。程序逐一检查：

"你贴了 @MyComponent 标签吗？"

贴了就用反射实例化；没贴就直接忽略。

---

## 三、手把手编码实现

下面我们开始用 4 个步骤，正式构建这个自动化容器。

### 第一步：定义自定义注解 @MyComponent

在 org.example 包下，创建一个 Annotation 类，命名为 MyComponent：

```java
package org.example;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// 限制该注解只能用在类上
@Target(ElementType.TYPE)
// 确保注解在运行期（Runtime）依然保留，以便反射机制读取
@Retention(RetentionPolicy.RUNTIME)
public @interface MyComponent {
    // 允许给 Bean 起一个名字，默认是空字符串
    String value() default "";
}
```

### 第二步：编写业务类并贴上标签

我们编写两个普通的业务类，并用 @MyComponent 贴上标签。

#### 1. 创建 UserService.java

```java
package org.example;

@MyComponent("userService") // 贴上标签，命名为 userService
public class UserService {
    public UserService() {
        System.out.println(">>> UserService 对象已被创建！");
    }

    public void sayHello(String name) {
        System.out.println("Hello, " + name + "！这是来自 UserService 的问候。");
    }
}
```

#### 2. 创建 OrderService.java

```java
package org.example;

@MyComponent("orderService") // 贴上标签，命名为 orderService
public class OrderService {
    public OrderService() {
        System.out.println(">>> OrderService 对象已被创建！");
    }

    public void printOrder() {
        System.out.println("订单模块：您有一笔新的订单已生成。");
    }
}
```

### 第三步：编写核心容器 MyApplicationContext

在 org.example 下创建 MyApplicationContext.java。它是我们手写框架的核心，负责自动扫描包路径、过滤出带有 @MyComponent 的类并用反射进行批量实例化。

```java
package org.example;

import java.io.File;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MyApplicationContext {

    // 单例池：用于存储被容器管理的 Bean 实例（K: Bean名称, V: 实例对象）
    private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>();

    public MyApplicationContext(String packageName) {
        try {
            // 1. 将包名（如 org.example）转换为相对路径（如 org/example）
            String packagePath = packageName.replace(".", "/");

            // 2. 利用类加载器（ClassLoader）获取该包在磁盘上的绝对地址
            ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
            URL url = classLoader.getResource(packagePath);

            if (url == null) {
                System.out.println("未找到指定的包路径！");
                return;
            }

            // 对路径进行解码，防止路径中包含空格等特殊字符导致解析失败
            String folderPath = URLDecoder.decode(url.getFile(), StandardCharsets.UTF_8);
            File folder = new File(folderPath);

            // 3. 遍历这个文件夹下的所有文件
            if (folder.exists() && folder.isDirectory()) {
                File[] files = folder.listFiles();
                if (files != null) {
                    for (File file : files) {
                        // 我们只处理以 .class 结尾的字节码文件
                        if (file.getName().endsWith(".class")) {
                            // 4. 将文件名还原为完整的类名
                            // 例如 "UserService.class" -> "org.example.UserService"
                            String className = packageName + "." + file.getName().substring(0, file.getName().length() - 6);

                            // 5. 动态加载该类
                            Class<?> clazz = Class.forName(className);

                            // 6. 判断类上是否贴有自定义的 @MyComponent 注解
                            if (clazz.isAnnotationPresent(MyComponent.class)) {
                                MyComponent annotation = clazz.getAnnotation(MyComponent.class);

                                // 获取 Bean 的名字，若注解中未填写，则默认将类名首字母小写作为 Bean 名称
                                String beanName = annotation.value();
                                if (beanName.isEmpty()) {
                                    beanName = toLowerCaseFirstOne(clazz.getSimpleName());
                                }

                                // 7. 通过反射动态创建对象，并将其存入单例池 Map 中
                                Object instance = clazz.getDeclaredConstructor().newInstance();
                                singletonObjects.put(beanName, instance);
                                System.out.println("【容器初始化】自动扫描并注册 Bean: " + beanName + " -> " + clazz.getName());
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 提供对外获取 Bean 的接口
    public Object getBean(String beanName) {
        return singletonObjects.get(beanName);
    }

    // 辅助工具方法：将类名首字母转为小写
    private String toLowerCaseFirstOne(String s) {
        if (Character.isLowerCase(s.charAt(0))) {
            return s;
        } else {
            return Character.toLowerCase(s.charAt(0)) + s.substring(1);
        }
    }
}
```

### 第四步：测试运行

在 Main.java 中编写我们的启动类：

```java
package org.example;

public class Main {
    public static void main(String[] args) {
        System.out.println("====== 开始初始化 MySpring 容器 ======");

        // 1. 实例化我们的自定义容器，指定要扫描的包路径
        MyApplicationContext context = new MyApplicationContext("org.example");

        System.out.println("====== 容器初始化完成 ======
");

        // 2. 从容器中获取注册好的 Bean 并调用方法
        UserService userService = (UserService) context.getBean("userService");
        if (userService != null) {
            userService.sayHello("张三");
        }

        OrderService orderService = (OrderService) context.getBean("orderService");
        if (orderService != null) {
            orderService.printOrder();
        }
    }
}
```

---

## 四、运行效果展示

运行 Main 类的 main 方法后，控制台输出如下：

```
====== 开始初始化 MySpring 容器 ======
>>> OrderService 对象已被创建！
【容器初始化】自动扫描并注册 Bean: orderService -> org.example.OrderService
>>> UserService 对象已被创建！
【容器初始化】自动扫描并注册 Bean: userService -> org.example.UserService
====== 容器初始化完成 ======

Hello, 张三！这是来自 UserService 的问候。
订单模块：您有一笔新的订单已生成。
```

此时可以尝试在包下添加一个新的普通类（不加 @MyComponent 注解），运行后会发现它并没有被自动实例化，这也证实了注解在批量扫描中的过滤作用。

---

## 结语：写业务与写框架的思考

写业务：往往追求单点和直观，用 new 就能快速解决问题。

写框架：追求规则的制定和通用性。框架作者使用一次性的复杂（通用的反射、类加载与扫描机制），来换取业务开发过程中的长期简单（业务人员只需贴个注解即可）。

通过手写这几十行核心代码，我们可以清晰地看到，Spring 框架并没有深不可测的"魔法"，其核心完全建立在 Java 基础的反射机制之上。
