var PapaParse = require("papaparse"),
	sizeChartFields = require("../constants.js").sizeChartFields,
	requiredSizeChartFields  =require("../constants.js").requiredSizeChartFields,
	requiredSizeChartFields  =require("../constants.js").requiredSizeChartFields,
	permittedValues  = require("../constants.js").permittedValues,
	_ = require("underscore"),
	utilities = require("./utilities");


function checkRequiredValuesPresent(sizeData){
	var i,field;
	for(i=0;i<requiredSizeChartFields.length;i++){
		field =requiredSizeChartFields[i];
		sizeData[field].required=true;
		if(sizeData[field].value===""){
			sizeData[field].error = true;
			sizeData[field].errorCause = field+" can not be empty";
		}
	}
}

function checkValuesAreCorrect(sizeData){
	var field;
	for(field in permittedValues){
		if(permittedValues.hasOwnProperty(field)){
			if(sizeData[field].error!==true&&(_.contains(permittedValues[field],sizeData[field].value)===false)){
				sizeData[field].error = true;
				sizeData[field].errorCause = "Permitted value for"+field+" are "+permittedValues[field].join("/"); 
			}
		}
	}
}

function checkErrorInSizeChart(sizeData){
	var field;
	for(field in sizeData){
		if(sizeData.hasOwnProperty(field)){
			if(sizeData[field].error===true){
				return true;
			}
		}
	}
	return false;
}

function errorCheckingInParsedCSV(parsedCSV){
	//checking if fields are 36
	if(!utilities.areArraysEqual(parsedCSV.meta.fields,sizeChartFields)){
		parsedCSV.errorMSG = "Unable to  parse the CSV file ,  please verify.";
		parsedCSV.fieldsNotParsed=true;
		parsedCSV.statusCode = 0;
		parsedCSV.isValid = false;
	}
	return parsedCSV;
}


function checkErrorInStructuredCSV(parsedCSV){
	var noErrorInSizeChart;
	_.each(parsedCSV.structuredSizeChartData,function(sizeData){
		//check if value for required fields are  present
		checkRequiredValuesPresent(sizeData);
		//check value correct
		checkValuesAreCorrect(sizeData);
	});
	noErrorInSizeChart = _.every(parsedCSV.structuredSizeChartData,function(sizeData){
				return (!checkErrorInSizeChart(sizeData));
	});
	if(noErrorInSizeChart){
		parsedCSV.isValid=true;
		parsedCSV.statusCode = 1;
	}
	else{
		parsedCSV.isValid=false;
		parsedCSV.statusCode = 1;
	}
	return parsedCSV;
}


function checkIfThereIsUnmatchedFields(parsedCSV){
	if(parsedCSV.errors.length!==0){
		parsedCSV.statusCode =2;
	}
	return parsedCSV;
}

module.exports = {
	errorCheckingInParsedCSV:errorCheckingInParsedCSV,
	checkErrorInStructuredCSV:checkErrorInStructuredCSV,
	checkIfThereIsUnmatchedFields:checkIfThereIsUnmatchedFields
};