var makeList = function (){}

var editCohortName = function (liName, liID){
  //editCohortName( e.name, e._id)
  var $form   = $ ( '<form>' ).attr('action', '/cohorts/' + liID + '?_method=PUT' ).attr('method' , 'POST') ;
  var $input  = $ ( '<input>' ).attr( 'value' , liName ).attr( 'name' , 'name' );
  $form.append( $input );
  $('.content').append( $form );
}

var list = function (){

  $.ajax({
    url: '/cohorts',

    type: 'GET',

    dataType: 'json',

    success: function ( response ){
      // console.log ('the data was grabbed' , response[0]._id);
      var $ul         = $( '<ul>' );
       response.forEach( function ( e ){
         var $body    = $(document.body);
         var $p      = $( '<p>' );
         var $button  = $( '<button>' );
         var $input   = $( '<input>' );
         var $x       = $( '<form>' ).attr('action', '/cohorts/' + e._id + '?_method=DELETE' ).attr('method' , 'POST')

         $input.attr('type' ,'submit').attr ('value' ,'X').css('background-color' , 'red' );
         $x.append( $input );
         //add attribute so cohort name can be edited
         $p.attr('id', e._id);
         $p.text( e.name )
         //edit cohort name:
         var id = e._id
         $p.on( 'click', newMemberForm(id) );
         console.log('do your new member thing');
         $.ajax({ //ajax # 2
          url:'../html/new_member_form.html',

          type: 'GET',
  //
          success: function ( response ) {
            console.log( 'the form was loaded', response);
            $( '.content' ).html(response);
            var $content =   $( '.content' ).html(response);
            var $form  = $('form');
            var $input = $('<input>').attr('type' , 'hidden' ).attr('value', e._id).attr('name', 'cohortId');
            $form.prepend($input);
            var $submit = $ ( '.submit' );
            $submit.on('click', function (){
              $.ajax({
                url: '/members',

                type: 'POST',

                data: data,

                dataType: 'json',

                success: function ( response ){
                  console.log ('the data was created' , response);

                },
                error: function ( error ) {
                  console.log ( 'there was an error ' );
                },
                complete: function (xhr , status) {
                  console.log ('The request is complete');
                }
              }); //closes closest ajax
            }); //closes on
} // closes success
,
error: function ( error ) {
  console.log ( 'there was an error ' );
},
complete: function (xhr , status) {
  console.log ('The request is complete');
}

}); //closes ajax #2
       $p.on( 'dblclick', function ( ) {
         var $form   = $ ( '<form>' ).attr('action', '/cohorts/' + e._id + '?_method=PUT' ).attr('method' , 'POST') ;
         var $input  = $ ( '<input>' ).attr( 'value' , e.name ).attr( 'name' , 'name' );
         $form.append( $input );
         $p.replaceWith( $form );
         $p.appendTo( $body );
         $body.append( $x );
       });//closes on dbl click
});//closes forEach
  //
  $( '.content' ).append( $ul );
}, //end first success
    error: function ( error ) {
      console.log ( 'there was an error ' );
    },
    complete: function (xhr , status) {
      console.log ('The request is complete');
    }
  }); // end first ajax
}; // end list cohorts


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
        $.ajax({
          url: '/cohorts',

          type: 'POST',

          data: data,

          dataType: 'json',

          success: function ( response ){
            // console.log ('the data was created' , response);
              $( '.content' ).html(response);
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

//in progress
var newMemberForm = function(cohortId){





  //   error: function ( error ) {
  //     console.log ( 'the form was not loaded', error);
  //   },
  //
  //   complete: function (xhr , status) {
  //     console.log ( 'The request is complete' );
  //   }
  // });

}


var testAjax = function (){
  $.ajax({
    url: '/cohorts',

    success: function (){
      $( '<h1>' ).text('u did it!').appendTo('body');
    },
    error : function (){
      alert ('Sorry, there was a problem');
    }

  });
}

$(function(){

var $button             = $( '.ajax' );
var $listCohorts        = $( '.list-cohorts' );
var $newCohortForm      = $( '.new-cohort-form' );
var $newMemberForm      = $( '.new-member-form' );


$button.on('click', testAjax);

$newCohortForm.on('click', newCohortForm);

$listCohorts.on( 'click', list );

}); //closes window onload
