var randomOrder = function (){
  $('h3').remove();
  var $students = $('li');
  var $newOrder= [];
  for (let i = 0; i < $students.length; i++){
    $newOrder.push($students.eq(i).text());
  }
  var $ol = $( 'ol');
  $ol.empty();
  shuffle($newOrder);
  $newOrder.forEach( s => {
    var $li = $('<li>').text(s)
    $ol.append( $li );
  });
}

var oneRandom = function (){
  $('h3').remove();
  var $ol = $('ol');
  var $students = $('li');
  var winner = $students.eq(Math.floor(Math.random()*$students.length)).text();
  console.log(winner);
  var $winnerDiv = $('<div>');
  var $h3 = $('<h3>').text('Congrats '+ winner + '!');
  $ol.prepend($h3)
  var $content = $('.content');
  $content.append($winnerDiv);
}

var randomGroups = function (){
  console.log('random groups');
}

window.randomOrder = randomOrder;
window.oneRandom = oneRandom;
window.randomGroups = randomGroups;
