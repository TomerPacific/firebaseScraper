let productsList = document.getElementById("products");
let mainDiv = document.getElementById("main");
let loader = document.getElementsByClassName("loader");
let dateHeader = document.getElementById('date');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

	setCurrentDate();

	let data = parseJson(responseText);
	if (!data) {
		return;
	}

	let msg = data.message;
	let incidentsList = null;
	for (let i = 0; i < msg.length; i++) {
		let liElem = document.createElement("li");
		let iconElem = document.createElement("i");
		let p = document.createElement("p");
		p.innerHTML = "<strong>" + msg[i].name + "</strong>";
		if (msg[i] && msg[i].status && msg[i].status.indexOf('ok') !== -1) {
			liElem.setAttribute('class', 'ok fade');
			iconElem.setAttribute('class', 'fas fa-check');
			
		} else if (msg[i] && msg[i].status && msg[i].status.indexOf('medium') !== -1) {
			liElem.setAttribute('class', 'medium fade');
			iconElem.setAttribute('class', 'fas fa-exclamation');
			incidentsList = createIncidents(msg[i].incidents);
		} else {
			liElem.setAttribute('class', 'high fade');
			iconElem.setAttribute('class', 'fas fa-times');
			incidentsList = createIncidents(msg[i].incidents);
		}
		p.appendChild(iconElem);
		liElem.appendChild(p);
		if (incidentsList) {
			liElem.appendChild(incidentsList);
		}
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


function createIncidents(incidents) {
	let list = document.createElement('ul');
	for (let i = 0; i < incidents.length; i++) {
		let listItem = document.createElement('li');
		let anchorItem = document.createElement('a');
		anchorItem.href = incidents[i];
		listItem.appendChild(anchorItem);
		list.appendChild(listItem);
	}
	
	list.setAttribute("class", "incidents");
	
	return list;
}

function parseJson(json) {
	let data = null;
	try {
		data = JSON.parse(json);
	} catch (e) {
		console.error("JSON parse error " + e.message);
	}

	return data;
}

function setCurrentDate() {
	var currentDate = new Date();
	dateHeader.innerHTML = "For the day of : " + months[currentDate.getMonth()] + ' ' + currentDate.getDate() + ' ' + currentDate.getFullYear();
	dateHeader.style.display = "block";
}