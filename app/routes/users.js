'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');  //imports the User class

exports.new = (req, res)=>{
  res.render('users/new', {title: 'User Registration'});    //name of the route that you're in/name of the function
};

exports.login = (req, res)=>{
  //we should have the user class do the login for us
  var user = new User(req.body);  //in req.body you are passing in the email and the password
  user.login(u=>{  //the callback here will give us a user that it found in the database, or the user that it inserted
    console.log(u);
  });  //this is an instance method,
};
