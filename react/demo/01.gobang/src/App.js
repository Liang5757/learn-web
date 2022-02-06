import React from "react";
import Board from "./component/Board"
import { calculateWinner, calCoordinate } from "./utils"
import './App.css';

const col = 15,
  row = 15,
  VALUE_TEXT = {
    0: "",
    false: "O",
    true: "X"
  },
  GAME_STATE = {
    0: "Next player: ",
    1: "Winner: ",
    2: "Draw"
  };

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      history: [{
        pos: -1,
        squares: Array(row * col).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      desc: false,
      gameOver: 0
    }
  }
  
  render () {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    
    let status = GAME_STATE[this.state.gameOver];
    status += this.state.gameOver !== 2 ? VALUE_TEXT[this.state.xIsNext] : ""
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            row={row}
            col={col}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>
            <div>{status}</div>
            <button onClick={() => this.sort()}>排序</button>
          </div>
          <ol>{this.state.desc ? this.moves(history).reverse() : this.moves(history)}</ol>
        </div>
      </div>
    );
  }
  
  // 生成跳转历史列表
  moves (history) {
    return history.map((step, move) => {
      let [posX, posY] = calCoordinate(step.pos, row, col);
      const desc = move ?
        `# ${move} Go to move [${posX + 1}, ${15 - posY}]` :
        'Go to game start';
      return (
        <li key={move}>
          <button
            className={move === this.state.stepNumber ? "activeStep" : ""}
            onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
  }
  
  // 排序历史列表
  sort () {
    this.setState({
      desc: !this.state.desc
    })
  }
  
  // 跳转历史记录
  jumpTo (step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  
  // 方块点击事件
  handleClick (i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    
    if (this.state.gameOver || squares[i]) {
      return;
    }
    
    squares[i] = VALUE_TEXT[this.state.xIsNext];
    const result = calculateWinner(squares, i, row, col, this.state.stepNumber);
    
    if (result === 2) {
      this.setState({
        gameOver: 2,
      })
    }
    
    if (result && result.length === 5) {
      this.setState({
        gameOver: 1,
      })
    }
    
    this.setState({
      history: history.concat([{
        pos: i,
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
}

export default Game;
