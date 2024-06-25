/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unsupported-features/es-syntax */
//错误处理函数（被使用为错误处理中间件），一但有错误出现就会执行以下操作。
const AppError = require('../utils/AppError');

const sendErrorDev = function (err, res) {
  //发送错误详情给开发者
  res.status(err.statusCode).json({
    status: err.status,
    orginError: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorPro = function (err, res) {
  //发送错误详情给用户（
  if (err.isOperational) {
    //我处理了的错误格式
    // console.log(err.message);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //我没处理的错误，可能是第三方包有问题（不是我的问题，或者说我能处理的问题，不兼容...诸此之类
    console.error('boom!super error💥:', err);
    //我们不想让用户知道太多错误的信息，而且这里错误与我自己写的无关，
    res.status(500).json({
      status: 'error',
      message: '大错特错',
    });
  }
};
//mongodbErrorHandle
//1.查询错误
const handleDatabaseError = function (err) {
  //处理数据库返回错误为我定义的类的形式，（包含isOperational...
  return new AppError(`无效的东西 ${err.path}:${err.value}`, 400);
};
//2.创建错误（创建失败
const handleCreatDBError = function (err) {
  return new AppError(`${err.message.match(/(["'])(\\?.)*?\1/)[0]}`, 403);
};
//3.处理mongoose验证错误
const handleValidationE = function (err) {
  const messages = Object.values(err.errors).map((el) => el.message);
  return new AppError(`验证失败的属性${messages.join(',')}`, 404);
};
module.exports = (err, req, res, next) => {
  //错误处理中间件，nodejs会检测到传入参数判定为错误处理中间件
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    //开发模式，按我给的形式全部发送给用户（开发者）
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    //思路：用户模式，如果是数据库错误，处理为AppError形式（我处理的错误）isOperational为真
    ////是AppError形式则isOperational为真，向用户发送错误信息
    ////不是AppError形式，仅向用户发送‘错**’，控制台输出错误信息（方便调试）
    let copyError = { ...err };
    if (err.CastError) {
      //在这里是mongodb(mongoose)出错了，我处理一下，返回用户可以看懂的结果
      copyError = handleDatabaseError(err);
    }
    if (err.code === 11000) {
      copyError = handleCreatDBError(err);
    }
    if (err.name === 'ValidationError') {
      copyError = handleValidationE(err);
    }
    if (copyError.message) {
      sendErrorPro(copyError, res);
    } else {
      sendErrorPro(err, res);
    }
  }
};
