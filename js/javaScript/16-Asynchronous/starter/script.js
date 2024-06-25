'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const getCountiresData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText); //[{name:'jonas'}]
//     const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}百万人</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>`;
//     countriesContainer.insertAdjacentElement('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountiresData('portugal');
// getCountiresData('usa');
////////////////////////////
// const addDataHtml = function () {
//   const [data] = JSON.parse(this.responseText); //[{name:'jonas'}]
//   const html = `
//       <article class="country">
//         <img class="country__img" src="${data.flag}" />
//         <div class="country__data">
//           <h3 class="country__name">${data.name}</h3>
//           <h4 class="country__region">${data.region}</h4>
//           <p class="country__row"><span>👫</span>${(
//             +data.population / 1000000
//           ).toFixed(1)}百万人</p>
//           <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//           <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//         </div>
//       </article>`;
//   countriesContainer.insertAdjacentElement('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };
// const getCountiresAndBorderData = function (country) {
//   const request = new XMLHttpRequest();
//   const request2 = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`); //ajax first time call,1
//   request.send();
//   const [data] = JSON.parse(request.responseText);
//   if (!data.borders) return;
//   const borCountry = data.borders;
//   request2.open('GET', `https://restcountries.eu/rest/v2/name/${borCountry}`);
//   request2.send();
//   request2.addEventListener('load', function () {
//     addDataHtml();
//   }); //2
// };
/////////////////////这部分会很难，因为我使用不了国外的api，只能使用自己的尝试，好了，学了有好几天了，思考以下什么是异步
//不妨说一下什么是同步，同步就是代码立刻执行，按照顺序，由上而下执行
//异步是什么，以settimeout为例子，可以脱离上面所说的同步，脱离与顺序之外，setTimeout(call back funtion,time),或者说执行回调函数就是一种异步操作，因为执行回调函数往往需要先决条件，而回调当中回调越多可以说是回调地狱了，这时候的代码极其难以阅读，大多数是屎山代码，恶习至极，还好es6以后可以使用承诺，占一个位置,潜在，悬而未决的存在，fetch.
//////////////////my

// const showAnima = function () {
//   const getAni = new XMLHttpRequest();
//   getAni.open('GET', 'https://dog.ceo/api/breeds/image/random');
//   getAni.send();
//   getAni.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText);
//     console.log(data);
//     const html = `<article class="country">
//         <img class="country__img" src="${data.message}" />
//         <div class="country__data">
//           <h3 class="country__name">${data.status}</h3>
//           <h4 class="country__region">${data.status}</h4>
//           <p class="country__row"><span>👫</span>${(1000000).toFixed(
//             1
//           )}百万人</p>
//           <p class="country__row"><span>🗣️</span>${data.status}</p>
//           <p class="country__row"><span>💰</span>${data.statuss}</p>
//         </div>
//       </article>`;
//     console.dir(html);
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// showAnima();
// showAnima();
// showAnima();
// showAnima();
///////////////222222my
// const showNobel = function () {
//   const getN = new XMLHttpRequest();
//   getN.open('GET', 'https://api.nobelprize.org/2.1/nobelPrizes');
//   getN.send();
//   getN.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText);
//     console.log(this);
//     /*const html = `<article class="country">
//         <img class="country__img" src="${data.message}" />
//         <div class="country__data">
//           <h3 class="country__name">${data.status}</h3>
//           <h4 class="country__region">${data.status}</h4>
//           <p class="country__row"><span>👫</span>${(1000000).toFixed(
//             1
//           )}百万人</p>
//           <p class="country__row"><span>🗣️</span>${data.status}</p>
//           <p class="country__row"><span>💰</span>${data.statuss}</p>
//         </div>
//       </article>`;
//     console.dir(html);
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;*/
//   });
// };
// };
// setTimeout(function () {
//   console.log('1...have gone');
//   setTimeout(function () {
//     console.log('2...have gone');
//     setTimeout(function () {
//       console.log('3...have gone');
//     }, 1000);
//   }, 1000);
// }, 1000);
//
///////////////////////////////使用fetch逃离回调地狱，基于es6(2015)

// const requestCuteDog = fetch('https://api.nobelprize.org/2.1/laureates');

// console.log(requestCuteDog);
// const getDog = function () {
//   //fetch('https://dog.ceo/api/breeds/image/random')相当于一promise,只不过是悬而未决的，没有结果的，使用了then，在得到结果以后就会执行，我会用response来作为形参，更好理解，毕竟课很重要，不能用api很伤，自己多专研
//   fetch('https://dog.ceo/api/breeds/image/random') //返回一个promise
//     .then(function (response) {
//       console.log(response);
//       return response.json(); //response.json()也是一个异步函数，然后返回promise(一个被json处理好的promise),要接着下一个then使用才能看到数据，有点逆天，但是这就是工作原理，coufused
//     })
//     .then(function (data) {
//       const html = `<article class="country">
//               <img class="country__img" src="${data.message}" />
//               <div class="country__data">
//                 <h3 class="country__name">${data.status}</h3>
//                 <h4 class="country__region">${data.status}</h4>
//                 <p class="country__row"><span>👫</span>${(1000000).toFixed(
//                   1
//                 )}百万人</p>
//                 <p class="country__row"><span>🗣️</span>${data.status}</p>
//                 <p class="country__row"><span>💰</span>${data.status}</p>
//               </div>
//             </article>`;
//       console.dir(html);
//       countriesContainer.insertAdjacentHTML('beforeend', html);
//       countriesContainer.style.opacity = 1;
//     });
// };
// const getDog = function () {
//   fetch('https://dog.ceo/api/breeds/image/random').then(request => {
//     const data = request.json(); //这就不行
//     const html = `<article class="country">
//               <img class="country__img" src="${data.message}" />
//               <div class="country__data">
//                 <h3 class="country__name">${data.status}</h3>
//                 <h4 class="country__region">${data.status}</h4>
//                 <p class="country__row"><span>👫</span>${(1000000).toFixed(
//                   1
//                 )}百万人</p>
//                 <p class="country__row"><span>🗣️</span>${data.status}</p>
//                 <p class="country__row"><span>💰</span>${data.status}</p>
//               </div>
//             </article>`;
//     console.dir(html);
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getDog();
// fetch('https://dog.ceo/api/breeds/image/random')
//   .then(function () {})
//   .then(v => alert(v)); //then(包括fetch)会返回一个值promise无论你是否使用return,但是不返回就是给一个undefined
// const insertError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };
// const getJson = function (url, errorMsg = '有些事早已忘记。。') {
//   return fetch(url).then(response => {
//     console.log(response);
//     if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
//     response.json();
//   });
// };
// const learnAjax = function () {
//   // fetch('https://dog.ceo/api/breeds/image/random')
//   //   .then(
//   // response =>

//   //  {
//   // console.log(response);
//   // if (!response.ok) throw new Error(`狗狗失联了，害 ${response.status}`); //无论如何，执行力throw ，就会立刻执行捕获错误，new Error返回一个新的错误提示
//   // return response.json();
//   // }
//   // ,
//   // function (err) {
//   //   alert( err); //捕捉错误,chain,链会在这里断掉,不会执行下面的,看起来很好,但是我们的then很多时岂不是每一个都要捕获,好在还有一个牛的,catch,追加在后面,捕获全部错误
//   // }
//   // )

//   // .then(v => {
//   //   /////**** funtion.....*/
//   //   return fetch('https://dog.ceo/api/breeds/image/random'); //不要在这里使用then,要return,不然又是一团乱麻,
//   // })
//   // .then(response => {
//   //   response.json();
//   // })
//   // .then(v => {
//   //   /**** funtion.....*/
//   //   getDog();
//   // })
//   getJson('https://dog.ceo/api/breeds/image/random')
//     .catch(err => {
//       console.error(`😒😒${err}`);
//       insertError(`'error,sorry ..'${err}`);
//     })
//     .finally(() => {
//       console.log('i alway here');
//     });
// };
// learnAjax();
// //总结,then在被接受时作用,catch在拒绝是调用,finally无论接受或拒绝都会调用
// btn.addEventListener('click', learnAjax);
////////////////小挑战，，，，，，，
///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
// const html = function (data) {
//   return `<article class="country">
//           <img class="country__img" src=''alt='6' />
//           <div class="country__data">
//             <h3 class="country__name">${data.country}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>百万人</p>
//             <p class="country__row"><span>🗣️</span>${data.city}</p>
//             <p class="country__row"><span>💰</span>${data.timezone}</p>
//           </div>
//         </article>`;
// };
// const whereAmI = function (jin, wei) {
//   fetch(`https://geocode.xyz/${jin},${wei}?geoit=json`)
//     .then(respone => {
//       if (String(respone.city) === 'Throttled! See geocode.xyz/pricing')
//         throw new Error(`你点击的太快了,${respone.status}`);
//       else if (!respone.ok) throw `可能有些问题，${respone.status}`;
//       console.log(respone);
//       return respone.json();
//     })
//     .then(data => {
//       if (data.city === 'Throttled! See geocode.xyz/pricing')
//         throw new Error(`你点击的太快了,${data.status}`);
//       console.log(data);
//       const cHtml = html(data);
//       countriesContainer.insertAdjacentHTML('beforeend', cHtml);

//       //     countriesContainer.style.opacity = 1;
//       console.log(`你现在所在${data.country}的${data.city}`);
//     })
//     .catch(err => {
//       console.error(`${err.message},爆爆爆`);
//     })
//     .finally((countriesContainer.style.opacity = 1));
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///高端技术--JS高手的总结
//浏览器由三部分组成（就现在所知）
//1.栈，栈由heap（内存堆）,call stack（调用栈）组成，内存堆存放函数，对象等，不是作用在全局的变量，这是我早已知道的，无需多言，调用栈则将全局变量‘吊顶’，执行任务，注意js是单线程的，每次执行都将要执行的函数吊顶，那么执行的函数怎么来的，举个例子，监听事件是由web api执行的，触发以后函数是作为异步来执行的，多的下面说。
// web api,总所周知的DOM,Eevent,fetch，timer等都在这里，这些帮助js实现更强大的功能，如图片的载入其实也是异步的，由DOM执行的，监听事件等监听到事件触发就会执行回调函数吗，不会立刻执行，因为js一次只能执行一个，所有存在一个call queue,调用队列，存放着将要执行的函数，如同记事本上顺序执行下去，(所以setTimeOut未必会在规定时间刚好执行，例如设置了一个5000ms的时间，当时间一到就进入call queue排队，当它是第一个，前面没人的时候就是第一个执行，但是它前面有人是也要老实排队，等到它的时候就不知道是多久以后了，因此只能保证不会再5000ms前执行。)
//call queue,其实是不完善的，还有一个marco-task queue(微程序队列，只是因为源于微程序，与别的无关，我亦不知，大抵是还有同名的术语罢)，相当于高优先级队列，会先执行它的事，如fetch执行完了以后得到的promise就会到这里，但大多数都是老实的到call queue当中排队，到了以后就传给栈堆的call stack执行，大抵如是。。。
////////////////////////////
////////////////////////////
////////////////////////////
/////例子
// console.log('开测'); //1,top
// setTimeout(() => {
//   console.log('0 s gone');
// }, 0); //5 just queue
// Promise.resolve('pormise just here').then(res => console.log(res)); //3 high queue
// Promise.resolve('pormise2 just here').then(res => {
//   for (let i = 0; i < 1000; i++) console.log(res);
// }); //4 high queue
// console.log('测试结束'); //2 top
//////////////////////////////////
//promise

//promise说到底也只是一个特殊对象罢了,executor
// const eRoll = new Promise(function (resolve, reject) {
//   console.log("let's roll!!");
//   setTimeout(function () {
//     if (Math.random() > 0.5) {
//       resolve('我靠，金色传说');
//     } else {
//       reject(new Error('答辩💩'));
//     }
//   }, 2000);
// });
// //这是一个十分神奇的东西，封装与异步都在这里，且思考罢
// eRoll.then(r => console.log(r)).catch(e => console.error(e));

// const wait = function (second) {
//   return new Promise(function (resolve) {
//     //不用reject,因为计时器几乎不会失败
//     setTimeout(resolve, second * 1000); //promise
//   }); //
// };
// // console.log(wait(1));//reslove,返回一个promise,resolve
// // console.log(wait(1)); //reject,返回一个promise promisstate:'rejext'
// wait(1)
//   .then(() => {
//     console.log('1s gone');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2s gone');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3s gone');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('4s gone');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('5s gone');
//   });
// // //不会有回调地狱，看起来一目了然，结构简单舒服
// Promise.resolve('ok').then(r => console.log(r)); //ok
// // Promise.reject('bad').then(r => console.log(r)); //没意义，不会执行，当返回的事reject的时候
// Promise.reject(new Error('bad')).catch(e => console.error(e)); //bad

// navigator.geolocation.getCurrentPosition(
//   //1.先执行，发现是web api,交给web api
//   position => {
//     //3.交给队列
//     console.log(position); //4.在调用栈调用
//   },
//   err => console.error(err)
// ); //1.reslove2.reject
// console.log('点将军，比比看谁更快'); //2.执
//将基于api的回调函数转换为基于api的promise额，函数？maybe...
// const getPosition = function () {
//   return new Promise(function (reslove, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => reslove(position),
//     //   err => reject(err)
//     // );
//     //简化
//     navigator.geolocation.getCurrentPosition(reslove, reject);
//   });
// };
// // getPosition()
// // .then(x => console.log(x))
// // .catch(e => console.error(e));
// const whereAmI = function () {
//   getPosition()
//     .then(r => {
//       const { latitude: jin, longitude: wei } = r.coords;
//       return fetch(`https://geocode.xyz/${jin},${wei}?geoit=json`);
//     })

//     // fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
//     .then(respone => {
//       if (String(respone.city) === 'Throttled! See geocode.xyz/pricing')
//         throw new Error(`你点击的太快了,${respone.status}`);
//       else if (!respone.ok) throw `可能有些问题，${respone.status}`;
//       console.log(respone);
//       return respone.json();
//     })
//     .then(data => {
//       if (data.city === 'Throttled! See geocode.xyz/pricing')
//         throw new Error(`你点击的太快了,${data.status}`);
//       console.log(`你现在所在${data.country}的${data.city}`);
//     })
//     .catch(err => {
//       console.error(`${err.message},爆爆爆`);
//     });
// };
// whereAmI();
///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
// const getPosition = function () {
//   return new Promise(function (reslove, reject) {
//     navigator.geolocation.getCurrentPosition(
//       position => reslove(position),
//       err => reject(err)
//     );
//   });
// };

// const divI = document.querySelector('.images');
// const createImage = function (imgPath) {
//   return new Promise(function (reslove, reject) {
//     const imgOf = document.createElement('img');
//     imgOf.src = imgPath;

//     imgOf.addEventListener('load', function () {
//       divI.append(imgOf);
//       reslove(imgOf);

//       // reslove(imgOf); //sucess,return 含有‘已完成’的promise,经过then以后传递 imgOf
//     });
//     imgOf.addEventListener('error', function () {
//       reject('大错特错'); //reject,return '大错特错'
//     });
//   });
// };
// const wait = function (second) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, second * 1000);
//   });
// };
// let curImg;
// createImage('img/img-1.jpg')
//   .then(r => {
//     curImg = r;
//     return wait(1);
//   })
//   .then(() => {
//     curImg.style.display = 'none';
//     return wait(1);
//   })
//   .then(function () {
//     return createImage('img/img-2.jpg'); //这里发生了一些怪事，我一直认为createImage('img/img-2.jpg')返回了return new Promise...,实际上没有，只有promise，相当于执行力promise,返回了只有使用then以后才会看到的reslove，而且没有retrun 接受，而是相当于 接受,是一个promise在那，要return才会在下一个then看到，，，
//   })
//   .then(r => {
//     curImg = r;
//     return wait(1);
//   })
//   .then(() => {
//     curImg.style.display = 'none';
//     return wait(1);
//   })
//   .then(() => {
//     createImage('img/img-3.jpg');
//   })
//   .catch(e => console.log(e));
//////////////
//es2017推出的。。。  \
// const getPosition = function () {
//   return new Promise((reslove, reject) => {
//     navigator.geolocation.getCurrentPosition(reslove, reject);
//   });
// };

// const whereAmI = async function () {
//   //old
//   // fetch(`https://geocode.xyz/${jin},${wei}?geoit=json`).then(res=>console.log(res));
//   //new
//   // const { latitude: jin, longitude: wei } = await getPosition().then(
//   //   r => r.coords
//   // );
//   const pos = await getPosition();
//   console.log(pos);
//   const { latitude: jin, longitude: wei } = pos.coords;
//   const res = await fetch(`https://geocode.xyz/${jin},${wei}?geoit=json`); //这里还是异步的，看起来像同步的赋值，其实还是异步
//   // console.log(res);
//   const data = await res.json(); //类似的
//   console.log(data);
// };
// whereAmI();
// console.log('111');
// try {
//   const x = 0;
//   x = 1;
// } catch (err) {
//   console.log(err);
// }
//fetch只会在没有网络的时候拒绝，当403,404的时候还是会返回reslove
// const whereAmI = async function () {
//   try {
//     const pos = await getPosition();
//     console.log(pos);
//     const { latitude: jin, longitude: wei } = pos.coords;
//     const res = await fetch(`https://geocode.xyz/${jin},${wei}?geoit=json`);
//     const data = await res.json();
//     return data; //返回的是promise
//     console.log(data);
//   } catch (e) {
//     console.log(e, '123');
//     throw e; //可以向下传播，不然当下面调用错了也只会返回undefine,给then执行而不是catch
//   }
// };
// console.log(1);

// whereAmI()
//   .then(r => console.log(r, 666))
//   .catch(e => console.log(e, 2222))
//   .finally(() => console.log('ok'));

// console.log(2);
// (async function () {
//   try {
//     const nb = await whereAmI();
//     console.log(nb, 11);
//   } catch (e) {
//     console.log(e);
//   }
//   console.log('结束了');
// })();

// const get3here = async function () {
//   try {
//     // const jin1 = await whereAmI();
//     // const jin2 = await whereAmI();
//     // const jin3 = await whereAmI();
//     const alljin = await Promise.all(
//       // await whereAmI(),
//       [whereAmI(), whereAmI()] //但是当一个请求拒绝，就会使得直接拒绝
//     ); //可以同时执行三次,节省了其他两次的时间
//     console.log(alljin);
//   } catch (e) {
//     console.error(e);
//   }
// };
// get3here();
// const getMyOnly = function (v) {
//   return fetch(v).then(x => {
//     return x.json();
//   });
// };
// // (async function () {
// //   const fker = await Promise.race([
// //     getMyOnly('https://geocode.xyz/27.1448,114.99457?geoit=json'),
// //     getMyOnly('https://geocode.xyz/28.54538,115.94422?geoit=json'),
// //   ]);
// //   console.log(fker);
// // })();
// const timeAway = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(() => {
//       reject(new Error('哥们网速太拉了，换个网来吧'));
//     }, sec * 1000);
//   });
// };
// //再现实生活的用途，如：防止有人网速太慢，链接时间过长，设置一个计时器，当竞赛当中，执行太慢，酒执行计时器的内容，如：报错
// Promise.race(
//   [getMyOnly('https://geocode.xyz/27.1448,114.99457?geoit=json')],
//   timeAway(3)
// )
//   .then(v => console.log(v))
//   .catch(err => console.log(err + 666));
// // Promise.allSettled(),和Promise.all很像，但是当all当中有一个存在问题，大家都玩完了，而Promise.allSettled()会返回所有，无论是否接受，拒绝
// Promise.allSettled([Promise.resolve('牛的'), Promise.reject('爬')]).then(v =>
//   console.log(v[0])
// );
// // Promise.all([Promise.resolve('牛的'), Promise.reject('爬')]).then(v =>
// // console.log(v[0])
// // );//error
// // Promise.any//es2021//忽略拒绝，只管接受
// Promise.any([Promise.resolve('牛的666'), Promise.reject('爬')]).then(v =>
//   console.log(v)
// );
// //no any way ,this is life,such is life,just so
const getPosition = function () {
  return new Promise(function (reslove, reject) {
    navigator.geolocation.getCurrentPosition(
      position => reslove(position),
      err => reject(err)
    );
  });
};
const imgArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];
const divI = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (reslove, reject) {
    const imgOf = document.createElement('img');
    imgOf.src = imgPath;
    imgOf.addEventListener('load', function () {
      divI.append(imgOf);
      reslove(imgOf);
    });
    imgOf.addEventListener('error', function () {
      reject('大错特错');
    });
  });
};
const wait = function (second) {
  return new Promise(function (resolve) {
    setTimeout(resolve, second * 1000);
  });
};
let curImg;
// createImage('img/img-1.jpg')
//   .then(r => {
//     curImg = r;
//     return wait(1);
//   })
//   .then(() => {
//     curImg.style.display = 'none';
//     return wait(1);
//   })
//   .then(function () {
//     return createImage('img/img-2.jpg');
//   })
//   .then(r => {
//     curImg = r;
//     return wait(1);
//   })
//   .then(() => {
//     curImg.style.display = 'none';
//     return wait(1);
//   })
//   .then(() => {
//     createImage('img/img-3.jpg');
//   })
//   .catch(e => console.log(e));
const pasue = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log(img);
    await wait(2); //会在调用栈执行两秒等待
    img.style.display = 'none';
    img = await createImage('img/img-2.jpg');
    console.log(img);
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-3.jpg');
    console.log(img);
  } catch (error) {
    console.log(error);
  }
};
// pasue();
const loadAll = async function () {
  //同时加载三个图片
  try {
    const imgs = imgArr.map(async function (v) {
      const beach = await createImage(v);
      console.log(beach);
      return beach;
    }); //async总是返回promise
    console.log(imgs);
    const imgEl = await Promise.all(imgs);
    console.log(imgEl);
    imgEl.forEach(v => v.classList.add('parallel'));
    // imgs.forEach(async v => console.log(await v));
  } catch (error) {
    console.log(error);
  }
};
loadAll();
//感悟了一下await,大抵是获得响应后的promise.then,得到一个正常的返回结果，不需要使用then来获得
// ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']
