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

		$scope.firstParagraph=function () {
			var story = $scope.story ;
			story.content= "So there you are, yeah you, "+story.firstName+" \
				. Just minding your business, walking that awesome pooch of yours, "+story.dog+"\
				. It's a lovely day and you are spending it taking in the scenery at the hike and\
				 bike trail by the river. All of the sudden, you hear a loud bang, and all hell \
				 starts to break loose. You hear another loud boom, and then...it all goes black"
		};

		$scope.lastParagraph= function () {
			var story = $scope.story;
			story.content3="It's at this point that you realize something isn't right. Yep. \
				 Those colege psych classes taught you enough to realize that you're just \
				 having a weird dream. Upon this realization, you wake up safe and sound in your bed.\
				  That loud boom you heard? Yeah, that's your neighbor playing Call of Duty. \
				  That vision of waking up in "+story.continent+" You've got a business trip coming up.\
				   Probably just nerves. "+story.superHero+"? You were reading that comic before bed. \
				   And "+story.dog+"? He's sleeping peacefully at your feet. You realize it's Monday \
				   morning and the weekend is over. That's the real nightmare."

		}
		$scope.worldLocation = function(){
			var story= $scope.story;
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
			
			}



			);
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
				$scope.content='';
				$scope.content2='';
				$scope.content3='';

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
			$scope.firstParagraph();
			$scope.lastParagraph();
			$scope.worldLocation(); 
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