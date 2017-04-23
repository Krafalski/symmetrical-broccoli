$('.container').ready(function (){
  var $unchosen = $('.unchosen').draggable({
    containment:  $('.row'),
    cursor     : 'pointer',
    snap       :$('.grouping')
  }
);


});//closes document.ready
