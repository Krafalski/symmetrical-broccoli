//big shout out to https://scotch.io/tutorials/getting-started-with-webpack-module-bundling-magic
//for helping me get webpack set up

// quick test - need to uncomment button in index.html
// require ('./ajax_test');

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
require ('./randomizer/app.js');
require ('./randomizer/randomizers.js');
require ('./randomizer/view.js');


//on document ready :
$(function(){

const $listCohorts        = $( '.list-cohorts' );
const $newCohortForm      = $( '.new-cohort-form' );

$newCohortForm.on('click', newCohortForm);

$listCohorts.on( 'click', list );

}); //closes window onload
