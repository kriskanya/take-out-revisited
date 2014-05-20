'use strict';

var dishes = global.nss.db.collection('dishes');

class Dish{
  static findAll(fn){  //you're finding all the dishes in the collection dishes
    dishes.find().toArray((e, d)=>fn(d));  //give it back to whoever called you
  }
}

module.exports = Dish;  //need to export out the model in order for it to be used
