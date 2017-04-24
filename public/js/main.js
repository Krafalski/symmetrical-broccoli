//big shout out to https://scotch.io/tutorials/getting-started-with-webpack-module-bundling-magic
//for helping me get webpack set up

//global variables - need to find better place to put them

// I don't need this any more????
// var grabCohortID = '';


// quick test - need to uncomment button in index.html
require ('./ajax_test');

//get functionality of cohorts CRUD- create read (index, show) update destroy
require ('./cohorts/index');
require ('./cohorts/new');
require ('./cohorts/show');
require ('./cohorts/edit');

//get functionality of members CRUD- create read (index, show) update destroy
require ('./members/new');
require ('./members/edit');

//get functionality of whiteboard feature
require ('./whiteboard/whiteboard');


$(function(){

var $button             = $( '.ajax' );
var $listCohorts        = $( '.list-cohorts' );
var $newCohortForm      = $( '.new-cohort-form' );
var $newMemberForm      = $( '.new-member-form' );

// console.log('this is when testAjax is called');
// $button.on('click', testAjax);
//
$newCohortForm.on('click', newCohortForm);

$listCohorts.on( 'click', list );

}); //closes window onload
