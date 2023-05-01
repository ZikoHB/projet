import Starship from "./starship.js";
import Saucer from "./saucer.js";
import MoveState from "./movestate.js";
import Shoot from "./shoot.js";

// Game class define all method related to create the game

export default class Game {

  constructor(){
      this._canvas = undefined;
      this.saucers = [];
      this._score = 0;
      this.shoots = [];
      this.flotteSoucoupe = false;
  }


  set canvas(canvas){
      this._canvas = canvas;
      this.createStarship();
  }


  createStarship(){
      this.starship = new Starship(40, this._canvas.height / 2);
  }

  addShoot(){
      this.shoots.push(new Shoot(this.starship.x + this.starship.image.width, this.starship.y + this.starship.image.height - 8));
  }


  addSaucer(){
      const y = getRandomInt(this._canvas.height);
      const x = this._canvas.width;
      let saucer = new Saucer(x, y);
      this.saucers.push(saucer);
      console.log(this.saucers);
  }

  addSaucerRandomly(){
      const myRandInt = getRandomInt(1);
      if(myRandInt == 0){
          this.addSaucer();
      }
  }

  infSoucoupe(){
      if (this.flotteSoucoupe == false){
          this.flotteSoucoupe = true;
          this.flotteInterval = window.setInterval(this.addSaucerRandomly.bind(this), 750);
      }
      else{
          this.flotteSoucoupe = false;
          clearInterval(this.flotteInterval);
      }
  }


  addScore(x){
      this._score += x;
      this.scoreBox.textContent = this.score;
  }


  get score(){
      return this._score;
  }


  set score(score){
      console.log("cannot set score !");
  }

  set scoreBox(scoreBox){
      this._scoreBox = scoreBox;
  }

  get scoreBox(){
      return this._scoreBox;
  }



  isSaucerInBoundLeft(saucer){
      if(saucer.x <= 0){
          return false;
      }
      return true;
  }

  isSaucerInBoundDown(saucer){
      if(saucer.y >= this._canvas.height){
          return false;
      }
      return true;
  }

  isShotInBound(shot){
      if(shot.x >= this._canvas.width){
          return false;
      }
      return true;
  }

  correctStarshipCoordinates(starship){
      if(starship.y < 0){
          starship.y = 0;
      }
      if(starship.y > this._canvas.height - starship.image.height){
          starship.y = this._canvas.height - starship.image.height;
      }
  }


  startAnimating(fps){
      this.fpsInterval = 1000 / fps;
      this.then = Date.now();
      this.animate();
  }


  animate(){

      window.requestAnimationFrame(this.animate.bind(this));
      this.now = Date.now();
      this.elapsed = this.now - this.then;
      if (this.elapsed > this.fpsInterval){
          this.then = this.now - (this.elapsed % this.fpsInterval)
          this.animateOneFrame();
      }
  }

  animateOneFrame(){
      let context = this._canvas.getContext("2d");
      this.saucers.forEach(saucer => {saucer.clear(context); saucer.move();});
      const oldLength = this.saucers.length;
      this.saucers = this.saucers.filter(this.isSaucerInBoundLeft);
      const newLength = this.saucers.length;
      const difference = oldLength - newLength;
      if(difference < 0){
          throw "A ship was added, but was not supposed to be";
      }
      if(difference > 0){
          this.addScore(-1000*difference);
      }
      this.saucers = this.saucers.filter(this.isSaucerInBoundDown.bind(this));

      this.saucers.forEach(saucer => {saucer.draw(context)});

      this.shoots.forEach(shoot => {shoot.clear(context); shoot.move();});

      this.shoots.forEach(shoot => {
          const eventuallyASaucer = shoot.checkForCollisions(this.saucers);
          console.log(eventuallyASaucer);
          if(eventuallyASaucer){
              eventuallyASaucer.shot();
              this.addScore(200);
              this.shoots.splice(this.shoots.indexOf(shoot), 1);
          }
      });
      this.shoots.forEach(shoot => shoot.draw(context));

      this.shoots = this.shoots.filter(this.isShotInBound.bind(this));

      this.starship.clear(context);
      this.starship.move();

      this.correctStarshipCoordinates(this.starship);

      this.starship.draw(context);
  }


  keyDownActionHandler(event){
      switch(event.key){
          case "ArrowUp":
          case "Up":
              this.starship.moving = MoveState.UP;

          break;
          case "ArrowDown":
          case "Down":
              this.starship.moving = MoveState.DOWN;

          break;
          case " ":
              this.addShoot();
          break;
          default: return;
      }
      event.preventDefault();
  }


  keyUpActionHandler(event){
      switch(event.key){
          case "ArrowUp":
          case "Up":
          case "ArrowDown":
          case "Down":
              this.starship.moving = MoveState.IMMOBILE;
          break;
          default: return;
      }
      event.preventDefault();
  }
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
