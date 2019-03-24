import React from "react";
import Game from "./game";
import "./sources/css/game.css";
export default class Cell extends React.Component {
    getCellClassName(){
      let myClass = "cell";
      if (this.props.RowNumber==0){
        myClass = myClass + " cell_fr";
      };
      if (this.props.Number==0){
        myClass = myClass + " cell_fc";
      };
      if (this.props.CellData=="X"){
        myClass = myClass + " krestik";
      };
      if (this.props.CellData=="O"){
        myClass = myClass + " nolik";
      };
      return myClass;
    };
    clickCell(){
      if (this.props.CellData=="?") {
        this.props.ClickCell(this.props.RowNumber,this.props.Number);
      };
    };
    render() {
        return (
            <div>
              <div class={this.getCellClassName()} onClick={this.clickCell.bind(this)}/>
            </div>
          );
    }
};
