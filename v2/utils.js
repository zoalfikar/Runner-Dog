export  function drawStatusText(context,input,player) {
    context.font = '30px Helvetica';
    context.fillText('Last input: ' + input.lastKey,20,50 )
    context.fillText('Last input: ' + player.currentState.State,20,90 )
}