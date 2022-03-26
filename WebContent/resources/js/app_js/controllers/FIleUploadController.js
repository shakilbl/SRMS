App.controller('FileUploadController', ['$scope', function($scope) {
	$scope.partialDownloadLink = 'http://localhost:8098/download?filename=';
    $scope.filename = '';
    
    $scope.raihan = "Raihan Taher";

    $scope.uploadFile = function() {
        $scope.processDropzone();
    };

    $scope.reset = function() {
        $scope.resetDropzone();
    };
    
}]);






