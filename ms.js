
var page = require('webpage').create();
var system = require('system');
var args = system.args;
var name = args[1];


//trickery to allow variables in evaluate function
function evaluate(page, func) {
  var args = [].slice.call(arguments, 2);
  var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
  return page.evaluate(fn);
}

page.open('http://www.moneysupermarket.com/gas-and-electricity/', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
    phantom.exit();
  } 
  else {
    evaluate(page, function(name) {
      document.getElementById("btnEnquiry").click();
      
    }, name);
    
    // capture screen with fields complete
    //page.render( name + '.png');
    
    setTimeout(
      function () {
        //capture screen after submission
        page.render('images/' + name + '-result.png');
        console.log("Finished checking " + name);
        phantom.exit(0);
      },
      3000 // wait 3,000ms (3s)
    );
  }
});