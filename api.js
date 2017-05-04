var express = require('express');
var status = require('http-status');
var validateApiHandler = require('./apiHandlers/validateApi.js');

module.exports = function(){
	var router = express.Router();

	router.post('/validateCSV.json',validateApiHandler);

	return router;
}
