App.directive('dropzone', dropzone);

function dropzone() {

    return function(scope, element, attrs) {

        var config = {
        	url: 'http://10.10.21.20:8080/SRMS_DS/upload',
//          url: 'http://10.10.22.20:8280/SRMS_DS/upload',
//        	url: 'http://localhost:8080/SRMS_DS/upload',
            maxFilesize: 10,
            paramName: "uploadfile",
            maxThumbnailFilesize: 10,
            parallelUploads: 10,
            autoProcessQueue: false,
            acceptedFiles: ".pdf,.doc,.docx,.msg,.xls,.xlsx,.jpg,.png,.gif,.txt,.csv"
        };

        var eventHandlers = {
            'addedfile': function(file) {
                scope.file = file;
                
                if (this.files[10]!=null) {
                    this.removeFile(this.files[9]);
                }
                
                scope.$apply(function() {
                    scope.fileAdded = true;
                });
            },

            'success': function (file, response) {
            }
        };

        dropzone = new Dropzone(element[0], config);

        angular.forEach(eventHandlers, function(handler, event) {
            dropzone.on(event, handler);
        });

        scope.processDropzone = function() {
        	console.log("File Count: ", dropzone.files.length);
            dropzone.processQueue();
        };

        scope.resetDropzone = function() {
            dropzone.removeAllFiles();
            dropzone.on("complete", function(file) {
            	dropzone.removeFile(file);
            	});
        };
    }
}
