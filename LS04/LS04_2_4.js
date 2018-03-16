//第二周 星期四  今天2018年3月15号
/*
1.js语法、表达式及语句综述
*/
//字面量
var obj = {x:1,y:2};
var arr = [1,2,3,4,5];
//标识符与保留字
//arguments 函数实参大于形参时，多余的参数隐藏在arguments中
function f(a){
	console.log(a);
	console.log(arguments[1]);
	console.log(arguments[2]);
}
f(1,2,3);//123
//表达式与语句 表达式语句
var o = {x:1,y:2};
a>b;
// 存在二义性的语句，要避免有二义性的语句
var max = function (x,y) {
    return x>y?x:y;
};
// 下述代码是对象还是语句块
{
    foo:max(2,3)
}
// 存在二义性的语句 补充一
var max = function (x,y) {
    return x>y?x:y;
};
var x = {
    foo:max(2,3)
}
// 存在二义性的语句 补充二
var max = function (x,y) {
    return x>y?x:y;
};
{
    console.log(123);
    console.log(456);
    foo:max(2,3)
}
// 不同类型的表达式
23;//其中的23为原始表达式
obj = {x:2};// ={x:2}为对象初始化表达式
arr = [1,2];// =[1,2]为数组初始化表达式
var foo = function(){ // = function(){}为函数定义表达式
    console.log("foo");
};
obj.x;//obj.x为属性访问表达式
foo();//foo()为函数调用表达式
2+3;//2+3为算数运算表达式
2>3;//2>3为关系运算表达式
1&&2;//1&&2为逻辑运算表达式
//语句及语句分类
  //- 表达式语句、复合语句、条件语句(if-else、switch)、循环语句（for、for...in）

function foo(){
	var a=b=3;
}
foo();
console.log("b:",b);//b：3
console.log("a:",a);//报错  
//var a=b=3; <=> var a=3;b=3; b为全局变量，a是局部变量，不能再外部访问
//var a,b=3; <=>var a=3;var b=3;  a b 均被定义为局部变量,在外部均不能被访问

//ES5中没有块作用域，所以带来了很多问题
{
    var a = 20;
}
console.log("大括号外依然能访问到a:",a);//大括号外依然能访问到a: 20
for(var i = 0;i<5;i++){
    console.log("in for ",i);
}
console.log("out of for ",i);//out of for  5
if(true){
    var a = 20;
}
console.log(a);//20
if(false){
    var b = 30;
}
console.log(b);//undefined
//undefined的是声明了但是没有赋值，jst在使用该变量是不会报错。    
//undeclared 是未声明也未赋值的变量，js访问会报错。
/*
2.严格模式
*/
// 严格模式的目的：
// 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为
// 消除代码运行的一些不安全之处，保证代码运行的安全
// 严格模式使用方式
"use strict"//全局使用
function foo() {
    "use strict"//函数内部使用
}

//(1)JS严格模式下语法和行为的改变 一（全局变量）
function  sloppyFunc() {
    sloppyVar = 123;
}
sloppyFunc();
console.log(sloppyVar);//123
//若使用严格模式则报错
function  sloppyFunc() {
    'use strict'
    sloppyVar = 123;
}
sloppyFunc();
console.log(sloppyVar);//报错
//(2)JS严格模式下语法和行为的改变 二（函数中的this）
function foo(){
	"use strict"
	console.log(this)
}
foo();//undefined
function foo(){
	console.log(this)
}
foo();// window{...} 在严格模式下，this指向undefined ，非严格模式下，this指向window
//检测是否在严格模式的方法
function isStrictMode() {
    return this === window?false:true;
}
//"use strict"
console.log(isStrictMode());//false 一般情况下为非严格模式
//(3) a)JS严格模式下语法和行为改变 三（属性、变量及函数参数）
//Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。
  //（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
var str = "abc";
var strDescriptor = Object.getOwnPropertyDescriptor(window,"str");
console.log(strDescriptor);
//{value: "abc", writable: true, enumerable: true, configurable: false}
function  sloppyFunc() {
    str.length = 7;
    //console.log(Object.getOwnPropertyDescriptor(str,"length"));
    console.log(str.length);
}
sloppyFunc();//3
function  strictFunc() {
    'use strict';
    console.log(Object.getOwnPropertyDescriptor(str,"length"));
      //{value: 3, writable: false, enumerable: false, configurable: false}
    str.length = 7;
    console.log(str.length);//报错
}
strictFunc();
//b)严格模式下禁止删除未定义的变量
delete foo;
delete window.foo;//true
'use strict';
delete foo;
delete window.foo;//false
//c)严格模式下禁止函数参数重名
function f(a, a, b) {
    return a+b;
}
f(2,3,4);//非严格模式下正常执行 7
"use strict";
function f(a, a, b) {
    return a+b;
}
f(2,3,4);//严格模式下报错
//d)严格模式下的arguments，变与不变
function f(a){
    "use strict";
    a = 42;
    return [a, arguments[0]];
}
var pair = f(17);
console.log(pair[0]);//42 
//console.assert(pair[0] === 42);
//console.assert()参数一个布尔表达式。如果参数为假，消息将会被输出到控制台之中。
console.log(pair[1]);//17 console.assert(pair[1] === 17);
/*
3.switch详解、for...in
*/
//a)switch 语句在比较值时使用的是全等操作符(===),因此不会发生类型转换
var i = "1";
switch(i){
    case 1:
        console.log("case 1 Number");
        break;
    default:
        console.log("default");
}
//default  (String)"1"!=1(Number)  数据类型不同
var i = "1";
switch(i){
    case 1:
        console.log("case 1 Number");
        break;
    case "1":
        console.log("case 1 String");
        break;
    default:
        console.log("default");
}
// case 1 String   全等
// var j = 23;
// var j = "23";
// var j = new String("23");
var j = new Number(23);
switch (j){
    case 23:
        console.log("case_111");
        break;
    case "23":
        console.log("case_222");
        break;
    case new Number(23):
        console.log("case_333");
        break;
    default:
        console.log("case_default");
}//j=new Number(23) case_default  引用数据类型不全等，在堆区指向的内存空间不同
 //j=23             case_111
 //j="23"           case_222
 //j=new String("23")case_default
//b)在switch语句中使用表达式，如下
var i = 65;
switch(true){ //思考若是改为 switch(new Boolean(true)){ 会怎样
    case i>=60:
        alert('及格');
        break;
    case i<60:
        alert('不及格');
        break;
    default:
        alert('default');
}//及格 该为switch(new Boolean(true))为default 数据类型不同
//c)switch语句中的穿透性
//从满足第一case处开始执行，直到遇到break为止，若都没有break则直到default结束为止
//利用switch的穿透性:求某月某日是一年中的第几天
var i = 1;//i=2、3、4
switch(i){
    case 1:
        console.log("case 1");
    case 2:
        console.log("case 2");
        break;
    case 3:
        console.log("case 3");
    //break;
    case 4:
        console.log("case 4");
    default:
        console.log("default");
}//i=1 case 1   case 2
 //i=2 case 2
 //i=3 case 3   case 4   default
 //i=4 case 4   default
//d)for ... in 遍历数组
var arr = [2,,"33"];
for(var i in arr){
    console.log(i,arr[i]);
}//0 2   2 33
//e)for ... in 遍历对象
var obj = {x:10,y:20,z:"30"};
for(var k in obj){
    console.log(k,obj[k],typeof obj[k]);
}//x 10 number  y 20 number  z 30 string
var obj1 = {x:1};
var obj2 = Object.create(obj1);//Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 
obj2.y = 2;
obj2.z = 3;
for(var k in obj2){
    console.log(k,obj2[k]);
}//y 2  z 3  x 1