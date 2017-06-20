$('.container').ready(function (){
    let $unchosen = $('.unchosen').draggable({
      containment:  $('.row'),
      cursor     : 'pointer',
      snap       :$('.grouping')
    }
  );
});//closes document.ready


function loadWhiteboard(data) {
  $.ajax({
    url: '../html/whiteboard.html',
    type: 'GET',
    success: function ( response ){
        let html = response;
        $('.content').empty();
        $('.content').append(html);
        let $ul = $('ul');
        $.ajax({
          url: '/cohorts/'+data.data.id,

          type: 'GET',

          dataType: 'json',

          success: function ( response ){

            let $ul = $('ul');
            response.members.forEach(function (m){
              let $p = $('<p>').addClass('unchosen');
              $p.text(m.firstName);
              $ul.append($p)
            });

            let $unchosen = $('.unchosen').draggable({
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
