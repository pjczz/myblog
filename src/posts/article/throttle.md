icon: edit
date: 2022-04-04
category:
  - CategoryA
  - CategoryB
tag:
  - tag A
  - tag B

# 节流防抖和深浅拷贝和 获取当前页面url

## 节流

### 1.每隔一段时间，只执行一次函数。

```javascript
function throttle(fn, delay) {
var timer;
return function () {
var _this = this;
var args = arguments;
if (timer) {
return;
}
timer = setTimeout(function () {
fn.apply(_this, args);
timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，
throttle触发可以进入计时器
}, delay)
}
}
```



### 时间戳实现节流函数：

```javascript
function throttle(fn, delay) {
var previous = 0;
// 使用闭包返回一个函数并且用到闭包函数外面的变量previous
return function() {
var _this = this;
var args = arguments;
var now = new Date();
if(now - previous > delay) {
fn.apply(_this, args);
previous = now;
}
}
}

```



## 防抖

**在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。**

```javascript
function debounce(fn, delay) { var timer; // 维护一个 timer 
return function () { var _this = this; 
// 取debounce执行作用域的this 
var args = arguments; if (timer) { clearTimeout(timer); } timer = setTimeout(function () { fn.apply(_this, args);
// 用apply指向调用debounce的对象，相当于 _this.fn(args); 
}, delay); }; } 
```

## 异同比较 

### 相同点： 

**都可以通过使用 setTimeout 实现。 目的都是，降低回调执行频率。节省计算资源。**

###  不同点： 

**函数防抖，在一段连续操作结束后，处理回调，利用clearTimeout 和 setTimeout实现。**

**函数节 流，在一段连续操作中，每一段时间只执行一次，频率较高的事件中使用来提高性能。 **

**函数防抖关注一定时间连续触发的事件只在最后执行一次，而函数节流侧重于一段时间内只执行一 次。**

## 深浅拷贝

### 定义：

**浅拷贝和深拷贝都只针对于引用数据类型，浅拷贝只复制指向某个对象的指针，而不复制对象本身，新 旧对象还是共享同一块内存；但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存， 修改新对象不会改到原对象；**

### 区别：

**浅拷贝只复制对象的第一层属性、深拷贝可以对对象的属性进行递归复制； 实现浅拷贝方法**

### 实现浅拷贝方法：

**Object.assign方法**

**for in方法**

### 实现深拷贝方法

#### （1）采用递归去拷贝所有层级属性

```javascript
function deepClone(obj){
let objClone = Array.isArray(obj)?[]:{};
if(obj && typeof obj==="object"){
for(key in obj){
if(obj.hasOwnProperty(key)){
//判断ojb子元素是否为对象，如果是，递归复制
if(obj[key]&&typeof obj[key] ==="object"){
objClone[key] = deepClone(obj[key]);
}else{
//如果不是，简单复制
objClone[key] = obj[key];
}
}
}
}
return objClone;
}
let a=[1,2,3,4],
b=deepClone(a);
a[0]=2;
console.log(a,b)；
```



#### （2）使用JSON.stringify和JSON.parse实现深拷贝：

**JSON.stringify把对象转成字符串，再用 JSON.parse把字符串转成新的对象；**

```javascript
function deepCopy(obj1){
let _obj = JSON.stringify(obj1);
let obj2 = JSON.parse(_obj);
return obj2;
}
var a = [1, [1, 2], 3, 4];
var b = deepCopy(a);
b[1][0] = 2;
alert(a); // 1,1,2,3,4
alert(b); // 2,2,2,3,4

```

#### （3）热门的函数库lodash，也有提供_.cloneDeep用来做深拷贝；

```javascript
var _ = require('lodash');
var obj1 = {
a: 1,
b: { f: { g: 1 } },
c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);
// false
```

## 获取当前页面URL

\1. window.location.href (设置或获取整个 URL 为字符串)

\2. window.location.protocol (设置或获取 URL 的协议部分）

\3. window.location.host (设置或获取 URL 的主机部分)

\4. window.location.port (设置或获取与 URL 关联的端口号码)

\5. window.location.pathname (设置或获取与 URL 的路径部分（就是文件地址）)

\6. window.location.search (设置或获取 href 属性中跟在问号后面的部分)

\7. window.location.hash (设置或获取 href 属性中在井号“#”后面的分段)

\8. js获取url中的参数值* 正则法

```javascript
function getQueryString(name) {
var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
var r = window.location.search.substr(1).match(reg);
if (r != null) {
return unescape(r[2]);
}
return null;
}
// 这样调用：
alert(GetQueryString("参数名1"));
alert(GetQueryString("参数名2"));
alert(GetQueryString("参数名3"));
```

split拆分法

```javascript
function GetRequest() {
var url = location.search; //获取url中"?"符后的字串
var theRequest = new Object();
if (url.indexOf("?") != -1) {
var str = url.substr(1);
strs = str.split("&");
for(var i = 0; i < strs.length; i ++) {
theRequest[strs[i].split("=")[0]] =
unescape(strs[i].split("=")[1]);
}
}
return theRequest;
}
var Request = new Object();
Request = GetRequest();<br>// var id=Request["id"];
// var 参数1,参数2,参数3,参数N;
// 参数1 = Request['参数1'];
// 参数2 = Request['参数2'];
// 参数3 = Request['参数3'];
// 参数N = Request['参数N'];
```

