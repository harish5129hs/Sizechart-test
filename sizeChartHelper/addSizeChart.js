var fs = require('fs');

function addSizeChart(csvString,userEmail,sfPath){
	var filepath = sfPath+"/testing/sizecharts_v3.csv";
		destpath = sfPath+"/testing/sizecharts_v3_new.csv"
	fs.readFile(filepath, function(err, data){
		if (err) {
			console.log(err);
			throw err;
		}
		data += csvString;
		fs.writeFile(destpath, data, function(err){
			if (err) {
				console.log(err);
				throw err;
			}
			console.log('The file has been saved!');
		});

	  
	});
}