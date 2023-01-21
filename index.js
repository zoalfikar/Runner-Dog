     /**@type {HTMLCanvasElement} */
window.addEventListener('load',function() {
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 720;

class InputHandler {
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', (e) => {
            if (
                (
                    e.key == 'ArrowDown'||
                    e.key == 'ArrowUp' ||
                    e.key=='ArrowLeft'||
                    e.key=='ArrowRight'
                ) 
                && this.keys.indexOf(e.key)=== -1) 
            {
                this.keys.push(e.key);
            }
        })
        window.addEventListener('keyup', (e) => {
            if 
                (
                    e.key == 'ArrowDown'||
                    e.key == 'ArrowUp' ||
                    e.key=='ArrowLeft'||
                    e.key=='ArrowRight'
                ) 
            {
                this.keys.splice(this.keys.indexOf(e.key),1);
            }
        })
    }

}
class Player{
    constructor(gameWidth , gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width =200 ;
        this.height = 200 ;
        this.x = 0 ;
        this.y = this.gameHeight - this.height;
        this.image = document.getElementById('playerImage')
        this.speed = 0;
    }
    draw(context){
        context.fillStyle = 'white';
        context.fillRect(this.x,this.y,this.width,this.height);
        // context.drawImage(this.image ,0 ,0 , this.width ,this.height ,this.x ,this.y , this.width ,this.height);
        context.drawImage(this.image ,this.x ,this.y ,this.width,this.height);
    }
    update(input){
        this.x += this.speed;
        if (input.keys.indexOf('ArrowRight')>-1) {
            this.speed = 5;
        }
        else{
            this.speed = 0;

        }
    }
    
}

class Background {

}
class Enemy {

}
 
function handleEnemies() {

    
}
function displayStatusText() {
    
}

const input = new InputHandler();
const player = new Player(CANVAS_WIDTH,CANVAS_HEIGHT);
function animate() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    player.draw(ctx)
    player.update(input)
    requestAnimationFrame(animate)
}
animate()
})
