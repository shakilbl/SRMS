App
		.controller(
				'SearchController',
				[
						'$scope',
						'$http',
						'SearchService','OneService',
						'$timeout',	'NgTableParams','$location',
					
						
						
						// '$element',
						
						function($scope, $http, SearchService,OneService,$timeout,
								NgTableParams, $location) {
							
							
						/*
						 * self.usergroups=[];
						 * 
						 * self.fetchAllUsergroups = function() { wfService
						 * .fetchAllUsergroups() .then( function(ddd) {
						 * self.usergroups = ddd;
						 * 
						 * console.log("Herre", self.usergoups); },
						 * function(errResponse) { console .error('Error while
						 * fetching Currencies'); }); },
						 */

							$scope.getUrlParameter = function() {
								console.log("Controlleer");
								// var searchObject = $location.search();
								$scope.urlParameters = $location.search();

								$scope.search_criteria = {
									id : "severity"
								};

								console.log($scope.sa);
							}
							$scope.showLoading = null;
							$scope.showSearch = true;

							$scope.showLoadingBox = function() {
								$scope.showLoading = true;
							};

							$scope.hideLoadingBox = function() {
								$scope.showLoading = false;
							};

							// For messages in page
							$scope.successMessages = null;
							$scope.errorMessages = null;

							$scope.ctn = null;

							/* Show Success Message */
							$scope.showSuccessMessage = function(message) {
								SearchService.successMessages = message;
								$scope.successMessages = message;
								$timeout(function() {
									$scope.successMessages = null;
									$scope.errorMessages = null;
								}, 30000);
							};

							/* Show Error Message */
							$scope.showErrorMessage = function(message) {
								SearchService.errorMessages = message;
								$scope.errorMessages = message;
								$timeout(function() {
									$scope.successMessages = null;
									$scope.errorMessages = null;
								}, 5000);
							};

							$scope.tableRowExpanded = false;
							$scope.tableRowIndexCurrExpanded = "";
							$scope.tableRowIndexPrevExpanded = "";
							$scope.storeIdExpanded = "";
							$scope.dayDataCollapse = [ true, true, true, true,
									true, true, true ];
							$scope.transactionShow = 0;
							$scope.sortType = 'name';
							$scope.sortReverse = false;
							$scope.dayDataCollapseFn = function() {
								for (var i = 0; $scope.one.oneToOneGridWrapperList.length - 1; i += 1) {
									$scope.dayDataCollapse.append('true');
								}
							};
							// Find the element by its class attribute, within
							// your controller's scope
							// var myElements = $element.find('row');
							$scope.sortBy = function(propertyName) {
								$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse
										: false;
								$scope.propertyName = propertyName;
							};

							// For Ticket History Grid
							$scope.tableRowExpanded = false;
							$scope.tableRowIndexCurrExpanded = "";
							$scope.tableRowIndexPrevExpanded = "";
							$scope.storeIdExpanded = "";
							$scope.dayDataCollapse = [ true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true, true, true, true, true, true,
									true, true ];
							$scope.transactionShow = 0;
							$scope.sortType = 'name';
							$scope.sortReverse = false;
							$scope.dayDataCollapseFn = function() {
								for (var i = 0; $scope.one.oneToOneGridWrapperList.length - 1; i += 1) {
									$scope.dayDataCollapse.append('true');
								}
							};
							$scope.sort = {
								column : 'b',
								descending : false
							};
							$scope.sortBy = function(propertyName) {
								$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse
										: false;
								$scope.propertyName = propertyName;
							};
							$scope.selectedCls = function(column) {
								return column === scope.sort.column && 'sort-'
										+ scope.sort.descending;
							};
							$scope.changeSorting = function(column) {
								var sort = scope.sort;
								if (sort.column === column) {
									sort.descending = !sort.descending;
								} else {
									sort.column = column;
									sort.descending = false;
								}
							};
							$scope.selectTableRow = function(index, storeId) {
								if ($scope.dayDataCollapse === 'undefined') {
									$scope.dayDataCollapse = $scope
											.dayDataCollapseFn();
								} else {

									if ($scope.tableRowExpanded === false
											&& $scope.tableRowIndexCurrExpanded === ""
											&& $scope.storeIdExpanded === "") {
										$scope.tableRowIndexPrevExpanded = "";
										$scope.tableRowExpanded = true;
										$scope.tableRowIndexCurrExpanded = index;
										$scope.storeIdExpanded = storeId;
										$scope.dayDataCollapse[index] = false;
									} else if ($scope.tableRowExpanded === true) {
										if ($scope.tableRowIndexCurrExpanded === index
												&& $scope.storeIdExpanded === storeId) {
											$scope.tableRowExpanded = false;
											$scope.tableRowIndexCurrExpanded = "";
											$scope.storeIdExpanded = "";
											$scope.dayDataCollapse[index] = true;
										} else {
											$scope.tableRowIndexPrevExpanded = $scope.tableRowIndexCurrExpanded;
											$scope.tableRowIndexCurrExpanded = index;
											$scope.storeIdExpanded = storeId;
											$scope.dayDataCollapse[$scope.tableRowIndexPrevExpanded] = true;
											$scope.dayDataCollapse[$scope.tableRowIndexCurrExpanded] = false;
										}
									}
								}
							};
							// End of added by Reazul Part 1

							
							$scope.loading = true;
							
							$scope.showLoadingBox();
							
							
							SearchService
							   .getUserGroup()
							.then(
									function(dd) {
								
										$scope.allUsergroup = dd;
										$scope.Usergroups = $scope.allUsergroup;
										$scope.usergroup = null; // iscm1
										$scope.abc1 = []
										$scope.l1 = {
											id : null,
											name : null
										};
										for (var i = 0; i < $scope.Usergroups.length; i++) {

											$scope.l1.id = $scope.Usergroups[i].userGroupId;
											$scope.l1.name = $scope.Usergroups[i].name;
													
													
											$scope.abc1[i] = $scope.l1;
											$scope.l1 = {
												id : null,
												name : null
											};
										}
										
										
									},
									function(errResponse) {
										$scope
												.showErrorMessage("Failed to Load Usergroup information.");
										console
												.log('Error while fetching Usergroup information');
									}).finally(function () {
										// $scope.hideLoadingBox();
										
										// $scope.loading = false;
									});
							
							
							

							
							SearchService
									.getCatSub()
									.then(
											function(d) {
												console
														.log("************ Loading successfull.");
												$scope.allCatSub = d;
												$scope.loading = true;
											
												$scope.IssuesSolutionCategoryMaps = $scope.allCatSub;
												$scope.iscm = null;// undefined;
												$scope.abc = []
												$scope.l = {
													id : null,
													name : null
												};
												for (var i = 0; i < $scope.IssuesSolutionCategoryMaps.length; i++) {

													$scope.l.id = $scope.IssuesSolutionCategoryMaps[i].issueSolutionCategoryMapId;
													$scope.l.name = $scope.IssuesSolutionCategoryMaps[i].issuesolutioncategory.name
															+ "-"
															+ $scope.IssuesSolutionCategoryMaps[i].issuesolution.name;
													$scope.abc[i] = $scope.l;
													$scope.l = {
														id : null,
														name : null
													};
												}
												// ******* End ******** //
												$scope.loading = false;
											},
											function(errResponse) {
												$scope
														.showErrorMessage("Failed to Load Problem Category Subcategory Data.");
												console
														.log('Error while fetching Category Subcategory Data');
											}).finally(function () {
												$scope.hideLoadingBox();
												$scope.loading = false;
												
											});
							
						

//							var self = this;
//							self.newThisData = [];

							$scope.success = {
								flag : false,
								message : "Nothing!"
							};
							// console.log($scope.allIssueSolutions);
//							$scope.one = null;
//							$scope.one = SearchService.oneObj;
//							console.log($scope.one);
							$scope
									.showSuccessMessage(SearchService.successMessages);

//							SearchService.setTheNewDataSet();
//							$scope.two = SearchService.twoObj;

// $scope.doSearch = function() {
// $scope.checkDDValue();
// }
//
// $scope.checkDDValue = function() {
//								
// }

								
// if (typeof $scope.iscm == "undefined"){
// $scope.iscm = null ;
// }
							
							/*
							 * if (typeof $scope.iscm1 == "undefined"){
							 * $scope.iscm1= 0 ; }
							 */
						
						
						$scope.doSearch = function()
						{												
							$scope.showLoadingBox();
							$scope.loading = true;
							if($scope.iscm == null)
							{
								$scope.iscm = {
									'id':null
								};
							}
							
							if($scope.severity ==""){
								$scope.severity = null;	
							}
							
							if($scope.usergroup == null)
							{
								$scope.usergroup = {
									'id':null
								};
							}
							
							if(angular.element("#faultEscalationDate").val()!=""){
								$scope.faultEscalationDate = angular.element("#faultEscalationDate").val();
							}else{
								$scope.faultEscalationDate = null;
							}
							if(angular.element("#targetDate").val()!=""){
								$scope.targetDate = angular.element("#targetDate").val();
							}else{
								$scope.targetDate = null;
							}
							
							SearchService
							.loadSearchGrid(									
									$scope.searchText,$scope.severity,$scope.status,$scope.problemComponent,$scope.iscm.id,$scope.usergroup.id,$scope.faultEscalationDate,$scope.targetDate)									
							.then(
									function(d) {
										$scope.loading = false;
										console
												.log("Search Grid show"
														+ d);
										$scope.one = null;
										$scope.one = d;
										
										$scope.iscm = null;
										$scope.usergroup = null;
										
										$scope.hideLoadingBox();
										
										console
												.log("Search Grid show 2"
														+ $scope.one.oneToOneGridWrapperList);
									},
									function(errResponse) {
										$scope.one = null;
										$scope.iscm = null;
										$scope.usergroup = null;	
										$scope.loading = false;
										$scope.hideLoadingBox();
										$scope
												.showErrorMessage("No Data Found!!!Please Try Again");
									});							
						}
						
						$scope.doReset = function(){
							$scope.iscm = null;
							$scope.searchText = null;
							$scope.severity = null;
							$scope.status = null;
							$scope.problemComponent = null;
							$scope.faultEscalationDate = null;
							$scope.targetDate = null;
							$scope.one.oneToOneGridWrapperList = null;
						}
						
						$scope.collapse = function(event) {
							$(event.target).toggleClass(
									"glyphicon-chevron-down");
						};
						$scope.displayInside = false;
						$scope.newCollapse = function(event) {
							$(event.target).toggleClass(
									"glyphicon-chevron-down");
							$scope.displayInside = !$scope.displayInside;
						}

						$scope.reverse = true;
						$scope.order = function(predicate) {
							$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse
									: false;
							$scope.predicate = predicate;
						};

						$scope.gotoServiceRequestPage = function() {
							window.location = "servicerequestdummy";
						}
						
						$scope.getHopwiseComment = function(hopsId) {
							var comments = null;
							for (var i = 0; i < $scope.one.oneToOneGridWrapperList.length; i++) {
								if ($scope.one.oneToOneGridWrapperList[i].ticketcomments != null) {
									for (var j = 0; j < $scope.one.oneToOneGridWrapperList[i].ticketcomments.length; j++) {
										if ($scope.one.oneToOneGridWrapperList[i].ticketcomments[j].tickethops.ticketHopsId === hopsId) {
											comments = $scope.one.oneToOneGridWrapperList[i].ticketcomments[j].comments;
											return comments;
										}
									}
								}
							}
						};							

						} ]);
