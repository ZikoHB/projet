import Mobile from './mobile.js';
import saucerImage from "../images/flyingSaucer-petit.png";

// Saucer class is aliens ship that the player must destroy

export default class Saucer extends Mobile{
    constructor(x, y){
        super(x, y, saucerImage, -3, 0);
        this.falling = false;
    }

    shot(){
        console.log("mayday, mayday !");
        this.speed_x = -2;
        this.speed_y = 5;
        this.falling = true;
    }
}
