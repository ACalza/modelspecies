var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


var test = function(req, res, next) {
    res.send('jokes on you fuckers');
};

router.post('/create/specie',
    test        
)

module.exports = router;
