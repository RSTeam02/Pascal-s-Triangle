import { Filewriter } from "./filewriter.js";
import { View } from "./view.js";
import { Result } from "./result.js";

export class Controller {

    constructor() {
        this.view = new View();
        this.setting();
        this.evalInput();
    }

    //send to worker for generating
    sendToWorker(worker, callback) {
        let pascal = this.setting();
        let select = document.getElementById("select");
        worker.postMessage(pascal);
        worker.onmessage = (e) => {
            callback(e.data);
        }
      
    }

    setting() {

        let psMode = {
            mode: "",
            value: 0,
            inputStr:"",
            sss : $('#sl').prop('checked')
        }
        
        let rSlider = document.getElementById("slider");
        psMode.mode = $("input:radio[class='rbSet']:checked").attr("id");
        if (psMode.mode === "pascal") {
            psMode.value = $("#slider").val();
            rSlider.max = 50;
            rSlider.min = 2;
        }else if(psMode.mode === "ACGT") {        
            psMode.value = Math.pow(2, $("#slider").val());
            rSlider.min = 2
            rSlider.max = 7;
        }else if(psMode.mode === "sierpinski"){
            psMode.value = Math.pow(2, $("#slider").val());
            rSlider.min = 2;
            rSlider.max = 12;
        }else{
            psMode.value = $("#cmdInp").val().length;
            psMode.inputStr = $("#cmdInp").val();
            rSlider.min = 50;
            rSlider.max = 2;
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
                //console.log($(rbSet[i].attr("id")))
            });
        }
        $("#slider").on("input", () => {
            $("#inputInfo").html(`${$("input:radio[name='format']:checked").val()}: ${$("#slider").val()}`);
        });
        $("#slider, #test").on("click keyup", () => {
            $("#inputInfo").html("");
            let fw = new Filewriter();
            let view = new View();
            let worker = new Worker("worker/pascalWorker.js");           
            let output=""
            this.sendToWorker(worker, (res) => {
                var seq = new Promise(function (result, err) {
                    result(res);
                    err();
                }).then(() => {
                    $("#inputInfo").html(`Elapsed Time: ${res.elapsed.hms}`);
                }).then(() => {                 
                    output = new Result(res.pascalArr).resOutput();
                    view.viewOutput(output);
                    fw.setContent(output);
                    fw.createFile(); 
                }, (err) => { $("#inputInfo").html("Input error") });
            });
        });

        /*$("#palindrom, #test").on("click", () => {
            

            let checked = $(`input:radio[id='palindrom']:checked`).attr("id");
            console.log($("#cmdInp").val());
           
        });*/
    }
}