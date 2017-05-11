var csvParser = require('../helpers/csvParser');
var uploadSizeChart = require('../helpers/uploader.js').uploadSizeChart;

module.exports = function(req,res){
	var csvString = req.body.csvString,
		headingRowFlag = req.body.headingRowFlag,
		updateCSVFlag = req.body.updateCSVFlag,
		userEmail = req.body.userEmail,
		sfPath = req.body.sfPath,
		parsedCSV;

	console.log('User requested upload.json api with heading flag ->'+headingRowFlag+" updateCSVFlag -> "+updateCSVFlag+" userEmail ->"+userEmail);	
	parsedCSV = csvParser.parseCSVString(csvString,headingRowFlag);
	csvParser.validateSizeChartCSV(parsedCSV);
	if(parsedCSV.isValid===false){
		res.json({statusCode:0,message:"Not a valid size chart, can't upload" });
	}
	else{
		console.log("Valid csv , uploading it.");
		uploadSizeChart(csvString,updateCSVFlag,userEmail,sfPath).then(function(){
			res.json({statusCode:1,message:"Size chart uploaded successfully." });
		}).catch(function(err){
			console.log(err);
			res.json({
				statusCode:2,
				message:"Failed to upload sizechart." ,
				error:err
			});
		});
	}

};