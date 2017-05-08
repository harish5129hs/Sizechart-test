/*
logic for client side
*/

(function() {
	'use strict';
	
	var app={
		isValid:false,
		sfPath:"",
		updateCSVFlag:false,
		headingRowFlag:false,
		JQUERY_SELECTORS:{
			submitBtn:'#submitCSVBtn',
			sfPathInput:'#sfPath',
			sizeChartInput:'#sizeChartInput',
			updateCheckBox:'#updateCB',
			validateModal:'#validateModal',
			cancelSubmit:'#cancel-submission',
			headingCheckBox:'#headingCB',
			loader:'.loader-div',
			tableDiv:'.tableDiv',
			popupDiv:'.popup-content',
			invalidCSV:'#invalidCSVMsg',
			apiErrorMsg:'#apiErrorMsg',
			errorsList:"#errorsList"
		}
	};

	//function to handle api errors
	app.apiErrorHandler = function(){
		//show error popup
		$(app.JQUERY_SELECTORS.validateModal).modal('close');
		$(app.JQUERY_SELECTORS.apiErrorMsg).modal('close');
	}

	//function to highlight error rows
	app.highlightMismatchErrors = function(response){
		var i , selector;
		for(i=0;i<response.errors.length;i++){
			selector  = "#main-row-"+response.errors[i].row;
			$(selector).addClass('error');
			$(selector).addClass('tooltipped');
			$(selector).attr('data-position','top');
			$(selector).attr('data-delay','50');
			$(selector).attr('data-tooltip',response.errors[i].message);
			$(selector).find('td.required').each (function(key , val) {
			 	$(val).removeClass('required');
			});
		}
		$('.tooltipped').tooltip();
	}

	//function to push errors to error list
	app.pushErrorsToList = function(response){
		var i,
			html='';
		$(app.JQUERY_SELECTORS.errorsList).html('');
		html +='<li class="collection-item black-text">Errors are:</li>';

		for(i=0;i<response.parseErrors.length;i++){
			html = html + ('<li class="collection-item ">'+response.parseErrors[i]+'</li>');
		}
		$(app.JQUERY_SELECTORS.errorsList).html(html);

	}

	app.highlightRequiredHeadings = function(requiredSizeChartFields){
		var i=0;
		for(i=0;i<requiredSizeChartFields.length;i++){
			$('#th-'+requiredSizeChartFields[i]).addClass('required');
		}
	}

	//function to handle validate api response
	app.validateApiResponseHandler = function(response){
		if(response.statusCode===0){
			//invalid csv
			$(app.JQUERY_SELECTORS.validateModal).modal('close');
			$(app.JQUERY_SELECTORS.invalidCSV).modal('open');
		}
		else if(response.statusCode===1){
			//valid csv but may conatains errors
			app.isValid=response.isValid;
			app.showCSVInTable(response);
			app.pushErrorsToList(response);

		}else if(response.statusCode===2){
			//unmatched fields in csv
			app.isValid = response.isValid;
			app.showCSVInTable(response);
			app.highlightMismatchErrors(response);
			app.pushErrorsToList(response);
		}
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
		$(app.JQUERY_SELECTORS.loader).show();
	}

	app.cancelSubmitCSVHandler = function(){
		$(app.JQUERY_SELECTORS.validateModal).modal('close');
		$(app.JQUERY_SELECTORS.tableDiv).html('');
		app.isValid = false;
	}




	//show parsed csv in modal popup
	app.showCSVInTable=function(response){
		var i,j,
			field,
			html="<table class= 'bordered responsive-table centered'>"+
        			'<thead>'+
        				'<tr>';
			html += '<th>S No.</th>'
		for(i=0;i<response.sizeChartFields.length;i++){
			html +=('<th id="th-'+response.sizeChartFields[i]+'">'+response.sizeChartFields[i]+'</th>');
		}
		html +="</tr></thead><tbody>";
		for(i=0;i<response.structuredSizeChartData.length;i++){
			html +="<tr id='main-row-"+i+"''>";
			html += ("<td>"+(i+1)+"</td>");
			for(j=0;j<response.sizeChartFields.length;j++){
				field=response.sizeChartFields[j];
				html +="<td class='";
				html +=	(response.structuredSizeChartData[i][field].required? "required ": "");
				html +=	(response.structuredSizeChartData[i][field].error?("error tooltipped ' data-position='top' data-delay='50' data-tooltip='"+response.structuredSizeChartData[i][field].errorCause+"'"):" ' ");
				html += ">"+response.structuredSizeChartData[i][field].value+"</td>";
			}
			html +="</tr>";
		}
		html += "</tbody></table>";

		$(app.JQUERY_SELECTORS.loader).fadeOut("fast",function(){
			$(app.JQUERY_SELECTORS.popupDiv).fadeIn("fast",function(){
				$('ul.tabs').tabs();
			});
		});
		$('.errorMSG').hide();
		if(response.isValid===false){
			$('.errorMSG').show();
		}
		$(app.JQUERY_SELECTORS.tableDiv).html(html);
		$('.tooltipped').tooltip();
		app.highlightRequiredHeadings(response.requiredSizeChartFields);


	}


	//all the event handlers
	$(document).ready(function(){
		$('.modal').modal({
			dismissible: false
		});
		$(app.JQUERY_SELECTORS.submitBtn).on('click',app.submitCSVForValidation);
		$(app.JQUERY_SELECTORS.cancelSubmit).on('click',app.cancelSubmitCSVHandler);
		$(app.JQUERY_SELECTORS.popupDiv).hide();
		$('.errorMSG').hide();

	});
})();