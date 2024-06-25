'use strict';
// //great 面对对象编程（oop)
// //构造函数
// const Person = function (name, bitrhyear) {
//   //不能用箭头函数，它没有this
//   this.name = name;
//   this.bitrhyear = bitrhyear;
//   // console.log(this);
//   //看起来可行，用起来也可行是吧，但是永远永远不要这么做，这样做的后果是每次创建一个对象都要创建一个这样的函数，这对代码的性能是巨大的打击，那么这么解决呢，原型！
//   // this.clacAge = function(){
//   //   console.log(2026-bitrhyear);
//   // }
// };
// const lj = new Person('li', 1998);
// console.log(lj, Person.prototype);
// //使用new的结果：
// //1.new相当于创建了一个空对象{}
// //2.调用了函数Person，this={}
// //3.{}连接了原型
// //4.函数自动return {}
// console.log(lj instanceof Person);
// //说这么多，js本来没有这个特性的，只是面向对象编程太好用了，有开发者开发出来的，而且大家都在使用的方法
// Person.prototype.calcAge = function () {
//   console.log(2025 - this.bitrhyear);
// };
// lj.calcAge();
// console.log(lj.__proto__);
// console.log(lj.__proto__ === Person.prototype); //true
// //__proto__,这玩意哪来的，这是Person.prototype的值。ofc,他是由new创建并与Person.prototype建立了联系的。
// console.log(Person.prototype.isPrototypeOf(lj)); //true
// console.log(Person.prototype.isPrototypeOf(Person)); //false
// //综上所述，Person.prototype不是Person的原型，这是由于取名混乱产生的误导，经典js怪名字，更适合叫prototype of linked object,连接对象的原型
// Person.prototype.from = 'china'; //
// console.log(lj, lj.from); //不直接在lj下，虽然可以.from访问，而是在（__proto__ ）下
// console.log(lj.hasOwnProperty('name')); //true
// //property，性质，所有物，from不是他的
// console.log(lj.hasOwnProperty('from')); //flase
// console.log(Person.prototype.hasOwnProperty('from')); //ture,Person只是个构造函数罢了
// console.log(Person.prototype.constructor === Person); //true
//Person.prototype不是Person的原型，而是所要通过Person建立对象的原型
//lj.calcAge();调用时先在lj对象里找，发现没有，然后通过__proto__去原型里找，使用calcAge()，这样还有一个我们耳熟能详的名字，继承
//每个对象都有原型，Person的原型又是谁，object.prototype,这个object的__proto__简单指向null,标志着原型链接的结束，往上没有了
//其实和scopes(作用域)类似，
// lj.__proto__.ok = '1';
// console.log(lj, Person.prototype);
// console.log(lj.__proto__.__proto__);//object.prototype
// console.log(lj.__proto__.__proto__.__proto__);//null
// console.dir(Person);
// const arr = [1, 2, 5]; //new Array === []
// console.log(arr.__proto__); //Array.prototype
// console.log(Array.prototype); //Array.prototype
// console.log(arr.__proto__.__proto__); //object.prototype
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// }; //这样我们的每一个数组就会多上一个方法unique()，可以返回集合，没有重复的数
// console.log([1, 3, 5, 3, 2, 1, 1, 1, 1].unique()); //看起来很帅，自己定义的一个数组方法，其实确实帅，但是存在缺点
// //可能下一个js版本就会出同名方法，很多人一起工作时可能就会出bug，写出同名不同用处的方法

// //funcy
// const h1 = document.querySelector('h1');
// console.log(h1.__proto__); //HTMLHeadingElement
// console.log(h1.__proto__.__proto__); //HTMLElement
// console.log(h1.__proto__.__proto__.__proto__); //Element
// console.log(h1.__proto__.__proto__.__proto__.__proto__); //node
// console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__); //EventTarget
// console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); //object
// console.log(
//   h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// ); //null
// console.dir(x => x);
// //
// ///////es6后的方法class
// ////class
// //类表达式
// const PersonCl = class{};
// //类声明式
// class PersonCl {
//   constructor(name, bitrhyear) {
//     this.fullname = name;
//     this.bitrhyear = bitrhyear;
//   } //小细节，这些括号不需要逗号隔开
//   //卸载构造函数外的都是放在PersonCl.prototype当中
//   calcAge() {
//     console.log(2035 - this.bitrhyear);
//   }
//   get age() {
//     return 2035 - this.bitrhyear;
//   }
//   set fullname(name) {
//     if (name.includes(' ')) {
//       this._fullname = name; //会报错,使用_fullname 取代 fullname,然后fullname会消失，取而代之的是_fullname,当然取别的名字也不是不行，只是这是js界的潜规则，没有代码意义这是哥们们都遵守，想要fullname可以继续调用，我们通常使用get fullname
//       console.log('ok.great');
//     } else {
//       alert(`${name}是错误的，这不是你的全名，朋友`);
//       console.log('fkman');
//     }
//   }
//   get fullname() {
//     return this._fullname;
//   }
//   //设置静态方法
//   static hey() {
//     console.log('hey man,good luck');
//   }
// }
// const jame = new PersonCl('jame messi', 699);
// console.log(jame);
// jame.calcAge();
// console.log(jame.age); //在控制台看上去就和属性放在一起，不像个方法但是这就放在原型当中如其他函数一般
// // 小总结啊，
// // 类没有被'吊起'，想起来了没，如果使用函数声明（funtion a(){}）而非函数表达式就会‘吊起’，可以在声明之前使用这个函数，但是这在类中可行不通
// // 类是(第一类市民?)first-class citizes，是一个特殊函数
// // 类会以严格模式执行，即使我没有手动加入严格模式
// const account = {
//   owner: 'jonas',
//   movements: [1200, 200, 330, 500],
//   get latest() {
//     return this.movements.slice(-1).pop(); //有些遗忘pop,这是移除数组的最后一个值并返回该值。
//   },
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };
// console.log(account.latest); //虽说是一个函数但是还是使用属性的方式展示，不用括号
// account.latest = 50; //account.latest(50),你以为是这样做是吧，其实是直接设置数值，包括类中也是这么用

// //静态方法
// PersonCl.hello = function () {
//   console.log('hello man ,good day');
// };
// PersonCl.hello(); //这样设置为了静态方法，只有PersonCl可以使用，而子类无关
// // jame.hello(); //observely,不能使用
// const PersonPro = {
//   bye: function () {
//     console.log('bye');
//   },
//   init: function (name, bitrhyear) {
//     this.name = name;
//     this.bitrhyear = bitrhyear;
//   },//与构造函数无关，尽管看起来像，没有使用new
// };
// const stavn = Object.create(PersonPro);
// stavn.init('beach', 1988);
// console.log(stavn);
// console.log(stavn.__proto__);

// stavn.__proto__.bye();

// const Person = function (name, bitrhyear) {
//   this.name = name;
//   this.bitrhyear = bitrhyear;
// };
// Person.prototype.calcAge = function () {
//   console.log(2025 - this.bitrhyear);
// };
// const Student = function (name, bitrhyear, course) {
//   Person.call(this, name, bitrhyear);
//   this.course = course;
// };
// //链接人类原型
// Student.prototype = Object.create(Person.prototype); //细节放在下面这个方法上面，如果在那以后等于的话，会覆盖掉介绍方法
// // Student.prototype = Person.prototype;//也许会觉得这样些也行，实际上这会破坏原型链，直接等于person的原型链，我们要的不是这样，我们要的是学生自己的原型，含有人类的方法，还有自己的方法，这才是继承！
// Student.prototype.introduce = function () {
//   console.log(`hi,i am ${this.name} and learn about ${this.course}`);
// };

// const teses = new Student('teses', 1998, 'software');
// console.log(teses);
// teses.introduce();
// console.dir(teses);
// teses.calcAge();

// console.log(teses instanceof Student); //true
// console.log(teses instanceof Person); //true
// console.log(teses instanceof Object); //true
// Student.prototype.constructor = Student; //没错，就这么简单
// console.dir(Student.prototype.constructor); //得到的Person,因为Student的原型是通过Person获得的，那么构造函数指向的Person也是很合理的
// class PersonCl {
//   constructor(name, bitrhyear) {
//     this.fullname = name;
//     this.bitrhyear = bitrhyear;
//   }
//   calcAge() {
//     console.log(2035 - this.bitrhyear);
//   }
//   get age() {
//     return 2035 - this.bitrhyear;
//   }
//   set fullname(name) {
//     if (name.includes(' ')) {
//       this._fullname = name;
//       console.log('ok.great');
//     } else {
//       alert(`${name}是错误的，这不是你的全名，朋友`);
//       console.log('fkman');
//     }
//   }
//   get fullname() {
//     return this._fullname;
//   }
//   //设置静态方法
//   static hey() {
//     console.log('hey man,good luck');
//   }
// }
// console.log();
// class StudentCl extends PersonCl {//原型，构造函数都继承了
//   constructor(fullname, bitrhyear, course) {
//     super(fullname, bitrhyear);
//     this.course = course;
//   }
//   introduce() {
//     console.log(`${this.fullname} is ${this.age}`);
//   }
// }
// const nikola = new StudentCl('nikola kovic', '1997', 'aim master');
// nikola.introduce();
// console.log(nikola);
// const PersonPro = {
//   bye: function () {
//     console.log('bye');
//   },
//   init: function (name, bitrhyear) {
//     this.name = name;
//     this.bitrhyear = bitrhyear;
//   },
// };
// const stavn = Object.create(PersonPro);
// const StudentProto = Object.create(PersonPro);
// StudentProto.init = function (name, bitrhyear, course) {
//   PersonPro.init.call(this, name, bitrhyear);
//   this.course = course;
// };
// StudentProto.introduce = function () {
//   console.log(
//     `大家好，我是${this.name}，出生于${this.bitrhyear}，学的是${this.course}`
//   );
// };
// const zywoo = Object.create(StudentProto);
// zywoo.init('马修', '2003', 'cs:go');
// zywoo.introduce();
// zywoo.bye();
//////fake 假封装
class Account {
  //public fields,公共属性（引号别忘啦）
  local = navigator.language;
  //private fields(#),私有属性！！在实例里面,你在原型里是找不到的，如下面的accjay,可以在属性里看到，不能在原型里看到
  #movement = [];
  #pin; //
  constructor(onwer, moneytype, pin) {
    this._onwer = onwer;
    this.moneytype = moneytype;
    this.#pin = pin;
    //'_movement'受保护的属性(没有代码意义，仍然可以在类外直接使用，只是代码界公认的潜规则,当别的哥们要在类外动你的代码是，看到'_'就知道这是不该在类外使用的)
    // this._movement = [];
    // this.local = navigator.language;
  }
  //如果要使用_movement就应该通过方法（接口）使用
  getMovement() {
    //public methods
    return this.#movement;
  }
  deposit(value) {
    this.#movement.push(value);
    return this;
  }
  withdraw(value) {
    this.#movement.push(-value);
    return this;
  }
  cheack() {
    if (this.#allow) {
      console.log('gogogogo!!!');
    }
  }
  //private methods
  #allow() {
    return true;
  }
  // static
}
// console.dir(Account);
const accJay = new Account('jay', 'rmb', '123');
// accJay.movement.push(3000)//这样也行，只是在是在大量代码开发的过程中会出现潜在的bug，我们该封装它！
accJay.deposit(250);
accJay.withdraw(150);
accJay.cheack();
console.log(accJay.getMovement());
console.log(accJay);
accJay.deposit(150).deposit(250).withdraw(300).deposit(650);
console.log(accJay.getMovement());
// console.log(accJay.#movement);//error
//酷炫的要来里，2023年崭新出厂，新鲜出炉的封装！！！真实封装，不是上面的假封装，ps:虽然有的浏览器早就能用了，但是这次是主流浏览器，大家都用

////////////////////////////////////////////////////
//////////////////////////////////////////////小练习

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`加速！！现在是${this.speed}km/h`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`减速！！现在是${this.speed}km/h`);
// };
// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);
// car1.accelerate();
// car1.accelerate();
// car1.accelerate();
// car1.brake();
// console.log(car1);
////
//////小练习2

// class car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   set speedUS(speedU) {
//     this.speed = speedU * 1.6;
//   }
// }

// const bnzer = new car('bnzer', 120);
// bnzer.speedUS = 80;
// console.log(bnzer);

///////////////33333pratice
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`加速！！现在是${this.speed}km/h`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`减速！！现在是${this.speed}km/h`);
// };
// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };
// EV.prototype = Object.create(Car.prototype);
// EV.prototype.accelerate = function () {
//   //直接设置就行，这个放在EV.prototype里面，比父类的原型要靠近一级，js会默认找到这哥们直接用，这就是所谓的多态性
//   this.speed *= 1.2;
//   this.charge -= 1;
//   console.log(
//     `now,your ${this.make} speed is ${this.speed}km/h ,and your charge just have ${this.charge}%`
//   );
// };

// const tesla = new EV('Tesla', 140, 29);
// console.log(tesla);
// tesla.accelerate();
// tesla.brake();
////////////////////////4444444pricate
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`加速！！现在是${this.speed}km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`减速！！现在是${this.speed}km/h`);
    return this;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speedU) {
    this.speed = speedU * 1.6;
  }
}
class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
    return this;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `now,your ${this.make} speed is ${this.speed}km/h ,and your charge just have ${this.charge}%`
    );
    return this;
  }
  #keyin(s) {
    return true;
  }
}

const tosla = new EVCl('TOSLA', 120, 23);
console.log(tosla.accelerate());

tosla.accelerate().accelerate().brake();
console.log(tosla.speedUS);
