var PapaParse = require("papaparse"),
	sizeChartFields = require("../constants.js").sizeChartFields,
	requiredSizeChartFields  =require("../constants.js").requiredSizeChartFields,
	_ = require("underscore");


function parseCSVString(csvString,headingRowFlag){
	return PapaParse.parse(csvString,{
		header : headingRowFlag,
		delimiter : ","
	});
}

function errorCheckingInParsedCSV(parsedCSV){
	//checking if fields are 36
	if(parsedCSV.meta.fields.length!==sizeChartFields.length){
		parsedCSV.errorMSG = "Unable to  parse the CSV file ,  please verify.";
		parsedCSV.fieldsNotParsed=true;
		parsedCSV.isValid = false;
	}
	return parsedCSV;
}

function parseCSVInStructuredData(parsedCSV){
	var structuredSizeChartData=[],i,j,
		fieldsArray = sizeChartFields,sizeObj,
		field;

	for(i=0;i<parsedCSV.data.length;i++){
		sizeObj={};
		sizeData = parsedCSV.data[i];
		for(j=0;j<fieldsArray.length;j++){
			var field  =fieldsArray[j];
			sizeObj[field] ={
				value :sizeData[field] ? sizeData[field]:"",
				isEmpty : sizeData[field] ? false :true,
				error : false
			}
		}
		structuredSizeChartData.push(sizeObj);
	}
	parsedCSV.structuredSizeChartData = structuredSizeChartData;
	return parsedCSV;

}

function checkErrorInStructuredCSV(parsedCSV){

}

function validateSizeChartCSV(parsedCSV){
	parsedCSV = errorCheckingInParsedCSV(parsedCSV);
	if(parsedCSV.fieldsNotParsed===true){
		return parsedCSV;
	}
	parsedCSV = parseCSVInStructuredData(parsedCSV);
	return parsedCSV;

}

module.exports = {
	parseCSVString:parseCSVString,
	validateSizeChartCSV:validateSizeChartCSV
}