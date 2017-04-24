var editCohortName = function ( cohort ){
  //editCohortName( e.name, e._id)oi,k
  var $h2 = ($(this))
  var $body = ('body');
  var $form   = $ ( '<form>' ).attr('action', '/cohorts/' + cohort.data.id + '?_method=PUT' ).attr('method' , 'POST') ;
  var $input  = $ ( '<input>' ).attr( 'value' , cohort.data.name ).attr( 'name' , 'name' );
  var $update = $ ( '<input>').attr('type', 'submit').addClass('btn').attr('value', 'update')
  $form.append( $input , $update);
  var $delete = $ ( '<form>' ).attr('action', '/cohorts/' + cohort.data.id + '?_method=DELETE' ).attr('method' , 'POST') ;
  var $deleteBtn =$ ( '<input>' ).attr('type', 'submit').addClass('btn').attr('value', 'delete forever');
  $delete.append($deleteBtn);
  $form.append($delete);
  // $('.content').append( $form );
  //  $form.append( $input );
   $h2.replaceWith( $form );
   $h2.appendTo( $body );
}


window.editCohortName = editCohortName;
