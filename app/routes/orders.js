'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');  //imports the Dish class
var User = traceur.require(__dirname + '/../models/user.js');  //imports the User class


exports.new = (req, res)=>{
  Dish.findAll(dishes=>{  //when you have the dishes, put them all in the jade file
    User.findByUserId(req.session.userId, user=>{
      res.render('orders/new', {user:user, dishes: dishes, title: 'Order Food'});    //name of the route that you're in/name of the function

    });  //pass in the user id, callback that will actually give you teh user you're looking for
  });
};
