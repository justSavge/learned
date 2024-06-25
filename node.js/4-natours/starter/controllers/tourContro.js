/* eslint-disable prettier/prettier */
//model view controller pattern ...(模型(数据，mongodb...),视图（前端渲染，react等等）,控制模式（现在所学的，nodejs），看起来太蠢了，这机翻味，难以理解，单看英文还好)
// const fs = require('fs')
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchasync');
const AppError = require('../utils/AppError');

exports.cheapFive = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = 'price,-rating';
  req.query.fields = 'name,price,rating,summary,difficulty';
  next();
};

exports.getAllTour = catchAsync(async (req, res, next) => {
  const featuresTour = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await featuresTour.query;

  res.status(200).json({
    status: 'sucess',
    resultCounter: tours.length,
    data: {
      tours: tours,
    },
  });
});
exports.getTour = catchAsync(async (req, res, next) => {
  const tours = await Tour.findById(req.params.id); //mongodb tours.findone({_id:req.params.id})里是这么些才对的，但是在这里简写了，可以Tour.findById(req.params.id)。
  if (!tours) {
    return next(new AppError('404 not found :(', 404));
  }
  res.status(200).json({
    status: 'sucess',
    resultCounter: tours.length,
    data: {
      tours: tours,
    },
  });
});
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  if (!newTour) {
    return next(new AppError('创建失败 :(', 404));
  }
  res.status(201).json({
    status: 'success',
    data: newTour,
  });
});
exports.updateTour = catchAsync(async (req, res, next) => {
  const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //返回被修改后的数据，默认false
    runValidators: true, //使用之前设置的验证器
  }); //mongodb update:tours.update({{_id:...},$set{price: ...}})大概是这样
  if (!updateTour) {
    return next(new AppError('404 not found :(', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: updateTour,
    },
  });
});
exports.deleteTour = catchAsync(async (req, res, next) => {
  const deleteTour = await Tour.findByIdAndDelete(req.params.id); //mongodb update:tours.update({{_id:...},$set{price: ...}})大概是这样
  if (!deleteTour) {
    return next(new AppError('404 not found :(', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: deleteTour,
    },
  });
});
exports.getToursStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingQuanlity: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        countTours: { $sum: 1 },
        countPrice: { $sum: '$price' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } },
    // },
  ]);
  res.status(200).json({
    status: '成功！！！',
    data: stats,
  });
});
exports.mostMonth = catchAsync(async (req, res, next) => {
  const { year } = req.params;
  const forPlan = await Tour.aggregate([
    {
      $unwind: '$startDates', //?
    },
    {
      $match: {
        //匹配
        startDates: {
          $gte: new Date(`${year}-1-1`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        //分组，只显示以下内容
        _id: { $month: '$startDates' },
        numOfAllMonth: { $sum: 1 },
        tour: { $push: '$name' },
      },
    },
    {
      //加入字段
      $addFields: {
        month: '$_id',
      },
    },
    {
      //对字段操作，0 不显示，1 显示
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        //排序
        numOfAllMonth: -1,
      },
    },
    {
      $limit: 12,
    },
  ]);
  res.status(200).json({
    status: '成功！！！',
    data: forPlan,
  });
});
//////////////////////////////////////
//为了看起来更舒服，决定将这些笔记？放下面。。。
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );
// exports.cheackId = (req, res, next, value) => {
//   //当然，也可以写一个更加简单的函数在以下每一个函数当中使用，但是这会违背一些代码思想，我们应当尽可能的使用“管道”处理数据
//   console.log('makesure it is runing');
// if (+req.params.id > tours.length) {
//   //不能再下面再次调用类似的，不太懂。。
//   //这里有个return ,也就是说如果执行成功的话就会直接返回，不会执行下面的next，这也是return的意义。
//   return res.status(404).json({
//     status: 'fali',
//     message: 'not anything here',
//   });
// }
//   next();
// };
// exports.cheackBody = (req, res) => {
//   // console.log(typeof req.body);
//   if (
//     Object.keys(req.body).indexOf('name') &&
//     Object.keys(req.body).indexOf('price')
//   ) {
//     console.log('okok...');
//   } else {
//     return res.status(400).json({
//       status: 'fali',
//       message: 'not anything here',
//     });
//   }
// };
//Tour.find()是啥，是一个返回以promise为结果以所有数据为结果的执行函数
// const testTour = new Tour({
//   name: 'link park',
//   rating: 4.5,
//   price: 150,
// });
// //保存到哥们的数据库中
// //save()返回一个promise,需要使用then来接收。
// testTour
//   .save()
//   .then((data) => console.log('这是所有的(tour)数据', data))
//   .catch((err) => console.log('抓住你了，错误', err));
//仅做为记忆
// exports.getAllTour = async (req, res) => {
//   //?是可以选择不选的
//   // console.log(req.params);
//   // console.log(req.requestTime);
//   // console.log(req);
//   // const tourChoose = tours.find((el) => el.id === +req.params.id);
//   // console.log(tourChoose);
//   //和mongodb的语法类似，查询功能
//   try {
//     //过滤字段
//     //1.拷贝，不能直接等于，这样会使得修改queryObj的时候把req.query也给修改了。
//     // const queryObj = { ...req.query }; //相当于给了数据

//     // const wantIngrone = ['sort', 'limit', 'page', 'filed'];
//     // wantIngrone.forEach((el) => delete queryObj[el]);
//     // // console.log(queryObj);
//     // let queryStr = JSON.stringify(queryObj);
//     // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

//     //普通方式
//     // let query = Tour.find(JSON.parse(queryStr)); //先构建一个查询
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(',').join(' '); //使用空格分割，当第一个参数值一样的时候按第二个参数排序
//       console.log(sortBy);
//       query = query.sort(sortBy);
//     } else {
//       //默认以最近的时间排序
//       query = query.sort('-createAt');
//     }
//     //提供需要的数据，尽可能减少传输数据

//     if (req.query.filed) {
//       //其实现在在做的东西都没什么营养，我觉得，这些都是js的知识，替换一些字符串什么的
//       const filed = req.query.filed.split(',').join(' '); //前篇一律使用,区分，用空格给他合起来。其实使用-，·，。，都行，都是自定义的，替换为空格就行，重点只有一个那就是下面的函数
//       console.log(filed);
//       query = query.select(filed); //传入一个用空格分开的字符串
//     } else {
//       //默认去除__v
//       query = query.select('-__v'); //去除一个数据也很简单，在前面加上一个减号就好
//     }
//     //分页功能，当我们的数据量过大时，就需要分页查看以使得数据可以更轻易的观看，简单说就跟看小说似的，分页分章节更加方便
//     //使用limit获取最大数据，使用page获取当前页面
//     const page = +req.query.page || 1; //天才一般设置默认值的方法
//     const limit = +req.query.limit || 100;
//     const skip = (page - 1) * limit;
//     query = query.skip(skip).limit(limit); //这两个很好理解skip是跳过的数据,limit是数据。学前端（js,有一个好处就是不用动脑，有一堆函数都有人给我写好了，也不知是好是坏。
//     //当我们运行超出数据范围的时候会是一个空数据，在这里我决定报错
//     if (req.query.page) {
//       //只有使用page时才会超出
//       const countD = await Tour.countDocuments(); //Tour是连上的数据库，后面的是查询有几个Documents,回忆一下，database,collections,documents.
//       if (skip >= countD) {
//         throw new Error('这个页面超过了最大页面捏');
//       }
//     }
//     const tours = await query; //执行
//     // {duration: 5,difficulty: 'easy',}
//     //在mangoDb之中，查询一个数据大于等于：{duration:{$gte: 5}}这么些
//     //这样获得数据，返回的是一个promise,用async await来搞会好一些
//     // const tours = await Tour.find()
//     //   .where('duration')
//     //   .equals(5)//.lte less than or equel,lt less than,.gt greater than.....
//     //   .where('difficulty')
//     //   .equals('easy');
//     res.status(200).json({
//       status: 'sucess',
//       resultCounter: tours.length,
//       // requestTime: req.requestTime,
//       data: {
//         tours: tours,
//       },
//     });
//   } catch (e) {
//     res.status(403).json({
//       status: 403,
//       msg: { e },
//     });
//   }
// };
// exports.createTour = async (req, res) => {
//   //使用create也可以
//   try {
//     const newTour = await Tour.create(req.body); //值得注意的是，二者的结果一致，但是完全不同，一个是Tour(模板)自带的方法create，一个文档自带的save。本来返回一个promise,但是我改其为异步函数了。

//     res.status(201).json({
//       //201:create,200:ok...2开头都是sucess
//       status: 'success',
//       data: newTour,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'error',
//       message: err,
//     });
//   }
//   // console.log(req.body);
//   // const newID = tours[tours.length - 1].id + 1; //其实直接tours.length就好了
//   // const newBody = Object.assign({ id: newID }, req.body); //Object.assign是用来合并2个对象的,和newBody.id = newId,是一样的
//   // tours.push(newBody);
//   // fs.writeFile(
//   //   `${__dirname}/dev-data/data/tours-simple.json`,
//   //   JSON.stringify(tours), //转object为json,不要拿parse就用，parse是又json转化为object
//   //   (err) => {
//   //     res.status(201).json({
//   //       //201:create,200:ok...2开头都是sucess
//   //       status: 'sucess',
//   //       data: {
//   //         adds: newBody,
//   //       },
//   //     });
//   //   },
//   // );
//   // res.send('done');//response不能发送2次
// };
//as refer:
// try {
// }
// catch (e) {
//   res.status(403).json({
//     status: 403,
//     msg: e.message,
//   });
// }
