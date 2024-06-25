/* eslint-disable prettier/prettier */
const { promisify } = require('util');
const JWT = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchasync');
const AppError = require('../utils/AppError');

const signupToken = (id) =>
  JWT.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  //为了防止有人传递不安全的东西（来获得安全权限等...
  // const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = signupToken(newUser._id);
  res.status(201).json({
    status: '成功创建',
    token,
    message: newUser,
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('请输入邮件，密码', 400));
  }
  const user = await User.findOne({ email: email }).select('+password'); //这样可以加入没选中的password
  const correct = await user.correctPassword(password, user.password);
  if (!user || !correct) {
    return next(AppError('没有这个账号或者密码错误', 400));
  }
  const token = signupToken(user._id);
  res.status(200).json({
    status: '成功登录',
    token,
  });
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  console.log(
    req.headers,
    // req.headers.authorization.startsWith('bearer'),
  );
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token);
  }
  const decode = promisify(JWT.verify(token, process.env.NODE_SECRET));
  next();
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findOne({});
  res.status(200).json({
    status: 'sucess',
    resultCounter: user.length,
    data: {
      user: user,
    },
  });
});
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: '这个路由还没写。。。',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: '这个路由还没写。。。',
  });
};

//
// const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//   expiresIn: process.env.JWT_EXPIRES_IN,
// }); //第一个是payload(有效载荷)的id就使用自动生成的id来做，第二个是密钥，是关键（至少32位），第三个是过期时间
