import { Filewriter } from "./filewriter.js";

export class Controller {

    constructor() {
        this.setting();
        this.evalInput();
    }

    //send to worker for generating
    sendToWorker(worker, callback) {
        let pascal = this.setting();
        try {
            if (isNaN(pascal.value) || (pascal.value <= 0)) {
                throw "input is not valid";
            } else {
                let select = document.getElementById("select");
                worker.postMessage(pascal);
                worker.onmessage = (e) => {
                    callback(e.data);
                }
            }
        } catch (error) {
            $("#inputInfo").html(error);
        }
    }

    setting() {
        let psMode = {
            mode: false,
            value: 0
        }
        let rSlider = document.getElementById("slider");
        psMode.mode = $("#pascal").is(':checked');
        if (psMode.mode) {
            psMode.value = $("#slider").val();
            rSlider.max = 50;
            rSlider.min = 2;
        } else {
            psMode.value = Math.pow(2, $("#slider").val());
            rSlider.min = 2;
            rSlider.max = 12;
        }
        return psMode;
    }

    //connect evaluate with click, start worker callback => view
    evalInput() {

        let rbSet = document.getElementsByClassName("rbSet");
        for (let i = 0; i < rbSet.length; i++) {
            rbSet[i].addEventListener("click", () => {
                this.setting();
                $("#slider").val(0);
                $("#result").html("");
                $('#inputInfo').html("Range-Slider");
            });
        }
        $("#slider").on("input", () => {
            $("#inputInfo").html(`${$("input:radio[name='format']:checked").val()}: ${$("#slider").val()}`);
        });
        $("#slider").on("click keyup", () => {
            $("#inputInfo").html("");
            let fw = new Filewriter();
            let worker = new Worker("worker/pascalWorker.js");
            this.sendToWorker(worker, (res) => {
                var seq = new Promise(function (result, err) {
                    result(res);
                    err();
                }).then(() => {
                    $("#inputInfo").html(`Elapsed Time: ${res.elapsed.hms}`);
                }).then(() => {
                    setTimeout(function () {
                        $("#result").html(res.triangle);
                    }, res.elapsed.ms);
                }).then(() => {
                    fw.setContent(res.triangle);
                    fw.createFile();
                }, (err) => { $("#inputInfo").html("Input error") });
            });
        });
    }
}