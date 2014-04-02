var http = require('http');
var express = require('express');
var response = require('response');
var app = express();

var b = function(req,res,next) {
    console.log("url: " + req.url);
    throw { res : res , e: new Error("The hard drive failed")}
}
var domain = require('domain');
var d = domain.create();
d.on('error',function(resp) {
    if ((resp && resp.res) && (resp.e && resp.e.message))
        response.txt('this is the error handler. error is: '+ resp.e.message).pipe(resp.res);
});

var bound_b = d.bind(b);
app.get('/foo',bound_b);

var server = http.createServer(app);
server.listen(5000);
var server3 = http.createServer(bound_b);
server3.listen(5200);


var request = require('request');
var Queuelib = require('queuelib');
var q = new Queuelib;
q.series([
    function(lib) {
        // regular b
        console.log("This is a request to express");
        request.get('http://localhost:5000/foo',function(err,response,body) {
            console.log(body);
            lib.done();
        });
    },
    function(lib) {
        // bound_b
        console.log("This is a request to native http");
        request.get('http://localhost:5200/foo',function(err,response,body) {
            console.log(body);
            lib.done();
        });
    }
]);
