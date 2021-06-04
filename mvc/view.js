export class View{

    viewMode(pascal){
        (pascal.input.mode)
            ? $("#result").html(this.pascalOutput(pascal))
            : $("#result").html(this.sierpinskiOutput(pascal));
    }

    autoSpace(max, div = 1) {
        let subSpace = "";       
        for (let i = 0; i <= Math.floor(max / div); i++) {
            subSpace += "\u0020";
        }
        return subSpace;
    }

    sierpinskiOutput(pascal) {
        let allRowStr = "";
        let maxValLen = pascal.maxVal.toString().length;
        for (let i = 0; i < pascal.arr2d.length; i++) {         
            for (let k = pascal.input.value - i - 1; k > 0; k--) {
                allRowStr += "\u0020";
            }
            for (let j = 0; j < pascal.arr2d[i].length; j++) {
                (j&(i-j))
                    ? allRowStr += "\u0020\u0020"
                    : allRowStr += "\u2206\u0020";
            }
            allRowStr += "\r\n";
        }
        return allRowStr;
    }

    pascalOutput(pascal) {
        let allRowStr = "";
        let maxValLen = pascal.maxVal.toString().length;      
        for (let i = 0; i < pascal.arr2d.length; i++) {         
            for (let k = pascal.input.value - i - 1; k > 0; k--) {                
                allRowStr += `${this.autoSpace(maxValLen, 2)}`;
            }
            for (let j = 0; j < pascal.arr2d[i].length; j++) {                
                (j === 0)
                    ? allRowStr += pascal.arr2d[i][j]
                    : allRowStr += (`${this.autoSpace(maxValLen)}${pascal.arr2d[i][j]}`).slice(-maxValLen - (2 - maxValLen % 2));
            }
            allRowStr += "\r\n";            
        }
        return allRowStr;
    }
}