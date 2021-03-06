Ti.include("ui.js");

function show_geolocation_setup(cancelBt){
	if(cancelBt == true){
		geoSetupView.add(geoSetupBackButton);
	}
	disable_background();
	geoSetupView.animate({top:0, duration:500});
}

function remove_geolocation_setup(){
	enable_backgrond();
	geoSetupView.animate({top:screen_height, duration:500});
	geoSetupView.remove(geoSetupBackButton);
}

function ask_for_zipcode(){
	if(Ti.App.Properties.getInt('zip')){
		enterZipcode_textbox.value = Ti.App.Properties.getInt('zip');
	}
	geoSetupGeoButton.animate({opacity:0});
	geoSetupZipButton.animate({opacity:0});
	enterZipcode_label.animate({opacity:1});
	enterZipcode_textbox.animate({opacity:1});
	enterZipcode_backBt.animate({opacity:1});
	enterZipcode_textbox.focus();
}

function dontAsk_for_zipcode(){
	geoSetupGeoButton.animate({opacity:1});
	geoSetupZipButton.animate({opacity:1});
	enterZipcode_label.animate({opacity:0});
	enterZipcode_textbox.animate({opacity:0});
	enterZipcode_backBt.animate({opacity:0});
	enterZipcode_textbox.blur();
}

function convertZip(zipcode){
	start_loading();
	var zipRequest = createDbRequest();
	zipRequest.onload = function(e){
		stop_loading();
		loading = false;
		var result = JSON.parse(this.responseText).results[0].geometry.location;
		setMapRegion(result.lng, result.lat);
		
		fetchLocations();
		checkLocationsFetched();
	};
	sendDbRequest("https://maps.googleapis.com/maps/api/geocode/json?address="+zipcode+"&sensor=true", zipRequest);
}

function setMapRegion(lon, lat, delta_lon, delta_lat){
	dlon = 0.1;
	dlat = 0.1;
	if(delta_lon){
		dlon = delta_lon;
	}
	if(delta_lat){
		dlat = delta_lat;
	}
	longitudeDelta = dlon;
	latitudeDelta = dlat;
	currentLat = lat;
	currentLong = lon;
	map.region = {latitude:lat, longitude:lon, latitudeDelta:dlat, longitudeDelta:dlon};
}

geoSetupGeoButton.addEventListener('click', function(){
	if(Ti.Geolocation.locationServicesAuthorization == Ti.Geolocation.AUTHORIZATION_AUTHORIZED){
		Ti.App.Properties.setInt("zip", null);
		remove_geolocation_setup();
		trackCurrentLocation();
		appStartupCheck();
		Ti.App.Properties.setBool("zipSetup", true);
	}else if(Ti.Geolocation.locationServicesAuthorization == Ti.Geolocation.AUTHORIZATION_UNKNOWN){
		alert("Your iOS device version might not support geolocation");
	}else{
		alert("Please enable location services for this app to use this feature");
	}
});

geoSetupZipButton.addEventListener('click', function(){
	ask_for_zipcode();
	//Ti.App.Properties.setBool("zipSetup", true);
});

enterZipcode_backBt.addEventListener('click', function(){
	dontAsk_for_zipcode();	
});

enterZipcode_textbox.addEventListener('return', function(){
	if(enterZipcode_textbox.value){
		convertZip(enterZipcode_textbox.value);
		Ti.App.Properties.setInt("zip", enterZipcode_textbox.value);
		remove_geolocation_setup();
		zipCodeBased = true;
		track_button.visible = false;
	}
	dontAsk_for_zipcode();
});

geoSetupBackButton.addEventListener('click', function(){
	remove_geolocation_setup();
});
