/**
 * green.js - a plug.dj plugin
 * @licence MIT
 * @author greeny
 */
(function(){
	if(typeof API === 'undefined') {
		alert('You are not at plug.dj. Please use this bookmark at plug.dj.\n\nYou can find more info at greeny.github.io/green.dj');
	}
	if(typeof window.greenDj === 'undefined') {
		function GreenDjObject() {
			this.API = API;
			var that = this;

			this.API.on(API.ADVANCE, function(data) {
				that.onAdvance('advance', data);
			});

			this.API.on(API.USER_SKIP, function(data) {
				that.onAdvance('skip', data);
			});

			this.API.on(API.MOD_SKIP, function(data) {
				that.onAdvance('forceSkip', data);
			});


			this.onAdvance = function(reason, data) {
				this.woot();
			};

			this.woot = function() {
				setTimeout(function() {
					$('#woot').click();
				}, 2000);
			};
		}
		window.greenDj = new GreenDjObject();
	}
})();
