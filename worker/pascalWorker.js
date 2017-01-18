/**
 * 
 * @author rsTeam02
 * Pascal Triangle Impl. as WebWorker
 * 
 */

importScripts("../bench/measureTime.js");

//worker takes/post message
self.onmessage = function (input) {
    startBench();
    let result = pascal(input.data);
    self.postMessage([result, stopBench()]);
    self.close();
}


// auto space trimmer for numbers with n - digits
function autoSpace(max, div = 1) {
    let subSpace = "";
    for (let i = 0; i <= Math.floor(max.toString().length / div); i++) {
        subSpace += "\u0020";
    }
    return subSpace;
}

function pascal(input) {
    let result = "";
    let maxVal = 0;
    let res = [];
    let allRowStr = "";
    // left, right edges are 1, else calc sums between neighbours
    for (let i = 0; i < input; i++) {
        res[i] = [];
        for (let j = 0; j <= i; j++) {
            (j === 0 || j === i)
                ? res[i][j] = 1
                : res[i][j] = res[i - 1][j - 1] + res[i - 1][j];
            if (input - 1 === i) {
                maxVal = res[i][Math.floor(i / 2)];
            }
        }
    }
    //output with autospacing
    for (let i = 0; i < res.length; i++) {
        let maxValLen = maxVal.toString().length;
        for (let k = input - i - 1; k > 0; k--) {
            allRowStr += `${this.autoSpace(maxVal, 2)}`;
        }
        for (let j = 0; j < res[i].length; j++) {
            allRowStr += (`${this.autoSpace(maxVal)}${res[i][j]}`).slice(-maxValLen - (2 - maxValLen % 2));
        }
        allRowStr += "\r\n";
    }
    return allRowStr;
}