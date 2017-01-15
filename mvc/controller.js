class Controller {

    constructor(view, fw) {
        this.view = view;
        this.fw = fw;
        this.evalInput();
    }
    //read string from input field
    getKeyInput() {
        return parseInt(document.autoForm.number.value);
    }

    //connect model, view, evaluate with keyup
    evalInput() {
        document.getElementById("btn").addEventListener("click", () => {
            let info = document.getElementById("info");
            info.innerHTML = "";
            try {
                if (isNaN(this.getKeyInput())) {
                    throw "input is not valid";
                } else {
                    let res = new Model().pascal(this.getKeyInput());
                    this.view.displayPascal(res);
                    this.fw.setContent(res);
                    this.fw.createFile();
                }
            } catch (error) {
                info.innerHTML = error;
            }
        });
    }

}