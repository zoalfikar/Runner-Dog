import {StandingLeft,StandingRight  } from "./state.js";

export default  class Player { 
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states =[new StandingLeft(this),new StandingRight(this)];
        this.currentState = this.states[0];
        this.image = document.getElementById('img');
        this.width =200;
        this.height =181.83;
        this.x = this.gameWidth/2 - this.width/2;
        this.y = this.gameHeight - this.height;
        this.frameX = 0;
        this.frameY = 0;
    }
    draw(context){
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height , this.x , this.y,this.width,this.height);
    }
    update(input){
        this.currentState.handleInput(input);
    }
    setState(state){
        this.currentState=this.states[state];
        this.currentState.enter();
    }
}