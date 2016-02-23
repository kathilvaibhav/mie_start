// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

// Define schema for user Product
var userProductSchema = new Schema({
			//_Model_id : { type: Schema.Types.ObjectId, ref: 'Product' ,  required: true },
			verified:{ type: Boolean, required: true },
			product_serial_no:{type : String},
			product_nick_name:{type : String},
			purchase_DT:{ type: Date },
			registration_TS:{ type: Date, default: Date.now },
			purchase_cost:{ type: Number},
			image_url:{type : String},
			dealer: {type : String},
			product_status: {type : String},
			service_Interval:{ type: Number},
			last_service_DT:{ type: Date},
			last_service_id:{ type: Schema.Types.ObjectId, ref: 'ServiceTracker'},
			is_deleted:{ type: Boolean, required: true },
			_cust_id : { type: Schema.Types.ObjectId, ref: 'User' ,childPath:"products" , required: true },
			product_doc_info: [{doc_type:String ,doc_name: String ,doc_url: String } ],
			service_ids:[ {service_id:{ type: Schema.Types.ObjectId, ref: 'ServiceTracker' }}], 			
			localLocation:{type : String},	   
			userRegContactNumber:{type : String},
			warrantyEndsDate:{type : Date},
			warrantyStatus:{type : String},
			warrantyType:{type : String},
			_model_id : {  type : String  },			
			brandName : {  type : String  },
		    productName : {  type : String  },
		    productCategory : {  type : String  },
		    productSubCategory : {  type : String  }

});

userProductSchema.plugin(relationship, { relationshipPathName:['_cust_id'] });

// the schema is useless so far

// we need to create a model using it
var UserProduct = mongoose.model('UserProduct', userProductSchema);

// make this available to our users in our Node applications
module.exports = UserProduct;
