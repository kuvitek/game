import React from "react";
import "./sources/css/game.css";
import Cell from "./cell";
export default class Row extends React.Component {
    render() {
        return (
            <div>
                <div class="row">
                    {
                      Array.from(this.props.RowData).map((item,index)=>{
                            return <Cell RowNumber={this.props.Number} Number={index} CellData={item} ClickCell={this.props.ClickCell}/>
                      })
                    }
                </div>
            </div>
            );
    }
};
