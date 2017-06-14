$('#random-order').ready(function (){

});

var loadRandomizer = function (data){
  $.ajax({
    url: '../html/randomizer.html',
    type: 'GET',
    success: function ( response ){

      // window.history.pushState(data.data.id , null, 'randomizer/'+ data.data.name)
        var html = response;
        var $colFixDiv = $('<div>').addClass('col-fix');
        $('.content').empty();
        $('.content').append(html);
        $('.content').append($colFixDiv)



        var $randomOrderBtn = $('#random-order');
        var $oneRandomBtn = $('#one-random');
        var $randomGroupsBtn = $('#random-groups');
        $randomOrderBtn.on('click', randomOrder
        );
        $oneRandomBtn.on('click', oneRandom);
        $randomGroupsBtn.on('click', randomGroupsOptions)


        $.ajax({
          url: '/cohorts/'+ data.data.id,

          type: 'GET',

          dataType: 'json',

          success: function ( response ){
            var $h2 = $('h2').text(data.data.name)
            // console.log(response);
            var $rollCall = $( '<div>' ).addClass( 'rollcall' );
            var $ol = $('<ol>');
            //show members
            response.members.forEach((m) =>{
              var $li = $('<li>').text (m.firstName).toggleClass('not-participating', false).toggleClass('participating');
              $li.attr('member-id', m._id);
              $li.click(function(li){
                $(this).toggleClass('not-participating');
                $(this).toggleClass('participating')
              })
              $ol.append($li);
            });
            $rollCall.append($ol);
            $($colFixDiv).append($rollCall)


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
