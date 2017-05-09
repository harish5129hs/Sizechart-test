var express = require('express');
var status = require('http-status');
var validateApiHandler = require('./apiHandlers/validateApi.js');
var uploadApiHandler = require('./apiHandlers/uploadApi.js')

module.exports = function(){
	var router = express.Router();

	router.post('/validateCSV.json',validateApiHandler);
	router.post('/uploadCSV.json',uploadApiHandler);

	return router;
};
