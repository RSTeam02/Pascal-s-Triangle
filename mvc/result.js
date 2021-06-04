export class Result{

    constructor(pascal) {
        this.pascal = pascal;
    }

    autoSpace(max, div = 1) {       
        let subSpace = new Array(Math.floor(max / div)+1);
        subSpace=subSpace.fill("\u0020",0);        
        return subSpace.join("");
    }

    sierpinskiOutput() {
        let allRowStr = "";
        let maxValLen = this.pascal.maxVal.toString().length;
        let subsubSpace = []
        for (let i = 0; i < this.pascal.arr2d.length; i++) {         
            subsubSpace = new Array(this.pascal.input.value - i - 1);
            subsubSpace = subsubSpace.fill("\u0020",0);
            allRowStr += subsubSpace.join("");
            for (let j = 0; j < this.pascal.arr2d[i].length; j++) {
                (j&(i-j))
                    ? allRowStr += "\u0020\u0020"
                    : allRowStr += "\u2206\u0020";
            }
            allRowStr += "\r\n";
        }
        return allRowStr;
    }

    pascalOutput() {
        let allRowStr = "";      
        let subsubSpace = []  
        let maxValLen = this.pascal.maxVal.toString().length;      
        for (let i = 0; i < this.pascal.arr2d.length; i++) {       
            subsubSpace = new Array(this.pascal.input.value - i - 1);
            subsubSpace = subsubSpace.fill(`${this.autoSpace(maxValLen, 2)}`,0);
            allRowStr += subsubSpace.join("");
            for (let j = 0; j < this.pascal.arr2d[i].length; j++) {                
                (j === 0)
                    ? allRowStr += this.pascal.arr2d[i][j]
                    : allRowStr += (`${this.autoSpace(maxValLen)}${this.pascal.arr2d[i][j]}`).slice(-maxValLen - (2 - maxValLen % 2));
            }
            allRowStr += "\r\n";            
        }
        return allRowStr;
    }   
}