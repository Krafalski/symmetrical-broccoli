//------------------------
// Dependencies
//------------------------

const mongoose          = require ( 'mongoose' );
const Schema            = mongoose.Schema;
const Member            = require ( './members');

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
