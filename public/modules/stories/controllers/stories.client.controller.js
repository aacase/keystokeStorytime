'use strict';

// Stories controller
angular.module('stories').controller('StoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stories',
	function($scope, $stateParams, $location, Authentication, Stories ) {
		$scope.authentication = Authentication;

		$scope.counter=0

		$scope.counterUp= function(){
			$scope.counter += 1
		}

		$scope.counterDown= function(){
			$scope.counter = $scope.counter - 1
		}

		// Create new Story
		$scope.create = function() {
			// Create new Story object
			var story = new Stories ({
				name: this.name,
				firstName: this.firstName,
				dog: this.dog,
				superHero: this.superHero,
				continent: this.continent 
			});

			// Redirect after save
			story.$save(function(response) {
				$location.path('stories/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.firstName='';
				$scope.dog = '';
				$scope.superHero='';
				$scope.continent='';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Story
		$scope.remove = function( story ) {
			if ( story ) { story.$remove();

				for (var i in $scope.stories ) {
					if ($scope.stories [i] === story ) {
						$scope.stories.splice(i, 1);
					}
				}
			} else {
				$scope.story.$remove(function() {
					$location.path('stories');
				});
			}
		};

		// Update existing Story
		$scope.update = function() {
			var story = $scope.story ;

			story.$update(function() {
				$location.path('stories/' + story._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Stories
		$scope.find = function() {
			$scope.stories = Stories.query();
		};

		// Find existing Story
		$scope.findOne = function() {
			$scope.story = Stories.get({ 
				storyId: $stateParams.storyId
			});
		};
	}
]);