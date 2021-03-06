var notifications_view = Titanium.UI.createView({
	height: '100%', 
	width: '100%',
	left: screen_width,
	backgroundColor:whiteColor,
	zIndex:21
});

var notifications_list = Ti.UI.createTableView({
	height:screen_height+footerHeight,
	width:'100%',
	backgroundColor:whiteColor,
	bottom:0,
	top:headerHeight
});

var notificationsBack = Ti.UI.createButton({
	bottom: 13, 
	left: 0, 
	width: 46,
	height: 33,
	style:Ti.UI.iPhone.SystemButtonStyle.PLAIN
});
var notificationsBack_img = Ti.UI.createImageView({
	image: 'images/arrowLeftTrue.png',
	width: 35/2,
	height: 66/2,
	top:0
});


var notificationsTitle = Ti.UI.createView({
	top:20,
	left:0,
	backgroundImage: 'images/topBarTrue.png',
	height:headerHeight-20+5,
	zIndex:10
});

notificationsBack.add(notificationsBack_img);
notificationsTitle.add(notificationsBack);
notifications_view.add(notifications_list);
notifications_view.add(notificationsTitle);

MainWindow.add(notifications_view);
