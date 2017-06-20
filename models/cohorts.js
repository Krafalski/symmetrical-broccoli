//------------------------
// Dependencies
//------------------------

const mongoose          = require ( 'mongoose' );
const Schema            = mongoose.Schema;
const Member            = require ( './members');

//set promises library to native ES6 Promise
mongoose.Promise = Promise;

//------------------------
// Set Up Schema
//------------------------
const cohortSchema       = new Schema ({
  name        : {
    type      : String,
    required  : [true, 'It needs a name']
  },
  members    : [ Member.schema ]

});

const cohort               = mongoose.model( 'Cohort' , cohortSchema);



//------------------------
// Module Exports
//------------------------
module.exports             = cohort;
