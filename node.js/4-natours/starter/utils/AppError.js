//只是一个自定义错误类，方便自我排查错误，如isOperational可以得知是否是我处理的错误
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); //Error没有statusCode
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? '连接错误' : '连接失败';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor); //传递错误栈（stack）,this.stack = stack(或者这样写更好理解，就是这么传递的)，错误栈就是出错时的代码节点。
  }
}
module.exports = AppError;
