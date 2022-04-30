 icon: edit
date: 2022-04-04
category:
  - CategoryA
  - CategoryB
tag:
  - tag A
  - tag B
 
 
 # 浏览器几点补充说明



**1.async和defer的作用是什么？有什么区别?**

接下来我们对比下 defer 和 async 属性的区别：

<img src="https://pic4.zhimg.com/v2-909c198b7ef020ad8529cfa97f4ffd6f_r.jpg">

其中蓝色线代表JavaScript加载；红色线代表JavaScript执行；绿色线代表 HTML 解析。

**1）情况1<script src="script.js"></script>**

没有 defer 或 async，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。

**2）情况2 <script defer src="script.js"></script>(延迟执行)**

defer 属性表示延迟执行引入的 JavaScript，即这段 JavaScript 加载时 HTML 并未停止解析，这两个过程是并行的。整个 document 解析完毕且 defer-script 也加载完成之后（这两件事情的顺序无关），会执行所有由 defer-script 加载的 JavaScript 代码，然后触发 DOMContentLoaded 事件。

**3）情况3<script async src="script.js"></script> (异步下载)**

async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行——无论此刻是 HTML 解析阶段还是 DOMContentLoaded 触发之后。需要注意的是，这种方式加载的 JavaScript 依然会阻塞 load 事件。换句话说，async-script 可能在 DOMContentLoaded 触发之前或之后执行，但一定在 load 触发之前执行。

defer 与相比普通 script，有两点区别：载入 JavaScript 文件时不阻塞 HTML 的解析，执行阶段被放到 HTML 标签解析完成之后。 在加载多个JS脚本的时候，async是无顺序的加载，而defer是有顺序的加载。

**2.为什么操作 DOM 慢**

把 DOM 和 JavaScript 各自想象成一个岛屿，它们之间用收费桥梁连接。——《高性能 JavaScript》

JS 是很快的，在 JS 中修改 DOM 对象也是很快的。在JS的世界里，一切是简单的、迅速的。但 DOM 操作并非 JS 一个人的独舞，而是两个模块之间的协作。

因为 DOM 是属于渲染引擎中的东西，而 JS 又是 JS 引擎中的东西。当我们用 JS 去操作 DOM 时，本质上是 JS 引擎和渲染引擎之间进行了“跨界交流”。这个“跨界交流”的实现并不简单，它依赖了桥接接口作为“桥梁”（如下图）。

<img src="https://pic2.zhimg.com/80/v2-6793a821ad983860b7567eec4166fe79_720w.jpg">

#### 性能优化策略

基于上面介绍的浏览器渲染原理，DOM 和 CSSOM 结构构建顺序，初始化可以对页面渲染做些优化，提升页面性能。

- JS优化： `<script>` 标签加上 defer属性 和 async属性 用于在不阻塞页面文档解析的前提下，控制脚本的下载和执行。 defer属性： 用于开启新的线程下载脚本文件，并使脚本在文档解析完成后执行。 async属性： HTML5新增属性，用于异步下载脚本文件，下载完毕立即解释执行代码。
- CSS优化：`<link>`标签的 rel属性 中的属性值设置为 preload 能够让你在你的HTML页面中可以指明哪些资源是在页面加载完成后即刻需要的,最优的配置加载顺序，提高渲染性能