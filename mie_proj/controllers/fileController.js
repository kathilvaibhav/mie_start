
var userProductController = require('../controllers/userProductController');

//Create endpoint /api/beers for POSTS
exports.uploadUserProductImage =  function(req, res) {
  // Create a new instance of the Beer model
	var file = req.files.file,
      path = '/var/log/img/';
  // Logic for handling missing file, wrong mimetype, no buffer, etc.

  var buffer = file.buffer, //Note: buffer only populates if you set inMemory: true.
      fileName = file.name;
  var stream = fs.createWriteStream(path + fileName);
  stream.write(buffer);
  stream.on('error', function(err) {
      console.log('Could not write file to memory.');
      res.json({status:'901',message:'Expetion occurred while trying to upload image for User Product' 
    	  ,data:{},error:err});
  });
  stream.on('finish', function() {      
	  	
	  userProductController.insertUploadedDocMetaData(req, res);	 
  });
  stream.end();
  console.log('Stream ended...');
};

