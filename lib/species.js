var mongoose = require('mongoose');
var Species = require('../models/species');
var Genus = require('../models/genus');
var Family = require('../models/family');
var Order = require('../models/order');
var Class = require('../models/class');
var Phylum = require('../models/phylum');
var Domain = require('../models/domain');

var async = require('async');
var block = require('node-block').block;


//static
var columnOrder = ["domain", "phylum", "class", "order", "family", "genus"];

var columnJSONList = {
	DOMAIN: Domain,
	PHYLUM: Phylum,
	CLASS: Class,
	ORDER: Order,
	FAMILY: Family,
	GENUS: Genus,
	SPECIES: Species	
}

var saveElement = function(callback){
	
}

var saveElementPC = function(elementChildModel, elementParent, ColumnParent, fcallback){
		
		async.waterfall([
			function(callback){
				ColumnParent.findOne({ename: elementParent.ename}, function(err, item){
					if(err)
						callback(err);
					callback(null, item);
				});
			},
			function(elementParentModel, callback){
				if(elementParentModel){
					elementParentModel.members.push(elementChildModel._id);
					elementChildModel.cparent = elementParentModel._id;
					
				}else{
					elementParentModel = new ColumnParent(elementParent);
				}
				callback(null, elementChildModel, elementParentModel);
			},
			function(elementChildModel, elementParentModel, callback){
				elementParentModel.save(function(err, savedParent){
					if(err)
						callback(err)
					elementChildModel.cparent = savedParent._id;
					elementChildModel.save(function(err, savedChild){
						if(err)
							return callback(err)
						callback(null, savedParent);
						
					});
				});
			},
			function(row, savedChildModel, callback){
				if(row.columnsToBeFilled.length > 0){
					var columnName = row.columnsToBeFilled.pop();
					var elementParent = {
						ename: row[columnName]
					}
					var Column = columnJSONList[columnName.toUpperCase()];
					saveElementPC(savedChildModel, elementParent, Column, function(savedChildModel){
						if(savedChildModel === null)
							callback(null, "done");
						else
							self(row, savedChildModel);
					});
				}else
					callback(null, "done")
			}
			
		], function(err, savedParent){
			if(err)
				return console.log(err);
			console.log(savedParent);
			fcallback(savedParent);
		});
}

//This will find the element, see if it exists, and then save it.
var t_saveElementPC = function(elementChildModel, elementParent, ColumnParent, callback){
	ColumnParent.findOne({ename: elementParent.ename}, function(err, item){
		if(err)
			return console.log(err);
		var cparent = item;
		//If item exist, push the current object id to the member of the above
		if(cparent){
			cparent.members.push(elementChildModel._id);
			elementChildModel.cparent = cparent._id;
			cparent.save(function(err, savedParent){
				if(err)
					return console.log(err);
				elementChildModel.save(function(err, savedParent){
					if(err)
						return console.log(err);
					
					callback(null);
				})
			});
		}else{
			var saveParent = new ColumnParent(elementParent);
			saveParent.members.push(elementChildModel._id);
			saveParent.save(function(err, savedParent){
				if(err)
					return console.log(err);
				elementChildModel.cparent = savedParent._id;
				elementChildModel.save(function(err, savedChild){
					if(err)
						return console.log(err);
					callback(savedParent);
						
				});
			});
		
		}
	});
}

var addSpecieRecursion = function(row, savedChildModel){
	if(row.columnsToBeFilled.length > 0){
		var columnName = row.columnsToBeFilled.pop();
		var elementParent = {
			ename: row[columnName]
		}
		var Column = columnJSONList[columnName.toUpperCase()];
		saveElementPC(savedChildModel, elementParent, Column, function(savedChildModel){
			if(savedChildModel === null)
				return;
			else
				console.log("done2");
				//addSpecieRecursion(row, savedChildModel);
		});
	}
}
//Pass in a JSON object with every paramater, simplifies it for the front end
//We deal with the rest, easier to maintain.
//It'll break if you dont passs in the right column paramaters for the row
//Easy fix, we'd simply check the prototpes so no one fucks with our DB.
//CBA right now to do it.
var addSpecie = function(row, callback){
	var specie = new Species({
			ename: row["species"],
			strain: row["strain"],
			misc: row["misc"],
			genome: row["genome"],
			JSONCreated: row["JSONCreated"]
		}
	);
	row.columnsToBeFilled = columnOrder;
	
	async.waterfall([
		function(callback){
			specie.save(function(err, savedSpecie){
				var ColumnParent = columnJSONList[row.columnsToBeFilled.pop().toUpperCase()];
				callback(null, ColumnParent);
		});
	},
		function(ColumnParent, elementParent, callback){
			ColumnParent.findOne({ename: elementParent.ename}, function(err, item){
				if(err)
					callback(err);
				callback(null, item);
			});
		},
		function(elementParentModel, callback){
			if(elementParentModel){
				elementParentModel.members.push(elementChildModel._id);
				elementChildModel.cparent = elementParentModel._id;
				
			}else{
				elementParentModel = new ColumnParent(elementParent);
			}
			callback(null, elementChildModel, elementParentModel);
		},
		function(elementChildModel, elementParentModel, callback){
			elementParentModel.save(function(err, savedParent){
				if(err)
					callback(err)
				elementChildModel.cparent = savedParent._id;
				elementChildModel.save(function(err, savedChild){
					if(err)
						return callback(err)
					callback(null, savedParentModel);
					
				});
			});
		},
		function(savedChildModel, callback){
			if(row.columnsToBeFilled.length > 0){
				var columnName = row.columnsToBeFilled.pop();
				var elementParent = {
					ename: row[columnName]
				}
				var Column = columnJSONList[columnName.toUpperCase()];
				saveElementPC(savedChildModel, elementParent, Column, function(savedChildModel){
					if(savedChildModel === null)
						callback(null, "done");
					else
						self(row, savedChildModel);
				});
			}else
				callback(null, "done")
		}
		
	], function(err, savedParent){
		if(err)
			return console.log(err);
		console.log(savedParent);
		fcallback(savedParent);
	});
	
	

}

module.exports = addSpecie;