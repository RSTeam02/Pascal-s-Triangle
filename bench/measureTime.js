/**
 * minimalistic Stopwatch
 */

var start = 0;

function startBench() {
    start = new Date().getTime();
}

function stopBench() {
    var ms = new Date().getTime() - start;
    var millis = ms % 1000;
    var sec = Math.floor(ms / 1000) % 60;
    var min = Math.floor(ms / 60000) % 60
    var hour = Math.floor(ms / 3600000) % 24
    return `${("0" + hour).slice(-2)}:${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}:${("00" + millis).slice(-3)}`;
}

