var _  = require('underscore'),
	csvParser = require('./csvParser.js'),
	checkErrorInStructuredCSV = require("./errorCheckCsv.js").checkErrorInStructuredCSV;

function getBrandSpecificSizeChartData(parsedSizeChart,brands){
	var brandSizeChartData ={};
	brandSizeChartData.data=[];
	_.each(parsedSizeChart.data,function(sizeData){
		if(brands[sizeData.Brand]===1){
			brandSizeChartData.data.push(sizeData);
		}
	});
	return brandSizeChartData;
}

function appendExistingUpdateInformation(sizeChartCSV,brands){
	var parsedSizeChart = csvParser.parseCSVString(sizeChartCSV,true);
		parsedBrandChart_old = getBrandSpecificSizeChartData(parsedSizeChart,brands);
		csvParser.parseCSVInStructuredData(parsedBrandChart_old);
		checkErrorInStructuredCSV(parsedBrandChart_old);
		return parsedBrandChart_old;
}

module.exports={
	appendExistingUpdateInformation:appendExistingUpdateInformation
}