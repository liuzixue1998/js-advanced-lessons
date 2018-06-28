//第十七周 星期一 2018.6.25
/*
1.Class语法
- ES6中的class是一个语法糖（核心内容同ES5）
- 与ES5不同的是类内定义的方法是不可枚举的
*/
//注意：方法前不加function，方法之间不用逗号分隔
//如果没有写constructor方法，会添加一个默认的constructor
class Point{
    constructor(){
        this.x = 1;
        this.y = 2;
        var private_z = 3;
        this.d = function(){
            console.log(this.x,this.y,private_z);//可以访问私有数据成员
        }
    }
    show(){
        //console.log("show:",this.x,this.y,private_z);//报错,因为无法访问私有数据成员
        console.log("show:",this.x,this.y);
    }
}
var p2 = new Point();
console.log(Object.getOwnPropertyNames(p2));//["x", "y", "d"]
console.log(Object.getOwnPropertyNames(p2.__proto__));//["constructor", "show"]
p2.d();//1 2 3
p2.show();//show：1 2 

//class 是语法糖 本质还是原型继承
console.log(typeof Point);//function
console.log(Point instanceof Function);//true
console.log(Point === Point.prototype.constructor); // true
console.log(p2.constructor === Point.prototype.constructor);//true

//与ES5的区别 class类内定义的方法是不可枚举的
console.log(Object.keys(p2));//(3) ["x", "y", "d"]
console.log(Object.keys(p2.__proto__));//[]

//补充：
// 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
// Object.assign方法可以很方便地一次向类添加多个方法。
class Point {
    constructor(){

    }
}
Object.assign(Point.prototype, {
    foo(){},
    fee(){}
});//{foo: ƒ, fee: ƒ, constructor: ƒ}

/*
1.（1）ES6中通过通过class实例化的对象的原型
- 与ES5一样，实例化出的对象的原型是共享的，下例中实例化的对象的原型是Point.prototype
*/
//与ES5中一样，实例化出的对象的原型是共享的
//例一
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    show() {
        console.log("Point:",x,y);
    }

}
var p1 = new Point(1,2);
var p2 = new Point(1,2);
p1.__proto__ === p2.__proto__;//true
//例二
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__.printName = function () {
    console.log('Oops')
};
p1.printName(); // "Oops"
p2.printName(); // "Oops"
var p3 = new Point(4,2);
p3.printName(); // "Oops"
//例三
class A{
    constructor(x){
        this.x = x;
    }
}
class B extends A{
    constructor(x,y){
        //this.y = y;//先写这句话，会报错
        var tt = super(x);
        console.log(tt.constructor,tt);
        this.y = y;
    }
}
var b = new B(1,2);//class B的结构体  B {x: 1}
//例四
class Polygon {
    constructor(height, width) {
        this.name = 'Polygon';
        this.height = height;
        this.width = width;
    }
    sayName() {
        console.log('Hi, I am a ', this.name + '.');
    }
}
class Square extends Polygon {
    constructor(length) {
        //this.height;// ReferenceError，super 需要先被调用！
        /*
           这里，它调用父类的构造函数的 length,
           作为Polygon 的 width和 height.
        */
        super(length, length);
        /*
            注意: 在派生的类中, 在你可以使用'this'之前, 必须先调用super()。
            忽略这, 这将导致引用错误。
        */
        this.name = 'Square';
    }
    get area() {
        return this.height * this.width;
    }
    // set area(value) {
    //     this.area = value;
    // }
}
//例五
var obj1 = {
    method1() {
        console.log("method 1");
    }
}
var obj2 = {
    method2() {
        super.method1();
    }
}
Object.setPrototypeOf(obj2, obj1);
obj2.method2(); // logs "method 1"

/*
1（2）.ES6 class语法补充
-class表达式形式（ES6支持class表达式形式）
-class的立即执行表达式
-不存在class提升（养成良好代码习惯，使用前定义）
-class的name属性（同构造函数的name属性）
-在“类”的内部可以使用get和set关键字作为过滤
-ES6 为new命令引入了一个new.target属性
*/
//与函数一样，类也可以使用表达式的形式定义。
const MyClass = class Me {
    getClassName() {
        return Me.name;
    }
};
// 上面代码使用表达式定义了一个类。
// 需要注意的是，这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。
let inst = new MyClass();
inst.getClassName(); // Me
//Me.name // ReferenceError: Me is not defined
//上面代码表示，Me只在 Class 内部有定义。

//如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
const MyClass = class { /* ... */ };

//采用 Class 表达式，可以写出立即执行的 Class
let person = new class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}('张三');
person.sayName(); // "张三"
//上面代码中，person是一个立即执行的类的实例

//类不存在变量提升（hoist），这一点与 ES5 完全不同。
new Foo(); // ReferenceError
class Foo {}
//上面代码中，Foo类使用在前，定义在后，这样会报错，
// 因为 ES6 不会把类的声明提升到代码头部。
// 这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。
{
    let Foo = class {};
    class Bar extends Foo {
    }
}
// 上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。
// 但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，
// 而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义

//由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
class Point {}
Point.name // "Point"
//name属性总是返回紧跟在class关键字后面的类名

//与 ES5 一样，在“类”的内部可以使用get和set关键字，
//对某个属性设置存值函数和取值函数，
// 拦截该属性的存取行为。
class MyClass {
    constructor(prop) {
        this._prop = prop;
    }
    get prop() {
        return this._prop;
    }
    set prop(value) {
        this._prop = value;
    }
}

let inst = new MyClass(23);
console.log(inst.prop);//23
inst.prop = 45;
console.log(inst.prop);//45

//Class 内部调用new.target，返回当前 Class。
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}
var obj = new Rectangle(3, 4); // 输出 true


/*
2.静态方法与实例方法
- 静态方法指的是 Class 本身的方法，而不是定义在实例对象上的方法
- 通过关键字 static 定义静态方法，静态方法中的this指向类本身
*/
//类的prototype属性相当于实例的原型，所有在类中定义的方法，都会被实例继承。
//如果在一个方法前，加上static关键字，
//就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
class Foo {
    static classMethod() {
        return 'hello';
    }
}
Foo.classMethod(); // 'hello'
var foo = new Foo();
foo.classMethod();// TypeError: foo.classMethod is not a function
// 上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，
// 可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。
// 如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法
// 注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。

class Foo {
    static bar () {
        this.baz();//Foo.baz();
    }
    static baz () {
        console.log('hello');
    }
    baz () {
        console.log('world');
    }
}
Foo.bar(); // hello
var foo=new Foo();
foo.baz();//world
// 上面代码中，静态方法bar调用了this.baz，这里的this指的是Foo类，
// 而不是Foo的实例，等同于调用Foo.baz。
// 另外，从这个例子还可以看出，静态方法可以与非静态方法重名。

//思考下边的例子
class Foo {
    static baz () {
        console.log('hello');
    }
    baz () {
        console.log('world');
        Foo.baz();//
    }
    static fun1(o){
        // this.fun2();//报错
        o.fun2();
    }
    fun2(){
        console.log("fun2")
    }
}
var a = new Foo();
a.baz();//world hello
Foo.fun1(a);//fun2

/*
2（2）.静态属性与实例属性
- 静态属性指的是 Class 本身的属性，而不是定义在实例对象上的属性
- ES6 规定Class 内部只有静态方法，没有静态属性
- 新的ES提案中包括了静态属性
*/
//静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
class Foo {
}
Foo.prop = 1;
Foo.prop // 1
//上面的写法为Foo类定义了一个静态属性prop。
//目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。
/*
// 以下两种写法都无效
class Foo {
    // 写法一
    prop: 2

    // 写法二
    static prop: 2
}
Foo.prop // undefined
*/
//目前有一个静态属性的提案，对实例属性和静态属性都规定了新的写法
class MyClass {
    static myStaticProp = 42;
    constructor() {
        console.log(MyClass.myStaticProp); // 42
    }
}
// 同样的，这个新写法大大方便了静态属性的表达，ES6暂不支持
// 老写法
class Foo {
    // ...
}
Foo.prop = 1;
// 新提案的写法 ES6暂不支持
class Foo {
    static prop = 1;
}
// 上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。
// 这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。
// 另外，新写法是显式声明（declarative），而不是赋值处理，语义更好


/*
3.ES6中通过class实现继承的语法
*/
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)，如果没有调用super将报错
        this.color = color;
    }
    show() {
        console.log(this.x,this.y,this.color);
    }
}
var cp = new ColorPoint(1,2,3);
cp.show();
console.log(cp instanceof ColorPoint); // true
console.log(cp instanceof Point); // true

//类-类原型链、对象-对象原型链
console.log(Object.getPrototypeOf(ColorPoint) === Point);//true
console.log(ColorPoint.__proto__ === Point);//true
console.log(cp.__proto__ === ColorPoint.prototype);//true
console.log(cp.__proto__.__proto__ === Point.prototype);//true
console.log(ColorPoint.__proto__.__proto__ === Function.__proto__);//true

// 子类必须在constructor方法中调用super方法，否则新建实例时会报错。
// 这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。
// 如果不调用super方法，子类就得不到this对象

// ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.call(this)）。
// ES6 的继承机制完全不同，必须先调用super方法，
// 然后再用子类的构造函数修改this。
//
// 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。
// 也就是说，不管有没有显式定义，任何一个子类都有constructor方法

// 另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，
// 才可以使用this关键字，否则会报错。
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class ColorPoint extends Point {
    constructor(x, y, color) {
        //this.color = color; // ReferenceError 报错因为没有调用父类构造函数，没有实例
        super(x, y);
        this.color = color; // 正确
    }
}

// 关于静态方法的继承，父类的静态方法，可以被子类继承。
class Foo {
    static classMethod() {
        return 'hello';
    }
}
class Bar extends Foo {
}[]
Bar.classMethod(); // 'hello'
// 上面代码中，父类Foo有一个静态方法，子类Bar可以调用这个方法。

// 静态方法也是可以从super对象上调用的。
class Foo {
    static classMethod() {
        return 'hello';
    }
}
class Bar extends Foo {
    static classMethod() {
        return super.classMethod() + ', too';//此时的super指代父类
    }
}
Bar.classMethod();// "hello, too"

//静态方法的继承的案例
class Human {
    constructor() {}
    static ping() {
        return 'ping';
    }
}
class Computer extends Human {
    constructor() {
        super();//super此处指代父类构造函数
    }
    static pingpong() {
        return super.ping() + ' pong';//super此处指代父类
    }
}
Computer.pingpong(); // 'ping pong'

/*
3（1）.class中的super（当作函数使用，也可以当作对象使用）
- 当做函数时，子类构造函数之中的super( )，代表调用父类的构造函数
- 当做对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类
- 当做对象时，在实例（原型）方法中，指向父类的prototype属性；在静态方法中，指向父类
*/
// ES6 要求，子类的构造函数必须执行一次super函数。
class A {}
class B extends A {
    constructor() {
        super();
    }
}
// 上面代码中，子类B的构造函数之中的super()，代表调用父类的构造函数。
// 这是必须的，否则 JavaScript 引擎会报错。
// 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，
// 即super内部的this指的是B类的实例，
// 因此super()在这里相当于A.prototype.constructor.call(this)，参见下述例子
class A {
    constructor() {
        console.log(new.target.name);//
    }
}
class B extends A {
    constructor() {
        super();
    }
}
new A(); // A
new B(); // B
//上面代码中，new.target指向当前正在执行的函数。
// 可以看到，在super()执行时，它指向的是子类B的构造函数，而不是父类A的构造函数。
// 也就是说，super()内部的this指向的是B。

//作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
class A {}
class B extends A {
    m() {
        //super(); // 报错
    }
}
// 上面代码中，super()用在B类的m方法之中，就会造成句法错误。

// 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
class A {
    p() {
        return 2;
    }
}
class B extends A {
    constructor() {
        super();
        console.log(super.p()); // 2  super指向A.prototype
    }
    f(){
        console.log(super.p()); // 2  super指向A.prototype
    }
}
let b = new B();
b.f();
// 上面代码中，子类B当中的super.p()，就是将super当作一个对象使用。
// 这时，super在普通方法之中，指向A.prototype，所以super.p()就相当于A.prototype.p()。


// 这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，
// 是无法通过super调用的。
class A {
    constructor() {
        this.p = 2;
    }
}
class B extends A {
    get m() {
        return super.p;
    }
}
let b = new B();
b.m; // undefined 因为super代表A.prototype, A.prototype上并没有p属性

//如果属性定义在父类的原型对象上，super就可以取到。
class A {}
A.prototype.x = 2;
class B extends A {
    constructor() {
        super();
        console.log(super.x) // 2
    }
}
let b = new B();
//上面代码中，属性x是定义在A.prototype上面的，所以super.x可以取到它的值。

//ES6 规定，通过super调用父类的方法时，方法内部的this指向子类。体现了多态性
class A {
    constructor() {
        this.x = 1;
    }
    print() {
        console.log(this.x);
    }
}
class B extends A {
    constructor() {
        super();
        this.x = 2;
    }
    m() {
        super.print();
    }
}
let b = new B();
b.m();// 2
// 上面代码中，super.print()虽然调用的是A.prototype.print()，
// 但是A.prototype.print()内部的this指向子类B，导致输出的是2，而不是1。
// 也就是说，实际上执行的是super.print.call(this)。
// 由于this指向子类，所以如果通过super对某个属性赋值，
// 这时super就是this，赋值的属性会变成子类实例的属性。
// 这体现了多态性


//如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的prototype
class Parent {
    static myMethod(msg) {
        console.log('static', msg);
    }
    myMethod(msg) {
        console.log('instance', msg);
    }
}
class Child extends Parent {
    static myMethod(msg) {
        super.myMethod(msg);//super 指的是Parent类
    }
    myMethod(msg) {
        super.myMethod(msg);//super 指的是Parent.prototype
    }
}
Child.myMethod(1); // static 1
var child = new Child();
child.myMethod(2); // instance 2
//上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象即Parent.prototype


//注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。避免二义性
class A {}
class B extends A {
    constructor() {
        super();
        //console.log(super); // 报错 二义性
    }
}
// 上面代码中，console.log(super)当中的super，无法看出是作为函数使用，还是作为对象使用，
// 所以 JavaScript 引擎解析代码的时候就会报错。
// 这时，如果能清晰地表明super的数据类型，就不会报错。



//以下内容为补充内容：
class A {}
class B extends A {
    constructor() {
        super();
        console.log(super.valueOf() instanceof B); // true
    }
}

let b = new B();
// 上面代码中，super.valueOf()表明super是一个对象，因此就不会报错。
// 同时，由于super使得this指向B，所以super.valueOf()返回的是一个B的实例。

//最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。
var obj = {
    toString() {
        return "MyObject: " + super.toString();
    }
};
obj.toString(); // MyObject: [object Object]


//需要注意的是，子类继承父类时，new.target会返回子类。
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        // ...
    }
}
class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
}

var obj = new Square(3); // 输出 false
//上面代码中，new.target会返回子类。

//利用这个特点，可以写出不能独立使用、必须继承后才能使用的类，抽象类
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error('本类不能实例化');
        }
    }
}
class Rectangle extends Shape {
    constructor(length, width) {
        super();
        // ...
    }
}
var x = new Shape();  // 报错 Shape为抽象类，不能进行实例化
var y = new Rectangle(3, 4);  // 正确