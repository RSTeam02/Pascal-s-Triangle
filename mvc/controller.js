class Controller {

    constructor() {
        this.view = new View();
        this.evalInput();
    }

    //read string from input field
    getKeyInput() {
        return parseInt(document.autoForm.number.value);
    }

    //send to worker for generating
    sendToWorker(worker, output, callback) {

        this.view.info("");
        try {
            if (isNaN(this.getKeyInput())) {
                throw "input is not valid";
            } else {
                worker.postMessage(this.getKeyInput());
                worker.onmessage = (e) => {
                    callback(e.data);
                }
            }
        } catch (error) {
            this.view.info(error);
        }
    }

    //connect model, view, evaluate with click
    evalInput() {
        document.getElementById("btn").addEventListener("click", () => {

            let fw = new Filewriter();
            let output = "";
            let worker = new Worker("worker/pascalWorker.js");
            this.sendToWorker(worker, output, (res) => {
                this.view.displayPascal(res[0]);
                this.view.info(`Elapsed Time: ${res[1]}`);
                fw.setContent(res[0]);
                fw.createFile();
            });
        });
    }
}