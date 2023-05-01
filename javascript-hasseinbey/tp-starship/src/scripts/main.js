
// importation de la classe Game.js
import Game from './game.js';


// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {
  const theGame = new Game();
  const boutonSoucoupe = document.getElementById("nouvelleSoucoupe");
	boutonSoucoupe.addEventListener("click", theGame.addSaucer.bind(theGame));

	const boutonFlotteSoucoupe = document.getElementById("flotteSoucoupes");
	boutonFlotteSoucoupe.addEventListener("click", theGame.infSoucoupe.bind(theGame));

	const scoreBox = document.getElementById("score");
	theGame.scoreBox = scoreBox;

	const canvas = document.getElementById("stars");
	theGame.canvas = canvas;
	canvas.addEventListener("keydown", theGame.keyDownActionHandler.bind(theGame));
	canvas.addEventListener("keyup", theGame.keyUpActionHandler.bind(theGame));
	theGame.createStarship();

	theGame.startAnimating(50);
}

window.addEventListener("load",init);

console.log('le bundle a été généré');
