function mainCtrl($scope, $http) {
    $scope.sort = 'name';

    $http.get("./").then(
        function(response) {
	        $scope.objects = response.data;
        },
        function(response) {
	        console.log(response);
        }
    );

    $scope.showmeta = function(obj) {
        $http.head(obj).then(
            function(response) {
    	        $scope.metadata = response.headers();
        	},
            function(response) {
    		    console.log(response);
            }
        );
	}	
}
   
var exampleApp = angular.module('example', []);
exampleApp.controller('mainCtrl', mainCtrl);
