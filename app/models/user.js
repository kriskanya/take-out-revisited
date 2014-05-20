'use strict';

var users = global.nss.db.collection('users');

class User{
  constructor(obj){  //you are passing some object into this
    this.email = obj.email;
    this.password = obj.password;
  }

  login(fn){  //when we are done, we will call it back

  }
}

module.exports = User;  //need to export out the model in order for it to be used
