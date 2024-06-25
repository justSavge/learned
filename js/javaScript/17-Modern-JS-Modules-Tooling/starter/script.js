// 'strict';//不用了，module默认就是严格模式
//moduel,导入的模块在第一时间被解析，然后才是执行自己的代码，以所谓的同步而非异步执行
//注意：
//import是同步，先下载，
//export是异步，要的时候再链接到自己的代码
//假设这是开发环节，我是index.js,导入x.js
//1.解析index.js
//2.下载import的模块x.js（同步执行）
//3.链接imports到x.js模块的导出位exports
//4.执行x.js...
//5.执行index.js
// console.log(fkcarts);
// console.log(sb, all); //这时候beach没了，只能用sb
// import { addToCart, beach as sb, all } from './shoppingcart.js';
// addToCart('sb', 1);
console.log('导入数据');
//name export
// import * as shoppingCart from './shoppingcart.js'; //导入所有，以shoppingCart为名
// shoppingCart.addToCart('milk', 2);
// console.log(shoppingCart.all);
//default export
// shoppingCart
// import add from './shoppingcart.js';//随便取什么名字
//同时支持如下操作，一起执行
// import add, { addToCart, beach as sb, all } from './shoppingcart.js';
// import add, { fkcarts } from './shoppingcart.js';
// add('egg', 2); //但是我们一般不会混着使用，以免混乱
// add('cake', 3);
// add('cookie', 7);
// console.log(fkcarts); //现实的不是const fkcarts = [];而是一个存储了数据的数组，说明了export确实是一个链接，通过import链接的，而不是简单的拷贝，事实上，这个和shoppingcart.js里的fkcarts再幕后是同一个东西
//所以，重复一遍，export不是拷贝代码，而是一个在线链接到shoppingcart.js里的数据的东西，在这里的fkcarts和shoppingcart.js里的fkcarts是指向同一个东西，在内存当中
//小插曲，await 可以直接在模块当中使用，这是es2022的特性，一个相当重要的特性，好像是这样的。
//just try!
// const getjson = await fetch('https://jsonplaceholder.typicode.com/posts');

// const data = await getjson.json();

// console.log(data);
// //可以看出这是一件好事，不在需要使用asnyc来解决，但是也存在着一些坏处，这会阻碍moduel下面的代码的操作。
// console.log('just bock...');
//下面是一些。。的dx
// const shippingCart2 = (function () {
//   const cart = [];
//   const shippingCart = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;
//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${product} ${quantity} 已经到购物车了，不要超过${shippingCart}`
//     );
//     return '666';
//   };
//   const orderStock = function (product, quantity) {
//     console.log(`${product} ${quantity} 订单已发送`);
//   };
//   return {
//     addToCart,
//     cart,
//     shippingCart,
//     totalPrice,
//     totalPrice,
//   };
// })();
// shippingCart2.addToCart('milk', 1);
// shippingCart2.addToCart('apple', 2);
// shippingCart2.addToCart('egg', 3);
// console.log(shippingCart2.cart); //为什么可以这样展示3个呢，闭包，这是答案，有些遗忘来，但是还有一些东西，简单说就是这些return的cart等其实是放在他们的出生的的，是可以访问的
//commonJs moduels,可以认为是一种规范，es6moduel没有出现以前，大伙就使用这么一种规范帮助使用moduel模块

// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${product} ${quantity} 已经到购物车了，不要超过${shippingCart}`);
// };
// const {addToCart} = require('./shoppingcart.js')

// import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';
//不只使用于es6，还适用于commonJs，img,各种各样的模块
//如下
import { cloneDeep } from 'lodash-es';
// console.log(cloneDeep);
const s = {
  cart: [
    { product: 'milk', quanlity: 6 },
    { product: 'drink', quanlity: 2 },
    { product: 'noodlles', quanlity: 1 },
  ],
  use: { kown: true },
};
// const copy = Object.assign({}, s);
// console.log(copy.cart.push({ product: 'bread', quanlity: 8 }));
// copy.add = 'none';
// console.log(s.cart);
// console.log(copy.cart);
// console.log(s);
const deepCopy = cloneDeep(s);
deepCopy.cart.push({ product: 'banana', quanlity: 7 });
console.log(s.cart);
console.log(deepCopy.cart);
//在每次reload的时候，会重新执行每个模块，这是相当浪费,恼人的。
//现在又一种方法就是，每次更新模块的时候只会更新修改的部分，而不是全部重新加载，这是非常梦幻的功能
//let's see
//这段代码不是给js看的而是给parcel看的
if (module.hot) {
  module.hot.accept();
}
//parcel build index.html
//压缩文件，删去空格等可以移除的东西，一般我们发送给用户的代码就是这个
//将es6的语法转为es5
import 'core-js/stable/array';
//转换异步函数
import 'regenerator-runtime/runtime';
