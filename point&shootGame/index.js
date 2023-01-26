     /**@type {HTMLCanvasElement} */
     window.addEventListener('load',function() {
        const canvas = document.getElementById("canvas1");
        const ctx = canvas.getContext('2d');        
        const CANVAS_WIDTH = canvas.width = window.innerWidth;
        const CANVAS_HEIGHT = canvas.height = window.innerHeight;

        const colliosionCanavas = document.getElementById("collisionCanavas");
        const colliosionCtx = colliosionCanavas.getContext('2d');        
        const colliosionCanavas_WIDTH = colliosionCanavas.width = window.innerWidth;
        const colliosionCanavas_HEIGHT = colliosionCanavas.height = window.innerHeight;



        let timeToNextRaven =0 ;
        let ravenInterval =500 ;
        let lastTime =0 ;
        let ravens = [];

        let score = 0 ;
        let gameover = false;
        ctx.font = '50px Impact'
        class Raven {

            constructor(){
                this.spriteWidth = 271;
                this.spriteHeight = 194;
                this.sizeModifier = Math.random()* 0.6 + 0.4;
                this.width =this.spriteWidth * this.sizeModifier ;
                this.height =this.spriteHeight * this.sizeModifier ;
                this.x = canvas.width;
                this.y = Math.random() *(CANVAS_HEIGHT - this.height);
                this.directionX = Math.random() * 5 +3;
                this.directionY =  Math.random() * 5 - 2.5;
                this.markedForDeletion = false;
                this.image = new Image();
                this.image.src = 'enemy_raven.png';
                this.frame = 0;
                this.maxFrame = 4;
                this.timeSinceFlap = 0 ;
                this.flapInterval = Math.random() * 50 + 50;
                this.randomColors = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)]
                this.color = 'rgb('+this.randomColors[0]+','+this.randomColors[1]+','+this.randomColors[2]+')'
                this.hasTrail = Math.random() > 0.5;
            }
            update(deltatime){
                if (this.y > CANVAS_HEIGHT - this.height || this.y < 0 ) {
                    this.directionY = this.directionY * -1
                }
                this.x -= this.directionX;
                this.y -= this.directionY;
                if (this.x < 0 - this.width) this.markedForDeletion =true;
                this.timeSinceFlap += deltatime;
                if(this.timeSinceFlap>this.flapInterval){
                    if (this.frame > this.maxFrame) this.frame = 0;
                    else this.frame++
                    this.timeSinceFlap = 0;
                    if (this.hasTrail) {
                        for (let i = 0; i < 5 ; i++) {
                            particles.push(new Particle(this.x,this.y,this.width,this.color))
                        }
                        
                    }

                }
                if (this.x < 0 - this.width) {
                    gameover = true;
                }

                    
            }
            draw(){
                colliosionCtx.fillStyle = this.color;
                colliosionCtx.fillRect(this.x,this.y,this.width,this.height)
                ctx.drawImage(this.image,this.frame * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
            }
        }
        let explosion = [];
        let particles = [];
        class Particle {
            constructor(x ,y ,size ,color){
                this.size=size; 
                this.x =x + this.size/2 + Math.random() * 50 - 25;
                this.y = y + this.size/3 + Math.random() * 50 - 25;
                this.raduis = Math.random() * size / 10 ;
                this.maxRadius = Math.random() * 20 + 35;
                this.markedForDeletion =false ;
                this.speedX=Math.random()*1 + 0.5;
                this.color = color;
            }
            update(){
                this.x += this.speedX;
                this.raduis += 0.3;
                if(this.raduis > this.maxRadius - 5) this.markedForDeletion =true;
            }
            draw(){
                ctx.save();
                ctx.globalAlpha = 1 -this.raduis / this.maxRadius;
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x,this.y,this.raduis,0,Math.PI *2);
                ctx.fill();
                ctx.restore();
            }
        }
        class Explosion {
            constructor(x,y,size){
                this.spriteWidth = 100;
                this.spriteHeight = 179;
                this.size = size;
                this.x = x  ;
                this.y = y ;
                this.image = new Image();
                this.image.src = 'boom.png';
                this.sound = new Audio();
                this.sound.src = 'boom.wav'
                this.frame = 0 ;
                this.timerSinceLastFrame = 0;
                this.frameInterval =200 ;
                this.markedForDeletion = false;
            }
            update(deltatime){
                if(this.frame === 0) this.sound.play()
                this.timerSinceLastFrame += deltatime;
                if (this.timerSinceLastFrame > this.frameInterval) {
                    this.frame++;
                    this.timerSinceLastFrame = 0;
                    if(this.frame > 5 ) this.markedForDeletion = true
                }
            }
            draw(){
                ctx.drawImage(this.image,this.frame * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y-this.size/4,this.size,this.size)
            }
        }    
        function drawScore()
        {
            ctx.fillStyle = 'black';
            ctx.fillText('Score: '+ score , 50,75)
            ctx.fillStyle = 'white';
            ctx.fillText('Score: '+ score , 55,80)
        }
        function drawGameOver()
        {
            ctx.textAlign = 'center'
            ctx.fillStyle = 'black';
            ctx.fillText('GAME OVER, your score is '+ score , CANVAS_WIDTH /2,CANVAS_HEIGHT/2)
            ctx.fillStyle = 'white';
            ctx.fillText('GAME OVER, your score is '+ score , CANVAS_WIDTH/2 +5,CANVAS_HEIGHT/2 +5)
        }
        this.window.addEventListener('click',function (e) {
            const detectPixelColor = colliosionCtx.getImageData(e.x,e.y,1,1)
            console.log(detectPixelColor);
            const pc = detectPixelColor.data;
            ravens.forEach(o=>{
                if (o.randomColors[0]===pc[0]&&o.randomColors[1]===pc[1]&&o.randomColors[2]===pc[2]) {
                    o.markedForDeletion = true
                    score++
                    explosion.push(new Explosion(o.x,o.y,o.width))
                }
            })
            
        })
        function animate(timestamp) {
            ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
            colliosionCtx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
            drawScore()
            let deltatime = timestamp - lastTime;
            lastTime = timestamp;
            timeToNextRaven += deltatime;
            if (timeToNextRaven > ravenInterval) {
                ravens.push(new Raven());
                timeToNextRaven = 0;
                ravens.sort(function (a,b) {
                   return a.width - b.width ;
                });
            }
            [...particles,...ravens , ...explosion].forEach(o=>o.update(deltatime));
            [...particles,...ravens, ...explosion].forEach(o=>o.draw());
            ravens = ravens.filter(o=>!o.markedForDeletion);
            explosion = explosion.filter(o=>!o.markedForDeletion);
            particles = particles.filter(o=>!o.markedForDeletion);
            if(!gameover) requestAnimationFrame(animate);
            else drawGameOver()
        }
        animate(0)










    })
        