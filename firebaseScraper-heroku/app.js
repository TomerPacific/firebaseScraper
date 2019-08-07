var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const rp = require('request-promise');
const cheerio = require('cheerio');
const daysPassedToScrapeAgain = 1;
var port = process.env.PORT || 3000;
var app = express();
var lastDateScraped;

const url = "https://status.firebase.google.com";

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use(cors({
  credentials: true,
  origin: 'https://tomerpacific.github.io'
}));

app.get('/firebase', function (req, res) {
 
  if (enoughDaysHavePassed()) {
      rp(url)
    .then(function(html){
       let products = [];
       let product = {};

      let services = cheerio('.service-status', html);
      for (let i = 0; i < services.length; i++) {
        let service = services[i].children[0].data.trim();
        if (service === 'Cloud Firestore') {
          continue;
        }

        product.name = service;
        products.push(product);
        product = {};
      }

      let statuses = cheerio('.end-bubble', html);
      for (let i = 0; i < products.length; i++) {
        products[i].status = statuses[i].attribs.class;
      }
      lastDateScraped = new Date();
      res.status(200).json({ message: products});
    })
    .catch(function(err){
      console.log(err);
    });
  } else {
    res.status(200).json({ message: products});
  }
});


function enoughDaysHavePassed() {
  
  if (!lastDateScraped) {
    return true;
  }
  
  let timeDifference = new Date().getTime() - lastDateScraped.getTime();
  let dayDifference = Math.floor(timeDifference / 1000*60*60*24);

  return dayDifference > daysPassedToScrapeAgain;
}

app.listen(port, function () {
 console.log('Example app listening on port ' + port);
});