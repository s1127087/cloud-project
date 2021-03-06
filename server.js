var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongodbURL = 'mongodb://localhost:27017/test';
var mongoose = require('mongoose');
var restaurantSchema = require('./models/restaurant');

//Insert documents (obtain content from req.body)
app.post('/',function(req,res) {
	//console.log(req.body);
	//var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var rObj = {};
		rObj.address = {};
		if(req.body.building!=null)
		rObj.address.building = req.body.building;
		if(req.body.street!=null)
		rObj.address.street = req.body.street;
		if(req.body.zipcode!=null)
		rObj.address.zipcode = req.body.zipcode;
		
		rObj.address.coord = [];
		if(req.body.lon!=null)
		rObj.address.coord.push(req.body.lon);
		if(req.body.lat!=null)
		rObj.address.coord.push(req.body.lat);
		
		if(req.body.borough!=null)
		rObj.borough = req.body.borough;
		if(req.body.cuisine!=null)
		rObj.cuisine = req.body.cuisine;
		
		rObj.grades=[];
		if(req.body.date!=null||req.body.grade!=null||req.body.score!=null){
			var doc={date:"",grade:"",score:""}
			doc.date=req.body.date;
			doc.grade=req.body.grade;
			doc.score=req.body.score;
			rObj.grades.push(doc);
		}
		
		if(req.body.name!=null)
		rObj.name = req.body.name;
		if(req.body.restaurant_id!=null)
		rObj.restaurant_id = req.body.restaurant_id;

		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var r = new Restaurant(rObj);
		//console.log(r);
		r.save(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant created!')
       		db.close();
			res.status(200).json({message: 'insert done', id: r._id});
    	});
    });
});

//Delete documents
app.delete('/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib] = req.params.attrib_value;
	var showcriteria = {message: 'delete done',};
	showcriteria[req.params.attrib]=req.params.attrib_value;
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	var oldOutput;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}

		});

	});
});
app.delete('/address/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria["address."+req.params.attrib] = req.params.attrib_value;
	var showcriteria = {message: 'delete done',};
	showcriteria["address."+req.params.attrib]=req.params.attrib_value;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/grades/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib] = req.params.attrib_value;
	var showcriteria = {message: 'delete done',};
	showcriteria["grades."+req.params.attrib]=req.params.attrib_value;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/address/coord/:attrib_value1/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria["address.coord"] = req.params.attrib_value1;
	criteria["address.coord"] = req.params.attrib_value2;
	var showcriteria = {message: 'delete done',};
	showcriteria["address.coord1"] = req.params.attrib_value1;
	showcriteria["address.coord2"] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;http://jonhttp://jonathan2015.azurewebsites.netathan2015.azurewebsites.net
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/', function(req,res) {
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
		restaurant.remove({},function(err){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				
				console.log("Deleted:all");
				db.close();
				res.status(200).json({message: 'delete all done'});
			}
		});
	});
});
app.delete('/:attrib1/:attrib_value1/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	var showcriteria = {message: 'delete done',};
	showcriteria[req.params.attrib1]=req.params.attrib_value1;
	showcriteria[req.params.attrib2] = req.params.attrib_value2;
	

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
			
		});
	});
});
app.delete('/:attrib1/:attrib_value1/address/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria["address."+req.params.attrib2] = req.params.attrib_value2;
	var showcriteria = {message: 'delete done',};
	showcriteria[req.params.attrib1]=req.params.attrib_value1;
	showcriteria["address."+req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}			
		});
	});
});
app.delete('/address/:attrib2/:attrib_value2/:attrib1/:attrib_value1', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria["address."+req.params.attrib2] = req.params.attrib_value2;
	var showcriteria = {message: 'delete done',};
	showcriteria[req.params.attrib1]=req.params.attrib_value1;
	showcriteria["address."+req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}			
		});
	});
});
app.delete('/address/:attrib1/:attrib_value1/address/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria["address."+req.params.attrib1] = req.params.attrib_value1;
	criteria["address."+req.params.attrib2] = req.params.attrib_value2;
	var showcriteria = {message: 'delete done',};
	showcriteria["address."+req.params.attrib1]=req.params.attrib_value1;
	showcriteria["address."+req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/:attrib1/:attrib_value1/grades/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria["grades."+req.params.attrib2] = req.params.attrib_value2;
	var showcriteria = {message: 'delete done',};
	showcriteria[req.params.attrib1]=req.params.attrib_value1;
	showcriteria["grades."+req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/grades/:attrib2/:attrib_value2/:attrib1/:attrib_value1', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria["grades."+req.params.attrib2] = req.params.attrib_value2;
	var showcriteria = {message: 'delete done',};
	showcriteria[req.params.attrib1]=req.params.attrib_value1;
	showcriteria["grades."+req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/grades/:attrib1/:attrib_value1/grades/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["grades."+req.params.attrib2] = req.params.attrib_value2;
	var showcriteria = {message: 'delete done',};
	showcriteria["grades."+req.params.attrib1]=req.params.attrib_value1;
	showcriteria["grades."+req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/:attrib1/:attrib_value1/address/coord/:attrib_value2/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria["address.coord"] = req.params.attrib_value2;
	criteria["address.coord"] = req.params.attrib_value3;
	var showcriteria = {message: 'delete done',};
	showcriteria["address.coord1"]=req.params.attrib_value2;
	showcriteria["address.coord2"] = req.params.attrib_value3;
	showcriteria[req.params.attrib1] = req.params.attrib_value1;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/address/coord/:attrib_value2/:attrib_value3/:attrib1/:attrib_value1', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria["address.coord"] = req.params.attrib_value2;
	criteria["address.coord"] = req.params.attrib_value3;
	var showcriteria = {message: 'delete done',};
	showcriteria["address.coord1"]=req.params.attrib_value2;
	showcriteria["address.coord2"] = req.params.attrib_value3;
	showcriteria[req.params.attrib1] = req.params.attrib_value1;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/address/coord/:attrib_value2/:attrib_value3/grades/:attrib1/:attrib_value1', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["address.coord"] = req.params.attrib_value2;
	criteria["address.coord"] = req.params.attrib_value3;
	var showcriteria = {message: 'delete done',};
	showcriteria["address.coord1"]=req.params.attrib_value2;
	showcriteria["address.coord2"] = req.params.attrib_value3;
	showcriteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/grades/:attrib1/:attrib_value1/address/coord/:attrib_value2/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["address.coord"] = req.params.attrib_value2;
	criteria["address.coord"] = req.params.attrib_value3;
	var showcriteria = {message: 'delete done',};
	showcriteria["address.coord1"]=req.params.attrib_value2;
	showcriteria["address.coord2"] = req.params.attrib_value3;
	showcriteria["grades."+req.params.attrib1] = req.params.attrib_value1;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/address/:attrib2/:attrib_value2/grades/:attrib1/:attrib_value1', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["address."+req.params.attrib2] = req.params.attrib_value2;
	var showcriteria = {message: 'delete done',};
	showcriteria["address."+req.params.attrib2]=req.params.attrib_value2;
	showcriteria["grades."+req.params.attrib1] = req.params.attrib_value1;


	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/grades/:attrib1/:attrib_value1/address/:attrib2/:attrib_value2/', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["address."+req.params.attrib2] = req.params.attrib_value2;
	var showcriteria = {message: 'delete done',};
	showcriteria["address."+req.params.attrib2]=req.params.attrib_value2;
	showcriteria["grades."+req.params.attrib1] = req.params.attrib_value1;


	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/:attrib1/:attrib_value1/:attrib2/:attrib_value2/:attrib3/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria[req.params.attrib3] = req.params.attrib_value3;
	var showcriteria = {message: 'delete done',};
	showcriteria[req.params.attrib1] = req.params.attrib_value1;
	showcriteria[req.params.attrib2]=req.params.attrib_value2;	
	showcriteria[req.params.attrib3]=req.params.attrib_value3;
	
	

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/:attrib1/:attrib_value1/:attrib2/:attrib_value2/grades/:attrib3/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria["grades."+req.params.attrib3] = req.params.attrib_value3;
	var showcriteria = {message: 'delete done',};
	showcriteria[req.params.attrib1] = req.params.attrib_value1;
	showcriteria[req.params.attrib2]=req.params.attrib_value2;	
	showcriteria["grades."+req.params.attrib3]=req.params.attrib_value3;
	
	

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/:attrib1/:attrib_value1/grades/:attrib3/:attrib_value3/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria["grades."+req.params.attrib3] = req.params.attrib_value3;
	var showcriteria = {message: 'delete done',};
	showcriteria[req.params.attrib1] = req.params.attrib_value1;
	showcriteria[req.params.attrib2]=req.params.attrib_value2;	
	showcriteria["grades."+req.params.attrib3]=req.params.attrib_value3;
	
	

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/grades/:attrib3/:attrib_value3/:attrib1/:attrib_value1/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria["grades."+req.params.attrib3] = req.params.attrib_value3;
	var showcriteria = {message: 'delete done',};
	showcriteria[req.params.attrib1] = req.params.attrib_value1;
	showcriteria[req.params.attrib2]=req.params.attrib_value2;	
	showcriteria["grades."+req.params.attrib3]=req.params.attrib_value3;
	
	

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/address/:attrib1/:attrib_value1/address/:attrib2/:attrib_value2/address/:attrib3/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria["address."+req.params.attrib1] = req.params.attrib_value1;
	criteria["address."+req.params.attrib2] = req.params.attrib_value2;
	criteria["address."+req.params.attrib3] = req.params.attrib_value3;
	var showcriteria = {message: 'delete done',};
	showcriteria["address."+req.params.attrib1] = req.params.attrib_value1;
	showcriteria["address."+req.params.attrib2]=req.params.attrib_value2;	
	showcriteria["address."+req.params.attrib3]=req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});
app.delete('/grades/:attrib1/:attrib_value1/grades/:attrib2/:attrib_value2/grades/:attrib3/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["grades."+req.params.attrib2] = req.params.attrib_value2;
	criteria["grades."+req.params.attrib3] = req.params.attrib_value3;
	var showcriteria = {message: 'delete done',};
	showcriteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	showcriteria["grades."+req.params.attrib2]=req.params.attrib_value2;	
	showcriteria["grades."+req.params.attrib3]=req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});

/////////////////////////
app.delete('/grades/:attrib1/:attrib_value1/grades/:attrib2/:attrib_value2/grades/:attrib3/:attrib_value3/:attrib4/:rid', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["grades."+req.params.attrib2] = req.params.attrib_value2;
	criteria["grades."+req.params.attrib3] = req.params.attrib_value3;
	criteria[req.params.attrib4]=req.params.rid;
	var showcriteria = {message: 'delete done',};
	showcriteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	showcriteria["grades."+req.params.attrib2]=req.params.attrib_value2;	
	showcriteria["grades."+req.params.attrib3]=req.params.attrib_value3;
	showcriteria[req.params.attrib4]=req.params.rid;	

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
				
			else {
					if (results.length > 0) {
						return restaurant.find(criteria).remove(function(err){
				if (err) {
					res.status(500).json(err);
					throw err
				}
       				console.log('Restaurant removed!')
				res.status(200).json(showcriteria);
				db.close();
		});
						
					}
					else {
						res.status(200).json({message: 'No matching document'});
db.close();
					}
			}
		});
	});
});

//Find documents
app.get('/', function(req,res) {
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;http://jonathan2015.azurewebsites.net
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
		restaurant.find(function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/:attrib1/:attrib_value1', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
////////////////////
/*app.get('/gt/grades/score/:attrib_value1', function(req,res) {
	//var criteria = {};
	
	var criteria2={};
	criteria2[$gt]=req.params.attrib_value1;
	//criteria[req.params.attrib1] = req.params.attrib_value1;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);

		

		restaurant.find({},{grades.score:1},function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});

		/*restaurant.find(restaurant_id:criteria2,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});//
	});
});*/
/////////
app.get('/grades/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib] = req.params.attrib_value;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});

app.get('/address/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria["address."+req.params.attrib] = req.params.attrib_value;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/address/coord/:attrib_value1/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria["address.coord"] = req.params.attrib_value1;
	criteria["address.coord"] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/:attrib1/:attrib_value1/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/:attrib1/:attrib_value1/address/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria["address."+req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/address/:attrib2/:attrib_value2/:attrib1/:attrib_value1', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria["address."+req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/address/:attrib1/:attrib_value1/address/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria["address."+req.params.attrib1] = req.params.attrib_value1;
	criteria["address."+req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/:attrib1/:attrib_value1/grades/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria["grades."+req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/grades/:attrib2/:attrib_value2/:attrib1/:attrib_value1', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria["grades."+req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/grades/:attrib1/:attrib_value1/grades/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["grades."+req.params.attrib2] = req.params.attrib_value2;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});

app.get('/:attrib1/:attrib_value1/address/coord/:attrib_value2/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria["address.coord"] = req.params.attrib_value2;
	criteria["address.coord"] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/address/coord/:attrib_value2/:attrib_value3/:attrib1/:attrib_value1', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria["address.coord"] = req.params.attrib_value2;
	criteria["address.coord"] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/address/coord/:attrib_value2/:attrib_value3/grades/:attrib1/:attrib_value1', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["address.coord"] = req.params.attrib_value2;
	criteria["address.coord"] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/grades/:attrib1/:attrib_value1/address/coord/:attrib_value2/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["address.coord"] = req.params.attrib_value2;
	criteria["address.coord"] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/address/:attrib2/:attrib_value2/grades/:attrib1/:attrib_value1', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["address."+req.params.attrib2] = req.params.attrib_value2;


	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/grades/:attrib1/:attrib_value1/address/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["address."+req.params.attrib2] = req.params.attrib_value2;


	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/:attrib1/:attrib_value1/:attrib2/:attrib_value2/:attrib3/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria[req.params.attrib3] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});


app.get('/:attrib1/:attrib_value1/:attrib2/:attrib_value2/address/:attrib3/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria["address."+req.params.attrib3] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/:attrib1/:attrib_value1/address/:attrib3/:attrib_value3/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria["address."+req.params.attrib3] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/address/:attrib3/:attrib_value3/:attrib1/:attrib_value1/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria["address."+req.params.attrib3] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/address/:attrib1/:attrib_value1/address/:attrib2/:attrib_value2/address/:attrib3/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria["address."+req.params.attrib1] = req.params.attrib_value1;
	criteria["address."+req.params.attrib2] = req.params.attrib_value2;
	criteria["address."+req.params.attrib3] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/:attrib1/:attrib_value1/:attrib2/:attrib_value2/grades/:attrib3/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria["grades."+req.params.attrib3] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/:attrib1/:attrib_value1/grades/:attrib3/:attrib_value3/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria["grades."+req.params.attrib3] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/grades/:attrib3/:attrib_value3/:attrib1/:attrib_value1/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria["grades."+req.params.attrib3] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/grades/:attrib1/:attrib_value1/grades/:attrib2/:attrib_value2/grades/:attrib3/:attrib_value3', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib1] = req.params.attrib_value1;
	criteria["grades."+req.params.attrib2] = req.params.attrib_value2;
	criteria["grades."+req.params.attrib3] = req.params.attrib_value3;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/:attrib1/:attrib_value1/:attrib2/:attrib_value2/address/coord/:attrib_value3/:attrib_value4', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria["address.coord"] = req.params.attrib_value3;
	criteria["address.coord"] = req.params.attrib_value4;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/:attrib1/:attrib_value1/address/coord/:attrib_value3/:attrib_value4/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria["address.coord"] = req.params.attrib_value3;
	criteria["address.coord"] = req.params.attrib_value4;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});
app.get('/address/coord/:attrib_value3/:attrib_value4/:attrib1/:attrib_value1/:attrib2/:attrib_value2', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib1] = req.params.attrib_value1;
	criteria[req.params.attrib2] = req.params.attrib_value2;
	criteria["address.coord"] = req.params.attrib_value3;
	criteria["address.coord"] = req.params.attrib_value4;

	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var restaurant = mongoose.model('restaurant',restaurantSchema);
		restaurant.find(criteria,function(err,results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				
				console.log('Found: ',results.length);
				if (results.length > 0) {
				res.status(200).json(results);
				}
				else {
				res.status(200).json({message: 'No matching document'});
				}
			db.close();
			}
		});
	});
});

//Update documents 
//criteria: normal field, update: normal fields 
app.put('/:criteria_attribute/:criteria_attribute_value/',function(req,res){
	var criteria={};
	criteria[req.params.criteria_attribute]=req.params.criteria_attribute_value;
	var setData={};
	if(req.body.borough!=null)
	setData["borough"]=req.body.borough;
	if(req.body.cuisine!=null)
	setData["cuisine"]=req.body.cuisine;
	if(req.body.name!=null)
	setData["name"]=req.body.name;
	if(req.body.restaurant_id!=null)
	setData["restaurant_id"]=req.body.restaurant_id;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find(criteria, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update(criteria,{$set:setData},{multi:true},function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
			
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
	});
	console.log("HIHIHI");//
});

//criteria: normal field, update: address 
app.put('/:criteria_attribute/:criteria_attribute_value/address',function(req,res){
	var criteria={};
	criteria[req.params.criteria_attribute]=req.params.criteria_attribute_value;
	var setData={};
	//setData["address."+req.params.setData_attribute]=req.params.setData_attribute_value;
	//setData["address."+req.params.setData2_attribute]=req.params.setData2_attribute_value;
	if(req.body.street!=null)
	setData["address.street"]=req.body.street;
	if(req.body.zipcode!=null)
	setData["address.zipcode"]=req.body.zipcode;
	if(req.body.building!=null)
	setData["address.building"]=req.body.building;
	if(req.body.lon!=null || req.body.lat!=null){
		var c=[] //coordinates
		if(req.body.lon!=null)
		c.push(req.body.lon);
		if(req.body.lat!=null)
		c.push(req.body.lat);
		setData["address.coord"]=c;
	}
	

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find(criteria, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update(criteria,{$set:setData},{multi:true},function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
		
	});
	console.log("HIHIHI");//
});

//criteria: normal field, update: grades 
app.put('/:criteria_attribute/:criteria_attribute_value/grade',function(req,res){
	var criteria={};
	criteria[req.params.criteria_attribute]=req.params.criteria_attribute_value;
	var gradeObj={};
	//setData["address."+req.params.setData_attribute]=req.params.setData_attribute_value;
	//setData["address."+req.params.setData2_attribute]=req.params.setData2_attribute_value;
	if(req.body.date!=null)
	gradeObj["date"]=req.body.date;
	if(req.body.grade!=null)
	gradeObj["grade"]=req.body.grade;
	if(req.body.score!=null)
	gradeObj["score"]=req.body.score;
	
	

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find(criteria, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update(criteria,{$push:{grades:gradeObj}},{multi:true},function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
		
	});
	console.log("HIHIHI");//
});

//criteria: normal fieldx2, update: normal fields 
app.put('/:criteria_attribute/:criteria_attribute_value/:criteria_attribute2/:criteria_attribute2_value/',function(req,res){
	var criteria={};
	criteria[req.params.criteria_attribute]=req.params.criteria_attribute_value;
	criteria[req.params.criteria_attribute2]=req.params.criteria_attribute2_value;
	
	var setData={};
	if(req.body.borough!=null)
	setData["borough"]=req.body.borough;
	if(req.body.cuisine!=null)
	setData["cuisine"]=req.body.cuisine;
	if(req.body.name!=null)
	setData["name"]=req.body.name;
	if(req.body.restaurant_id!=null)
	setData["restaurant_id"]=req.body.restaurant_id;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find(criteria, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update(criteria,{$set:setData},{multi:true},function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
						db.close();
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
		
	});
	console.log("HIHIHI");//
});

//criteria: normal fieldx3, update: normal fields 
app.put('/:criteria_attribute/:criteria_attribute_value/:criteria_attribute2/:criteria_attribute2_value/:criteria_attribute3/:criteria_attribute3_value/',function(req,res){
	var criteria={};
	criteria[req.params.criteria_attribute]=req.params.criteria_attribute_value;
	criteria[req.params.criteria_attribute2]=req.params.criteria_attribute2_value;
	criteria[req.params.criteria_attribute3]=req.params.criteria_attribute3_value;
	
	var setData={};
	if(req.body.borough!=null)
	setData["borough"]=req.body.borough;
	if(req.body.cuisine!=null)
	setData["cuisine"]=req.body.cuisine;
	if(req.body.name!=null)
	setData["name"]=req.body.name;
	if(req.body.restaurant_id!=null)
	setData["restaurant_id"]=req.body.restaurant_id;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find(criteria, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update(criteria,{$set:setData},{multi:true},function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
						db.close();
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
		
	});
	console.log("HIHIHI");//
});

//criteria: normal fieldx4, update: normal fields 
app.put('/:criteria_attribute/:criteria_attribute_value/:criteria_attribute2/:criteria_attribute2_value/:criteria_attribute3/:criteria_attribute3_value/:criteria_attribute4/:criteria_attribute4_value/',function(req,res){
	var criteria={};
	criteria[req.params.criteria_attribute]=req.params.criteria_attribute_value;
	criteria[req.params.criteria_attribute2]=req.params.criteria_attribute2_value;
	criteria[req.params.criteria_attribute3]=req.params.criteria_attribute3_value;
	criteria[req.params.criteria_attribute4]=req.params.criteria_attribute4_value;
	
	var setData={};
	if(req.body.borough!=null)
	setData["borough"]=req.body.borough;
	if(req.body.cuisine!=null)
	setData["cuisine"]=req.body.cuisine;
	if(req.body.name!=null)
	setData["name"]=req.body.name;
	if(req.body.restaurant_id!=null)
	setData["restaurant_id"]=req.body.restaurant_id;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find(criteria, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update(criteria,{$set:setData},{multi:true},function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
						db.close();
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
		
	});
	console.log("HIHIHI");//
});


//criteria: address, update: normal fields 
app.put('/address/:criteria_attribute/:criteria_attribute_value/',function(req,res){
	var criteria={};
	criteria["address."+req.params.criteria_attribute]=req.params.criteria_attribute_value;
	
	
	var setData={};
	if(req.body.borough!=null)
	setData["borough"]=req.body.borough;
	if(req.body.cuisine!=null)
	setData["cuisine"]=req.body.cuisine;
	if(req.body.name!=null)
	setData["name"]=req.body.name;
	if(req.body.restaurant_id!=null)
	setData["restaurant_id"]=req.body.restaurant_id;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find(criteria, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update(criteria,{$set:setData}, {multi:true}, function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
						db.close();
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
		
	});
	console.log("HIHIHI");//
});

//criteria: address x2, update: normal fields 
app.put('/address/:criteria_attribute/:criteria_attribute_value/:criteria_attribute2/:criteria_attribute2_value/',function(req,res){
	var criteria={};
	criteria["address."+req.params.criteria_attribute]=req.params.criteria_attribute_value;
	criteria["address."+req.params.criteria_attribute2]=req.params.criteria_attribute2_value;
	
	var setData={};
	if(req.body.borough!=null)
	setData["borough"]=req.body.borough;
	if(req.body.cuisine!=null)
	setData["cuisine"]=req.body.cuisine;
	if(req.body.name!=null)
	setData["name"]=req.body.name;
	if(req.body.restaurant_id!=null)
	setData["restaurant_id"]=req.body.restaurant_id;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find(criteria, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update(criteria,{$set:setData}, {multi:true},function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
						db.close();
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
		
	});
	console.log("HIHIHI");//
});

//criteria: address x3, update: normal fields 
app.put('/address/:criteria_attribute/:criteria_attribute_value/:criteria_attribute2/:criteria_attribute2_value/:criteria_attribute3/:criteria_attribute3_value/',function(req,res){
	var criteria={};
	criteria["address."+req.params.criteria_attribute]=req.params.criteria_attribute_value;
	criteria["address."+req.params.criteria_attribute2]=req.params.criteria_attribute2_value;
	criteria["address."+req.params.criteria_attribute3]=req.params.criteria_attribute3_value;
	
	var setData={};
	if(req.body.borough!=null)
	setData["borough"]=req.body.borough;
	if(req.body.cuisine!=null)
	setData["cuisine"]=req.body.cuisine;
	if(req.body.name!=null)
	setData["name"]=req.body.name;
	if(req.body.restaurant_id!=null)
	setData["restaurant_id"]=req.body.restaurant_id;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find(criteria, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update(criteria,{$set:setData}, {multi:true},function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
						db.close();
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
		
	});
	console.log("HIHIHI");//
});

//criteria: address x4, update: normal fields 
app.put('/address/:criteria_attribute/:criteria_attribute_value/:criteria_attribute2/:criteria_attribute2_value/:criteria_attribute3/:criteria_attribute3_value/:criteria_attribute4/:criteria_attribute4_value/',function(req,res){
	var criteria={};
	criteria["address."+req.params.criteria_attribute]=req.params.criteria_attribute_value;
	criteria["address."+req.params.criteria_attribute2]=req.params.criteria_attribute2_value;
	criteria["address."+req.params.criteria_attribute3]=req.params.criteria_attribute3_value;
	criteria["address."+req.params.criteria_attribute4]=req.params.criteria_attribute4_value;
	
	var setData={};
	if(req.body.borough!=null)
	setData["borough"]=req.body.borough;
	if(req.body.cuisine!=null)
	setData["cuisine"]=req.body.cuisine;
	if(req.body.name!=null)
	setData["name"]=req.body.name;
	if(req.body.restaurant_id!=null)
	setData["restaurant_id"]=req.body.restaurant_id;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find(criteria, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update(criteria,{$set:setData}, {multi:true},function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
						db.close();
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
		
	});
	console.log("HIHIHI");//
});

//criteria: grades, update: normal fields 
app.put('/grade/:criteria_attribute/:criteria_attribute_value/',function(req,res){
	var criteria={};
	criteria[req.params.criteria_attribute]=req.params.criteria_attribute_value;
	
	var setData={};
	if(req.body.borough!=null)
	setData["borough"]=req.body.borough;
	if(req.body.cuisine!=null)
	setData["cuisine"]=req.body.cuisine;
	if(req.body.name!=null)
	setData["name"]=req.body.name;
	if(req.body.restaurant_id!=null)
	setData["restaurant_id"]=req.body.restaurant_id;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find({grades:{$elemMatch:criteria}}, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update({grades:{$elemMatch:criteria}},{$set:setData}, {multi:true},function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
						db.close();
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
		
	});
	console.log("HIHIHI");//
});

//criteria: grades x2, update: normal fields 
app.put('/grade/:criteria_attribute/:criteria_attribute_value/:criteria_attribute2/:criteria_attribute2_value/',function(req,res){
	var criteria={};
	criteria[req.params.criteria_attribute]=req.params.criteria_attribute_value;
	criteria[req.params.criteria_attribute2]=req.params.criteria_attribute2_value;
	
	var setData={};
	if(req.body.borough!=null)
	setData["borough"]=req.body.borough;
	if(req.body.cuisine!=null)
	setData["cuisine"]=req.body.cuisine;
	if(req.body.name!=null)
	setData["name"]=req.body.name;
	if(req.body.restaurant_id!=null)
	setData["restaurant_id"]=req.body.restaurant_id;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find({grades:{$elemMatch:criteria}}, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update({grades:{$elemMatch:criteria}},{$set:setData}, {multi:true},function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
						db.close();
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
		
	});
	console.log("HIHIHI");//
});

//criteria: grades x3, update: normal fields 
app.put('/grade/:criteria_attribute/:criteria_attribute_value/:criteria_attribute2/:criteria_attribute2_value/:criteria_attribute3/:criteria_attribute3_value/',function(req,res){
	var criteria={};
	criteria[req.params.criteria_attribute]=req.params.criteria_attribute_value;
	criteria[req.params.criteria_attribute2]=req.params.criteria_attribute2_value;
	criteria[req.params.criteria_attribute3]=req.params.criteria_attribute3_value;
	
	var setData={};
	if(req.body.borough!=null)
	setData["borough"]=req.body.borough;
	if(req.body.cuisine!=null)
	setData["cuisine"]=req.body.cuisine;
	if(req.body.name!=null)
	setData["name"]=req.body.name;
	if(req.body.restaurant_id!=null)
	setData["restaurant_id"]=req.body.restaurant_id;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.find({grades:{$elemMatch:criteria}}, function(err, results){
			if (err) {
				res.status(500).json(err);
				throw err
			}
			else {
				console.log('Found: ',results.length);
				if (results.length > 0) {
					Restaurant.update({grades:{$elemMatch:criteria}},{$set:setData}, {multi:true},function(err, results){
						if (err) {
							console.log("Error: " + err.message);
							res.write(err.message);
						}
						else {
							db.close();
							res.status(200).json({message: 'update done'});
							//res.end('No matching document',200);
						}
						db.close();
					});
				}
				else {
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
			//db.close();
			}
		});
		
		
	});
	console.log("HIHIHI");//
});



/*//criteria: address, update: normal field
app.put('/address/:criteria_attribute/:criteria_attribute_value/:setData_attribute/:setData_attribute_value',function(req,res){
	var criteria={};
	criteria["address."+req.params.criteria_attribute]=req.params.criteria_attribute_value;
	var setData={};
	setData[req.params.setData_attribute]=req.params.setData_attribute_value;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.update(criteria,{$set:setData}, {multi:true},function(err, results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				res.end('Done',200);
				//res.end('No matching document',200);
			}
		});
	});
	console.log("HIHIHI");//
});*/

/*//criteria: address, update: address
app.put('/address/:criteria_attribute/:criteria_attribute_value/address/:setData_attribute/:setData_attribute_value',function(req,res){
	var criteria={};
	criteria["address."+req.params.criteria_attribute]=req.params.criteria_attribute_value;
	var setData={};
	setData["address."+req.params.setData_attribute]=req.params.setData_attribute_value;

	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback){
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		
		Restaurant.update(criteria,{$set:setData},function(err, results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				res.end('Done',200);
				//res.end('No matching document',200);
			}
		});
	});
	console.log("HIHIHI");//
});*/

app.listen(process.env.PORT || 8099);
