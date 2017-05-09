var addSizeChart  = require("sizeChartHelper/addSizeChart.js").addSizeChart;

function uploadSizeChart(csvString,headingRowFlag,updateCSVFlag,userEmail,sfPath){
	if(updateCSVFlag){
		//handle update in future
	}
	else{
		addSizeChart(csvString,userEmail,sfPath);

	}
}

module.exports={
	uploadSizeChart:uploadSizeChart
}