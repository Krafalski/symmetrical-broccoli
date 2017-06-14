

//works
var newCohortForm = function (){
  $.ajax({
    url:'../html/new_cohort_form.html',

    type: 'GET',

    success: function ( response ) {
      // console.log( 'the form was loaded', response);
      $( '.content' ).html(response);
      var $submit = $ ( '.submit' );

      $submit.on('click', function ( event ){
        event.preventDefault();

        console.log($('input').val());
        $.ajax({
          url: '/cohorts',

          type: 'POST',

          data: { name :$('input').val()},

          dataType: 'json',

          success: function ( response ){

            console.log ('the data was created' , response);

              window.list();
          },
          error: function ( error ) {
            console.log ( 'there was an error ' );
          },
          complete: function (xhr , status) {
            console.log ('The request is complete');
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
