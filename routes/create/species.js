var express  = require('express');
var mongoose = require('mongoose');
var router   = express.Router();

var Species = require('../../models/species');
var Genus   = require('../../models/genus');
var Family  = require('../../models/family');
var Order   = require('../../models/order');
var Class   = require('../../models/class');
var Phylum  = require('../../models/phylum');
var Domain  = require('../../models/domain');

var columnOrder = ["domain", "phylum", "class", "order", "family", "genus"];

var columnJSONList = {
        DOMAIN  : Domain,
        PHYLUM  : Phylum,
        CLASS   : Class,
        ORDER   : Order,
        FAMILY  : Family,
        GENUS   : Genus,
        SPECIES : Species
    }
   
//Column is either Species, Genus, Family, Order, Phylum or Domain
//finds the element and number
var findElement = function(element, Column) {
    Column.findOne({
        ename: element.ename
    }, function(err, item) {
        if (err)
            return console.log(err);
        return item;
    });
}

//This will find the element, see if it exists, and then save it.
var saveElementPC = function(elementChildModel, elementParent, ColumnParent, callback) {
    console.log(elementParent.ename);
    ColumnParent.findOne({
        ename: elementParent.ename
    }, function(err, item) {
        if (err)
            return console.log(err);
        var cparent = item;
        //If item exist, push the current object id to the member of the above
        if (cparent) {
            cparent.members.push(elementChildModel._id);
            //saveElement(cparent);
            elementChildModel.cparent = cparent._id;
            cparent.save(function(err, savedParent) {
                if (err)
                    return console.log(err);
                elementChildModel.save(function(err,
                    savedParent) {
                    if (err)
                        return console.log(err);
                    callback(null);
                })
            });
            //saveElement(elementChildModel);
            //found match


        } else {
            var saveParent = new ColumnParent(elementParent);
            saveParent.members.push(elementChildModel._id);
            saveParent.save(function(err, savedParent) {
                if (err)
                    return console.log(err);

                elementChildModel.cparent = savedParent._id;
                elementChildModel.save(function(err,savedChild) {
                    if (err)
                        return console.log(err);
                    callback(savedParent);

                });
            });

        }
    });
}

var addSpecieRecursion = function(row, savedChildModel) {
        if (row.columnsToBeFilled.length > 0) {
            var columnName = row.columnsToBeFilled.pop();
            var elementParent = {
                ename: row[columnName]
            }
            var Column = columnJSONList[columnName.toUpperCase()];
            saveElementPC(savedChildModel, elementParent, Column, function(
                savedChildModel) {
                if (savedChildModel === null)
                    return;
                else
                    addSpecieRecursion(row, savedChildModel);
            });
        }
    }

//Pass in a JSON object with every paramater, simplifies it for the front end
//We deal with the rest, easier to maintain.
//It'll break if you dont passs in the right column paramaters for the row
//Easy fix, we'd simply check the prototpes so no one fucks with our DB.
//CBA right now to do it.
var addSpecie = function(req, res, next) {
    var row = {};
    row.species = req.body.species;
    row.strain = req.body.strain;
    row.genome = req.body.genome;
    row.JSONCreate = req.body.JSONCreate;
    row.domain = req.body.domain;
    row.phylum = req.body.phylum;
    row.class = req.body.class;
    row.order = req.body.order;
    row.family = req.body.family;
    row.genus = req.body.genus;    
    
    var specie = new Species({
        ename: row['species'],
        strain: row['strain'],
        misc: row['misc'],
        genome: row['genome'],
        JSONCreated: row['JSONCreated']
    });
    
    row.columnsToBeFilled = columnOrder;

    specie.save(function(err, savedSpecie) {
        addSpecieRecursion(row, savedSpecie);
        res.send('Successfully saved ' + req.body.species + '\n');
    });
}

router.post('/create/specie',addSpecie)

module.exports = router;
