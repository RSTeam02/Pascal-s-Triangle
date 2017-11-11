
//class for download as plain text

export class Filewriter {

    setContent(input) {
        this.blob = new Blob([input], { type: 'text/plain' });
    }

    createFile() {
        let fileName = "result.txt";
        let link = "";
        link = document.getElementById("download");
        link.download = fileName;
        link.innerHTML = "Download as result.txt";
        link.href = window.URL.createObjectURL(this.blob);
        document.getElementById("ahref").appendChild(link);
    }
}