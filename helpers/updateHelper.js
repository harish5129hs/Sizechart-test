var fsp = require('./fs-promises.js'),
	path=require('path'),
	_ = require('underscore'),
	updateCSVParser = require('./updateCSVParser');

function getBrandsFromParsedData(parsedCSV){
	var brands={};
	_.each(parsedCSV.data,function(sizeData){
		if(brands[sizeData.Brand]!==1){
			brands[sizeData.Brand]=1;
		}
	});
	return brands;
}

function addExistingSizeChartInformation(parsedCSV){
	
	var filePath = path.join(__dirname,"../testing/sizecharts_v3.csv");
		brands = getBrandsFromParsedData(parsedCSV);

	console.log("adding existing information ");

	return new Promise(function(resolve,reject){
		fsp.fsReadFile(filePath).then(function(data){

			parsedCSV.existingSizeChart = updateCSVParser.appendExistingUpdateInformation(data,brands);
			resolve(parsedCSV);	

		}).catch(function(err){

			console.log(err);
			parsedCSV.statusCode = 1;
			parsedCSV.fileErrorMsg = "Failed to read sizechart file from directory";
			resolve(parsedCSV);

		});

	});
}

module.exports ={
	addExistingSizeChartInformation:addExistingSizeChartInformation
}