let productsList = document.getElementById("products");

const url = "https://firebase-scraper.herokuapp.com/firebase";

var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", url, true);
xmlHttp.setRequestHeader("Content-Type", "application/json");

xmlHttp.onload = function() {
	var responseText = xmlHttp.responseText;
	if (!responseText) {
		return;
	}

	productsList.innerHTML = '';
	
	let json = JSON.parse(responseText);
	let msg = json.message;
	for (let i = 0; i < msg.length; i++) {
		let liElem = document.createElement("li");
		liElem.innerHTML = "Product : " + msg[i].name + " Status " + msg[i].status;
		productsList.appendChild(liElem);
	}
	
	
};

xmlHttp.onerror = function() {
	console.log("Error");
};

xmlHttp.send();