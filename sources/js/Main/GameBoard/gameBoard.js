import React from "react";
import "../../../css/game.css";
import Game from "../../Services/Game/game";
import User from "../../Services/User/user";
import Row from "./Row/row";
import {getDurration} from '../List/ListItem/listItemLib';
import * as Lib from './gameBoardLib';

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    {
      if ((Lib.gameOwnerToken===-1)||(Lib.gameOpponentToken===-1)){
        let activeGame = Game.getList().games.find(elem=>elem.gameToken===this.props.TokenGame);
        Lib.gameOwnerToken = activeGame["ownerToken"];
        Lib.gameOpponentToken = activeGame["opponentToken"];
      }
    }
    this.state={cellsData:Game.getState().field};
  };

  cellClick(row,col){
    if (Lib.isPlayer.bind(this)){
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
      this.buttonBackOnClick();
    }
  };

  buttonBackOnClick(){
    clearInterval(Lib.timer);
    let currGameState={};
    currGameState = Game.getState();
    if (currGameState.status==="ok"){
      if (currGameState.winner===""){
        if (Lib.isPlayer.bind(this)){
              Game.doStep(-1,-1);
        };
      }
    }
    this.props.CallBack("list");
  };

  componentDidMount(){
    checkState();
    Lib.timer = window.setInterval(this.refreshState.bind(this),1000);
  };

  getButtonValue(){
    let myValue="НАЗАД";
    let currGameState={};
    currGameState = Game.getState();
    if (currGameState.status==="ok"){
      if (currGameState.winner===""){
        if (Lib.isPlayer.bind(this)){
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
          <footer class="btnPlace"><input class="btnGame" type="button" value={this.getButtonValue()} onClick={this.buttonBackOnClick.bind(this)} ></input></footer>
        </div>
      )
    }
    else {
      this.buttonBackOnClick.bind(this);
    }
  }
}

function checkState(){
  let timerElement;
  let butttonElement;
  let currGameState={};
  timerElement=document.querySelector(".playTime");
  butttonElement = document.querySelector(".btnGame");
  currGameState = Game.getState();
  if (currGameState.status==="ok"){
    if (currGameState.youTurn){
      butttonElement.classList.remove("hidden");
    }
    else {
      if (Lib.isPlayer.bind(this)){
        butttonElement.classList.add("hidden");
        if (currGameState.winner!=""){
          clearInterval(Lib.timer);
          butttonElement.classList.remove("hidden");
          butttonElement.value="НАЗАД";
        }
      };
    };
    timerElement.innerHTML=getDurration(currGameState.gameDuration);
  }
  else {
    clearInterval(Lib.timer);
    alert(currGameState.message);
  }
};
