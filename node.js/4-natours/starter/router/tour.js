const express = require('express');

const router = express.Router();

const {
  cheapFive,
  getTour,
  getAllTour,
  createTour,
  updateTour,
  deleteTour,
  mostMonth,
  getToursStats,
} = require('../controllers/tourContro');
//是一个完整的中间件，因此通常称为微型应用程序
// router.param('id', cheackId);
//  (req, res, next, value) => {
//   //以前用过res.params.id获得过id，这里使用了一个回调函数来处理
//   console.log(value);
//   next();
// }
//cheackBody.get(getTour)  // cheackId,
// cheackBody,  // getTour,
//将api的路径简单化，有时候会不得已需要输入大量的参数来实现获得复杂的参数，如获得最便宜的五个旅游点，这时候有一个思路就是增加中间件，赋予一些简单的url一些复杂的功能
router.route('/').post(createTour).get(getAllTour);
router.route('/top-5-cheap').get(cheapFive, getAllTour);
router.route('/most-people-month/:year').get(mostMonth);
router.route('/states').get(getToursStats);
router.route('/:id').patch(updateTour).delete(deleteTour).get(getTour);
module.exports = router;
