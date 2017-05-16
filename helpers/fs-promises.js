var fs = require('fs');

function fsReadFile(fPath){
	return new Promise(function(resolve,reject){
		fs.readFile(fPath,"utf-8",function(err,data){
			if(err){
				console.log('failed to read file');
				reject(err);
			}
			resolve(data);
		});
	});
}


function fsWriteFile(fPath,data){
	return new Promise(function(resolve,reject){
		fs.writeFile(fPath,data,function(err,data){
			if(err){
				console.log('failed to write file');
				reject(err);
			}
			resolve(data);
		})
	})
}


module.exports ={
	fsReadFile:fsReadFile,
	fsWriteFile:fsWriteFile
}