//星期一 第十周 2018.5.7
/*
1.什么是正则表达式
- 正则表达式是对字符串和特殊字符操作的一种逻辑公式，是对字符串执行模式匹配的工具
- 正则表达式通常被用来检索、替换那些符合某个模式(规则)的文本
- JS中正则表达式是一个描述字符模式的对象，可以通过字面量、RegExp构造器来生成
*/
//创建方式
//（1）正则对象的创建方式一 通过字面量直接创建
var reg1 = /[bcf]at/gi; //gi全局匹配+忽略大小写
//（2）正则对象的创建方式二 通过RegExp构造函数来实例化正则对象
var reg2 = new RegExp(/[bcf]at/,"gi");//常见形式
var reg3 = new RegExp("[bcf]at","gi");
console.log("a fAt bat ,a faT cat".match(reg1));//["fAt", "bat", "faT", "cat"]
console.log("a fAt bat ,a faT cat".match(reg2));//["fAt", "bat", "faT", "cat"]
console.log("a fAt bat ,a faT cat".match(reg3));//["fAt", "bat", "faT", "cat"]
//match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。返回存放匹配结果的数组。

//练习      g：全局匹配  i：忽略大小写
//replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。返回值：一个新的字符串。
//第一个参数表示执行匹配的正则表达式，也可以传递字符串，第二个参数表示准备代替匹配的字符串，也就是用第二个参数替换第一个参数的内容!
console.log("moon2xyz".replace(/o/,"ab"));//mabon2xyz
console.log("moon2xyz".replace(/o/g,"ab"));//mababn2xyz
console.log("moon2 ooxyz".replace(/\bo/g,"ab"));//moon2 aboxyz
console.log("moon2xyz".replace(/\dx/,"_"));//moon_yz
console.log("moon2xyz".replace(/[xyz]/g,"ab"));//moon2ababab
console.log("m2on2x2z".replace(/\d[zo]/g,"ab"));//mabn2xab
console.log("m2on2x2z".replace(/2[x-z]/g,""));//m2on

/*
2.正则的语法概述和修饰符（g全局,i忽略大小写,m包含换行)
*/
// 一、g全局、i大小写、m换行 修饰符的作用
// 二、正则对象的两种基本使用方式 1.字符串.字符串方法（正则对象） 2.正则对象.正则方法（字符串）
var regExp = /ab/i;
var matchResult = "xxAbcaaBbxyz".match(regExp);
console.log(matchResult);//["Ab", index: 2, input: "xxAbcaaBbxyz", groups: undefined]

var regExp = /ab/gi;
var matchResult = "xxAbcaaBbxyz".match(regExp);
console.log(matchResult);//(2) ["Ab", "aB"]

var regExp = /a*b/gi; //注意*和.的区别 
var matchResult = "xxAbcaaBbxyz".match(regExp);
console.log(matchResult);//(3) ["Ab", "aaB", "b"] //* 匹配任何包含零个或多个 n 的字符串。

var regExp = /a.b/gi;//注意*和.的区别 
var matchResult = "xxAbcaaBbxyz".match(regExp);
console.log(matchResult);//["aaB"]

var regExp=/a?b/gi;
var matchResult="xxabcaabbbxyz".match(regExp);
console.log(matchResult);//(4) ["ab", "ab", "b", "b"] //? 匹配任何包含零个或一个 n 的字符串nsole.log(matchResult);//(4) ["ab", "ab", "b", "b"] //? 匹配任何包含零个或一个 n 的字符串

/*
3.用正则对象来匹配字符串，也可以调用字符串方法来匹配
*/
//test初步了解
//test()在字符串中查找符合正则的内容，若查找到返回true,反之返回false.
var regExp = /a/i;
console.log(regExp.test("ab"));//true
console.log(regExp.test("ab"));//true
console.log(regExp.test("ab"));//true
console.log(regExp.test("ab"));//true

var regExp = /a/gi;//思考如果加了g，循环了若干次后是true还是false，这是为什么？test中的lastIndex
console.log(regExp.test("ab"));//true
console.log(regExp.test("ab"));//false 为什么？
console.log(regExp.test("ab"));//true
console.log(regExp.test("ab"));//false 为什么？

