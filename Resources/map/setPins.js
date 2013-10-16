//Pull database
function setPins(){
	if(checkLocationsNeedFetched()){
		fetchLocations();
		checkLocationsFetched();
		Ti.App.addEventListener('locationFetched', dropPins);
	}else{
		dropPins();
	}
}
//Put the actual pins in the map
function dropPins(){
	Ti.App.removeEventListener('locationFetched', dropPins);
	var allTempAnnotations = [];
	Ti.API.warn(currentLocations.length+" Current Locations");
	for(i=0; i!=currentLocations.length; i++){
		Ti.API.info("Setting New Pin at "+currentLocations[i][4]+", "+currentLocations[i][3]);
		var tempAnnotation = Titanium.Map.createAnnotation ({
			latitude: currentLocations[i][4],
			longitude: currentLocations[i][3],
			title: currentLocations[i][1],
			subtitle: currentLocations[i][0], 
			pincolor: Titanium.Map.ANNOTATION_GREEN,
			animate: true,
			myid: i
		});
		allTempAnnotations.push(tempAnnotation);
	}
	mapview.annotations = allTempAnnotations;
}
