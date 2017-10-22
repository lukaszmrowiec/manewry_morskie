window.onload = function start () {
  const socket = io();
  setTimeout(() => { document.getElementById('test').style.display = 'none'; }, 5000);
  function assignPlayers() {
    socket.emit('setPlayer', '');
  }
  document.getElementById('graj').addEventListener('click', assignPlayers);
  socket.on('setPlayer', (playerID) => {
    const msg = JSON.parse(playerID);
    if (msg === 1) {
      window.open('graczA', '_self');
    } else if (msg === 2) {
      window.open('graczB', '_self');
    }
  });
};
