var express  = require('express');
var router   = express.Router();
var productController = require('../controllers/productController');

//Create endpoint handlers for /product
router.route('/product')
  .get(productController.getAllBrandName);  

//Create endpoint handlers for /product/:brand_name
router.route('/product/:brand_name')
  .get(productController.getAllBrandProductTypes);

//Create endpoint handlers for /product/:brand_name/:product_type
router.route('/product/:brand_name/:product_type')
  .get(productController.getAllBrandModel);


//Create endpoint handlers for /product/modelDetailByName/:model_name 
router.route('/product/:brand_name/:product_type')
  .get(productController.getAllBrandModelDetailsByName);

//Create endpoint handlers for product/modelDetailById/:model_id
router.route('/product/:brand_name/:product_type')
  .get(productController.getAllBrandModelDetailsById);


module.exports = router;