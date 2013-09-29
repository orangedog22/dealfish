var testAnnotation = Titanium.Map.createAnnotation ({
	latitude: 33.74511,
	longitude: -84.38993,
	title: "Test",
	subtitle: "Test Subtitle", 
	pincolor: Titanium.Map.ANNOTATION_GREEN,
	animate: true,
	myid: 1
});
var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region:{latitude:33.74511, longitude:-84.38993, latitudeDelta:0.5, longitudeDelta:0.5},
    animate:true,
    regionFit:true,
    userLocation:true, 
    visible: true, 
    annotations:[testAnnotation]
});

var track_button = Ti.UI.createButton({
	bottom:55,
	width:'90%',
	title:"Track Location",
	zIndex:10,
	backgroundColor:'#DDD'
});

MainWindow.add(track_button);


MainWindow.add(mapview);