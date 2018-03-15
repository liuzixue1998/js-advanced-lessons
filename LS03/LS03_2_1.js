//第二周 星期一  今天2018年3月13号
/*
1.Number进阶
Number基本数据类型变量有与其对应的Number包装对象
当访问Number基本数据类型属性或方法时创建临时包装对象，访问的都是对象中的属性或方法
访问对象属性时，首先访问自身属性，访问不到时，则会在原型链上寻找对应的属性和方法
*/
//Number构造器属性（静态属性）
Number.MAX_VALUE //1.7976931348623157e+308 js中可表示的最大的数
Number.MIN_VALUE//5e-324  js中可表示的最小的数
Number.NaN //NaN
Number.NEGATIVE_INFINITY//-infinity
Number.POSITIVE_INFINITY //infinity 大于Number.MAX_VALUE的值

//Number原型方法(Number对象继承的方法）
Number.prototype.toFixed(); //0
Number.prototype.toPrecision();//0
Number.prototype.toString();//0
Number.prototype.toExponential();//0e+0
//Number常用方法
var n1 = 12345.6789;
console.log(n1.toFixed(2));//12345.68  可把 Number 四舍五入为指定小数位数的数字。
console.log(n1.toPrecision(2));//1.2e+4  可在对象的值超出指定位数时将其转换为指数计数法。
console.log(n1.toString());//12345.6789 可把一个 Number 对象转换为一个字符串，并返回结果。
console.log(n1.toExponential(2));//1.23e+4   可把对象的值转换成指数计数法。
//实例化Number对象
console.log(NaN === NaN); //false
console.log(isNaN("12,3"));//true  isNaN() 函数用来确定一个值是否为NaN 
console.log(Math.floor(3.8));//3   Math.floor()向下取整
console.log(Math.floor(-3.8));//-4
console.log(Math.ceil(3.2));//4   Math.ceil() 向上取整
console.log(Math.ceil(-3.2));//-3
console.log(Math.round(-3.2));//-3  Math.round()四舍五入    
console.log(Math.round(-3.5));//-3
console.log(Math.round(-3.8));//-4

/*
2.String进阶
String基本数据类型变量有与其对应的String包装对象
当访问String基本数据类型属性或方法时创建临时包装对象，访问的都是对象中的属性或方法
访问对象属性时，首先访问自身属性，访问不到时，则会在原型链上寻找对应的属性和方法
*/
//字符串比较
console.log("A" > "a"); //false
console.log("B".localeCompare("A")); //1  考虑本地化的字符排序，返回0或非0
console.log("A".localeCompare("A")); //0
console.log("A".localeCompare("B"));//-1
//字符串链接
var a = "abc";
var b = "def";
var c = a+b;//abcdef
//字符串原型方法
//String.prototype.charAt(pos);
//String.prototype.charCodeAt(pos);
//String.prototype.slice(start,end?);
//String.prototype.substr(start,length?)
//String.prototype.substring(start,end?);
//String.prototype.split(separator?,limit?);  ？表示可有可无
//字符串常用方法
var str2 = "abcdef".slice(2);//cdef 提取字符串的一部分，从第三个开始到末尾
var str3 = "abcdef".slice(2,5);//cde  从第三个到第六个之前
var str4 = "abcdef".slice(-2);//ef  从右边第一个开始取两个
var str5 = "abcdef".slice(2,-2);//cd  正数第三个到倒数第二个之前
var arr6 = "abcdef".split("c"); //["ab", "def"]  以c为界限分成两个字符串
var arr7 = "abcdef".split("c",1);//["ab"]   以c为界限拆分，要返回的子字符串的最大数量为1
var arr8 = "abcdef".split("c",2);// ["ab", "def"] 以c为界限拆分，要返回的子字符串的最大数量为2
var str9 = "abcdef".charAt(2);//c 返回从0开始，基数为2的字符
var str10 = "abcdef".charCodeAt(3);//100 回字符串第一个字符的 Unicode 编码:
var str11 = "abcdefabcdef".indexOf("d",1);//3  从第一个开始找，第一次出现d的位置
var str12 = "abcdefabcdef".indexOf("d",4);//9  从第4个开始找
//substr 与 substring的区别
var str13 = "abcdefghijklmn";
var str14 = str13.substr(2,5);//后一个参数代表长度
console.log(str13,str14);//abcdefghijklmn cdefg 未受到破坏
var str15 = str13.substring(2,5);//后一个参数代表第几个end
console.log(str13,str15);//abcdefghijklmn cde 未受到破坏
// 字符串变换 原型方法
//String.prototype.trim( );
//String.prototype.concat(str1?,str2?);
//String.prototype.toLowerCase( );
//String.prototype.toLocaleLowerCase( );
//String.prototype.toUpperCase( );
//String.prototype.toLocaleUpperCase( );
var str16 = "aaa".concat("bbb");// aaabbb 连接两个字符串
var str17 = "    abc def     \r\n  ".trim();// abc def 返回已移除前导空格、尾随空格和行终止符的原始字符串
var str18 = "abcDEF".toLowerCase();//abcdef 小写
var str19 = "abcDEF".toUpperCase();//ABCDEF 大写
// 检索和比较
//String.prototype.indexOf(searchingString,position?);
//String.prototype.lastIndexOf(searchingString,position?);
//String.prototype.localeCompare(other);
var indexOf = "abcDEFabcDEFabcDEF".indexOf("D",6);//9 从第六个开始找，第一次出现D的位置
var lastIndexOf = "abcDEFabcDEFabcDEF".lastIndexOf("D");//15 D最后一次出现的位置
//与正则相关的方法 
//String.prototype.search(regexp);用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。
//String.prototype.match(regexp);在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。返回指定的值
//String.prototype.replace(regexp);用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
/*
3.Boolean进阶
*/
//所有的对象都是真值
Boolean({});//true;
Boolean([]);//true;
Boolean(new Boolean(false))//true;
Boolean(function foo(){})//true;