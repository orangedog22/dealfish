var currentQuickID = -1;
var quickActionView_backdrop = Ti.UI.createView({
	width:screen_width,
	height:screen_height,
	zIndex:1,
	left:screen_width,
	backgroundColor:'black',
	opacity:0.2
});
var quickActionView = Ti.UI.createView({
	width:'100%',
	height:100,
	backgroundColor:'black',
	opacity:0.8,
	left:screen_width,
	zIndex:2
});

var quickAction_call = Ti.UI.createButton({
	//title:"Call",
	width:'26%',
	height:90,
	left:'5%', 
});
var callIcon = Ti.UI.createImageView({
	image: 'images/actionbar/phoneOff.png', 
});
var quickAction_favorite = Ti.UI.createButton({
	width:'26%',
	height:90,
});
var starIcon = Ti.UI.createImageView({
	image: 'images/actionbar/favOff.png', 
});
var quickAction_website = Ti.UI.createButton({
	//title:"Web",
	width:'26%',
	height:90,
	right:'5%'
});
var websiteIcon = Ti.UI.createImageView({
	image: 'images/actionbar/internetOffnew.png', 
});
quickActionView.add(quickAction_call);
quickActionView.add(quickAction_favorite);
quickActionView.add(quickAction_website);
quickAction_favorite.add(starIcon);
quickAction_call.add(callIcon);
quickAction_website.add(websiteIcon);
MainWindow.add(quickActionView_backdrop);
MainWindow.add(quickActionView);

function openQuickActionView(ID){
	currentQuickID = ID;
	quickActionView_backdrop.left = 0;
	quickActionView.animate({left:0});
}
function closeQuickActionView(){
	quickActionView_backdrop.left = screen_width;
	quickActionView.animate({left:screen_width});
}

quickActionView_backdrop.addEventListener('click', function(){
	closeQuickActionView();
});

quickAction_favorite.addEventListener('click', function(){
	openFavoritesPopup(currentQuickID, []);
});

quickAction_call.addEventListener('click', function(){
	Titanium.Platform.openURL('tel:' + currentLocations[currentQuickID][10]);
});
quickAction_favorite.addEventListener('click', function(){
	openFavoritesPopup(currentQuickID);
});
quickAction_website.addEventListener('click', function(){
	Ti.Platform.openURL(currentLocations[currentQuickID][11]);
});
