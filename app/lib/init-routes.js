'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var orders = traceur.require(__dirname + '/../routes/orders.js');


  app.get('/', dbg, home.index);
  app.get('/help', dbg, home.help);

  app.get('/login', dbg, users.new);  //getting the page for the user to put in their info
  app.post('/login', dbg, users.login);  //this is the route for when the user posts their info

  app.get('/orders', dbg, orders.new);

  console.log('Routes Loaded');
  fn();
}
