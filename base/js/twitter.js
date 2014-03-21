angular.module('Twitter', ['ngResource']);



function TwitterController ($scope, $resource) {
	$scope.twitter = $resource('http://search.twitter.com/:action',
		{ action:'search.json', q: 'angularjs', callback: 'JSON_CALLBACK'},
		{ get: { method:'JSONP' }});
	$scope.twitterResult = $scope.twitter.get();
}