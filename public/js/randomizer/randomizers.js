//global values
let select1 = "";
let select2 = "";

let randomOrder = function (){
  $('h3').remove();
  $('.group-div').remove();
  let $students = $('li');
  let $newOrder= [];
  for (let i = 0; i < $students.length; i++){
    $newOrder.push($students.eq(i).text());
  }
  let $ol = $( 'ol');
  $ol.empty();
  shuffle($newOrder);
  $newOrder.forEach( s => {
    let $li = $('<li>').text(s).toggleClass('not-participating', false).toggleClass('participating');
    $li.click(function(li){
      $(this).toggleClass('not-participating');
      $(this).toggleClass('participating')
    });
    $ol.append( $li );
  });


}

let oneRandom = function (){
  $('h3').remove();
  $('.group-div').remove();
  let $colFix = $( '.col-fix' );

  let $ol = $('ol');
  let $students = $('.participating');
  let winner = $students.eq(Math.floor(Math.random()*$students.length)).text();
  let $winnerDiv = $('<div>');
  let $h3 = $('<h3>').text('Congrats '+ winner + '!');
  $colFix.append($h3)
  let $content = $('.content');
  $content.append($colFix);
}

let randomGroupsOptions = function (){
  $('h3').remove();
  $('.groups').remove();
  $('.options').remove();
  let $colFix = $('.col-fix');
  let $optionsDiv = $( '<div>' ).addClass('options')
  // .css('background-color', 'lightsalmon');
  let $pairs = $('<button>').text('pairs');
  $optionsDiv.append($pairs);
  let $threes = $('<button>').text('threes');
  $optionsDiv.append($threes);
  let $fours = $('<button>').text('fours');
  $optionsDiv.append($fours);
  let $fives = $('<button>').text('fives');
  $optionsDiv.append($fives);
  let $customInput = $( '<input> ').attr('type', 'text').addClass('custom-input');
  $optionsDiv.append($customInput);
  let $custom = $('<button>').text('custom');
  $optionsDiv.append($custom);
  $pairs.on('click', {size:2},groupSettings);
  $threes.on('click', {size:3},groupSettings);
  $fours.on('click', {size:4}, groupSettings);
  $fives.on('click', {size:5}, groupSettings);
  $custom.click(function (e) {
    let customSizing ={};
    customSizing.data ={};
    customSizing.data.size = parseInt($('input').val());

    groupSettings(customSizing);
    $('input').val('');
  });
  let $content = $('.content');
  $optionsDiv.appendTo($content);
  $colFix.appendTo($content);

}



let groupSettings = function ( options ){
  let size = options.data.size || options || 111;
  // console.log(size,options.data.size , options);
  $('h3').remove();
  $('.groups').remove();
  let $students = $('.participating');
  let students= [];
  if(size > $students.length - size) {
    size = size -1;
  }

  for (let i = 0; i < $students.length; i++){
    students.push($students.eq(i).text());
  }
  let studentLock = students.map(function (e) {return e});
  let groups = makeAwesomeGroups(studentLock, size);


  let $groups = $('<div>').addClass('groups');
  groups.forEach(group=>{
    let $groupDiv = $('<div>').addClass('group-div').css('border', '1px solid rgba(222, 229, 229, 1)');
    let $ul = $('<ul>');
    group.forEach(person=>{
      let $li = $('<li>').text(person).addClass('swappable');
      $li.on ('click', function (){
        if (!select1){
        $(this).toggleClass('selected');
        select1 = $(this).text();
      } else {
        //select 1 has a value
        select2 = $(this).text();
        let temp = select2;
        select2 = $(this).text(select1);
        $('.selected').text(temp).removeClass('selected');
        select1 = "";
        select2= "";
      }
      });
      $ul.append($li)
    });
    $groupDiv.append($ul);
    $groups.append($groupDiv);
    $('.col-fix').append($groups)
  });

}

let reset = function (){
  $('h3').remove();
  $('.groups').remove();
  let $students = $('li');
  let orderStudents = [];
  for (let i = 0; i < $students.length; i++){
    orderStudents.push($students.eq(i).text());
  }
  orderStudents.sort();
  $('.rollcall').empty();
  let $ol = $('<ol>')
  $ol.appendTo($('.rollcall'));
  orderStudents.forEach( s => {
    let $li = $('<li>').text(s).toggleClass('not-participating', false).toggleClass('participating');
    $li.click(function(li){
      $(this).toggleClass('not-participating');
      $(this).toggleClass('participating')
    });
    $ol.append( $li );
  });

}

let makeAwesomeGroups = function (classmates, size, ones){

  //shuffle the students
  shuffle(classmates)
  //new array to hold new groups
  let arrayOfAwesome = [];
  //array of small groups
  let newBestFriends = [];
  //make sure this is empty
  let wholeClass = [];
  //preserve original array (or could just store classmates.length in this letiable)
  wholeClass = classmates.map(function(e){
    return e;
  });
  for (let i = 0; i < wholeClass.length/size; i++){
    //if we have an odd number of students, we will need one group of 3


    // console.log(classmates.length , wholeClass.length % size !== 0,classmates.length <= size +1 , wholeClass.length % size !== 0 && classmates.length <= size +1, wholeClass.length/size, i)


    if (wholeClass.length % size !== 0 && classmates.length <= size+1  ){
      //put the remaning students together
      newBestFriends = classmates.map(function(e){
        return e;
      });
      //there are no more classmates to be placed
      classmates = [];
      //sort array alphabetically
      newBestFriends = newBestFriends.sort();
      arrayOfAwesome.push(newBestFriends);
      //reset newBestFriends
      newBestFriends =[];
      break;
    }
    else{
       //pop off inidcated size of students from shuffled students array

       for (let j = 0; j < size; j++){

         newBestFriends.push(classmates.pop());
       }
       //sort array alphabetically
       newBestFriends = newBestFriends.sort();
      //add groups
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
window.reset = reset;
