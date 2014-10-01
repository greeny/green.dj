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
				$('#dialog-container').html('<div class="dialog" id="green_dj_settings_dialog">' +
					'<div class="dialog-frame"><span class="title">green.dj settings</span><i class="icon icon-dialog-close" onclick="greenDj.closeSettingsDialog()"></i></div>' +
					'<div class="dialog-body">' + this.getSettingsHtml() + '</div>' +
					'<div class="dialog-frame"><div class="button cancel"><span>Export</span></div><div class="button submit" onclick="greenDj.closeSettingsDialog()"><span>OK</span></div></div>' +
					'</div>').show();
			};

			this.closeSettingsDialog = function() {
				$('#dialog-container').html('').hide();
			};

			this.getSettingsHtml = function() {
				return '<ul class="left">' +
					'<li>Features:</li>' +
					'<li><label><input type="checkbox" name="featureAutoWoot" data-greendj-settings> AutoWoot</label></li>' +
					'</ul>';
			};

			this.initSettingsButton();
		}
		window.greenDj = new GreenDjObject();
	}
})();
