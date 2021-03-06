
var postVariables = {};

function createDbRequest(){
	Ti.API.info("Creating DB Request");
	postVariables = {};
	var request = Titanium.Network.createHTTPClient({
		/*onload : function(e){
			Ti.API.log("RESPONSE = "+this.responseText);
		},*/
		onerror : function(e){
			stop_loading();
			alert(e.error);
			fetchingLocations = false;
			Ti.API.error(e.error);
			if(reloading == true){
				stopPullRefresh();
			}
		},
		timeout:5000
	});
	return request;
}

function sendDbRequest(URL, request){
	//alert(postVariables);
	//alert({"Test":"Hello World"});
	request.open("POST", URL);
	request.send(postVariables);
}

function addPostVariable(name, value){
	postVariables[name] = value;
}

