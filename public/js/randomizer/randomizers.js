var randomOrder = function (){
  $('h3').remove();
  $('.group-div').remove();
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
  $('.group-div').remove();
  var $ol = $('ol');
  var $students = $('li');
  var winner = $students.eq(Math.floor(Math.random()*$students.length+1)).text();
  console.log(winner);
  var $winnerDiv = $('<div>');
  var $h3 = $('<h3>').text('Congrats '+ winner + '!');
  $ol.prepend($h3)
  var $content = $('.content');
  $content.append($winnerDiv);
}

var randomGroupsOptions = function (){
  $('h3').remove();
  $('.group-div').remove();
  var $content = $('.content');
  var $optionsDiv = $( '<div>' ).addClass('options').css('background-color', 'lightsalmon').css('min-height', '300px');
  var $pairs = $('<button>').text('pairs');
  $optionsDiv.append($pairs);
  var $threes = $('<button>').text('threes');
  $optionsDiv.append($threes);
  $pairs.on('click', {size:2},groupSettings);

  $content.append($optionsDiv)

}

var groupSettings = function ( options ){
  var size = options.data.size;
  $('h3').remove();
  $('.group-div').remove();
  var $students = $('li');
  var students= [];
  for (let i = 0; i < $students.length; i++){
    students.push($students.eq(i).text());
  }
  var studentLock = students.map(function (e) {return e});
  console.log('studentlock', studentLock);
  var groups = makeAwesomeGroups(studentLock, size);
  console.log(groups);
  console.log('studetns after awesome groups' ,students);


  groups.forEach(group=>{
    var $groupDiv = $('<div>').addClass('group-div').css('border', '1px solid gold').css('width', '50%');
    var $ul = $('<ul>');
    group.forEach(person=>{
      var $li = $('<li>').text(person);
      $ul.append($li)
    });
    $groupDiv.append($ul);
    $('.content').append($groupDiv)
  });

}

var makeAwesomeGroups = function (classmates, size, ones){

  //shuffle the students
   shuffle(classmates)
  //new array to hold new groups
  var arrayOfAwesome = [];
  //array of small groups
  var newBestFriends = [];
  //make sure this is empty
  var wholeClass = [];
  //preserve original array (or could just store classmates.length in this variable)
  wholeClass = classmates.map(function(e){
    return e;
  });
  for (var i = 0; i < wholeClass.length/size-1; i++){
    //if we have an odd number of students, we will need one group of 3
    if (wholeClass.length % 2 !== 0 && classmates.length <= size + 1){
      //put the remaning three students together
      newBestFriends = classmates.map(function(e){
        return e;
      });
      //there are no more classmates to be placed
      classmates = [];
      arrayOfAwesome.push(newBestFriends);
      //reset newBestFriends
      newBestFriends =[];
    } else{
       //pop off three students from shuffled students array
       for (let j = 0; j < size; j++){
         newBestFriends.push(classmates.pop());
       }
      //add pairs
        arrayOfAwesome.push(newBestFriends);
      //reset newBestFriends
        newBestFriends = [];
      }
  }
  //See new groups!

  return arrayOfAwesome;
}

window.randomOrder = randomOrder;
window.oneRandom = oneRandom;
window.randomGroupsOptions = randomGroupsOptions;
