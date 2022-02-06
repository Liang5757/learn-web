import React from "react";

function Square (props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value2}
    </button>
  )
}

export default Square;
