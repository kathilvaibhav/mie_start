// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define SubDocs


// Define schema for user
var productSchema = new Schema({			
			brand:{ type: String, required: true },
			product_type:{ type: String, required: true },
			product_category:{ type: String,required : true},
			product_model:{ type: String, required: true },
			model_desc:{ type: String },
			Standard_warranty_dtl:[{part_name : String  , duration : String}],
			Standard_warranty_days:{ type: Number },
			product_price:{ type: Number},
			service_charge:{ type: Number},
			Supported_Service_type : { type : Array},
			verified:{type:Boolean, default: true},
			img_url:{type:String}

},{ collection : 'Product' });

// the schema is useless so far
// we need to create a model using it
var Product = mongoose.model('Product', productSchema);

// make this available to our users in our Node applications
module.exports = Product;
