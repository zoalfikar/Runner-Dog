/**@type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);

class Explosion {
    constructor(x,y){
        this.spriteWidth = 100;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x - this.width /2 ;
        this.y = y - this.height /4;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0 ;
        this.timer = 0;

    }
    update(){
        this.timer++
        if (this.timer % 10 ===0) {
            if (this.frame < 5) {
                this.frame++
            } else{
                this.frame = 0;
            }
           
        } 
    }
    draw(){
        ctx.drawImage(this.image,this.spriteWidth * this.frame,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
    }
}
window.addEventListener('click',function (e) {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y  - canvasPosition.top;
    explosions.push(new Explosion(positionX,positionY));
})

function animate() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        
    }
    requestAnimationFrame(animate);
}
animate()