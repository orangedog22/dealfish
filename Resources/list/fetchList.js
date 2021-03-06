//Pull the database if it is needed.
function fetchList() {
	//Copy the setPins functionality in setPins.js and replace dropPins with setList
	if(checkLocationsNeedFetched()){
		fetchLocations();
		checkLocationsFetched();
		Ti.App.addEventListener('locationFetched', setList);
	}else{
		//setList();
	}
}

var longpressTracker = false;

//Actually set the list.
function setList(){
	//Row array actually contains the table view rows
	var rowArray = [];
	//Data array will be used to find duplicate deals in the global deals array and combine them
	var dataArray = companies;
	/* [
	0 = merchant ID
	1 = [
		0 = deal description,
		1 = company name,
		2 = merchant ID,
		3 = longitude,
		4 = latitude,
		5 = flash deal,
		6 = distance from current location (default -1, calculated in-app),
		7 = start date,
		8 = end date
		9 = category
		10 = phone
		11 = website
		12 = bio
		13 = specialties
		14 = price range - 1 to 4, 1-low, 4-high
		]
	2 = ["]
	] */
	
	if(currentLocations.length > 0){
		//Convert from global deals array to dataArray
		
		for (var i = 0; i != dataArray.length; i++){
			var row = Ti.UI.createTableViewRow({
				height: 80,
				companyID:dataArray[i][0],
				backgroundColor:'transparent'
			});
			//alert("Start Date: "+currentLocations[i][7]+"\nEnd Date: "+currentLocations[i][8]);
			
			row.add(createListItem(dataArray[i]));
			row.addEventListener('click', function(e){
				if(longpressTracker == false){
					openCompany(getFirstInstanceOfCompanyID(e.rowData.companyID));
				}else{
					longpressTracker = false;
				}
			});
			row.addEventListener('longpress', function(e){
				longpressTracker = true;
				openQuickActionView(getFirstInstanceOfCompanyID(e.rowData.companyID));
			});
			
			//Push the row to the end of the array here
			rowArray.push(row);
		}
	}else{
		var row = Ti.UI.createTableViewRow({
			height: 80,
			title:"Sorry! No deals in your area."
		});
		rowArray.push(row);
	}
	//set listview.data here
	list_tableview.data = [];
	list_tableview.data = rowArray;
}

function getFirstInstanceOfCompanyID(companyID, altArray){
	var tempCompanyArray = [];
	if(!altArray){
		tempCompanyArray = currentLocations;
	}else{
		tempCompanyArray = altArray;
	}
	for(var i=0; i!=tempCompanyArray.length; i++){
		if(tempCompanyArray[i][2] == companyID){
			return i;
		}
	}
}
