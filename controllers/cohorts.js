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
})



  cohorts.delete('/:id', function(req, res){
  	Cohort.findByIdAndRemove(req.params.id, function(err, foundCohort){
  		var memberIds = [];
  		for (var i = 0; i < foundCohort.members.length; i++) {
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



// Delete : DELETE '/products/:id'      7/7
// cohorts.delete ( '/:id' , ( req , res) => {
//   Cohort.findById( req.params.id , function (err , foundCohort ) {
//
//     if (err){ console.log ( err )}
//
//     var grabIds = foundCohort.members.map(function(m){
//       return m._id.toString();
//    });
//    console.log(grabIds);
//
//    Member.find(
//      {
//         _id: {
//           $in: grabIds
//         }
//       },
//       function  ( error, removed ) {
//      if ( error ) {console.log( error )}
//      console.log ('removed', removed)
//    })
//
//     // foundCohort.members.forEach((m)=>{
//     //   var mIdString =  m._id.toString();
//     //   console.log(m.firstName,  m._id, typeof m._id, typeof m._id.toString());
//     //   Member.findByIdAndUpdate(mIdString  , {'firstName' : "Todd"},(error , removedMember)=>{
//     //     if (error ){console.log(error)}
//     //     console.log( 'goodbye!', removedMember)
//     //   });
//     // })
//   })
//   //get first part working then do this
//   // Cohort.findByIdAndRemove ( req.params.id , ( err , cohort ) => {
//   //   if ( err ) { console.log ( err ); }
//       res.redirect( '/' );
//   // })
// });

//http://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
//Update Member, nested Route
//only updates the member? what about both?!
cohorts.put('/:id/members/:m_id', (req , res) => {
  console.log('this is req.body' , req.body)

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
    else{console.log ('found member?', foundMember)}


    //works
    //update member NOT within cohort
    Member.findByIdAndUpdate( req.params.m_id, req.body, {new: true} , ( err , foundMember) => {

      res.send(foundMember)
    });

  })
});

//code graveyard



//------------------------
// Module Exports
//------------------------

module.exports       = cohorts;
