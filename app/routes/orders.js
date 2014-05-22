/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');  //imports the Dish class
var User = traceur.require(__dirname + '/../models/user.js');  //imports the User class
var Order = traceur.require(__dirname + '/../models/order.js');  //imports the User class


exports.new = (req, res)=>{
  Dish.menu(menus=>{  //when you have the dishes, put them all in the jade file
    User.findByUserId(req.session.userId, user=>{
      res.render('orders/new', {user:user, menus: menus, title: 'Order Food'});    //name of the route that you're in/name of the function

    });  //pass in the user id, callback that will actually give you teh user you're looking for
  });
};

exports.add = (req, res)=>{
  Dish.menu(menus=>{  //when you have the dishes, put them all in the jade file
      res.render('orders/addmenu', {menus: menus, title: 'Order Food'});
    });
};

exports.create = (req, res)=>{  //prep our data to make a new object, so save in the database
  var mealArray = [];
  var selections = {};
  console.log(req.body.cost);
  for(var i = 0; i < req.body.qty.length; i++){
    var dishObject = {};
    dishObject.qty = req.body.qty[i];
    dishObject.dishId = req.body.dishId[i];
    mealArray.push(dishObject);
  }

  Order.findByDishIds(req.body.dishId, dishes=>{
    var order = {};
    var names = [];
    for(var j = 0; j < dishes.length, j++){
      names.push(dishes[j].name);
      order.selections = names;
    }
    order.total = req.body.total[0];
    order.calories = req.body.calories[0];

    orders.save(order, ()=>res.redirect('/orders'));
  });
};
