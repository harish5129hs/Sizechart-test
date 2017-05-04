var csvParser = require('../helpers/csvParser');

module.exports = function(req,res){
	var csvString = req.body.csvString,
		headingRowFlag = req.body.headingRowFlag,
		parsedCSV;

	console.log('User requested validateCSV.json api with heading flag ->'+headingRowFlag);	
	parsedCSV = csvParser.parseCSVString(csvString,headingRowFlag);

	res.json(csvParser.validateSizeChartCSV(parsedCSV));

}