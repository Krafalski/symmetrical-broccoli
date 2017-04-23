
var testAjax = function (){
  $.ajax({
    url: '/cohorts',

    success: function (){
      $( '<h1>' ).text('u did it!').appendTo('body');
    },
    error : function (){
      alert ('Sorry, there was a problem');
    }

  });
}

//http://stackoverflow.com/questions/38202092/why-javascript-function-coming-undefiend-after-compiling-from-webpack
window.testAjax = testAjax;
