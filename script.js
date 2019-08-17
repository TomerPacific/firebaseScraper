let productsList = document.getElementById("products");
let mainDiv = document.getElementById("main");
let loader = document.getElementsByClassName("loader");
let dateHeader = document.getElementById('date');

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

	mainDiv.style.display = "block";

	dateHeader.innerHTML = "For the day of : " + new Date().toString();
	dateHeader.style.display = "block";

	let json = JSON.parse(responseText);
	let msg = json.message;
	for (let i = 0; i < msg.length; i++) {
		let liElem = document.createElement("li");
		let iconElem = document.createElement("i");
		let p = document.createElement("p");
		p.innerHTML = "<strong>" + msg[i].name + "</strong>";
		if (msg[i].status.indexOf('ok') !== -1) {
			liElem.setAttribute('class', 'ok fade');
			iconElem.setAttribute('class', 'fas fa-check');
			
		} else if (msg[i].status.indexOf('medium') !== -1) {
			liElem.setAttribute('class', 'medium fade');
			iconElem.setAttribute('class', 'fas fa-exclamation');
		} else {
			liElem.setAttribute('class', 'high fade');
			iconElem.setAttribute('class', 'fas fa-times');
		}
		p.appendChild(iconElem);
		liElem.appendChild(p);
		productsList.appendChild(liElem);

		liElem.classList.remove('fade');
		liElem.classList.add('show');
	}

	loader[0].style.display = "none";
	
};

xmlHttp.onerror = function() {
	console.log("Error");
};

xmlHttp.send();