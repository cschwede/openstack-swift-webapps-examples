function mainCtrl($scope, $http) {
    url = "http://" + location.host + "/v1/AUTH_test/public"
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
