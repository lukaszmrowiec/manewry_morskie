const socket = io();

function setupInput() {
  const input1 = document.getElementById('deployShips1');
  const input2 = document.getElementById('deployShips2');

  if (input1) {
    input1.addEventListener('click', (e) => {
      view.placeShipsA();
      window.setTimeout(view.currentPlayertMove, 5000);
      document.getElementById('deployShips1').style.display = 'none';
    });
  } else if (input2) {
    input2.addEventListener('click', (e) => {
      view.placeShipsB();
      const msg = {
        type: 'playerBisPresent',
        location: page,
      };
      socket.emit('gameControl', JSON.stringify(msg));
      document.getElementById('deployShips2').style.display = 'none';
    });
  }
}
setupInput();

socket.on('gameControl', (mes) => {
  let msg = JSON.parse(mes);

  if (page != msg.location) {
    switch (msg.type) {
      case 'playerBisPresent':
        view.clearYellow('windowLeft_3');
        view.clearYellowMark('markerLeft_3');
        document.getElementById('waiting').style.display = 'none';
        document.getElementById('deployShips1').style.display = 'inline';
        view.secondPlayerActive();

        msg = {
          type: 'playerAisPresent',
          location: page,
        };
        socket.emit('gameControl', JSON.stringify(msg));
        break;
      case 'playerAisPresent':
        view.markElement('windowLeft_4', 'markerLeft_4');
        break;
      case 'opponentleaveTheGame':
        view.markElement('windowLeft_3', 'markerLeft_3');
        view.clearYellow('windowLeft_4');
        view.clearYellowMark('markerLeft_4');
        view.clearYellow('windowLeft_5');
        view.clearYellowMark('markerLeft_5');
        document.getElementById('returnToMainPage_message').style.display = 'block';
        document.getElementById('returnButton_message').addEventListener('click', () => { window.open('index', '_self'); });
        break;
      case 'placeShipsA':
        view.placeShipsAinB(msg.data);
        view.opponentDeployedShips();
        setTimeout(() => { view.clearYellow('windowLeft_5'); }, 7000);
        setTimeout(() => { view.clearYellowMark('markerLeft_5'); }, 7000);
        window.setTimeout(view.opponentMove, 3000);
        break;
      case 'placeShipsB': // rozmieszczenie okrętów Gracza B na planszy gracza A
        view.placeShipsBinA(msg.data);
        view.opponentDeployedShips();
        setTimeout(() => { view.clearYellow('windowLeft_5'); }, 7000);
        setTimeout(() => { view.clearYellowMark('markerLeft_5'); }, 7000);
        setTimeout(() => { view.clearYellow('windowLeft_3'); }, 2000);
        setTimeout(() => { view.clearYellowMark('markerLeft_3'); }, 2000);
        document.getElementById('deployShips1').style.display = 'none';
        break;
      case 'palayersAccesAfalse':
        playerAmove = false;
        break;
      case 'palayersAccesBtrue':
        playerBmove = true;
        window.setTimeout(view.currentPlayertMove, 1000);
        break;
      case 'palayersAccesAtrue':
        playerAmove = true;
        window.setTimeout(view.currentPlayertMove, 1000);
        break;
      case 'palayersAccesBfalse':
        playerBmove = false;
        break;
      case 'emptyClic':
        emptyClickProc();
        view.clearYellow('windowRight_9');
        view.clearYellowMark('markerRight_9');
        break;
      case 'firstShipClic':
        setActivShip(msg.data[1]);
        view.moveAreaHide(msg.data[0], msg.data[1]);
        document.getElementById(msg.data[0]).style.backgroundColor = 'rgb(12, 210, 118)';
        break;
      case 'secondClickSameShip':
        emptyClickProc();
        view.clearYellow('windowRight_9');
        view.clearYellowMark('markerRight_9');
        view.opponentMove();
        break;
      case 'secondShipclickSamePlayer':
        secondShipClickTheSamePlayerToSend(msg.data[0], msg.data[1]);
        break;
      case 'moveShip':
        view.currentPlayertMove();
        movingShip(msg.data[0], msg.data[1]);
        view.clearYellow('windowRight_9');
        view.clearYellowMark('markerRight_9');
        break;
      case 'atackCheck':
        view.atackCheck();
        break;
      case 'showYourship':
        view.showContent('windowLeft_2', '');
        view.displayMessage('shipAttacked');
        view.showContent('windowLeft_2', msg.data[0]);
        console.log(`${msg.data[0]} ${msg.data[1]}`);
        setTimeout(() => { view.hideMessage('shipAttacked'); }, 2000);
        setTimeout(() => { view.showContent('windowLeft_2', ''); }, 5000);
        break;
      case 'atackLoseNameName':
        view.clearYellow('windowRight_9');
        view.clearYellowMark('markerRight_9');
        view.clearYellow('windowRight_8');
        view.clearYellowMark('markerRight_8');
        window.setTimeout(() => { view.displayMessage('loseNameName'); }, 1700);
        window.setTimeout(() => { view.hideMessage('loseNameName'); }, 4000);
        window.setTimeout(() => { view.deleteShip(msg.data[0]); }, 4250);
        window.setTimeout(() => { view.deleteShip(msg.data[1]); }, 4500);
        deleteFlags();
        deleteBackColor();
        break;
      case 'atackLose':
        view.deleteShip(msg.data);
        deleteFlags();
        deleteBackColor();
        view.clearYellow('windowRight_9');
        view.clearYellowMark('markerRight_9');
        view.clearYellow('windowRight_8');
        view.clearYellowMark('markerRight_8');
        view.displayMessage('shipDefended');
        window.setTimeout(() => { view.hideMessage('shipDefended'); }, 3000);
        break;
      case 'atackWin':
        view.displayMessage('lose');
        view.clearYellow('windowRight_9');
        view.clearYellowMark('markerRight_9');
        view.clearYellow('windowRight_8');
        view.clearYellowMark('markerRight_8');
        setTimeout(() => { view.hideMessage('lose'); }, 4000);
        break;
      case 'abortAtack':
        deleteFlags();
        deleteBackColor();
        view.clearYellow('windowRight_9');
        view.clearYellowMark('markerRight_9');
        view.clearYellow('windowRight_8');
        view.clearYellowMark('markerRight_8');
        break;
      case 'gameOverLandingCraftIsInOpponentPort':
        view.showContent('windowLeft_2', 'Okręt Desantowy'.toUpperCase());
        view.deleteShip(msg.data[0][0]);
        view.displayShip(msg.data[1], 'desantowyA_endGame');
        if (page == 'graczA') {
          view.displayShip(msg.data[1], 'desantowyB_endGame');
        } else if (page == 'graczB') {
          view.displayShip(msg.data[1], 'desantowyA_endGame');
        }
        view.displayMessage('endGame4');
        break;
      case 'atackWinWithMove':
        deleteBackColor();
        movingShip(msg.data[0], msg.data[1]);
        deleteFlags();
        view.clearYellow('windowRight_8');
        view.clearYellowMark('markerRight_8');
        setTimeout(view.currentPlayertMove, 2000);
        break;
      case 'atackWinWithNoMove':
        deleteFlags();
        deleteBackColor();
        view.deleteShip(msg.data[0]);
        window.setTimeout(view.currentPlayertMove, 2000);
        break;
      case 'victory':
        view.displayMessage('endGame1');
        break;
      default:
    }
  }
});

function scrollToBottom() {
  // body.scrollTop = document.body.scrollHeight;
  window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
}

window.onload = function () { socket; };
document.addEventListener('DOMContentLoaded', setTimeout(() => {
  window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
}, 2000), false);
