//星期一 第十周 2018.5.7
/*
1.创建Date对象及日期的格式
*/
//通过构造函数创建Date的四种形式
// （1）第一种方式 年 月 日 小时 分 秒
var date1 = new Date(2017,9,18,12,34,1);//注意：月0-11，日：1-31，时：0-23，分：0-59，秒：0-59，毫秒：0-999
console.log(date1);//Wed Oct 18 2017 12:34:01 GMT+0800 (中国标准时间)
//若years不足四位自动加1900
var date2 = new Date(17,9,18,12,34,1);
console.log(date2);//Thu Oct 18 1917 12:34:01 GMT+0800 (中国标准时间)
//（2）第二种方式  参数为字符串类型，注意格式，
var date3 = new Date("2017-08-09");//注意日期的格式 此处的08代表8月还是9月，对比上一个创建形式
console.log(date3);//Wed Aug 09 2017 08:00:00 GMT+0800 (中国标准时间)
//（3）第三种方式 参数为数字类型，以毫秒为单位
var date4 = new Date(1000); //1970-01-01:00:00:01
console.log(date4);//逆运算是date4.getTime();
//（4）第四种方式 参数为空 返回当前时间
var date5 = new Date();//new Date(Date.now());
console.log(date5);//Mon May 07 2018 17:57:30 GMT+0800 (中国标准时间)

//补充：无效日期
var date6 = new Date(NaN);
console.log(date6);//Invalid Date
//有无new的区别
var d1 = new Date();
var d2 = Date();
console.log(d1,typeof d1);//object
console.log(d2,typeof d2);//string
//补充思考
var n1 = new Number("123");
var n2 = Number("123");
console.log(n1,typeof n1);//Number {123} "object"
console.log(n2,typeof n2);//123 "number"

/*
2.Date的方法————静态方法（构造器函数对象的方法）
*/
//Date.now( ) 以毫秒为单位返回当前时间（从1970年1月1日00:00:00开始计算）
console.log(Date.now());//1525687236296
console.log((new Date()).getTime());//1525687236296
//Date.parse(dateTimeString) 转成毫秒，从1970年1月1日 00:00:00开始计算
console.log(Date.parse("1970-01-01"));//0 dateTimeString字符串转换成毫秒
console.log(Date.parse("1970-01-02"));//86400000  60x60x24x100
//Date.UTC(year,month,date?,hours?,minutes?,seconds?,milliseconds?) 转成毫秒 标准时间
console.log(Date.UTC(2017,9,1));//1506816000000 将给定的日期转换成毫秒,解释为UTC 协调世界时间

/*
3.Date的方法————原型方法
*/
//getter和setter相关
var d = new Date("1978-11-25");
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());//1978 10 6 25 8
console.log(d.getTimezoneOffset());//-480 返回本地时间与 GMT 时间之间的时间差，以分钟为单位。
d.setDate(11);
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());//1978 10 6 11 8
d.setFullYear(1999,5,3);
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());//1999 5 4 3 8
//转成字符串相关
var d = new Date(2012,3,21,15,7,23,234);
console.log(d.toTimeString(),"___",d.toLocaleTimeString());//15:07:23 GMT+0800 (中国标准时间) ___ 下午3:07:23
console.log(d.toDateString(),"___",d.toLocaleDateString());//Sat Apr 21 2012 ___ 2012/4/21
console.log(d.toJSON());//2012-04-21T07:07:23.234Z


/*
4.日期和时间格式
*/
// YYYY-MM-DDTHH:mm:ss.sssZ
console.log(Date.parse("2010-01-01 11:12:23.111"));//1262315543111
console.log(new Date("2010-01-01 11:12:23.111"));//Fri Jan 01 2010 11:12:23 GMT+0800 (中国标准时间)
console.log(new Date().toISOString());//2018-05-07T10:18:07.292Z

console.log(Date.parse("2010-01-01T11:12:23.111Z"));//1262344343111
console.log(new Date("2010-01-01T11:12:23.111Z"));//Fri Jan 01 2010 19:12:23 GMT+0800 (中国标准时间)
console.log(new Date().toISOString());//2018-05-07T10:18:41.802Z

//日期格式（无时间）
console.log(new Date("2001"));//Mon Jan 01 2001 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date("2001-02"));//Thu Feb 01 2001 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date("2001-02-22"));//Thu Feb 22 2001 08:00:00 GMT+0800 (中国标准时间)

//日期和时间格式
console.log(new Date("1999-11-22T13:17"));//Mon Nov 22 1999 13:17:00 GMT+0800 (中国标准时间)
console.log(new Date("1999-11-22T13:17:11"));//Mon Nov 22 1999 13:17:11 GMT+0800 (中国标准时间)
console.log(new Date("1999-11-22T13:17:11.111"));//Mon Nov 22 1999 13:17:11 GMT+0800 (中国标准时间)
console.log(new Date("1999-11-22T13:17:11.111Z"));//Mon Nov 22 1999 21:17:11 GMT+0800 (中国标准时间)

//时间的比较和运算，内部转换为数字进行比较和运算（从1970年1月1日00:00:00开始计算）
console.log(new Date("1970-01-01").getTime());//0
console.log(new Date("1970-01-02").getTime());//86400000
console.log(new Date("1960-01-02").getTime());//-315532800000
console.log(new Date("1970-01-02") > new Date("1970-01-01"));//true
console.log(new Date("1970-01-02") - new Date("1970-01-01"));//86400000
console.log(new Date((new Date("1970-01-01").getTime())+86400000));//Fri Jan 02 1970 08:00:00 GMT+0800 (中国标准时间)

