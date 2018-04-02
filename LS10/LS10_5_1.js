//第五周 星期一 2018.4.2
/*
1.js作用域及其特点
*/
//（1）什么是作用域
//- 作用域就是变量与函数的可访问范围（变量生效的区域范围，即在何处可以被访问到）
//- 作用域控制着变量与函数的可见性和生命周期，它也是根据名称查找变量的一套规则
//全局作用
var a = 10,
    b = 20;
function fn() {
    //fn局部作用域
    var a = 100,
        c = 200;
    //console.log(a,b,c,d); //d未被定义
    function bar() {
        //bar局部作用域
        var a = 500,
            d = 600;
        console.log(a,b,c,d);//500 20 200 600
    }
    bar();
}
fn();
//console.log(a,b,c,d);//c未被定义
//在以上的嵌套作用域中，d只能在bar作用域中被访问到
//c只能在fn和bar作用域中被访问到，在bar中访问a时为500（覆盖性），在bar中访问c时为200（链式关系）
//（2）js作用域特点（词法作用域）
//- JS采用的是词法作用域（静态性），这种静态结构决定了一个变量的作用域
//- 词法作用域不会被函数从哪里调用等因素影响，与调用形式无关（体现了静态性）
var name = "Jack";
function echo() {
    console.log(name);
}
function foo() {
    var name = "Bill";
    function fee(){
        var name = "Lucy";
        echo();
    }
    fee();
}
foo();//Jack  fee作用域中的name变量为局部变量，不能再全局访问。
//            在echo的作用域中变量name为全局变量
//通过new Function实例化的函数对象，不一定遵从静态词法作用域
var scope = "g";
function foo(){
	var scope = "l";
	return new Function("console.log(scope);")
}
foo()();//g  构造函数。。
//（3）JS作用域特点（静态词法作用域补充部分）
//- 通过new Function创建的函数对象不一定遵从静态词法作用域
//- 对比下边两个例子（通过不同形式定义的函数对象，访问到的scope的区别）
var scope="global";
function checkScope(){
	var scope="local";
	return function(){
	    return scope;
    };
}
console.log(checkScope()());//local 调用return中的函数，调用本函数的变量scope，输出local

var scope="global";
function checkScope(){
	var scope="local";
	return new Function("return scope");
}
console.log(checkScope()());//global  new function内的return返回的是全局变量
//（4）关于块作用域
//JS（ES5）采用的是函数级作用域，没有块作用域
{
    var a = 4;
}
console.log(a);//4 
//无块作用域的解决方案
//使用IIFE来解决上述问题
var userId = 123;
document.onclick = function () {
    console.log("userId = ",userId);
    //alert("userId = "+userId);
};
(function(){
    var a=2,b=3;
    if(a<b){
        var userId = 234;
    }
}());//userId =  123  匿名函数 

/*
2.执行上下文（context，举例生活中的上下文环境）
- 执行上下文指代码执行时的上下文环境（包括局部变量、相关的函数、相关自由变量等）
- JS运行时会产生多个执行上下文，处于活动状态的执行上下文环境只有一个
*/
// 理解执行上下文（通俗的例子）
// 在不同的地点，能访问到的变量也不同，比如：在文具店不可能访问到银行柜员机和大堂经理
// 在银行或文具店中可以访问到家中的变量，可以理解为有电话和家里建立了链接
console.log("小明回家");
var xx = ["书桌","书包","铅笔盒"];//小明家中
console.log("在家-做作业中 1 ...全局上下文");
function goToStore(){
    var yy = ["文具店老板","出售的文具"];//文具商店中
    console.log("在文具店-买文具中  ...函数1上下文");
    console.log("在文具店-买文具中  ...函数1上下文 发现没带钱");
    goToBank();
    console.log("在文具店-买好文具  ...函数1上下文 返回家");
}
function goToBank(){
    var zz = ["银行职员","柜员机"];//银行中
    console.log("在银行-取钱 ...函数2上下文 返回文具店");
}
console.log("在家-做作业中 2 ...全局上下文 发现笔没油了");
goToStore();//笔没油了，去商店买笔
console.log("在家-继续做作业...全局上下文");

/*
3.调用栈
- 代码执行时JS引擎会以栈的方式来处理和追踪函数调用（函数调用栈 Call Stack）
- 栈底对应的是全局上下文环境，而栈顶对应的是当前正在执行的上下文环境
*/
// 使用Chorme的 Watch窗口（追踪x，y，z）和
// Scope窗体（观察作用域链的变化）
console.log("全局上下文-start");
var x = "家中环境-";
function goToStore_A(){
    console.log("goToStore_A 上下文-start");//设置断点
    var y = "文具店A环境-";
    goToBank_C();//设置断点
    // goToBank_D();//设置断点
    console.log("goToStore_A 上下文-end");//设置断点
}
function goToStore_B(){
    console.log("goToStore_B 上下文-start");//设置断点
    var y = "文具店B环境-";
    goToBank_C();//设置断点
    // goToBank_D();//设置断点
    console.log("goToStore_B 上下文-end");//设置断点
}
function goToBank_C(){
    console.log("goToBank_C 上下文-start");//设置断点
    var z = "银行C环境-";
    //console.log(x+y+z);
    console.log("goToBank_C 上下文-end");//设置断点
}
function goToBank_D(){
    console.log("goToBank_D 上下文-start");//设置断点
    var z = "银行D环境-";
    //console.log(x+y+z);
    console.log("goToBank_D 上下文-end");//设置断点
}
goToStore_A();//设置断点
// goToStore_B();//设置断点
console.log("全局上下文-end");//设置断点


