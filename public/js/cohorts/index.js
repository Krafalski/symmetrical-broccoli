

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

       var $cohort         = $( '<div>' );
       $cohort.attr('cohort', makeValidClassName);

       var $body    = $(document.body);
       var $h2      = $( '<h2>' );
      //  var $button  = $( '<button>' ).text('See Members').attr('cohort-btn', makeValidClassName).addClass('member-btn');
      //  $button.on('click', function() {
      //    var getClass = $(this).parent().attr('cohort');
      //    //needs tweeking
      //    var toggleSpeed = 40 * e.members.length;
      //    console.log(e.members.length)
      //    var $toggleMembersView = $('.'+ getClass)
      //     $toggleMembersView.slideToggle({duration:500,easing:'swing'});
      //     if ($(this).text() === 'See Members'){
      //       $(this).text('Hide Members')
      //     } else {
      //       $(this).text('See Members');
      //     }
      //  });
      //  $cohort.append($button);
       $cohort.append($h2);

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

//puts this in browser scope
window.list = list;
