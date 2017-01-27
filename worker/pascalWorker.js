/**
 * 
 * @author rsTeam02
 * Pascal Triangle Impl. as WebWorker
 * 
 */

importScripts("../bench/measureTime.js");

//worker takes/post message, callbacks => input => arr => post

self.onmessage = function (input) {
    startBench();
    pascal(input.data, function (cb) {
        self.postMessage([cb, stopBench()]);
    });
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

function pascal(input, callback) {
    let result = "";
    let maxVal = 0;
    let res = [];
    
    // left, right edges are 1, else calc sums between neighbours
    for (let i = 0; i < input[1]; i++) {
        res[i] = [];
        for (let j = 0; j <= i; j++) {
            (j === 0 || j === i)
                ? res[i][j] = 1
                : res[i][j] = res[i - 1][j - 1] + res[i - 1][j];
        }
        if (input[1] - 1 === i) {
            maxVal = res[i][Math.floor(i / 2)];
        }
    }    
    (!input[0])
        ? callback(sierpinskiOutput(res, input[1], maxVal))
        : callback(pascalOutput(res, input[1], maxVal));
}

function sierpinskiOutput(res, input, maxVal) {
    let allRowStr = "";

    for (let i = 0; i < res.length; i++) {
        for (let k = input - i - 1; k > 0; k--) {
            allRowStr += "\u0020";
        }
        for (let j = 0; j < res[i].length; j++) {
            (res[i][j] % 2 === 0)
                ? allRowStr += "\u0020\u0020"
                : allRowStr += "\u2206\u0020";
        }
        allRowStr += "\r\n";
    }
    return allRowStr;
}

function pascalOutput(res, input, maxVal) {
    let allRowStr = "";
    let maxValLen = maxVal.toString().length;

    //output with autospacing
    for (let i = 0; i < res.length; i++) {
        for (let k = input - i - 1; k > 0; k--) {
            allRowStr += `${this.autoSpace(maxVal, 2)}`;
        }
        for (let j = 0; j < res[i].length; j++) {
            (j === 0)
                ? allRowStr += res[i][j]
                : allRowStr += (`${this.autoSpace(maxVal)}${res[i][j]}`).slice(-maxValLen - (2 - maxValLen % 2));
        }
        allRowStr += "\r\n";
    }
    return allRowStr;
}