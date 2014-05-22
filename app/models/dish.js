'use strict';

var dishes = global.nss.db.collection('dishes');
var _ = require('lodash');

class Dish{
  static findAll(fn){  //you're finding all the dishes in the collection dishes
    dishes.find().toArray((e, d)=>fn(d));  //give it back to whoever called you
  }

  static menu(fn){  //needs a callback for when you are going to call it
    Dish.findAll(dishes=>{  //gives you all the dishes back
      //this gives you back an array of objects to an array of strings
      var menus = _(dishes).map(d=>d.menu).uniq().value();  //loops over each dish and returns just the string (map returns strings)
        //.uniq is a lodash method that gives you all the unique values
        fn(menus);  //returns an array of menu items
    });
  }

  static findByMenu(menu, fn){
    dishes.find({menu: menu}).toArray((err, records)=>{
      fn(records);
    });

  }
}
module.exports = Dish;  //need to export out the model in order for it to be used
