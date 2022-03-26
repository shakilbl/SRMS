//angular service area
'use strict';

App
		.factory(
				'DashboardService',
				[
						'$http',
						'$q',
						'url',
						function($http, $q, url) {

							return {

								fetchPendingSRStatus : function() {
									return $http
											.get(
													url
															+ 'getPendingSRStatusGroup/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching Pending SR Status');
														return $q
																.reject(errResponse);
													});
								},
								
								fetchPendingSRStatusSegment : function() {
									return $http
											.get(
													url
															+ 'getPendingSRStatusSegment/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching Pending SR Status');
														return $q
																.reject(errResponse);
													});
								},
								
								fetchPendingSRStatusCustomerSegment : function() {
									return $http
											.get(
													url
															+ 'getPendingSRStatusCustomerSegment/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching Pending SR Status');
														return $q
																.reject(errResponse);
													});
								},
								
								fetchTopTenDeviation : function() {
									return $http
											.get(
													url
															+ 'getTopTenDeviation/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching Pending SR Status');
														return $q
																.reject(errResponse);
													});
								},
								fetchIncomingDistribution : function() {
									return $http
											.get(
													url
															+ 'getIncomingDistribution/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching Pending SR Status');
														return $q
																.reject(errResponse);
													});
								},								
								fetchTopTenComplaintTrend : function() {
									return $http
											.get(
													url
															+ 'getTopTenComplaintTrend/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching Pending SR Status');
														return $q
																.reject(errResponse);
													});
								},
								
								fetchTopTenSRTrend : function() {
									return $http
											.get(
													url
															+ 'getTopTenSRTrend/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching Pending SR Status');
														return $q
																.reject(errResponse);
													});
								},
								
								

							};

						} ]);
