/**
 * 
 * @author rsTeam02
 * Pascal Triangle Impl. as WebWorker
 * 
 */

importScripts("../bench/measureTime.js");
importScripts("../n_o_k/n_o_k.js");

//worker takes/post message, callbacks => input => arr => post

self.onmessage = function (input) {
    startBench();
    pascal(input.data, function (cb) {
        result = {
            pascalArr: cb,
            elapsed: stopBench()
        }
        self.postMessage(result);
    });
    self.close();
}

//Binomial Coefficient
function pascal(input, callback){
    let maxVal = 0;
    let arr2d = [];
    let iv=input.value;
    for (let i = 0;  i<iv; i++){
        arr2d[i]=[]
        for (let j = 0;  j<i+1; j++){
            arr2d[i][j]=parseInt(n_over_k(i,j));
            if(i == iv -1){
                maxVal = n_over_k(i,parseInt(j/2));                
            }
        }        
    }    
    callback({arr2d, maxVal, input});    
}


function n_over_k(n,k){
    return fact(n)/(fact(k)*fact(n-k));
}

function fact(n){
    let res =1;
    for (let i =1; i <= n; i++){
        res*=i;
    }
    return res;
}