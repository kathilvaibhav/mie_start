// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define schema for user Product
var userProductSchema = new Schema({
			_Model_id : { type: Schema.Types.ObjectId, ref: 'Product' ,  required: true },
			verified:{ type: Boolean, required: true },
			product_serial_no:{type : String},
			product_nick_name:{type : String},
			purchase_DT:{ type: Date },
			Registration_TS:{ type: Date, default: Date.now },
			Purchase_cost:{ type: Number},
			image_url:{type : String},
			dealer: {delear_name:String, delear_add: String},
			product_status: {type : String},
			Service_Interval:{ type: Number},
			Last_service_DT:{ type: Date},
			last_service_id:{ type: Schema.Types.ObjectId, ref: 'ServiceTracker'},
			is_deleted:{ type: Boolean, required: true },
			product_doc_info: [{doc_type:String ,doc_name: String ,doc_url: String } ],
			service_ids:[ {service_id:{ type: Schema.Types.ObjectId, ref: 'ServiceTracker' }} ]
			

});

// the schema is useless so far

// we need to create a model using it
var UserProduct = mongoose.model('UserProduct', userProductSchema);

// make this available to our users in our Node applications
module.exports = UserProduct;
