// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

// Define schema for user Product
var userProductSchema = new Schema({
			verified:{ type: Boolean, required: true },
			product_serial_no:{type : String},
			product_nick_name:{type : String},
			mPurchaseDate:{ type: Date },
			registration_TS:{ type: Date, default: Date.now },
			mProductPrice:{ type: Number},
			mImageProduct:{type : String},
			mDealerInfo: {type : String},
			product_status: {type : String},
			service_Interval:{ type: Number},
			last_service_DT:{ type: Date},
			last_service_id:{ type: Schema.Types.ObjectId, ref: 'ServiceTracker'},
			is_deleted:{ type: Boolean, required: true },
			_cust_id : { type: Schema.Types.ObjectId, ref: 'User' ,childPath:"products" , required: true },
			product_doc_info: [{doc_type:String ,doc_name: String ,doc_url: String } ],
			service_ids:[ {service_id:{ type: Schema.Types.ObjectId, ref: 'ServiceTracker' }}], 			
			localLocation:{type : String},	   
			mUserRegContactNumber:{type : String},
			mWarrantyEndsDate:{type : Date},
			mWarrantyStatus:{type : String},
			mWarrantyType:{type : String},
			_model_id : {  type : String  },			
			mBrandName : {  type : String  },
		    mProductName : {  type : String  },
		    mProductCategory : {  type : String  },
		    mProductSubCategory : {  type : String  },
		    mModelNo:{type : String},
		    mModelStandardWarrantyDuration : {type : String},
		    mIsBillAttached : { type: Boolean },
			mWarrantyDetails : {type : String},
			is_syncd : { type: String },
			mLastActivity : { type: String },
			mAddProductID : { type: String },
			mLocalLocation : { type: String },
			mMieProductId : { type: String },
			mBillLocalUrls : [String]
 
    

});

userProductSchema.plugin(relationship, { relationshipPathName:['_cust_id'] });

// the schema is useless so far

// we need to create a model using it
var UserProduct = mongoose.model('UserProduct', userProductSchema);

// make this available to our users in our Node applications
module.exports = UserProduct;
