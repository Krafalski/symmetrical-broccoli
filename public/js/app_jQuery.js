var grabCohortID = '';

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

      var $content = ($('.content'));
      response.forEach( function ( e ){
       var $cohort         = $( '<div>' );
       $cohort.attr('cohort', e.name.toLowerCase());
       var $body    = $(document.body);
       var $h2      = $( '<h2>' );
       var $button  = $( '<button>' ).text('See Members').attr('cohort-btn', e.name.toLowerCase()).addClass('member-btn');
       $button.on('click', function() {
         var getClass = $(this).parent().attr('cohort');
         var $toggleMembersView = $('.'+ getClass)
          $toggleMembersView.toggle();
          if ($(this).text() === 'See Members'){
            $(this).text('Hide Members')
          } else {
            $(this).text('See Members');
          }
       });
       $cohort.append($h2);
       $cohort.append($button);
       var $input   = $( '<input>' );
       //need to move this functionality within individual cohort's dashboard
       var $x       = $( '<form>' ).attr('action', '/cohorts/' + e._id + '?_method=DELETE' ).attr('method' , 'POST').addClass('delete-btn')
       $input.attr('type' ,'submit').attr ('value' ,'X').css('background-color' , 'red' );
       $x.append( $input );
       //add attribute so cohort name can be edited
       $h2.attr('id', e._id);
       $h2.text( e.name );

       //needs to be moved
      //  $cohort.append($x);

       e.members.forEach((m)=>{
           var $p = $('<p>').addClass(e.name.toLowerCase());
           $p.text(m.firstName).toggle(false);
           $cohort.append( $p);
         });
       //edit cohort name:
       var id = e._id;
       $h2.on( 'click', newMemberForm );
       $h2.on( 'dblclick', function ( ) {
         var $form   = $ ( '<form>' ).attr('action', '/cohorts/' + e._id + '?_method=PUT' ).attr('method' , 'POST') ;
         var $input  = $ ( '<input>' ).attr( 'value' , e.name ).attr( 'name' , 'name' );
         $form.append( $input );
         $h2.replaceWith( $form );
         $h2.appendTo( $body );
       });//closes on dbl click
       $content.children().append($cohort);
     });//closes forEach
  // $( '.content' ).append( $cohort );
    }, //end first success
    error: function ( error ) {
    console.log ( 'there was an error ' );
    },
    complete: function (xhr , status) {
      // console.log ('The request is complete');
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

//works
var newMemberForm = function(){
  var cohortId =($(this).attr('id'));
  var cohortName =($(this).parent().attr('cohort'));
  console.log(cohortName);
  $.ajax({ //ajax # 2
   url:'../html/new_member_form.html',

   type: 'GET',
 //
   success: function ( response ) {
     $( '.content' ).html( '<h3>' + cohortName[0].toUpperCase() +cohortName.slice(1)+ '</h3>'+ response);
     console.log('u are here');
    //  var $content =   $( '.content' ).html(response);
     var $form  = $('form');
     var $input = $('<input>').attr('type' , 'hidden' ).attr('value', cohortId).attr('name', 'cohortId');
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
           $( '.content' ).html(response);

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
 // console.log ('The request is complete');
 }

 }); //closes ajax #2





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
