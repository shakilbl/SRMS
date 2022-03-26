/* js/fileAppDirectives */

function dropzone() {

    return function(scope, element, attrs) {

        var config = {
            url: 'http://localhost:8080/TTS_Spring/upload',
            maxFilesize: 100000,
            paramName: "uploadfile",
            maxThumbnailFilesize: 10,
            parallelUploads: 10,
            autoProcessQueue: false
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
        }
    }
}

angular.module('fileApp').directive('dropzone', dropzone);