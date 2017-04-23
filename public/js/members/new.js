//works
var newMemberForm = function(){
  var cohortId =($(this).attr('id'));
  console.log(cohortId);
  $.ajax({
   url:'../html/new_member_form.html',

   type: 'GET',
 //
   success: function ( response ) {
    //  console.log(response);
     var $actions = $('.actions');
     $actions.prepend(response);
     console.log('u are here');
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

 }); //closes ajax

}

window.newMemberForm = newMemberForm;
