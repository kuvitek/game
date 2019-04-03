import React from "react";
import "./sources/css/game.css";
import * as lib from "./playersLib";

export default class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state={playerNames:lib.getPlayerNames(this.props.TokenGame)};
    lib.timer = window.setInterval(this.syncData.bind(this),1000);
  };

  syncData(){
    let myPlayers = lib.getPlayerNames(this.props.TokenGame);
    if ((this.state.playerNames.owner!=myPlayers.owner)
       ||(this.state.playerNames.opponent!=myPlayers.opponent)){
      this.setState({playerNames:myPlayers});
    }
  };

  render() {
    if (this.props.TokenGame===-1){
      return (
        <div class="players">
          <div class="usr1">{lib.getPlayerNames(this.props.TokenGame).owner}</div>
        </div>
      )
    }
    else{
      if (lib.getPlayerNames(this.props.TokenGame).opponent===""){
        return (
          <div class="players">
            <div class="usr1"><div>{lib.getPlayerNames(this.props.TokenGame).owner}</div><div><img class="ico" src="../game-react/sources/img/krest.svg"/></div></div>
          </div>
        )
      }
      else {
        return (
          <div class="players">
            <div class="usr1"><div>{lib.getPlayerNames(this.props.TokenGame).owner}</div><div><img class="ico" src="../game-react/sources/img/krest.svg"/></div></div>
            <div class="usr2"><div><img class="ico" src="../game-react/sources/img/circle.svg"/></div><div>{lib.getPlayerNames(this.props.TokenGame).opponent}</div></div>
          </div>
        )
      }
    }
  }
};
