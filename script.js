const url = "https://firebase-scraper.herokuapp.com/firebase";



var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", url, true);
xmlHttp.withCredentials = true;
xmlHttp.setRequestHeader("Content-Type","application/json");
xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");

xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        console.log(xmlHttp.responseText);
}

xmlHttp.send(null);