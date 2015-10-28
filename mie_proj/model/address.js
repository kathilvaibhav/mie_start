// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define schema for user
var addressSchema = new Schema({
			HouseNo: String,
			TowerNo:String,
			address:{ type: String, required: true },
			City:{ type: String, required: true },
			State:{ type: String, required: true },
			Country:{ type: String, required: true },
			Pincode:{ type: String, required: true },
			AddressType:{ type: String, required: true },
			isDefault:Boolean,
			isDeleted:Boolean,
			_cust_id : { type: Schema.Types.ObjectId, ref: 'User' ,  required: true }

});

// the schema is useless so far
// we need to create a model using it
var Address = mongoose.model('Address', addressSchema);

// make this available to our users in our Node applications
module.exports = Address;
