//Hello!

var MainWindow = Ti.UI.createWindow({
	width:'100%',
	height:'100%',
	backgroundColor:'#fff'
});
Ti.Geolocation.purpose = "Meal Deals will track your location to show your deals in your area.";
/*
var view = Ti.UI.createView({
	width:'50%',
	height:'13%',
	top:0,
	backgroundColor:'#123456'
});

var button = Ti.UI.createButton({
	bottom:25,
	width:'90%',
	title:"Hello World"
});

button.addEventListener('click', function(){
	alert("Hello World!");
});
*/
Ti.include("globalVars.js");
Ti.include("db/fetch.js");
Ti.include("locations.js");
Ti.include("map/map.js");

var button = Ti.UI.createButton({
	bottom:25,
	width:'90%',
	zIndex:10,
	backgroundColor:'#DDD',
	title:"Get my special!"
});

var list_button = Ti.UI.createButton({
	top:25, 
	width:'90%',
	zIndex:10, 
	backgroundColor:'#DDD',
	title:"List restaurants"
});
MainWindow.add(button);
MainWindow.add(list_button);
MainWindow.open();

button.addEventListener('click', function(){
	setPins();
});
