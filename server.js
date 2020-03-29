//set up dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");

//create express server and set up a port
var app = express();
var PORT = process.env.PORT || 8080; 


//Body Parser
app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json({ type: 'application/*+json'}))

app.use(bodyParser.raw({ type: 'application/vnd.custom-type'}))

app.use(bodyParser.text({ type: 'text/html'}))

//Router
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

//Listening to the port that was set up
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});