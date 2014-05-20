'use strict';

var users = global.nss.db.collection('users');
var bcrypt = require('bcrypt');
var Mongo = require('mongodb');

class User{
  constructor(obj){  //you are passing some object into this
    this.email = obj.email;
    this.password = obj.password;
  }

  login(fn){  //when we are done, we will call it back
    users.findOne({email:this.email}, (e, u)=>{  //this will look for the user in the database and give us back an error and a user
      if(u){  //if it found a user
        var isMatch = bcrypt.compareSync(this.password, u.password);  //you want to compare the pw they just typed in their form with the pw in the database
          //this.password came from req.body, whereas u.password came from the database; will return true or false, if they match or not
        if(isMatch){
          fn(u);
        }else{
          fn(null);  //if they don't match, we will send the user back null
        }

      }else{  //if it didn't find a user in the database
        this.password = bcrypt.hashSync(this.password, 8);  //hash is your new encrypted password, takes your pw, runs 8 cycles
        users.save(this, (e,u)=>{  //saves a users in the database
          fn(u);  //the callback wants the callback we just created
        });
      }
    });
  }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);  //need to bring in Mongo because the userId is a string; this turns userId from a string into an object
    users.findOne({_id:userId}, (e, user)=>{  //you want to find one user by his Id
      fn(user);
    });
  }
}

module.exports = User;  //need to export out the model in order for it to be used
