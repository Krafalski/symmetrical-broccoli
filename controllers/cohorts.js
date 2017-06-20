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
  let nameA = a.name.toUpperCase(); // ignore upper and lowercase
  let nameB = b.name.toUpperCase(); // ignore upper and lowercase
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
      let nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
      let nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
        return 0;
    });
});

    res.send (foundCohorts);
  });
});


// New    : GET
// don't need it it is in the jQuery


// Show   : GET

cohorts.get ('/:id', ( req , res ) => {
  Cohort.findById(req.params.id , ( error , foundCohort) =>{
    if  ( error ) { console.log ( error )}

    foundCohort.members.sort(function(a, b) {
      let nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
      let nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
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

// Create : POST
cohorts.post ( '/' , ( req , res) => {
  Cohort.create ( req.body , ( err , cohort) => {

    if ( err ) { res.send ( err ); }
    else { res.send (req.body); }
  });
});

// Edit   : GET
// don't need it it is in the jQuery

// Update : PUT    '/products/:id'
cohorts.put ( '/:id' , ( req , res ) => {
  Cohort.findByIdAndUpdate (req.params.id , req.body, { new:  true },  ( err , cohort ) =>{
    // console.log ('updating',  req.body , cohort)
    if ( err ) {console.log( err );}
       res.redirect ('/');
  });
})

//Removes cohort and removes all associated members from the cohort array and from the members model/schema
cohorts.delete('/:id', function(req, res){
  	Cohort.findByIdAndRemove(req.params.id, function(err, foundCohort){
  		let memberIds = [];
  		for (let i = 0; i < foundCohort.members.length; i++) {
  			memberIds.push(foundCohort.members[i]._id);
  		}
  		Member.remove(
  			{
  				_id : {
  					$in: memberIds
  				}
  			},
  			function(err, data){
  				console.log(data, err);
            res.redirect('/')
  			}
  		);
  	});
});


//http://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
//Update Member, nested Route

cohorts.put('/:id/members/:m_id', (req , res) => {
  Cohort.findOneAndUpdate({'members._id': req.params.m_id},{
    $set:{
      'members.$.firstName': req.body.firstName,
      'members.$.lastName':req.body.lastName,
      'members.$.nickName':req.body.nickName ,
      'members.$.position': req.body.position,
      'members.$.notes':req.body.notes
     }}
, ( err , foundMember)=>{
    if (err){console.log ( err )}
    //update member NOT within cohort
    Member.findByIdAndUpdate( req.params.m_id, req.body, {new: true} , ( err , foundMember) => {
      res.redirect('/');
    });

  })
});


//Delete Member, nested route
cohorts.delete('/:id/members/:m_id', (req , res) => {
  //remove member INSIDE cohort
  Cohort.update({'members._id': req.params.m_id}, {$pull: {members: { _id : req.params.m_id }}}
, ( err , foundMember ) => {
    if (err){
      console.log ( err ); }
    else{
      //remove member Not within Cohort
      Member.findByIdAndRemove( req.params.m_id, req.body , ( err , foundMember) => {
        if (err){  console.log( err ); }
        res.redirect('/');
      });
    }
  });
});

//------------------------
// Module Exports
//------------------------

module.exports       = cohorts;
