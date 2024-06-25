const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("未捕获的异常，uncaughtException,即将关闭...");
  console.log(err);
  process.exit(1);
});
dotenv.config({ path: "./config.env" });

const app = require("./app");

console.log(process.env.NODE_ENV);
const dataBase = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(dataBase, {
    //我自己更换了，课程太老了
    useNewUrlParser: true,
    useUnifiedTopology: true, // 添加这个选项来替换 deprecated 的 useCreateIndex 和 useFindAndModify
    useCreateIndex: true, // 移除这个选项
    // useFindAndModify: false, // 如果你不需要 findAndModify 方法，可以移除这个选项，否则保留它
  })
  .then(() => {
    // console.log(co.connections);
    console.log("数据库连接成功");
  });
const server = app.listen(3000, () => {
  console.log("work");
});
process.on("unhandledRejection", (err) => {
  console.log("拒绝访问，unhandledRejection,即将关闭...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
