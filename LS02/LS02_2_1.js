//第二周 星期一 2018年3月12号
/*
1.基本数据类型的值：Number类型的值
*/
//NaN
var a=Number("xxlsss");
a;//NaN;
typeof(a);//"number"
isNaN(a);//true  isNaN() 函数用来确定一个值是否为NaN 
console.log(NaN === NaN);//false
Math.log(-1)//NaN  Math.log() 函数返回一个数的自然对数
//Infinity与-Infinity 无穷
var y1 = 2/0;
console.log(y1);//Infinity 正无穷
var y2 = -2/0;
console.log(y2);//-Infinity 负无穷
isFinite(y2);//false，非有限数
isFinite(23);//true，有限数  isFinite用来判断被传入的参数值是否为一个有限数值
var z1 = 1/Infinity;
console.log(z1);//0
var z2 = -1/Infinity;
console.log(z2);//-0

/*
2.基本数据类型的值：String类型的值
*/
var str = "abc_def_ghi_jkl_mn";
console.log(str.split("_"));//["abc", "def", "ghi", "jkl", "mn"]
console.log(str.split("_",2));//["abc", "def"] 只截取两个
console.log(str.concat("_opq"));//abc_def_ghi_jkl_mn_opq
console.log(str.substr(4,7));//def_ghi   起始位置+截取长度
console.log(str.substring(4,7));//def  等同于str.slice(4,7);
console.log(str.slice(2));//c_def_ghi_jkl_mn
console.log(str.slice(2,5));//c_d   起始位置+终止位置
console.log(str.slice(-2));//mn  从右边第一个开始
console.log(str.slice(2,-2));//c_def_ghi_jkl_ 
str.link();//<a href="undefined">abc_def_ghi_jkl_mn</a>

/*
3.基本数据类型：Boolean类型的值
*/
//Boolean的值true、false

/*
4.基本数据类型：Null undefined类型的值
*/
var a;
console.log(a);//undefined
//undefined的是声明了但是没有赋值，jst在使用该变量是不会报错。    
//undeclared 是未声明也未赋值的变量，js访问会报错。  
function foo(x,y) {
    console.log(x,y);
}
foo(1);////1 undefined

/*
5.引用数据类型的值
*/
var obj = {x:1,y:2};//obj的原型是Object.prototype,并且obj继承的属性和方法都源于这个原型
console.log(obj.__proto__ === Object.prototype); //true
console.log(Object.prototype);
//每个对象都具有一个名为__proto__的属性；
//每个对象的__proto__属性指向自身构造函数的prototype；
//每个构造函数都具有一个名为prototype的方法；
var arr = [1,2,3,4,5];//arr的原型是Array.prototype,并且arr继承的属性和方法都源于这个原型
console.log(arr.__proto__ === Array.prototype);//true
console.log(Array.prototype);
console.log(arr.__proto__.__proto__ === Object.prototype);//true
function foo() { //foo的原型是Function.prototype,并且foo继承的属性和方法都源于这个原型
    console.log("foo function!");
};
console.log(foo.__proto__ === Function.prototype);//true
console.log(foo.__proto__.__proto__ === Object.prototype);//true
console.log(obj instanceof Object);//true
console.log(arr instanceof Object);//true
console.log(foo instanceof Object);//true
console.log(foo === window.foo);//true
var obj = {x:1,y:2};
for(var k in obj){//只能遍历整个原型链上所有可遍历的属性
    console.log(k,obj[k]);
}//x 1  y 2
console.log(Object.keys(obj));//["x", "y"]  返回一个数组，包含自身所有可枚举的属性
console.log("x" in obj);//true  能够检查整个原型连上的属性，包括不可遍历的属性

/*
6.包装对象
数字、布尔、字符串等基本数据类型都有对应的包装对象类型，可以将其包装成对象
例：new Number(20)； new String('SomeStr');//装箱
存储或读取基本类型（字符串、数字、布尔）值的属性时，会创建临时包装对象
例: console.log('Hello，World'.length);
基本类型其属性不能被改变、添加或删除（原始值不可变性）
临时对象在使用之后立即释放
*/
var a=123;
var b=new Number(123);
console.log(a===b); //false
console.log(a==b);//true
//临时包装对象
var str = "abcde";
console.log(str.length);//5 临时包装成了String对象
str.length = 1;
console.log(str.length,str);//5 "abcde" 临时包装对象并不影响原始值
var arr = [1,2,3,4];
console.log(arr.length);//4
arr.length = 1;
console.log(arr.length,arr);//1 [1] 引用对象类型改变

/*
7.js数据类型转换：其他类型转换为Boolean类型
*/
console.log(Boolean(undefined));// false
console.log(Boolean(null)); //false
console.log(Boolean(0));//false
console.log(Boolean(NaN));//false
console.log(Boolean(1));//true 其他数字为true
console.log(Boolean(""));//false
console.log(Boolean("abc"));//true  ''转换为false，其他未true
console.log(Boolean({}));//true  
if(new Boolean(false)){
    console.log("执行");
} //执行  对象总为true

/*
8.js数据类型转换：其他类型转换为Number类型
*/
console.log(Number(undefined));//NaN
console.log(Number(null));//0
console.log(Number(true));//1
console.log(Number(false));//0
console.log(Number(""));//0
console.log(Number("abc"));//NaN
console.log(Number("123.345xx"));//NaN
console.log(Number("32343,345xx"));//NaN  解析字符串中的数字，忽略开头结尾空格，空字符为0
console.log(Number({x:1,y:2}));//NaN      
console.log(parseFloat("123.345xx"));//123.345
console.log(parseFloat("32343,345xx"));//32343
console.log(parseInt("123.345xx"));//123
console.log(parseInt("32343,345xx"));//32343
/*
9.js数据类型转换：其他类型转换为String类型
*/
console.log(String(undefined));//undefined
console.log(String(null));//null
console.log(String(true));//true
console.log(String(false));//false('false')
console.log(String(0));//0
console.log(String(234));//234
console.log(String({x:1,y:2}));//[object Object]

/*
10.隐式类型转换
*/
//比较运算符 与 隐式类型转换
var a = 3;
var b = 4;
console.log(typeof (a>b),a>b); //boolean false
console.log(typeof (a==b),a==b);//boolean false
console.log(typeof (a<b),a<b);//boolean true

//算数运算符 与 隐式类型转换 + -
var c = "img" + 3 +".jpg";
var d = "23" - 5;
console.log(c,d);//img3.jpg(String)  18(Number)  

//逻辑运算符 与 隐式类型转换 + -
var e = !23;
var f = !!34;//!!""   !!0   !!"abc"  !!undefined  !!null
var g = !!{};
console.log(e,f,g);//false true true

// 流程语句 与 隐式类型转换
var h = {x:1};
//var h = "";
if(h){
    console.log("h:",h);//h:{x:1};(Object)
}

/*
11.显式类型转换
*/
// Boolean();
// Number();
// String();
// Object();
//parseInt();
//parseFloat();
// toString(); 可把一个逻辑值转换为字符串
// valueOf();  可返回 Boolean 对象的原始值。
