//------------------------
// Dependencies
//------------------------

const mongoose          = require ( 'mongoose' );
const Schema            = mongoose.Schema;

//------------------------
// Set Up Schema
//------------------------
const memberSchema       = new Schema ({
  firstName          : {
    type        : String,
    required    : [true, 'Person needs a name']
  },
  lastName      : String,
  nickname      : String,
  position      : String,
  participating : Boolean,
  notes         : String

});

const Member            = mongoose.model( 'Student' , memberSchema);



//------------------------
// Module Exports
//------------------------
module.exports           = Member;
