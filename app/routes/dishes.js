'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');  //imports the Dish class

exports.menu = (req, res)=>{
  //need to go into dishes collection and find all dishes with menu = 'lunch' (or whatever)

  Dish.findByMenu(req.params.menu, dishes=>{
    res.render('dishes/menu', {dishes:dishes});    //name of the route that you're in/name of the function

  });

};
