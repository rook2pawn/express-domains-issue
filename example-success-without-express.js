var http = require('http');
var domain = require('domain');
var d = domain.create();
d.on('error',function(resp) {
    // this WILL be triggered!
    console.log("Error handler" , resp);
});

var app = d.bind(function(req,res,next) {
    throw new Error("error")
});

var server = http.createServer(app);
server.listen(5000);

http.get('http://localhost:5000/',function(res) {
    console.log("Got response", res.statusCode); 
})
