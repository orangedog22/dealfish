Ti.include("constants.js");
Ti.include("ui.js");
Ti.include("swipe.js");
Ti.include("header.js");

//Clicks
nav_search.addEventListener('click', function(){
	//searchFront(getSlideDirection("search"));
	openSearch();
});
nav_map.addEventListener('click', function(){
	mapFront(getSlideDirection("map"));
});
nav_list.addEventListener('click', function(){
	listFront(getSlideDirection("list"));
});
nav_favorites.addEventListener('click', function(){
	favoritesFront(getSlideDirection("favorites"));
});
nav_settings.addEventListener('click', function(){
	//settingsFront(getSlideDirection("settings"));
	openSettings();
});



function getSlideDirection(toView){
	fromView = currentView;
	
	if(fromView == "search"){
		return "right";
	}
	
	if(fromView == "map"){
		if(toView == "search"){
			return "left";
		}else{
			return "right";
		}
	}
	
	if(fromView == "list"){
		if(toView == "search" || toView == "map"){
			return "left";
		}else{
			return "right";
		}
	}
	
	if(fromView == "favorites"){
		if(toView == "settings"){
			return "right";
		}else{
			return "left";
		}
	}
	
	if(fromView == "settings"){
		return "left";
	}
}

function setCurrentView(viewName){
	currentView = viewName;
	setNewHeaderTitle(viewName);
	Ti.API.info("Current View = "+currentView);
}
function setCurrentSubView(viewName){
	currentSubView = viewName;
	Ti.API.info("Saving last sub view as = "+currentView);
}

function slideViewIn(obj, dir){
	Ti.API.info("Moving "+dir);
	searchSettings_blackFade.animate({opacity:0.8, duration:500});
	var tempZ = obj.zIndex;
	if(dir == "right"){
		Ti.API.log(obj.left);
		if(obj.left > 0){
			Ti.API.info("Jumping View");
			obj.left = -1 * screen_width;
		}
		obj.zIndex = tempZ+1;
		obj.animate({
			left: 0,
			duration: IN_ANIMATION_SPEED
		}, function(){
			obj.zIndex = tempZ;
		});
	}
	
	if(dir == "left"){
		if(obj.left < 0){
			Ti.API.info("Jumping View");
			obj.left = screen_width;
		}
		obj.zIndex = tempZ+1;
		obj.animate({
			left: 0,
			duration: IN_ANIMATION_SPEED
		}, function(){
			obj.zIndex = tempZ;
		});
	}
}

function transitionViewIn(obj, dir){
	
	var tempZ = obj.zIndex;
	
	//Preflight
	obj.opacity = 0;
	obj.top = 400;
	obj.left = 0;
	obj.transform = Titanium.UI.create2DMatrix().scale(2,2);
	
	//Go!
	obj.animate({
		transform : Ti.UI.create2DMatrix().scale(1, 1),
		opacity : 1,
		top:headerHeight,
		duration : OUT_ANIMATION_SPEED,
	});
}
function transitionViewOut(obj, dir){
	obj.animate(transitionViewOutAnimation);
}
function slideViewOut(obj, dir){
	searchSettings_blackFade.animate({opacity:0, duration:500});
	if(dir == "left"){
		obj.animate({
			left:(screen_width*-1),
			duration : OUT_ANIMATION_SPEED
		});
	}else if(dir == "right"){
		obj.animate({
			left:screen_width,
			duration : OUT_ANIMATION_SPEED
		});
	}
	/*obj.animate(transitionViewOutAnimation, function(){
		if(dir == "left"){
			obj.left = screen_width;
		}else{
			obj.left = screen_width;
		}
		obj.opacity = 1;
		obj.transform = Titanium.UI.create2DMatrix().scale(1,1);
	});*/
}

function navReset(){
	nav_favorites.backgroundImage = 'images/favoritesOff.png';
	nav_list.backgroundImage = 'images/homepageOff.png';
	nav_map.backgroundImage = 'images/navigationOff.png';
}

function transitionNav(obj, name){
	navReset();
	if(name == "favorites"){
		obj.backgroundImage = 'images/favoritesOn.png';
	}else if(name == "home"){
		obj.backgroundImage = 'images/homepageOn.png';
	}else if(name == "map"){
		obj.backgroundImage = 'images/navigationOn.png';
	}
}

function searchFront(direction){	
	transitionNav(nav_search);
	mapBack();
	listBack();
	favoritesBack();
	settingsBack();
	transitionViewIn(search_view, direction);
	setCurrentSubView(currentView);
	setCurrentView("search");
}
function searchBack(direction){
	direction = "left";
	if(currentView == "search"){
		slideViewOut(search_view, direction);
		setCurrentView(currentSubView);
		setCurrentSubView("");
		left_slider.visible = true;
		right_slider.visible = true;
		search_slider.visible = false;
	}
}

function mapFront(direction){
	transitionNav(nav_map, "map");
	searchBack();
	listBack();
	favoritesBack();
	settingsBack();
	transitionViewIn(mapview, direction);
	setCurrentView("map");
}
function mapBack(direction){
	if(currentView == "map"){
		transitionViewOut(mapview, direction);
	}
}


function listFront(direction){
	transitionNav(nav_list, "home");
	searchBack();
	mapBack();
	favoritesBack();
	settingsBack();
	transitionViewIn(listview, direction);
	setCurrentView("list");
	fetchList();
}
function listBack(direction){
	if(currentView == "list"){
		transitionViewOut(listview, direction);
	}
}

function favoritesFront(direction){
	transitionNav(nav_favorites, "favorites");
	searchBack();
	mapBack();
	listBack();
	settingsBack();
	transitionViewIn(favorites_view, direction);
	setCurrentView("favorites");
}
function favoritesBack(direction){
	if(currentView == "favorites"){
		transitionViewOut(favorites_view, direction);
	}
}


function settingsFront(direction){
	transitionNav(nav_settings);
	searchBack();
	mapBack();
	listBack();
	favoritesBack();
	transitionViewIn(settings_view, direction);
	setCurrentSubView(currentView);
	setCurrentView("settings");
}
function settingsBack(direction){
	direction = "right";
	if(currentView == "settings"){
		left_slider.visible = true;
		right_slider.visible = true;
		settings_slider.visible = false;
		slideViewOut(settings_view, direction);
		setCurrentView(currentSubView);
		setCurrentSubView("");
	}
}
