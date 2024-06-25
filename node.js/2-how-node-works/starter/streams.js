const { error } = require("console");
const fs = require("fs");
const http = require("http");
const server = http.createServer();
server.on("request", (req, res) => {
  //现在要获得test.txt里的内容
  //解决方案1😎
  // fs.readFile("test.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });
  //显然有点原始，需要加载整个文件，没人喜欢这样
  //解决方案2😎：streamer
  // const readable = fs.createReadStream("test.txt"); //传入一点写入一点
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end("all gone");
  // });
  // readable.on("error", () => {
  //   res.statusCode(500);
  //   res.end("not found");
  // });
  //解决方案3😎：streamer(pipe)
  //传出的速度
  const readable = fs.createReadStream("test.txt");
  readable.pipe(res);
});
server.listen(8000, "127.0.0.1", () => {
  console.log("it`s working");
}); //用listen启动server
////////////😍😍😍😍😍😍//////////🥰🥰🥰🥰🥰//////🐔🐔🐔🐔🐔
////接下来是喜闻乐见的理论环节
//是关于导入模块的。。require()如何导入模块
//1.解决并加载文件
//////细分：模块有1，核心模块such as（http），2，开发模块(./lib/xx) ，3，第三方模块('express')
////////顺序：先找核心模块存在./这种代表文件的东西会在开发模块寻找这个东西，如果找不到会打开其中的index.js.....so on
//2.包装
////(function (exports,require,module,__fliename,__dirname){})//将我们需要的模块包装成如此？可以方便的使用导入的函数模块，防止泄露（如我们定义了一个叫nb的包，又有同名的第三方模块，就会让系统混乱。。）
//3.执行，包装好的函数被node执行
//4.返回exports(模块导出)
////module.exports返回对象，，，
//5.模块被缓存，事实上在使用一个模块多次的时候代码只会执行一次，系统直接返回缓存好了的结果。
////that`s all...
