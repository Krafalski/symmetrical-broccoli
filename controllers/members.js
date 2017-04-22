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
  Student.find ({} , ( error , foundMembers ) => {
    if ( error ){ console.log ( error )}
    res.send( foundMembers);
  })
});

members.post( '/' , ( req, res ) => {
  Cohort.findById ( req.body.cohortId ,(error , foundCohort ) => {
    Member.create(req.body, ( error , createdMember )=> {
      foundCohort.members.push(createdMember);
      foundCohort.save( (error , data )=>{
        res.send('blue skies')
      });
    });
  });
});






//------------------------
// Module Exports
//------------------------

module.exports       = members;
