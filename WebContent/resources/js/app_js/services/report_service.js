//angular service area
'use strict';

App
		.factory(
				'ReportService',
				[
						'$http',
						'$q',
						'url',
						function($http, $q, url) {

							return {

								fetchAllIssueSolution : function() {
									return $http
											.get(
													url
															+ 'CircleWiseMonthlyComplaint/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching issuesolution list');
														return $q
																.reject(errResponse);
													});
								},

								fetchTopTenTrend : function() {
									return $http
											.get(url + 'GetTopTenTrend/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching issuesolution list');
														return $q
																.reject(errResponse);
													});
								},

								fetchSubIssue : function() {
									return $http
											.get(url + 'subCatReport/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching sub cat report');
														return $q
																.reject(errResponse);
													});
								},
								fetchCompliantSolutionStatus : function() {
									return $http
											.get(url + 'compliantSolutionStatus/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching dhk-gzp report');
														return $q
																.reject(errResponse);
													});
								},
								fetchOpenOrClose : function() {
									return $http
											.get(url + 'openOrClose/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching dhk-gzp report');
														return $q
																.reject(errResponse);
													});
								},
								fetchOpenOrCloseWeekly : function() {
									return $http
											.get(url + 'openOrCloseWeekly/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching dhk-gzp report');
														return $q
																.reject(errResponse);
													});
								},
								fetchOpenOrCloseDate : function() {
									return $http
											.get(url + 'openOrCloseDate/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching dhk-gzp report');
														return $q
																.reject(errResponse);
													});
								},
								fetchYearlyComliantStatus : function() {
									return $http
											.get(url + 'yearlyCompliantStatus/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching dhk-gzp report');
														return $q
																.reject(errResponse);
													});
								},
								fetchProductionReport : function() {
									return $http
											.get(url + 'productionReport/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching dhk-gzp report');
														return $q
																.reject(errResponse);
													});
								},
								fetchResolution : function() {
									return $http
											.get(url + 'resolution/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching resolution');
														return $q
																.reject(errResponse);
													});
								},
								fetchWeeklyComplaintStatus : function() {
									return $http
											.get(url + 'weeklyComplaintStatus/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching resolution');
														return $q
																.reject(errResponse);
													});
								},
								fetchSubCatNetCom : function() {
									return $http
											.get(url + 'subCatNetCom/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching resolution');
														return $q
																.reject(errResponse);
													});
								},
								fetchMajorSevenThana : function() {
									return $http
											.get(url + 'getMajorSevenThana/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching resolution');
														return $q
																.reject(errResponse);
													});
								},
								fetchMajor : function(val) {
									return $http
											.get(url + 'getMajorSevenThana1/'+ val)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching resolution');
														return $q
																.reject(errResponse);
													});
								},
								fetchSectionwiseOpen : function() {
									return $http
											.get(url + 'getSectionwiseOpen/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching resolution');
														return $q
																.reject(errResponse);
													});
								},
								fetchHighCategorywise : function() {
									return $http
											.get(url + 'getHighCategorywise/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching resolution');
														return $q
																.reject(errResponse);
													});
								},
								fetchWeeklyStatusReport : function() {
									return $http
											.get(url + 'getWeeklyStatusReport/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching resolution');
														return $q
																.reject(errResponse);
													});
								},
								fetchNewSiteBudgetConstraint : function() {
									return $http
											.get(url + 'getNewSiteBudgetConstraint/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching resolution');
														return $q
																.reject(errResponse);
													});
								},
								fetchWeeklyReportComplaintHit : function() {
									return $http
											.get(url + 'getWeeklyReportComplaintHit/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching resolution');
														return $q
																.reject(errResponse);
													});
								},
								fetchComplaintwiseE2ESla : function() {
									return $http
											.get(url + 'getComplaintwiseE2ESla/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching resolution');
														return $q
																.reject(errResponse);
													});
								},
								

							};

						} ]);
