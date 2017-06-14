var cohortDashboard  = function (cohortID) {
  var cohortId =($(this).attr('id'))|| cohortID;
  var cohortName =($(this).parent().attr('cohort'));
  $.ajax({
    url : '/cohorts/' + cohortId,

      type: 'GET',

      dataType: 'json',

      success: function ( response ){
        var $container = $('#cotainer');
        //clear content to fill up again
        // console.log($('.content'));
        var $content = ($('.content'));
        $content.empty();
        // console.log($('.content'));
        //make new content


        //cohort name
        var $h2 = $( '<h2>' ).text( response.name );
         $h2.on( 'dblclick',{ id: response._id, name: response.name}, editCohortName)

        // add a new member
        var $addNewMember = $( '<button>' ).text('add a new member').addClass('add-new-member').attr('id', cohortId);
        $addNewMember.on('click', newMemberForm);

        //
        $content.append($addNewMember);
        var $ul = $( '<ul>');
        var $twoCols  = $( '<div>' ).addClass( 'two-cols' );
        var $rollCall = $( '<div>' ).addClass( 'rollcall' );
        var $actions  = $( '<div>' ).addClass ('actions' );


        var $whiteboardButton = $( '<button>').text('whiteboard');
        
        $whiteboardButton.on('click', {id: response._id, name: response.name},loadWhiteboard );
        $actions.append($whiteboardButton);
        var $randomizerButton = $( '<button>').text ('randomizer');
        $randomizerButton.on('click', {id: response._id , name: response.name}, loadRandomizer);
        $actions.append($randomizerButton);


        //show members
        response.members.forEach((m) =>{
          var $li = $('<li>').text (m.firstName);
          $li.attr('member-id', m._id);
          $li.on('click',{id: response._id}, editMember);
          $ul.append($li);


        });
        // console.log(members)
        $rollCall.append($ul);

        $twoCols.append( $rollCall, $actions );
        $content.append($twoCols);
        // $('#container').last().remove();




        $content.prepend($h2)



      },
      error: function ( error ) {
        console.log ( 'there was an error ' );
      },
      complete: function (xhr , status) {
          // console.log ('The request is complete');
      }

  });
}

window.cohortDashboard = cohortDashboard;
