const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const { appendFile } = require('fs');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  // console.log(req.headers);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.toLowerCase().startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('请先登录，没有token或token错误', 401));
  }
  // 2) Verification token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //promisify,内置的promise方法，promisify(jwt.verify)返回一个promise处理后面的数据,错误的话会被捕获错误

  // 3) Check if user still exists
  const currentUSer = await User.findById(decode.id);
  if (!currentUSer) {
    return next(new AppError('没有这么号人，可能已经被删除了', 401));
  }
  // 4) Check if user changed password after the token was issued
  if (currentUSer.changedPasswordAfter(decode.iat)) {
    return next(new AppError('你的密码最近改变了，请重新登录', 401));
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUSer; //???理了一下，也合理，毕竟是作为中间件（protect处理的，处理以后的结果传递给getTours等）
  next();
});

exports.restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new AppError('你无权访问，至少要导游领队，管理员，才能修改', 403)
      );
    }
    next();
  };
};
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const { email } = req.body;
  const theUSer = await User.findOne({ email });
  if (!theUSer) {
    return next(new AppError('没有这个用户', 403));
  }
  // 2) Generate the random reset token
  const resetToken = theUSer.createPasswordResetToken();
  await theUSer.save({ validateBeforeSave: false });
  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetPassword${resetToken}`;
  const message = `忘记密码了吗？点击修改你的密码:)${resetURL}\n如果不是你发送的本消息，就请忽略并且注意个人信息安全`;
  try {
    await sendEmail({
      email,
      subject: '这是一封修改密码邮件(10分钟有效)',
      message
    });
    res.status(200).json({
      status: '成功发送',
      message: '已经把Token发送到你的邮箱了'
    });
  } catch (error) {
    theUSer.passwordChangedAt = undefined;
    theUSer.passwordResetToken = undefined;
    await theUSer.save();
    return next(new AppError('Token发送失败', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
