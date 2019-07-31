let productsList = document.getElementById("products");


const url = "https://firebase-scraper.herokuapp.com/firebase";

var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", url, true);
xmlHttp.setRequestHeader("Content-Type", "application/json");

xmlHttp.onload = function() {
	var responseText = xmlHttp.responseText;
	let json = JSON.parse(responseText);
	let msg = json.message;
	let liElem = document.createElement("li");
	liElem.innerHTML = msg;
	productsList.appendChild(liElem);
};

xmlHttp.onerror = function() {
	console.log("Error");
};

xmlHttp.send();