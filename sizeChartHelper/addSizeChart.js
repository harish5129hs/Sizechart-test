var fs = require('fs');
var path = require('path');

function addSizeChart(csvString,userEmail,sfPath,response){
	console.log("Appending Size Chart at end.");
	var filepath = path.join(__dirname,"../testing/sizecharts_v3.csv");
		destpath = path.join(__dirname,"../testing/sizecharts_v3_new.csv");
	fs.readFile(filepath, function(err, data){
		if (err) {
			console.log(err);
			throw err;
		}
		csvString = makeCSVReadyForAppend(csvString);
		data = data + csvString;
		fs.writeFile(destpath, data, function(err){
			if (err) {
				console.log(err);
				throw err;
			}
			console.log('The file has been saved!');
			response.json({statusCode:1,message:"Size chart uploaded successfully." })
		});

	  
	});
}


function makeCSVReadyForAppend(csvString){
	var sizeArr=[];
	sizeArr = csvString.split('\n');
	sizeArr.splice(0,1);
	csvString = sizeArr.join('\n');
	return csvString;
}

module.exports={
	addSizeChart:addSizeChart
}