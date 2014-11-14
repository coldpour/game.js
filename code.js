if(!window.requestAnimationFrame){
    window.requestAnimationFrame = webkitRequestAnimationFrame ||
        mozRequestAnimationFrame || msRequestAnimationFrame ||
        function(callback){window.setInterval(callback, 1000/60)};
}

var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');

var x = 10;
var y = 10;
var dx = 20; //px/sec
var dy = 0;

var clear = function(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
var drawFPS = function(fps){
    ctx.save();
    ctx.scale(2, 2);
    ctx.fillStyle = 'red';
    ctx.fillText('FPS: ' + fps.toFixed(1), 5, 20);
    ctx.restore();
};

var Game = function(){
    var me = this;
    var running = false;
    me.update = function(delta){
        // update state of the game
        // including players, npcs, scenery, animations, etc.
        var seconds = delta/1000;
        x += dx * seconds;
        y += dy * seconds;
    };

    me.draw = function(delta){
        // draw the game
        // draw players, npcs, scenery, animations, etc.
        clear();
        ctx.fillStyle = 'lime';
        ctx.fillRect(x, y, 100, 100);
    };

    me.start = function(){
        running = true;
        var lastTime =  Date.now();
        (function mainloop(){
            if(!running) return;

            window.requestAnimationFrame(mainloop);

            // Get the time to calculate time-elapsed
            var now = Date.now();

            var elapsed = Math.floor(now - lastTime);

            me.update(elapsed);
            me.draw(elapsed);

            lastTime = now;
        })();
    };

    me.stop = function(){
        running = false;
    };

    return me;
};

var game = new Game();
game.start();
