import React from "react";
import "./sources/css/game.css";
import ListItem from "./listItem";
import Game from "./game";
import User from "./user";

let timer;

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state={myListGames:Game.getList().games};
    timer = window.setInterval(this.syncData.bind(this),1000);
  };

  syncData(){
    this.setState({myListGames:Game.getList().games});
  };

  addGame(){
    let myResult = {};
    myResult = Game.newGame(User.getName(), 3);
    if (myResult.status==="ok"){
      clearInterval(timer);
      this.props.CallBack("game",myResult.gameToken);
    }
    else{
      alert(myResult.message);
    }
  };

  selectGame(gameItem){
    let myResult = {};
    myResult = Game.joinGame(gameItem["gameToken"],User.getName());
    if (myResult.status==="ok"){
      clearInterval(timer);
      this.props.CallBack("game",gameItem.gameToken);
    }
    else {
      alert(myResult.message);
    }
  };

  render() {
    return (
      <div>
          <div class="line"><hr/>
          </div>
          <div class="content">
            {
              Game.getList().games.map((item) => {
                return <ListItem gameInfo={item} CallBack={this.selectGame.bind(this)}/>
              })
            }
          </div>
          <footer class="addNewGame"><input class="addGame" type="button" onClick={this.addGame.bind(this)}></input></footer>
      </div>
    );
  }
};
