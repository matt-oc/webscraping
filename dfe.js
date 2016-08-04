
var page = require('webpage').create();
var system = require('system');
var args = system.args;
var name = args[1];
//captures desktop view
page.viewportSize = { width: 1024, height: 768 };


//trickery to allow variables in evaluate function
function evaluate(page, func) {
  var args = [].slice.call(arguments, 2);
  var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
  return page.evaluate(fn);
}

page.open('http://www.downforeveryoneorjustme.com/', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
    phantom.exit();
  } 
  else {
    evaluate(page, function(name) {
      document.getElementById("domain_input").value = name;
      document.getElementById("downform").action = name;
      document.getElementById("downform").submit();
    }, name);
    
    // capture screen with fields complete
    page.render( name + '.png');
    
    setTimeout(
      function () {
        //capture screen after submission
        page.render(name + '-result.png');
        console.log("Finished checking " + name);
        phantom.exit(0);
      },
      1000 // wait 1,000ms (1s)
    );
  }
});