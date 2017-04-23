//works
var newCohortForm = function (){
  $.ajax({
    url:'../html/new_cohort_form.html',

    type: 'GET',

    success: function ( response ) {
      // console.log( 'the form was loaded', response);
      $( '.content' ).html(response);
      var $submit = $ ( '.submit' );
      $submit.on('click', function (){
        console.log('I clicked the button')
        $.ajax({
          url: '/cohorts',

          type: 'POST',

          data: data,

          dataType: 'json',

          success: function ( response ){
            // console.log ('the data was created' , response);
              $( '.content' ).replaceWith(response);
          },
          error: function ( error ) {
            console.log ( 'there was an error ' );
          },
          complete: function (xhr , status) {
            // console.log ('The request is complete');
          }
        });
      });
    },
    error: function ( error ) {
      console.log ( 'the form was not loaded', error);
    },

    complete: function (xhr , status) {
      console.log ( 'The request is complete' );
    }
  });

}

window.newCohortForm = newCohortForm;
