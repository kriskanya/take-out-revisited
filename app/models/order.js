'use strict';

var dishes = global.nss.db.collection('dishes');
// var _ = require('lodash');
var Mongo = require('mongodb');


class Order{
  constructor(userId, mealArray){
    this.userId = userId;
    this.meal = mealArray.selections;
    this.date = new Date();
    this.cost = mealArray.cost;
    this.calories = mealArray.calories;
  }

  static findByDishIds(dishId, fn){
    //get the dishes collection and see if the dish you selected matches up with the dish in the collection
    var dishIdArray = dishId.map(id=>Mongo.ObjectID(id));  //need to bring in Mongo because the userId is a string; this turns userId from a string into an object
    dishes.find({_id:{ $in: dishIdArray}}).toArray((err, records)=>{  //trying to match each dish id in the array in the dishes collection
      fn(records);
    });
  }



}

module.exports = Order;
