var mongoose = require('mongoose');
require('../lib/connection');

var Species = require('../models/species');
var Genus = require('../models/genus');
var Family = require('../models/family');
var Order = require('../models/order');
var Class = require('../models/class');
var Phylum = require('../models/phylum');
var Domain = require('../models/domain');
var addSpecie = require('../lib/species');
var fs = require('fs')

//inspired by http://techslides.com/convert-csv-to-json-in-javascript
fs.readFile('../database/modelspecies.csv', 'utf8', function(err, data){
	if(err){
		console.log(err);
		return;
	}
	
	var lines = data.split("\r");
    var headers = lines[0].split(",");
	
	var domain, phylum, clas, order, family, genus, species;
    
	for(var i=4; i<lines.length; i++) {
		//meant to say row, but was too lazy to rename
  	  	var column = {};

  	  	var currentline = lines[i].split(",");
 	   	//put species
  	  	for(var j=headers.length - 5;j<headers.length;j++){
  			  column[headers[j]] = currentline[j];
  	  	}
		column["domain"] = currentline[0];
		column["phylum"] = currentline[1];
		column["class"] = currentline[2];
		column["order"] = currentline[3];
		column["family"] = currentline[4];
		column["genus"] = currentline[5];
		
		addSpecie(column);
		return;
		
		
		
    }	
});




