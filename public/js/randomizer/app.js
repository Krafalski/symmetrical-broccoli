//array of Hopper Students
var students = ['Adam', 'Amanda', 'An', 'Anthony' ,'Biren', 'Cathleen', 'Charles','Dylan', 'Ellen', 'Emily', 'Geraldine', 'Hanna', 'Jerrica', 'Jim', 'Joeseph', 'Kylan', 'Lenin', 'Mark', 'Matthew', 'Sheila', 'Soniya', 'Stanley', 'Todd'];

// Check if everyone is there (there should be 23 of you)
//console.log(students.length);// 23 woot!

//Fisher-Yates Shuffle : https://www.frankmitchell.org/2015/01/fisher-yates/
function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

//shuffle students
shuffle(students);

//test that shuffle worked
//console.log(students);//it worked!

window.onload = function() {

  // var button      = document.getElementsByTagName('button')[0];
  var container   = document.getElementById('container');
  var table       = document.createElement('table');
  var tbody       = document.createElement('tbody');
  var thead       = document.createElement('thead');
  var th          = document.createElement('th');
  var tr          = document.createElement('tr');
  th.innerHTML    = 'Name';

  // button.addEventListener('click', function(){
  //     for (let i = 0; i < students.length; i++){
  //       let trBody    = document.createElement('tr');
  //       let td        = document.createElement('td');
  //       td.innerHTML  = students[i];
  //       td.addEventListener ('click', function(){
  //         td.classList.add('youDidItCongrats');
  //       });
  //       trBody.appendChild(td);
  //       tbody.appendChild(trBody);
  //     }
  //
  //     tr.appendChild(th);
  //     thead.appendChild(tr);
  //     table.appendChild(thead);
  //     table.appendChild(tbody);
  //     container.appendChild(table);
  //   });

}; //closes window onload
