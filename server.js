//--REQUIRED MODULES -------------------------------------------------------

var express = require('express');   //require express server module

//--END OF REQUIRED MODULES ------------------------------------------------

//--CONST AND VARS ---------------------------------------------------------

const PORT = process.env.PORT || 3001;  //server listening port

//--END OF CONST AND VARS --------------------------------------------------


//--MAIN -------------------------------------------------------------------

var app = express();    //creates an express server


//test routes
app.get('/test', function(req, res){
    res.send('1, 2, 3, testing...');
});

app.get('/body', function(req, res){
    res.send( req.body );
});

//server start listening on port PORT
var server = app.listen(PORT, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log(
        new Date().toISOString() + ': Server listening at http://%s:%s', host, port
    );
});