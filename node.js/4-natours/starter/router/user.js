const express = require('express');

const router = express.Router();

const {
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersContro');

router.post('/signup', signup);
router.post('/login', login);
router.route('/').get(protect, getUser);
router
  .route('/api/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
module.exports = router;
