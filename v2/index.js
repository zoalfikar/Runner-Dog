import Player from "./player.js";
import InputHandler from "./input.js";
import {drawStatusText} from "./utils.js";
window.addEventListener('load',function () {
    const loading = document.getElementById('loading');
    loading.style.display = 'none';
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const player = new Player(canvas.width,canvas.height);
    const input = new InputHandler();
    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        drawStatusText(ctx,input,player)
        player.update(input.lastKey)
        player.draw(ctx)

        requestAnimationFrame(animate)
    }
    animate();

})