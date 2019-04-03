import React from "react";
import "./sources/css/game.css";
import User from "./user";
import Game from "./game";
import * as Lib from './listItemLib';

export default class ListItem extends React.Component {
  onClickGame(){
    let myResult = {};
    myResult = Game.joinGame(this.props.gameInfo["gameToken"],User.getName());
    if (myResult.status ==="ok"){
      this.props.CallBack(this.props.gameInfo);
    }
    else{
      alert (myResult.message);
    }
  };

  render() {
    return (
      <div>
        <div class={Lib.getClassName(this.props.gameInfo.state,this.props.gameInfo.owner)} onClick={this.onClickGame.bind(this)}>
          <div id="gameOwner" class={Lib.getOwnerClassName(this.props.gameInfo.state,this.props.gameInfo.gameResult)}>
            <div class="playerName">
              {this.props.gameInfo.owner}
            </div>
            <div class={Lib.getMarkClassName("owner", this.props.gameInfo.gameResult)}/>
          </div>
          <div id="gameOpponent" class={Lib.getOpponentClassName(this.props.gameInfo.state,this.props.gameInfo.gameResult)}>
            <div class="playerName">
              {this.props.gameInfo.opponent}
            </div>
            <div class={Lib.getMarkClassName("opponent", this.props.gameInfo.gameResult)}/>
          </div>
          <div class="timer">
            {Lib.getDurration(this.props.gameInfo.gameDuration)}
          </div>
        </div>
      </div>
    );
  }
};
