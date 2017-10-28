function cropShips(array) {
  for (let i = 0; i < 10; i += 1) {
    array.pop();
  }
  return array;
}

function mixArray(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const j = Math.floor(Math.random() * arr.length);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function findShip(shipClass) {
  let ship;
  let shipMove;
  for (let i = 0; i < model.shipsA.length; i += 1) {
    ship = model.shipsA[i].klasa;
    if (shipClass === ship) {
      shipMove = model.shipsA[i].ruch;
    }
    for (let j = 0; j < model.shipsB.length; j += 1) {
      ship = model.shipsB[j].klasa;
      if (shipClass === ship) {
        shipMove = model.shipsB[j].ruch;
      }
    }
  }
  return shipMove;
}

const view = {
  displayShip(id, klasa, gracz, nazwa, ulega, opis, ruch) {
    const cell = document.getElementById(id);
    const index = findCell(id);
    cell.setAttribute('class', klasa);

    delete boardModel[index][1];
    boardModel[index][1] = 'zajety';
    delete boardModel[index][3];
    boardModel[index][3] = klasa;
    delete boardModel[index][4];
    boardModel[index][4] = gracz;
    delete boardModel[index][7];
    boardModel[index][7] = nazwa;
    delete boardModel[index][8];
    boardModel[index][8] = ulega;
    delete boardModel[index][9];
    boardModel[index][9] = opis;
    delete boardModel[index][10];
    boardModel[index][10] = ruch;
  },
  deleteShip(id) {
    const cell = document.getElementById(id);
    const index = findCell(id);
    cell.setAttribute('class', '');

    delete boardModel[index][1];
    boardModel[index][1] = 'wolny';
    delete boardModel[index][3];
    boardModel[index][3] = 'klasa';
    delete boardModel[index][4];
    boardModel[index][4] = 'gracz';
    delete boardModel[index][7];
    boardModel[index][7] = 'nazwa';
    delete boardModel[index][8];
    boardModel[index][8] = 'ulega';
    delete boardModel[index][9];
    boardModel[index][9] = 'opis';
    delete boardModel[index][10];
    boardModel[index][10] = 'ruch';
  },
  // wyświetla okręty na początkowych pozycjach w porcie A
  placeShipsA() {
    cropShips(model.shipsA);
    const shipsAarray = mixArray(model.shipsA);

    const msg = {
      type: 'placeShipsA',
      data: shipsAarray,
      location: page,
    };

    const msgSend = JSON.stringify(msg);
    socket.emit('gameControl', msgSend);

    for (let i = 0; i < model.graczA.length; i += 1) {
      view.displayShip(model.graczA[i], model.shipsA[i].klasa, 'graczA', model.shipsA[i].nazwa, model.shipsA[i].ulega, model.shipsA[i].opis, model.shipsA[i].ruch);
    }
    view.displayShip('0201', 'bateriaA', 'graczA', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
    view.displayShip('0103', 'bateriaA', 'graczA', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
    view.displayShip('0308', 'bateriaA', 'graczA', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
    view.displayShip('0310', 'bateriaA', 'graczA', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');

    document.getElementById('deployShips1').style.display = 'none';
  },

  placeShipsAinB(shipsA) {
    for (let i = 0; i < model.graczA.length; i += 1) {
      view.displayShip(model.graczA[i], shipsA[i].klasa, 'graczA', shipsA[i].nazwa, shipsA[i].ulega, model.shipsA[i].opis, model.shipsA[i].ruch);
    }
    view.displayShip('0201', 'bateriaA', 'graczA', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
    view.displayShip('0103', 'bateriaA', 'graczA', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
    view.displayShip('0308', 'bateriaA', 'graczA', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
    view.displayShip('0310', 'bateriaA', 'graczA', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
  },

  placeShipsB() {
    cropShips(model.shipsB);
    const shipsBarray = mixArray(model.shipsB);

    view.opponentMove();
    const msg = {
      type: 'placeShipsB',
      data: shipsBarray,
      location: page,
    };
    socket.emit('gameControl', JSON.stringify(msg));
    for (let i = 0; i < model.graczB.length; i += 1) {
      view.displayShip(model.graczB[i], model.shipsB[i].klasa, 'graczB', model.shipsB[i].nazwa, model.shipsB[i].ulega, model.shipsB[i].opis, model.shipsB[i].ruch);
    }
    view.displayShip(1401, 'bateriaB', 'graczB', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
    view.displayShip(1403, 'bateriaB', 'graczB', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
    view.displayShip(1510, 'bateriaB', 'graczB', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
    view.displayShip(1608, 'bateriaB', 'graczB', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
  },

  placeShipsBinA(shipsB) {
    for (let i = 0; i < model.graczB.length; i += 1) {
      view.displayShip(model.graczB[i], shipsB[i].klasa, 'graczB', shipsB[i].nazwa, shipsB[i].ulega, model.shipsB[i].opis, model.shipsB[i].ruch);
    }
    view.displayShip(1401, 'bateriaB', 'graczB', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
    view.displayShip(1403, 'bateriaB', 'graczB', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
    view.displayShip(1510, 'bateriaB', 'graczB', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
    view.displayShip(1608, 'bateriaB', 'graczB', 'bateriaNadbrzezna', 'okretRakietowy', 'Bateria Nadbrzeżna');
  },

  moveArea(userClick, boardModelIndex) {
    let x2;
    let y2;
    let czebysz;

    const activClass = document.getElementById(userClick).className;
    const x1 = userClick.charAt(2) + userClick.charAt(3);
    const y1 = userClick.charAt(0) + userClick.charAt(1);
    const boardModelIndexmove = findShip(activClass);

    for (let i = 0; i < boardModel.length; i += 1) {
      x2 = boardModel[i][0].charAt(2) + boardModel[i][0].charAt(3);
      y2 = boardModel[i][0].charAt(0) + boardModel[i][0].charAt(1);

      czebysz = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));

      if (czebysz <= boardModelIndexmove && boardModel[i][1] == 'wolny') {
        document.getElementById(boardModel[i][0]).style.backgroundColor = '#9fa9a3';
        boardModel[i][6] = 1;
      } else if (czebysz <= boardModelIndexmove && boardModel[i][1] == 'zajety' && boardModel[i][4] != boardModel[boardModelIndex][4]) {
        document.getElementById(boardModel[i][0]).style.backgroundColor = '#000000';
        boardModel[i][6] = 1;
      }
    }
  },
  moveAreaHide(userClick, boardModelIndex) {
    let x2;
    let y2;
    let czebysz;

    const activClass = document.getElementById(userClick).className;
    const x1 = userClick.charAt(2) + userClick.charAt(3);
    const y1 = userClick.charAt(0) + userClick.charAt(1);
    const boardModelIndexmove = findShip(activClass);

    for (let i = 0; i < boardModel.length; i += 1) {
      x2 = boardModel[i][0].charAt(2) + boardModel[i][0].charAt(3);
      y2 = boardModel[i][0].charAt(0) + boardModel[i][0].charAt(1);

      czebysz = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));

      if (czebysz <= boardModelIndexmove && boardModel[i][1] === 'wolny') {
        boardModel[i][6] = 1;
      } else if (czebysz <= boardModelIndexmove && boardModel[i][1] === 'zajety' && boardModel[i][4] !== boardModel[boardModelIndex][4]) {
        boardModel[i][6] = 1;
        this.atackArea();
      }
    }
  },
  checkPresencePlayers() {
    let msg;

    if (page === 'graczB') {
      msg = {
        type: 'playerBisPresent',
        location: page,
      };
      socket.emit('gameControl', JSON.stringify(msg));
    } else if (page === 'graczA') {
      this.lackOfSecondPlayer();
    }
  },
  displayMessage(id) {
    const cell = document.getElementById(id);
    cell.setAttribute('class', 'message');
  },
  hideMessage(id) {
    const cell = document.getElementById(id);
    cell.setAttribute('class', 'hidemessage');
  },
  lackOfSecondPlayer() {
    document.getElementById('windowLeft_3').style.color = 'yellow';
    document.getElementById('markerLeft_3').style.backgroundColor = 'yellow';
  },
  secondPlayerActive() {
    document.getElementById('windowLeft_4').style.color = 'yellow';
    document.getElementById('markerLeft_4').style.backgroundColor = 'yellow';
  },
  opponentMove() {
    document.getElementById('windowRight_1').style.color = '#696969';
    document.getElementById('windowLeft_1').style.color = 'yellow';
    setTimeout(() => { document.getElementById('windowRight_1').setAttribute('class', 'panelRight'); }, 7000);
  },
  currentPlayertMove() {
    document.getElementById('windowRight_1').style.color = 'yellow';
    document.getElementById('windowLeft_1').style.color = '#696969';
  },
  showMarkMovments(boardModelIndex) {
    const markToShow = document.getElementById('markerRight_2');
    const elToShow3 = document.getElementById('windowRight_3');

    if (boardModel[boardModelIndex][10] == 1) {
      markToShow.setAttribute('class', 'marker2_1');
      elToShow3.setAttribute('class', 'windowRight_3_1');
    } else if (boardModel[boardModelIndex][10] == 2) {
      markToShow.setAttribute('class', 'marker2_2');
      elToShow3.setAttribute('class', 'windowRight_3_2');
    } else if (boardModel[boardModelIndex][10] == 3) {
      markToShow.setAttribute('class', 'marker2_3');
      elToShow3.setAttribute('class', 'windowRight_3_3');
    } else if (boardModel[boardModelIndex][10] == 4) {
      markToShow.setAttribute('class', 'marker2_4');
      elToShow3.setAttribute('class', 'windowRight_3_4');
    }
  },
  opponentDeployedShips() {
    document.getElementById('windowLeft_5').style.color = 'yellow';
    document.getElementById('markerLeft_5').style.backgroundColor = 'yellow';
  },
  atackArea() {
    document.getElementById('windowRight_9').style.color = 'yellow';
    document.getElementById('markerRight_9').style.backgroundColor = 'yellow';
  },
  atackCheck() {
    document.getElementById('windowRight_8').style.color = 'yellow';
    document.getElementById('markerRight_8').style.backgroundColor = 'yellow';
  },
  warning() {
    document.getElementById('windowRight_7').style.color = 'yellow';
    document.getElementById('markerRight_7').style.backgroundColor = 'yellow';
  },
  showContent(elementID, contentToShow) {
    document.getElementById(elementID).innerHTML = `<p>${contentToShow}</p>`;
  },
  neutralZone() {
    document.getElementById('windowRight_6').style.color = 'yellow';
    document.getElementById('markerRight_6').style.backgroundColor = 'yellow';
  },
  markElement(div, mark) {
    document.getElementById(div).style.color = 'yellow';
    document.getElementById(mark).style.backgroundColor = 'yellow';
  },
  clearYellow(el) {
    document.getElementById(el).style.color = '#696969';
  },
  clearYellowMark(el) {
    document.getElementById(el).style.backgroundColor = '';
  },
};
