class Layer {
    constructor(game,width,height,speedModifier,image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update(){
        if(this.x < -this.width) this.x =0;
        else this.x -= this.game.speed * speedModifier
    }
    draw(){
        context.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}