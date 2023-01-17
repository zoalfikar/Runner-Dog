const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
let staggerFrames = 5;
let playerState = 'roll';
const spriteAnimations = [];
const animationStates = [{
        name: 'idle',
        frame: 7
    },
    {
        name: 'jump',
        frame: 7
    },
    {
        name: 'fall',
        frame: 7
    },
    {
        name: 'run',
        frame: 9
    },
    {
        name: 'dizzy',
        frame: 11
    },
    {
        name: 'sit',
        frame: 5
    },
    {
        name: 'roll',
        frame: 7
    },
    {
        name: 'bite',
        frame: 7
    },
    {
        name: 'ko',
        frame: 12
    },
    {
        name: 'getHit',
        frame: 4
    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frame; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
})

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();