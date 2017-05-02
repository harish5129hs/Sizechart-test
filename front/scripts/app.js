/*
logic for client side
*/

(function(argument) {
	
	var app={

	};

	//function to handle api errors
	app.apiErrorHandler = function(){
		//show error popup
		alert("APi error");
	}

	//functions for validating sizechart
	app.validateSizeChart = function(csvDataString){
		var apiUrl="/api/v1/validateCsv.json",
		data={
			csvString :csvDataString
		};
		$.ajax({
			url:apiUrl,
			data:data,
			method:"POST",
			success:function(response){
				

			},
			error:function(){
				app.apiErrorHandler();
			}
		});
	}

})();