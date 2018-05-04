//星期一 第九周 2018.5.3
/*
1.创建数组的方式
- 通过字面量的方式直接创建，直接量中的值可以是任意的表达式
- 通过Array构造函数来创建数组对象，注意传递的参数
*/
var arr1 = [1,2,3,"4"];
console.log(arr1)//[1, 2, 3, "4"]
var arr2 = new Array(5);//思考var arr2 = new Array("5");  输出为["5"]
console.log(arr2);//[empty × 5]  
//回顾数据类型
var a1 = [1,2,3];
var a2 = a1;
a2.length = 0;
console.log(a1,a2);//[] [] 指向同一块内存空间
var a3 = [1,2,3];
var a4 = a3;
a4 = [];
console.log(a3,a4);//[1,2,3] []

/*
2.数组元素的增删改查的基本操作
*/
//例一
var a = ["hello"];
a[1] = 3.14;//增：直接添加数组元素，通过方法添加元素参见后续章节
a[2] = "world";
console.log("删除a[2]前的数组a",a);//(3) ["hello", 3.14, "world"]
delete a[2];//删：思考此时数组长度是2还是3？如何彻底删除？直接修改length与pop方法
console.log("删除a[2]后的数组a",a);//(3) ["hello", 3.14, empty]
a[0] = "XX";//改：修改数组元素a[0]
console.log(a[0]);//查:看数组中的元素，索引从0开始//XX
//例二
var i=2,b=[];
b[i]=3;
b[i+1]="YY";
b[b[i]] = b[0];
console.log(b);//[empty × 2, 3, undefined] 
//b[0],b[1]为empty  b[2]=3,b[3]="YY",b[b[2]]=undefined

/*
3.数组相对于普通对象的特别之处
- 数组是对象的特殊形式，可以为数组添加对象属性
  对于0至2的32次方之外的数，将作为普通对象的键来对待
- 数组特别之处在于，当使用使用2的32次方以内的非负整数作为属性名时（包括类型转换的数字）
  数组会自动维护其length属性，作为数组的元素，而不是数组对象的属性
*/
var a = [];
a[-1.23] = true; //创建一个名为“-1,23”的属性
a["100"] = 0;   // 数组的第101个元素
a[1.00] = "Hi"; //和a[1]相当
console.log(a.length);//101
console.log(a);//(101) [empty, "Hi", empty × 98, 0, -1.23: true]

/*
4.稀疏数组
- 稀疏数组是包含从0开始的不连续索引的数组，length值大于实际定义的元素的个数
- 遍历稀疏数组时，注意的跳过无元素项的问题
*/
var a1 = [,"abc"];
console.log(a1.length);//2
for(var i in a1){
    console.log(i,a1[i]);//1 abc
}
console.log(0 in a1,1 in a1);//false true
var a2 = new Array(3);
console.log(a2.length);//3
console.log(a2);//[empty × 3]
//注意：
var a3 = [,,];
console.log(a3.length);//2
console.log(["a","b"].length);//2
console.log(["a","b",].length);//2
console.log(["a","b",,].length);//3

/*
5.多维数组（矩形数组、交错数组）
- JS中可以通过包含数组的数组来模拟多维数组
*/
var table = new Array(5);
for(var i=0;i<table.length;i++){
    table[i] = new Array(5);//若是table[i] = new Array(i);
    for(var col=0;col<table[i].length;col++){
        table[i][col]=i*col;
    }
}
var product = table[2][4];
console.log(table);//[Array(5), Array(5), Array(5), Array(5), Array(5)]

/*
6.数组的静态方法（构造器函数对象的方法）
*/
var bar = ["a", "b", "c"];
//Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。
Array.from(bar);// ["a", "b", "c"]
Array.from('foo');// ["f", "o", "o"]
//Array.isArray() 用于确定传递的值是否是一个 Array。
//Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]
Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
var arr1 = [1,3,4];
console.log(Array.isArray(arr1));
function foo(){
    console.log(Array.isArray(arguments));
    //console.log(arguments.pop());//这样是否能调用？数组与类数组对象
    console.log(Array.prototype.pop.call(arguments));
}
foo(3,2,5);

/*
7.数组添加删除元素的原型方法 破坏性
*/
var arr2 = [1,3,5,7];
var shiftElement = arr2.shift();//返回去除的元素
console.log(shiftElement,arr2);//(3) [3, 5, 7]
var newLength = arr2.unshift(1,2);//返回新的数组长度
console.log(newLength,arr2);//(5) [1, 2, 3, 5, 7]
var popElement = arr2.pop();//返回pop出去的元素
console.log(popElement,arr2);//(4) [1, 2, 3, 5]
var newLength = arr2.push(77,88);//返回新的数组长度
console.log(newLength,arr2);//(6) [1, 2, 3, 5, 77, 88]
//思考：如何通过push将两个数组组合成一个数组
var arr3 = ["a","b"];
var arr4 = ["c","d"];
Array.prototype.push.apply(arr3,arr4);
console.log(arr3);//(4) ["a", "b", "c", "d"]
//splice 从start开始，移除deleteCount个元素，并插入给定的元素
var arr5 = ["a","b","c","d"];
var spliceElements = arr5.splice(1,2,"x");//返回切掉的数组
console.log(spliceElements,arr5);//(2) ["b", "c"] (3) ["a", "x", "d"]

/*
8. 排序和颠倒元素顺序 破坏性
*/
//Array.prototype.reverse()
var arr1 = [1,2,3];
arr1.reverse();
console.log(arr1);//(3) [3, 2, 1]
var arr2 = ["banana","apple","pear","orange"];
arr2.sort();
console.log(arr2);//(4) ["apple", "banana", "orange", "pear"]
//思考sort中的参数
var arr3 = [-1,-20,7,50];
arr3.sort();
console.log(arr3);//(4) [-1, -20, 50, 7]
//sort传递的函数对象
arr3.sort(function (a,b) {return a-b;});//对于数字类型，大于0则交换，冒泡排序
//arr3.sort(function (a,b) {return a>b;});//对于布尔类型，true则交换，冒泡排序
//如果想让arr2按第二个字母排序，怎么写？
var arr2 = ["banana","apple","pear","orange"];
arr2.sort(function(a,b){return a[1]>b[1];});
console.log(arr2);//(4) ["banana", "pear", "apple", "orange"]

/*
9.合并、切分和连接 非破坏性
*/
//Array.prototype.concat(arr1?,arr2?,...)
var arr4 = ["banana","apple"];
var arr5 = ["pear","orange"];
var newArray = arr4.concat(arr5);
console.log(newArray,arr4,arr5);
//(4) ["banana", "apple", "pear", "orange"] (2) ["banana", "apple"] (2) ["pear", "orange"]
//Array.prototype.slice(begin?,end?)注意：不要和splice弄混了
var arr6 = [1,2,3,4,5];
var newArray = arr6.slice(2,4);
console.log(newArray,arr6);//(2) [3, 4] (5) [1, 2, 3, 4, 5]
var newArray2 = arr6.slice(2);
console.log(newArray2,arr6);//(3) [3, 4, 5] (5) [1, 2, 3, 4, 5]
//Array.prototype.join(separator?)
var arr7 = [3,4,5];
var joinReturn = arr7.join("--");//返回了个什么类型？
console.log(joinReturn,arr7);//3--4--5 (3) [3, 4, 5]
console.log(typeof joinReturn);//string
//注意：稀疏数组调用join
console.log([3,,,,,,5].join("*"));//3******5

/*
10.值的查找 非破坏性
*/
//Array.prototype.indexOf(searchValue,startIndex?)
var arr8 = [1,3,5,5,7,9,5];
console.log(arr8.indexOf(5));//2
console.log(arr8.indexOf(5,3));//3
console.log(arr8.indexOf(5,5));//4
//Array.prototype.lastIndexOf(searchElement,startIndex?)
console.log(arr8.lastIndexOf(5));//6
console.log(arr8.lastIndexOf(5,3));//3
console.log(arr8.lastIndexOf(5,5));//3
