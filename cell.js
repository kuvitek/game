import React from "react";
import Game from "./game";
import "./sources/css/game.css";
import * as Lib from "./cellLib";

export default class Cell extends React.Component {
  clickCell(){
    if (this.props.CellData==="?") {
      this.props.ClickCell(this.props.RowNumber,this.props.Number);
    }
  }
  render() {
    return (
      <div>
        <div class={Lib.getCellClassName(this.props.RowNumber,this.props.Number,this.props.CellData)} onClick={this.clickCell.bind(this)}/>
      </div>
    )
  }
};
