//--REQUIRED MODULES -------------------------------------------------------

var express = require('express');   //require express server module

//--END OF REQUIRED MODULES ------------------------------------------------

//--CONST AND VARS ---------------------------------------------------------

const PORT = process.env.PORT || 3001;  //server listening port

//--END OF CONST AND VARS --------------------------------------------------


//--MAIN -------------------------------------------------------------------

var app = express();    //creates an express server


//test route
app.get('/test', function(req, res){
    res.send('1, 2, 3, testing...');
});


//server start listening on port PORT
app.listen(PORT, function(){
    console.log(
        new Date().toISOString() + `: API Server listening on port ${PORT}`
    );
});