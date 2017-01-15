define(['../mvc/model','../mvc/controller','../mvc/view','../mvc/filewriter'], function() {
    new Controller(new View(), new Filewriter());
});