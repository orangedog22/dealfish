
var debug = false;

var latitudeDelta = 0.5;
var longitudeDelta = 0.5;
var currentLong = -9999;
var currentLat = -9999;


// [0 = deal description, 1 = company name, 2 = merchant ID, 3 = longitude, 4 = latitude]
var currentLocations = [];


var activeLocation = false;
var fetchingLocations = false;

var screen_height = Ti.Platform.displayCaps.platformHeight;
var screen_width = Ti.Platform.displayCaps.platformWidth;
