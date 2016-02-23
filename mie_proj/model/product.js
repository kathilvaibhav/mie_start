// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define SubDocs


// Define schema for user
var productSchema = new Schema({			
			product_brand:{ type: String, required: true },
			product_type:{ type: String, required: true },
			product_category:{ type: String,required : true},
			product_sub_category:{ type: String },
			product_model:{ type: String, required: true },
			model_desc:{ type: String },
			standard_warranty_dtl:[{part_name : String  , duration : String}],
			standard_warranty_days:{ type: Number },
			price:{ type: Number},
			service_charge:{ type: Number},
			supported_services : { type : Array},
			verified:{type:Boolean, default: true},
			image_url:{type:String},
			page_ref_url:{type:String},
			product_specs: {size_unit: String , size: Number},
			product_warranty:[{warranty_type:String,warranty_duration:Number,warranty_details:String}]						 		

},{ collection : 'Product' });

// the schema is useless so far
// we need to create a model using it
var Product = mongoose.model('Product', productSchema);

// make this available to our users in our Node applications
module.exports = Product;
