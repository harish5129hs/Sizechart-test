var express = require('express'),
	status = require('http-status'),
	validateApiHandler = require('./apiHandlers/validateApi.js'),
	uploadApiHandler = require('./apiHandlers/uploadApi.js'),
	updateApiHandler = require('./apiHandlers/updateApi.js');

module.exports = function(){
	var router = express.Router();

	router.post('/validateCSV.json',validateApiHandler);
	router.post('/uploadCSV.json',uploadApiHandler);
	router.post('/updateSizeChart.json',updateApiHandler);

	return router;
};
