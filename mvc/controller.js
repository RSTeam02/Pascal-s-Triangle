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

    //connect evaluate with click, start worker callback => view
    evalInput() {
        document.getElementById("btn").addEventListener("click", () => {
            this.view.info("");
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