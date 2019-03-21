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
    if (Game.getState().status==="error"){
      this.setState({myListGames:Game.getList().games});
    };
  };
    addGame(){
      let res = {};
      res = Game.newGame(User.getName(), 3);
      if (res.status=="ok"){
        this.props.CallBack("game",res.gameToken);
      }
      else{
        alert(res.message);
      }
    };
    selectGame(gameItem){
      let res = {};
      res = Game.joinGame(gameItem["gameToken"],User.getName());
      if (res.status=="ok"){
        this.props.CallBack("game",gameItem.gameToken);
      }
      else {
        alert(res.message);
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
                            return <ListItem gameInfo={item} CallBack={this.selectGame.bind(this)} />
                        })
                }
            </div>
            <footer class="addNewGame"><input class="addGame" type="button" onClick={this.addGame.bind(this)}></input></footer>
        </div>
    );
}
};
