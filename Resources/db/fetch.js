Ti.include("db.js");

function formatCompanies(locationsArray){
	var dataArray = [];
	for (var i = 0; i != locationsArray.length; i++){
		var duplicateMerchant = false;
		for(var z = 0; z != dataArray.length; z++){
			if(dataArray[z][0] == locationsArray[i][2]){
				dataArray[z].push(locationsArray[i]);
				duplicateMerchant = true;
			}
		}
		if(duplicateMerchant == false){
			dataArray.push([locationsArray[i][2], locationsArray[i]]);
		}
	}
	return dataArray;
}

function fetchLocations(){
	fetchingLocations = true;
	var testRequest = createDbRequest();
	testRequest.onload = function(e){
		Ti.API.info("--> Locations Loaded");
		//alert(this.responseText);
		var requestReturn = eval(this.responseText);
		if(requestReturn.length > 0){
			ignoreCurrentLocation();
			Ti.API.warn("Set "+requestReturn.length+" locations");
			//alert("Description: "+requestReturn[0][0]+"\nCompany Name:"+requestReturn[0][1]+"\nMerchant ID:"+requestReturn[0][2]);
			//This little loop calculates the distance between the place and current location.
			for(i=0; i!=requestReturn.length; i++){
				requestReturn[i][6] = getDistanceBetween(currentLong, currentLat, requestReturn[i][3], requestReturn[i][4]);
				//Ti.API.info("DISTANCE = "+requestReturn[i][6]);
			}
			requestReturn.sort(function(a,b){
			    return a[6] - b[6];
			});
			currentLocations = requestReturn;
			companies = formatCompanies(requestReturn);
		}else{
			currentLocations = [];
		}
		dropPins();
		setList();
		fetchedLocations = true;
		fetchingLocations = false;
	};
	testRequest.onerror = function(e){
		alert("We were not able to fetch the deals in your area because: \n"+e.error);
		fetchingLocations = false;
		fetchedLocations = false;
		Ti.API.error(e.error);
		if(reloading == true){
			stopPullRefresh();
		}
	};
	if(currentLat == -9999 || currentLong == -9999){
		Ti.API.warn("Current Lat or Current Long have not been set yet. Cannot fetch locations without finding location first.");
		fetchingLocations = false;
	}else{
		Ti.API.info("--> Sending Request");
		var currentDate = new Date();
		var weekday=new Array(7);
		weekday[0]="sunday";
		weekday[1]="monday";
		weekday[2]="tuesday";
		weekday[3]="wednesday";
		weekday[4]="thursday";
		weekday[5]="friday";
		weekday[6]="saturday";
		
		addPostVariable("current_long", currentLong);
		addPostVariable("current_lat", currentLat);
		addPostVariable("delta_long", longitudeDelta);
		addPostVariable("delta_lat", latitudeDelta);
		
		addPostVariable("currentTime",(Math.round(new Date().getTime() / 1000)));
		
		addPostVariable("dayOfWeek", weekday[currentDate.getDay()]);
		
		sendDbRequest("http://dealfish.genyapps.com/app/getDeals.php", testRequest);
		Ti.API.info("--> Request sent");
	}
}

function checkLocationsNeedFetched(){
	if(debug == true){
		Ti.API.warn("DEBUG IS ON. Refresh current locations from DB. Waiting for data...");
		return true;
	}
	if(fetchedLocations == false){
		return true;
	}else{
		return false;	
	}
	
	
	
	if(currentLocations.length == 0){
		Ti.API.warn("Current Locations is empty. Waiting for data... 2");
		return true;
	}else if(debug == true){
		Ti.API.warn("DEBUG IS ON. Refresh current locations from DB. Waiting for data...");
		return true;
	}else{
		return false;
	}
}

function checkLocationsFetched(){
	Ti.API.info("Checking...");
	setTimeout(function(){
		if(fetchingLocations == true){
			Ti.API.info("Current Locations is empty. Waiting for data...");
			checkLocationsFetched();
		}else{
			Ti.API.warn("...done");
			if(currentLocations.length != 0){
				Ti.App.fireEvent('locationFetched');
			}
		}
	}, 300);
}

function getCategoryImage(category){
	if(categories.indexOf(category) != -1){
		return "images/categories/white/"+category+".png";
	}else{
		return "none";
	}
}
