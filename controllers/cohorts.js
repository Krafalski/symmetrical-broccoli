//------------------------
// Dependencies
//------------------------
const express         = require ( 'express' );
const cohorts         = express.Router();


//------------------------
// Models
//------------------------

const Cohort        = require ( '../models/cohorts' );
const Student       = require ( '../models/students' );

//___________________
//See json Route
//___________________

cohorts.get ('/json' , ( req , res) => {
  //stub
});

// Index  : GET    '/cohorts'
cohorts.get( '/' , ( req , res ) => {

  Cohort.find( {} , ( error , foundCohorts) => {
    res.send (foundCohorts);
  })
});


// New    : GET    '/prodcuts/new'      3/7
// don't need it it is in the jQuery


// Show   : GET    '/products/:id'      2/7

// Create : POST   '/products'          4/7
cohorts.post ( '/' , ( req , res) => {
  Cohort.create ( req.body , ( err , cohort) => {
    console.log(req.body, 'this is req.body')
    if ( err ) { res.send ( err ); }
    else { res.redirect ('/'); }
  })
})

// Edit   : GET    '/products/:id/edit' 5/7
// Update : PUT    '/products/:id'      6/7
// Delete : DELETE '/products/:id'      7/7



//------------------------
// Module Exports
//------------------------

module.exports       = cohorts;
