document.addEventListener('DOMContentLoaded', function() {
   view.checkPresencePlayers();
	clikassign();
	tourMessage();
	addboardModel();
}, false);
document.getElementById("powrot").addEventListener("click", backToMainPage);
//document.getElementById("deployShips2").addEventListener("click", function () {style.display = "none"});

function backToMainPage() {
	document.getElementById("returnToMainPage").style.display = "block";
	document.getElementById("returnButton").addEventListener("click", function () {
		 msg = {
					  	type: "opponentleaveTheGame",
					  	location: page
					};
			socket.emit('gameControl', JSON.stringify(msg));
		window.open("index", "_self");
	});
	document.getElementById("stayButton").addEventListener("click", function () {document.getElementById("returnToMainPage").style.display = "none"});
}

var board = document.getElementsByTagName("td"),
    boardModel = [],
    //reverseBoardModel,
    playerAmove = true,
    playerBmove = false,
    path = window.location.pathname,
    page = path.split("/").pop();
    
function addboardModel() {	
var player = location.href,x1, y1, x2, y2,
	 playerIndex = player.charAt(player.length-1);
 	 		 	
 	for (i = 0; i < board.length; i++) {
 	 	  boardModel.push([board[i].id, "wolny", "atak", "klasa", "gracz", 0, 0, "nazwa", "ulega", "opis", "ruch", x1, y1, x2, y2]);
 	 	  if (model.neutralny.indexOf(board[i].id) != -1) {
 	 	      boardModel[i][2] = "neutralne";
 	 	  }  	 	  	    	 	  	    	     
 	 }
 	 
	 if (playerIndex === "B" ) {		 
	 	 boardModel = boardModel.reverse();  
	 }
};    

function tourMessage() {
	if (page == "graczA") {
		  view.currentPlayertMove();
	} else if (page == "graczB") {
		  view.opponentMove();
	}
};
       
function cropShips(array) {
	for (i = 0; i < 10; i++) {
		array.pop();
	}
	return array;
};

function mixArray(arr) {
    for (var i=0; i<arr.length; i++) { 
        var j = Math.floor(Math.random() * arr.length);
        var temp = arr[i]; 
        arr[i] = arr[j]; 
        arr[j] = temp;
    }
    return arr;
};

function setCellstatFree(id) {
		delete boardModel[findCell(id)][1];
				 boardModel[findCell(id)][1] = "wolny";
      delete boardModel[findCell(id)][3];
				 boardModel[findCell(id)][3] = "klasa";
		delete boardModel[findCell(id)][4];
				 boardModel[findCell(id)][4] = "gracz";
}

function findShipType(array, shipType) {
	var numOfTypeShip = 0;
	for(var i = 0; i < array.length; i++){
		if (array[i].nazwa == shipType) {
			numOfTypeShip++;
		}
	}	
	return numOfTypeShip;
};

function clikassign() {
	var clik = board;
	for (var i = 0; i < board.length; i++){
	    clik[i].onmousedown = gameRoundMenage;	    
	 }
};

function gameRoundMenage(eventObj){
var token = true, player = location.href,
	 playerIndex = player.charAt(player.length-1);	 
	 
	if (playerIndex === "A" && playerAmove === true && playerBmove === false) {
		clickingProcedure(eventObj, token, playerIndex);
		
	} else if (playerIndex === "B" && playerBmove === true && playerAmove === false) {
		clickingProcedure(eventObj, token, playerIndex);
	}  
};

 function changePage() {
 	 window.location.replace('index');
 }

function clickingProcedure(eventObj, token, playerIndex) {
	var userClick = eventObj.target.id, boardModelIndex, msg, msgSend, arrayToSend = [], playerAcc, x1, x2, y1, y2;	
	boardModelIndex = findCell(userClick);

if (token) {
		if (boardModel[boardModelIndex][1] == "wolny" && boardModel[boardModelIndex][6] != 1) { 
			emptyClickProc();
			msg = {
					  	type: "emptyClic",
					  	location: page
				    };

			msgSend = JSON.stringify(msg);
			socket.emit('gameControl', msgSend);
			view.showContent("windowRight_2", "");
			console.log('emptyClic');
	   }else if (boardModel[boardModelIndex][1] == "zajety" && (findSelectedCells() == undefined   )) {
		   firstClickShip(userClick, boardModelIndex);
		   arrayToSend[0] = userClick;
		   arrayToSend[1] = boardModelIndex;
		   msg = {
					  	type: "firstShipClic",
					  	data: arrayToSend,
					  	location: page
				    };

			msgSend = JSON.stringify(msg);
			socket.emit('gameControl', msgSend);
			document.getElementById("deployShips1").style.display = "none";
			deleteArray(arrayToSend);				
		}else if (boardModel[boardModelIndex][1] == "zajety" && boardModel[findSelectedCells()][5] == 1 && (boardModel[boardModelIndex][3] == boardModel[findSelectedCells()][3])) { 
		   emptyClickProc();
		   msg = {
					  	type: "secondClickSameShip",
					  	location: page
				    };

			socket.emit('gameControl', JSON.stringify(msg));
			view.showContent("windowRight_2", "");
		}else if (boardModel[boardModelIndex][1] == "zajety" && boardModel[findSelectedCells()][1] == "zajety" && (boardModel[boardModelIndex][4] == boardModel[findSelectedCells()][4] ) && boardModel[boardModelIndex][4] == page){  
		   secondShipClickTheSamePlayer(userClick, boardModelIndex);		   
		   arrayToSend[0] = userClick;
		   arrayToSend[1] = boardModelIndex;
		   msg = {
					  	type: "secondShipclickSamePlayer",
					  	data: arrayToSend,
					  	location: page
				    };

			socket.emit('gameControl', JSON.stringify(msg));
			deleteArray(arrayToSend);			
	   }else if (boardModel[boardModelIndex][6] == 1 && boardModel[boardModelIndex][1] == "wolny" ) {                  					
			movingShip(userClick, boardModelIndex);		  
			arrayToSend[0] = userClick;
		   arrayToSend[1] = boardModelIndex;
			  msg = {
						   type: "moveShip",
						  	data: arrayToSend,
						  	location: page
					    };
				socket.emit('gameControl', JSON.stringify(msg)); 
	      if (movingShip) {
				  tourManager(playerIndex);
				  view.opponentMove();		
		     }
	   } else if (boardModel[boardModelIndex][2] == "neutralne") {   	
	   	view.neutralZone();
	   	view.displayMessage("neutralZone");
   		setTimeout(function() {view.clearYellow("windowRight_6");},5000);
	      setTimeout(function() {view.clearYellowMark("markerRight_6");},5000);
	   	setTimeout(function () {view.hideMessage("neutralZone");}, 3000);
	   }else if (boardModel[findSelectedCells()][7] != "okretDesantowy" && boardModel[boardModelIndex][2] != "neutralne" && boardModel[boardModelIndex][6] == 1 && boardModel[boardModelIndex][1] == "zajety" && boardModel[findSelectedCells()][1] == "zajety" && (boardModel[boardModelIndex][4] != boardModel[findSelectedCells()][4])) {
			msg = {
					  	type: "atackCheck", 	
					  	location: page
				    };
			socket.emit('gameControl', JSON.stringify(msg));
			view.displayMessage("mes");
			document.getElementById("yesButton1").addEventListener("click", compareOpponets);
			document.getElementById("noButton2").addEventListener("click", abortAtack);
			
			function compareOpponets() {
				var clearWindow = function (){view.showContent("windowLeft_2", "")};
				view.showContent("windowLeft_2", boardModel[boardModelIndex][7].toUpperCase());
				   arrayToSend[0] = boardModel[findSelectedCells()][7].toUpperCase();
				   arrayToSend[1] = boardModel[boardModelIndex][7].toUpperCase();
				   //console.log("arrayToSend[0] :" +arrayToSend[0] + " arrayToSend[1] :" + arrayToSend[1] );
			      msg = {
					   	   type: "showYourship",
						    	data: arrayToSend,
						  	   location: page
					      };
				   socket.emit('gameControl', JSON.stringify(msg));	
				checkAtackResults();
				setTimeout(function() {view.showContent("windowLeft_2", "")},5000);
			};
			
			function checkAtackResults() {
				view.hideMessage("mes");
				console.log("boardModel[findSelectedCells()][7]) :" + boardModel[findSelectedCells()][7]);
				//console.log("boardModel[boardModelIndex][8] :" + boardModel[boardModelIndex][8]);				
		   	if ((boardModel[boardModelIndex][8].indexOf(boardModel[findSelectedCells()][7])) == -1) {
						if (boardModel[boardModelIndex][7] == boardModel[findSelectedCells()][7]) {
							arrayToSend[0] = boardModel[findSelectedCells()][0];
				         arrayToSend[1] = boardModel[boardModelIndex][0];
							msg = {
								  	type: "atackLoseNameName",
								  	data: arrayToSend,	
								  	location: page
								   };
							socket.emit('gameControl', JSON.stringify(msg));
							view.displayMessage("loseNameName");
							window.setTimeout(function () {view.hideMessage("loseNameName");}, 3000);
							window.setTimeout(function () {view.deleteShip(boardModel[boardModelIndex][0]);}, 3500);
							atackLose(boardModel[findSelectedCells()][0]);
						}else {
							view.displayMessage("lose");
							msg = {
								  	type: "atackLose",
								  	data: boardModel[findSelectedCells()][0],	
								  	location: page
								   };
							socket.emit('gameControl', JSON.stringify(msg))
							atackLose(boardModel[findSelectedCells()][0]);
						}						
					tourManager(playerIndex);				
				}else {
					view.hideMessage("mes");
					if (boardModel[boardModelIndex][7] == "okretDesantowy") {
							msg = {
							  	type: "victory",	
							  	location: page
					    	};
							socket.emit('gameControl', JSON.stringify(msg));
						   view.displayMessage("endGame2");	
						} else {
			  				   view.displayMessage("win");
								msg = {
								  	type: "atackWin",
								  	data: boardModel[boardModelIndex][0],
								  	location: page
							    };
							   socket.emit('gameControl', JSON.stringify(msg));
								document.getElementById("yesButton3").addEventListener("click", atackWinWithMove);
								function atackWinWithMove() {
								view.hideMessage("win");
								movingShip(userClick, boardModelIndex);
								arrayToSend[0] = userClick;
				            arrayToSend[1] = boardModelIndex;			         
							      msg = {
									   	   type: "atackWinWithMove",
										    	data: arrayToSend,
										  	   location: page
									      };	
								 socket.emit('gameControl', JSON.stringify(msg));	
								}
								document.getElementById("noButton4").addEventListener("click", atackWinWithNoMove);
				            function atackWinWithNoMove(){
				               atackWin(userClick, boardModelIndex);
				               arrayToSend[0] = userClick;
					            arrayToSend[1] = boardModelIndex;		         
								      msg = {
										   	   type: "atackWinWithNoMove",
											    	data: arrayToSend,
											  	   location: page
										      };
									socket.emit('gameControl', JSON.stringify(msg));  
				            }
				            tourManager(playerIndex);
	              }
		        }
	       }
	    }	 
}
return playerAmove, playerBmove;
};

function tourManager(playerIndex) {
	if (playerIndex === "A") {
	  		playerAmove = false,
	      playerBmove = true,
			msg = {
			  	type: "palayersAccesAfalse",
			  	data: playerAmove,
			  	location: page
		    };
			socket.emit('gameControl', JSON.stringify(msg));
			msg = {
			  	type: "palayersAccesBtrue",
			  	data: playerBmove,
			  	location: page
		    };		    
			socket.emit('gameControl', JSON.stringify(msg));
			view.opponentMove();
	  } else if (playerIndex === "B") {
	  	   playerAmove = true,
	      playerBmove = false,
			msg = {
			  	type: "palayersAccesAtrue",
			  	data: playerAmove,
			  	location: page
		    };
			socket.emit('gameControl', JSON.stringify(msg));
			msg = {
			  	type: "palayersAccesBfalse",
			  	data: playerBmove,
			  	id: "A",
			  	location: page
		    };
			socket.emit('gameControl', JSON.stringify(msg));
			view.opponentMove();
		}
}

function deleteArray(array) {
	for (i=0;i < array.length; i++) {
		delete array[i];
	}
	return array;
}

function abortAtack(){
	view.hideMessage("mes");
	emptyClickProc();
	  msg = {
					  	type: "abortAtack",
					  	location: page
				    };
	 socket.emit('gameControl', JSON.stringify(msg));
};

function emptyClickProc(){
		deleteFlags();
   	delAvilableMoves();
   	deleteBackColor();
};
function firstClickShip(userClick, boardModelIndex) {
	if (boardModel[boardModelIndex][4] == page) {
   	setActivShip(boardModelIndex);
   	view.moveArea(userClick, boardModelIndex);
   	view.showMarkMovments(boardModelIndex);
   	view.showContent("windowRight_2", boardModel[boardModelIndex][9].toUpperCase());	
   	document.getElementById(userClick).style.backgroundColor = "rgb(12, 210, 118)";   			   	  	
   }else if (boardModel[boardModelIndex][4] != page) {
   	view.warning();
   	setTimeout(function() {
	       						  view.clearYellow("windowRight_7");
	       						 },5000);
	   setTimeout(function() {
	       						  view.clearYellowMark("markerRight_7");
	       						 },5000);
   	window.setTimeout(view.currentPlayertMove, 5000);
   }
};


function secondShipClickTheSamePlayer(userClick, boardModelIndex) {
	if (boardModel[boardModelIndex][4] == page) {
   	delAvilableMoves();		   	
   	deleteBackColor();
   	deleteFlags();   	
   	setActivShip(boardModelIndex);	   			   	
   	view.moveArea(userClick, boardModelIndex);
   	view.showMarkMovments(boardModelIndex);
   	view.showContent("windowRight_2", boardModel[boardModelIndex][9].toUpperCase());
   	document.getElementById(userClick).style.backgroundColor = "rgb(12, 210, 118)";	   	
   } 	else if (boardModel[boardModelIndex][4] != page) {
   	view.warning();
   	setTimeout(function() {
	       						  view.clearYellow("windowRight_7");
	       						 },5000);
	   setTimeout(function() {
	       						  view.clearYellowMark("markerRight_7");
	       						 },5000);
   	window.setTimeout(view.currentPlayertMove, 5000);
   }
};

function secondShipClickTheSamePlayerToSend(userClick, boardModelIndex) {
   	delAvilableMoves();		   	
   	deleteBackColor();
   	deleteFlags();   	
   	setActivShip(boardModelIndex);	   			   	
   	document.getElementById(userClick).style.backgroundColor = "rgb(12, 210, 118)";	   	
};

function movingShip(userClick, boardModelIndex) {
   var msg, arrayToSend = [];
	   view.displayShip(userClick, boardModel[findSelectedCells()][3], boardModel[findSelectedCells()][4], boardModel[findSelectedCells()][7],boardModel[findSelectedCells()][8], boardModel[findSelectedCells()][9]); 
   	deleteBackColor();
   	  	 	
   	if (boardModel[boardModelIndex][7] === "okretDesantowy" && boardModel[boardModelIndex][4] == page) {
	   	if (page == "graczA") {   		 
	   			if ((model.portB.indexOf(userClick)) != -1) {
	   				view.displayMessage("endGame3");
	   				//arrayToSend[0] = boardModel[findSelectedCells()];
				      //arrayToSend[1] = userClick;
	   				msg = {
						  	type: "gameOverLandingCraftIsInOpponentPort",
						  	//data: arrayToSend,					  	
						  	location: page
			         };
				      socket.emit('gameControl', JSON.stringify(msg));    
	   			}	   
	   	} else if (page == "graczB") {
	   			if ((model.portA.indexOf(userClick)) != -1) {
	   				view.displayMessage("endGame3");
	   				msg = {
						  	type: "gameOverLandingCraftIsInOpponentPort",
						  	//data: arrayToSend,				  	
						  	location: page
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
};

function atackLose(shipToDelete) {
	   window.setTimeout(function () {view.hideMessage("lose");}, 3500);
	   window.setTimeout(function () {view.deleteShip(shipToDelete);}, 3750);		
		deleteBackColor();
	 	deleteFlags();		   	
	   delAvilableMoves();
};

function atackWin(userClick, boardModelIndex) {
	   //view.deleteShip(userClick);
	   //view.displayShip(userClick, boardModel[findSelectedCells()][3], boardModel[findSelectedCells()][4], boardModel[findSelectedCells()][7],boardModel[findSelectedCells()][8]); 
		view.hideMessage("win"); 	   
 	   view.deleteShip(boardModel[boardModelIndex][0]);
 	   deleteBackColor();
	   deleteFlags();		   	
	   delAvilableMoves();		   		
};

function markProc(eventObj) {
	var userClick = eventObj.target.id;
		document.getElementById(userClick).style.backgroundColor = "rgb(12, 210, 118)";
		//document.getElementById(userClick).style.opacity = "0.4";		
};

function demarkOutProc(eventObj) {
   var userClick = eventObj.target.id;
   boardModelIndex = findCell(userClick);
   if (boardModel[boardModelIndex][6] != 1 ) {
	   document.getElementById(userClick).style.backgroundColor = "";
   } else if (boardModel[boardModelIndex][6] == 1) {
   	document.getElementById(userClick).style.backgroundColor = "#9fa9a3";
   	
   }
};

function moveShip(shipID, boardModelIndex) { 
    view.displayShip(shipID, boardModel[boardModelIndex][3], boardModel[boardModelIndex][3]);  	
};

function delAvilableMoves() {
	for (i=0; i < boardModel.length; i++) {
		boardModel[i][6] = 0;
	}
};

function deleteLose() {
	view.hideMessage(lose);
}
function setActivShip (index) {
	boardModel[index][5] = 1;
};

function deleteFlags() {
	for (i=0; i < boardModel.length; i++) {
		boardModel[i][5] = 0;
	}
}

function findSelectedCells() {
	for (i=0; i < boardModel.length; i++) {
		if(boardModel[i][5] === 1){
			return i;
		}		
	}
};

function deleteBackColor() {
		for (i=0; i < boardModel.length; i++) {
			document.getElementById(board[i].id).style.backgroundColor = "";
		}
};

function findShip(shipClass){
  var ship, shipMove1, shipMove2;
    for (i=0; i < model.shipsA.length; i++) {
	   ship = model.shipsA[i].klasa;
		if (shipClass === ship) {
			shipMove1 = model.shipsA[i].ruch;
			return shipMove1;
	  } else {
   	for (j=0; j < model.shipsB.length; j++) {
			       ship = model.shipsB[j].klasa;
			       if (shipClass === ship) {
				       shipMove2 = model.shipsB[j].ruch;
			          return shipMove2;
			       }
	       	}
       } 
   } 
};

function findShipName(shipClass){
  var ship, shipMove1, shipMove2;
    for (i=0; i < model.shipsA.length; i++) {
	   ship = model.shipsA[i].klasa;
		if (shipClass === ship) {
			shipMove1 = model.shipsA[i].nazwa;
			return shipMove1;
	  } else {
   	for (j=0; j < model.shipsB.length; j++) {
			       ship = model.shipsB[j].klasa;
			       if (shipClass === ship) {
				       shipMove2 = model.shipsB[j].nazwa;
			          return shipMove2;
			       }
	       	}
       } 
   } 
};

function findShipBitLose(shipClass){
  var ship, shipMove1, shipMove2;
    for (i=0; i < model.shipsA.length; i++) {
	   ship = model.shipsA[i].klasa;
		if (shipClass === ship) {
			shipMove1 = model.shipsA[i].ulega;
			return shipMove1;
	  } else {
   	for (j=0; j < model.shipsB.length; j++) {
			       ship = model.shipsB[j].klasa;
			       if (shipClass === ship) {
				       shipMove2 = model.shipsB[j].ulega;
			          return shipMove2;
			       }
	       	}
       } 
   } 
};

function checkShipPower(klasa) {
	var lose = findShipBitLose(klasa);
	for (i=0; i < lose.length; i++) {
	}
};

function findCell(id) {
	for ( i = 0; i < boardModel.length; i++) {
       if(boardModel[i][0] == id){
         return i;
       }
	}
	return;
};

/*
function checkNeighbor(coorX, coorY) {
	var coorX = Number(coorX);
		 coorY = Number(coorY);	
	
	
	var neighbors = [], coorXplus1 = coorX + 1, newX, coorYplus1 = coorY + 1, newY, boardModInd, id;
      newX = Number(x1);
      
		console.log('x2 + 2 : ' + (x1_new + 2));	
	
	
	neighbors[0] = coorX + (coorY + 1);
	neighbors[1] = coorX + (coorY - 1);
			

};
*/