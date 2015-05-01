var http = require('http');
var parseString = require('xml2js').parseString;
var Firebase = require('firebase');

var xmlUrl = "http://feeds1.mcgbfa.com/engine.asmx/getPriceData?SubFeed=0&newfeed=true&CompanyKey=Hyprop%20Investments%20Ltd";
var firebaseRootRef = new Firebase('https://boiling-heat-2151.firebaseio.com/shareinformation/datafeed');

var req = http.get(xmlUrl, function(res) {
  var xml = '';
  
  res.on('data', function(data) {
    xml += data;
  });

  res.on('end', function() {
    parseString(xml, function (err, result) {
      firebaseRootRef.set(JSON.stringify(result));
      console.log(JSON.stringify(result));
    });
  });
});

req.on('error', function(err) {
  console.log(err);
});