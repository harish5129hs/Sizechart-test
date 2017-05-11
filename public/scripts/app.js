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
		userEmail:"",
		JQUERY_SELECTORS:{
			submitBtn:'#submitCSVBtn',
			sfPathInput:'#sfPath',
			userEmail:'#userEmail',
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
			errorsList:"#errorsList",
			uploadSizeChartBtn:"#postSizeChart-Btn",
			uploadSuccessMOdal:'#upload-success'
		}
	};

	//function to render html
	app.getTableRenderHtml = function(response){
		var i,j,field,
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
		return html;
	}


	//show parsed csv in modal popup
	app.showCSVInTable=function(response){
		var html= app.getTableRenderHtml(response);

		$(app.JQUERY_SELECTORS.loader).fadeOut("fast",function(){
			$(app.JQUERY_SELECTORS.popupDiv).fadeIn("fast",function(){
				$('ul.tabs').tabs();
			});
		});
		$('.errorMSG').hide();
		$(app.JQUERY_SELECTORS.uploadSizeChartBtn).removeClass('disabled');
		if(response.isValid===false){
			$('.errorMSG').show();
			$(app.JQUERY_SELECTORS.uploadSizeChartBtn).addClass('disabled');
		}
		$(app.JQUERY_SELECTORS.tableDiv).html(html);
		$('.tooltipped').tooltip();
		app.highlightRequiredHeadings(response.requiredSizeChartFields);


	}

	//function to handle api errors
	app.apiErrorHandler = function(){
		//show error popup
		$(app.JQUERY_SELECTORS.validateModal).modal('close');
		$(app.JQUERY_SELECTORS.apiErrorMsg).modal('open');
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


	//helper function to highlight table heading required fields row
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
			app.isValid = false;
			app.showCSVInTable(response);
			app.highlightMismatchErrors(response);
			app.pushErrorsToList(response);
		}
	}



	//functions for validating sizechart to make api call
	app.validateSizeChart = function(csvDataString,headingRowFlag){
		var apiUrl="/api/v1/validateCSV.json",
		data={
			csvString :csvDataString,
			headingRowFlag:headingRowFlag
		};

		$(app.JQUERY_SELECTORS.validateModal).modal('open');
		$(app.JQUERY_SELECTORS.loader).show();

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

	//function to handle update api response
	app.updateApiResponseHandler  = function(response){

	}

	//function called to update Size Chart to update existing sizechart
	app.updateSizeChart  = function(csvString,headingRowFlag,updateCSVFlag){
	var apiUrl="/api/v1/updateSizeChart.json",
		data={
			csvString :csvString,
			headingRowFlag:headingRowFlag,
			updateCSVFlag:updateCSVFlag
		};

		$(app.JQUERY_SELECTORS.validateModal).modal('open');
		$(app.JQUERY_SELECTORS.loader).show();

		$.ajax({
			url:apiUrl,
			data:data,
			method:"POST",
			success:function(response){
				console.log(response);
				app.updateApiResponseHandler(response);
			},
			error:function(){
				app.apiErrorHandler();
			}
		});
	}

	//function called on validate btn click
	app.submitCSVForValidation = function(){
		console.log('hello');
		var csvString,
			headingRowFlag,
			updateCSVFlag ;
		app.csvString  = csvString = $(app.JQUERY_SELECTORS.sizeChartInput).val();
		app.sfPath  = $(app.JQUERY_SELECTORS.sfPath).val();
		updateCSVFlag = app.updateCSVFlag = $(app.JQUERY_SELECTORS.updateCheckBox).is(":checked");
		app.headingRowFlag = headingRowFlag = $(app.JQUERY_SELECTORS.headingCheckBox).is(":checked");
		app.userEmail = $(app.JQUERY_SELECTORS.userEmail).val();

		if(updateCSVFlag===true){
			app.updateSizeChart(csvString,headingRowFlag,updateCSVFlag);
		}
		else{
			app.validateSizeChart(csvString,headingRowFlag); 
		}
	}

	//function called on cancel btn click
	app.cancelSubmitCSVHandler = function(){
		$(app.JQUERY_SELECTORS.validateModal).modal('close');
		$(app.JQUERY_SELECTORS.tableDiv).html('');
		$(app.JQUERY_SELECTORS.popupDiv).hide();
		app.isValid = false;
	}

	//function to handle update api response
	app.uploadApiResponseHandler = function(response){
		if(response.statusCode===1){
			//successful 
			$(app.JQUERY_SELECTORS.validateModal).modal('close');
			$(app.JQUERY_SELECTORS.uploadSuccessMOdal).modal('open');
			app.resetInputFields();
		}
		else if(response.statusCode===0){
			//failed
			$(app.JQUERY_SELECTORS.validateModal).modal('close');
			$(app.JQUERY_SELECTORS.invalidCSV).modal('open');
		}
	} 


	app.resetInputFields = function(){
		$(app.JQUERY_SELECTORS.sizeChartInput).val('');
		$(app.JQUERY_SELECTORS.sizeChartInput).trigger('autoresize');
		$(app.JQUERY_SELECTORS.sfPathInput).val('');
		$(app.JQUERY_SELECTORS.userEmail).val('');
		$(app.JQUERY_SELECTORS.updateCheckBox).prop('checked', false);
		$(app.JQUERY_SELECTORS.popupDiv).hide('');

	}

	//function called on submit btn click
	app.uploadSizeChart = function(){
		var apiUrl="/api/v1/uploadCSV.json",
		data={
			csvString :app.csvString,
			headingRowFlag:app.headingRowFlag,
			updateCSVFlag:app.updateCSVFlag,
			userEmail:app.userEmail
		};
		$.ajax({
			url:apiUrl,
			data:data,
			method:"POST",
			success:function(response){
				console.log(response);
				app.uploadApiResponseHandler(response);
			},
			error:function(){
				app.apiErrorHandler();
			}
		});
	}


	//all the event handlers
	$(document).ready(function(){
		$('.modal').modal({
			dismissible: false
		});
		$(app.JQUERY_SELECTORS.submitBtn).on('click',app.submitCSVForValidation);
		$(app.JQUERY_SELECTORS.uploadSizeChartBtn).on('click',app.uploadSizeChart);
		$(app.JQUERY_SELECTORS.cancelSubmit).on('click',app.cancelSubmitCSVHandler);
		$(app.JQUERY_SELECTORS.popupDiv).hide();
		$('.errorMSG').hide();

	});
})();