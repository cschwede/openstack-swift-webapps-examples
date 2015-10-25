function _loadPreview($scope, $http, url, start, end) {
    var config = {headers:  {'Range': 'bytes='+start+'-'+end}, responseType: "blob"};
    $http.get(url, config).
        then(function(response) {
            fr = new FileReader();
            fr.onload = function(){
                $scope.$apply(function() {
                    $scope.preview=fr.result.replace("application/octet-stream", "image/jpeg");
                });
            };
            fr.readAsDataURL(response.data);
        }, function(response) {
            console.log(response.statusText);
        }
    );
}

function mainCtrl($scope, $http) {
    $http.get("./").then(
        function(response) {
	        $scope.objects = response.data;
        },
        function(response) {
	        console.log(response);
        }
    );

    $scope.sort = 'name';
    $scope.reverse = false;

    $scope.showmeta = function(obj) {
        $scope.preview = "";
        $http.head(obj).then(
            function(response) {
    	        $scope.metadata = response.headers();
        	},
            function(response) {
    		    console.log(response);
            }
        );
    }

    $scope.showpreview = function(url){
        $scope.metadata = "";
        $http.head(url).
            then(function(response) {
                start=response.headers('x-object-meta-preview-start');
                length=response.headers('x-object-meta-preview-length');
                end=parseInt(start)+parseInt(length);
                _loadPreview($scope, $http, url, start, end);
            }, function(response) {
                console.log(response.statusText);
            }
        );
    }

    $scope.order = function(key){
        if ($scope.sort == key) {
            if ($scope.reverse == true) {
	            $scope.reverse = false;
            }
            else {
	            $scope.reverse = true;
            }
        }
	    $scope.sort = key;
    }
}
   
var exampleApp = angular.module('example', []);
exampleApp.controller('mainCtrl', mainCtrl);
exampleApp.filter('objsize', function() {
	return function(bytes, precision) {
	    var units = ['B', 'kiB', 'MiB', 'GiB'];
	    var size = Math.floor(Math.log(bytes) / Math.log(1000));
	    return (bytes / Math.pow(1000, Math.floor(size))).toFixed(1) +  ' ' + units[size];
	}
});
