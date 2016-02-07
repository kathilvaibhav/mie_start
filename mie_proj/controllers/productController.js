/**
 * http://usejsdoc.org/
 */
var Product = require('../model/product');

// Create endpoint /api/product/product_brand for GET
exports.getAllBrandName = function(req, res) {
  
	Product.collection.distinct('product_brand',function(err, products) {
    if (err)        	
    res.json({status:'901',message:'Expetion occurred while fetching product brand' 
    	  ,data:{},error:err});
    else
    res.json(  { status:'900', 
    	message: 'Distinct Brand Items fetched..', data: products });
    
    
  });
};


//Create endpoint /api/product/brand for GET
exports.getAllProductType = function(req, res) {
  
	Product.collection.distinct('product_type',function(err, products) {
    if (err)
    res.json({status:'901',message:'Expetion occurred while fetching product type' 
        	  ,data:{},error:err});
    else
    res.json(  { status:'900', message: 'Distinct Product Type..', data: products });
  });
};


//Create endpoint /api/product/brand/:brand_name for GET
exports.getAllBrandProductTypes = function(req, res) {
  
	Product.collection.distinct('product_type',
			{ product_brand: req.params.brand_name } ,function(err, products) {
    if (err)      
    	res.json({status:'901',message:'Expetion occurred while fetching product type' 
  	  ,data:{},error:err});
    else    	     
    	res.json(  { status:'900', message: 'Distinct Brand Product Type..', data: products });
  });
};


//Create endpoint /api/productModel/model for GET
exports.getAllBrandModel = function(req, res) {
  
	Product.find({ product_brand: req.query.brand_name,
			  product_type: req.query.product_type}).select({product_model :1 ,_id :1}).exec(function(err, products) {
    if (err)
    	res.json({status:'901',message:'Expetion occurred while fetching product type' 
    	  	  ,data:{},error:err});
    else
    res.json(  { status:'900', message: 'Get model details..', data: products });
    
  });
};


//Create endpoint /api/product/modelDetailByName/:model_name for GET
exports.getAllBrandModelDetailsByName = function(req, res) {
  
	Product.find({ product_model: req.params.model_name } ,function(err, products) {
	    if (err)
	      
	    res.json({status:'901',message:'Expetion occurred while fetching product type' 
	    	  ,data:{},error:err});
	    else
	    res.json({ status:'900', message: 'Get model details by name..', data: products });
	  });
};
	
	
//Create endpoint /api/product/modelDetailById/:model_id for GET
exports.getAllBrandModelDetailsById = function(req, res) {
	  
	Product.findById(req.params.model_id,function(err, product) {
		    if (err)
		    res.json({status:'901',message:'Expetion occurred while fetching model details..' ,data:{},error:err});
		    else		   
		    res.json({ status:'900', message: 'Get model details by id..', data: products });
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
        
        res.json({status:'901',message:'Product record not saved..' ,data:{},error:err});
    }
    else {
        res.json({ status:'900', message: 'Product record saved..', data: products });
    }

  });
};