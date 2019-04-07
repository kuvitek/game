'use strict;'
let currentUser = {};
export default class User {
  constructor(name) {
    this.myName = name;
    this.myToken = Math.round(Math.random()*10000000);
    currentUser = this;
  }
  static getName(){
    return currentUser.myName;
  }
  static getToken(){
    return currentUser.myToken;
  }
}
