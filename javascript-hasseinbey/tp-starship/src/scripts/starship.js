import Mobile from "./mobile.js";
import MoveState from "./movestate.js";
import starshipImage from "../images/vaisseau-ballon-petit.png";

// Starship class is the player, the ship that can kill aliens

export default class Starship extends Mobile{
    constructor(x, y){
        super(x, y, starshipImage, 0, 8);
        this.moving = MoveState.IMMOBILE;
    }

    // Return if the ship is moving up

    get up(){
        return this.moving === MoveState.UP;
    }

    // Return if the ship is moving down

    get down(){
        return this.moving === MoveState.DOWN;
    }

    // Thanks to this method, the ship will not get out of the canvas

    move(){
        if(this.moving != MoveState.IMMOBILE){
            if(this.up){
                this.speed_y = -this.speed_y;
                super.move();
                this.speed_y = -this.speed_y;
            }
            else{
                super.move()
            }
        }
    }
}
