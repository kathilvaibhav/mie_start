// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define schema for Service Tracker
var serviceTracker = new Schema({	
	_cust_id : { type: Schema.Types.ObjectId, ref: 'Product', required:true },
	model_id:{ type: Schema.Types.ObjectId, ref: 'User', required:true },
	service_cost:Number,
	service_status:String,
	service_problem_desc:String,
	prefered_visit_time:String,
	registered_TS:{ type: Date, default: Date.now },
	cust_contact:String,
	cust_address:String,
	service_end_TS:Date,
	service_rating:Number,
	service_parent_id:String,
	service_feedback:String,
	CC_id:String,
	service_type:String,
	service_category:String

});

// the schema is useless so far
// we need to create a model using it
var service = mongoose.model('ServiceTracker', serviceTracker);

// make this available to our users in our Node applications
module.exports = service;
