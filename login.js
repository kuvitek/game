import React from "react";
import User from "./user";
import "./sources/css/game.css";

export default class Login extends React.Component {
  saveUser(){
    let userName=document.getElementById("account").value.trim();
    if (userName!=""){
      let myUser = new User(userName);
      this.props.CallBack("list");
    }
  };

  render() {
    return (
      <div>
        <div class="enter">
          Представьтесь, пожалуйста!
          <form name="enterForm" class="enterForm">
            <div>
              <input id="account" type="text" name="account" class="form-control nickName" required/>
            </div>
            <div>
              <input id="btnEnter" type="button" name="btnEnter" class="form-control btnEnter" value="ВОЙТИ" onClick={this.saveUser.bind(this)}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
};
