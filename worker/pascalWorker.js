/**
 * 
 * @author rsTeam02
 * Pascal Triangle Impl. as WebWorker
 * nested callback => bad practice
 */

importScripts("../bench/measureTime.js");

//worker takes/post message, callbacks => input => arr => post
startBench();
self.onmessage = function (input) {
    pascal(input.data, function (callArr) {
        strOut(callArr, function (callStr) {
            self.postMessage([callStr, stopBench()]);
        });
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
    callback([res, maxVal, input]);
}


function strOut(resArr, callback) {
    let allRowStr = "";
    let res = resArr[0];
    let maxVal = resArr[1]
    let maxValLen = resArr[1].toString().length;
    let input = resArr[2]
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
    callback(allRowStr);
}