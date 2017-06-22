/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var editCohortName = function editCohortName(cohort) {
  //editCohortName( e.name, e._id)oi,k
  var $h2 = $(this);
  var $body = 'body';
  var $form = $('<form>').attr('action', '/cohorts/' + cohort.data.id + '?_method=PUT').attr('method', 'POST');
  var $input = $('<input>').attr('value', cohort.data.name).attr('name', 'name');
  var $update = $('<input>').attr('type', 'submit').addClass('btn').attr('value', 'update');
  $form.append($input, $update);
  var $delete = $('<form>').attr('action', '/cohorts/' + cohort.data.id + '?_method=DELETE').attr('method', 'POST');
  var $deleteBtn = $('<input>').attr('type', 'submit').addClass('btn').attr('value', 'delete forever');
  $delete.append($deleteBtn);
  $form.append($delete);
  // $('.content').append( $form );
  //  $form.append( $input );
  $h2.replaceWith($form);
  $h2.appendTo($body);
};

window.editCohortName = editCohortName;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var list = function list() {

  $.ajax({
    url: '/cohorts',

    type: 'GET',

    dataType: 'json',

    success: function success(response) {

      var $content = $('.content');
      $content.empty();

      response.forEach(function (e) {
        var makeValidClassName = e.name.split(' ').join('-').toLowerCase();

        var $cohort = $('<div>');
        $cohort.attr('cohort', makeValidClassName);

        var $body = $(document.body);
        var $h2 = $('<h2>');
        //  var $button  = $( '<button>' ).text('See Members').attr('cohort-btn', makeValidClassName).addClass('member-btn');
        //  $button.on('click', function() {
        //    var getClass = $(this).parent().attr('cohort');
        //    //needs tweeking
        //    var toggleSpeed = 40 * e.members.length;
        //    console.log(e.members.length)
        //    var $toggleMembersView = $('.'+ getClass)
        //     $toggleMembersView.slideToggle({duration:500,easing:'swing'});
        //     if ($(this).text() === 'See Members'){
        //       $(this).text('Hide Members')
        //     } else {
        //       $(this).text('See Members');
        //     }
        //  });
        //  $cohort.append($button);
        $cohort.append($h2);

        var $input = $('<input>');
        //need to move this functionality within individual cohort's dashboard
        var $x = $('<form>').attr('action', '/cohorts/' + e._id + '?_method=DELETE').attr('method', 'POST').addClass('delete-btn');
        $input.attr('type', 'submit').attr('value', 'X').css('background-color', 'red');
        $x.append($input);
        //add attribute so cohort name can be edited
        $h2.attr('id', e._id);
        $h2.text(e.name);

        //needs to be moved
        //  $cohort.append($x);

        e.members.forEach(function (m) {
          var $p = $('<p>').addClass(makeValidClassName);
          $p.text(m.firstName).toggle();
          $cohort.append($p);
        });
        //edit cohort name:
        var id = e._id;
        //need a new place to call this  newMemberForm
        $h2.on('click', cohortDashboard);

        ////
        //  var $form   = $ ( '<form>' ).attr('action', '/cohorts/' + e._id + '?_method=PUT' ).attr('method' , 'POST') ;
        //  var $input  = $ ( '<input>' ).attr( 'value' , e.name ).attr( 'name' , 'name' );
        //  $form.append( $input );
        //  $h2.replaceWith( $form );
        //  $h2.appendTo( $body );
        //  });//closes on dbl click
        $('.content').append($cohort);
      }); //closes forEach
      // $( '.content' ).append( $cohort );
    }, //end first success
    error: function error(_error) {
      console.log('there was an error ');
    },
    complete: function complete(xhr, status) {
      // console.log ('The request is complete');
    }
  }); // end first ajax
}; // end list cohorts

//puts this in browser scope
window.list = list;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//works
var newCohortForm = function newCohortForm() {
  $.ajax({
    url: '../html/new_cohort_form.html',

    type: 'GET',

    success: function success(response) {
      // console.log( 'the form was loaded', response);
      $('.content').html(response);
      var $submit = $('.submit');

      $submit.on('click', function (event) {
        event.preventDefault();

        console.log($('input').val());
        $.ajax({
          url: '/cohorts',

          type: 'POST',

          data: { name: $('input').val() },

          dataType: 'json',

          success: function success(response) {

            console.log('the data was created', response);

            window.list();
          },
          error: function error(_error) {
            console.log('there was an error ');
          },
          complete: function complete(xhr, status) {
            console.log('The request is complete');
          }
        });
      });
    },
    error: function error(_error2) {
      console.log('the form was not loaded', _error2);
    },

    complete: function complete(xhr, status) {
      console.log('The request is complete');
    }
  });
};

window.newCohortForm = newCohortForm;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cohortDashboard = function cohortDashboard(cohortID) {
  var cohortId = $(this).attr('id') || cohortID;
  var cohortName = $(this).parent().attr('cohort');
  $.ajax({
    url: '/cohorts/' + cohortId,

    type: 'GET',

    dataType: 'json',

    success: function success(response) {
      var $container = $('#cotainer');
      //clear content to fill up again
      // console.log($('.content'));
      var $content = $('.content');
      $content.empty();
      // console.log($('.content'));
      //make new content


      //cohort name
      var $h2 = $('<h2>').text(response.name);
      $h2.on('dblclick', { id: response._id, name: response.name }, editCohortName);

      // add a new member
      var $addNewMember = $('<button>').text('add a new member').addClass('add-new-member').attr('id', cohortId);
      $addNewMember.on('click', newMemberForm);

      //
      $content.append($addNewMember);
      var $ol = $('<ol>');
      var $twoCols = $('<div>').addClass('two-cols');
      var $rollCall = $('<div>').addClass('rollcall');
      var $actions = $('<div>').addClass('actions');

      var $whiteboardButton = $('<button>').text('whiteboard');

      $whiteboardButton.on('click', { id: response._id, name: response.name }, loadWhiteboard);
      $actions.append($whiteboardButton);
      var $randomizerButton = $('<button>').text('randomizer');
      $randomizerButton.on('click', { id: response._id, name: response.name }, loadRandomizer);
      $actions.append($randomizerButton);

      //show members
      response.members.forEach(function (m) {
        var $li = $('<li>').text(m.firstName);
        $li.attr('member-id', m._id);
        $li.on('click', { id: response._id }, editMember);
        $ol.append($li);
      });
      // console.log(members)
      var $rosterTitle = $('<h3>').text('Roster');
      $rollCall.append($rosterTitle);
      $rollCall.append($ol);

      $twoCols.append($rollCall, $actions);
      $content.append($twoCols);
      // $('#container').last().remove();


      $content.prepend($h2);
    },
    error: function error(_error) {
      console.log('there was an error ', _error);
    },
    complete: function complete(xhr, status) {
      // console.log ('The request is complete');
    }

  });
};

window.cohortDashboard = cohortDashboard;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var editMember = function editMember(cohortInfo) {

  var that = $(this);
  var memberId = $(this).attr('member-id');
  $.ajax({
    url: '../../html/new_member_form.html',
    type: 'GET',

    success: function success(response) {
      // console.log($(this));
      // console.log( 'cohort info' , cohortInfo.data.id) ;
      $(response).insertAfter(that);
      $('form').attr('action', '/cohorts/' + cohortInfo.data.id + '/members/' + memberId + '?_method=PUT').attr('method', 'POST');
      // console.log('first success form', $('form'));
      //in order to update must get member info
      $.ajax({
        url: '/members/' + memberId,
        type: 'GET',
        dataType: 'json',

        success: function success(member) {
          // console.log( 'this is student get' ,member );
          $('#first-name').attr('value', member.firstName);
          $('#last-name').attr('value', member.lastName);
          $('#nick-name').attr('value', member.nickName);
          $('#position').attr('value', member.position);
          $('#notes').attr('value', member.notes);
          var $form = $('form');
          // console.log($form)
          var $delete = $('<form>').attr('action', '/cohorts/' + cohortInfo.data.id + '/members/' + member._id + '?_method=DELETE').attr('method', 'POST');
          var $deleteBtn = $('<input>').attr('type', 'submit').addClass('btn').attr('value', 'delete forever');
          $delete.append($deleteBtn);
          $form.append($delete);
        },
        error: function error(_error) {
          console.log('there was an error  in getting json', _error);
        },
        complete: function complete(xhr, status) {
          // console.log ('The request is complete');
        }
      });

      // $('#first-name').attr('value', )

    },
    error: function error(_error2) {
      console.log('there was an error ing getting the form', _error2);
    },
    complete: function complete(xhr, status) {
      // console.log ('The request is complete');
    }
  });
};

window.editMember = editMember;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var newMember = { cohortId: $('.add-new-member').attr('id') };

//works
var newMemberForm = function newMemberForm() {
  var cohortId = $(this).attr('id');
  // console.log(cohortId);
  $.ajax({
    url: '../html/new_member_form.html',

    type: 'GET',
    //
    success: function success(response) {
      //  console.log(response);
      var $actions = $('.actions');
      $actions.prepend(response);
      var $form = $('form');
      var $input = $('<input>').attr('type', 'hidden').attr('value', cohortId).attr('name', 'cohortId');
      $form.prepend($input);
      var $submit = $('.submit');
      $submit.on('click', function (e) {
        e.preventDefault();
        //  console.log( 'default prevented');

        var newMember = {
          cohortId: $('.add-new-member').attr('id'),
          firstName: $('#first-name').val(),
          lastName: $('#last-name').val(),
          nickName: $('#nick-name').val(),
          position: $('#position').val(),
          notes: $('#notes').val()
        };

        $.ajax({
          url: '/members',

          type: 'POST',

          data: newMember,

          dataType: 'json',

          success: function success(response) {
            //  console.log ('the data was created' , response);
            window.cohortDashboard(newMember.cohortId);
          },
          error: function error(_error) {
            console.log('there was an error ', _error);
          },
          complete: function complete(xhr, status) {
            //  console.log ('The request is complete');
          }
        }); //closes closest ajax
      }); //closes on
    } // closes success

    , error: function error(_error2) {
      console.log('there was an error ');
    },
    complete: function complete(xhr, status) {
      // console.log ('The request is complete');
    }

  }); //closes ajax
};

window.newMemberForm = newMemberForm;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Fisher-Yates Shuffle : https://www.frankmitchell.org/2015/01/fisher-yates/
function shuffle(array) {
  var i = 0,
      j = 0,
      temp = null;

  for (var _i = array.length - 1; _i > 0; _i -= 1) {
    j = Math.floor(Math.random() * (_i + 1));
    temp = array[_i];
    array[_i] = array[j];
    array[j] = temp;
  }
}

window.shuffle = shuffle;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//global values
var select1 = "";
var select2 = "";

var randomOrder = function randomOrder() {
  $('h3').remove();
  $('.group-div').remove();
  var $students = $('li');
  var $newOrder = [];
  for (var i = 0; i < $students.length; i++) {
    $newOrder.push($students.eq(i).text());
  }
  var $ol = $('ol');
  $ol.empty();
  shuffle($newOrder);
  $newOrder.forEach(function (s) {
    var $li = $('<li>').text(s).toggleClass('not-participating', false).toggleClass('participating');
    $li.click(function (li) {
      $(this).toggleClass('not-participating');
      $(this).toggleClass('participating');
    });
    $ol.append($li);
  });
};

var oneRandom = function oneRandom() {
  $('h3').remove();
  $('.group-div').remove();
  var $colFix = $('.col-fix');

  var $ol = $('ol');
  var $students = $('.participating');
  var winner = $students.eq(Math.floor(Math.random() * $students.length)).text();
  var $winnerDiv = $('<div>');
  var $h3 = $('<h3>').text('Congrats ' + winner + '!');
  $colFix.append($h3);
  var $content = $('.content');
  $content.append($colFix);
};

var randomGroupsOptions = function randomGroupsOptions() {
  $('h3').remove();
  $('.groups').remove();
  $('.options').remove();
  var $colFix = $('.col-fix');
  var $optionsDiv = $('<div>').addClass('options');
  // .css('background-color', 'lightsalmon');
  var $pairs = $('<button>').text('pairs');
  $optionsDiv.append($pairs);
  var $threes = $('<button>').text('threes');
  $optionsDiv.append($threes);
  var $fours = $('<button>').text('fours');
  $optionsDiv.append($fours);
  var $fives = $('<button>').text('fives');
  $optionsDiv.append($fives);
  var $customInput = $('<input> ').attr('type', 'text').addClass('custom-input');
  $optionsDiv.append($customInput);
  var $custom = $('<button>').text('custom');
  $optionsDiv.append($custom);
  $pairs.on('click', { size: 2 }, groupSettings);
  $threes.on('click', { size: 3 }, groupSettings);
  $fours.on('click', { size: 4 }, groupSettings);
  $fives.on('click', { size: 5 }, groupSettings);
  $custom.click(function (e) {
    var customSizing = {};
    customSizing.data = {};
    customSizing.data.size = parseInt($('input').val());

    groupSettings(customSizing);
    $('input').val('');
  });
  var $content = $('.content');
  $optionsDiv.appendTo($content);
  $colFix.appendTo($content);
};

var groupSettings = function groupSettings(options) {
  var size = options.data.size || options || 111;
  // console.log(size,options.data.size , options);
  $('h3').remove();
  $('.groups').remove();
  var $students = $('.participating');
  var students = [];
  if (size > $students.length - size) {
    size = size - 1;
  }

  for (var i = 0; i < $students.length; i++) {
    students.push($students.eq(i).text());
  }
  var studentLock = students.map(function (e) {
    return e;
  });
  var groups = makeAwesomeGroups(studentLock, size);

  var $groups = $('<div>').addClass('groups');
  groups.forEach(function (group) {
    var $groupDiv = $('<div>').addClass('group-div').css('border', '1px solid rgba(222, 229, 229, 1)');
    var $ul = $('<ul>');
    group.forEach(function (person) {
      var $li = $('<li>').text(person).addClass('swappable');
      $li.on('click', function () {
        if (!select1) {
          $(this).toggleClass('selected');
          select1 = $(this).text();
        } else {
          //select 1 has a value
          select2 = $(this).text();
          var temp = select2;
          select2 = $(this).text(select1);
          $('.selected').text(temp).removeClass('selected');
          select1 = "";
          select2 = "";
        }
      });
      $ul.append($li);
    });
    $groupDiv.append($ul);
    $groups.append($groupDiv);
    $('.col-fix').append($groups);
  });
};

var reset = function reset() {
  $('h3').remove();
  $('.groups').remove();
  var $students = $('li');
  var orderStudents = [];
  for (var i = 0; i < $students.length; i++) {
    orderStudents.push($students.eq(i).text());
  }
  orderStudents.sort();
  $('.rollcall').empty();
  var $ol = $('<ol>');
  $ol.appendTo($('.rollcall'));
  orderStudents.forEach(function (s) {
    var $li = $('<li>').text(s).toggleClass('not-participating', false).toggleClass('participating');
    $li.click(function (li) {
      $(this).toggleClass('not-participating');
      $(this).toggleClass('participating');
    });
    $ol.append($li);
  });
};

var makeAwesomeGroups = function makeAwesomeGroups(classmates, size, ones) {

  //shuffle the students
  shuffle(classmates);
  //new array to hold new groups
  var arrayOfAwesome = [];
  //array of small groups
  var newBestFriends = [];
  //make sure this is empty
  var wholeClass = [];
  //preserve original array (or could just store classmates.length in this letiable)
  wholeClass = classmates.map(function (e) {
    return e;
  });
  for (var i = 0; i < wholeClass.length / size; i++) {
    //if we have an odd number of students, we will need one group of 3


    // console.log(classmates.length , wholeClass.length % size !== 0,classmates.length <= size +1 , wholeClass.length % size !== 0 && classmates.length <= size +1, wholeClass.length/size, i)


    if (wholeClass.length % size !== 0 && classmates.length <= size + 1) {
      //put the remaning students together
      newBestFriends = classmates.map(function (e) {
        return e;
      });
      //there are no more classmates to be placed
      classmates = [];
      //sort array alphabetically
      newBestFriends = newBestFriends.sort();
      arrayOfAwesome.push(newBestFriends);
      //reset newBestFriends
      newBestFriends = [];
      break;
    } else {
      //pop off three students from shuffled students array

      for (var j = 0; j < size; j++) {

        newBestFriends.push(classmates.pop());
      }
      //sort array alphabetically
      newBestFriends = newBestFriends.sort();
      //add pairs
      arrayOfAwesome.push(newBestFriends);
      //reset newBestFriends
      newBestFriends = [];
    }
  }
  //See new groups!

  return arrayOfAwesome;
};

window.randomOrder = randomOrder;
window.oneRandom = oneRandom;
window.randomGroupsOptions = randomGroupsOptions;
window.reset = reset;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$('#random-order').ready(function () {});

var loadRandomizer = function loadRandomizer(data) {
  $.ajax({
    url: '../html/randomizer.html',
    type: 'GET',
    success: function success(response) {

      // window.history.pushState(data.data.id , null, 'randomizer/'+ data.data.name)
      var html = response;
      var $colFixDiv = $('<div>').addClass('col-fix');
      $('.content').empty();
      $('.content').append(html);
      $('.content').append($colFixDiv);

      var $randomOrderBtn = $('#random-order');
      var $oneRandomBtn = $('#one-random');
      var $resetBtn = $('#reset');
      $randomOrderBtn.on('click', randomOrder);
      $oneRandomBtn.on('click', oneRandom);
      $resetBtn.on('click', reset);
      randomGroupsOptions();

      $.ajax({
        url: '/cohorts/' + data.data.id,

        type: 'GET',

        dataType: 'json',

        success: function success(response) {
          var $h2 = $('h2').text(data.data.name);
          // console.log(response);
          var $rollCall = $('<div>').addClass('rollcall');
          var $ol = $('<ol>');
          //show members
          response.members.forEach(function (m) {
            var $li = $('<li>').text(m.firstName).toggleClass('not-participating', false).toggleClass('participating');
            $li.attr('member-id', m._id);
            $li.click(function (li) {
              $(this).toggleClass('not-participating');
              $(this).toggleClass('participating');
            });
            $ol.append($li);
          });
          var $rosterTitle = $('<h3>').text('Roster');
          $rollCall.append($rosterTitle);
          $rollCall.append($ol);
          $($colFixDiv).append($rollCall);
        },
        error: function error(_error) {
          console.log('there was an error ', _error);
        },
        complete: function complete(xhr, status) {
          // console.log ('The request is complete');
        }
      });
    },
    error: function error(_error2) {
      console.log('there was an error ');
    },
    complete: function complete(xhr, status) {
      // console.log ('The request is complete');
    }
  });
};

window.loadRandomizer = loadRandomizer;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$('.container').ready(function () {
  var $unchosen = $('.unchosen').draggable({
    containment: $('.row'),
    cursor: 'pointer',
    snap: $('.grouping')
  });
}); //closes document.ready


function loadWhiteboard(data) {
  $.ajax({
    url: '../html/whiteboard.html',
    type: 'GET',
    success: function success(response) {
      var html = response;
      $('.content').empty();
      $('.content').append(html);
      var $ul = $('ul');
      $.ajax({
        url: '/cohorts/' + data.data.id,

        type: 'GET',

        dataType: 'json',

        success: function success(response) {

          var $ul = $('ul');
          response.members.forEach(function (m) {
            var $p = $('<p>').addClass('unchosen');
            $p.text(m.firstName);
            $ul.append($p);
          });

          var $unchosen = $('.unchosen').draggable({
            containment: $('.row'),
            cursor: 'pointer',
            snap: $('.grouping')
          });
        },
        error: function error(_error) {
          console.log('there was an error ');
        },
        complete: function complete(xhr, status) {
          // console.log ('The request is complete');
        }
      });
    },
    error: function error(_error2) {
      console.log('there was an error ');
    },
    complete: function complete(xhr, status) {
      // console.log ('The request is complete');
    }
  });
};

window.loadWhiteboard = loadWhiteboard;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//big shout out to https://scotch.io/tutorials/getting-started-with-webpack-module-bundling-magic
//for helping me get webpack set up

// quick test - need to uncomment button in index.html
// require ('./ajax_test');

//get functionality of cohorts CRUD- create read (index, show) update destroy
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(0);

//get functionality of members CRUD- create read (index, show) update destroy
__webpack_require__(5);
__webpack_require__(4);

//get functionality of whiteboard feature
__webpack_require__(9);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);

//on document ready :
$(function () {

  var $listCohorts = $('.list-cohorts');
  var $newCohortForm = $('.new-cohort-form');

  $newCohortForm.on('click', newCohortForm);

  $listCohorts.on('click', list);
}); //closes window onload

/***/ })
/******/ ]);