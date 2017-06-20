$('#random-order').ready(function (){

});

let loadRandomizer = function (data){
  $.ajax({
    url: '../html/randomizer.html',
    type: 'GET',
    success: function ( response ){

      // window.history.pushState(data.data.id , null, 'randomizer/'+ data.data.name)
        let html = response;
        let $colFixDiv = $('<div>').addClass('col-fix');
        $('.content').empty();
        $('.content').append(html);
        $('.content').append($colFixDiv)



        let $randomOrderBtn = $('#random-order');
        let $oneRandomBtn = $('#one-random');
        let $resetBtn = $('#reset');
        $randomOrderBtn.on('click', randomOrder
        );
        $oneRandomBtn.on('click', oneRandom);
        $resetBtn.on('click', reset)
        randomGroupsOptions();

        $.ajax({
          url: '/cohorts/'+ data.data.id,

          type: 'GET',

          dataType: 'json',

          success: function ( response ){
            let $h2 = $('h2').text(data.data.name)
            // console.log(response);
            let $rollCall = $( '<div>' ).addClass( 'rollcall' );
            let $ol = $('<ol>');
            //show members
            response.members.forEach((m) =>{
              let $li = $('<li>').text (m.firstName).toggleClass('not-participating', false).toggleClass('participating');
              $li.attr('member-id', m._id);
              $li.click(function(li){
                $(this).toggleClass('not-participating');
                $(this).toggleClass('participating')
              })
              $ol.append($li);
            });
            let $rosterTitle = $( '<h3>').text('Roster');
            $rollCall.append( $rosterTitle );
            $rollCall.append($ol);
            $($colFixDiv).append($rollCall);



          },
          error: function ( error ) {
            console.log ( 'there was an error ', error );
          },
          complete: function (xhr , status) {
          // console.log ('The request is complete');
          }
        });
    },
    error: function ( error ) {
      console.log ( 'there was an error ' );
    },
    complete: function (xhr , status) {
    // console.log ('The request is complete');
    }
  });
};

window.loadRandomizer = loadRandomizer;
