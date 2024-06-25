'use strict';

// // Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// // Data needed for first part of the section
// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },
// };
// const airline = 'china hainan AIR';
// const plane = 'dapeng132';
// console.log(plane[1]);
// console.log(airline.lastIndexOf('c'));
// console.log(airline.indexOf('hai'));
// console.log(airline.slice(0, 3));
// console.log(airline.slice(0, airline.indexOf(' ')));
// console.log(airline.slice(airline.lastIndexOf(' ') + 1));
// console.log(airline.slice(-3));
// console.log(airline.slice(airline.indexOf(' '), airline.lastIndexOf(' ')));
// const checkMid = function (seat) {
//   const sb = seat.slice(-1);
//   if (sb === 'B' || sb === 'E') {
//     console.log('u are unluck☹️');
//   } else console.log('u r lucky❤️❤️');
// };
// checkMid('12B');
// checkMid('12C');
// checkMid('12D');
// console.log(new String('lijun'));
// console.log(typeof new String('lijun')); //前文在对字符串使用方法是，js在幕后使用了new String来改变字符串使其成为一个对象（object）
// console.log(typeof new String('lijun').slice(1)); //在使用完方法后，会自动将其转化为字符串，如上
// const cair = airline[4] + airline;
// console.log(cair);
// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());
// const pname = 'lIJun';
// const nameLow = pname.toLowerCase();
// const nameTure = nameLow[0].toUpperCase() + nameLow.slice(1);
// console.log(nameTure);
// //trim删除字符串首部尾部的空格回车一类
// const email = 'lijun@qq.com';
// const emailMiss = '  lijun@qq.coM \n';
// // const emailLow = emailMiss.toLowerCase();
// // const emailTrim = emailLow.trim();
// const normalizeEmail = emailMiss.toLowerCase().trim();
// console.log(normalizeEmail);
// // console.log(emailTrim);
// const priceUS = '200,1$';
// const priceCN = priceUS.replace('$', '￥').replace(',', '.'); /* */
// console.log(priceCN);
// const openDoor = '请所有乘客登入大门，大门23';
// const openDoorT = openDoor.replaceAll('大门', '舱门');
// const openDoorT2 = openDoor.replace(/大门/g, '舱门'); //正则表达式,g是全局的意思
// console.log(openDoorT);
// console.log(openDoor.includes('23'));
// console.log(openDoor.includes('222'));
// console.log(openDoor.startsWith('23')); //首部包含
// console.log(openDoor.startsWith('请')); //首部包含
// console.log(openDoor.endsWith('23')); //wei部包含
// console.log(openDoor.endsWith('2')); //尾部包含
// const checkD = function (item) {
//   return item.includes('刀') ? not : ok;
// };
// // checkD('我有一把刀');
// const arrayL = ['我', '有', '一', '把', '刀'];
// console.log(arrayL.join(''));
// const bigArr = function (name) {
//   const bigname = name.toLowerCase().split(' ');
//   let bnm = [];
//   for (const v of bigname) {
//     // bnm.push(v[0].toUpperCase() + v.slice(1));
//     bnm.push(v.replace(v[0], v[0].toUpperCase()));
//   }
//   return bnm.join(' ');
// };
// console.log(bigArr('tom joel'));
// console.log('tom joel'.padStart(21, '-22')); //第一个数据填填充后的字符大小，第二个是填充的字符
// console.log('tom joel'.padEnd(21, '-22'));
// const pinbi = function (num) {
//   const cut = String(num).slice(0, 3).padEnd(7, '*') + String(num).slice(-4);
//   return cut;
// };
// console.log(pinbi(18279672707));
// const pinbi2 = function (num) {
//   const cut = String(num).slice(-4).padStart(String(num).length, '*');
//   return cut;
// };
// console.log(pinbi2(1028310938120981));
// console.log('滚啊'.repeat(5)); //重复的意思
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   const tarr = text.split('\n');
//   for (const [index, i] of tarr.entries()) {
//     const [first, second] = i.toLowerCase().trim().split('_');
//     let output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     output = output.padEnd(20, ' ');
//     output += '✅'.repeat(index + 1);
//     console.log(output);
//   }
//
//
// const text = document.querySelector('textarea').value;
// const tarr = text.split('\n');
// // console.log(tarr);
// const allin = [];
// let nmd = 1;
// for (let i of tarr) {
//   // i.padEnd(19, ' ');
//   // i += '✅' * nmd;
//   const ix = i.split('_'); //这里得到的是一个单词组拆分后的数组，现在要做的是将数组的每一个元素首字母大写
//   // console.log(ix);
//   let yxy = [];
//   for (let x of ix) {
//     yxy.push(x.trim().replace(x[0], x[0].toUpperCase())); //已经将所有的首字母大写了
//     // console.log(yxy, '001');
//   }
//   // console.log(yxy, '002');
//   const dontkowny = [];
//   dontkowny.push(
//     ix[0].replace(ix[0][0], ix[0][0].replace(ix[0], ix[0].toLowerCase()))
//   ); //第一个单词的首字母改回小写
//   dontkowny.join('');
//   allin.push(dontkowny);
//   nmd++;
// }
// console.log(allin.join('\n'));
// });
// let akhah = '2313121';
// akhah.replace('2', '3'); //也就是说replace是返回一个变化了的数据而不是直接将原先的数据进行修改
// console.log(akhah);
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
const gogogo = function (text) {
  const gs = String(text);
  const gss = gs.split('+');
  let haode = '';
  for (const [index, i] of gss.entries()) {
    const gsss = i.split(';');
    haode += `${index % 2 === 0 ? '🔴' : ''}${gsss[0].replaceAll(
      '_',
      ' '
    )} from ${gsss[1].slice(0, 3)} to ${gsss[2].slice(0, 3)} (${gsss[3].replace(
      ':',
      'h'
    )})\n`;
  }
  let santian = haode.split('\n');
  for (let i of santian) {
    i = i.padStart(50, ' ');
    console.log(i);
  }
  // console.log(haode);
};
// gogogo(flights);
const getcode = str => str.slice(0, 3).toUpperCase();
for (const i of flights.split('+')) {
  const [type, form, to, time] = i.split(';');
  // console.log(type, form, to, time);
  const oput = `${
    type.includes('Delayed') ? '🔴' : '' + type.replaceAll('_', ' ')
  } from ${getcode(form)} to ${getcode(to)}(${time.replace(
    ':',
    'h'
  )} )`.padStart(50);
  console.log(oput);
}
