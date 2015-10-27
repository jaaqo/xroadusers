var fs = require('fs');
var _ = require('underscore');
var request = require('request');
var parser = require('xml2json');
var uuid = require('node-uuid');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var SS_URI = process.env.SS_URI;

app.get('/', function (req, res) {
  request('http://' + SS_URI  + '/listClients', function (error, response, body) {
    res.setHeader('Content-Type', 'text/html');

    if (!error && response.statusCode == 200) {
      var ms = parseMembers(parser.toJson(body));

      res.render('home', {members: ms });
    }
  });
});

app.get('/all', function (req, res) {
  request('http://' + SS_URI  + '/listClients', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var members = parseMembers(parser.toJson(body));
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(members));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send({"error": "Unable to fetch members."});
    }
  });
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app started listening at http://%s:%s', host, port);
});

function parseMembers(data) {

  var all = [],
      members = [],
      subsystems = [];

  // Parse the raw xml2json output into more readable form
  _.each(JSON.parse(data)["ns2:clientList"]["ns2:member"], function (item) {

    var name = item["ns2:name"],
        object = item["ns2:id"],
        memberClass = object["ns1:memberClass"],
        memberCode = object["ns1:memberCode"],
        objectType = object["ns1:objectType"],
        subsystemCode = object["ns1:subsystemCode"],
        xRoadInstance = object["ns1:xRoadInstance"];

    var entity = {
      id: uuid.v1(),
      name: name,
      memberClass: memberClass, 
      memberCode: memberCode, 
      objectType: objectType, 
      subsystemCode: subsystemCode || '', 
      xRoadInstance: xRoadInstance
    };

    all.push(entity); 

  });

  members = _.filter(all, function (item) { return item.objectType === 'MEMBER'; });
  subsystems = _.difference(all, members);

  _.each(subsystems, function (sub) {
    _.each(members, function (member) {
      member.children = member.children || [];
      if (sub.memberCode === member.memberCode) {
        member.children.push(sub); 
      } 
    }); 
  });

  return members;
}
