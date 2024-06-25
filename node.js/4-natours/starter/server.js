const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('未捕获的异常，uncaughtException,即将关闭...');
  console.log(err);
  process.exit(1);
});
dotenv.config({ path: './config.env' });

const app = require('./app');

console.log(process.env.NODE_ENV);
const dataBase = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);
// console.log(dataBase);
//return promise
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
    console.log('数据库连接成功');
  });

const server = app.listen(3000, () => {
  console.log('work');
});
process.on('unhandledRejection', (err) => {
  //未处理的reject(promise的reject,resolve)

  console.log('拒绝访问，unhandledRejection,即将关闭...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(process.env); //可以看到，但是似乎不能修改，不知道是为什么，2024329,mac可以，win不行需要下一个包cross-env?（大概是）
// console.log(app.get(env));

//business logic业务逻辑,application logic程序逻辑
//mvc就不写了
//程序逻辑就是管理程序的请求，回复，只关心程序的交互
//业务逻辑就是业务需求的东西，如要给用户提供查询旅游景点等的逻辑
//以上有些简陋，我觉得就是程序逻辑是不管你干啥都要的东西，如一个网站一般都要请求数据，修改数据等操作，而业务逻辑则是对请求什么景点数据，修改某个人的数据等一些特殊需求的东西，。。
//一般任务需要将这二者分开，虽然二者紧紧相连
//现在有这么一种思想，瘦控制，胖模块的思想，控制做更少的程序逻辑，模块做更多的业务逻辑。。
