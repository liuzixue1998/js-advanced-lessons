//第六周 星期四 2018.4.14
/*
1.闭包的概念
闭包是由函数和与其相关的引用环境组合而成的实体
闭包是词法作用域中的函数和其相关变量的包裹体
*/
//闭包引入案例(思考下述两个案例的区别,那个x始终未被释放)
function f1(){
	var x = 1;
	function f2(){
		return x++;
	}
	return f2();
}
var f3 = f1();
console.log(f3);//1  前++，先返回值再加1，并且变量在使用后被释放掉
console.log(f3);//1  重新调用x变量
function f1(){
	var x = 1;
	function f2(){
		return x++;
	}
	return f2;
}
var f3 = f1();
console.log(f3());//1 闭包函数，x一直被使用
console.log(f3());//2
// 例一
function createInc(startValue){
	return function(step){
		startValue+=step;
		return startValue;
	}
}
var inc = createInc(5);
console.log(inc(1));//6
console.log(inc(2));//8 前两次输出中，startValue常驻内存
inc = createInc(5); //新建闭包
console.log(inc(1));//6 第三次输出前，新创建了一个闭包，startValue重新创建
// 例二
function createInc(startValue){
	return function(step){
		startValue+=step;
		return startValue;
	}
}
var inc = createInc(5);
console.log(inc(1));//6
console.log(inc(2));//8
var inc2 = createInc(5);
console.log(inc(1));//9 前三次输出中，startValue一直未被释放，逐渐增加
console.log(inc2(1));//6 新建闭包，变量重新被创建
//若一个函数离开了它被创建时的作用域，它还是会与这个作用域的变量相关联
//闭包是一个函数外加上该函数创建时所建立的作用域
// 例三
function foo() {
    var i = 0;
    function bar() {
        console.log(++i);
    }
    return bar();
}
foo();//1 并未形成闭包函数
foo();//1
// 例四
function foo() {
    var i = 0;
    function bar() {
        console.log(++i);
    }
    return bar;
}
var a = foo();
var b = foo();
a();//1 
a();//2 //函数bar和其相关词法上下文中的变量i，构成了一个闭包
        // 返回的函数bar，依然能够访问到变量i（藕断丝连）
b();//1  新建闭包

/*
2.闭包的常见形式 （以函数对象形式返回）
*/
var tmp = 100;//注意：词法作用域,形成的闭包不包含此行的变量tmp
function foo(x) {
    var tmp = 3;
    return function (y) {
        console.log(x + y + (++tmp));
    }
}
var fee = foo(2); // fee 形成了一个闭包 tmp调用的是局部变量3
fee(10);//16  2+10+4+1
fee(10);//17  2+10+4+1+1
fee(10);//18  2+10+4+1+1
//闭包嵌套
function f1(m){
	var z = 100;
	function f2(x) {
    	return function (y) {
        	console.log(x + y + (++z)); 
    	}
	}
	return f2(m);
}
var f3 = f1(2); 
f3(10); //113 2+10+100+1
f3(10); //114 2+10+100+1+1
function foo(x) {
    var tmp = 3;
    return function (y) {
        x.count = x.count ? x.count + 1 : 1;
        console.log(x + y + tmp,x.count);
    }
}
var age = new Number(2);
var bar = foo(age); //和相关作用域形成了一个闭包
bar(10); //15 1
bar(10); //15 2
bar(10); //15 3

/*
3.闭包的常见形式（作为对象返回）
*/
function counter() {
    var n = 0;
    return {
        count:function () {return ++n;},
        reset:function () {n = 0;return n;}
    }
}
var c = counter();
var d = counter();
console.log(c.count());//1
console.log(d.count());//1
console.log(c.reset());//0
console.log(c.count());//1
console.log(d.count());//2

/*
4.闭包的作用
可通过闭包来访问隐藏在函数作用域内的局部变量
使函数中的变量被保存在内存中不被释放（单例模式）
*/
function f1(){
    var n = 999;
    function f2(){
        console.log(++n);
    }
    return f2;
}
var f = f1();
f();//输出多少？
f();//输出多少？
// 闭包实例
// 函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除
// 原因就在与f2被赋给了一个全局变量，全局变量没被释放
// 这导致f2始终在内存中，而f2和n形成了对应作用域（f1）的闭包
// f1中的n不会在调用结束后，被垃圾回收机制（garbage collection）回收

/*
5.闭包的注意事项
由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包
使用闭包时要注意不经意的变量共享问题，可以通过立即执行表达式来解决
*/