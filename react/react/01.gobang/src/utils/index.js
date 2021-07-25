const direction = {
  horizontal: 1,
  vertical: 2,
  leftOblique: 3,
  rightOblique: 4
};

export function calculateWinner (squares, pos, row, col, stepNumber) {
  let [x, y] = calCoordinate(pos, row, col),
    player = squares[pos],
    startNode = { x, y },
    nodeList;
  
  if (stepNumber === row * col - 1) {
    return 2;
  }
  
  function check (node) {
    let { x, y } = node;
    if (x >= row || x < 0 || y >= col || y < 0) {
      return false;
    }
    return squares[y * col + x] === player;
  }
  
  for (let i = 1; i <= 4; i++) {
    nodeList = [startNode];
    let left = startNode,
      right = startNode,
      leftVal = true,
      rightVal = true;
    
    // 从当前节点出发，左右或者上下同时检测
    while (leftVal || rightVal) {
      if (leftVal) {
        left = getCoordinate(i, left, -1);
        leftVal = check(left) && nodeList.push(left);
      }
      if (rightVal) {
        right = getCoordinate(i, right, 1);
        rightVal = check(right) && nodeList.push(right);
      }
      
      if (nodeList.length === 5) {
        return nodeList;
      }
    }
  }
  
  return nodeList;
}

function getCoordinate (direct, node, tag) {
  let newNode;
  switch (direct) {
    case direction.horizontal:
      newNode = {
        x: node.x,
        y: node.y + tag
      };
      break;
    case direction.vertical:
      newNode = {
        x: node.x + tag,
        y: node.y
      };
      break;
    case direction.leftOblique:
      newNode = {
        x: node.x + tag,
        y: node.y + tag
      };
      break;
    case direction.rightOblique:
      newNode = {
        x: node.x - tag,
        y: node.y + tag
      };
      break;
    default:
      newNode = {
        x: -1,
        y: -1
      };
  }
  return newNode;
}

export function calCoordinate (pos, row, col) {
  let posY = Math.floor(pos / row);
  let posX = pos % col;
  
  return [posX, posY]
}
