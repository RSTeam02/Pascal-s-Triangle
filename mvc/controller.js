class Controller {

    constructor() {
        this.range = document.getElementById("slider");
        this.input = document.getElementById("input");
        this.view = new View();
        this.mode();
        this.evalInput();
    }

    //send to worker for generating
    sendToWorker(worker, callback) {
        let inputArr = this.mode();
        try {
            if (isNaN(inputArr[1]) || (inputArr[1] <= 0)) {
                throw "input is not valid";
            } else {
                let select = document.getElementById("select");
                worker.postMessage(inputArr);
                worker.onmessage = (e) => {
                    callback(e.data);
                }
            }
        } catch (error) {
            this.view.info(error);
        }
    }

    mode() {
        let pascal = true;
        let value = 0;

        this.range.type = this.input.type = "hidden";
        if (document.getElementById("pascal").checked) {
            pascal = true;
            this.view.inputInfo("Enter number of lines");
            document.getElementById("input").type = "text";
            value = this.input.value;
        } else {
            pascal = false;
            this.view.inputInfo(`Order: ${this.range.value}`);
            this.range.type = "range";
            value = Math.pow(2, this.range.value);
        }
        return [pascal, value];
    }

    //connect evaluate with click, start worker callback => view
    evalInput() {

        let rbSet = document.getElementsByClassName("rbSet");

        for (let i = 0; i < rbSet.length; i++) {
            rbSet[i].addEventListener("click", () => {
                this.mode();
            });
        }

        this.range.addEventListener("input", () => {
            this.view.inputInfo(`Order: ${this.range.value}`);
        });

        document.getElementById("btn").addEventListener("click", () => {
            this.view.info("");
            let fw = new Filewriter();
            let worker = new Worker("worker/pascalWorker.js");
            this.sendToWorker(worker, (res) => {
                this.view.displayPascal(res[0]);
                this.view.info(`Elapsed Time: ${res[1]}`);
                fw.setContent(res[0]);
                fw.createFile();
            });
        });
    }
}