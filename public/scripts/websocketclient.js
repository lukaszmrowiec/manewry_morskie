var socket = io();


function setupInput() {
	var input1 = document.getElementById("deployShips1"),
	    input2 = document.getElementById("deployShips2");
	
	if (input1) {
		    input1.addEventListener("click", function(e) {
			 view.placeShipsA();
			 console.log("Rozmieszczenie okrętów gracza A.");
			 window.setTimeout(view.currentPlayertMove, 5000);
			 document.getElementById("deployShips1").style.display = "none";	
		});
   } else if (input2) {
	    input2.addEventListener("click", function(e) {
		 view.placeShipsB();
		 console.log("Rozmieszczenie okrętów gracza B.");
   	 msg = {
					  	type: "playerBisPresent",
					  	location: page
					};
			socket.emit('gameControl', JSON.stringify(msg));
			document.getElementById("deployShips2").style.display = "none";
	   });
   }
};
setupInput();

socket.on('dupa', function (mes) {
	console.log('Wiadomość : ' + mes)
});

socket.on('gameControl', function (mes) {
	var msg = JSON.parse(mes);

 if (page != msg.location) {
	
	switch(msg.type) {
		 case "playerBisPresent":
		   view.clearYellow("windowLeft_3");
   	   view.clearYellowMark("markerLeft_3");
			document.getElementById("waiting").style.display = "none";
			document.getElementById("deployShips1").style.display = "inline";
   	   view.secondPlayerActive();
	      console.log("playerBisPresent");
	      msg = {
					  	type: "playerAisPresent",
					  	location: page
					};
			socket.emit('gameControl', JSON.stringify(msg));
	      break;
         case "playerAisPresent":
            view.markElement("windowLeft_4","markerLeft_4");
			   //view.markElement("windowLeft_5","markerLeft_5");	   
	      break;	          
	     case "opponentleaveTheGame":
	      view.markElement("windowLeft_3","markerLeft_3");
	      view.clearYellow("windowLeft_4");
	      view.clearYellowMark("markerLeft_4");
	      view.clearYellow("windowLeft_5");
	      view.clearYellowMark("markerLeft_5");
		   document.getElementById("returnToMainPage_message").style.display = "block";
			document.getElementById("returnButton_message").addEventListener("click", function () {window.open("index", "_self");});	   
	      break; 	        
	    case "placeShipsA":   //rozmieszczenie okrętów Gracza A na planszy gracza B - to co widzi B
	       view.placeShipsAinB(msg.data);
		    view.opponentDeployedShips();
		    setTimeout(function() {view.clearYellow("windowLeft_5"); },7000);
		    setTimeout(function() {view.clearYellowMark("markerLeft_5"); },7000);        
		    window.setTimeout(view.opponentMove, 3000);	
	      break;
	    case "placeShipsB":  //rozmieszczenie okrętów Gracza B na planszy gracza A
	      view.placeShipsBinA(msg.data);
	      view.opponentDeployedShips();
	       setTimeout(function() {view.clearYellow("windowLeft_5");},7000);
	       setTimeout(function() {view.clearYellowMark("markerLeft_5");},7000);
	       setTimeout(function() {view.clearYellow("windowLeft_3");},2000);
	       setTimeout(function() {view.clearYellowMark("markerLeft_3"); },2000);
	       document.getElementById("deployShips1").style.display = "none";
     	     console.log("placeShipsB");
	      break;
	    case "palayersAccesAfalse":
	      playerAmove = false;
	      console.log("palayersAccesAfalse");
	      //console.log("placeShipsB");
	      break;
	    case "palayersAccesBtrue":
	      playerBmove = true;
	      window.setTimeout(view.currentPlayertMove, 1000);
	      console.log("palayersAccesBtrue");
	      break;
	    case "palayersAccesAtrue":
	      playerAmove = true;
	      //console.log("palayersAccesAtrue");

	      window.setTimeout(view.currentPlayertMove, 1000);
	      break;
	    case "palayersAccesBfalse":
	      playerBmove = false;
	      console.log("palayersAccesBfalse");
	      //console.log("palayersAccesBfalse");
	      break;
      case "emptyClic":
	      emptyClickProc();
	      view.clearYellow("windowRight_9");
   	   view.clearYellowMark("markerRight_9");
	      console.log("Zgłasza się emptyClic drugiego gracza.");
	      break;
	   case "firstShipClic":	
	      setActivShip(msg.data[1]);
	      view.moveAreaHide(msg.data[0], msg.data[1]);
   	   document.getElementById(msg.data[0]).style.backgroundColor = "rgb(12, 210, 118)";
   	   console.log("firstShipClic");
	      break;
	   case "secondClickSameShip":
	      console.log("secondClickSameShip");
   	   //console.log("firstShipClic");
	      break;
	   case "secondClickSameShip":
	      emptyClickProc();
	      view.clearYellow("windowRight_9");
   	   view.clearYellowMark("markerRight_9");
	      view.opponentMove();
	      break;
	   case "secondShipclickSamePlayer":
	      secondShipClickTheSamePlayerToSend(msg.data[0], msg.data[1]);
	      console.log("secondShipclickSamePlayer");
	      break;
	   case "moveShip":
	      view.currentPlayertMove();
	      movingShip(msg.data[0], msg.data[1]);
	      view.clearYellow("windowRight_9");
   	   view.clearYellowMark("markerRight_9");
	      console.log("moveShip");
	      break;
      case "yourMove":     
	      console.log("yourMove");
	      break;
	  case "atackCheck":
	       view.atackCheck();
	       console.log("atackCheck"); 
	      break;
      case "yourMove":     
	      //console.log("yourMove");
	      break;
	  case "showYourship":
	       var clearWindow = function (){view.showContent("windowLeft_2", "")};
	       view.displayMessage("shipAttacked");
	       view.showContent("windowLeft_2", msg.data[0]);
	       console.log("arrayToSend[0] :" + msg.data[0] + " arrayToSend[1] :" + msg.data[1] );
	       window.setTimeout(clearWindow, 7000);       
	       window.setTimeout(function () {view.hideMessage("shipAttacked");}, 2000); 
	      break;
	  case "atackCheck":
	       view.atackCheck();
	      break;
	  case "atackLoseNameName":	       
	       view.clearYellow("windowRight_9");
   		 view.clearYellowMark("markerRight_9");
	       view.clearYellow("windowRight_8");
   	    view.clearYellowMark("markerRight_8");	    
   	    window.setTimeout(function () {view.displayMessage("loseNameName");}, 1700);
   	    window.setTimeout(function () {view.hideMessage("loseNameName");}, 4000);
   	    window.setTimeout(function () {view.deleteShip(msg.data[0]);}, 4250);
   	    window.setTimeout(function () {view.deleteShip(msg.data[1]);}, 4500);  
  	       deleteFlags();
	       deleteBackColor();
	      break;
	  case "atackLose":
	       view.deleteShip(msg.data);
	       deleteFlags();
	       deleteBackColor();	       
	       view.clearYellow("windowRight_9");
   		 view.clearYellowMark("markerRight_9");
	       view.clearYellow("windowRight_8");
   	    view.clearYellowMark("markerRight_8");
   	    view.displayMessage("shipDefended");
   	    window.setTimeout(function () {view.hideMessage("shipDefended");}, 3000);
	      break;
	   case "atackWin":
	       view.displayMessage("lose");									
	       view.clearYellow("windowRight_9");
   		 view.clearYellowMark("markerRight_9");
   		 view.clearYellow("windowRight_8");
   		 view.clearYellowMark("markerRight_8");  		 
			 window.setTimeout(function () {view.hideMessage("lose");}, 4000);              
	      break;
	  case "abortAtack":
	       deleteFlags();
	       deleteBackColor();
	       view.clearYellow("windowRight_9");
   		 view.clearYellowMark("markerRight_9");
   		 view.clearYellow("windowRight_8");
   		 view.clearYellowMark("markerRight_8");
	       //window.setTimeout(view.opponentMove, 3000);
	       console.log("abortAtack");
	       break;
	  case "gameOverLandingCraftIsInOpponentPort":
	  		 view.showContent("windowLeft_2", "Okręt Desantowy".toUpperCase());	  		 
			 view.deleteShip(msg.data[0][0]);
			  view.displayShip(msg.data[1], "desantowyA_endGame");
			 if (page == "graczA") {
	  		 		view.displayShip(msg.data[1], "desantowyB_endGame");
	  		 		console.log("Zgłasza się : gameOverLandingCraftIsInOpponentPort: if " );
	  		 }else if (page == "graczB") {
	  		 	    view.displayShip(msg.data[1], "desantowyA_endGame");
	  		 	    console.log("Zgłasza się : gameOverLandingCraftIsInOpponentPort: if else" );
	  		 }  		 		 
	       view.displayMessage("endGame4");       	       
	      break;
	  case "atackWinWithMove":	       
	       deleteBackColor();
	       movingShip(msg.data[0], msg.data[1]);
	       deleteFlags();
	       view.clearYellow("windowRight_8");
   		 view.clearYellowMark("markerRight_8");
   		 //view.clearYellow("windowRight_5");
   		 //view.clearYellowMark("markerRight_5");
	       //window.setTimeout(view.opponentMove, 3000);
	       window.setTimeout(view.currentPlayertMove, 2000);
	       console.log("atackWinWithMove");
	       break;
    case "atackWinWithNoMove":
	       deleteFlags();
	       deleteBackColor();	       
	       view.deleteShip(msg.data[0]);
	       //window.setTimeout(view.opponentMove, 3000);
	       window.setTimeout(view.currentPlayertMove, 2000);
	       console.log("atackWinWithNoMove");
		    break;
	  case "victory":
	       view.displayMessage("endGame1");       
		    break;
     };
	}
});

function scrollToBottom() {
	//body.scrollTop = document.body.scrollHeight;
	window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
}	

window.onload = function () {socket};
document.addEventListener('DOMContentLoaded', setTimeout(function() {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);   
},2000), false);