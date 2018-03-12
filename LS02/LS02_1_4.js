//第一周 星期四 2018年3月8号
/*
1.基本数据类型：Number、String、Boolean、Null、Undefined
引用数据类型：Object（Array、Function、Date、Error...）
typeof检测数据类型
instanceof检测引用对象类型 左侧操作数为对象，右侧操作数为原型链中的一个类型时，返回为true
*/
console.log(typeof null); //object
console.log(typeof undefined);//undefined
console.log(typeof function foo(){});//function
console.log(typeof {name:"Mike",age:20});//object
var b = [12,34,{},""];
console.log(b instanceof Array);//true 
console.log(b instanceof Object);//true Array是对象（Object）
var Person = function(){};
var p1 = new Person();
console.log(p1 instanceof Person);//true Person是新建对象

/*
2.基本数据类型的临时变量在栈区
引用数据类型的变量的引用（地址）存储在栈区或堆区，被引用（指向）的对象存储在堆区
*/
var obj={a:12,b:{c:"ab"}}; // a为基本数据类型，分配在堆区。
var a=2;
var b=a;
a=3;
console.log(b);// 2 
var obj1={"key":2};
var obj2=obj1;
obj2.key=3;
console.log(obj1.key);//3 obj1在堆区 obj2指向obj1。一起改变
var obj1={"key":2};
var obj2=obj1;
obj2.key=3;
obj2={"key":4};
console.log(obj1.key);//3  obj2在堆区新开辟了空间，与obj1无关

/*
3.基本类型与引用类型的区别：赋值时不同
*/
var str_a = "a"; 
var str_b = str_a;
str_b = "b"; 
console.log(str_a,str_b);//原始类型直接访问值  a  b
var obj_a = {v:"a"}; 
var obj_b = obj_a; 
obj_b.v = "b";
console.log(obj_a,obj_b);//obj_a，obj_b均为引用堆区内存中的对象 {v:"b"} {v:"b"}
obj_b = {v:"c"}; 
console.log(obj_a,obj_b);//修改的是obj_b对象中的值，与obj_a无关 {v: "b"} {v: "c"}

/*
4.基本数据类型与引用类型的区别：判等时不同
值类型是判断变量的值是否相等（值比较）
引用类型是判断所指向的内存空间是否相同（引用比较）
*/
var a1=100;
var b1=100;
console.log(a1==b1);//true
console.log(a1===b1);//true
var a2 = new Number(200);
var b2 = new Number(200);
console.log(a2 == b2);//false 
console.log(a2 === b2);//false  a2，b2在堆区开辟了两块内存空间 所指向的堆区内存空间不同
var c=[1,2];
var d=[1,2];
c===d;//false 
c==d;//false
c===d;//false
var a=123;
var b=new Number(123);
console.log(a===b);//false
console.log(a==b);//true 值相等

/*
5.基本数据类型与引用类型的区别：函数参数传递时不同
按值传递
按引用传递
*/
var a=123;
function foo(x){
	x=345;
}
foo(a);
console.log(a);//123 a在栈区内，foo在堆区内，堆区内的数值修改不影响栈区，所以a不变
var a={y:123};
function foo(x){
	x.y=345;
}
foo(a);
console.log(a.y);//345 a foo均在栈区内，在栈区内进行修改
var a={y:123};
function foo(x){
	x.y=345;
	x={y:456};
}
foo(a);
console.log(a.y); //345 ，调用函数后，x=345 x在堆区内开辟了新的内存空间，不改变原来的值
var a={y:123};
function foo(x){
	x={y:456};
	x.y=345;
}
foo(a);
console.log(a.y); //123 x现在堆区内开辟新的内存空间，在新的内存空间内修改y的值。故不改变原来x的值