console.log('Hello !')

$("document").ready(function() {

    var videoInput = document.getElementById('inputVideo')
    var ctracker = new clm.tracker()
    ctracker.init()
    ctracker.start(videoInput)

    var canvasInput = document.getElementById('drawCanvas');
    var cc = canvasInput.getContext('2d');
    function drawLoop() {
        requestAnimationFrame(drawLoop);
        cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
        ctracker.draw(canvasInput);
    }
    drawLoop();
})
