'use strict';

// const jilu = [];
// //es6
// const creatjilu = function (feijishu, chengke = 1, jiage = 299 * chengke) {
//   const ji = {
//     feijishu,
//     chengke,
//     jiage,
//   };
//   console.log(ji);
//   jilu.push(ji);
// };
// creatjilu('feiji123');
// creatjilu('feiji123', 2);
// creatjilu('feiji123', undefined, 465);
// const feiji = 'fei123';
// const me = {
//   name: '李俊',
//   passport: 123321123,
// };
// const checkit = function (feiji, keren) {
//   feiji = 'fei555'; //这里的飞机并不是原来的飞机，是拷贝来的，指向的不是同一个值，是一个新的值，在这里改变不会影响原先的飞机
//   keren.name += '先生'; //对象在内存堆里面，这里的keren其实和me指向的是同一个对象
//   if (keren.passport === 123321123) {
//     alert('没问题，进来吧');
//   } else {
//     alert('爬啊！！');
//   }
// };
// checkit(feiji, me);
// console.log(feiji, me);
//所以说原始数据和对象是不一样的，一个是拷贝到一个新的原始数据中，一个是指向同一个内存堆的对象
//对于js来说没有引用传递，只有引用值（value），像是对对象的值修改像是引用传递，但是实则不是，只是指向对象的内存堆地址，简单说就是内存堆地址也是一个值

/*记住，funtion是一个object */
// const oneword = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };
// const upperFirstWord = function (str) {
//   const [first, ...other] = str.split(' ');
//   return [first.toUpperCase(), ...other].join(' ');
// };
// //higher order funtion,高级函数，对其他函数的调用
// //作为一个object，函数甚至还有方法和属性
// const jsnb = function (str, fun) {
//   console.log(`函数的名字${fun.name}`);
//   return fun(str);
// };
// jsnb('dwad dwadwd dddd', upperFirstWord); //不带上括号就是一个值，带上了就是执行了直接
// console.log(jsnb('dwad dwadwd dddd', upperFirstWord)); //callbacks funton,回调函数，upperFirstWord我们不直接使用，而是告诉高级函数去调用
// // upperFirstWord.name = 'okok';
// // console.log(okok('jsjs nbnb'));
// const high5 = function () {
//   console.log('🫡');
// };
// document.body.addEventListener('click', high5);
// ['1', '2'].forEach(high5);
/* */
// const greet = function (say) {
//   return function (name) {
//     console.log(`${say}${name}`);
//   };
// };
// const greetSAy = greet('hey');
// greetSAy('李俊');
// greet('hello')('李俊');
// const greet2 = say => name => console.log(`${say}${name}`);

// greet2('hi')('李俊');
// const cnAir = {
//   airline: '赣-京航线',
//   iatacode: '赣京',
//   booking: [],
//   book: function (fynum, name) {
//     console.log(`${name} 定了一个${this.airline}机号${this.iatacode}${fynum}`);
//     this.booking.push({ flight: `${this.iatacode}${fynum}`, name });
//   },
// };
// const book = cnAir.book; //注意，这里的book拷贝了cnAir.book，是一个新的值，当我们调用book函数的时候，this因为没有对应的属性而报错
// cnAir.book('12366', '李俊');
// // console.log(cnAir);
// const jpAir = {
//   airline: '版-京航线',
//   iatacode: '版京',
//   booking: [],
//   // book,
// };
// book.call(jpAir, '21313', '李二');
// book.call(cnAir, '21313', '李二');
// // jpAir.book('4432', '张三');
// // console.log(jpAir);
// // console.log(cnAir);
// const bookjp666 = book.bind(jpAir, 666);
// bookjp666('托马斯');
// bookjp666('小火车');
// console.log(jpAir);
// jpAir.planes = 20;
// jpAir.buyplane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };
// // document.querySelector('.buy').addEventListener('click', jpAir.buyplane); //注意。这里的jpAir.buyplan只是一个函数,在没有括号调用的情况下(如果加了括号就不是一个值了（不是function () {console.log(this);this.planes++;console.log(this.planes);};），或者说就是直接调用了)只是一个object，只是一个值（value），是addEventListener调用的，所以控制台输出的是document.querySelector('.buy')这个语句，如果想要以jpair这个对象来作为this指向的目标的话，要使用绑定的函数方法进行调用jpair
// document
//   .querySelector('.buy')
//   .addEventListener('click', jpAir.buyplane.bind(jpAir));
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 100));
// const sureTax = addTax.bind(null, 0.23); //如果想要预设那么就要将想要预设的值放在第一位。。。但值得注意的是这里获得的函数已经是一个新函数了
// console.log(sureTax(100));
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer: function () {
//     const type = prompt(
//       `${this.options}\n${this.options.join('\n')}(Write option number)`
//     );
//     const check = type => {
//       Number(type) >= 0 && Number(type) <= 3 && this.answers[Number(type)]++;
//     };
//     if (typeof Number(type) === 'number') {
//       check(type);
//     }
//     // else {
//     //   const typea = Number(type.slice(1, -1).split(', '));
//     //   check(...typea);
//     //   console.log('typea');
//     // }
//     this.displayResults();
//   },
//   displayResults: function (type = 'array') {
//     //这里是es6的特性，预设一个值，在没有获取到传入参数的时候默认以array作为type的参数
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       console.log(`这个调查为${this.answers.join(',')}`);
//     }
//   },
// };
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));
// // poll.registerNewAnswer();
// // console.log(poll);
// // console.log(prompt('?'));
// const newob = {
//   answers: [1, 5, 3, 9, 6, 1],
// }; //为什么要设置这么一个对象呢，是因为在poll.displayResults中含有this，需要设置一个.call(newob)的形式来解决，这样调用的就是我们要测试的参数了
// poll.displayResults.call(newob); //！！记得不要带括号，带了就直接执行了，这里因为我们预设了参数，所以默认是传递了type = 'array'，执行第一个if，也可以自行传参，传入string,如下
// poll.displayResults.call(newob, 'string');
// (function () {
//   console.log('这个函数只会调用一次');
// })();
// (() => {
//   console.log('这个箭头函数只会调用一次');
// })();
// let try1 = 999;
// const r1 = function () {
//   let try1 = 123;
//   return function () {
//     let try2 = 666;
//     return function () {
//       try1++;
//       try2++;
//       console.log(`${try1}and${try2}`);
//     };
//   };
// };
// const r2 = r1();
// const r3 = r2();
// r3();
// //总结一下，为什么在r1（r2）结束以后还能调用r1（ r2）里的数据，这是因为闭包（closure），他会保留和原来父辈元素的关系，可以继续访问父辈元素，哪怕父辈函数在栈堆（call stack）中被移除，消失。换种表诉，在父辈元素被调用完了移除之后，在堆的另一个地方（我不太明确），会形成一个作用范围（scope），在调用r2r3函数的情况下甚至（！）会优先调用同名的作用范围元素，而不是全局变量。他能运行所有数据（在他被创建的环境里的所有数据）。
// console.log(r3);
// console.dir(r3);
// let f;
// const g = function () {
//   const a = 10;
//   f = function () {
//     console.log(a * 2);
//   };
// };
// const h = function () {
//   const b = 666;
//   f = function () {
//     console.log(b * 2);
//   };
// };
// g();
// f();
// //reassignig
// h();
// f();
// console.dir(f);
(() => {
  const geth1 = document.querySelector('h1');
  geth1.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    geth1.style.color = 'blue';
    // console.dir(geth1);
  });
})();
