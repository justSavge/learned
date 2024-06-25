const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();
//libuv
// process.env.UV_THREADPOOL_SIZE = 5;
//windows使用有些问题，先不管
setTimeout(() => {
  console.log("我是计时器，我干了");
}, 0);
setImmediate(() => {
  console.log("立即哥也干了");
});
fs.readFile("test-file.txt", () => {
  console.log("i/o 也干了");
  console.log("--------------");
  setTimeout(() => {
    console.log("我是callback`s计时器，我干了");
  }, 0);
  setTimeout(() => {
    console.log("我是callback`s计时器2，我干了");
  }, 300);
  setImmediate(() => {
    console.log("callbac`s立即也干了");
  });
  process.nextTick(() => {
    console.log("process.nextTick启动0.0");
  }); //事实上这个事件在上一个事件（i/o）执行完了以后就会执行这个方法，而立即函数则是会在这个事件的第一个执行，所以这个nextTick(下个循环),会在立刻执行前执行，（它属于i/o 也干了--------------），这里的最后一个。

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512"); //是一个比较耗时的加密函数，用在这里仅仅是因为耗时长
  console.log(Date.now() - start, "密码加密成功");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "密码加密成功");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "密码加密成功");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "密码加密成功");

  //可以看到这四个都是几乎同时完成的，因为线程池提供的线程数默认是4个
  //当我修改线程数的时候，。。。
});
console.log("牢顶也干了");
//据说是进行事件循环之前有一个等待阶段，等待事件发出，这个时间会得到过期的计时器发出的事件，如果这个时候有立即事件(setTmmediate),乃至于会过期的计时器之前执行。
console.log(Date.now() - start, "密码加密成功");
