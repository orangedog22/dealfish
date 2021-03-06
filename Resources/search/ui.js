var padding = 20;
var boxWidth = 80;
var boxHeight = 80;
var tempLeft = 20;
var tempTop = 120;


var search_view = Titanium.UI.createView({
	height: '100%', 
	width: '100%',
	bottom:0,
	zIndex:20,
	left: screen_width,
	backgroundColor: '#DDD',
	backgroundImage:'images/background.png'
});
var search_view_scroll = Ti.UI.createScrollView({
	width:'100%',
	height:viewHeight,
	contentWidth: 'auto',
  	contentHeight: 'auto',
	top:headerHeight,
});
if(iOSversion < 7){
	search_view_scroll.height -= 20;
}

var searchBackBt = Ti.UI.createButton({
	bottom:13,
	left: 0, 
	width: 46,
	height: 66/2, 
	style:Ti.UI.iPhone.SystemButtonStyle.PLAIN,
	backgroundColor:'transparent'
});
var searchBackBt_img = Ti.UI.createImageView({
	image: 'images/arrowLeftTrue.png',
	width: 35/2,
	height: 66/2,
	top:0
});


var searchTitle = Ti.UI.createView({
	top:20,
	left:0,
	backgroundImage: 'images/topBarTrue.png',
	height:headerHeight-20+5,
	zIndex:10
});
var searchButton = Ti.UI.createButton({
	title: "Search!",
	width: '100%',
	height: footerHeight, 
	bottom: 0, 
	left: 0, 
	backgroundColor: orangeColor,
	style:Ti.UI.iPhone.SystemButtonStyle.PLAIN
});

var searchBar = Titanium.UI.createTextArea({
    top:20,
    right:padding,
    zIndex:20,
    height:30,
    width:(boxWidth*3)+(padding*2)-30,
    value:"Enter restaurant, foods, etc.",
    color:"#aaa"
});
searchBar.addEventListener('focus', function(){
	if(searchBar.color == "#aaa"){
		searchBar.color = blackColor;
		searchBar.value = "";	
	}
});
searchBar.addEventListener('blur', function(){
	if(searchBar.value == ""){
		searchBar.value = "Enter restaurant, foods, etc.";
		searchBar.color = '#aaa';
	}
});
var searchBarButton = Ti.UI.createButton({
	width:40,
	height:40,
	left:padding-10,
	top:15,
	backgroundColor:orangeColor, 
	style:Ti.UI.iPhone.SystemButtonStyle.PLAIN
});
var searchBarButtonImage = Ti.UI.createImageView({
	width:30,
	height:30,
	backgroundImage: 'images/searchTrue.png',
});
searchBarButton.add(searchBarButtonImage);

Ti.include("dollarRange.js");

Ti.include("categoryButtons.js");

searchTitle.add(searchBackBt);
searchBackBt.add(searchBackBt_img);

search_view_scroll.add(searchBarButton);
search_view_scroll.add(searchBar);
search_view.add(searchButton);
search_view.add(search_view_scroll);
search_view.add(searchTitle);


MainWindow.add(search_view);
