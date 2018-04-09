//第六周 星期一 2018.4.9
/*
1.IIFE 立即执行的函数表达式
IIFE的作用
（建立函数作用域，解决ES5作用域缺陷所带来的问题如：变量污染、变量共享等问题）
*/
//立即执行表达式 常见形式
(function max( x,y){
    console.log("the max is",x>y?x:y);
}(2,3));
(function (x,y){ 
    console.log("the min is",x<y?x:y);
})(2,3);
//实参可在内外进行传递
//注意：IIFE是表达式，不能两个函数直接调用，不是独立分割的语句，要注意使用分号结尾，否则可能出现错误
(function() {
    console.log("111");//111
})();//没有分号的话会报错
(function () {
    console.log("222");//222
})()
// 其他形式的IIFE 与运算符结合的写法
var i = function(){
    return 10;
}(); //i为10
console.log(i);//10
//与逻辑运算符结合
true && function(a,b){
    return a>b?a:b;
}(5,9);//9  &&：前为真，则返回后面的结果
!function(x,y){
    return x==y?true:false; // === 返回什么 true
}("5",5);//false
!function(){return 2; }( ); //false
!function(){return 0; }();//true

/*
2.通过IIFE对作用域的改变（限制变量生命周期）
- JS（ES5）中没有块作用域，容易造成js文件内或文件间的同名变量互相污染
- 我们往往会通过IIFE引入一个新的作用域来限制变量的作用域，来避免变量污染
*/
(function () {  // IIFE开始
    var x = 10;
    document.onclick = function () {
        // console.log("x = ",x);
        alert("x = "+x);
    };
})();           // IIFE结束
(function () {  // IIFE开始
    var x = 20;
 })();           // IIFE结束
/*
3.通过IIFE对变量存储的改变（避免变量共享错误）
- 当程序运行到变量所在作用域时，变量被创建，JS（ES5）没有块作用域，变量可能会共享
- 如下例：在函数作用域中创建的变量 i 只有一个，出现了变量 i 共享问题，可通过IIFE解决
*/
function f(){
    var getNumFuncs = [];//函数数组
    var i=0;
    for(;i<10;i++){
        getNumFuncs[i] = function(){
            return i;
        };
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//10 tmp[0]()...tmp[9]()都是10 存在变量共享问题

function f(){
    var getNumFuncs = [];//函数数组
    for(var i=0;i<10;i++){
        (function (j) {
            getNumFuncs[j] = function(){return j;};
        })(i);
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//输出为3，tmp[0]()...tmp[9]()都为是期望的结果

//局部变量的案例
function f(){
    var getNumFuncs = [];//函数数组
    var j;
    for(var i=0;i<10;i++){
        j = i;
        getNumFuncs[i] = function(){
            return j;//如果return i;的话输出几？
        };
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//输出9 tmp[0]()...tmp[9]()都为10

/*
4.IIFE实际引用案例
*/
//定时器案例
//变量共享问题
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000*i);
}
console.log("i：",i);
//通过IIFE解决问题
for (var i = 0; i < 5; i++) {
    (function(j) {  // j = i
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000*i);
    })(i);
}