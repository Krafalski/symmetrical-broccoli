//------------------------
// Dependencies
//------------------------
const bodyParser        = require ( 'body-parser' );
const express           = require ( 'express' );
const methodOverride    = require ( 'method-override');
const mongoose          = require ( 'mongoose' );
const app               = express ();

//------------------------
// Port
//------------------------

const PORT                = process.env.PORT || 3000;

//------------------------
// Database
//------------------------
//connect to this database - don't forget to start 'mongod'
mongoose.connect ( 'mongodb://localhost/student_randomizer');

//set connection to variable for easy resuse
const db                = mongoose.connection;

//see better errors and open the connection

db.on( 'error' , console.error.bind( console , 'connection error: ' ));
db.once ( 'open' , function () {
  console.log( 'Database connected' );
});

//------------------------
// Controllers
//------------------------
var cohortsController    = require ( './controllers/cohorts' );
var membersController    = require ( './controllers/members' );
// var randomizerController = require ( './controllers/randomizer');

//------------------------
// Middleware
//------------------------
// use public folder for css/ js/jQuery/assets
app.use ( express.static ( 'public' ) );

// allow POST to become PUT and/or DELETE from a form
app.use( methodOverride ('_method') );

// populates req.body with parsed info from forms
app.use ( bodyParser.urlencoded({ extended : false } ) ); //extened -false does not allow nested objects in forms

//use controllers at specifed routes
app.use ( '/cohorts' , cohortsController);
app.use ( '/members' , membersController);
// app.use ( '/randomizer', randomizerController);


//------------------------
// Routes
//------------------------
app.get ( '/' , ( req , res ) => {
  res.sendFile('./index.html')
});

//------------------------
// Listener
//------------------------

app.listen ( PORT , ()=> {
  console.log (`it's all happening on port ${PORT}`);
});



//big thanks to
// https://ilovecoding.org/lessons/ajax-create-a-single-page-app-with-jquery
