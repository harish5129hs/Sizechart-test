var csvParser = require('../helpers/csvParser'),
	updateHelper = require('../helpers/updateHelper.js');

module.exports = function(req,res){
	var csvString = req.body.csvString,
		headingRowFlag = req.body.headingRowFlag,
		updateCSVFlag = req.body.updateCSVFlag,
		parsedCSV;

	console.log('User requested updateSizeChart.json api with heading flag ->'+headingRowFlag);	
	parsedCSV = csvParser.parseCSVString(csvString,headingRowFlag);
	csvParser.validateSizeChartCSV(parsedCSV);
	if(parsedCSV.statusCode===0){
		//invalid csv , unable to parse
		res.json(parsedCSV);
	}else{
		console.log("parsed CSV properly , updating");
		updateHelper.addExistingSizeChartInformation(parsedCSV).then(function(parsedCSV){
			res.json(parsedCSV);
		});	
	}

};