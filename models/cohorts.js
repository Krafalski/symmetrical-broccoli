//------------------------
// Dependencies
//------------------------

const mongoose          = require ( 'mongoose' );
const Schema            = mongoose.Schema;
const Student           = require ( './students');

//------------------------
// Set Up Schema
//------------------------
const cohortSchema       = new Schema ({
  name        : {
    type      : String,
    required  : [true, 'It needs a name']
  },
  students    : [ Student.schema ]

});

const cohort               = mongoose.model( 'Cohort' , cohortSchema);



//------------------------
// Module Exports
//------------------------
module.exports             = cohort;
