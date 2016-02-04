// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");
// Define schema for user
var addressSchema = new Schema({
			houseNo: String,
			name:String,
			pincode:{ type: String, required: true },
			address:{ type: String, required: true },
			locality:{ type: String, required: true },
			landmark:{ type: String, required: true },
			City:{ type: String, required: true },
			state:{ type: String, required: true },		
			addressType:{ type: String, required: true },			
			isDeleted:Boolean,
			_cust_id : { type: Schema.Types.ObjectId, ref: 'User' ,childPath:"address" , required: true }

});
addressSchema.plugin(relationship, { relationshipPathName:'_cust_id' });

// the schema is useless so far
// we need to create a model using it
var Address = mongoose.model('Address', addressSchema);

// make this available to our users in our Node applications
module.exports = Address;
