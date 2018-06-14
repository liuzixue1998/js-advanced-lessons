//15周 星期四 2018.6.14  对函数的扩展
/*
1.ES6中提供了新的语法规则来描述函数（箭头函数=>）
- 箭头函数语法简单地描述为：参数 => 函数体 或 （参数） => { 函数体 }
- 优点：可减少冗余的代码（如function关键字等）节省空间，避免this指向错误
- 如果箭头函数不需要参数或需要多个参数时，就使用一个圆括号代表参数部分
*/
//例一
var f = function (v) {
    return v + 1;
};f(2);//3
//使用箭头函数，上述代码等效如下,只有一个参数和一条语句
//复合语句的话，需要使用大括号和对应的return语句进行返回，
var f = v => v + 1; //单参数可以不用（），单语句可以不用return关键字
//var f = (v) => {return v + 1;};
f(2);//3

//例二
//没有参数和有多个参数的情况下，需要使用小括号来表示参数，如果有多条语句则需要有大括号表示函数体
var f = () => 5;
// 等同于
var f = function () {
    return 5
};

//例三
var foo = (num1, num2) => {
    if (num1 > num2) {
        return num1 * 2;
    } else {
        return num2 * 2;
    }
};
foo(2,3);//6
// 等同于 ES5的写法
var foo = function (num1, num2) {
    if (num1 > num2) {
        return num1 * 2;
    } else {
        return num2 * 2;
    }
};
foo(2,3);//6

//例四
var max = function (a, b) {
    return a > b ? a : b;
};
var max=(a,b)=>a > b ? a : b;

//例五
//箭头函数可以与变量解构赋值结合使用
const full = ({ first, last }) => last + ' ' + first;
full({first:"Ming",last:"Li"});//Li Ming
// 等同于
function full({ first, last }) {
  return last + ' ' + first;
}
full({first:"Ming",last:"Li"});//Li Ming

/*
1（1）.箭头函数需注意的几个点
- 函数内的 this是与函数定义时所在的对象绑定，而不是使用时所在的对象（避免this缺陷）
- 大括号被解释为代码块，所以如果箭头函数直接返回一个对象，需在对象外面加上括号
*/
//例一
//方法中的函数嵌套 this缺陷
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        //内部嵌套函数
        function moveToX() {
            this.x = x;//this绑定到使用时所在的对象上
        }
        //内部嵌套函数
        function moveToY() {
            this.y = y;//this绑定到使用时所在的对象上
        }
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);//{x: 0, y: 0, moveTo: ƒ}
console.log(window.x,window.y);//2 2
//ES6中 箭头函数中this是与函数定义时所在的对象绑定，而不是使用时所在的对象（避免this缺陷）
//箭头函数导致this总是指向函数定义生效时所在的对象
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        //内部嵌套函数
        var moveToX = ()=>this.x=x;//与函数定义时所在的对象绑定
        //内部嵌套函数
        var moveToY = ()=>this.y=y;////与函数定义时所在的对象绑定
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);//{x: 2, y: 2, moveTo: ƒ}
console.log(window.x,window.y);//undefined undefined

//例二
//方法中的函数嵌套 this缺陷 ES5中通过软绑定解决办法
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        var that = this;//关键的一行，软绑定
        //内部嵌套函数
        function moveToX() {
            that.x = x;//this改为that
        }
        //内部嵌套函数
        function moveToY() {
            that.y = y;//this绑定到了函数的所在对象
        }
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);//{x: 2, y: 2, moveTo: ƒ}
console.log(window.x,window.y);//undefined undefined

// 箭头函数有几个使用注意点。
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
// （4）不可以使用yield命令，因此箭头函数不能用作Generator函数
//例一
//ES5
function foo() {
    setTimeout(function(){
        console.log('id:', this.id);
    }, 100);
}
var id = 21;
foo.call({ id: 42 });// id: 21
//ES6
function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}
var id = 21;
foo.call({ id: 42 });// id: 42
//箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42
//其实箭头函数里面没有自己的this，而是引用外层的this

//例二
//其实箭头函数里面没有自己的this，而是引用外层的this
//由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向
function foo() {
    return () => {
        return () => {
            return () => {
                console.log('id:', this.id);
            };
        };
    };
}
var f = foo.call({id: 1});
var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1

//例三
//需要特别注意：
//由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上小括号
var getTempItem = itemId => ({ id: itemId, name: "Temp" });
getTempItem(23);//{id: 23, name: "Temp"}
//等效于
var getTempItem = function (itemId) {
    return { id: itemId, name: "Temp" }
};
getTempItem(23);//{id: 23, name: "Temp"}


/*
2.ES6对默认值的扩展
*/
// ES5 中实现函数参数默认值的方法
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));//1+2+3
console.log(sum(1,2));//1+2+5
console.log(sum(1));//1+4+5
console.log(sum(1,0,0));//本应为1+0+0，但此处为1+4+5，代码有问题需优化，优化如下
//优化改造版本
var sum = function(a,b,c){
    if(b!=false){b = b||4;}//(b!=false)&&(b=b||4);
    if(c!=false){c = c||5;}//(c!=false)&&(c=c||5);
    return a+b+c;
};
console.log(sum(1,2,3));//1+2+3
console.log(sum(1,2));//1+2+5
console.log(sum(1));//1+4+5
console.log(sum(1,0,0));//1+0+0
// ES6 中实现函数参数默认值的方法 ,使用babble查看ES5的写法
var sum = function(a,b=4,c=5){
    return a+b+c;
};
console.log(sum(1,2,3));//1+2+3
console.log(sum(1,2));//1+2+5
console.log(sum(1));//1+4+5
console.log(sum(1,0,0));//1+0+0
//默认值案例
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
    console.log(url);
    console.log(body);
    console.log(method);
    console.log(headers);
}
fetch('http://example.com')

/*
ES6函数的参数默认值注意事项
- 带默认值的参数变量是默认声明的，所以函数体内不能再用let或const重复声明
- 参数一般有顺序，有默认值的参数应该是尾参数，这样可以使有默认值的用默认值   没有默认值的用传递的值
*/

//例二
function foo(x=5){
    let x = 1;//报错
    const x = 2;//报错
    var x = 3;//正常
}
foo();

//默认值顺序，参数一般有顺序，有默认值的参数应该是尾参数
//否则无法使有默认值的用默认值，没有默认值的用传递的参数
function f(x = 1,y) {
    return [x,y];
}
f();//[1,undefined]
f(2);//[2,undefined]
//f(,3);//报错，无法使x用1，y用3

//所以有默认值的参数在最后
function f(x,y = 1) {
    return [x,y];
}
f();//[undefined, 1]
f(2);//[2, 1] 这样就可以x为传递的参数，y为默认的值


/*
3.ES6 中的Rest与Spread操作符
*/

/*
...Rest（剩余操作符）
- rest运算符用于获取函数调用时传入的参数。
- 主要用在函数参数的声明中，可获得隐含的实参，取代ES5中函数隐藏变量arguments
- arguments（获得所有实参）是个类数组对象，缺点不能像操作数组那样直接操作
- ...Rest比arguments更灵活，...Rest操作符需放在了函数形参的最后，实例如下
*/
//例一
// ES5中 实参数大于形参数量时，可以通过arguments来获得所有参数
function test() {
    console.log(arguments);//console.log(test.arguments);
}
test("a","b","c");//
//...Rest 相当于合并若干参数为一个数组，主要用于函数定义时，代替 arguments，组解决arguments的弊端
function f(...y){
    console.log(y);
}
f("a","b","c");//Arguments(3) ["a", "b", "c", callee: ƒ, Symbol(Symbol.iterator): ƒ]

//例二
function add(...values) {
    let sum = 0;
    for (var val of values) {
      sum += val;
    }
    return sum;
  }
add(2, 5, 3) // 10

//比arguments使用更加灵活,比如只想看从第二个开始之后的参数
function f(x,...y){
    console.log(x,y);
}
f("a","b","c","d");//输出 "a",["b","c","d"]
f("a",["b","c","d"]);//输出 "a",[["b","c","d"]]
f("a");//输出 "a",[]
f();//输出 undefined,[]
//思考function f(x,...y，z){console.log(y);}//此时y输出是什么 
// 报错 ...Rest操作符需要放在形参的最后

/*
...Spread（扩展操作符）
- spread运算符用于数组的构造，析构，以及在函数调用时使用数组填充参数列表。
- 主要用在函数的调用中使用（虽然也是...，但使用的场景不同）
- Spread将一个数组转换为用逗号分隔的参数序列，是...Rest的逆过程
- 在call和apply的转换过程中十分有用
*/
//...Spread 扩展操作符 相当于解数组为分散的参数，主要用于函数调用时，...Rest的逆运算
function f(x,...y){
    console.log(x,y);
}
f("a",...["b","c"]);//等价于f("a","b","c");
f("a");//输出 "a",[]
f();//输出 undefined,[]

//补充
let arrs1 = ['aa', 'bb'];
let arrs2 = ['cc', 'dd'];
// 合并数组
let arrs = [...arrs1, ...arrs2];
console.log(arrs); // ['aa', 'bb', 'cc', 'dd']
// 析构数组
let param1, param2;
[param1, ...param2] = arrs1;
console.log(param1); // aa
console.log(param2); // ['bb']


// 扩展知识 call与apply的转换 两者之间的区别 课通过...Rest和...Spread转换
function abc(...v){
    console.log(v)
}
o1 = {};
abc.call(o1,...[1,2,3]);//等效于 abc.apply(o1,[1,2,3]);
//函数定义和调用时的 合并元素为数组（...Rest） 与 拆分数组为各个元素(...Spread)
