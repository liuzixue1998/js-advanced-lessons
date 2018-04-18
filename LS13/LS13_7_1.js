//第七周 星期一 2018.4.16
/*
1.对象的简介
- JS对象是一种复合值：将很多值复合在一起（包括原始类型值、对象、函数）
- JS对象是若干无序属性的集合，可以直接通过属性名来访问对象的属性（键值对）
- 函数作为某一个对象的属性时，称其为该对象的方法
*/
var obj = {
    num:10,
    str:"Hi",
    show:function(){
        console.log(this.str);
    }
};
console.log(obj.num);//10
console.log(obj.str);//Hi
obj.show();			 //Hi  对象的调用
/*
2.对象的分类
- 内置对象（native object）由ECMAScript规范定义的对象或构造器对象（数组、函数等）
- 宿主对象（host object）由JS解析器所嵌入的宿主环境定义的（如：window、document）
- 自定义对象（user-defined object）运行中的用户自定义JS代码创建的对象
*/
console.log(typeof Array);//Function
console.log(typeof Function);//Function
console.log(typeof Date);//Function
console.log(typeof Number);//Function
console.log(typeof String);//Function
console.log(typeof Boolean);//Function
console.log(typeof Math);//Object
console.log(typeof JSON);//Object

console.log(Object instanceof Function);//t
console.log(Object instanceof Object);//t
console.log(Boolean instanceof Function);//t
console.log(Boolean instanceof Object);//t
console.log(String instanceof Function);//t
console.log(String instanceof Object);//t
console.log(Number instanceof Function);//t
console.log(Number instanceof Object);//t
console.log(Function instanceof Function);//t
console.log(Function instanceof Object);//t
console.log(Array instanceof Function);//t
console.log(Array instanceof Object);//t
console.log(Date instanceof Function);//t
console.log(Date instanceof Object);//t
console.log(Math instanceof Function);//f
console.log(Math instanceof Object);//t
console.log(JSON instanceof Function);//f
console.log(JSON instanceof Object);//t

/*
3.对象的属性
- 数据属性（property，属性），字符串的键到值的映射（包括基本类型数据、对象、函数）
- 访问器属性（accessor，或称为访问器），访问属性的方法，注意：访问和设置时不加括号
- 内置属性（internal property）存在与ECMAScript规范中，不能直接访问
*/
var o = {
    _x:1.0,//如果都写成x会怎样
    get x(){
        return this._x;
    },
    set x(val){
        this._x = val;
    }
};
console.log(o.x);//1
o.x = 2;
console.log(o.x,o._x);//2 2
//当读取访问器属性时，会调用getter函数并返回有效值；
//当写入访问器属性时，会调用setter函数并传入新值，setter函数负责处理数据
//访问器属性 实例二 只读
var o = {
    _x:1.0,
    get x(){
        return this._x;
    }
};
console.log(o.x);//1
o.x = 2;
console.log(o.x,o._x);//1 1
var p1 = {
    _name:"Jack",
    _age:23,
    set age(val){
        if(val>0&&val<150){
            this._age = val;
        }else{
            console.log("请设置正常年龄");
        }
    },
    get age(){
        return this._age;
    }
};
p1.age = 178;
console.log(p1.age);//请设置正常年龄  23

/*
4.对象的相关操作
- 通过对象字面量的方式直接创建对象
- 通过Object的create静态方法创建对象
- 通过构造函数的方式创建对象
*/
//通过字面量的方式创建 JS对象
var obj = {
    num:10,
    str:"Hi",
    show:function(){
        return this.str;
    }
};
console.log(obj.num);//10
console.log(obj.str);//Hi
console.log(obj.show());//Hi
console.log(obj.__proto__);//对象的原型
console.log(obj.__proto__ === Object.prototype);//true
//通过Object工场方法创建JS对象,注：JS对象是通过原型链的方式实现的对象继承
var newObj = Object.create(obj);//newObj的原型是obj
newObj.age = 23;
console.log(newObj.num);//10
console.log(newObj.str);//Hi
console.log(newObj.show());//Hi
console.log(newObj.age);//23  自有属性
console.log(newObj.__proto__);//{num: 10, str: "Hi", show: ƒ}
console.log(newObj.__proto__ === obj);//true
//构造函数的方式创建JS对象   注：JS对象是通过原型链的方式实现的对象继承
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function(){
    console.log("hello,i'm",this.name,this.age,"years old");
};
var person1 = new Person("Mike",21);
person1.sayName();//hello,i'm Mike 21 years old
//注意：
var objStr = new Object("xxx");
console.log(typeof objStr);//object
console.log(objStr instanceof String);//true

var objNum = new Object(23);
console.log(typeof objNum);//object
console.log(objNum instanceof Number);//true

var objBoolean = new Object(true);
console.log(typeof objBoolean);//object
console.log(objBoolean instanceof Boolean);//true

/*
5.对象的增删改查
- 添加和删除自有属性
- 访问和修改自有属性
- 通过点与中括号访问属性的区别（写个访问属性的for循环练习）
*/
var obj = {};
obj.x = 2;//直接添加属性
console.log(obj.x);//通过.访问属性
obj.x = 5;//设置属性
console.log(obj["x"]);//通过[]访问属性
delete obj.x;//删除属性
console.log(obj.x);
var obj3 = {};
for(var i=0;i<10;i++){
    obj3.i = i;
} //对象
console.log(obj3);//{i: 9}
var obj4 = {};
for(var i=0;i<10;i++){
    obj4[i] = i;
}  //对象数组
console.log(obj4);//{0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9}