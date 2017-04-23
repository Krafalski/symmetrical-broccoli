//------------------------
// Dependencies
//------------------------
const express         = require ( 'express' );
const cohorts         = express.Router();


//------------------------
// Models
//------------------------

const Cohort        = require ( '../models/cohorts' );
const Member       = require ( '../models/members' );

//___________________
//See json Route
//___________________

cohorts.get ('/json' , ( req , res) => {
  //stub
});

// Index  : GET    '/cohorts'
cohorts.get( '/' , ( req , res ) => {

  Cohort.find( {} , ( error , foundCohorts) => {
    foundCohorts.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});

  foundCohorts.forEach(function(cohort){

    cohort.members.sort(function(a, b) {
  var nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
  var nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
  })


    res.send (foundCohorts);
  });
});


// New    : GET    '/prodcuts/new'      3/7
// don't need it it is in the jQuery


// Show   : GET    '/products/:id'      2/7

cohorts.get ('/:id', ( req , res ) => {
  Cohort.findById(req.params.id , ( error , foundCohort) =>{
    if  ( error ) { console.log ( error )}

    foundCohort.members.sort(function(a, b) {
      var nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
      var nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

  // names must be equal
  return 0;
});
    res.send( foundCohort );
  });
});

// Create : POST   '/products'          4/7
cohorts.post ( '/' , ( req , res) => {
  Cohort.create ( req.body , ( err , cohort) => {
    console.log(req.body, 'this is req.body');
    if ( err ) { res.send ( err ); }
    else { res.redirect ('/'); }
  });
});

// Edit   : GET    '/products/:id/edit' 5/7
// don't need it it is in the jQuery


// Update : PUT    '/products/:id'      6/7
cohorts.put ( '/:id' , ( req , res ) => {
  Cohort.findByIdAndUpdate (req.params.id , req.body, { new:  true },  ( err , cohort ) =>{
    console.log ('updating',  req.body , cohort)
    if ( err ) {console.log( err );}
       res.redirect ('/');
  });
});

// Delete : DELETE '/products/:id'      7/7
cohorts.delete ( '/:id' , ( req , res) => {
  Cohort.findByIdAndRemove ( req.params.id , ( err , product ) => {
    if ( err ) { console.log ( err ); }
      res.redirect( '/' );
  })
});




//------------------------
// Module Exports
//------------------------

module.exports       = cohorts;
