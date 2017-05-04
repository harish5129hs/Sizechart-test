/*
logic for client side
*/

(function() {
	'use strict';
	
	var app={
		isValid:false,
		sfPath:"",
		updateCSVFlag:false,
		parsedCSV :"",
		headingRowFlag:false,
		JQUERY_SELECTORS:{
			submitBtn:'#submitCSVBtn',
			sfPathInput:'#sfPath',
			sizeChartInput:'#sizeChartInput',
			updateCheckBox:'#updateCB',
			validateModal:'#validateModal',
			cancelSubmit:'#cancel-submission',
			headingCheckBox:'#headingCB'
		}
	};

	//function to handle api errors
	app.apiErrorHandler = function(){
		//show error popup
		alert("APi error");
	}

	//function to handle validate api response
	app.validateApiResponseHandler = function(response){
		if(response.statusCode===33){
			//handle valid csv
			app.isValid=true;
			app.showCSVInTable(response);

		}else if(response.statusCode===0){
			//handle invalid csv
			app.isValid=false;
			app.showCSVInTable(response);
		}
	}

	//show parsed csv in modal popup
	app.showCSVInTable=function(response){
		var html='';

	}

	//functions for validating sizechart
	app.validateSizeChart = function(csvDataString,headingRowFlag){
		var apiUrl="/api/v1/validateCSV.json",
		data={
			csvString :csvDataString,
			headingRowFlag:headingRowFlag
		};
		$.ajax({
			url:apiUrl,
			data:data,
			method:"POST",
			success:function(response){
				console.log(response);
				app.validateApiResponseHandler(response);
			},
			error:function(){
				app.apiErrorHandler();
			}
		});
	}

	app.submitCSVForValidation = function(){
		console.log('hello');
		var csvString,
			headingRowFlag ;
		csvString = $(app.JQUERY_SELECTORS.sizeChartInput).val();
		app.sfPath  = $(app.JQUERY_SELECTORS.sfPath).val();
		app.updateCSVFlag = $(app.JQUERY_SELECTORS.updateCheckBox).is(":checked");
		app.headingRowFlag = headingRowFlag = $(app.JQUERY_SELECTORS.headingCheckBox).is(":checked");
		app.validateSizeChart(csvString,headingRowFlag); 
		$(app.JQUERY_SELECTORS.validateModal).modal('open');
	}

	app.cancelSubmitCSVHandler = function(){
		$(app.JQUERY_SELECTORS.validateModal).modal('close');
	}


	//all the event handlers
	$(document).ready(function(){
		$('.modal').modal();
		$(app.JQUERY_SELECTORS.submitBtn).on('click',app.submitCSVForValidation);
		$(app.JQUERY_SELECTORS.cancelSubmit).on('click',app.cancelSubmitCSVHandler);

	});
})();