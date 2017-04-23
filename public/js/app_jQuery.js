var grabCohortID = '';
var members = [];


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

var list = function (){

  $.ajax({
    url: '/cohorts',

    type: 'GET',

    dataType: 'json',

    success: function ( response ){

      var $content = ($('.content'));
      $content.empty();

      response.forEach( function ( e ){
       var makeValidClassName = e.name.split( ' ' ).join('-').toLowerCase();
       console.log(makeValidClassName);
       var $cohort         = $( '<div>' );
       $cohort.attr('cohort', makeValidClassName);
       console.log($cohort.attr('cohort'))
       var $body    = $(document.body);
       var $h2      = $( '<h2>' );
       var $button  = $( '<button>' ).text('See Members').attr('cohort-btn', makeValidClassName).addClass('member-btn');
       $button.on('click', function() {
         var getClass = $(this).parent().attr('cohort');
         //needs tweeking
         var toggleSpeed = 40 * e.members.length;
         console.log(e.members.length)
         var $toggleMembersView = $('.'+ getClass)
          $toggleMembersView.slideToggle({duration:500,easing:'swing'});
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
           var $p = $('<p>').addClass(makeValidClassName);
           $p.text(m.firstName).toggle();
           $cohort.append( $p );
         });
       //edit cohort name:
       var id = e._id;
       //need a new place to call this  newMemberForm
       $h2.on( 'click', cohortDashboard);

       ////
        //  var $form   = $ ( '<form>' ).attr('action', '/cohorts/' + e._id + '?_method=PUT' ).attr('method' , 'POST') ;
        //  var $input  = $ ( '<input>' ).attr( 'value' , e.name ).attr( 'name' , 'name' );
        //  $form.append( $input );
        //  $h2.replaceWith( $form );
        //  $h2.appendTo( $body );
      //  });//closes on dbl click
       $('.content').append($cohort);
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


var cohortDashboard  = function () {
  var cohortId =($(this).attr('id'));
  var cohortName =($(this).parent().attr('cohort'));
  $.ajax({
    url : '/cohorts/' + cohortId,

      type: 'GET',

      dataType: 'json',

      success: function ( response ){
        $('.content').empty()
        var $newContent = $('div').addClass('content');
        var $h2 = $( '<h2>' ).text( response.name );
         $h2.on( 'dblclick',{ id: response._id, name: response.name}, editCohortName)
        var $addNewMember = $( '<button>' ).text('add a new member').addClass('add-new-member').attr('id', cohortId);
        $addNewMember.on('click', newMemberForm);
        $newContent.append($addNewMember);
        var $ul = $( '<ul>');
        var $twoCols  = $( '<div>' ).addClass( 'two-cols' );
        var $rollCall = $( '<div>' ).addClass( 'rollcall' );
        var $actions  = $( '<div>' ).addClass ('actions' );


        var $button = $( '<button>').text('whiteboard');
        $button.on('click', {id: response._id},loadWhiteboard );
        $actions.append($button);
        response.members.forEach((m) =>{
          var $li = $('<li>').text (m.firstName);
          $ul.append($li);
          // console.log( m.firstName);
          members.push(m.firstName);

        });
        // console.log(members)
        $rollCall.append($ul);

        $twoCols.append( $rollCall, $actions );
        $newContent.append($twoCols);
        // $('#container').last().remove();




        $newContent.prepend($h2)



      },
      error: function ( error ) {
        console.log ( 'there was an error ' );
      },
      complete: function (xhr , status) {
          // console.log ('The request is complete');
      }

  })
}

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
              $( '.content' ).replaceWith(response);
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
  console.log(cohortId);
  $.ajax({
   url:'../html/new_member_form.html',

   type: 'GET',
 //
   success: function ( response ) {
     console.log(response);
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

var loadWhiteboard = function (data) {
  $.ajax({
    url: '../html/whiteboard.html',
    type: 'GET',
    success: function ( response ){
        var html = response;
        $('.content').children().empty();
        $('.content').append(html);
        var $ul = $('ul');
        $.ajax({
          url: '/cohorts/'+data.data.id,

          type: 'GET',

          dataType: 'json',

          success: function ( response ){
            console.log(response);
            var $ul = $('ul');
            console.log($ul);
            response.members.forEach(function (m){
              var $p = $('<p>').addClass('unchosen');
              $p.text(m.firstName);
              $ul.append($p)
            });

            var $unchosen = $('.unchosen').draggable({
              containment:  $('.row'),
              cursor     : 'pointer',
              snap       :$('.grouping')
            });

          },
          error: function ( error ) {
            console.log ( 'there was an error ' );
          },
          complete: function (xhr , status) {
          // console.log ('The request is complete');
          }
        })






    },
    error: function ( error ) {
      console.log ( 'there was an error ' );
    },
    complete: function (xhr , status) {
    // console.log ('The request is complete');
    }
  })
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
