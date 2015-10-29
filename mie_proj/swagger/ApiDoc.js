var swagger = require("swagger-node-express");
// User API
var createUser = {
		  'spec': {
		    "description" : "Create New User in MIE System and will return created user details",
		    "path" : "/user",
		    "notes" : "Create new User with following paramter past in the request req.body " +
		    			" firstName , lastName,email,mobile ",
		    "summary" : "Create New User in MIE",
		    "consumes":"application/json",
		    "method": "POST",
		    "parameters": [
		                   {
		                     "name": "body",
		                     "description": "User object that needs to be added to the store",
		                     "required": true,
		                     "type": "User",
		                     "paramType": "body"
		                   }
		                 ],
		    "type" : "User",
		    "errorResponses" : [],
			"nickname": "addUser",
			"produces": "application/json",
		  }
		};

var updateUser = {
		  'spec': {
		    "description" : "Update User in MIE System and will return updated user details",
		    "path" : "/user/:user_id",
		    "notes" : "Update User with following paramter past in the request req.body " +
		    			" firstName , lastName,email,mobile ",
		    "summary" : "Update New User in MIE",
		    "consumes":"application/json",swag.addGET(getUser);
		    "method": "PUT",
		    "parameters": [
		                   {
		                     "name": "body",
		                     "description": "User object that needs to be update",
		                     "required": true,
		                     "type": "User",
		                     "paramType": "body"
		                   },swagger.pathParam("user_id", "ID of the user which is to updated", "string")
		                 ],
		    "type" : "User",
		    "errorResponses" : [],
			"nickname": "updateUser",
			"produces": "application/json",
		  }
		};

var getUser = {
		  'spec': {
		    "description" : "Get User from MIE System and will return updated user details",
		    "path" : "/api/user/{user_id}",
		    "notes" : "Get User from MIE System and will return updated user details ",
		    "summary" : "Get User Details",
		    "consumes":"application/json",
		    "method": "GET",swag.addGET(getUser);
		    "parameters": [swagger.pathParam("user_id", "ID of the user which is to be fetched", "string")
		                 ],
		    "type" : "User",
		    "errorResponses" : [],
			"nickname": "getUser",
			"produces": "application/json",
		  }
		};

var getUsers = {
		  'spec': {
		    "description" : "Get All Users from MIE System and will return updated user details",
		    "path" : "/user",
		    "notes" : "Get All Users from MIE System and will return updated user details ",
		    "summary" : "Get All Users Details",
		    "consumes":"application/json",
		    "method": "GET",
		    "parameters": [],
		    "type" : "User",
		    "errorResponses" : [],
			"nickname": "getUsers",
			"produces": "application/json",
		  }
		};


// Product API

var getAllBrandName = {
		  'spec': {
		    "description" : "Get All Brand Name",
		    "path" : "/api/product",
		    "notes" : "Get All Brand Name;  This API will return list of brand name",
		    "summary" : "Get All Brand Name",
		    "consumes":"application/json",
		    "method": "GET",
		    "parameters": [],
		    "type" : "User",
		    "errorResponses" : [],
			"nickname": "getAllBrandName",
			"produces": "application/json",
		  }
		};  


var getAllBrandProductTypes = {
		  'spec': {
		    "description" : "Get All Brand Product Type",
		    "path" : "/product/:brand_name",
		    "notes" : "Get All Brand Product Type;  This API will return list of Product Type",
		    "summary" : "Get All Brand Product Type",
		    "consumes":"application/json",
		    "method": "GET",
		    "parameters": [swagger.pathParam("brand_name", "Brand Name", "string")],
		    "type" : "User",
		    "errorResponses" : [],
			"nickname": "getAllBrandProductTypes",
			"produces": "application/json",
		  }
		};

var getAllBrandModel = {
		  'spec': {
		    "description" : "Get All Model Details for Given Brand and Product Type",
		    "path" : "/product/:brand_name/:product_type",
		    "notes" : "Get All Model Details for Given Brand and Product Type",
		    "summary" : "Get All Model Details for Given Brand and Product Type",
		    "consumes":"application/json",
		    "method": "GET",
		    "parameters": [swagger.pathParam("brand_name", "Brand Name", "string"),
		                   swagger.pathParam("product_type", "Product Type", "string")],
		    "type" : "User",
		    "errorResponses" : [],
			"nickname": "getAllBrandModel",
			"produces": "application/json",
		  }
		};

var getAllBrandModelDetailsByName = {
		  'spec': {
		    "description" : "Get All Model Details for Given Model",
		    "path" : "/product/modelDetailByName/:model_name",
		    "notes" : "Get All Model Details for Given Model",
		    "summary" : "Get All Model Details for Given Model",
		    "consumes":"application/json",
		    "method": "GET",
		    "parameters": [swagger.pathParam("model_name", "Model Name", "string")],
		    "type" : "User",
		    "errorResponses" : [],
			"nickname": "getAllBrandModelDetailsByName",
			"produces": "application/json",
		  }
		};

var getAllBrandModelDetailsById = {
		  'spec': {
		    "description" : "Get All Model Details for Given Model",
		    "path" : "/product/modelDetailById/:model_id",
		    "notes" : "Get All Model Details for Given Model",
		    "summary" : "Get All Model Details for Given Model",
		    "consumes":"application/json",
		    "method": "GET",
		    "parameters": [swagger.pathParam("model_id", "Model Id", "string")],
		    "type" : "User",
		    "errorResponses" : [],
			"nickname": "getAllBrandModelDetailsById",
			"produces": "application/json",
		  }
		};
exports.getSwagget = function() {
	return swagger;
};

exports.initializeSwagger = function(swag){	
	swag.addPOST(getUser);
	swag.addPUT(getUser);
	swag.addGET(getUser);
	swag.addGET(getAllBrandName);
	
	swag.addValidator(
			  function validate(req, path, httpMethod) {
			    //  example, only allow POST for api_key="special-key" 
			    if ("POST" == httpMethod || "DELETE" == httpMethod || "PUT" == httpMethod) {
			      var apiKey = req.headers["api_key"];
			      if (!apiKey) {
			        apiKey = url.parse(req.url,true).query["api_key"];
			      }
			      if ("special-key" == apiKey) {
			        return true; 
			      }
			      return false;
			    }
			    return true;
			  }
			);

	swag.configure("http://petstore.swagger.wordnik.com", "0.1");
}