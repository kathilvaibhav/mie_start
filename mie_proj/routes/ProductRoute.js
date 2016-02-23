var express  = require('express');
var router   = express.Router();
var productController = require('../controllers/productController');

//Create endpoint handlers for /product
router.route('/productBrand')
  .get(productController.getAllBrandName);  


router.route('/productType')
.get(productController.getAllProductType);

//Create endpoint handlers for /product/:brand_name
router.route('/productBrandType/:brand_name')
  .get(productController.getAllBrandProductTypes);


router.route('/productModel/category')
.get(productController.getAllProductBrandCategory);

router.route('/productModel/subCategory')
.get(productController.getAllProductBrandSubCategory);


//Create endpoint handlers for /product/:brand_name/:product_type
router.route('/productModel/model')
  .get(productController.getAllBrandModel);


//Create endpoint handlers for /product/modelDetailByName/:model_name 
router.route('/productModelDetailByName/:model_name ')
  .get(productController.getAllBrandModelDetailsByName);

//Create endpoint handlers for product/modelDetailById/:model_id
router.route('/productModelDetailById/:model_id')
  .get(productController.getAllBrandModelDetailsById);

router.route('/productBrand')
.post(productController.postProduct);

module.exports = router;