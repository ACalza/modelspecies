require('./lib/connection');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
var species = require('./routes/species_route');

//midleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//routes
app.use(species);

module.exports = app;