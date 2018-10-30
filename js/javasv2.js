
//create all the variables
var score;
var cardsmatched;

var ui = $("#gameUI");
var uiIntro = $("#gameIntro");
var uiStats = $("#gameStats");
var uiComplete = $("#gameComplete");
var uiCards= $("#cards");
var uiReset = $(".gameReset");
var uiScore = $(".gameScore");
var uiPlay = $("#gamePlay");
var uiTimer = $("#timer");

//create deck array
var matchingGame = {};
matchingGame.deck = ['carta1', 'carta1','carta2', 'carta2','carta3', 'carta3','carta4', 'carta4','carta5', 'carta5','carta6', 'carta6',
'carta7', 'carta7','carta8', 'carta8','carta9', 'carta9',];

//on document load the lazy way
$(function(){
	  init();
});

//initialise game
function init() {
					uiComplete.hide();
					uiCards.hide();
					playGame = false;
					uiPlay.click(function(e) {
						e.preventDefault();
						uiIntro.hide();
						startGame();
					});
				
					uiReset.click(function(e) {
						e.preventDefault();
						uiComplete.hide();					
						reStartGame();
					});
			}

//start game and create cards from deck array
function startGame(){
				uiTimer.show();
				uiScore.html("0 seconds");
				uiStats.show();
				uiCards.show();
				score = 0;
				cardsmatched = 0;
			   	if (playGame == false) {
			   			playGame = true;
						matchingGame.deck.sort(shuffle);
						for(var i=0;i<17;i++){
								$(".card:first-child").clone().appendTo("#cards");
							}
							// initialize each card's position
							uiCards.children().each(function(index) {
								// align the cards to be 3x6 ourselves.
								$(this).css({
									"left" : ($(this).width() + 20) * (index % 6),
									"top" : ($(this).height() + 20) * Math.floor(index / 6)
								});
								// get a pattern from the shuffled deck
								var pattern = matchingGame.deck.pop();
								// visually apply the pattern on the card's back side.
								$(this).find(".back").addClass(pattern);
								// embed the pattern data into the DOM element.
								$(this).attr("data-pattern",pattern);
								// listen the click event on each card DIV element.
								$(this).click(selectCard);
							});											 
				   	timer();
				};			   
			  }


//timer for game
function timer() {
				//alert("timer set")
				if (playGame) {
					scoreTimeout = setTimeout(function() {
						uiScore.html(++score + " seconds");		
						timer();
					}, 1000);
				};
		};

//shuffle cards
function shuffle() {
	return 0.5 - Math.random();
}

//onclick function add flip class and then check to see if cards are the same
function selectCard() {
	// we do nothing if there are already two cards flipped.
	if ($(".card-flipped").size() > 1) {
	return;
	}
	$(this).addClass("card-flipped");
	// check the pattern of both flipped card 0.7s later.
	if ($(".card-flipped").size() == 2) {
	setTimeout(checkPattern,700);
	}
}

//if pattern is same remove cards otherwise flip back
function checkPattern() {
	if (isMatchPattern()) {
		

		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");

		mensaje();

			if(document.webkitTransitionEnd){

				$(".card-removed").bind("webkitTransitionEnd",	removeTookCards);
			}else{
				removeTookCards();
			}
		} else {
		$(".card-flipped").removeClass("card-flipped");
	}
}

//put 2 flipped cards in an array then check the image to see if it's the same.
function isMatchPattern() {
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern == anotherPattern);
}

//check to see if all cardmatched variable is less than 8 if so remove card only otherwise remove card and end game 
function removeTookCards() {
	if (cardsmatched < 8){
		cardsmatched++;
		$(".card-removed").remove();
	}else{
		$(".card-removed").remove();
		uiCards.hide();
		uiComplete.show();
		clearTimeout(scoreTimeout);
	}	
}

//recreate the original card , stop the timer and re populate the array with class names
function reStartGame(){
				playGame = false;
				uiCards.html("<div class='card'><div class='face front'></div><div class='face back'></div></div>");
				clearTimeout(scoreTimeout);		
				matchingGame.deck = ['carta1', 'carta1','carta2', 'carta2','carta3', 'carta3','carta4', 'carta4','carta5', 'carta5','carta6', 'carta6',
'carta7', 'carta7','carta8', 'carta8','carta9', 'carta9',];

				startGame();
			}
function mensaje(){
	
	let advert = Math.floor(Math.random()*12);
  switch (advert) {
      case 0:
          swal('Dato interesante',
              'Mexicali, la ciudad que capturo al sol (slogan de la ciudad dado a sus temperaturas extremas, ' +
              'sobre todo en verano, alcanzando los 55 grados centigrados), protagonista de este aporte se ' +
              'encuentra en Baja California (asi es, Baja California Norte no existe, es Baja California a secas).',
              'success'
          )
          break;
      case 1:
          swal(
              'Dato interesante',
              ' La comida tipica de Mexicali se compone principalmente de 2 platillos: los tacos de carne asada' +
              ' (no puede decir que visito Mexicali si no fue a un puesto de tacos de carne asada) y la comida ' +
              'china (que mas que china es chino-mexicana, es muy buena y es unica no solo en Mexico, si no en ' +
              'el mundo). Ademas de estos platillos los hot dogs de Mexicali o jochos son bastante diferentes a ' +
              'los de otras partes de Mexico, tambien hay una oleada de restaurantes japoneses que ofrecen sushi-bolas ' +
              'que no se encuentran comúnmente en el centro y sur del pais.',
              'success'
          )
          break;
      case 2:
          swal(
              'Dato interesante',
              'La Administracion Publica Municipal es responsable de otorgar los servicios publicos y ' +
              'administrar los recursos con que contamos en el Municipio de Mexicali, para tal fin cuenta con 12 ' +
              'dependencias que tienen la gestion de: la policia y transito, recoleccion de basura, mantenimiento ' +
              'de vialidades, bomberos, entre otros.',
              'success'
          )
          break;
      case 3:
          swal(
              'Dato interesante',
              'Comisiones Permanentes Son las encargadas de aspectos especificos del gobierno, como educacion y hacienda. Se forman ' +
              'con los Regidores para ser una unidad especializada que busca la mejor manera de establecer ' +
              'lineas de accion ante una problematica municipal mediante convenios.',
              'success'
          )
          break;
      case 4:
          swal(
              'Dato interesante',
              'Comisiones Permanentes Son las encargadas de aspectos especificos del gobierno, como educacion y hacienda. Se forman ' +
              'con los Regidores para ser una unidad especializada que busca la mejor manera de establecer ' +
              'lineas de accion ante una problematica municipal mediante convenios.',
              'success'
          )
          break;
      case 5:
          swal(
              'Dato interesante',
              'El nacimiento de Baja California como Entidad Federativa ocurriria despues de poco mas de dos ' +
              'decadas de lucha; en efecto el 15 de Noviembre de 1951, el Presidente de la Republica Miguel ' +
              'Aleman Valdez, presento la iniciativa al H. Congreso del Estado de la Union para reformar los ' +
              'articulos 43 y 45 de la Constitucion Politica de los Estado Unidos Mexicano',
              'success'
          )
          break;
      case 6:
          swal(
              'Dato interesante',
              'Con Fecha 16 de Enero de 1952, se publico en el Diario Oficial de la Federacion el Decreto que ' +
              'reformo los articulos 43 y 45 de la Constitucion Politica de los Estados Unidos Mexicanos, que ' +
              'dio a conocer a las partes integrantes de la Federacion, incluyendo al Estado de Baja California ' +
              'y, por tanto es el inicio de la vida libre y soberana de nuestra entidad.',
              'success'
          )
          break;
      case 7:
          swal(
              'Dato interesante',
              'Desde 1823 hasta 1952, Baja California fue un territorio sujeto a los poderes centrales, su ' +
              'organizacion politica fue evolucionando a la medida de sus necesidades.',
              'success'
          )
          break;
      case 8:
          swal(
              'Dato interesante',
              'Con la separacion de la Alta California tras la guerra con Estados Unidos, el 25 de abril de ' +
              '1850 el Territorio de la Baja California se dividio en dos Partidos, el Norte y el Sur, bajo el ' +
              'mando de un Jefe Politico nombrado por el supremo gobierno. ',
              'success'
          )
          break;
      case 9:
          swal(
              'Dato interesante',
              'En 1930 un grupo de bajacalifornianos que estudiaban en la Cd. de Mexico sugiere al Poder ' +
              'Legislativo, el cambio politico de toda la peninsula, ya que por separado ninguno de los dos ' +
              'Distritos llenaban los requisitos para convertirse en Estado.',
              'success'
          )
          break;
      case 10:
          swal(
              'Dato interesante',
              '1939.- Se forma en Tijuana el Partido Pro Estado libre con Guillermo Medina Amor, Rafael ' +
              'Quijano, Manuel Acosta Meza, Antonio Morales Tamborrel y Alberto Amador.',
              'success'
          )
          break;
      case 11:
          swal(
              'Dato interesante',
              '25 de Octubre de 1953 - Se llevan a cabo las elecciones de Gobernador y 1a. Legislatura en el ' +
              'Estado, primeras elecciones en Mexico en que votan las mujeres. Los candidatos a gobernador ' +
              'participantes fueron Dr. Francisco C. Lizarraga por el PAN, Braulio Maldonado por el PRI y ' +
              'Maurilio Vargas por el FPP; resultando ganadores, tanto en la gubernatura como en las diputaciones, ' +
              'los candidatos del PRI. Cabe decir que por la reforma constitucional de 1953, la L.E. Aurora Jimenez de ' +
              'Palacios, es la primera mujer por Baja California al Congreso de la Union.',
              'success'
          )
          break;
  }
}