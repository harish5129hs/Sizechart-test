var BabyParse = require("papaparse"),
	sizeChartFields = require("../constants.js").sizeChartFields,
	requiredSizeChartFields = require("../constants.js").requiredSizeChartFields,
	_ = require("underscore");
	errorCheckingInParsedCSV = require("./errorCheckCsv.js").errorCheckingInParsedCSV,
	checkErrorInStructuredCSV = require("./errorCheckCsv.js").checkErrorInStructuredCSV,
	checkIfThereIsUnmatchedFields = require("./errorCheckCsv.js").checkIfThereIsUnmatchedFields;


function parseCSVString(csvString,headingRowFlag){
	var config ={
		delimiter : ",",
		header : headingRowFlag
	};
	return BabyParse.parse(csvString,config);
}


function parseCSVInStructuredData(parsedCSV){
	var structuredSizeChartData=[],i,j,
		fieldsArray = sizeChartFields,sizeObj,
		field;

	for(i=0;i<parsedCSV.data.length;i++){
		sizeObj={};
		sizeData = parsedCSV.data[i];
		for(j=0;j<fieldsArray.length;j++){
			field  =fieldsArray[j];
			sizeObj[field] ={
				value :sizeData[field] ? sizeData[field]:"",
				isEmpty : sizeData[field] ? false :true,
				error : false
			};
		}
		structuredSizeChartData.push(sizeObj);
	}
	parsedCSV.structuredSizeChartData = structuredSizeChartData;
	parsedCSV.sizeChartFields = sizeChartFields;
	parsedCSV.requiredSizeChartFields = requiredSizeChartFields;
	return parsedCSV;

}



function validateSizeChartCSV(parsedCSV){
	errorCheckingInParsedCSV(parsedCSV);
	if(parsedCSV.fieldsNotParsed===true){
		return parsedCSV;
	}
	parseCSVInStructuredData(parsedCSV);
	checkErrorInStructuredCSV(parsedCSV);
	checkIfThereIsUnmatchedFields(parsedCSV);
	parsedCSV.parseErrors=[];
	addParsedErrors(parsedCSV);
	return parsedCSV;

}

//add errors to response , so it can be shown alongside
function addParsedErrors(parsedCSV){
	var i , sizeData,errorMSG;
	for(i=0;i<parsedCSV.structuredSizeChartData.length;i++){
		sizeData = parsedCSV.structuredSizeChartData[i];
		for(field in sizeData){
			if(sizeData.hasOwnProperty(field)){
				if(sizeData[field].error){
					errorMSG  = "On Row "+(i+1)+" : "+sizeData[field].errorCause;
					parsedCSV.parseErrors.push(errorMSG);
				}
			}
		}
	}

	for(i=0;i<parsedCSV.errors.length;i++){
		errorMSG  = "On Row "+(parsedCSV.errors[i].row+1)+" : "+parsedCSV.errors[i].message;
		parsedCSV.parseErrors.push(errorMSG);
	}

	return parsedCSV;
}

module.exports = {
	parseCSVString:parseCSVString,
	validateSizeChartCSV:validateSizeChartCSV
};