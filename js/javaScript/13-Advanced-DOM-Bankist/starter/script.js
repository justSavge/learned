'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btScrollTo = document.querySelector('.btn--scroll-to'); //learn more
const section1 = document.querySelector('#section--1'); //to the place
const section2 = document.querySelector('#section--2'); //to the place
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const secAll = document.querySelectorAll('.section');
const dotContainer = document.querySelector('.dots');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
/////
const nav = document.querySelector('.nav');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(oneOfBt => oneOfBt.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btScrollTo.addEventListener('click', function (e) {
  const slcoords = section1.getBoundingClientRect(); //点击一下就会出现section1的矩形值,当滚动时，视口变化，数值变化
  console.log(slcoords);
  console.log(e.target.getBoundingClientRect());
  console.log('滚动', window.pageXOffset, pageYOffset); //输出滚动距离
  console.log(
    document.documentElement.clientHeight,
    document.documentElement.clientWidth //这些不包含滚动条的
  ); //获取浏览器视角大小
  // window.scrollTo(
  //   slcoords.left + window.scrollX,
  //   slcoords.top + window.scrollY//相当于把要移动的元素下拉了已经滚动的距离
  // ); //滚动到x,y,（slcoords.left=0），请注意，这是基于视口的，视口有该元素就会不起作用（就是已经是其效果了）
  // window.scrollTo({
  //   left: slcoords.left + window.scrollX,
  //   top: slcoords.top + window.scrollY,
  //   behavior: 'smooth', //可以更丝滑
  // });
  //还有一个很帅的
  section1.scrollIntoView({ behavior: 'smooth' }); //缺陷就是只支持现代浏览器
  console.log('end:', slcoords.left, slcoords.top); //看
});
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); //可以阻止跳转到含有这个标签的页面
//     // console.log('ok');
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
/////
/////
/////一个很重要的技术，事件委托
//由于再正常浏览器执行forEach遍历时可能发生大量资源消耗，尤其是可能有几十上百上千个按钮绑定时尤为如此，那么如何解决呢
//有一个办法，事件委托，不需要对每个按钮（或者说需要点击事件发生的地方）绑定，而是对其父元素绑定，可以减少大量元素绑定，
//再捕获准确冒泡以后，通过event.target来确定点击事件发生的位置并对该位置执行回调函数
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //确认事件发生在自己想要的位置，而不是类似于环绕在边缘的元素
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); //执行想发生的事
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const trueClick = e.target.closest('.operations__tab');
  // console.log(trueClick);
  if (!trueClick) return; //保护条例，更现代，结构更好
  tabs.forEach(v => v.classList.remove('operations__content--active'));
  trueClick.classList.add('operations__content--active');
  tabsContent.forEach(v => v.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${trueClick.dataset.tab}`)
    .classList.add('operations__content--active');
});
//mouseover,like hover in css
const mousemoveLink = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const clicklink = e.target;
    const allLink = clicklink.closest('.nav').querySelectorAll('.nav__link');
    const logo = clicklink.closest('.nav').querySelector('img');
    allLink.forEach(el => {
      if (el !== clicklink) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};
// nav.addEventListener('mouseover', e => {
//   mousemoveLink(e, 0.5);
// }); //好像暂时只能这样
//wait..
nav.addEventListener('mouseover', mousemoveLink.bind(0.5)); //对其绑定0.5，还记得吗，bind返回一个新的函数，this = 0.5
nav.addEventListener('mouseout', mousemoveLink.bind(1)); //这样看起来更好看
//用个耗能大的
// const leave = section1.getBoundingClientRect().top;
// window.addEventListener('scroll', function () {
//   if (window.scrollY > leave) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
//玩玩api,更高效的玩意
//大概就是当窗口触及所选元素(observer.observe(section1);)时，就会执行回调函数，threshold: 0.1,是触及的多少，当触发了这个值，无论是进入由上而下进入元素还是继续往下离开元素，当窗口与元素的距离触发了就会执行，entires是一个数组,是api传递给回调函数的参数，。。
const obBack = function (entires) {
  const [entire] = entires;
  if (entire.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');
};
const navHeight = nav.getBoundingClientRect().height;
const obsOptions = {
  root: null, //设为整个视口，多的我也不了解
  threshold: 0, //也就是说当元素的height*threshold>height(窗口)就无意义了，因为除了进入网页的时候，永远不会执行回调函数
  rootMargin: `-${navHeight}px`, //
};
const observer = new IntersectionObserver(obBack, obsOptions);
observer.observe(header);
//有逼格的网页，有品质的网页，脱离了低级的网页
const obSecBack = function (entires, observer) {
  const entire = entires[0];
  // console.log(entire);
  if (!entire.isIntersecting) return;
  entire.target.classList.remove('section--hidden');
  observer.unobserve(entire.target); //节省资源，当这个东西执行了就会停止观测,牛的jsMaster
};
const obsSec = new IntersectionObserver(obSecBack, {
  root: null,
  threshold: 0.15,
});
secAll.forEach(sec => {
  obsSec.observe(sec);
  sec.classList.add('section--hidden');
});

//lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]'); //这样就可以选中所有含有data-src这个属性的img了，叹为观止，也许我的三角猫css和html也需要花时间去学，这是不可避免的，仅凭学校教授的代码一定（99%的可能）是不够的。。。
// console.log(imgTargets);
const imgCall = function (entires, observe) {
  const entire = entires[0];
  if (!entire.isIntersecting) return;
  entire.target.src = entire.target.dataset.src;
  entire.target.addEventListener('load', function (e) {
    entire.target.classList.remove('lazy-img'); //为什么不直接去除呢，还要监听这个时间在载入去除该类名呢，主要是有些哥们网络不好卡卡的，直接除去lazy-img就会得到一个很糊的图片，需要时间下载之后才能慢慢清晰，这是一个问题，所以要在监听到加载后才去除，其实我也a little bit coufuse
  });
  observer.unobserve(entire.target);
};
const imgObs = new IntersectionObserver(imgCall, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObs.observe(img));

// slider.style.overflow = 'visible';
const sliderFun = function () {
  let curSlide = 0;
  const maxSlidesLength = slides.length;

  // console.log(curSlide);
  const creatDots = function () {
    slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };
  const curBtnSmall = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(d => d.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };
  const gotoSlide = function (num) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - num) * 100}%)`;
    });
    curBtnSmall(curSlide);
  };
  const slideBtnR = function () {
    if (curSlide === maxSlidesLength - 1) curSlide = 0;
    else curSlide++;
    gotoSlide(curSlide);
    curBtnSmall(curSlide);
  };
  const slideBtnL = function () {
    if (curSlide === 0) curSlide = maxSlidesLength - 1;
    else curSlide--;
    gotoSlide(curSlide);
    curBtnSmall(curSlide);
  };
  const init = function () {
    creatDots();
    curBtnSmall(curSlide);
    gotoSlide(curSlide);
  };
  init();
  btnRight.addEventListener('click', slideBtnR);
  btnLeft.addEventListener('click', slideBtnL);
  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowRight') slideBtnR();
    else if (e.key === 'ArrowLeft') slideBtnL();
  });
  dotContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;
    curSlide = e.target.dataset.slide;
    gotoSlide(curSlide);
  });
};
sliderFun();
/////////////////////////////////////////////
//
//学术时间。。。
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// const header = document.querySelector('.header');
// const allSe = document.querySelectorAll('.section'); //这里获取的是NodeList,不会立刻更新
// console.log(allSe);
// const allBt = document.getElementsByTagName('button'); //这里返回的是HTMLCollection,会在html内容发生改变之后立刻更新
// console.log(allBt);
// //其他的也一样
// // 如document.getElementsByClassName
// const message = document.createElement('div'); //
// message.classList.add('cookie-message');
// // message.textContent
// //another
// message.innerHTML =
//   "为了你的体验，请允许我们使用你的cookie<button class='btn btn--cookie-message'>ok❤️</button>";
// // header.prepend(message); //第一个
// header.append(message); //最后一个，使用后第一个没了，对于DOM对象来说，只能一个人只能在一个地方存在，除非拷贝克隆
// // header.prepend(message.cloneNode(true)); //克隆节点方法存入的参数为true，表明子节点也要复制
// //还有两个插入方法before,after
// // header.before(message);//这个插入在header前面，作为兄弟节点
// // header.after(message); //同理。这个插入在后面
// //
// //删除元素
// message.addEventListener('click', () => {
//   message.remove();
//   // message.parentElement.removeChild(message);//这是以前的方法，不要稀奇
// });

/*
  class time ?_?*``

*/
// message.style.backgroundColor = '#27282d';
// message.style.width = '120%';
// console.log(message.style.backgroundColor);
// console.log(message.style.width);
// console.log(message.style.color); //在样式表中，控制台不会输出
// //
// console.log(getComputedStyle(message).color); //这样才会输出getComputedStyle(message)获取到了所有的样式
// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 50 + 'px';
// console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary', 'orangered'); //改变了css的value
// console.log(document.querySelector('.nav__logo').alt);
// console.log(document.querySelector('.nav__logo').src); //alt,src,href也是元素img的内置属性，自己加的不算
// console.log(document.querySelector('.nav__logo').designer); //自己加的不算
// console.log(document.querySelector('.nav__logo').className); //出于历史原因，className才是class
// console.log(document.querySelector('.nav__logo').getAttribute('designer')); //这样才能获取到自己加的属性
// //甚至可以直接加
// document.querySelector('.nav__logo').alt = 'a true man,never died man'; //可以看到元素中出现了修改后的alt
// //除了getAttribute还有setAttribute可以增加属性
// document.querySelector('.nav__logo').setAttribute('boss', 'lujun');
// //可以看到元素中出现了boss
// const logo = document.querySelector('.nav__logo');
// //区分一下直接获取和使用getAttribute获取元素值
// console.log(logo.src); //这是绝对路径
// console.log(logo.getAttribute('src')); //这是相对路径

// console.log(logo.dataset.versionNumber); //有个data-可以直接设立，这些都存放在dataset里,但要记住转换因为js使用驼峰命名法，而html的元素使用-连接

//你要知道的四个classList方法
// logo.classList.add('','','')//可以放多个类
// logo.classList.remove()
// logo.classList.toggle()//切换
// logo.classList.contains()
//还有一个最好不要使用的
// logo.className='lijun'//这个会把所有的类都覆盖，只剩下lijun
// const h1 = document.querySelector('h1');
// //mouseenter,类似于css的hover
// // h1.addEventListener('mouseenter', function () {
// //   alert('我是谁谁是我我是我谁是谁是。。。');
// // });
// //还有一个老古董绑定监听时间的就是h1.onmouseenter,一般不用，第二个事件一般会覆盖掉第一个事件，但addEventListener不会
// const alertH1 = function () {
//   alert('我是谁谁是我我是我谁是谁是。。。');
//   h1.removeEventListener('mouseenter', alertH1); //可以移除事件
// };
// h1.addEventListener('mouseenter', alertH1);
// //也可以放外面
// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 3000);
// //捕获与冒泡是相当重要的，在事件当中
// //当你点击鼠标，就会触发捕获知道你点击的那个元素，得到元素以后，就会逐层冒泡，执行每个绑定的事件
// const randomint = function (max) {
//   return Math.trunc(Math.random() * 256);
// };
// const randomColor = () => `rgb(${randomint()},${randomint()},${randomint()})`;
// //1
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor(); //this就指向这个被绑定监听事件的对象
//   console.log('link', e.target, e.currentTarget); //都是点击了a标签，nav__link这个
//   //
//   //
//   // 阻止事件传递
//   // e.stopPropagation(); //不在传播以后就是阻止了事件冒泡，不会再执行之后的事件
// });
// //2
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('link', e.target, e.currentTarget); //都是点击了a标签，nav__link这个
//   this.style.backgroundColor = randomColor();
// });
// //3
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     console.log('link', e.target, e.currentTarget); //都是点击了a标签，nav__link这个，捕获了nav__link的点击事件（event）源于这个事件
//     this.style.backgroundColor = randomColor();
//     console.log(this === e.currentTarget); //true,e.currentTarget是事件执行的地方。也就是绑定监听事件的地方
//   }
//   // true
// );
// //addEventListener只监听冒泡，不监听捕获，不过也有办法监听捕获事件，虽然没啥用。。，那就是给addEventListener加上第三个参数true,可以看上面几行，可以看到nav成了第一个执行事件的元素，从DOM由上而下来说
//////
// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); //所有子节点
// console.log(h1.children); //这是实时的只有真正的作用的，大概
// //第一个孩子和最后一个孩子
// h1.firstElementChild.style.color = 'white'; //第一个白了
// h1.lastElementChild.style.color = 'white'; //最后一个白了
// //往上走
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// //最接近于h1的header，和querySelector对比，closest找到最近的父级，无论有多远
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; //可以使用自定义的值，不太懂
// //左右走，获得相邻的兄弟元素
// console.log(h1.previousElementSibling); //上一个兄弟元素，这里没有，所以为空(null)
// console.log(h1.nextElementSibling); //下一个兄弟元素
// console.log(h1.previousSibling); //其他方式，较为含糊
// console.log(h1.nextSibling);
// //获得所有兄弟元素
// console.log(h1.parentElement.children);
// //来点有意思的,还有要再说一次nodelist不是数组，要如此转换
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.7)';
// });
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log(
//     `you will see something happen before loading img,so on,ofc,it's DOC tree,html,parsed`,
//     e
//   );
// }); //把js放在body尾部就不用去监听（如上）DOM树是否载入了，它会在最后载入
// window.addEventListener('load', function (e) {
//   console.log('页面都载入了，如图片，css之类的外部资源', e);
// });
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();

//   console.log('页面离开事件', e);
//   e.returnValue = '';
// });//不要乱用，这玩意很强！
//以下是一些隐秘的东西！！！
//当js载入放在首部
//浏览器会先执行html然后到js时就会等待,获取script，执行script（等待的时候不会执行html,毫无疑问，这会降低浏览器的执行效率），然后执行完剩下的html
//放在尾部择会在最后执行
//async，注意这些都放在头部，放在body里没意义。优势：会在获取script时继续解析html,然后获取完了以后等待script执行，执行完了以后执行接下来的html，
//执行的时候不按顺序来（？）
//defer,注意这些都放在头部，放在body里没意义。和上面类似，区别时会将script放在html解析完了以后执行，不会破坏HTML的解析
//执行的时候按顺序来，放头部选这哥们就没错！
//！！！defer,async只在现代浏览器可行，在古早的浏览器只会被忽略
//放在尾部才是支持所有浏览器的方法，html5才支持放在首部
