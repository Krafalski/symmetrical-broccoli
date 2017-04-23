$('.container').ready(function (){
  var $unchosen = $('.unchosen').draggable({
    containment:  $('.row'),
    cursor     : 'pointer',
    snap       :$('.grouping')
  }
);


});//closes document.ready


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
        });






    },
    error: function ( error ) {
      console.log ( 'there was an error ' );
    },
    complete: function (xhr , status) {
    // console.log ('The request is complete');
    }
  })
};

window.loadWhiteboard = loadWhiteboard;
