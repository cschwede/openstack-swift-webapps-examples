function mainCtrl($scope, $http) {
    url = "http://192.168.8.80:8080/v1/AUTH_test/public"
    headers = {}
    $http.get(url, {headers: headers}).then(
        function(response) {
	        $scope.objects = response.data;
        },
        function(response) {
	        console.log(response);
        }
    );
}

var exampleApp = angular.module('example', []);
exampleApp.controller('mainCtrl', mainCtrl);
