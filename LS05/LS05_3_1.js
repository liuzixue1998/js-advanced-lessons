//第三周 星期一 3.19
/*
1.赋值运算符
*/
var a = 34;
if(a = 45){
    console.log("输出");
}//输出 
var b = 34;
if(45 == b){
    console.log("输出");
}//不能正常执行 如果写成(45=b)报错，而(a=45)能正常执行，不能检查出错误
/*
2.算数运算符
*/
console.log("1"+"2"); //"12"
console.log("1"+2); //"12"
console.log(1+{}); //"1[object Object]"
console.log(true+true); //2
console.log("5"-2); //3
var x = "1";
console.log(++x); //2  x转换为number类型
var x = "1";
console.log(x+1);//11(string)
//i++与++i的区别
var i=1;
var y = ++i + ++i + ++i;
console.log(y);//9 2+3+4
var y=i++ + i++ + i++;
console.log(y);//6 1+2+3   
//①前置++（++i）是将自身加1的值赋值给新变量，同时自身也加1；
//②后置++（i++）是将自身的值赋给新变量，然后才自身加1.
/*
3.关系运算符
== 与 ===
== （如果类型不同，先转换再比较，注：引用类型到基本类型的转换方向）
=== （若类型不同则false，若类型相同则判断同 ==）
!= 与 !==
！=（相当于==的逆运算）
！==（先判断类型，若类型不同则返回true，相当于===的逆运算）
*/
console.log(3===3);//true
console.log(3==="3");//false
console.log(3=="3");//true
console.log(3==new String(3));//true
console.log(3===new String(3));//false
var obj1 = new String("xyz");
var obj2 = new String("xyz");
console.log("xyz"===obj1);//false
console.log(obj1 == obj2);//false
console.log(obj1 === obj2);//false
console.log(obj1 == new String("xyz"));//false
var obj1 = new String("xyz");
var obj2 = new String("xyz");
console.log("xyz"!=obj1);//false "xyx"==obj1为真，obj1引用类型向基本类型转换，数值相等
console.log(obj1 !== obj2);//true
console.log(obj1 != obj2);//true
console.log(obj1 != new String("xyz"));//true
console.log(2 == 2);//true
console.log(new Number(2) == new Number(2));//false
console.log(2 == new Number(2));//true  引用类型向基本类型转换
