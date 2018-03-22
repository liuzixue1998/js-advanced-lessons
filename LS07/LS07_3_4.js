//第三周 星期四 2018.3.22
/*
1.函数定义（3种）
- 通过函数声明的形式来定义（要有函数名）
- 通过函数表达式的形式来定义（可以是没有函数名的匿名函数，有名的话方便调用栈追踪）
- 通过Function构造函数实例化的形式来定义（JS中函数也是对象，函数对象）
*/
//（1）函数声明方式
function max(a,b){
    return a>b?a:b;
}
max(2,3); //3
//（2） 函数表达式方式 等号右侧可以是匿名函数也可以是非匿名函数
var max = function (a,b){ //匿名函数
    return a>b?a:b;
};
max(2,3);//3
//（3） Function构造函数方式
var max = new Function("a","b","return a>b?a:b");
max(2,3); //3
var str="return a<b?a:b";
var min=new Function("a","b",str);
min(2,3);//2  函数作为一个对象的实体（属性，绑定）叫方法

/*
2.函数调用方式（4种）
- 作为函数直接调用（非严格模式下this为全局对象，严格模式下为undefined）
- 作为方法调用（this为调用此方法的对象）
- 通过call( )和apply( )间接调用（this为函数对象的call/apply方法的首个参数，移花接木）
- 作为构造函数调用（this为实例化出来的对象）
*/
//（1） 直接调用
function test1() {
    console.log("this is",this);
}
test1();//window
function fo(){
	console.log("foo");
}
fo===window.fo; //true
//思考嵌套的情况下
function test2() {
    function test3(){
        console.log("this is",this);
    }
    test3();
}
test2();//window
//（2）对象方法调用  给obj动态添加方法
var x=45;
var test=function(){
	console.log(this.x,this);
} 
var obj={
	x:23}
obj.test=test;
obj.test();//23 调用函数
test();//45 调用主体是window
var x=45;
var obj = {
    x:23,
    test:function(){
		function foo(){
        console.log(this.x);
    }
	foo();
    }
};
obj.test();//45 window
//给obj动态添加方法
var sayHi = function () {
    console.log("Hi，i'm",this.name);
};
obj.sayHi = sayHi;//添加给对象添加方法
obj.sayHi();// Hi，i'm undefined
            //直接调用sayHi()  Hi，i'm 
            // var name = "全局"; sayHi();  Hi，i'm 全局
//（3）间接调用 实例一 间接调用的对象要和原对象之间，在数据结构上有对应的相似处，以便不影响调用效果
objA = {name:"AA"};
objB = {name:"BB"};
objA.foo = function(){
    console.log(this.name);
};
objA.foo();//AA
objA.foo.call(objB);//BB  call() apply()通过间接的方式调用其它函数
//间接调用 实例二 移花接木 吸星大法
var fish = {
    name:"fish",
    swim:function (m,n) {
        console.log("i'm "+this.name+" i cam swim ___",m,n);
    }
};
var bird = {
    name:"polly",
    fly:function(m,n){
        console.log("i'm:"+this.name+" i can fly ___",m,n);
    }
};
var me = {
    name:"ABC"
};
bird.fly(5,6); //i'm polly i can fly___5 6
fish.swim.call(me,3,4);//i'm ABC i can swim___3 4
bird.fly.call(me,7,8);//i'm ABC i can fly___& 8
//swim(1,2);与swim.call(null,1,2);相同
function test() {
    console.log(Array.prototype.slice.call(arguments));
}
test(1,2,3,"4",5);//[1, 2, 3, "4", 5]
//（4）构造函数
function Person(name){
    this.name = name;
}
Person.prototype.sayHi = function(){
    console.log("Hi,i'm "+this.name);
};
var p1 = new Person("Jack");
p1.sayHi();//Hi,i'm Jack

/*
3.JS函数调用时实参数量可以与形参不一致
- 实参数量大于形参的情况（通过函数对象属性arguments获得所有实参、类数组对象）
- 实参数量小于形参的情况（少的参数值为undefined、可使用| |来给出默认值）
*/
//实参大于形参
function test() {
    console.log(arguments);
    console.log(Array.prototype.slice.call(arguments));
    var s = "";
    for (var i = 0; i < arguments.length; i++) {
        s += arguments[i];
    }
    return s;
}
test("hello,", "world!");//"hello,world!" 
//实参小于形参
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3)); //6 1+2+3
console.log(sum(1,2));//8   1+2+5
console.log(sum(1));//10  1+4+5

/*
4.参数类型与传递方式 （2种）
*/
//（1）值传递
//trace追踪 
var a = 1;
function foo(x) {
    console.trace("a:",a," x:",x);
    x = 2;//step 2222
    console.trace("a:",a," x:",x);//step 3333
}
console.trace("a:",a);//a:1
foo(a);// step 1111 a:1 x:1    a: 1  x: 2
console.trace("a:",a); // step 4444  a仍为1
//(2) 引用传递
var obj = {x:1};
function fee(o){
    console.trace("obj.x :",obj.x," o.x :",o.x);
    o.x = 3;// step 2222
    console.trace("obj.x :",obj.x," o.x :",o.x);// step 3333
}
console.trace("obj.x :",obj.x);
fee(obj);// step 1111
console.trace("obj.x :",obj.x);//step 4444  obj.x被改写为3
document.onclick = function () {
    alert("click");
    //var body =  document.getElementsByName("body");
};