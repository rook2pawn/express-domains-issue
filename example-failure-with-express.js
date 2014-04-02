var http = require('http');
var express = require('express');
var domain = require('domain');
var d = domain.create();
d.on('error',function(resp) {
    // this is not triggered!
    console.log("Error handler" , resp);
});

var app = express();
app.get('/',d.bind(function(req,res,next) {
    throw new Error("error")
}));


var server = http.createServer(app);
server.listen(5000);

http.get('http://localhost:5000/',function(res) {
    console.log("Got response", res.statusCode); 
})
