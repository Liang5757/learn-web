import Square from "./Square";
import React from "react";

class Board extends React.Component {
  // 渲染方块
  renderSquare (i) {
    return (
      <Square
        value2={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i + "grid"}
      />
    )
  }
  
  render () {
    let board = [];
    for (let i = 0; i < this.props.row; i++) {
      let boardRow = [<div className="index" key={i}>{15 - i}</div>];
      for (let j = 0; j < this.props.col; j++) {
        boardRow.push(this.renderSquare(i * this.props.col + j));
      }
      board.push(<div className="board-row" key={i}>{boardRow}</div>);
    }
    let indexY = [];
    for (let i = 0; i < this.props.col; i++) {
      indexY.push(<div className="index" key={i}>{i + 1}</div>)
    }
    
    return (
      <React.Fragment>
        {board}
        <div className="indexX-container">{indexY}</div>
      </React.Fragment>
    )
  }
}

export default Board;
