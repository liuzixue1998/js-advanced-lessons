// 第八周 星期一 2018.4.23
/*
1. JavaScript语言继承方式
- JavaScript采用的是原型的继承方式，每个对象都有一个原型对象，最原始的原型是null
- JavaScript的继承是对象-对象的原型继承，为面向对象提供了动态继承的功能
- 任何方式创建的对象都有原型对象，可以通过对象的 __proto__ 属性来访问原型对象
*/
var obj = {
    num:10,
    str:"Hi",
    show:function(){
        return this.str;
    }
};
console.log(obj.__proto__ === Object.prototype);//true
var newObj = Object.create(obj);
var newObj2 = Object.create(obj);//思考：多个对象同一个原型的情况
newObj.age = 23;
console.log(newObj.__proto__ === obj);//true
console.log(newObj2.__proto__ === obj);//true 
//JavaScript的继承方式 是对象-对象的继承，对象要实现继承首先要有原型对象
console.log(newObj.__proto__.__proto__);//Object.prototype
console.log(newObj.__proto__.__proto__.__proto__);//null

/*
2.JS对象的属性访问链（自有属性和继承属性）
*/
//例一
var proObj = {
    z:3
};
var obj = Object.create(proObj);
obj.x = 1;
obj.y = 2;
console.log(obj.x);//1
console.log(obj.y);//2
console.log(obj.z);//3
console.log("z" in obj);//true
console.log(obj.hasOwnProperty("z"));//false
console.log(obj.hasOwnProperty("x"));//true 
            //hasOwnProperty方法判断属性是否存在，检查的是自身属性是否存在，与继承属性无关
//例二
var proObj = {
    z:3
};
var obj = Object.create(proObj);
obj.x = 1;
obj.y = 2;
obj.z = 5;
console.log(obj.hasOwnProperty("z"));//true
console.log(obj.z);//5
console.log(proObj.z);//3
obj.z = 8;
console.log(obj.z);//8
delete obj.z;//true
console.log(obj.z);//3
delete obj.z;//true
console.log(obj.z);//still 3
//如何删除原型上的属性
delete  obj.__proto__.z;//或者delete proObj.z;
console.log(obj.z);//此时彻底没有z了   从原型上删除

/*
3.通过构造函数来创建对象
- 当一个函数与new结合，该函数将作为构造函数来使用，用来创建JS对象
- JS（ES5）中没有其他语言（C++、Java）中的类，JS中通过构造函数来实现类的功能
- 在JS中构造函数也是对象，有一个重要的属性（原型 prototype），该属性与继承相关
*/
//例一
function Person(age,name) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi = function () {
    console.log("Hi,i'm "+this.name);
};
var p1 = new Person(20,"Jack");
console.log(p1.name);//Jack
console.log(p1.age);//20
p1.sayHi();//Hi,i'm Jack
//基于构造函数创建的对象
//- 构造函数有一个重要属性（原型 prototype），该属性就是实例化出来的对象的原型
//- 构造函数的这个属性（原型 prototype）是真实对象，实例化的对象通过它实现属性继承
function Person(){}
Person.prototype.name='MIke'
Person.prototype.age=21;
Person.prototype.sayName=function(){console.log(this.name);}; //在函数的原型上添加属性
Person.__proto__===Function.prototype;//true
//可通过实例化出来的对象的__proto__属性来确认原型
//- 实例化的这个对象，有一个属性__proto__指向原型
//- 通过判断得知实例化出来的对象的__proto__就是构造函数的prototype属性
function Person(name) {
    this.name = name;
    this.age = 21;
}
Person.prototype.sayHi = function () {
    console.log("Hi,i'm ",this.name,this.age,"years old!");
};
var p1 = new Person("Mike");
console.log(p1.name);//Mike
console.log(p1.age);//21
p1.sayHi();//Hi,i'm Mike，21 years old
console.log(p1.__proto__ === Person.prototype);//true
//没有私有属性情况下，常将方法添加到构造函数的prototype属性上，实现方法共享
//而属性根据情况来确定是定义在构造函数中,还是定义在构造函数的prototype（即实例化对象的原型上）属性上

//基于构造函数实现的原型继承-属性操作
function MyObj() { }
MyObj.prototype.z = 3;
var obj = new MyObj();
obj.x = 1;
obj.y = 2;
console.log(obj.x);//1
console.log(obj.y);//2
console.log(obj.z);//3
console.log("z" in obj);//true
console.log(obj.hasOwnProperty("z"));//false
  //obj的原型 x=1，y=2
  //MyObj原型 z=3
// 原型链属性操作
obj.z = 5;
obj.hasOwnProperty("z");//true
console.log(obj.z);//5
console.log(MyObj.prototype.z);//3
obj.z = 8;
console.log(obj.z);//8
delete obj.z;//true
console.log(obj.z);//3
delete obj.z;//true
console.log(obj.z);//still 3
//如何删除原型上的属性
delete  obj.__proto__.z;//或者delete MyObj.prototype.z;
console.log(obj.z);//此时彻底没有z了
