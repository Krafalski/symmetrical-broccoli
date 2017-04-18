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
      console.log ('the data was grabbed' , response[0]._id);
      var $ul         = $( '<ul>' );
       response.forEach( function ( e ){
         var $li      = $( '<li>' );
         var $button  = $( 'button' );
         var $x       = $( '<a>' ).attr( 'href', '/cohort/delete' ).append( $button ).text('X').css('background-color' , 'red' );
         $li.attr('id', e._id);
         $li.text( e.name ).append( $x );
         $li.on( 'click', function ( ) {
           console.log('clifidiid');
           var $form   = $ ( '<form>' ).attr('action', '/cohorts/' + e._id + '?_method=PUT' ).attr('method' , 'POST') ;
           var $input  = $ ( '<input>' ).attr( 'value' , e.name ).attr( 'name' , 'name' );
           $form.append( $input );
           $li.replaceWith( $form );
         });
         $li.appendTo( $ul );
       });

        $( '.content' ).append( $ul );
    },
    error: function ( error ) {
      console.log ( 'there was an error ' );
    },
    complete: function (xhr , status) {
      console.log ('The request is complete');
    }
  });
}; //list cohorts

var newForm = function (){
  $.ajax({
    url:'../html/new_form.html',

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

var $button       = $( '.ajax');
var $newForm      = $( '.new-form');
var $listCohorts  = $( '.list-cohorts' );

$button.on('click', testAjax);

$newForm.on('click', newForm);

$listCohorts.on('click', list);

}); //closes window onload
