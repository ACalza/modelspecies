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
  	  	var s = {}, g = {}, f ={}, o= {}, c = {}, p = {}, d = {};
  	  	var currentline = lines[i].split(",");
 	   	//put species
  	  	for(var j=headers.length - 5;j<headers.length;j++){
  			  s[headers[j]] = currentline[j];
  	  	}
		s.ename = currentline[6];
		g.ename = currentline[5];
		f.ename = currentline[4];
		o.ename = currentline[3];
		c.ename = currentline[2];
		p.ename = currentline[1];
		d.ename = currentline[0];
		
		addSpecie(s, g, f, o, c, p, d);
		return; 
		
		
    }	
});




