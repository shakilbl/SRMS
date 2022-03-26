var app = angular.module('myApp',['bsTable']);

app.controller('UserController', function($scope) {

    $scope.contactList = [
        {
            id: 1,
            FirstName: "Raihan",
            LastName: "Taher"
        },
        {
            id: 2,
            FirstName: "John",
            LastName: "Nash"
        },
        {
            id: 3,
            FirstName: "Abraham",
            LastName: "Lincoln"
        },
        {
            id: 4,
            FirstName: "Georg",
            LastName: "Bush"
        },
        {
            id: 5,
            FirstName: "Saddam",
            LastName: "Hussain"
        },
        {
            id: 6,
            FirstName: "Salman",
            LastName: "Khan"
        },
        {
            id: 7,
            FirstName: "Maruf",
            LastName: "Rahman"
        }
    ];

    $scope.Edit = function(contact) {
        $scope.theName = contact.FirstName + ' ' + contact.LastName;
    };
});