import React from "react";
import "./sources/css/game.css";
import Game from "./game";
import User from "./user";
import Row from "./row";
let gameOwnerToken=-1;
let gameOpponentToken=-1;
let timer;
function isPlayer(){
  let res = (User.getToken()===gameOwnerToken)
      ||User.getToken()===gameOpponentToken;
  return res;
}
function checkState(){
  let elem;
  let btnElem;
  let currGameState={};
  elem=document.querySelector(".playTime");
  btnElem = document.querySelector(".btnGame");
  currGameState = Game.getState();
  if (currGameState.status==="ok"){
    if (currGameState.youTurn){
      btnElem.classList.remove("hidden");
    }
    else {
      if (isPlayer()){
        btnElem.classList.add("hidden");
        if (currGameState.winner!=""){
          clearInterval(timer);
          btnElem.classList.remove("hidden");
          btnElem.value="НАЗАД";
        }
      };
    };

    let myMS=currGameState.gameDuration;
    let mySEC=Math.floor(myMS/1000);
    let sec="00";
    let mins="00";
    let hours="00";
    sec=String(mySEC%60);
    if(sec<10){
      sec="0"+String(sec);
    };
    mins=String(Math.floor(mySEC/60));
    mins=String(mins%60);
    if(mins<10){
      mins="0"+String(mins);
    };
    hours=String(Math.floor(mySEC/3600));
    if(hours<10){
      hours="0"+String(hours);
    };
    elem.innerHTML = hours+":"+mins+":"+sec;
  }
  else {
    clearInterval(timer);
    alert(currGameState.message);
  }

};
export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    gameOwnerToken = Game.getList().games.find(elem=>elem.gameToken===this.props.TokenGame)["ownerToken"];
    gameOpponentToken = Game.getList().games.find(elem=>elem.gameToken===this.props.TokenGame)["opponentToken"];
    this.state={cellsData:Game.getState().field};
  };
    cellClick(row,col){
      if (isPlayer()){
        let currGameState={};
        currGameState = Game.getState();
        if (currGameState.status==="ok"){
          if (currGameState.youTurn){
              Game.doStep(row,col);
          }
        }
      }
    };
    refreshState(){
      let currGameState={};
      currGameState= Game.getState();
      if (currGameState.code===0){
        this.setState({cellsData:currGameState.field});
        checkState();
      }
      else {
        this.btnBack();
      }
    };
    btnBack(){
      clearInterval(timer);
      let currGameState={};
      currGameState = Game.getState();
      console.log("back");
      if (currGameState.status==="ok"){
        if (currGameState.winner===""){
          if (isPlayer()){
                Game.doStep(-1,-1);
          };
        }
      }
      this.props.CallBack("list");
    };
    componentDidMount(){
        checkState();
        timer = window.setInterval(this.refreshState.bind(this),1000);
    };
    getBtnValue(){
        let myValue="НАЗАД";
        let currGameState={};
        currGameState = Game.getState();
        if (currGameState.status==="ok"){
          if (currGameState.winner===""){
              if (isPlayer()){
                    myValue="СДАТЬСЯ";
                  };
          }
        }
        return myValue;
    };
    render() {
        let myGame={};
        myGame=Game.getState();
        if(myGame["code"]===0){
          let myFields = [];
          myFields = myGame.field;
          return (
              <div>
                  <div class="gamePlace">
                      {
                        myFields.map((item,index)=>{
                              return <Row Number={index} RowData={item} ClickCell={this.cellClick.bind(this)}/>
                        })
                      }
                  </div>
                  <div class="playTime" id="timer">00:00:00</div>
                  <footer class="btnPlace"><input class="btnGame" type="button" value={this.getBtnValue()} onClick={this.btnBack.bind(this)} ></input></footer>
              </div>
              )
            }
          else {
            this.btnBack.bind(this);
          }
    }
};
