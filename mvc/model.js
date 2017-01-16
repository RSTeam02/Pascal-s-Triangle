/**
 * 
 * @author rsTeam02
 * Pascal Triangle Impl. 
 * 
 * => Unused
 * 
 */
class Model {

    // auto space trimmer for numbers with n - digits
    autoSpace(max) {
        let subSpace = "";
        for (let i = 0; i <= max.toString().length; i++) {
            subSpace += "\u2000";
        }
        return subSpace;
    }

    pascal(input) {
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
            for (let j = 0; j < res[i].length; j++) {
                allRowStr += (`${this.autoSpace(maxVal)}${res[i][j]}`).slice(-maxVal.toString().length - 1);
            }
        }
        return allRowStr;
    }
}