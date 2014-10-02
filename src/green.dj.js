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
			this.version = '1.0.0';
			this.settings = {};

			var that = this;

			/* EVENTS */

			this.API.on(API.USER_JOIN, function(user) {
				that.onUserJoin(user);
			});

			this.API.on(API.USER_LEFT, function(user) {
				that.onUserLeave(user);
			});

			this.API.on(API.VOTE_UPDATE, function(data) {
				that.onUserVote(data.user, data.vote);
			});

			this.API.on(API.GRAB_UPDATE, function(user) {
				that.onGrab(user.user);
			});

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

			this.onUserJoin = function(user) {
				this.info(user.username + ' has joined the room.', 'userJoin');
			};

			this.onUserLeave = function(user) {
				this.info(user.username + ' has left the room.', 'userLeave');
			};

			this.onUserVote = function(user, vote) {
				console.log(vote);
				this.info(user.username + ' had ' + (vote === 1 ? '<span style="color: #90ad2f">Woot!</span>ed' : '<span style="color: #c42e3b;">Meh!</span>ed') + ' this song!', 'userVote');
			};

			this.onGrab = function(user) {
				console.log(user);
				this.info(user.username + ' has <span style="color: #aa74ff">added</span> this song to his playlist.', 'userGrab');
			};

			this.onAdvance = function(reason, data) {
				if(this.featureEnabled('autoWoot')) {
					/*this.woot();*/
				}
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

			this.info = function(message, required) {
				/*if(message) {
					if(!(required && this.messageEnabled(required))) {*/
						var $el = $('<div class="message deletable" style="padding-left: 25px;border-left: green 3px solid;" onmouseover="$(this).find(\'.delete-button\').show();" onmouseout="$(this).find(\'.delete-button\').hide();">' +
							'<div class="delete-button" style="display: none;" onclick="$(this).parent().remove()">Delete</div>' +
							'[<span style="color: green">green.dj</span>] ' + message + '' +
							'</div>');
						var $chat = $("#chat-messages");
						$chat.append($el);
						$chat.scrollTop($chat.scrollTop() + $el.outerHeight(true));
					/*}
				}*/
			};

			/* SETTINGS */

			this.init = function() {
				$('#chat-header').find('.divider').after('<div class="chat-header-button" style="margin-left: 13px; margin-right: 0;" onclick="greenDj.onSettingsClick()">' +
					'<i class="icon icon-settings-grey" onmouseover="$(this).toggleClass(\'icon-settings-grey icon-settings-white\')" onmouseout="$(this).toggleClass(\'icon-settings-grey icon-settings-white\')"></i>' +
					'</div>');
				$('body [data-greendj-settings]').on('change', function(e) {
					e.preventDefault();
					that.onSettingsChange($(this));
				});
				if(typeof Storage === 'undefined') {
					this.info('green.dj cannot be loaded, because your browser does not support localStorage.');
					return;
				}
				var data = localStorage.getItem('green.dj');
				if(data) {
					this.settings = JSON.parse(data);
				} else {
					this.settings = {};
				}


				this.info('green.dj version ' + this.version + ' loaded. Enjoy!');
			};

			this.onSettingsClick = function() {
				$('#dialog-container').html('<div class="dialog" id="green_dj_settings_dialog" style="height: 500px;">' +
					'<div class="dialog-frame"><span class="title">green.dj settings</span><i class="icon icon-dialog-close" onclick="greenDj.closeSettingsDialog()"></i></div>' +
					'<div class="dialog-body" style="height: 390px;text-align: left;">' + this.getSettingsHtml() + '</div>' +
					'<div class="dialog-frame"><div class="button cancel"><span>Export</span></div><div class="button submit" onclick="greenDj.closeSettingsDialog()"><span>OK</span></div></div>' +
					'</div>').show();
			};

			this.onSettingsChange = function(el) {
				var s = this.getSettings(), key = el.data('greendj-settings'), val = el.attr('name'), checked = el.val();
				if(!s[key]) {
					s[key] = {};
				}
				if(!s[key][val]) {
					s[key][val] = false;
				}
				this.settings[key][val] = !this.settings[key][val];
				el.val(this.settings[key][val]);
				localStorage.setItem('green.dj', JSON.stringify(this.settings));
			};

			this.messageEnabled = function(key) {
				var s = this.getSettings();
				if(!s.messages) {
					s.messages = {};
					return false;
				}
				if(!s.messages[key]) {
					s.messages[key] = true;
				}
				return s.messages[key];
			};

			this.featureEnabled = function(key) {
				var s = this.getSettings();
				if(!s.features) {
					s.features = {};
					return false;
				}
				if(!s.features[key]) {
					s.features[key] = true;
				}
				return s.features[key];
			};

			this.getSettings = function() {
				return this.settings;
			};

			this.closeSettingsDialog = function() {
				$('#dialog-container').html('').hide();
			};

			this.getSettingsHtml = function() {
				return '<ul style="left: 20px;position: absolute;top: 15px;margin: 0;padding: 0;width: 50%;list-style-type: none;font-size: 16px;">' +
					'<li style="font-weight: bold;">Features:</li>' +
					'<li><label><input type="checkbox" name="autoWoot" data-greendj-settings="features"> AutoWoot</label></li>' +
					'</ul>' +
					'<ul style="right: -5px;position: absolute;top: 15px;margin: 0;padding: 0;width: 50%;list-style-type: none;font-size: 16px;">' +
					'<li style="font-weight: bold;">Messages:</li>' +
					'<li><label><input type="checkbox" name="userVote" data-greendj-settings="messages"> User vote (woot / meh)</label></li>' +
					'<li><label><input type="checkbox" name="userJoin" data-greendj-settings="messages"> User join</label></li>' +
					'<li><label><input type="checkbox" name="userLeave" data-greendj-settings="messages"> User leave</label></li>' +
					'</ul>';
			};

			this.init();
		}
		window.greenDj = new GreenDjObject();
	} else {
		greenDj.info('Already loaded!');
	}
})();
