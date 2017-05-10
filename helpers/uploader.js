var addSizeChart  = require("../sizeChartHelper/addSizeChart.js").addSizeChart;

function uploadSizeChart(csvString,headingRowFlag,updateCSVFlag,userEmail,sfPath,response){
	if(updateCSVFlag===true){
		//handle update in future
	}
	else{
		addSizeChart(csvString,userEmail,sfPath,response);

	}
}

module.exports={
	uploadSizeChart:uploadSizeChart
}