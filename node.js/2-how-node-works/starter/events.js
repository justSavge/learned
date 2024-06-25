const EventEmitter = require("events");
const http = require("http");
class Sales extends EventEmitter {
  constructor() {
    super(); //因该是继承上一个类的东西
  }
}
const myEmitter = new EventEmitter();
//myEmitter.on的 on是一个观察者，观察到了emit发出了newSales后就会执行回调函数
myEmitter.on("newSales", () => {
  console.log("客户来了");
});
myEmitter.on("newSales", () => {
  console.log("name:lj");
});
myEmitter.on("newSales", (stock) => {
  console.log(stock); //允许传递一个参数，如下传递了一个数字
});
myEmitter.emit("newSales", 125);
//////////////////////////

const server = http.createServer();
server.on("request", (req, res) => {
  console.log("收到请求");
  res.end("request received");
}); //如果看到了on就意味着这个服务收到监视
server.on("request", (req, res) => {
  console.log("some another request received");
});
server.on("close", (req, res) => {
  console.log("服务关闭。。。");
});
server.listen(8000, "127.0.0.1", () => {
  console.log("等待响应request");
}); //启动
//ps:可以看到每个响应都执行了2次，是因为发出来2次请求，第一次是请求网址，第二是请求图标
