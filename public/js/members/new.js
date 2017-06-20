var newMember = {cohortId : $('.add-new-member').attr('id')}

//works
var newMemberForm = function(){
  var cohortId =($(this).attr('id'));
  // console.log(cohortId);
  $.ajax({
   url:'../html/new_member_form.html',

   type: 'GET',
 //
   success: function ( response ) {
    //  console.log(response);
     var $actions = $('.actions');
     $actions.prepend( response );
     var $form  = $('form');
     var $input = $('<input>').attr('type' , 'hidden' ).attr('value', cohortId).attr('name', 'cohortId');
     $form.prepend($input);
     var $submit = $ ( '.submit' );
     $submit.on('click', function (e){
       e.preventDefault();
      //  console.log( 'default prevented');

       var newMember = {
         cohortId : $('.add-new-member').attr('id'),
         firstName :$('#first-name').val(),
         lastName :$('#last-name').val(),
         nickName : $('#nick-name').val(),
         position : $('#position').val(),
         notes : $('#notes').val()
       };




       $.ajax({
         url: '/members',

         type: 'POST',

         data: newMember,

         dataType: 'json',

         success: function ( response ){
          //  console.log ('the data was created' , response);
           window.cohortDashboard(newMember.cohortId);

         },
         error: function ( error ) {
           console.log ( 'there was an error ', error );
         },
         complete: function (xhr , status) {
          //  console.log ('The request is complete');
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
