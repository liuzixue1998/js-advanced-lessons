// 第四周 星期四 2018.3.29
/*
1.预解析和执行过程
--js脚本语言，由解析器边解析边执行
- 全局预解析阶段（全局变量和函数声明前置）
- 全局顺序执行阶段（变量赋值、函数调用等操作）
- 当遇到函数调用时，在执行函数内代码前，进行函数范围内的预解析
- 当存在函数嵌套时，以此类推，会进行多次函数预解析
（解析和执行是一个不断交替的过程）
*/
console.log(a);//undefined
var a=2;
console.log(a);//2
//从解析器角度看到的代码
var a;
console.log(a);//undefined
a=2;
console.log(a);//2

/*
2.js预解析--声明提升
预解析主要工作（变量声明和函数声明提升）
- 解析器在执行代码前的进行代码扫描（var、function）
- 将变量和函数声明在当前作用域（全局、函数）内进行提升
*/
//（1）变量提升案例
//赋值是定义，var a 是声明
console.log(a);//undefined
var a = 1;
console.log(a);//1
// 解析器眼中的代码
var a;
console.log(a);//undefined
a = 1;
console.log(a);//1

console.log(a,b);//undefined undefined
var b = 23;
console.log(a,b);//undefined 23
var a = b;
console.log(a,b);//23 23
//解析器中的代码
var b,a;
console.log(a,b);//undefined undefined
b = 23;
console.log(a,b);//undefined 23
a = b;
console.log(a,b);//23

console.log(obj1,obj2);//undefined undefined
var obj1 = {x:23};
console.log(obj1,obj2);//{x:23} undefined
var obj2 = obj1;
console.log(obj1,obj2);//{x:23} {x:23} 
obj2.x =25;
console.log(obj1,obj2);//{x:25} {x:25}  两个对象指向栈区的同一部分内存，改变值时一起改变
//解析器中的代码
var obj1,obj2;
console.log(obj1,obj2);//undefined undefined
obj1 = {x:23};
console.log(obj1,obj2);//{x:23} undefined
obj2 = obj1;
console.log(obj1,obj2);//{x:23} {x:23} 
obj2.x =25;
console.log(obj1,obj2);//{x:25} {x:25}  两个对象指向栈区的同一部分内存，改变值时一起改变

//（2）函数声明提升案例
//函数及变量声明重复的话，相当于覆盖
foo();//f_2
function foo(){
    console.log("f_1");
}
function foo(){
    console.log("f_2");
}
//解析器眼中的代码
function foo(){
    console.log("f_1");
}
function foo(){
    console.log("f_2");
}
foo();//f_2

//（3）同时有var和function关键字时（情形1：函数表达式）
foo();
var foo = function(){
    console.log("foo");
};//报错 不能进行提升

//（4）当function前有运算符的话，认定为表达式，不提升
var foo;
foo();
foo=function(){
	console.log("foo")
}//报错，foo不是一个函数

console.log(foo);//undefined
var foo = function(){
    console.log("foo");
};
foo();//foo 
//解析器中的代码
var foo;
console.log(foo);//undefined
foo = function(){
    console.log("foo");
};
foo();//foo 

//（5）同时有var和function关键字时（情形2：变量名同函数名）
AA();//AA_1
function AA(){
    console.log("AA_1");
}
var AA = function AA(){
    console.log("AA_2");
};
AA();//AA_2
//解析器中的代码
function AA(){
    console.log("AA_1");
}
var AA;
AA();//AA_1
AA = function AA(){
    console.log("AA_2");
};
AA();//AA_2

/*
3.JS变量作用域简介
*/
//（1）变量的作用域是指变量在何处可以被访问到
//- JS采用的是静态词法作用域，代码完成后作用域链就已形成，与代码的执行顺序无关
var name = "Jack";
function echo() {
    console.log(name);
}
function foo() {
    var name = "Bill";
    echo();
}
foo();//Jack  调用函数foo，调用函数echo(),echo()中的name为全局变量的“jack”

//（2）全局变量与局部变量
//- 全局变量：拥有全局作用域的变量（JS代码中任何地方都可以访问）
//- 全局变量是跨域了所有函数自身作用域的自由变量，可以在函数内和函数外直接访问
//- 局部变量：函数内声明的变量，只在函数体内有定义，作用域是局部性的
//- 在函数外不能直接访问函数的局部变量，但可以通过闭包来访问
//- 函数内访问同名变量时，局部变量会覆盖全局变量
var x = "outside f1";
var f1 = function () {
    //var x = "inside f1";//如果没有这行，则两次输出都为outside
    console.log(x);
};
f1();//outside f1            var x = "inside f1" //inside f1
console.log(x);//outside f1  var x = "inside f1" //outside f1
//若函数内未加var 则相当于创建了全局变量
var f2 = function () {
    var y = "局部";
    //y = "全局";
    console.log(y);
};
f2();//局部
console.log(y);//若函数内有var此行报错，若函数内没有var则此行输出全局变量y值

//ES5中无块作用域（ES5作用域缺陷及解决办法参见IIFE）
//- 全局作用域、函数作用域、ES5中可以使用函数立即执行表达式来模拟块作用域
if(true){
    var z = 23;
}
console.log(z);//23
if(true){
    (function () { //IIFE start
        var z = 23;
    }());           //IIFE end
}
console.log(z);//报错

/*
4.声明前置与作用域的关系（全局作用域、函数作用域）
*/
if(true){
    var i = 0;
}
function foo(){
    console.log("j:",j);//undefined
    var j = 10;
    console.log("j:",j);//10
}
foo();
console.log("i:",i);//0
console.log("j:",j);//报错 局部变量不能再全局中被访问
//上边代码等价于
var i;
if(true){
    i = 0;
}
function foo(){
    var j;
    console.log("j:",j);//undefined
    j = 10;
    console.log("j:",j);//10
}
foo();
console.log("i:",i);//0
console.log("j:",j);//报错
