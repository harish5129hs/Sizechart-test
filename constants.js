var sizeChartFields = ["hide","Brand","Sub-vendor","Type","ProductType","Source","Size","Size Qualifier","Bust Min","Bust Max","Waist Min","Waist Max","High Hip Min","High Hip Max","Hip Min","Hip Max","Girth Min","Girth Max","Length Min","Length Max","Arm Hole","inseam-short","inseam-regular","inseam-long","Sleve length","Comment","Show-In-Anchor-Brands","Private-Label","Carry-Inventory","popular-brand","popular-brand-rank","Thigh min","Thigh max","dummy5","dummy6","dummy7"];
var requiredSizeChartFields = ["Brand","Sub-vendor","ProductType","Size","Show-In-Anchor-Brands","Carry-Inventory","popular-brand","popular-brand-rank"];
var permittedValues = {
	"Show-In-Anchor-Brands":["YES","NO"],
	"Carry-Inventory":["YES","NO"],
	"popular-brand":["TRUE","FALSE"]
};

module.exports={
	sizeChartFields:sizeChartFields,
	requiredSizeChartFields:requiredSizeChartFields,
	permittedValues:permittedValues
};