//第三周 星期一 3.19
/*
1.&&与| |基本理解和应用
最常见情况（运算符两边的操作数都是布尔类型）
-对于&&来说， 除了两侧都为真时为真，其他情况都为假
-对于||来说，除了两侧都为假时为假，其他情况都为真
*/
console.log(2>1&&4<5);//true
console.log(true&&(!2));//false
console.log(false&&("2" == 2));//false
console.log(false&&false);//false
console.log(2>1||4<5);//true
console.log(true||(!2));//true
console.log(false||("2" == 2));//true
console.log(false||false);//false

/*
2.&&与||深层次理解
当逻辑运算符&&和||两侧的操作数不是布尔类型时
-首先将左操作数转换成布尔类型
-对转换后的左操作数进行逻辑判断（true or false）
-根据短路原则返回原始左操作数或原始右操作数
短路原则（忽略对右操作数的判断）
-对于&&，转换后的左操作数若为true，则直接返回原始右操作数，若为false则直接返回原始左操作数
-对于| |，转换后的左操作数若为true，则直接返回原始左操作数，若为false则直接返回原始右操作数
-通过短路原则，可以用&&和| |来实现复杂的条件语句来代替if-else
*/
console.log(2&&4);//4
console.log(0&&4);//0  0为false，输出原左操作数
console.log({x:2}&&{name:"Jack"});//{name:"Jack"}
console.log(null&&"hello");//null  null为false
console.log({}&&"world");////"world"  {}为true，返回原右操作数
console.log(2||4);//2
console.log(0||4);//4
console.log({x:2}||{name:"Jack"});//{x：2} {x：2}为true，则返回原左操作数
console.log(null||"hello");//hello null为false，则返回原右操作数
console.log({}||"world");//{}
console.log((new Boolean(false))&&234);//234  引用对象类型为true ，返回原右操作数
console.log((new Boolean(false))||234);//(new Boolean(false))

/*
3.&&与||在实际中的应用
*/
var score = 76;
if(score>90){
    console.log("优");
}else if(score>75){
    console.log("良");
}else if(score>60){
    console.log("及格");
}else{
    console.log("不及格");
}
//switch..case 
console.log((score>90&&"优")||(score>75&&"良")||(score>60&&"及格")||"不及格");
/*
使用||来设置函数参数的默认值
-函数定义时可以给参数指定默认值，调用时若未传参数则该参数的值取它定义时的默认值
-JS（ES6之前）不能直接为函数的参数指定默认值，可以通过||来实现
*/
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));//6 1+2+3
console.log(sum(1,2));//8  1+2+5
console.log(sum(1));//10  1+4+5
console.log(sum(1,0,0));//10 1+4+5 
// 改进
var sum = function(a,b,c){
    if(b!=false){b = b||4;}//(b!=false)&&(b=b||4);
    if(c!=false){c = c||5;}//(c!=false)&&(c=c||5);
    return a+b+c;
};
console.log(sum(1,2,3));//6 1+2+3
console.log(sum(1,2));//8  1+2+5
console.log(sum(1));//10  1+4+5
console.log(sum(1,0,0));//1  1+0+0