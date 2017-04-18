var list = function (){
  console.log('lcick');
  $.ajax({
    url: '/cohorts',

    type: 'GET',

    dataType: 'json',

    success: function ( response ){
      console.log ('the data was grabbed' , response);
      var $ul = $( '<ul>');
       response.forEach(function (e){
         var $li = $( '<li>' );
         var $x  = $( '<button>' ).text('X').css('background-color' , 'red');
         var $edit=$( '<button>' ).text('edit').css('background-color' , 'silver');;
         $li.text( e.name ).append( $edit ).append( $x );
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
      console.log( 'the form was loaded', response);
      $( '.content' ).html(response);
      var $submit = $ ( '.submit' );
      $submit.on('click', function (){
        $.ajax({
          url: '/cohorts',

          type: 'POST',

          data: data,

          dataType: 'json',

          success: function ( response ){
            console.log ('the data was created' , response);
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
      console.log ( 'the page was not loaded', error);
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
