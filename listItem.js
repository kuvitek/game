import React from "react";
import "./sources/css/game.css";
import User from "./user";
import Game from "./game";
export default class ListItem extends React.Component {
    getClassName(gameState, gameOwner){
        let myClassName;
        if (gameState=="ready"){
            myClassName = "newGame";
        };
        if (gameState=="playing"){
            myClassName = "currGame";
        };
        if (gameState=="done"){
            myClassName = "endingGame";
        };
        if ((User.getName()===gameOwner)||(myClassName === "endingGame")){
            myClassName=myClassName+" no-cursor";
        }
        return myClassName;
    };
    getOwnerClassName(gameState, gameResult){
      let myClassName;
      myClassName = "player1";
      if (gameState!="ready"){
          myClassName = myClassName + " separetorPlayers";
      };
      if ((gameResult!="")&&(gameResult!="opponent")){
          myClassName = myClassName + " winner";
      }
      return myClassName;
    };
    getOpponentClassName(gameState, gameResult){
      let myClassName;
      myClassName = "player2";
      if ((gameResult!="")&&(gameResult!="owner")){
          myClassName = myClassName + " winner";
      }
      return myClassName;
    };
    getMarkClassName(typePlayer, gameResult){
      let myClassName;
      myClassName = "mark";
      if((typePlayer!=gameResult)&&(gameResult!="draw")){
        myClassName=myClassName+" hidden";
      }
      return myClassName;
    };
    onClickGame(){
      let myRes = {};
      myRes = Game.joinGame(this.props.gameInfo["gameToken"],User.getName());
      if (myRes.status ==="ok"){
        this.props.CallBack(this.props.gameInfo);
      }
      else{
        alert (myRes.message);
      }
    };
    getDurration(timeGame){
      let myMS = timeGame;
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
      let myTime = hours+":"+mins+":"+sec;
      return myTime;
    };
    render() {
        return (
                <div>
                    <div class={this.getClassName(this.props.gameInfo.state,this.props.gameInfo.owner)} onClick={this.onClickGame.bind(this)}>
                        <div id="gameOwner" class={this.getOwnerClassName(this.props.gameInfo.state,this.props.gameInfo.gameResult)}>
                            <div class="playerName">
                              {this.props.gameInfo.owner}
                            </div>
                            <div class={this.getMarkClassName("owner", this.props.gameInfo.gameResult)}/>
                        </div>
                        <div id="gameOpponent" class={this.getOpponentClassName(this.props.gameInfo.state,this.props.gameInfo.gameResult)}>
                            <div class="playerName">
                              {this.props.gameInfo.opponent}
                            </div>
                            <div class={this.getMarkClassName("opponent", this.props.gameInfo.gameResult)}/>
                        </div>
                        <div class="timer">
                            {this.getDurration(this.props.gameInfo.gameDuration)}
                        </div>
                    </div>
                </div>
        );
    }
};
