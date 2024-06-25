'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2023-11-29T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
//new f
const createNewDate = function (date) {
  //准确的账号，such as account1
  const calcDays = (d1, d2) =>
    Math.round(Math.abs((d2 - d1) / (1000 * 60 * 60 * 24)));
  const dayPassd = calcDays(new Date(), date);
  // console.log(dayPassd);
  if (dayPassd === 0) return '今天';
  else if (dayPassd === 1) return '昨天';
  else if (dayPassd === 2) return '前天';
  else if (dayPassd <= 7) return `${dayPassd}天过去了`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(navigator.language, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).format(date);
  }
};
const dispalyMovements = function (acc, sort = false) {
  const movSo = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements; //犯过错误，这里少了一个slice，直接对movements动手了，需要加一个slice()，相当于拷贝了
  containerMovements.innerHTML = '';
  movSo.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const dispayDate = createNewDate(date);
    const typeCn = mov > 0 ? '收入' : '支出';
    const IntlMov = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'CNY',
    }).format(mov);
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    }       ${typeCn}</div>
    <div class="movements__date">${dispayDate}</div>
    <div class="movements__value">${IntlMov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//2
const displayPrintBalance = function (acco) {
  const balance = acco.movements
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);
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
  labelSumIn.textContent = `${movsPos.toFixed(2)}€`;
  const movsLess = mov.filter(mov => mov < 0).reduce((acc, v) => acc + v, 0);
  labelSumOut.textContent = `${Math.abs(movsLess.toFixed(2))}€`;
  const interest = mov
    .filter(mov => mov > 0)
    .map(benjin => (benjin * iRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, value) => acc + value, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};
//spc
const updateUi = function (acc) {
  //展示金额变化
  dispalyMovements(acc);
  //展示金额总数
  displayPrintBalance(acc);
  //展示下方金额使用，用出，利息变化
  toTotalEU(acc.movements, acc.interestRate);
};
//计时器，没办法,很乱，没时间整理
const startLogOutTimer = function () {
  const tick = () => {
    const sec = String(time % 60).padStart(2, 0);
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    labelTimer.textContent = `${min}分${sec}秒`;

    //?.时间为0，用户离线，停止计时
    if (time === 0) {
      //可以在这里注销计时器
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  //1.设置一个计时器，记录5分钟
  let time = 100;
  tick();
  //2.每秒钟都调用在右下角，实现倒计时功能
  const timer = setInterval(tick, 1000); //有个顶级的，就是，这里的回调函数不会立刻执行会先执行一秒后执行100秒，解决方法就是吧回调函数放在外面，执行后调用计时器
  return timer; //为了每次登录方便清除计时器
};
//5
//5
let trueMan, timer; //保证只有一个计时器
// let trueMan = account1;
// updateUi(trueMan);
// containerApp.style.opacity = 100;
const nowT = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};
const locale = navigator.language;
// console.log(locale);
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(nowT);
btnLogin.addEventListener('click', function (e) {
  //因为这里是表单（form），点击提交以后会默认刷新页面,但是有个好处就是回车也算点击
  e.preventDefault(); //这里的作用是阻止默认事件
  trueMan = accounts.find(function (v) {
    return v.useName === inputLoginUsername.value;
  });
  // console.log(trueMan);
  if (trueMan?.pin === +inputLoginPin.value) {
    //显示ui和展示欢迎信息
    labelWelcome.textContent = `欢迎回来我的朋友${trueMan.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    labelDate.textContent = `${year}年/${month}月/${day}日/${hour}点/${minutes}分`;
    //更新ui
    updateUi(trueMan);
    //将输入框的账号密码清除
    inputLoginPin.value = inputLoginUsername.value = '';
    //让密码框回车后失去焦点（没有闪烁的线）
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    console.log('login');
  }
});

//6
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //一样的是用于停止表单的默认刷新事件
  const reciveMan = inputTransferTo.value; //给的人
  const accOutOthers = +inputTransferAmount.value; //给的钱
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
    trueMan.movementsDates.push(new Date().toISOString());
    giveMan.movementsDates.push(new Date().toISOString());
    // console.log(...trueMan.movementsDates);
    updateUi(trueMan);
    console.log('right work');
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});
//7
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    trueMan.movements.some(
      value => value >= 0.1 * Math.floor(inputLoanAmount.value)
    ) &&
    trueMan.balance > 0 &&
    Math.floor(inputLoanAmount.value) > 0
  ) {
    setTimeout(function () {
      trueMan.movements.push(Math.floor(inputLoanAmount.value));
      trueMan.movementsDates.push(new Date().toISOString());
      // console.log(Math.floor(inputLoanAmount.value));
      inputLoanAmount.value = '';
      inputLoanAmount.blur();
      updateUi(trueMan);
    }, 3000);
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

//8
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    trueMan.pin === +inputClosePin.value &&
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
  dispalyMovements(trueMan, !sort);
  console.log(trueMan.movements, sort);
  sort = !sort;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// //number 用 +号代替也算是js的先进了（ps:maybe）,但是js面对+时会对其进行强制类型转换，变成数字类型。。
// console.log(Number.parseInt('23px', 10)); //10代表十进制，可以不加，但是加了可以避免一些潜在的bug
// console.log(Number.parseInt('p23px', 10)); //只有开始为数字时才可以进行提取转换为数字
// console.log(Number.parseInt(' 2.5px')); //只有整数部分
// console.log(Number.parseFloat('  2.5px')); //这是浮点数
// //注意，字符串前面有空格不影响

// // Number.isNaN,看名字就懂了
// console.log(Number.isNaN(+'10px')); //只有这个才是NaN,not a number
// console.log(Number.isNaN('10')); //这是false,这是字符串不是NaN
// console.log(Number.isNaN(10));
// console.log(Number.isNaN(10 / 0)); //这是无穷，有个单词表示，不是NaN
// // Number.isFinite(),是有限的（数字）吗
// console.log(Number.isFinite(10));
// console.log(Number.isFinite('10'));
// console.log(Number.isFinite(10 / 0));
// // Number.isInteger(),是整数吗
// console.log(Number.isInteger(10));
// console.log(Number.isInteger(10.0)); //这个也是整数
// console.log(Number.isInteger(10.21));
// console.log(Number.isInteger(10 / 3));
// //
//平方根
// // Math.sqrt()
// console.log(Math.sqrt(25));
// console.log(Math.sqrt(16));
// console.log(25 ** (1 / 2));
// // Math.max()
// console.log(Math.max(1, 2, 8, 6, 5, 1));
// console.log(Math.max(1, 5, '9', 6, 2)); //注意，max在这里对字符串自动进行了强制转换
// console.log(Math.max(1, 5, 6, '12px')); //行不通，没有Number.parseFloat的功能
// // Math.min(),类似于上
// console.log(Math.min(1, 3, 2));
// // Math.PI,一个常数，不是方法
// console.log(Math.PI);

// // Math.random(),老朋友了，随机数
// console.log(Math.trunc(Math.random() * 7 + 1)); //1~7
// //这里我们不妨来点帅的
// const randomInt = function (max, min) {
//   return Math.trunc(Math.random() * (max - min) + min);
// }; //得到一个介于min和max的数，0~max-min=>min+0~min+max-min=>min~max
// console.log(randomInt(2, 9));

// //Math.trunc(),Math.round(),第一个是简单的去除小数部分，第二个是四舍五入
// console.log(Math.trunc(10.1));
// console.log(Math.trunc(10.9));
// console.log(Math.round(10.1));
// console.log(Math.round(10.9));
// //类似的
// // Math.ceil()和Math.floor()，第一个是直接入（大），23.1=>24,第二个是直接舍去（小），23.9=>23
// console.log(Math.ceil(10.1));
// console.log(Math.ceil(10.9));
// console.log(Math.floor(10.1));
// console.log(Math.floor(10.9));
// //注意，他们都默认做强制类型转换
// console.log(Math.floor('10.2')); //23
// //可能有些困惑，Math.trunc()和Math.floor()不是一样吗，但是在面对负数时就不同了
// console.log(Math.ceil(-10.1)); //24
// console.log(Math.ceil(-10.9)); //24
// console.log(Math.floor(-10.1)); //23
// console.log(Math.floor(-10.9)); //23

// //小数，toFixed()
// console.log((1.5).toFixed(0)); //数字.toFixed(保留的小数为)
// console.log((1.511).toFixed(1)); //注意转换之后时字符串
// console.log((1.5555).toFixed(3)); //四舍五入
// console.log((1.51111).toFixed(3));
// // console.log([...document.querySelectorAll('.movements__row')]);
// //数字分割符
// console.log(212_321_211_212); //方便阅读，js看到的实际上只有212321211212
// console.log(Number('212_212')); //用不了
// //

// //事实上，每一个数字类型都由64位组成，53位存储数据，剩下的用来放地址，符号之类的
// console.log(2 ** 53 - 1); //这是极限
// console.log(Number.MAX_SAFE_INTEGER); //很重要
// console.log(2 ** 53 + 10); //试试大于极限的数，无法表示，有时候会出错
// //有个办法就是es2020提出了一个bigint,可以存放任意大小的数字
// console.log(1651616516165165165165151n); //加个n
// console.log(BigInt(1651616516165165165165151)); //这样也..行，错了，只能放小数字
// // console.log(1651616516165165165165151n + 120);//看起来可行，实则会报错，不能将bigint和其他数据类型混着用
// console.log(1651616516165165165165151n > 120); //但这样可行
// console.log(120n === 120); //flase,都不是一个类型的
// console.log(1651616516165165165165151n + ' is big!!!!'); //字符串可以拼接
// // console.log(Math.sqrt(16n));//这样不行啊
// console.log(11n / 3n); //返回一个大整形，没有小数部分

// const now = new Date();
// console.log(now);
// const yuan = new Date('1 1 2024');
// console.log(yuan);
// console.log(new Date(0));
// //时间戳
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); //日*小时*分钟*秒*毫秒=>三天后
// const future = new Date(2035, 9, 1, 8, 30); //月份是从0开始的
// console.log(future);
// console.log(future.getFullYear()); //never use getyear()
// console.log(future.getMonth()); //9->10
// console.log(future.getDate()); //日期
// console.log(future.getDay()); //周几数字表示
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString()); //遵守某种国际标准的表示方式
// console.log(future.getTime()); //获取从1970年那天到future经过的毫秒数
// console.log(Date.now());
// //可以设置时间
// future.setFullYear(2050); //多的就不说了，一个逻辑
// console.log(future.getFullYear());

// const future = new Date(2023, 11, 31, 22, 25);
// console.log(Number(future));
// console.log(+future);
// const calcDays = (d1, d2) =>
//   Math.abs((d2 - d1) / (1000 * 60 * 60 * 24)).toFixed();
// const coolday = calcDays(
//   new Date(2024, 0, 1, 10, 25, 10),
//   new Date(2024, 0, 2)
// );
// console.log(coolday);

// const num = 212313131.211;
// const optionsNum = {
//   style: 'currency',
//   currency: 'EUR',
// };
// console.log('us,', Intl.NumberFormat('en-US', optionsNum).format(num));
// console.log('cn', Intl.NumberFormat('zh-CN', optionsNum).format(num));
// console.log('en', Intl.NumberFormat('en-GB', optionsNum).format(num));
const arrB = ['man', 'talk'];
const fkingThing = setTimeout(
  (ing1, ing2) => {
    console.log(`fking room with ${ing1} and fking ${ing2}`);
  },
  3000,
  ...arrB //使用拓展符就不用arrB[0]一个个这样输入了
); //依然自动执行
console.log("what' happen"); //会先执行这个
if (arrB.includes('man')) clearTimeout(fkingThing); //只有这样才能清除计时器

//连续计时器
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);
