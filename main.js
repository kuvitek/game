import React from "react";
import List from "./list";
import Players from "./players";
import Login from "./login";
import GameBoard from "./gameBoard";
import * as lib from "./gameLib";
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={activeContent:"login"};
    };
    openList(contentName){
        lib.myTokenGame=-1;
        this.setState({activeContent:contentName});
    };
    openGame(contentName, tokenGame){
        lib.myTokenGame = tokenGame;
        this.setState({activeContent:contentName});
    };
    render() {
        if (this.state.activeContent==="login"){
            return(
                <div>
                    <Login CallBack={this.openList.bind(this)}/>
                </div>
            );
        };
        if (this.state.activeContent==="list"){
            return(
                <div>
                    <Players TokenGame = {lib.myTokenGame}/>
                    <List CallBack={this.openGame.bind(this)}/>
                </div>
            );
        };
        if (this.state.activeContent==="game"){
            return(
                <div>
                    <Players TokenGame = {lib.myTokenGame}/>
                    <GameBoard CallBack={this.openList.bind(this)} TokenGame={lib.myTokenGame}/>
                </div>
            );
        };
    }
};
