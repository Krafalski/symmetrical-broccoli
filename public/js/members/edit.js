var editMember  = function ( cohortInfo ){


  var that     =  $( this );
  var memberId =   $( this ).attr( 'member-id' );
  $.ajax({
    url: '../../html/new_member_form.html',
    type: 'GET',

    success : function ( response ){
      // console.log($(this));
      console.log( 'cohort info' , cohortInfo.data.id) ;
      $( response ).insertAfter(that);
      $( 'form' ).attr('action', '/cohorts/' + cohortInfo.data.id + '/members/' + memberId+'?_method=PUT').attr('method', 'POST');

      //in order to update must get member info
      $.ajax({
        url: '/members/' + memberId,
        type: 'GET',
        dataType: 'json',

        success: function( member ){
          console.log( 'this is student get' ,member );
          $( '#first-name' ).attr( 'value', member.firstName );
          $( '#last-name' ).attr( 'value' , member.lastName );
          $( '#nick-name' ).attr( 'value', member.nickName );
          $( '#position' ).attr( 'value', member.position );
          $( '#notes' ).attr( 'value', member.notes );
          var $form = $( 'form' );
          console.log($form)
          var $delete = $ ( '<form>' ).attr('action', '/cohorts/' + cohortInfo.data.id + '/members/'+ member._id + '?_method=DELETE' ).attr('method' , 'POST') ;
          var $deleteBtn = $( '<input>' ).attr('type', 'submit' ).addClass( 'btn' ).attr('value', 'delete forever');
          $delete.append( $deleteBtn );
          $form.append( $delete );
        },
        error: function ( error ) {
          console.log ( 'there was an error  in getting json' , error );
        },
        complete: function (xhr , status) {
            // console.log ('The request is complete');
        }
      })



      $('#first-name').attr('value', )





    },
    error: function ( error ) {
      console.log ( 'there was an error ing getting the form', error );
    },
    complete: function (xhr , status) {
        // console.log ('The request is complete');
    }
  })

}

window.editMember = editMember;
