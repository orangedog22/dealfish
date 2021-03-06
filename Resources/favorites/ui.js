var favoritesBGColor = "#c6c6c6";
var favorites_view = Ti.UI.createScrollView({
	left: 0,
	height: viewHeight,
	width: '100%',
	top:headerHeight,
	zIndex:0,
	opacity:0
	//backgroundColor:favoritesBGColor,
	//backgroundImage:'images/background.png'
});
var favorites_innerView = Ti.UI.createView({
	height:1000,
	width:'100%',
	top:0
});

var favorites_newListButton = Ti.UI.createButton({
	width:'90%',
	height:50,
	title:'Create New List',
	backgroundColor:grey,
	top:20,
	color:whiteColor,
	textAlign:'left',
	style:Ti.UI.iPhone.SystemButtonStyle.PLAIN
});

Ti.include("accountSetup.js");

favorites_view.add(favorites_innerView);
favorites_innerView.add(favorites_newListButton);
//favorites_view.add(favorites_tableview);

MainWindow.add(favorites_view);
