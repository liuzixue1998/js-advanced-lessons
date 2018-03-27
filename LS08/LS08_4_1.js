//第四周 星期一 2018.3.36
/*
1.函数对象
- 可以将函数（函数对象）赋值给一个变量，或将函数作为参数进行传递
- 函数对象对应的类型是Function（类似于数组对象对应于Array、日期对象对应于Date）
- 如果变量是函数（函数对象）时，typeof此对象，返回function，而非object 
- 内置的函数对象（Array、Function、Date等），内置的非函数对象（Math、JSON）
*/
function foo(){}
console.log(foo); //ƒ foo(){}
console.log(typeof foo); //function  
console.log(foo instanceof Object); // true
console.log(foo instanceof Function); //true
console.log(foo === window.foo); //true  定义在window中的函数
console.log(typeof Function);// function  Function instanceof Object//true
console.log(typeof Array);	 //function   Array  instanceof Object//true
console.log(typeof Date);	 //function   Date instanceof Object//true
console.log(typeof Error); 	 //function   Error instanceof Object//true  Error定义了一个错误对象
console.log(typeof Math);	 //object     Math instanceof Function//false
console.log(typeof JSON);	 //object     JSON instanceof Function//false
//构造函数
console.log(typeof new Function());// function
console.log(typeof new new Function())//object  构造函数实例化成对象
console.log(typeof new Array());//object  既是函数也是对象，函数对象
console.log(typeof new Date())//object
var a=new Math();console.log(typeof a) //报错，Math不是一个构造函数，不能写成这种形式
var Person=function(name){
	this.name=name;
}
console.log(Person instanceof Object);//true
console.log(Person instanceof Function);//true
var p=new Person("jack");
console.log(p instanceof Object);//true 实例化成对象
console.log(p instanceof Function);//false

/*
2.函数对象的属性
*/
//（1）函数对象属性之arguments 实参集合（类似数组的一个对象）
var foo = function (a,b){
    console.log(arguments);//类似数组的一个对象 Arguments(4) [1, 2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    //arguments 是Symbol类型，独一无二的
    console.log(arguments === foo.arguments);//false
    console.log(arguments.length); //4
    var args = Array.prototype.splice.call(arguments,0);
    console.log(args);//[1, 2, 3, 4]  splice() 方法从数组中添加/删除项目，然后返回被删除的项目。
};
foo(1,2,3,4);
//（2）函数对象属性之length 形参个数
function foo(x,y,z){} console.log(foo.length); //3
function checkVarCount(a, b) {
    if (checkVarCount.length !== arguments.length) {
        alert("The count of the parameters you passed into the function doesn't match the function definition.");
    }else{
        alert("Successfully call the function");
    }
}
checkVarCount(1, 2);//Successfully call the function
checkVarCount(1);//The count of the parameters you passed into the function doesn't match the function definition.
//（3）函数对象属性之caller 获取调用当前函数的函数。例一
//caller 返回一个调用当前函数的引用 如果是由顶层调用的话 则返回null
function test() {
    if (test.caller == null) {
        console.log("test is called from the toppest level");
    } else {
        console.log("test is called from the function:");
        console.log(test.caller.toString());
    }
}
//caller属性只有当函数正在执行时才被定义
console.log("没有调用的情况下test.caller为：",test.caller);
test();//output: test is called from ,call from the top level
function testOuter() {
    test();}
testOuter();//call from the function testOuter
//例二
var obj = {
    foo1:function(){
        console.log(this.foo1.caller);
    },
    foo2:function abc(){
        this.foo1();
    }
};
obj.foo1();//null
obj.foo2();//ƒ abc(){ this.foo1();}
//（4）函数对象属性之callee 返回正被执行的 Function 对象，
//即指定的 Function 对象的正文
//callee 属性是 arguments 对象的一个成员
//该属性仅当相关函数正在执行时才可用。通常这个属性被用来递归调用匿名函数，在严格模式下不可行
var func = function(n){
    if (n <= 0)
        return 1;
    else
        return n * func(n - 1);
        //return n * arguments.callee(n - 1);//24
};
console.log(func(4));//24  4！递归
//优点，可以是匿名函数
(function(n){
    if (n <= 0)
        return 1;
    else
        return n * arguments.callee(n - 1);
        //return n * func(n - 1); //报错  func is not defined
}(4));//24 
//（5）函数对象属性之 prototype
//获取对象的原型。每一个构造函数都有一个prototype属性，指向另一个对象。
//这个对象的所有属性和方法，都会被构造函数的实例继承。
function Man(name, age) {
    this.name = name;
    this.age = age;
}
Man.prototype.sex = "M";
Man.prototype.sayHi = function () {
    console.log("Hi,i'm",this.name);
};//改变函数原型
var li = new Man("Leo", 10);//调用函数，实例化对象
li.sayHi();//Hi,i'm Leo
console.log(li.sex);//M
Man.prototype.isStrong = true;
console.log(li.isStrong);//true 
Object instanceof Function;//true
Object.__proto__===Function.prototype;//true
Object.protptype===Function.protptype//false 
Object.__proto__===Function.__proto__;//true
//__proto__（隐式原型）与prototype（显式原型）
//__proto__是每个对象都有的一个属性，而prototype是函数才会有的属性!!! 

/*
3.函数对象的方法
*/
//（1）call（2） apply
//（3）bind绑定方法
//bind 是返回对应函数，便于稍后调用
//bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind()方法的第一个参数作为 this
var x = 45;
var obj = {
    x:23,
    test:function(){
		function foo(){
			console.log(this.x);
		}
		foo.bind(this)();//var fee = foo.bind(this); fee();
		foo();
    }
};
obj.test();//23  45  foo.bind(this)绑定的是原函数对象obj
//函数对象方法之 bind 硬绑定 例二
// function.bind(thisArg[,arg1[,arg2[,argN]]])
//传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。
// 在绑定功能中，this对象解析为传入的对象。
// 返回一个与 function 函数相同的新函数，只不过函数中的this对象和参数不同。
var checkNumericRange = function (value) {
    if (typeof value !== 'number')
        return false;
    else
        return value >= this.minimum && value <= this.maximum;
};
// The range object will become the this value in the callback function.
var range = { minimum: 10, maximum: 20 };
// Bind the checkNumericRange function.
var boundCheckNumericRange = checkNumericRange.bind(range);
// Use the new function to check whether 12 is in the numeric range.
var result = boundCheckNumericRange (12);//相当于range.boundCheckNumericRange (12)
console.log(result);//true
//bind 参数的问题 例三
// 该绑定函数将 bind 方法中指定的参数用作第一个参数和第二个参数。
// 在调用该绑定函数时，指定的任何参数将用作第三个、第四个参数（依此类推）
// Define the original function with four parameters.
var displayArgs = function (val1, val2, val3, val4) {
    console.log(val1 + " " + val2 + " " + val3 + " " + val4);
};
var emptyObject = {};
// Create a new function that uses the 12 and "a" parameters
// as the first and second parameters.
var displayArgs2 = displayArgs.bind(emptyObject, 12, "a");
// Call the new function. The "b" and "c" parameters are used
// as the third and fourth parameters.
displayArgs2("b", "c");// Output: 12 a b c

/*
4.高阶函数
- 函数作为参数被传递（最常见的形式：回调函数）
- 函数作为返回值输出（与闭包有紧密联系）
*/
function add(x, y, f) {
    return f(x) + f(y);
}
add(2,3,function(z){return z*z;});
add(2,-3,Math.abs);// 绝对值
add(2,3,Math.sqrt);//2的开平方加3的开平方
//练习使用高阶函数实现下述公式，要求函数复用
//z = 2*(x+1)-3*y*y;
//c = 2*a*a-3*(b-1);
//k = 2*(i+1)-3(j-1);
function foo(x,y,c1,c2){return 2*c1(x)-3*c2(y);}
function f1(x){return x+1;}
function f2(x){return x-1}
function f3(x){return x*x;}
foo(1,1,f1,f3);//1
foo(1,1,f3,f2);//2
foo(1,1,f1,f2);//4
//实例一  高阶函数一般应用 02 回调函数
//回调函数就是一个参数，将这个函数作为参数传到另一个函数里面，当那个函数执行完之后，再执行传进去的这个函数。这个过程就叫做回调。
var word_2 = "do another thing.";
var function_1=function(callback){
    this.word_1 = "do something.";
    console.log(this.word_1);
    (callback && typeof(callback) === "function") && callback();
};
var function_2=function(){console.log(this.word_2)};
function_1(function_2);
//实例二 数组相关的高阶函数 map reduce filter sort详情参见数组章节
function pow(x) {
    return x * x;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
//将数组所有元素改为数字类型
var result = ["1", "2", "3"].map(function(val) {
    return parseInt(val);
});
for (var i=0;i<result.length;i++){
    console.log(typeof result[i]);
}
//reduce 相当于 [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
var arr = [1, 3, 5, 7, 9];
arr.reduce(function f(x, y) {
    return x + y;
}); // 25
//filter 数组过滤 ，返回为false的将被过滤掉
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
r; // [1, 5, 9, 15]
// sort 排序
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
}); // [1, 2, 10, 20]
//实例三 常用回调函数 设置超时和时间间隔的方法、异步请求、事件监听和处理
//超时回调实例
var timeOutId = setTimeout( function () {
    console.log("你已超时！");
},1000);
// 函数作为返回值输出
var x=12;
var obj = {
    x:34,
    fun2:function(){
        console.log(this.x,this);
    }
};
var fun1 = function () {
    return function fun2() {
        return this.x;//若改为 return this;
    }
};
obj.fun3 = fun1;
obj.fun4 = fun1();
console.log("输出：",obj.fun3());//ƒ fun2() {return this.x;//若改为 return this;}
console.log("输出：",obj.fun3()());//12
console.log("输出：",obj.fun4());//34

