function ExperimentsController($scope) {

	$scope.experiments = [
		{ name: 'Experiment One', url: 'experiments/experiment1.html'},
		{ name: 'Experiment Two', url: 'experiments/experiment2.html'},
		{ name: 'Experiment Three', url: 'experiments/experiment3.html'}
	]

	$scope.updateExperimentTotal = function () {
		$scope.totalExperiments = $scope.experiments.length;
	};

	$scope.updateExperimentTotal();

	$scope.addNewExperiment = function () {
		$scope.experiments.push({ name: $scope.newExperimentName, url: $scope.newExperimentUrl });
		$scope.updateExperimentTotal();
	}
}