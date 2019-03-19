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
    render() {
        return (
                <div>
                    <div class={this.getClassName(this.props.gameInfo.state,this.props.gameInfo.owner)} onClick={this.onClickGame.bind(this)}>
                        <div class="player1">
                            {this.props.gameInfo.owner}
                        </div>
                        <div class="player2">
                            {this.props.gameInfo.opponent}
                        </div>
                        <div class="timer">
                            {this.props.gameInfo.gameDuration}
                        </div>
                    </div>
                </div>
        );
    }
};
