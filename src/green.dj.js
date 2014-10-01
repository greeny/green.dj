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

			this.initSettings = function() {
				$('#chat-header').find('.divider').after('<div class="chat-header-button" style="margin-left: 13px; margin-right: 0;" onclick="greenDj.onSettingsClick()"><i class="icon icon-settings-white"></i></div>');
				$('body [data-greendj-settings]').on('click', function(e) {
					e.preventDefault();
					that.onSettingsChange($(this));
				});
			};

			this.onSettingsClick = function() {
				$('#dialog-container').html('<div class="dialog" id="green_dj_settings_dialog" style="height: 500px;">' +
					'<div class="dialog-frame"><span class="title">green.dj settings</span><i class="icon icon-dialog-close" onclick="greenDj.closeSettingsDialog()"></i></div>' +
					'<div class="dialog-body" style="height: 390px;text-align: left;">' + this.getSettingsHtml() + '</div>' +
					'<div class="dialog-frame"><div class="button cancel"><span>Export</span></div><div class="button submit" onclick="greenDj.closeSettingsDialog()"><span>OK</span></div></div>' +
					'</div>').show();
			};

			this.onSettingsChange = function(el) {

			};

			this.closeSettingsDialog = function() {
				$('#dialog-container').html('').hide();
			};

			this.getSettingsHtml = function() {
				return '<ul style="left: 20px;position: absolute;top: 15px;margin: 0;padding: 0;width: 50%;list-style-type: none;font-size: 16px;">' +
					'<li style="font-weight: bold;">Features:</li>' +
					'<li><label><input type="checkbox" name="featureAutoWoot" data-greendj-settings> AutoWoot</label></li>' +
					'</ul>' +
					'<ul style="right: -5px;position: absolute;top: 15px;margin: 0;padding: 0;width: 50%;list-style-type: none;font-size: 16px;">' +
					'<li style="font-weight: bold;">Messages:</li>' +
					'<li><label><input type="checkbox" name="messagesWoot" data-greendj-settings> Woot</label></li>' +
					'<li><label><input type="checkbox" name="messagesGrab" data-greendj-settings> Grab</label></li>' +
					'<li><label><input type="checkbox" name="messagesMeh" data-greendj-settings> Meh</label></li>' +
					'<li><label><input type="checkbox" name="messagesLogin" data-greendj-settings> Login</label></li>' +
					'<li><label><input type="checkbox" name="messagesLogout" data-greendj-settings> Logout</label></li>' +
					'</ul>';
			};

			this.initSettings();
		}
		window.greenDj = new GreenDjObject();
	}
})();
