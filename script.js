const url = "https://firebase-scraper.herokuapp.com/firebase";



var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", url, true);

xmlHttp.onload = function() {
	console.log('onload');
	var responseText = xmlHttp.responseText;
	console.log(responseText);
};

xmlHttp.onerror = function() {
	console.error("Error");
};

xmlHttp.send();