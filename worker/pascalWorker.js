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
    let allRowStr = "";
    let maxVal = 0;
    let res = [];

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
        allRowStr += "\r\n";
        let shift = 0;
        (maxVal.toString().length % 2 === 0)
            ? shift = 2
            : shift = 1;

        for (let k = input - i - 1; k > 0; k--) {
            allRowStr += `${this.autoSpace(maxVal, 2)}`;
        }

        for (let j = 0; j < res[i].length; j++) {
            (j !== 0)
                ? allRowStr += (`${this.autoSpace(maxVal)}${res[i][j]}`).slice(-maxVal.toString().length - shift)
                : allRowStr += (`${res[i][j]}`);
        }
    }
    return allRowStr;
}
