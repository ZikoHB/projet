import saucerImage from "../images/flyingSaucer-petit.png";

/**
 * Mobile class is all image that can move on the canvas
 *
 * a Mobile is defined by an image, coordinates (x, y) and a speed
 */
export default class Mobile{
    constructor(x, y, image_src= saucerImage, speed_x = 0, speed_y = 0){
        this.image = new Image();
        this.image.src = image_src;
        this.x = x;
        this.y = y;
        this.speed_x = speed_x;
        this.speed_y = speed_y;
    }

    // Draw a mobile on the context

    draw(context){
        context.drawImage(this.image, this.x, this.y);
    }

    // Those following method allowed a mobile to move

    move(){
        this.x += this.speed_x;
        this.y += this.speed_y;
    }

    clear(context){
        context.clearRect(this.x, this.y, this.image.width, this.image.height);
    }

    moveAndDraw(context){
        this.clear(context);
        this.move();
        this.draw(context);
    }
}
