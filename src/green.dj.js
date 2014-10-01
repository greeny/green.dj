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

			/* EVENTS */

			this.API.on(API.ADVANCE, function(data) {
				that.onAdvance('advance', data);
			});

			this.API.on(API.USER_SKIP, function(data) {
				that.onAdvance('skip', data);
			});

			this.API.on(API.MOD_SKIP, function(data) {
				that.onAdvance('forceSkip', data);
			});

			/* FUNCTIONALITY */

			this.onAdvance = function(reason, data) {
				//this.woot();
			};

			this.woot = function() {
				setTimeout(function() {
					$('#woot').click();
				}, 2000);
			};

			this.grab = function() {
				setTimeout(function() {
					$('#grab').click();
				}, 2000);
			};

			this.meh = function() {
				setTimeout(function() {
					$('#meh').click();
				}, 2000);
			};

			/* SETTINGS */

			this.initSettingsButton = function() {
				$('#chat-header').find('.divider').after('<div class="chat-header-button" style="margin-left: 13px; margin-right: 0;" onclick="greenDj.onSettingsClick()"><i class="icon icon-settings-white"></i></div>');
			};

			this.onSettingsClick = function() {
				var $container = $('#dialog-container');
				$container.html('<div class="dialog">' +
					'<div class="dialog-frame"><span class="title">green.dj settings</span><i class="icon icon-dialog-close"></i></div>' +
					'<div class="dialog-body">' + this.getSettingsHtml() + '</div>' +
					'<div class="dialog-frame"><div class="button submit"><span>OK</span></div></div>' +
					'</div>');
				$container.show();
			};

			this.getSettingsHtml = function() {
				return "Hello world";
			};

			this.initSettingsButton();
		}
		window.greenDj = new GreenDjObject();
	}
})();
