var _ = require("underscore");

function areArraysEqual(arr1,arr2){
	var isEqual;
	if(arr1.length!==arr2.length){
		return false;
	}
	isEqual =  _.every(arr1,function(val){
		return _.contains(arr2,val);
	});
	return isEqual;
}

module.exports={
	areArraysEqual:areArraysEqual
};