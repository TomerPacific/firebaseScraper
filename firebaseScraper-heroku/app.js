var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const rp = require('request-promise');
const cheerio = require('cheerio');
var port = process.env.PORT || 3000;
var app = express();

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

    res.status(200).json({ message: products});
  })
  .catch(function(err){
  	console.log(err);
  });
});


app.listen(port, function () {
 console.log('Example app listening on port ' + port);
});