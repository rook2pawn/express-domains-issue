Expectations
============

Middleware that is bound to a Domain would be handled by the error handler for that domain.


example-failure-with-express.js
--------------------------------

    var app = express();
    app.get('/',d.bind(function(req,res,next) {
        throw new Error("error")
    }));
    var server = http.createServer(app);

If you run this, Node reports an error but the domain error handler is not notified.

example-success-without-express.js
----------------------------------

    var app = d.bind(function(req,res,next) {
        throw new Error("error")
    });
    var server = http.createServer(app);

Here, without Express, the error is correctly received by the error handler registered at the domain d.


Thoughts?


Install
=======    

    npm install .

