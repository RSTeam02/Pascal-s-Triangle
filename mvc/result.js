export class Result{

    constructor(pascal) {
        this.pascal = pascal;
    }

    autoSpace(max, div = 1) {       
        let subSpace = new Array(Math.floor(max / div)+1);
        subSpace=subSpace.fill("\u0020",0);        
        return subSpace.join("");
    }

    outputFactory(i,j){    
        let maxValLen = this.pascal.maxVal.toString().length;    
        if(this.pascal.input.mode){
            let aSp2 = `${this.autoSpace(maxValLen, 2)}`;
            let aSp1 = `${this.autoSpace(maxValLen)}`;    
            if(j === 0){
                return  {ls: aSp2, rs:this.pascal.arr2d[i][j]};
            }else{
                return {ls: aSp2, rs:(`${aSp1}${this.pascal.arr2d[i][j]}`).slice(-maxValLen - (2 - maxValLen % 2))};
            }
        }else{        
            if(j&(i-j)){
                return {ls:"\u0020" ,rs:"\u0020\u0020"};
            }else{    
                return {ls:"\u0020",rs:"\u2206\u0020"};
            } 
        }
    }

    resOutput() {
        let allRowStr = "";
        let maxValLen = this.pascal.maxVal.toString().length;
        let subsubSpace = []
        
        for (let i = 0; i < this.pascal.arr2d.length; i++) {         
            subsubSpace = new Array(this.pascal.input.value - i - 1);        
            for (let j = 0; j < this.pascal.arr2d[i].length; j++) {
                let otf = this.outputFactory(i, j);                
                if(j===0){                    
                    allRowStr += subsubSpace.fill(otf.ls, 0).join("");
                }
                allRowStr += otf.rs;                
            }
            allRowStr += "\r\n";
        }
        return allRowStr;
    }  
}