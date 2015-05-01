var http = require('http');
var parseString = require('xml2js').parseString;
var xmlUrl = "http://feeds1.mcgbfa.com/engine.asmx/getPriceData?SubFeed=0&newfeed=true&CompanyKey=Hyprop%20Investments%20Ltd";

var req = http.get(xmlUrl, function(res) {
  var xml = '';
  
  res.on('data', function(data) {
    xml += data;
  });

  res.on('end', function() {
    parseString(xml, function (err, result) {
      console.log(JSON.stringify(result));
    });
  });
});

req.on('error', function(err) {
  console.log(err);
});