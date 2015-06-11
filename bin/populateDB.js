var mongoose = require('mongoose');
require('../lib/connection');

var Species = require('../models/species');
var Genus = require('../models/genus');
var Family = require('../models/family');
var Order = require('../models/order');
var Class = require('../models/class');
var Phylum = require('../models/phylum');
var Domain = require('../models/domain');

var fs = require('fs')


//inspired by http://techslides.com/convert-csv-to-json-in-javascript

var data = fs.readFile('../database/modelspecies.csv', 'utf8', function(err, data){
	if(err){
		return console.log(err);
	}
	var lines = data.split("\r");
    var headers = lines[0].split(",");
    for(var i=1;i<lines.length;i++){
  	  	var obj = {};
  	  	var currentline = lines[i].split(",");
 	   	//put species
  	  	for(var j=headers.length - 5;j<headers.length;j++){
  			  obj[headers[j]] = currentline[j];
  	  	}
		Domain.create(obj, function(error){
			if(error){
				return console.error('Error: ' + error);
			}
			obj["PHYLUM"]
		});
		/*Species.create(obj, function(error){
			if(error){
				return console.error('Error: ' + error);
			}
			obj[headers[headers.length - 6]] = currentline[headers.length-6]
			Genus.create(obj, function(error){
				if(error){
					return console.error('Error: ' + error);
				}
			})
		});	*/
    }	
});




