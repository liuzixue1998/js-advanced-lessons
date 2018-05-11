//第十周 星期四 2018.5.10 正则表达式二
/*
1.正则表达式的元字符 及\相关字符
元字符：1 3  5 a b c 等
转义字符：\t 、\v、\n、\r、\0、\f、\cX
与\相关的预定义特殊字符：\d、\D、\w、\W、\s、\S、\b 、\B（注意大小写的含义）
*/
// （1）正则表达式之 \
// 匹配一个词的边界 
//\b 一个词的边界就是一个词不被另外一个词跟随的位置或者不是另一个词汇字符前边的位置。
// 注意:一个匹配的词的边界并不包含在匹配的内容中。
console.log(/oo/.test("moon"));//true
console.log(/oo\b/.test("moon"));//false
console.log(/oon\b/.test("moon"));//true
console.log(/\boo/.test("moon"));//false
//search() 方法不执行全局匹配，它将忽略标志 g。
//它同时忽略 regexp 的 lastIndex 属性，并且总是从字符串的开始进行检索，这意味着它总是返回 stringObject 的第一个匹配的位置。
//如果没有找到任何匹配的子串，则返回 -1。有大小写之分
//一个在字符串中测试匹配的String方法，它返回匹配到的位置索引
console.log("moon".search(/oo/));//1
console.log("moon".search(/oo\b/));//-1
console.log("moon".search(/oon\b/));//1
console.log("moon".search(/\boo\b/));//-1
//(2)\B
//匹配一个非单词边界 \B 他匹配一个前后字符都是相同类型的位置：都是单词或者都不是单词。
//一个字符串的开始和结尾都被认为是非单词。
console.log(/oo\B/.test("moon"));//true
console.log(/oon\B/.test("moon"));//false
console.log(/oo\B/.test("moon"));//true
console.log(/\Boo\B/.test("moon"));//false

console.log("moon".match(/oo\B/));//["oo", index: 1, input: "moon"]
console.log("moonoonxoo".match(/oo\B/));//["oo", index: 1, input: "moonoonxoo"]
console.log("moon".match(/oon\B/));//null
console.log("moo".match(/\Boo\B/));//null

"noonday".replace(/\Boo/,"xx");//"nxxnday"
"noonday".search(/\Boo/);//1
//匹配一个非单词边界  
// /\B../匹配"noonday"中得'oo', 而/y\B./匹配"possibly yesterday"中得’ye‘
console.log("noonday".match(/\B../));//["oo", index: 1, input: "noonday", groups: undefined]
console.log(/\B../.test("noonday"));//true

//  \d匹配一个数字等价于[0-9]  
//例如， /\d/ 或者 /[0-9]/ 匹配"B2 is the suite number."中的'2'
//  \D匹配一个非数字等价于[^0-9]  
//例如， /\D/ 或者 /[^0-9]/ 匹配"B2 is the suite number."中的'B'

//\w匹配一个单字字符（字母、数字或者下划线）。等价于[A-Za-z0-9_]。
//例如, /\w/ 匹配 "apple," 中的 'a'，"$5.28,"中的 '5' 和 "3D." 中的 '3'。

//\W匹配一个非单字字符。等价于[^A-Za-z0-9_]。
//例如, /\W/ 或者 /[^A-Za-z0-9_]/ 匹配 "50%." 中的 '%'。
 
//  \s匹配一个空白字符 例如, /\s\w*/ 匹配"foo bar."中的' bar'
//  \S匹配一个非空白字符 例如, /\S\w*/ 匹配"foo bar."中的'foo'

//\d \D \w \W \s \S 案例
"sdafsa sdfea2s".replace(/a\ds/g,"*");//"sdafsa sdfe*"
"sdafsa sdfea2s".replace(/a\Ds/g,"*");//"sd**dfea2s"
"sdafsa sdfea2s".replace(/a\ws/g,"*");//"sd*a sdfe*"
"sdafsa sdfea2s".replace(/a\Ws/g,"*");//"sdafs*dfea2s"

var str = "test22314234244dgfqeqe232qe13ed";
var newStr = str.search(/\dqe/);
console.log(newStr);//24
str.replace(/\dqe/,11223344);
console.log(str);//test22314234244dgfqeqe232qe13ed

/*
2正则表达式特殊字符 一 （字符类）
[ ]代表字符类，如[abc]代表abc中的任意一个字符，可以配合范围符号-如[a-c3-9]
[^ ]代表字符类取反，如[^abc]代表非abc中的任意一个字符
一个 - 代表范围，如[a-z] 、[a-z0-9A-Z]
一个 . 代表一个除了回车和换行符之外的所有字符 等效于[^\r\n]，（注意与*的区别和含义）
*/
//字符类 []
console.log("absxsdfe123Ab".replace(/[abd]/,"X"));//Xbsxsdfe123Ab
console.log("absxsdfe123Ab".replace(/[abd]/g,"X"));//XXsxsXfe123AX
console.log("absxsdfe123Ab".replace(/[abd]/gi,"X"));//XXsxsXfe123XX

// 字符类 的取反 [^]
console.log("absxsdfe123Ab".replace(/[^abd]/,"X"));//abXxsdfe123Ab
console.log("absxsdfe123Ab".replace(/[^abd]/g,"X"));//abXXXdXXXXXXb
console.log("absxsdfe123Ab".replace(/[^abd]/gi,"X"));//abXXXdXXXXXAb

//范围类
console.log("12345667".replace(/[3-9]/gi,"X"));//12XXXXXX
console.log("absxsdfe123Ab".replace(/[a-f1-9]/gi,"X"));//XXsxsXXXXXXXX
console.log("absxsdfe123Ab".replace(/[a-f][1-9]/gi,"X"));//absxsdfX23Ab 如果单独替换，则需要分组，见后续
console.log("absxsdfe1Q2e3Ab".replace(/[a-f][1-9][A-Z]/gi,"X"));//absxsdfX2Xb

//思考：如何匹配 -
console.log("2017-10-23".replace(/[0-9]/g,"X"));//XXXX-XX-XX
console.log("2017-10-23".replace(/[0-9-]/g,"X"));//XXXXXXXXXX

// \d、\D、\w、\W、\s、\S 用[]如何表示
// [0-9]  \d
// [^0-9]  \D
// [a-zA-Z_0-9] \w
// [^a-zA-Z_0-9] \W
// [\t\n\x0B\f\r]  \s
// [^\t\n\x0B\f\r] \S

//关于 . 除了回车和换行符之外的所有字符
/ab[0-9][^\r\n]/ //等效于/[ab\d.]/
console.log("@abc@123@".replace(/@./g,"Q"));//QbcQ23@
console.log("@abc@123@".replace(/.@/g,"Q"));//@abQ12Q

/*
3.边界字符 ^ $ \b \B （注意^代表的意义与在[ ]中代表的意义不同）
*/
console.log("This is a Boy is".replace(/is/g,0));//Th0 0 a Boy 0
console.log("This is a Boy is".replace(/^is/g,0));//This is a Boy is
console.log("This is a Boy is".replace(/is$/g,0));//This is a Boy 0
console.log("This is a Boy is".replace(/is\b/g,0));//Th0 0 a Boy 0
console.log("This is a Boy is".replace(/is\B/g,0));//This is a Boy is
console.log("This is a Boy is".replace(/\bis/g,0));//This 0 a Boy 0
console.log("This is a Boy is".replace(/\Bis/g,0));//Th0 is a Boy is

/*
4.正则表达式特殊字符 三 （量词） 
?出现0次或1次（最多1次）  +出现1次或多次（至少1次） 
*出现0次或多次（任意次）
{n} 出现n次       {n,m} 出现n到m次      {n,}出现至少n次
*/
//思考如何匹配 12345789abcdef34534789ede
//"12345789abcdef34534789ede".replace(/\d\d\d\d\d\d\d\d/g,"X");//不用量词的写法，非常不好
//"12345789abcdef34534789ede".replace(/\d{8}/g,"X");

//量词 注意*在这里是量词，不是充当通配符，充当通配符的是 .
//? 出现0次或1次（最多出现1次）
console.log("AaBbAb_AaaBbbAba".replace(/Aa?/g,0));//0Bb0b_0aBbb0ba

//+ 出现1次或多次（至少出现1次）
console.log("AaBbAb_AaaBbbAba".replace(/Aa+/g,0));//0BbAb_0BbbAba

//* 出现0次或多次（任意次）
console.log("AaBbAb_AaaBbbAba".replace(/Aa*/g,0));//0Bb0b_0Bbb0ba

//{n} 出现n次
console.log("AaBbAb_AaaBbbAba".replace(/Aa{1}/g,0));//0BbAb_0aBbbAba
console.log("AaBbAb_AaaBbbAba".replace(/Aa{2}/g,0));//AaBbAb_0BbbAba

//{n,m} 出现n到m次
console.log("AaBbAb_AaaBbbAba".replace(/Aa{1,2}/g,0));//0BbAb_0BbbAba

//{n,} 出现至少n次
console.log("AaBbAb_AaaBbbAbaAaaaaaaAaaAaaa".replace(/Aa{2,}/g,0));//AaBbAb_0BbbAba000
console.log("AaBbAb_AaaBbbAbaAaaaaaaAaaAaaa".replace(/Aa{2,4}/g,0));//AaBbAb_0BbbAba0aa00
//注意：0到n次的写法{0,n}而不是{,n}
//思考：
var reg = /d{20}\w\d?\w+\d*\w{3,5}\d{3,}/;

/*
5.正则表达式贪婪模式与非贪婪模式
思考：“12345678”.replace(/\d{3,6}/,'X');返回多少？ X78
默认为贪婪模式（即尽可能多的匹配），在量词后加？可设置为非贪婪模式
*/
//贪婪模式和非贪婪模式
"12345678".replace(/\d{3,6}/,'X');//默认为贪婪模式  X78
"12345678".replace(/\d{3,6}?/,'X');//设置为非贪婪模式 在量词后加？ X45678
"12345678".replace(/\d{3,6}?/g,'X');// XX78

/*
6.正则表达式的分组
思考：匹配Name连续出现3次的正则，/Name{3}/，这样可以么？
使用小括号来进行分组 ，如：/(Name){3}/g
或 |、分组中的或 |
*/
//正则表达式的分组
console.log("NameNameName_11111".replace(/Name{3}/,"X"));//NameNameName_11111
console.log("NameNameName_11111".replace(/(Name){3}/,"X"));//X_11111

console.log("a1b2c3d4e5".replace(/[a-z]\d{3}/,"X"));//a1b2c3d4e5
console.log("a1b2c3d4e5".replace(/([a-z]\d){3}/,"X"));//Xd4e5
console.log("a1b2c3d4e5".replace(/([a-z]\d){3,4}/,"X"));//Xe5
console.log("a1b2c3d4e5".replace(/([a-z]\d){3,4}?/,"X"));//Xd4e5
// 与分组相关的 或
"abcdefghijk".replace(/abcde|fghijk/g,"X");//XX
"abcdefghijk_abcdehijk_abcfghijk".replace(/abc(de|fg)hijk/g,"X");//abcdefghijk_X_X

//练习：
//将"xxabccxxdexx"替换为"yyabccxxdeyy"
//"xxabccxxdexx".replace(/(\bxx)|(xx\b)/g,"yy"); //yyabccxxdeyy
//"xx11xx".replace(/(\bxx)|(xx\b)/g,"mm"); //mm11mm

/*
7.正则表达式的分组的反向引用
思考：如何将2017-10-23转成10/23/2017
*/
//分组的 反向引用
//如何将2017-10-23转成10/23/2017
"2017-10-23".replace(/(\d{4})-(\d{2})-(\d{2})/,"$2/$3/$1");//10/23/2017

/*
8.正则表达式的分组的忽略分组
在分组内加上？：即可
*/
//分组的 忽略分组 （？：）
"2017-10-23".replace(/(?:\d{4})-(\d{2})-(\d{2})/,"$2/$3/$1");//23/$3/10
//注意括号的转义字符，第一个相当于做了分组
console.log(/^(ab)$/.test("(ab)"));//false
console.log(/^\(ab\)$/.test("(ab)"));//true
//正则前瞻，了解即可 判断后边是否满足断言
console.log("a23*4vv".replace(/\w(?=\d)/g,"X"));//XX3*4vv 正项前瞻
console.log("a23*4v8".replace(/\w(?=\d)/g,"X"));//XX3*4X8
console.log("a23*4v8".replace(/\w(?!\d)/g,"X"));//a2X*XvX 负项前瞻

/*
9.正则表达式对象的属性（源自RegExp.prototype）
- global 默认为false        RegExp对象是否有标志g
- ignore case 默认为false   RegExp对象是否有标志i
- multiline 默认为false     RegExp对象是否有标志m（多行搜索）
- lastIndex 表示当前匹配内容的最后一个字符的下一个位置
- sourse 正则表达式文本字符串
*/
var reg1 = /\w/;
var reg2 = /\w/gi;
console.log(reg1.global,reg1.ignoreCase,reg1.multiline,reg1.lastIndex,reg1.source);//false false false 0 "\w"
console.log(reg2.global,reg2.ignoreCase,reg2.multiline,reg2.lastIndex,reg2.source);//true true false 0 "\w"
console.log(reg2.lastIndex);//0
reg2.test("abc23def");
console.log(reg2.lastIndex);//1
reg2.test("abc23def");
console.log(reg2.lastIndex);//2
while (reg2.test("abc23def")){
    console.log(reg2.lastIndex);
}//0 1 2 3 4 5 6 7 8

var reg3 = /\w/gi;
var str = "slfls3r3sfsf";
var returnArray1 = reg3.exec(str);
console.log(reg3.lastIndex,returnArray1);//1 ["s", index: 0, input: "slfls3r3sfsf", groups: undefined]
var returnArray2 = reg3.exec(str);
console.log(reg3.lastIndex,returnArray2);//2 ["l", index: 1, input: "slfls3r3sfsf", groups: undefined]
/*
var returnArray3;
while (returnArray3 = reg3.exec(str)){
    console.log(reg3.lastIndex,returnArray3);
}
*/
//RegExp静态属性
console.log(RegExp.$_);//slfls3r3sfsf
console.log(RegExp.lastMatch);//1

/*
10.正则表达式RegExp原型方法（test）
*/
var regExp = /a/i;
console.log(regExp.test("ab"));//true
console.log(regExp.test("ab"));//true
console.log(regExp.test("ab"));//true
console.log(regExp.test("ab"));//true
var regExp = /a/gi;//test中的lastIndex
console.log(regExp.test("ab"));//true
console.log(regExp.test("ab"));//false 
console.log(regExp.test("ab"));//true
console.log(regExp.test("ab"));//false 
/*
while (regExp.test("aaa")){
    console.log(regExp.lastIndex);//每次执行后从哪开始重新匹配？
}
*/

/*
10.正则表达式RegExp原型方法（exec），可获得详细信息
*/
//Part222 RegExp.prototype.exec 方法 可以获得更为详细的信息，返回一个有属性的数组，
//属性index表示匹配到的位置
//对于非全局模式下返回第一个匹配的和所有的分组项，正则对象的lastIndex不起作用
var execExp = /\d{1,2}(\d)(\d)/;
var retExp = execExp.exec("12s342dsfsf233s");
console.log(retExp instanceof Array,retExp,execExp.lastIndex);
console.log(retExp instanceof Array,retExp,execExp.lastIndex);

//对于全局模式下 每检测一次lastIndex增加一次，再次用此正则对象匹配时，匹配的起始点为上一次的lastIndex
var execExp2 = /\d{1,2}(\d)(\d)/g;
var ts = "12s342dsfsf233s";
console.log(execExp2.exec(ts),execExp2.lastIndex);//lastIndex为 6
console.log(execExp2.exec(ts),execExp2.lastIndex);//lastIndex为 14
/*
var ret2;
while (ret2 = execExp2.exec(ts)){
    console.log(execExp2.lastIndex);//每次执行后从哪开始重新匹配？
}
*/

/*
11.字符串与正则相关的原型方法（
*/
//String.prototype.search 注意search忽略 全局g
console.log("a1b2c3d4".search(/1/));//返回index 1
console.log("a1b2c3d4".search(/f/));//返回index -1 没找到
console.log("a1b2c3d4".search(/\d/g));//返回index 1 忽略全局
console.log("a1b2c3d4".search(/\d\w/g));//返回index 1 忽略全局
//String.prototype.match 如果匹配不到返回null 匹配到了返回数组
// 包含的信息有index 原始字符串 有没有g影响很大
console.log("a1b2c3d4".match(/1/));//[ '1', index: 1, input: 'a1b2c3d4' ]
console.log("a1b2c3d4".match(/f/));//null
console.log("a1b2c3d4".match(/\d/));//[ '1', index: 1, input: 'a1b2c3d4' ]
console.log("a1b2c3d4".match(/\d/g));//[ '1', '2', '3', '4' ]
// String.prototype.replace
console.log("a,b,c,d".replace(",","X"));//aXb,c,d
console.log("a2b3c4d".replace(/[2-3]/,"X"));//aXb3c4d
console.log("a2b3c4d".replace(/[2-3]/g,"X"));//aXbXc4d
//String.prototype.split
console.log("a,b,c,d".split(","));//["a", "b", "c", "d"]
console.log("a2b3c4d".split(/\d/));//["a", "b", "c", "d"]

"abcdef21313sfsflsf1223jlnsa".match(/[a-h]/);//["a", index: 0, input: "abcdef21313sfsflsf1223jlnsa", groups: undefined]
"abcdef21313sfsflsf1223jlnsa".match(/[a-h]/g);//["a", "b", "c", "d", "e", "f", "f", "f", "f", "a"]
"abcdef21313sfsflsf1223jlnsa".match(/[123efsa]/g);//["a", "e", "f", "2", "1", "3", "1", "3", "s", "f", "s", "f", "s", "f", "1", "2", "2", "3", "s", "a"]
"abcdef21313sfsflsf1223jlnsa".match(/[^123efsa]/g);//["b", "c", "d", "l", "j", "l", "n"]
"abcdef21313sfsflsf1223jlnsa".match(/[1-2a-d]/g);//["a", "b", "c", "d", "2", "1", "1", "1", "2", "2", "a"]
"hello world Hi you".match(/hello|world/);//["hello", index: 0, input: "hello world Hi you", groups: undefined]
"hello world Hi you".match(/hello|world/g);//(2) ["hello", "world"]
"world Hi you".match(/hello|world/);//["world", index: 0, input: "world Hi you", groups: undefined]
"THat hot hat".match(/h.t/);//["hot", index: 5, input: "THat hot hat", groups: undefined]
"THat hot hat".match(/h.t/g);//(2) ["hot", "hat"]
"THat hot hat".match(/h.t/gi);//(3) ["Hat", "hot", "hat"]


