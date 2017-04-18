//------------------------
// Dependencies
//------------------------

const mongoose          = require ( 'mongoose' );
const Schema            = mongoose.Schema;

//------------------------
// Set Up Schema
//------------------------
const studentSchema       = new Schema ({
  name          : {
    type        : String,
    required    : [true, 'Person needs a name']
  },
  participating : Boolean

});

const Student            = mongoose.model( 'Student' , studentSchema);



//------------------------
// Module Exports
//------------------------
module.exports           = Student;
