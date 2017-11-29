const board = document.getElementsByTagName('td');
let boardModel = [];
let playerAmove = true;
let playerBmove = false;
const path = window.location.pathname;
const page = path.split('/').pop();

function addboardModel() {
  const player = location.href;
  let x1;
  let y1;
  let x2;
  let y2;
  const playerIndex = player.charAt(player.length - 1);

  for (let i = 0; i < board.length; i++) {
    boardModel.push([board[i].id, 'wolny', 'atak', 'klasa', 'gracz', 0, 0, 'nazwa', 'ulega', 'opis', 'ruch', x1, y1, x2, y2]);
    if (model.neutralny.indexOf(board[i].id) !== -1) {
      boardModel[i][2] = 'neutralne';
    }
  }

  if (playerIndex === 'B') {
    boardModel = boardModel.reverse();
  }
}
function tourManager(playerIndex) {
  let msg;
  if (playerIndex === 'A') {
    playerAmove = false;
    playerBmove = true;
    msg = {
      type: 'palayersAccesAfalse',
      data: playerAmove,
      location: page,
    };
    socket.emit('gameControl', JSON.stringify(msg));
    msg = {
      type: 'palayersAccesBtrue',
      data: playerBmove,
      location: page,
    };
    socket.emit('gameControl', JSON.stringify(msg));
    view.opponentMove();
  } else if (playerIndex === 'B') {
    playerAmove = true;
    playerBmove = false;
    msg = {
      type: 'palayersAccesAtrue',
      data: playerAmove,
      location: page,
    };
    socket.emit('gameControl', JSON.stringify(msg));
    msg = {
      type: 'palayersAccesBfalse',
      data: playerBmove,
      id: 'A',
      location: page,
    };
    socket.emit('gameControl', JSON.stringify(msg));
    view.opponentMove();
  }
}

function findCell(id) {
  let cell;
  for (let i = 0; i < boardModel.length; i += 1) {
    if (boardModel[i][0] == id) { cell = i; }
  }
  return cell;
}
function deleteFlags() {
  for (let i = 0; i < boardModel.length; i += 1) { boardModel[i][5] = 0; }
}
function delAvilableMoves() {
  for (let i = 0; i < boardModel.length; i += 1) { boardModel[i][6] = 0; }
}
function deleteBackColor() {
  for (let i = 0; i < boardModel.length; i += 1) {
    document.getElementById(board[i].id).style.backgroundColor = '';
  }
}
function emptyClickProc() {
  deleteFlags();
  delAvilableMoves();
  deleteBackColor();
}
function findSelectedCells() {
  let selCell;
  for (let i = 0; i < boardModel.length; i += 1) {
    if (boardModel[i][5] === 1) { selCell = i; }
  }
  return selCell;
}
function setActivShip(index) { boardModel[index][5] = 1; }

function firstClickShip(userClick, boardModelIndex) {
  if (boardModel[boardModelIndex][4] === page) {
    setActivShip(boardModelIndex);
    view.moveArea(userClick, boardModelIndex);
    view.showMarkMovments(boardModelIndex);
    view.showContent('windowRight_2', boardModel[boardModelIndex][9].toUpperCase());
    document.getElementById(userClick).style.backgroundColor = 'rgb(12, 210, 118)';
  } else if (boardModel[boardModelIndex][4] != page) {
    view.warning();
    setTimeout(() => {
      view.clearYellow('windowRight_7');
    }, 5000);
    setTimeout(() => {
      view.clearYellowMark('markerRight_7');
    }, 5000);
    setTimeout(view.currentPlayertMove, 5000);
  }
}

function secondShipClickTheSamePlayer(userClick, boardModelIndex) {
  if (boardModel[boardModelIndex][4] === page) {
    emptyClickProc();
    setActivShip(boardModelIndex);
    view.moveArea(userClick, boardModelIndex);
    view.showMarkMovments(boardModelIndex);
    view.showContent('windowRight_2', boardModel[boardModelIndex][9].toUpperCase());
    document.getElementById(userClick).style.backgroundColor = 'rgb(12, 210, 118)';
  } else if (boardModel[boardModelIndex][4] !== page) {
    view.warning();
    setTimeout(() => {
      view.clearYellow('windowRight_7');
    }, 5000);
    setTimeout(() => {
      view.clearYellowMark('markerRight_7');
    }, 5000);
    window.setTimeout(view.currentPlayertMove, 5000);
  }
}

function movingShip(userClick, boardModelIndex) {
  let msg;
  view.displayShip(userClick, boardModel[findSelectedCells()][3], boardModel[findSelectedCells()][4], boardModel[findSelectedCells()][7], boardModel[findSelectedCells()][8], boardModel[findSelectedCells()][9]);
  deleteBackColor();
  if (boardModel[boardModelIndex][7] === 'okretDesantowy' && boardModel[boardModelIndex][4] == page) {
    if (page == 'graczA') {
      if ((model.portB.indexOf(userClick)) != -1) {
        view.displayMessage('endGame3');
        msg = {
          type: 'gameOverLandingCraftIsInOpponentPort',
          location: page,
        };
        socket.emit('gameControl', JSON.stringify(msg));
      }
    } else if (page == 'graczB') {
      if ((model.portA.indexOf(userClick)) != -1) {
        view.displayMessage('endGame3');
        msg = {
          type: 'gameOverLandingCraftIsInOpponentPort',
          location: page,
        };
        socket.emit('gameControl', JSON.stringify(msg));
      }
    }
  }
  view.deleteShip(boardModel[findSelectedCells()][0]);
  deleteFlags();
  delAvilableMoves();
  window.setTimeout(view.opponentMove, 1000);
  return true;
}


function abortAtack() {
  view.hideMessage('mes');
  emptyClickProc();
  const msg = {
    type: 'abortAtack',
    location: page,
  };
  socket.emit('gameControl', JSON.stringify(msg));
}

function atackWinWithMove(boardModelIndex, userClick) {
  const arrayToSend = [];
  let msg;
  view.hideMessage('win');
  movingShip(userClick, boardModelIndex);
  arrayToSend[0] = userClick;
  arrayToSend[1] = boardModelIndex;
  msg = {
    type: 'atackWinWithMove',
    data: arrayToSend,
    location: page,
  };
  socket.emit('gameControl', JSON.stringify(msg));
}

function atackWin(userClick, boardModelIndex) {
  view.hideMessage('win');
  view.deleteShip(boardModel[boardModelIndex][0]);
  emptyClickProc();
}

function atackWinWithNoMove(boardModelIndex, userClick) {
  const arrayToSend = [];
  atackWin(userClick, boardModelIndex);
  arrayToSend[0] = userClick;
  arrayToSend[1] = boardModelIndex;
  const msg = {
    type: 'atackWinWithNoMove',
    data: arrayToSend,
    location: page,
  };
  socket.emit('gameControl', JSON.stringify(msg));
}

function atackLose(shipToDelete) {
  window.setTimeout(() => { view.hideMessage('lose'); }, 3500);
  window.setTimeout(() => { view.deleteShip(shipToDelete); }, 3750);
  emptyClickProc();
}

function checkAtackResults(boardModelIndex, playerIndex, userClick) {
  const arrayToSend = [];
  let msg;
  view.hideMessage('mes');
  if ((boardModel[boardModelIndex][8].indexOf(boardModel[findSelectedCells()][7])) === -1) {
    if (boardModel[boardModelIndex][7] === boardModel[findSelectedCells()][7]) {
      arrayToSend[0] = boardModel[findSelectedCells()][0];
      arrayToSend[1] = boardModel[boardModelIndex][0];
      msg = {
        type: 'atackLoseNameName',
        data: arrayToSend,
        location: page,
      };
      socket.emit('gameControl', JSON.stringify(msg));
      view.displayMessage('loseNameName');
      window.setTimeout(() => { view.hideMessage('loseNameName'); }, 3000);
      window.setTimeout(() => { view.deleteShip(boardModel[boardModelIndex][0]); }, 3500);
      atackLose(boardModel[findSelectedCells()][0]);
    } else {
      view.displayMessage('lose');
      msg = {
        type: 'atackLose',
        data: boardModel[findSelectedCells()][0],
        location: page,
      };
      socket.emit('gameControl', JSON.stringify(msg));
      atackLose(boardModel[findSelectedCells()][0]);
    }
    tourManager(playerIndex);
  } else {
    view.hideMessage('mes');
    if (boardModel[boardModelIndex][7] == 'okretDesantowy') {
      msg = {
        type: 'victory',
        location: page,
      };
      socket.emit('gameControl', JSON.stringify(msg));
      view.displayMessage('endGame2');
    } else {
      view.displayMessage('win');
      msg = {
        type: 'atackWin',
        data: boardModel[boardModelIndex][0],
        location: page,
      };
      socket.emit('gameControl', JSON.stringify(msg));
      document.getElementById('yesButton3').addEventListener('click', function () { atackWinWithMove(boardModelIndex, userClick)});
      document.getElementById('noButton4').addEventListener('click', function () { atackWinWithNoMove(boardModelIndex, userClick)});
      tourManager(playerIndex);
    }
  }
}

function compareOpponets(boardModelIndex, playerIndex, userClick) {
  const arrayToSend = [];
  view.showContent('windowLeft_2', boardModel[boardModelIndex][7].toUpperCase());
  arrayToSend[0] = boardModel[findSelectedCells()][7].toUpperCase();
  arrayToSend[1] = boardModel[boardModelIndex][7].toUpperCase();
  const msg = {
    type: 'showYourship',
    data: arrayToSend,
    location: page,
  };
  socket.emit('gameControl', JSON.stringify(msg));
  checkAtackResults(boardModelIndex, playerIndex, userClick);
  setTimeout(() => { view.showContent('windowLeft_2', ''); }, 5000);
}

function deleteArray(array) {
  const newArry = array;
  for (let i = 0; i < array.length; i += 1) { delete newArry[i]; }
  return newArry;
}

function clickingProcedure(eventObj, token, playerIndex) {
  const userClick = eventObj.target.id;
  let msg;
  let msgSend;
  const arrayToSend = [];
  const boardModelIndex = findCell(userClick);

  if (token) {
    if (boardModel[boardModelIndex][1] === 'wolny' && boardModel[boardModelIndex][6] !== 1) {
      emptyClickProc();
      msg = {
        type: 'emptyClic',
        location: page,
      };
      msgSend = JSON.stringify(msg);
      socket.emit('gameControl', msgSend);
      view.showContent('windowRight_2', '');
      console.log('emptyClic');
    } else if (boardModel[boardModelIndex][1] === 'zajety' && (findSelectedCells() === undefined)) {
      firstClickShip(userClick, boardModelIndex);
      arrayToSend[0] = userClick;
      arrayToSend[1] = boardModelIndex;
      msg = {
        type: 'firstShipClic',
        data: arrayToSend,
        location: page,
      };
      msgSend = JSON.stringify(msg);
      socket.emit('gameControl', msgSend);
      if (page === 'graczA') {
        document.getElementById('deployShips1').style.display = 'none';
      } else if (page === 'graczB') {
        document.getElementById('deployShips2').style.display = 'none';
      }
      deleteArray(arrayToSend);
    } else if (boardModel[boardModelIndex][1] == 'zajety' && boardModel[findSelectedCells()][5] == 1 && (boardModel[boardModelIndex][3] == boardModel[findSelectedCells()][3])) {
      emptyClickProc();
      msg = {
        type: 'secondClickSameShip',
        location: page,
      };

      socket.emit('gameControl', JSON.stringify(msg));
      view.showContent('windowRight_2', '');
    } else if (boardModel[boardModelIndex][1] === 'zajety' && boardModel[findSelectedCells()][1] === 'zajety' && (boardModel[boardModelIndex][4] === boardModel[findSelectedCells()][4]) && boardModel[boardModelIndex][4] === page) {
      secondShipClickTheSamePlayer(userClick, boardModelIndex);
      arrayToSend[0] = userClick;
      arrayToSend[1] = boardModelIndex;
      msg = {
        type: 'secondShipclickSamePlayer',
        data: arrayToSend,
        location: page,
      };
      socket.emit('gameControl', JSON.stringify(msg));
      deleteArray(arrayToSend);
    } else if (boardModel[boardModelIndex][6] === 1 && boardModel[boardModelIndex][1] === 'wolny') {
      movingShip(userClick, boardModelIndex);
      arrayToSend[0] = userClick;
      arrayToSend[1] = boardModelIndex;
      msg = {
        type: 'moveShip',
        data: arrayToSend,
        location: page,
      };
      socket.emit('gameControl', JSON.stringify(msg));
      if (movingShip) {
        tourManager(playerIndex);
        view.opponentMove();
      }
    } else if (boardModel[boardModelIndex][2] == 'neutralne') {
      view.neutralZone();
      view.displayMessage('neutralZone');
      setTimeout(() => { view.clearYellow('windowRight_6'); }, 5000);
      setTimeout(() => { view.clearYellowMark('markerRight_6'); }, 5000);
      setTimeout(() => { view.hideMessage('neutralZone'); }, 2000);
    } else if (boardModel[findSelectedCells()][7] !== 'okretDesantowy' && boardModel[boardModelIndex][2] !== 'neutralne' && boardModel[boardModelIndex][6] === 1 && boardModel[boardModelIndex][1] === 'zajety' && boardModel[findSelectedCells()][1] == 'zajety' && (boardModel[boardModelIndex][4] !== boardModel[findSelectedCells()][4])) {
      msg = {
        type: 'atackCheck',
        location: page,
      };
      socket.emit('gameControl', JSON.stringify(msg));
      view.displayMessage('mes');
      document.getElementById('yesButton1').addEventListener('click', function() {compareOpponets(boardModelIndex, playerIndex, userClick);});
      document.getElementById('noButton2').addEventListener('click', abortAtack);
    }
  }
  return playerAmove, playerBmove;
}

function gameRoundMenage(eventObj) {
  const token = true;
  const player = location.href;
  const playerIndex = player.charAt(player.length - 1);
  if (playerIndex === 'A' && playerAmove === true && playerBmove === false) {
    clickingProcedure(eventObj, token, playerIndex);
  } else if (playerIndex === 'B' && playerBmove === true && playerAmove === false) {
    clickingProcedure(eventObj, token, playerIndex);
  }
}

function clikassign() {
  const clik = board;
  for (let i = 0; i < board.length; i += 1) {
    clik[i].onmousedown = gameRoundMenage;
  }
}

function tourMessage() {
  if (page === 'graczA') {
    view.currentPlayertMove();
  } else if (page === 'graczB') {
    view.opponentMove();
  }
}

function backToMainPage() {
  let msg;
  document.getElementById('returnToMainPage').style.display = 'block';
  document.getElementById('returnButton').addEventListener('click', () => {
    msg = {
      type: 'opponentleaveTheGame',
      location: page,
    };
    socket.emit('gameControl', JSON.stringify(msg));
    window.open('index', '_self');
  });
  document.getElementById('stayButton').addEventListener('click', () => { document.getElementById('returnToMainPage').style.display = 'none'; });
}

document.addEventListener('DOMContentLoaded', () => {
  view.checkPresencePlayers();
  clikassign();
  tourMessage();
  addboardModel();
}, false);
document.getElementById('powrot').addEventListener('click', backToMainPage);

function shipTypeLeft(array, shipType) {
  let numOfTypeShip = 0;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].nazwa == shipType) {
      numOfTypeShip += 1;
    }
  }
  return numOfTypeShip;
}

