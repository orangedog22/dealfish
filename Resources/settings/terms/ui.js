var termsview = Titanium.UI.createView({
	left: 0,
	height: '100%', 
	width: '100%',
	bottom:screen_height,
	backgroundColor: '#DDD',
	zIndex: 21,
});
var termsTitle = Ti.UI.createView({
	height:headerHeight,
	top:0,
	left:0,
	backgroundImage: 'images/topBarTrue.png'
});
var termsbackButton = Titanium.UI.createButton({
	backgroundImage: 'images/arrowLeftTrue.png', 
	bottom: 5, 
	left: 10, 
	width: 20,
	height: 25, 
});
var textview = Titanium.UI.createScrollView({
	top: '15%',   
	contentHeight: 'auto', 
	contentWidth: 'auto', 
	showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:true
});
var text = Titanium.UI.createLabel({
	text: "Terms of Service, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
	top: 0, 
	width: '100%',
	backgroundColor: whiteColor, 
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
	height: 'auto'
});
termsbackButton.addEventListener('click', function(){
	termsview.animate({
		bottom: screen_height
	});
});

MainWindow.add(termsview);
termsview.add(termsTitle);
termsTitle.add(termsbackButton);
termsview.add(textview);
textview.add(text);
function openTerms(){
	termsview.animate({
		bottom: 0
	});
}
