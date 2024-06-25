'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const dispalyMovements = function (movements, sort = false) {
  const movSo = sort ? movements.slice().sort((a, b) => a - b) : movements; //犯过错误，这里少了一个slice，直接对movements动手了，需要加一个slice()，相当于拷贝了
  containerMovements.innerHTML = '';
  movSo.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const typeCn = mov > 0 ? '收入' : '支出';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    }       ${typeCn}</div>
    <div class="movements__date"></div>
    <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//2
const displayPrintBalance = function (acco) {
  const balance = acco.movements.reduce((acc, value) => acc + value, 0);
  acco.balance = balance;
  labelBalance.textContent = `${balance}€`;
};

//3
const createUseName = function (accs) {
  accs.map(function (aObj) {
    aObj.useName = aObj.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
  // return arr;
};
createUseName(accounts);

//4
const toTotalEU = function (mov, iRate) {
  const movsPos = mov.filter(mov => mov > 0).reduce((acc, v) => acc + v, 0);
  labelSumIn.textContent = `${movsPos}€`;
  const movsLess = mov.filter(mov => mov < 0).reduce((acc, v) => acc + v, 0);
  labelSumOut.textContent = `${Math.abs(movsLess)}€`;
  const interest = mov
    .filter(mov => mov > 0)
    .map(benjin => (benjin * iRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, value) => acc + value, 0);
  labelSumInterest.textContent = `${interest}€`;
};
//spc
const updateUi = function (acc) {
  //展示金额变化
  dispalyMovements(acc.movements);
  //展示金额总数
  displayPrintBalance(acc);
  //展示下方金额使用，用出，利息变化
  toTotalEU(acc.movements, acc.interestRate);
};
//5
let trueMan;
btnLogin.addEventListener('click', function (e) {
  //因为这里是表单（form），点击提交以后会默认刷新页面,但是有个好处就是回车也算点击
  e.preventDefault(); //这里的作用是阻止默认事件
  trueMan = accounts.find(function (v) {
    return v.useName === inputLoginUsername.value;
  });
  // console.log(trueMan);
  if (trueMan?.pin === Number(inputLoginPin.value)) {
    //显示ui和展示欢迎信息
    labelWelcome.textContent = `欢迎回来我的朋友${trueMan.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    //更新ui
    updateUi(trueMan);
    //将输入框的账号密码清除
    inputLoginPin.value = inputLoginUsername.value = '';
    //让密码框回车后失去焦点（没有闪烁的线）
    inputLoginPin.blur();
    console.log('login');
  }
});

//6
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //一样的是用于停止表单的默认刷新事件
  const reciveMan = inputTransferTo.value; //给的人
  const accOutOthers = Number(inputTransferAmount.value); //给的钱
  const giveMan = accounts.find(function (value) {
    //再账号群找到要转账的人
    return value.useName === reciveMan;
  });
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    accOutOthers > 0 &&
    giveMan &&
    trueMan.balance >= accOutOthers &&
    trueMan.useName !== reciveMan
  ) {
    trueMan.movements.push(-accOutOthers);
    giveMan.movements.push(accOutOthers);
    updateUi(trueMan);
    console.log('right work');
  }
});
//7
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    trueMan.movements.some(
      value => value >= 0.1 * Number(inputLoanAmount.value)
    ) &&
    trueMan.balance > 0 &&
    Number(inputLoanAmount.value) > 0
  ) {
    trueMan.movements.push(Number(inputLoanAmount.value));
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
    updateUi(trueMan);
  }
});

//8
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    trueMan.pin === Number(inputClosePin.value) &&
    trueMan.useName === inputCloseUsername.value
  ) {
    const index = accounts.findIndex(function (value) {
      return value.useName === inputCloseUsername.value;
    });
    inputCloseUsername.value = inputClosePin.value = '';
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
});
//9
let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  dispalyMovements(trueMan.movements, !sort);
  console.log(trueMan.movements, sort);
  sort = !sort;
});

// const curToUsd = 1.1;
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const toTotalUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * curToUsd)
//   .reduce((acc, v) => acc + v, 0);
// console.log(toTotalUSD);
// console.log(createUseName(accounts));
// console.log(account1);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// const ob = {
//   name: 'tom',
//   age: 10,
// };
// for (const i of ob) {
//   console.log(i);
// }//对象不能遍历，记住了，要用entries返回一个数组才可以

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
//   [123, 666],
// ]);
// currencies.forEach(function (v, k, m) {
//   //value,key,map
//   console.log(`${k}:${v}`);
// });
// const mon = new Set([[1, '2'], [3, '21'], [1, '2'], 1, '2']);
// mon.forEach(function (v, _, m) {
//   //这是一个约定'_',下划线表示一次性变量，或者说没有意义的变量，以防止混淆，尤其是在key,value一样的情况下
//   //没有key的时候，key被简单的设计为了值
//   //value,key,map
//   console.log(`${v}:${v}`);
// });
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // console.log(...movements.entries());
// for (const [index, m] of movements.entries()) {
//   //别忘了，entries是返回一个数组，将里面的东西转换为[[0,200], [1,450], [2,-400]]的形式

//   if (m > 0) {
//     console.log(`${index}号，你存了${m}块钱，牛逼哥们`);
//   } else {
//     console.log(`${index}号，你用了${Math.abs(m)}块钱，马上破产了`);
//   }
// }
// //forEach
// //有一个重大问题就是continue和break不能在forEach中使用
// // movements.forEach(function (m) {
// movements.forEach(function (m, index, array) {
//   //第一个是遍利的数据，第二个是index,第三个是数组，按顺序来，名字是形参，不用管
//   if (m > 0) {
//     console.log(`${index}号，你存了${m}块钱，牛逼哥们`);
//   } else {
//     console.log(`${index}号，你用了${Math.abs(m)}块钱，马上破产了`);
//   }
//   // console.log(array);
// }); //一个常见的高级函数，回调一个函数在括号中，同时会传递一个参数给回调函数
/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];
// // console.log(...arr.slice(2, 4));
// // console.log(...arr.slice(3));
// arr.splice(-1); //这里不是返回一个值，而是直接对数据动手,删除选中的
// console.log(...arr);
// arr.splice(1, 1); //第一个参数是序号index,第二个是修改的数量！！！注意，不是修改的位置
// console.log(...arr);
// //reverse 翻转方法，同上，直接修改
// const arr2 = ['1', '2', '3', '4', '5', '6', '7', '8'];
// arr2.reverse();
// console.log(...arr2);
// //concat 连接方法，这个不修改原参数
// const letter = arr.concat(arr2);
// console.log(...letter);
// console.log(...[...arr, ...arr2]);
// //join 这个不修改原参数
// console.log(letter.join(' and '));
// const arrmore = [1, 2, 3];
// console.log(arrmore[arrmore.length - 1]);
// console.log(arrmore.slice(-1)[0]);
// console.log(arrmore.at(-1)); //!!!!new字符串使适用
// console.log('i am god'.at(-1)); //!!!!new字符串使适用
// // console.log(arrmore[-1]);//不行
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const juliaData = [3, 5, 2, 12, 7];
// const kateData = [4, 1, 15, 8, 3];
// const checkDog = function (a1, a2) {
//   // const dataDog = [...a1.slice(1, -1), ...a2.slice(1, -1)];
//   const dataDog = a1.concat(a2);
//   console.log(juliaData, kateData);
//   // for (const [i, value] of dataDog.entries()) {
//   //   if (value >= 3) {
//   //     console.log(`第${i + 1}条狗成年了，今年是${value}岁`);
//   //   } else {
//   //     console.log(`第${i + 1}条狗还没有成年，它才${value}岁`);
//   //   }
//   // }
//   dataDog.forEach(function (value, index) {
//     value >= 3
//       ? console.log(`第${index}只狗已满${value}岁，成年矣`)
//       : console.log(`第${index}只狗尚且年幼，堪堪${value}岁`);
//   });
// };
// checkDog(juliaData, kateData);
// juliaData.splice(1, 1);
// console.log(juliaData);

// const curToUsd = 1.1;
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const movementsUSD = movements.map(mov => mov * curToUsd); //这里的map是传递每一个参数，类似于循环
// console.log(movementsUSD);
// const mov2 = movements.map(function (mov, index, arr) {
//   return `操作${
//     index + 1
//   }，这次是${mov > 0 ? '存储' : '使用'}了${Math.abs(mov)}元`;
// }); //我觉得和foreach有点像了，作为一个高级函数，传递给回调函数的参数都是值value，索引index，数组array
// console.log(mov2);
// //这里说到创建数组mov2不是一个接一个（one by one）,而是直接得到一个数组，而不是创建一个空数组一个一个的push，可能有些不太明确，但函数式的编程确实式js的未来浪潮
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const filtersMov = movements.filter(function (mov) {
//   return mov > 0;
// }); //传参类似于map,反悔筛选后的值
// // console.log(...movements);
// // console.log(...filtersMov);
// const filterOut = movements.filter(mov => mov < 0);
// // console.log(...filterOut);
// const balance = movements.reduce(function (acc, value, index, array) {
//   return acc + value;
// }, 0); //和前面两个方法不同的是，reduce有参数累加器acc,同时后面的0是传递给acc的初始参数

// console.log(balance);

// const max = movements.reduce(function (acc, v) {
//   return acc > v ? acc : v;
// }, movements[0]); //和其他的不一样，每次迭代都是返回给acc，知道最后一次才返回给max，以确保返回的是一个数据而不是一个数组

// console.log(max);

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// const juliaData = [3, 5, 2, 12, 7];
// const kateData = [4, 1, 15, 8, 3];
// const countDogAge = juliaData
//   .concat(kateData)
//   .filter(value => value > 2)
//   .map(value => `这狗成年了，有${value * 4 + 16}岁`);
// console.log(countDogAge);
// const avgDog = juliaData.reduce(function (acc, value, index, arr) {
//   console.log(acc);
//   if (arr.length !== index + 1) return acc + value;
//   else return (acc + value) / arr.length;
// }, 0);
// console.log(avgDog);
// const juliaData = [3, 5, 2, 12, 7];
// const kateData = [4, 1, 15, 8, 3];
// const avgDog = age => {
//   const avg = age
//     .filter(v => v > 2)
//     .map(v => v * 4 + 16)
//     .reduce((acc, v, i, arr) => acc + v / arr.length, 0);
//   return avg;
// };
// console.log(avgDog([4, 1, 15, 8, 3]));
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const first = movements.find(function (v) {
//   return v > 0;
// });
// console.log(first); //和过滤相似，返回一个布尔值以知道是否将数据给first，但只返回第一个结果（作为一个值，而不是数组）
// const trueMan = accounts.find(function (v) {
//   return v.owner === 'Steven Thomas Williams';
// });
// // console.log(accounts);
// console.log(trueMan);

//some方法，当回调函数成立时，哪怕只有一个，就会返回一个布尔值
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // const anyWay = movements.some(mov => mov === 200);
// // console.log(anyWay);
// //every方法，只有每一个元素都成立的时候才返回true
// console.log(
//   movements.every(function (value) {
//     return value > -100000;
//   })
// );

//flat方法，默认取消数组的第一层嵌套，第二层无用,不改变自身，可以在括号中写入参数，修改默认参数（1），以达到需要修改几层的目的
// const arr = [[1, 2, 3], 4, [5, 6, 7, 8], 9];
// console.log(...arr.flat());
// console.log(...arr);
// const arrDeep = [[[1, 2], 3], 4, [5, [6, 7], 8], 9];
// console.log(...arrDeep.flat());
// console.log(...arrDeep.flat(2));
// const accountMo = accounts.map(objV => objV.movements);
// console.log(...accountMo);
// const allMo = accountMo.flat();
// console.log(allMo);
// const overMoney = allMo.reduce((acc, v) => acc + v, 0);
// console.log(overMoney);
// //简化
// const overMoney2 = accounts
//   .map(v => v.movements)
//   .flat()
//   .reduce((acc, v) => acc + v, 0);
// console.log(overMoney2);
// //flatMap相当于map().flat()一起使用
// const overMoney3 = accounts
//   .flatMap(v => v.movements) //但是只能取消第一层，不能加参数用来修改flat()修改的层数
//   .reduce((acc, v) => acc + v, 0);
// console.log(overMoney3);

// //sort()方法，需要注意的是，这个方法直接作用于数组之上，修改了原始数据
// //String
// const arrS = ['tom', 'maira', 'alen', 'dan'];
// arrS.sort();
// console.log(arrS);
// //Number
// const arrN = [1, 8, 52, 22, 212, 211, -4, 6];
// // arrN.sort();
// console.log(arrN); //如你所见，sort是将所有元素都转化为字符串后取首字母后通过首字母排序的，-在前，其他的按首字母来的
// //tip,当return>0时交换,return<0不交换
// arrN.sort(function (a, b) {
//   //由小到大
//   console.log(a, b);
//   // if (a > b) {
//   //   return 1; //意思是调换，当a>b
//   // }
//   // if (b > a) {
//   //   return -1;
//   // }
//   return a - b; //当a-b为整数则a>b,调换,反之亦然。。注意，当值为0的时候不会调换
// });
// console.log(arrN);
// //在字符与数字都含有的时候不要用这个方法，因为这是没有意义的。；）

//fill
// const x = new Array(10); //这里创建了一个具有10个空值的数组，而不是只有一个数据10的数组。
// const x2 = [1, 2, 3, 4, 5, 6, 7];
// x.fill(1);
// console.log(...x);
// x.fill(200, 2, 5); //第一个是填入的数据。如果只有一个200那么就把所有的数据都换成200，如果加入了第二个乃至于第三个数据那么就和slice的一二参数类似
// console.log(...x);
// x2.fill(200, 2, 5);
// console.log(...x2);

// //Array.from(),我的描述是从 Array对象中使用from()方法。输入一个对象，一个回调函数，得到一个数组，笔力有限，不能言尽，可以例子详实。
// const y = Array.from({ length: 6 }, () => 1); //不用往回调函数里加入参数
// console.log(...y);
// const y2 = Array.from({ length: 6 }, (_, index) => index + 1); //和其他的数组方法类似,不用value=index + 1，直接index + 1就行，return的值就是给value的
// //还有一个点就是不用的参数用_表示，这算是一个通用惯例
// console.log(...y2);
// const y3 = Array.from({ length: 100 }, () =>
//   Math.trunc(Math.random() * 100 + 1)
// );
// console.log(...y3);

// labelBalance.addEventListener('click', function () {
//   const coolArray = Array.from(
//     document.querySelectorAll('.movements__value'),
//     function (v) {
//       return Number(v.textContent.replace('€', ''));
//     } //有点酷炫，这里的第一个参数，获取到的是一个所谓的noodlist,不是一个数组，是一个对象，第二个值的数据就是来源于第一个值，有点炫酷不好说
//   );
//   console.log(coolArray);
// });
// //基于元素的
// // const atry = [1, 2, 3];
// // console.log(atry.indexOf(3));

//一些练习罢了

// const bankAllPos = accounts
//   .flatMap(v => v.movements)
//   .filter(v => v > 0)
//   .reduce((acc, v) => acc + v, 0);
// console.log(bankAllPos);
// const accsMore = accounts
//   .map(v => v.movements.reduce((acc, v) => acc + v, 0))
//   .filter(v => v > 1000).length;
// console.log(accsMore);
// const accsMoreAn = accounts
//   .flatMap(v => v.movements)
//   .filter(v => v >= 1000).length;
// console.log(accsMoreAn);
// const accsMoreAn2 = accounts
//   .flatMap(v => v.movements)
//   .reduce((acc, v) => (v >= 1000 ? acc + 1 : acc), 0); //注意这里不能使用acc++因为这样只会返回acc,c语言中也学过类似的，也是这个道理，可以用++acc解决
// console.log(accsMoreAn2);

// const { outer, iner } = accounts
//   .flatMap(v => v.movements)
//   .reduce(
//     (acc, v) => {
//       // v >= 0 ? (acc.iner += v) : (acc.outer += v);
//       // return acc;
//       //来点帅的
//       acc[v >= 0 ? 'iner' : 'outer'] += v;
//       return acc; //return is very very important
//     },
//     { outer: 0, iner: 0 }
//   ); //令人意外的是，初始值可以设置为一个对象，这是我没想过的，这时候acc就是这个对象
// console.log(outer, iner);

// const overTitle = function (st) {
//   const expectWord = ['a', 'an', 'the', 'with', 'or'];
//   const upCase = v => v.slice(0, 1).toUpperCase() + v.slice(1);
//   const getTitle = st
//     .split(' ')
//     .map(v => (expectWord.includes(v) ? v : upCase(v)))
//     .join(' ');
//   // ));
//   return getTitle;
// };
// console.log(overTitle('this is a great class'));

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
const addAtr = function (ds) {
  ds.map(v => {
    //这里用foreach更好，逻辑性更强，这里也许连我自己写下的时候都有些凌乱，借用了对象的的对象这个概念
    v.recommendedFood = `${Math.trunc(v.weight ** 0.75 * 28)}kg`;
  });
};

addAtr(dogs);
console.log(...dogs);
const findSar = function (ds) {
  // const sar = ds.filter(v => v.onwers[0] === 'Sarah');
  const [sar] = ds.filter(v => v.owners[0] === 'Sarah');
  // console.log(typeof sar.recommendedFood.slice(0, -2));
  console.log(
    `sarsh's dog is eat too ${
      sar.curFood > Number(sar.recommendedFood.slice(0, -2)) ? 'much' : 'less'
    }`
  );
};
let ownersEatTooMuch = [];
let ownersEatTooLittle = [];

const ownersEat = function (dogs) {
  ownersEatTooMuch = dogs
    .filter(dog => dog.curFood > Number(dog.recommendedFood.slice(0, -2)))
    .map(v => v.owners)
    .flat();
  ownersEatTooLittle = dogs
    .filter(dog => dog.curFood < Number(dog.recommendedFood.slice(0, -2)))
    .map(v => v.owners)
    .flat();
};
ownersEat(dogs);
const ok = v =>
  v.curFood < 1.1 * Number(v.recommendedFood.slice(0, -2)) &&
  v.curFood > 0.9 * Number(v.recommendedFood.slice(0, -2));
findSar(dogs);
console.log(...dogs);
console.log(ownersEatTooMuch, ownersEatTooLittle);
console.log(`${ownersEatTooMuch} eat too much!`);
console.log(`${ownersEatTooLittle} eat too little!`);
console.log(dogs.some(v => ok(v)));
const okayDog = dogs.filter(v => ok(v));
console.log(...okayDog);
const dogsCopy = dogs.slice().sort((a, b) => a.curFood - b.curFood);
console.log(dogsCopy);
