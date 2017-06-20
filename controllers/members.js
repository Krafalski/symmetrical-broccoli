//------------------------
// Dependencies
//------------------------
const express         = require ( 'express' );
const members         = express.Router();

//------------------------
// Models
//------------------------

const Cohort        = require ( '../models/cohorts' );
const Member       = require ( '../models/members' );


members.get ('/' , ( req , res ) => {
  Member.find ({} , ( error , foundMembers ) => {
    if ( error ){ console.log ( error )}
    res.send( foundMembers );
  })
});

members.get('/:id', (req , res ) => {
  Member.findById(req.params.id, (error, foundMember)=>{
    if ( error ){ console.log ( error )}
    res.send( foundMember );
  });


})

members.post( '/' , ( req, res ) => {
  Cohort.findById ( req.body.cohortId ,(error , foundCohort ) => {
    console.log('this is found cohort delete route???', foundCohort)
    Member.create(req.body, ( error , createdMember )=> {
      foundCohort.members.push(createdMember);
      foundCohort.save( (error , data )=>{
        if ( error ) { console.log (error)}
        res.send( createdMember );
      });
    });
  });
});






//------------------------
// Module Exports
//------------------------

module.exports       = members;
