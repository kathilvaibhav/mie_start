var express  = require('express');
var router   = express.Router();
var userController = require('../controllers/user');

//Create endpoint handlers for /user
router.route('/user')
  .post(userController.postUser)
  .get(userController.getUsers);

//Create endpoint handlers for /user/:user_id
router.route('/user/:user_id')
  .get(userController.getUser)
  .put(userController.putUser);

module.exports = router;