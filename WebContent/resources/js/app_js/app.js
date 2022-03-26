var App = angular.module('myApp',['bsTable','ngMessages','ngRoute','ui.bootstrap','chart.js','ngTable','ngTableToCsv', 'datetime']);
//lubna port
//App.value('url', 'http://localhost:8097/CTMS/');


// Debo Port
//App.value('url', 'http://localhost:8080/CTMS/');

// Raihan Port
//App.value('url', 'http://localhost:8099/CTMS/');
//App.value('url', 'http://localhost:8095/CTMS/');


//Faysal Port
//App.value('url', 'http://localhost:8080/CTMS/');

//Shakil Port
//App.value('url', 'http://localhost:8180/SRMS_DS/');
App.value('url', 'http://10.10.21.20:8080/SRMS_DS/'); // Production LB
//App.value('url', 'http://10.10.21.112:8080/SRMS_DS/'); // Test LB
//App.value('url', 'http://10.10.21.105:8180/SRMS_DS/');
//App.value('url', 'http://10.10.22.20:8280/SRMS_DS/');
//App.value('url', 'http://10.10.21.20:8080/SRMS_DS/');


// IMPORTANT: Please change the port according to your server port

App.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	when('/', {
  		templateUrl: 'resources/oneToOnePages/oneToOneForm.jsp',
  		controller: 'OneController'
    }).
  	when('/ticketCreation', {
  		templateUrl: 'resources/oneToOnePages/ticketCreation.jsp',
  		controller: 'TicketCreationController'
    }).
    when('/repeatedTicket', {
    	templateUrl: 'resources/oneToOnePages/repeatedTicket.jsp',
    	controller: 'OneController'
    }).
    otherwise({
    	redirectTo: '/'
    });
}]);
