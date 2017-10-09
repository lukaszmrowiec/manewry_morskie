var view = {
	 displayShip: function (id, klasa, gracz, nazwa, ulega, opis, ruch) {
	 	   var cell = document.getElementById(id), index;
	 	   cell.setAttribute("class", klasa);
	 	   index = findCell(id);
	 	  	 		 
			delete boardModel[index][1];		
					 boardModel[index][1] = "zajety";
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
	 deleteShip : function (id) {
	 	   var cell = document.getElementById(id), index;
	 	   cell.setAttribute("class", "");
	 	   index = findCell(id); 
	 		 
			delete boardModel[index][1];		
					 boardModel[index][1] = "wolny";
		   delete boardModel[index][3];
					 boardModel[index][3] = "klasa";
			delete boardModel[index][4];
					 boardModel[index][4] = "gracz";
			delete boardModel[index][7];
					 boardModel[index][7] = "nazwa"; 
		   delete boardModel[index][8];
					 boardModel[index][8] = "ulega"; 
		   delete boardModel[index][9];
					 boardModel[index][9] = "opis";
			delete boardModel[index][10];
					 boardModel[index][10] = "ruch";  
	 },
	 //wyświetla okręty na początkowych pozycjach w porcie A
	  placeShipsA: function(){
	  	    var shipsAarray, msg, msgSend;
			  cropShips(model.shipsA);
			  shipsAarray = mixArray(model.shipsA);
			  
			  msg = {
			  	type: "placeShipsA",
			  	data: shipsAarray,
			  	location: page
			  };
			  			  	
		  msgSend = JSON.stringify(msg);
		  socket.emit('gameControl', msgSend);

		     for (var i = 0; i < model.graczA.length; i++) {     	   
		     		view.displayShip(model.graczA[i],model.shipsA[i].klasa, "graczA", model.shipsA[i].nazwa, model.shipsA[i].ulega, model.shipsA[i].opis, model.shipsA[i].ruch);
		     }
				   view.displayShip("0201", "bateriaA", "graczA", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
				   view.displayShip("0103", "bateriaA", "graczA", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
				   view.displayShip("0308", "bateriaA", "graczA", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
				   view.displayShip("0310", "bateriaA", "graczA", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");				 
				 /*
				   view.displayShip("1107", "krazawnikA", "graczA", "krazawnik", ["pancernik", "okretRakietowy", "okretPodwodny", "bateriaNadbrzezna", "mina"], "Krążownik", 2);							 
				   view.displayShip("1408", "desantowyA", "graczA", "okretDesantowy", ["pancernik", "okretRakietowy", "krazawnik", "niszczyciel","okretPodwodny", "eskortowiec","bateriaNadbrzezna", "mina"], "Okręt Desantowy", 1);
				*/
				//return model.shipsA;
				document.getElementById("deployShips1").style.display = "none";				
    },
    
    placeShipsAinB: function(shipsA){			  
		 	   	
		     for (var i = 0; i < model.graczA.length; i++) {     	   
		     		view.displayShip(model.graczA[i], shipsA[i].klasa, "graczA", shipsA[i].nazwa, shipsA[i].ulega, model.shipsA[i].opis, model.shipsA[i].ruch);
		     }
				   view.displayShip("0201", "bateriaA", "graczA", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
				   view.displayShip("0103", "bateriaA", "graczA", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
				   view.displayShip("0308", "bateriaA", "graczA", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
				   view.displayShip("0310", "bateriaA", "graczA", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
				   
				  /* 
				   view.displayShip("1107", "krazawnikA", "graczA", "krazawnik", ["pancernik", "okretRakietowy", "okretPodwodny", "bateriaNadbrzezna", "mina"], "Krążownik", 2);							   
				   view.displayShip("1408", "desantowyA", "graczA", "okretDesantowy", ["pancernik", "okretRakietowy", "krazawnik", "niszczyciel","okretPodwodny", "eskortowiec","bateriaNadbrzezna", "mina"],"Okręt Desantowy", 1);
				*/	
    },

    //wyświetla okręty na początkowych pozycjach w porcie B
     placeShipsB: function(){
     	   var shipsBarray, shipsBtoSend, msg;
			  cropShips(model.shipsB);
			  shipsBarray = mixArray(model.shipsB);
			  		  
			  view.opponentMove();
			  msg = {
				  	type: "placeShipsB",
				  	data: shipsBarray,
				  	location: page
			   };		  			  	
		      socket.emit('gameControl', JSON.stringify(msg));	  			  
		     for (var i = 0; i < model.graczB.length; i++) {     	   
		     		view.displayShip(model.graczB[i],model.shipsB[i].klasa, "graczB", model.shipsB[i].nazwa, model.shipsB[i].ulega, model.shipsB[i].opis, model.shipsB[i].ruch);
		     }
				   view.displayShip(1401, "bateriaB", "graczB", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
				   view.displayShip(1403, "bateriaB", "graczB", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
					view.displayShip(1510, "bateriaB", "graczB", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
					view.displayShip(1608, "bateriaB", "graczB", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
					

				//	view.displayShip("1205", "niszczycielB", "graczB", "niszczyciel", ["pancernik", "okretRakietowy", "krazawnik", "okretPodwodny", "bateriaNadbrzezna", "mina"], "Niszczyciel", 4);

				//	view.displayShip("1205", "niszczycielB", "graczB", "niszczyciel", ["pancernik", "okretRakietowy", "krazawnik", "okretPodwodny", "bateriaNadbrzezna", "mina"], "Niszczyciel", 4);
   },
   
    placeShipsBinA: function(shipsB){    				    
		     for (var i = 0; i < model.graczB.length; i++) {     	   
		     		view.displayShip(model.graczB[i], shipsB[i].klasa, "graczB", shipsB[i].nazwa, shipsB[i].ulega, model.shipsB[i].opis, model.shipsB[i].ruch);
		     }
				   view.displayShip(1401, "bateriaB", "graczB", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
				   view.displayShip(1403, "bateriaB", "graczB", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
					view.displayShip(1510, "bateriaB", "graczB", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
					view.displayShip(1608, "bateriaB", "graczB", "bateriaNadbrzezna", "okretRakietowy", "Bateria Nadbrzeżna");
					

				//	view.displayShip("1205", "niszczycielB", "graczB", "niszczyciel", ["pancernik", "okretRakietowy", "krazawnik", "okretPodwodny", "bateriaNadbrzezna", "mina"], "Niszczyciel", 4);																				

				//	view.displayShip("1205", "niszczycielB", "graczB", "niszczyciel", ["pancernik", "okretRakietowy", "krazawnik", "okretPodwodny", "bateriaNadbrzezna", "mina"], "Niszczyciel", 4);																				

   },
   //możliwy obszar ruchu dla aktywnego okrętu
    moveArea: function(userClick, boardModelIndex) {
			var   x1,x2,x2,y2,activClass,boardModelIndexmove,czebysz;
			
					activClass = document.getElementById(userClick).className;
					x1 = userClick.charAt(2) + userClick.charAt(3) ;
					y1 = userClick.charAt(0) + userClick.charAt(1);
					boardModelIndexmove = findShip(activClass);
					console.log('x2 : ' + x1);
					
			for (i=0; i < boardModel.length; i++) {
				 	x2 = boardModel[i][0].charAt(2) + boardModel[i][0].charAt(3);
			      y2 = boardModel[i][0].charAt(0) + boardModel[i][0].charAt(1);
				   
				   czebysz = Math.max(Math.abs(x1 -x2), Math.abs(y1 - y2));

				   if (czebysz <= boardModelIndexmove && boardModel[i][1] == "wolny") {
					   	document.getElementById(boardModel[i][0]).style.backgroundColor = "#9fa9a3";
					   	
					   	boardModel[i][6] = 1;
				  	}else if (czebysz <= boardModelIndexmove && boardModel[i][1] == "zajety" && boardModel[i][4] != boardModel[boardModelIndex][4]) {
				  		   document.getElementById(boardModel[i][0]).style.backgroundColor = "#000000";
					   	
					   	boardModel[i][6] = 1;
				  	} 	
			 }
    },
    moveAreaHide: function(userClick, boardModelIndex) {
			var   x1,x2,x2,y2,activClass,boardModelIndexmove,czebysz;
			
					activClass = document.getElementById(userClick).className;
					x1 = userClick.charAt(2) + userClick.charAt(3) ;
					y1 = userClick.charAt(0) + userClick.charAt(1);
					boardModelIndexmove = findShip(activClass);
			
			for (i=0; i < boardModel.length; i++) {
				 	x2 = boardModel[i][0].charAt(2) + boardModel[i][0].charAt(3);
			      y2 = boardModel[i][0].charAt(0) + boardModel[i][0].charAt(1);
				   
				   czebysz = Math.max(Math.abs(x1 -x2), Math.abs(y1 - y2));
				   
				   if (czebysz <= boardModelIndexmove && boardModel[i][1] == "wolny") {
					   	boardModel[i][6] = 1;
				  	}else if (czebysz <= boardModelIndexmove && boardModel[i][1] == "zajety" && boardModel[i][4] != boardModel[boardModelIndex][4]) {
					   	boardModel[i][6] = 1;
					   	this.atackArea();					   	
				  	} 	
			 }
    },
    checkPresencePlayers: function() {
		var msg;
	
		if (page == "graczB") {
			//this.displayMessage("deployShips2");
			msg = {
					  	type: "playerBisPresent",
					  	location: page
					};
			socket.emit('gameControl', JSON.stringify(msg));
			//setTimeout(function() {document.getElementById("deployShips2").setAttribute("class", "panelRight_anim"); },1000);			
		}else if (page == "graczA"){
			this.lackOfSecondPlayer();
		}
   },
    displayMessage: function (id) {
    	 var cell = document.getElementById(id);
	 	   cell.setAttribute("class", "message");
    },
     hideMessage: function (id) {
    	 var cell = document.getElementById(id);
	 	   cell.setAttribute("class", "hidemessage");
    },
    lackOfSecondPlayer : function () {
    	//document.getElementById("winRight_1").innerHTML = "BRAK DRUGIEGO GRACZA";
    	document.getElementById("windowLeft_3").style.color =  "yellow";
    	document.getElementById("markerLeft_3").style.backgroundColor = "yellow";
    },
    secondPlayerActive : function () {
    	//document.getElementById("winRight_1").innerHTML = "DRUGI GRACZ AKTYWNY. MOŻESZ ROZMIEŚCIĆ OKRĘTY.";
    	document.getElementById("windowLeft_4").style.color =  "yellow";
    	document.getElementById("markerLeft_4").style.backgroundColor = "yellow";
    },
    opponentMove : function () {
    	document.getElementById("windowRight_1").style.color = "#696969";
    	document.getElementById("windowLeft_1").style.color =  "yellow";
    	setTimeout(function() {document.getElementById("windowRight_1").setAttribute("class", "panelRight"); },7000);
    },
    currentPlayertMove : function () {
    	document.getElementById("windowRight_1").style.color = "yellow";
    	document.getElementById("windowLeft_1").style.color = "#696969";
    	//document.getElementById("windowRight_1").setAttribute("class", "panelRight_anim");
    },
    showMarkMovments: function (boardModelIndex) {
	    	var markToShow =  document.getElementById("markerRight_2"),
	    	    elToShow3 = document.getElementById("windowRight_3");
   	 
	    	 if (boardModel[boardModelIndex][10] == 1) {
	    	 	markToShow.setAttribute("class", "marker2_1");
	    	 	elToShow3.setAttribute("class", "windowRight_3_1");	    	 	
  	 	 	 	 
	    	 }else if (boardModel[boardModelIndex][10] == 2) {
	    	 	markToShow.setAttribute("class", "marker2_2");
	    	 	elToShow3.setAttribute("class", "windowRight_3_2");	

	    	 } else if (boardModel[boardModelIndex][10] == 3) {
	    	 	markToShow.setAttribute("class", "marker2_3");
	    	 	elToShow3.setAttribute("class", "windowRight_3_3");	
   	 	
	    	 }else if (boardModel[boardModelIndex][10] == 4) {
	    	 	markToShow.setAttribute("class", "marker2_4");
	    	 	elToShow3.setAttribute("class", "windowRight_3_4");	  	 	
	    	 }	 
    },
    shipsDeployed : function () {
    	//document.getElementById("winRight_1").innerHTML = "OKRĘTY ROZMIESZCZONE!.";
    },
    opponentDeployedShips : function () {
    	//document.getElementById("winRight_1").innerHTML = "PRZECIWNIK ROZMIEŚCIŁ OKRĘTY.";
    	document.getElementById("windowLeft_5").style.color =  "yellow";
    	document.getElementById("markerLeft_5").style.backgroundColor = "yellow";
    },
    atackArea : function () {
    	//document.getElementById("winRight_1").innerHTML = "TWÓJ OKRĘT ZNALAZŁ SIĘ W STREFIE ATAKU PRZECWNIKA";
    	document.getElementById("windowRight_9").style.color =  "yellow";
    	document.getElementById("markerRight_9").style.backgroundColor = "yellow";
    },
     atackCheck : function () {
    	//document.getElementById("winRight_1").innerHTML = "TWÓJ OKRĘT JEST NAMIERZANY!";
    	document.getElementById("windowRight_8").style.color =  "yellow";
    	document.getElementById("markerRight_8").style.backgroundColor = "yellow";
    },
    atack : function () {
    	//document.getElementById("winRight_1").innerHTML = "TWÓJ OKRTĘT ZOSTRAŁ ZAATAKOWANY!";
    },
    shipWin : function () {
    	//document.getElementById("winRight_1").innerHTML = "TWÓJ OKRTĘT OBRONIŁ SIĘ I ZATOPIŁ PRZECIWNIKA!";
    	//document.getElementById("windowRight_6").style.color =  "yellow";
    	//document.getElementById("markerRight_6").style.backgroundColor = "yellow";
    },
     deployShips : function () {
    	//document.getElementById("winRight_1").innerHTML = "ROZMIEŚĆ SOWJE OKRĘTY.";
    	
    },
    shipLose : function () {
    	//document.getElementById("winRight_1").innerHTML = "PRZECIWNIK ZATOPIŁ TWÓJ OKRĘT";
    	//document.getElementById("windowRight_5").style.color =  "yellow";
    	//document.getElementById("markerRight_5").style.backgroundColor = "yellow";
    },
    warning : function () {
    	//document.getElementById("winRight_1").innerHTML = "NIE MOŻESZ STEROWAĆ OKRĘTAMI PRECIWNIKA.";
    	document.getElementById("windowRight_7").style.color =  "yellow";
    	document.getElementById("markerRight_7").style.backgroundColor = "yellow";
    },
    showContent : function (elementID, contentToShow) {
    	document.getElementById(elementID).innerHTML = "<p>" + contentToShow + "</p>";  
    },
    neutralZone : function () {
    	document.getElementById("windowRight_6").style.color =  "yellow";
    	document.getElementById("markerRight_6").style.backgroundColor = "yellow"; 	
    },   
    markElement : function (div, mark) {
    	document.getElementById(div).style.color =  "yellow";
    	document.getElementById(mark).style.backgroundColor = "yellow";
    },
    clearYellow : function (el) {
    	document.getElementById(el).style.color = "#696969";
    },
    clearYellowMark : function (el) {
    	document.getElementById(el).style.backgroundColor = "";
    },    
};