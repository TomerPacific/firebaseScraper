const url = "https://firebase-scraper.herokuapp.com/firebase";



var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", url, true);
xmlhttp.setRequestHeader("Content-Type", "application/json");

xmlHttp.onload = function() {
	console.log('onload');
	var responseText = xmlHttp.responseText;
	console.log(responseText);
};

xmlHttp.onerror = function() {
	console.log("Error");
};

xmlHttp.send();