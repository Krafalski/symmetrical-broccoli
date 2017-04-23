var editCohortName = function ( cohort ){
  //editCohortName( e.name, e._id)oi,k
  var $h2 = ($(this))
  var $body = ('body');
  var $form   = $ ( '<form>' ).attr('action', '/cohorts/' + cohort.data.id + '?_method=PUT' ).attr('method' , 'POST') ;
  var $input  = $ ( '<input>' ).attr( 'value' , cohort.data.name ).attr( 'name' , 'name' );
  $form.append( $input );
  // $('.content').append( $form );
  //  $form.append( $input );
   $h2.replaceWith( $form );
   $h2.appendTo( $body );
}


window.editCohortName = editCohortName;
