App
		.controller(
				'TicketCreationController',
				[
						'$scope',
						'$http',
						'OneService',
						'$timeout',
						'NgTableParams',
						'$location',
						// '$element',

						function($scope, $http, OneService, $timeout,
								NgTableParams, $location) {

							
							$scope.showLoading= null;

							$scope.showLoadingBox = function() {
								$scope.showLoading= true;
							};
							
							$scope.hideLoadingBox = function() {
								$scope.showLoading= false;
							};
							
							// For messages in page
							$scope.successMessages = null;
							$scope.errorMessages = null;

							$scope.ctn = null;

							/* Show Success Message */
							$scope.showSuccessMessage = function(message) {
								OneService.successMessages = message;
								$scope.successMessages = message;
								$timeout(function() {
									$scope.successMessages = null;
									$scope.errorMessages = null;
								}, 30000);
							};

							/* Show Error Message */
							$scope.showErrorMessage = function(message) {
								OneService.errorMessages = message;
								$scope.errorMessages = message;
								$timeout(function() {
									$scope.successMessages = null;
									$scope.errorMessages = null;
								}, 5000);
							};


							$scope.showLoadingBox();
							
							$scope.success = {
								flag : false,
								message : "Nothing!"
							};

							$scope
									.showSuccessMessage(OneService.successMessages);


							$scope.showCreate = true;
							$scope.showSearch = false;
							$scope.search = function() {
								$scope.showSearch = true;
								$scope.showCreate = false;
							}

							$scope.createTicket = function() {
								$scope.showSearch = false;
								$scope.showCreate = true;
							}

							$scope.doSearch = function() {
								// console.log($scope.searchText);

								$scope.checkDDValue();
							}



							// For File attachment

							$scope.uploadFile = function() {
								console
										.log("Inside uploadFile()%%%%%%%%%%%%%%%%%%%%%5");
								$scope.processDropzone();
							};

							$scope.reset = function() {
								$scope.resetDropzone();
							};

						} ]);
