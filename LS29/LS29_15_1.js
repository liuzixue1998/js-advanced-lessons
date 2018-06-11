//十五周 星期一 2018.6.11
//ES6对内置对象的扩展
/*
1.对string的扩展
*/
// ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历
for (let codePoint of 'foo') {
    console.log(codePoint)
}
// "f" "o" "o"

for (let key in 'foo') {
    console.log(key);
}//0 1 2

//提供新的方法用于查找、判断和生成字符串
var s = 'Hello world!';
s.startsWith('Hello'); // true
s.endsWith('!'); // true
s.includes('o'); // true
//第二个参数，表示开始搜索的位置
var s = 'Hello world!';
s.startsWith('world', 6); // true
s.endsWith('Hello', 5); // true
s.includes('Hello', 6); // false

//repeat方法返回一个新字符串，表示将原字符串重复n次。
'x'.repeat(3); // "xxx"
'hello'.repeat(2); // "hellohello"
'na'.repeat(0); // ""
//参数如果是小数，会被取整。
'na'.repeat(2.9); // "nana"
//如果repeat的参数是负数或者Infinity，会报错。
'na'.repeat(Infinity);
// RangeError
'na'.repeat(-1);
// RangeError


/*
2.对RegExp的扩展
*/
//在ES5中，RegExp构造函数的参数有两种情况。
//第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;

//第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;
//但是，ES5不允许此时使用第二个参数，添加修饰符，否则会报错。
var regex = new RegExp(/xyz/, 'i');
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another

//ES6改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。
// 而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
new RegExp(/abc/ig, 'i').flags// "i"
//（粘连sticky）修饰符
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;
r1.exec(s); // ["aaa"]
r2.exec(s); // ["aaa"]
r1.exec(s); // ["aa"]
r2.exec(s); // null
//上面代码有两个正则表达式，一个使用g修饰符，另一个使用y修饰符。
// 这两个正则表达式各执行了两次，第一次执行的时候，两者行为相同，剩余字符串都是_aa_a。
//由于g修饰没有位置要求，所以第二次执行会返回结果，而y修饰符要求匹配必须从头部开始，所以返回null。
var r = /hello\d/y;
r.sticky // true

// ES5的source属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"
// ES6的flags属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'

/*
3.对number的扩展
*/
//ES6在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。
//Number.isFinite();//用来检查一个数值是否为有限的（finite）。
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

//Number.isNaN()//用来检查一个值是否为NaN。
Number.isNaN(NaN); // true
Number.isNaN(15); // false
Number.isNaN('15'); // false
Number.isNaN(true); // false
Number.isNaN(9/NaN); // true
Number.isNaN('true'/0); // true
Number.isNaN('true'/'true') // true
//ES5通过下面的代码，部署Number.isNaN()。

//它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，
// 而这两个新方法只对数值有效，非数值一律返回false。
isFinite(25); // true
isFinite("25"); // true
Number.isFinite(25); // true
Number.isFinite("25"); // false
isNaN(NaN); // true
isNaN("NaN"); // true
Number.isNaN(NaN); // true
Number.isNaN("NaN"); // false

//Number.parseInt(), Number.parseFloat()
//ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
// ES5的写法
parseInt('12.34'); // 12
parseFloat('123.45#'); // 123.45
// ES6的写法
Number.parseInt('12.34'); // 12
Number.parseFloat('123.45#'); // 123.45

//这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true

//Number.isInteger()
//Number.isInteger()用来判断一个值是否为整数。
// 需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。
Number.isInteger(25); // true
Number.isInteger(25.0); // true
Number.isInteger(25.1); // false
Number.isInteger("15"); // false
Number.isInteger(true); // false
/*
4.对math的扩展
*/
//Math.trunc方法用于去除一个数的小数部分，返回整数部分。
Math.trunc(4.1); // 4
Math.trunc(4.9); // 4
Math.trunc(-4.1); // -4
Math.trunc(-4.9); // -4
Math.trunc(-0.1234); // -0
//Math.sign方法用来判断一个数到底是正数、负数、还是零
Math.sign(-5); // -1
Math.sign(5); // +1
Math.sign(0); // +0
Math.sign(-0); // -0
Math.sign(NaN); // NaN
Math.sign('foo'); // NaN
Math.sign(); // NaN


/*
5.对array的扩展
*/
//下面是一个类似数组的对象，Array.from将它转为真正的数组。
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = Array.prototype.slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
// arguments对象 案例
function foo() {
    // var args = Array.prototype.slice.call(arguments);
    var args = Array.from(arguments);//
    console.log(args);
}
//只要是部署了Iterator接口的数据结构，Array.from都能将其转为数组
Array.from('hello');// ['h', 'e', 'l', 'l', 'o']
let namesSet = new Set(['a', 'b']);
Array.from(namesSet); // ['a', 'b']

//值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。
// arguments对象
function foo() {
    var args = [...arguments];
}

//扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。Array.from方法则是还支持类似数组的对
//象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此
//时扩展运算符就无法转换。
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
//上面代码中，Array.from返回了一个具有三个成员的数组，每个位置的值都是undefined。扩展运算符转换不了这个对象。

//Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
Array.from([1, 2, 3], function(x){return x * x} );// [1, 4, 9]
//Array.from([1, 2, 3], (x) => x * x);// [1, 4, 9]
// 等同于
Array.from([1, 2, 3]).map(function(x){return x * x});
//Array.from([1, 2, 3]).map(x => x * x);

//关于Array.of静态方法
//Array.of方法用于将一组值，转换为数组。
Array.of(3, 11, 8); // [3,11,8]
Array.of(3); // [3]
Array.of(3).length; // 1
//这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
Array(); // []
Array(3); // [, , ,]
Array(3, 11, 8); // [3, 11, 8]
//上面代码中，Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于2个时，Array()才会返回由参数组成的新数
//组。参数个数只有一个时，实际上是指定数组的长度

//Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
Array.of(); // []
Array.of(undefined); // [undefined]
Array.of(1); // [1]
Array.of(1, 2); // [1, 2]
//Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组

//ES5可以用下面的代码模拟实现Array.of方法
function ArrayOf(){
    return [].slice.call(arguments);
}

//Part 2222222222222222222 Array新增的原型方法
//数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），
//然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
//Array.prototype.copyWithin(target, start = 0, end = this.length)
//它接受三个参数
//target（必需）：从该位置开始替换数据。
//start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
//end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数
[1, 2, 3, 4, 5].copyWithin(0, 3);// [4, 5, 3, 4, 5]

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4);// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
 [1, 2, 3, 4, 5].copyWithin(0, -2, -1);// [4, 2, 3, 4, 5]


//数组实例的find方法，用于找出第一个符合条件的数组成员。
//它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
//如果没有符合条件的成员，则返回undefined。
[1, 4, -5, 10].find(
    function(n){
        return n<0;
    }
);
//上面代码找出数组中第一个小于0的成员。
//[1, 4, -5, 10].find((n) => n < 0);// -5 箭头函数的表示形式

[1, 5, 10, 15].find(function(value, index, arr) {
    return value > 9;
}); // 10
//上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
//数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
[1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
}) // 2
//这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。

//fill方法使用给定值，填充一个数组。
['a','b','c'].fill(7);
// [7, 7, 7]

//fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
['x', 'y', 'z'].fill(7, 1, 2);
// ['x', 7, 'z']
//上面代码表示，fill方法从1号位开始，向原数组填充7，到2号位之前结束

// ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。
// 它们都返回一个遍历器对象，可以用for...of循环进行遍历。
// 唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
for (let index of ['a', 'b'].keys()) {
    console.log(index);
}// 0 1

for (let elem of ['a', 'b'].values()) {
    console.log(elem);
}
// 'a' 'b'
for (let [index, elem] of ['a', 'b'].entries()) { //[index,elem] 解构赋值
    console.log(index, elem);
}
// 0 "a" // 1 "b"

/*
//下述内容参见迭代器章节
//如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。iterator参见后续章节
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']

//Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。
// 该方法属于ES7，但Babel转码器已经支持。
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
[1, 2, NaN].includes(NaN); // true
//该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，
// 如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
//没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值
*/

//Array空位数组（稀疏数组）
//forEach(), filter(), every() 和some()都会跳过空位。
//map()会跳过空位，但会保留这个值
//join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
new Array(3);// [, , ,]
//空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false

//单独测试下述代码
/*
// forEach方法
[,'a'].forEach(function(x,i){return console.log(i);}); // 1

// filter方法
['a',,'b'].filter(function(x){return true;}) // ['a','b']

// every方法
[,'a'].every(function(x){return x==='a'}) // true

// some方法
[,'a'].some(function(x){return x !== 'a';} ) // false

// map方法
[,'a'].map(function (x) {return 1;}) // [,1]
*/


/*
6.对object的扩展
*/
//ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
var foo = 'bar';
var baz = {foo};
baz // {foo: "bar"}
// 等同于
var baz = {foo: foo};

//上面代码表明，ES6允许在对象之中，只写属性名，不写属性值。
// 这时，属性值等于属性名所代表的变量。
// 下面是另一个例子,返回对象的简洁表示法
function f(x, y) {
    return {x, y};
}
// 等同于
function f(x, y) {
    return {x: x, y: y};
}
f(1, 2); // Object {x: 1, y: 2}

//除了属性简写，方法也可以简写。
var o = {
    method() {
        return "Hello!";
    }
};
// 等同于
var o = {
    method: function() {
        return "Hello!";
    }
};
//下面是一个实际的例子。
var birth = '2000/01/01';
var p1 = {
    name: '张三',
//等同于birth: birth
    birth,
// 等同于hello: function ()...
    hello() { console.log('我的名字是', this.name); }
};
//这种写法用于函数的返回值，将会非常方便。
function getPoint() {
    var x = 1;
    var y = 10;
    return {x, y};
}
getPoint();// {x:1, y:10}

//ES6允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
let propKey = 'foo';
let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
};
//下面是另一个例子。
var lastWord = 'last word';
var a = {
    'first word': 'hello',
    [lastWord]: 'world'
};
a['first word']; // "hello"
a[lastWord]; // "world"
a['last word']; // "world"
//表达式还可以用于定义方法名。
let obj = {
    ['h'+'ello']() {
        return 'hi';
    }
};
obj.hello(); // hi

//注意，属性名表达式与简洁表示法，不能同时使用，会报错。
// 报错
var foo = 'bar';
var bar = 'abc';
// var baz = { [foo] };//报错

// 正确
var foo = 'bar';
var baz = { [foo]: 'abc'};//或var baz = { [foo]: bar};


//Object.is它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致
console.log(Object.is(1,"1"));//false
console.log(Object.is(1,1));//true
//和===的区别之处如下
console.log(+0 === -0); //true
console.log(NaN === NaN); // false
console.log(Object.is(+0, -0)); // false
console.log(Object.is(NaN, NaN)); // true

// Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
var target = { a: 1 };
var source1 = { b: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target; // {a:1, b:2, c:3}

// 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
var target = { a: 1, b: 1 };
var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target; // {a:1, b:2, c:3}

//Object.assign方法实行的是浅拷贝，而不是深拷贝。
//也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
var obj1 = {a: {b: 1}};
var obj2 = Object.assign({}, obj1);
obj1.a.b = 2;
obj2.a.b; // 2

//Object.getPrototypeOf()、Object.setPrototypeOf()方法
var obj = Object.create({x:1,y:2});
console.log(Object.getPrototypeOf(obj));
Object.setPrototypeOf(obj,{z:3});
console.log(Object.getPrototypeOf(obj));

//回顾ES5 中的Object.keys静态方法
//values 和 entries 方法
var obj = { foo: "bar", baz: 42 };
Object.values(obj);// ["bar", 42]

var obj = { foo: 'bar', baz: 42 };
Object.entries(obj);// [ ["foo", "bar"], ["baz", 42] ]
for(var [k,v] of Object.entries(obj)){ //解构赋值
    console.log(k,v);
}