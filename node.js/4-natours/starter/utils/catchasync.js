/* eslint-disable arrow-body-style */
//省去try catch模块，对异步函数处理，捕获错误，传递给next，传向错误处理模块
module.exports = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch(next);
  };
};
