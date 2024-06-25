const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const handleGlobalError = require('./controllers/errorController');

const app = express();
//////中间件
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use((req, res, next) => {
  req.request = new Date().toString();
  next();
});
app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`没有这个${req.originalUrl}网址。。。`, 404));
});
app.use(handleGlobalError);
module.exports = app;
// //////中间件
// app.use(express.static(`${__dirname}/public`)); //提供了静态提供文件的功能，按照文件路径提供服务,这是根目录了
// //相当于在request和response的中间，处理数据，没了这玩意，得到的也只是undefine
// app.use(express.json()); //没有了这个res发送的就不是json了。

// app.use('/api/tours', tourRouter); //尝试解释一下这里，当我们的网址进入（127.0.0.1我自己的）之后会自动匹配这个路径
// app.use(morgan('dev'));
// app.use((req, res, next) => {
//   console.log('中间件来了💩💩💩');
//   next(); //永远不要忘记在这里加入一个next，这十分重要，如果不加入这个，就会在request/response周期当中起到类似于同步函数一样的后果，卡住，不会执行接下来的东西。
// }); //当你把这个东西放在最下面的时候是不会执行的，因为这是请求/回复的中间件，在请求回复操作执行时启动的东西。
// app.use((req, res, next) => {
//   req.requestTime = new Date().toLocaleString();
//   next();
// });
// app.get('/', (req, res) => {
//   //只有使用get时才会发出一下消息，如使用post等其他则与这里无关。
//   res.status(200).json({
//     msg: 'yo,this is your father,suck my dick,idiotic',
//     love: 'big ass',
//   });
// });
// app.post('/', (req, res) => {
//   res.send('what can i say?get out.');
// });
// app.listen(port, () => {
//   console.log(`app已经启动，端口${port}启动`);
// });
///
////////😋😋😋😋😋😋😋
//接下来是一些高端操作
//构建api（application programe interface）
//在这里我们通常使用  REST 这个构架（目前最流行的，主流）。
////let`s start!
///1.分解成逻辑资源。
///2.暴露结构化的，基于资源的url（网址）.如（www.baidu.com/tieba）斜线后面接的是tieba,需要歌曲就是/music,要小说就是/book,
///2.暴露结构化的，基于资源的url（网址）.如（www.baidu.com/tieba）斜线后面接的是tieba,需要歌曲就是/music,要小说就是/book,但要注意。不要使用/addmusic
////removemusic,等这种东西来操作数据，这会与我们在第三条冲突，我们应该在端点只提供资源，不要去操作数据，而且，这会成为维护的噩梦
///3.api使用http方法(来增删改查)而不是url。上一行已经提及了一部分，我们应该使用http的方法来对资源进行操作，如get()是仅获取资源，又如post()是传递数据，等等。
///4.输入输出使用json数据格式，在这里可以说从用户来的数据，往用户去的数据一般都是json
///5.stateless?(无状态？)，state可以认为是一段数据，stateless就是不在服务端对数据记忆？按高手所说，服务器无需记住上一个请求以便处理。如：/nextPage,应该是下一页，但是服务端需要记住清楚当前页面是说明，然后发送下一页面，这是我们竭力避免的，在这里我们可以简单的将url的端点/nextPage设置为当前页面的页码，如/page/7,这样服务器就会发送page/8了。

// app.get('/api/tours/:id', getTour);
// app.post('/api/tours', createTour);
// //patch,事实上不会这么搞（不知道up说的啥，现实生活不会再这种文件中加入patch?）,仅做参考学习
// //译为：补丁
// app.patch('/api/tours/:id', updateTour);
// //最后一个delete
// app.delete('/api/tours/:id', deleteTour);
// app.route('/api/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

//敲黑板，重点🔴🔴🔴🔴🔴🔴🔴💘💘💘💘💘❤️❤️❤️❤️来了
//中间件
//什么是中间件
//。不好回答，但是再这里的一切都是？中间件，包括route.
//再请求雨响应的过程中显然有大量的中间件，而中间件的执行顺序则是取决于代码再程序中的先后，如上面的express.json就是在最早执行的。
/////over
///
//
//  // res.statusCode(404).json({
//   status: '失败',
//   message: `没有战败cg，快滚罢`,
// });
// const err = new Error(`没有这个${req.originalUrl}网址。。。`);
// err.statusCode = 404;
// err.status = '错啦！';
// next(err); //检测到err的类型为错误后就会直接跳过其他中间件执行错误处理中间件
