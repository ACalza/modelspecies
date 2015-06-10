var express = require('express');
var mongoose = require('mongoose');
var Species = mongoose.model('Species');
var router = express.Router();

//test route
router.get("/species", function(req, res, next){
	res.send("hello world, testie");
})

router.post("/add", function(req, res, next){
	Species.create(req.body, function(error){
		if(error){
			return res.send('Error: ' + error);
		}
		res.send("successfully added");
	});
	
})



module.exports = router;