
//class for download as plain text

class Filewriter {

    setContent(input) {
        this.blob = new Blob([input], { type: 'text/plain' });
    }

    createFile() {
        let fileName = "resultPascal.txt";
        let link = "";
        link = document.getElementById("download");
        link.download = fileName;
        link.innerHTML = "Download Pascal's Triangle";
        link.href = window.URL.createObjectURL(this.blob);
        document.getElementById("ahref").appendChild(link);
    }
}