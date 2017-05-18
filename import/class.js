require.config({
    paths: {
        "jquery": "https://code.jquery.com/jquery-1.11.1.min"
    }
})

define(['jquery','../mvc/controller','../mvc/filewriter'], function() {
    new Controller();
});