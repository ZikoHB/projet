const UP = Symbol("up");
const DOWN = Symbol ("down");
const IMMOBILE = Symbol("immobile");

// This class give the current state of the ship, if moving up, down or not moving

export default class MoveState{
    static get UP(){ return UP; }
    static get DOWN(){ return DOWN; }
    static get IMMOBILE(){ return IMMOBILE; }
}
