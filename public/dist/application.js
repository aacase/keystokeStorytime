'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'keystoke-storytime';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('stories');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Configuring the Articles module
angular.module('stories').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Stories', 'stories', 'dropdown', '/stories(/create)?');
		Menus.addSubMenuItem('topbar', 'stories', 'List Stories', 'stories');
		Menus.addSubMenuItem('topbar', 'stories', 'New Story', 'stories/create');
	}
]);
'use strict';

//Setting up route
angular.module('stories').config(['$stateProvider',
	function($stateProvider) {
		// Stories state routing
		$stateProvider.
		state('listStories', {
			url: '/stories',
			templateUrl: 'modules/stories/views/list-stories.client.view.html'
		}).
		state('createStory', {
			url: '/stories/create',
			templateUrl: 'modules/stories/views/create-story.client.view.html'
		}).
		state('viewStory', {
			url: '/stories/:storyId',
			templateUrl: 'modules/stories/views/view-story.client.view.html'
		}).
		state('editStory', {
			url: '/stories/:storyId/edit',
			templateUrl: 'modules/stories/views/edit-story.client.view.html'
		});
	}
]);
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
				continent: this.continent,
				content: "So there you are, yeah you, "+this.firstName+" \
				. Just minding your business, walking that awesome pooch of yours, "+this.dog+"\
				. It's a lovely day and you are spending it taking in the scenery at the hike and\
				 bike trail by the river. All of the sudden, you hear a loud bang, and all hell \
				 starts to break loose. You hear another loud boom, and then...it all goes black",
				 content2: '',
				 content3:"It's at this point that you realize something isn't right. Yep. \
				 Those colege psych classes taught you enough to realize that you're just \
				 having a weird dream. Upon this realization, you wake up safe and sound in your bed.\
				  That loud boom you heard? Yeah, that's your neighbor playing Call of Duty. \
				  That vision of waking up in "+this.continent+" You've got a business trip coming up.\
				   Probably just nerves. "+this.superHero+"? You were reading that comic before bed. \
				   And "+this.dog+"? He's sleeping peacefully at your feet. You realize it's Monday \
				   morning and the weekend is over. That's the real nightmare."
			
			});

			if (story.continent=="Asia"){

					story.content2= "You come to after feeling a strange liquid falling on your cheek. \
					In your groggy state, you look up and see...Uh oh. This is bad. It's Godzilla!\
					 And he doesn't look happy. Wait a second...did Godzilla just drool on you? \
					 That's gross. You see his massive feet about to make you a human pancake,\
					  when all of the sudden, a monster sized version \
					  of "+story.superHero+" punches Godzilla in the face! \
					  This is kinda weird, you think. "
				
			}

			else if (story.continent=="Europe"){
				story.content2="You come to after feeling a strange liquid falling on your cheek. In \
				your groggy state, you look up and see...a leaky barrel of wine. You stand up \
				and walk out the nearest door, and you're suddenly on the streets of Paris! \
				This is way better than when you blacked out a second ago. You walk over \
				to a cafe and order some coffee. You reach into your wallet for some cash and \
				come up empty. Dang. But what's this? "+story.superHero+" \
				taps on your shoulder, and says he's got you covered. That's kinda weird, but you decide to roll with it."

			}

			else if (story.continent=="North America"){
				story.content2="You come to after hearing a crowd of people chanting 'Let's go Cowboys!'. \
				You realize that you're on the 50 yard line of thier stadium, and a massive group of \
				football players are running towards you at a high rate of speed. Just before your're \
				about to be obliterated,"+ story.superHero+" yanks you out of the way. 'You need to be \
				more careful,'"+story.superHero+" says."
				
			}

			else if (story.continent=="South America"){
				story.content2="You come to after feeling a strange liquid falling on your cheek. \
				In your groggy state, you look up and see...no it can't be. A Giant Sloth? And he's \
				drooling on you? Where the heck are you? You look around and see a sign off in the \
				distance. It says 'Sao Paulo 1000km.' You haven't woken up in a place this strange\
				 since college. All of the sudden, a team of loggers come through the brush in their \
				 heavy machinery, hellbent on destroying everything they can. Just when their giant chainsawmobile\
				  is about to gobble you up, "+story.superHero+" comes to the rescue, pulling you to safety. "
				
			}

			else if (story.continent=="Antarctica"){
				story.content2="You picked Antarctica? There's literally nothing here. You feel yourself freezing to death.\
				Even "+story.superHero+" can't save you now."
				
			}

			else if (story.continent=="Africa"){
				story.content2="You come to after feeling a strange liquid falling on your cheek. In your \
				groggy state, you look up and see...a pack of lions drooling over thier next meal. '\
				I wonder what I taste like,'' you think, before realizing that you're about to be ancient history.\
				 You try to slowly get up, not wanting to attract any more attention from those scary dudes. \
				 It doesn't work, and they start to pounce. Just when you think you've taken your last breath,\
				 "+story.superHero+" comes in and saves the day! What the heck is he doing in Africa? Oh well. You're alive!"
				
			}

			else if (story.continent=="Australia"){
				story.content2=" You come to after feeling a strange liquid falling on your cheek.\
				 In your groggy state, you look up and see...no it can't be. A kangaroo? \
				 Where the heck are you? You look around and see a sign off in the distance. \
				 It says 'Sydney 1000km.' You haven't woken up in a place this strange since \
				 college. You turn to your right, and you see the biggest spider you've ever \
				 seen. Just as it's about to sink its fangs into you, "+story.superHero+"\
				  yanks you out of the way. What the heck is going on here?"
				
			}

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
'use strict';

//Stories service used to communicate Stories REST endpoints
angular.module('stories').factory('Stories', ['$resource',
	function($resource) {
		return $resource('stories/:storyId', { storyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invlaid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid){
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
	
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [

	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);