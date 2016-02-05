/**
 * http://usejsdoc.org/
 */
var Product = require('../model/product');

// Create endpoint /api/product/product_brand for GET
exports.getAllBrandName = function(req, res) {
  
	Product.collection.distinct('product_brand',function(err, products) {
    if (err)
      res.send(err);
    else
    res.json(  { message: 'Distinct Brand Items fetched..', data: products });
  });
};


//Create endpoint /api/product/brand for GET
exports.getAllProductType = function(req, res) {
  
	Product.collection.distinct('product_type',function(err, products) {
    if (err)
      res.send(err);
    else
    res.json(  { message: 'Distinct Product Type..', data: products });
  });
};


//Create endpoint /api/product/brand/:brand_name for GET
exports.getAllBrandProductTypes = function(req, res) {
  
	Product.collection.distinct('product_type',
			{ product_brand: req.params.brand_name } ,function(err, products) {
    if (err)
      res.send(err);
    else    	
     res.json({ message: 'Distinct Brand Product Type..', data: products});
  });
};


//Create endpoint /api/product/:brand_name/:product_type for GET
exports.getAllBrandModel = function(req, res) {
  
	Product.find({ product_brand: req.params.brand_name,
			  product_type: req.params.product_type}).select({product_model :1 ,_id :1}).exec(function(err, products) {
    if (err)
      res.send(err);
    else
    res.json(products);
  });
};


//Create endpoint /api/product/modelDetailByName/:model_name for GET
exports.getAllBrandModelDetailsByName = function(req, res) {
  
	Product.find({ product_model: req.params.model_name } ,function(err, products) {
	    if (err)
	      res.send(err);
	    else
	    res.json(products);
	  });
};
	
	
//Create endpoint /api/product/modelDetailById/:model_id for GET
exports.getAllBrandModelDetailsById = function(req, res) {
	  
	Product.findById(req.params.model_id,function(err, product) {
		    if (err)
		      res.send(err);
		    else
		    res.json(product);
		  });
};

//Create endpoint /api/user for POSTS
exports.postProduct =  function(req, res) {
  // Create a new instance of the User
  var product = new Product();
  console.log(req.body);
  
  // Set the user properties that came from the POST data    
  product.product_brand = req.body.brand;  
  product.product_type = req.body.product_type;
  product.product_category = req.body.product_category;
  product.product_model = req.body.product_model;
  
  // Save the beer and check for errors
  product.save(function(err) {
    if (err) {
        res.json({message:'Product Record not saved' + err ,data:{}});
    }
    else {
        res.json({data: product });
    }

  });
};