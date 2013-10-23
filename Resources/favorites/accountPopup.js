
//Need another disable view to be behind the buttons
var accountSetupPopup_disable = Ti.UI.createView({
	zIndex:990,
	width:'100%',
	height:'100%',
	backgroundColor:'#000',
	opacity:0.8
});
var accountSetupPopup_label = Ti.UI.createLabel({
	zIndex:991,
	text:"Information about how you will be signing up for an account and how we will be collecting some information about you.",
	width:'85%',
	color:"#fff",
	top:50
});
var accountSetupPopup_Button = Ti.UI.createButton({
	zIndex:991,
	bottom:90,
	title:'Enable Favorites',
	width:'90%',
	height:'10%',
	backgroundColor:'#333',
	color:'#DDD'
});


accountSetupPopup_disable.add(accountSetupPopup_Button);
accountSetupPopup_disable.add(accountSetupPopup_label);
favorites_view.add(accountSetupPopup_disable);

function disableAccount_background(){
	background_disable.animate({opacity:0.8});
}

function enableAccount_backgrond(){
	background_disable.animate({opacity:0});
}