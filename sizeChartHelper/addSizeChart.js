var fsp = require('../helpers/fs-promises.js');
var path = require('path');

function addSizeChart(csvString,userEmail,sfPath,response){
	console.log("Appending Size Chart at end.");
	var filepath = path.join(__dirname,"../testing/sizecharts_v3.csv");
		destpath = path.join(__dirname,"../testing/sizecharts_v3_new.csv");
	
	return new Promise(function(resolve,reject){

		fsp.fsReadFile(filepath).then(function(data){
			csvString = makeCSVReadyForAppend(csvString);
			data = data + csvString;
			fsp.fsWriteFile(destpath, data).then(function(err){
				console.log('The file has been saved!');
				resolve();
			}); 
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