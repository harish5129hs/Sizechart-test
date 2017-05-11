var addSizeChart  = require("../sizeChartHelper/addSizeChart.js").addSizeChart;

function uploadSizeChart(csvString,updateCSVFlag,userEmail,sfPath,response){
	
	return new Promise(function(resolve,reject){
		if(updateCSVFlag===true){
			//handle update in future
		}
		else{
			addSizeChart(csvString,userEmail,sfPath).then(function(){
				resolve();
			});

		}
	})
	
}

module.exports={
	uploadSizeChart:uploadSizeChart
}