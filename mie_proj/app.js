
var app = express();
app.use(express.bodyParser());
swagger.setAppHandler(app);

app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName);
  return next();
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// compressed for posting to google group
var models = {"Person":{"id":"Person","description":"This is a person","required":["_id"],
	"properties":{"_id":{"type":"string"},"name":{"type":"string"},"email":{"type":"string"}}}};
// compressed for posting to google group
var findById={spec:{description:"Find a person",path:"/collections/:collectionName/people/{personId}",
	notes:"Returns a person based on ID",summary:"Find person by ID",method:"GET",
	params:[swagger.pathParam("personId","ID of person that needs to be fetched","string")],
	responseClass:"Person",
	errorResponses:[swagger.errors.invalid("_id"),
	                swagger.errors.notFound("person")],nickname:"getPersonById"},
	                action:function(e,t){if(!e.params.personId){throw swagger.errors.invalid("_id")}
	                console.log("params id == "+e.params.personId);
	                e.collection.findOne({_id:e.collection.id(e.params.personId)},
	                		function(e,n){if(e)return swagger.errors.notFound("person");t.send(n)})}}

swagger.addGet(findById);

swagger.configure(app, "http://localhost:3000", "0.1");

app.listen(3000);