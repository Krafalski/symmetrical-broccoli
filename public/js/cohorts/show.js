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
          // members.push(m.firstName);

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

  });
}

window.cohortDashboard = cohortDashboard;
