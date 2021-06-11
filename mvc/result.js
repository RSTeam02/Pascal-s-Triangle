export class Result{

    constructor(pascal) {
        this.acgt=[];
        this.pascal = pascal;
    }

    autoSpace(max, div = 1) {       
        let subSpace = new Array(Math.floor(max / div)+1);
        subSpace=subSpace.fill("\u0020",0);        
        return subSpace.join("");
    }

    rndACGT(){
        let rndACGT = ["A","C","G","T"];        
        for(let i = (rndACGT.length-1); i>=0;i--){
            let j = Math.floor(Math.random()*rndACGT.length);       
            let helper = rndACGT[j];
            [rndACGT[j],rndACGT[i]] = [rndACGT[i],helper];          
        }        
        return rndACGT;
    }

    testPalindrom(){
        let pal = this.pascal.input.inputStr;       
        pal=pal.replace(/[,\s!?."';:-]*/gi,"").toUpperCase();
        return (pal.split("").reverse().join("") == pal)
            ? pal.split("") : "-";
    }

    outputFactory(i,j,half){            
        let maxValLen = this.pascal.maxVal.toString().length;    
        if(this.pascal.input.mode==="pascal"){
            let aSp2 = `${this.autoSpace(maxValLen, 2)}`;
            let aSp1 = `${this.autoSpace(maxValLen)}`;            
            return {ls: aSp2, rs:(`${aSp1}${this.pascal.arr2d[i][j]}`).slice(-maxValLen - (2 - maxValLen % 2))};            
        }else if(this.pascal.input.mode==="palindrom"){   
            if(this.pascal.input.sss){
                if(i <this.pal.length-1){                    
                    return (j==0 || j==i)
                        ?{ls: "\u0020", rs:(`${this.pal[i]}\u0020`)}                    
                        :{ls: "\u0020", rs:`\u0020\u0020`};                    
                }
            }else{
                if(i<2&&j<2){
                    return {ls: "\u0020", rs:(`${this.pal[this.pascal.arr2d[i][j]-1]}\u0020`)};
                }                                          
            }
            return (j<half)
                ? {ls: "\u0020", rs:(`${this.pal[j]}\u0020`)}                
                : {ls: "\u0020", rs:(`${this.pal[i-j]}\u0020`)};       
        }else{                
            if(j&(i-j)){
                return {ls:"\u0020" ,rs:"\u0020\u0020"};
            }else{
                return (this.pascal.input.mode==="ACGT")           
                    ? {ls:"\u0020",rs:`${this.acgt[this.pascal.arr2d[i][j]%4]}\u0020`}          
                    : {ls:"\u0020",rs:"\u2206\u0020"};                
            } 
        }
    }

    resOutput() {        
        let allRowStr = "";
        let maxValLen = this.pascal.maxVal.toString().length;
        let subsubSpace = []
        this.pal = this.testPalindrom();    
        let len =(this.pascal.input.mode=="palindrom")?this.pal.length:this.pascal.arr2d.length; 
        for (let i = 0; i < len; i++) {         
            subsubSpace = new Array(this.pascal.input.value - i - 1);
            this.acgt = this.rndACGT();               
            for (let j = 0; j <i+1; j++) {
                let half=Math.round((i+1)/2)
                let otf = this.outputFactory(i, j, half);                
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