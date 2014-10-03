/**
 * green.dj.js - a plug.dj plugin
 * @licence MIT
 * @author greeny
 */
(function(){
	if(typeof API === 'undefined') {
		alert('You are not at plug.dj. Please use this bookmark at plug.dj.\n\nYou can find more info at https://greeny.github.io/green.dj');
	}
	if(typeof jQuery === 'undefined') {
		alert('This site does not have jQuery installed. Please try different one.');
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
				//that.onAdvance('skip', data);
			});

			this.API.on(API.MOD_SKIP, function(data) {
				//that.onAdvance('forceSkip', data);
			});

			/* FUNCTIONALITY */

			this.onUserJoin = function(user) {
				this.info(user.username + ' has joined the room.', 'userJoin');
			};

			this.onUserLeave = function(user) {
				this.info(user.username + ' has left the room.', 'userLeave');
			};

			this.onUserVote = function(user, vote) {
				this.info('<i class="icon icon-woot" style="width: 15px;background-position: ' + (vote === 1 ? '-217px' : '-181px') + ' -287px;left: 4px;"></i>' +
					user.username + ' had ' + (vote === 1 ? '<span style="color: #90ad2f">Woot!</span>ed' : '<span style="color: #c42e3b;">Meh!</span>ed') + ' this song!', 'userVote');
			};

			this.onGrab = function(user) {
				this.info('<i class="icon icon-grab" style="width: 17px;background-position: -146px -287px;left: 4px;"></i>' +
					user.username + ' has <span style="color: #aa74ff">added</span> this song to his playlist.', 'userGrab');
			};

			this.onAdvance = function(reason, data) {
				if(data.lastPlay) {
					this.info(data.lastPlay.dj.username + ' played <i>' + data.lastPlay.media.title + '</i> from <i>' + data.lastPlay.media.author + '</i> (' + this.intToTime(data.lastPlay.media.duration) + ') ' +
						'and received ' + data.lastPlay.score.positive + ' woots, ' + data.lastPlay.score.grabs + ' grabs and ' + data.lastPlay.score.negative + ' mehs.', 'nextSong');
				}
				this.info(data.dj.username + ' is playing <i>' + data.media.title + '</i> from <i>' + data.media.author + '</i> (' + this.intToTime(data.media.duration) + ').', 'nextSong');
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
				var $el = $('<div class="message deletable" style="padding-left: 25px;border-left: green 3px solid;" onmouseover="$(this).find(\'.delete-button\').show();" onmouseout="$(this).find(\'.delete-button\').hide();">' +
					'<div class="delete-button" style="display: none;" onclick="$(this).parent().remove()">Delete</div>' +
					'[<span style="color: green">green.dj</span>] ' + message + '' +
					'</div>');
				var $chat = $("#chat-messages");
				$chat.append($el);
				$chat.scrollTop($chat.scrollTop() + $el.outerHeight(true));
			};

			this.intToTime = function(int) {
				var fix = function(value) {
					value = ~~value;
					if(value < 10) {
						value = '0' + value;
					}
					return value;
				};
				var hours = fix(int / 3600);
				var minutes = fix((int % 3600) / 60);
				var seconds = fix(int % 60);

				return hours + ':' + minutes + ':' + seconds;
			};

			/* SETTINGS */

			this.init = function() {
				if(typeof Storage === 'undefined') {
					this.info('green.dj cannot be loaded, because your browser does not support localStorage.');
					return;
				}
				this.initAll();

				this.info('green.dj version ' + this.version + ' loaded. Enjoy!');
			};

			/* INIT */

			this.initAll = function() {
				this.initStyles();
				this.initMenus();
			};

			this.initMenus = function() {
				$('#app').append(
					'<div class="green-dj menu-btn" onclick="greenDj.toggleMenu();"><div class="menu-btn-inner">green.dj menu</div></div>' +
					'<div class="green-dj menu-container"><div class="menu-container-inner">' +
						'<div class="menu-close" onclick="greenDj.toggleMenu();">&times;</div>' +
						'<div class="menu-tabs">' +
							'<span class="tab active" onclick="greenDj.switchTab($(this), \'general\')">General</span>' +
							'<span class="tab" onclick="greenDj.switchTab($(this), \'widgets\')">Widgets</span>' +
							'<span class="tab" onclick="greenDj.switchTab($(this), \'about\')">About</span>' +
						'</div>' +
						'<div class="tab-content">' +
							'<div class="panel active" data-greendj-tab="general">General</div>' +
							'<div class="panel" data-greendj-tab="widgets">Widgets</div>' +
							'<div class="panel" data-greendj-tab="settings">About</div>' +
						'</div>' +
					'</div></div>'
				);
			};

			this.initStyles = function() {
				$('head').append([
					'<style>',
						'.green-dj.menu-btn {' +
							'position: absolute; z-index: 100; bottom: 54px; height: 159px; width: 53px; text-align: center; vertical-align: bottom; line-height: 106px;' +
							'white-space: nowrap; background-color: #202020; border-right: 1px solid #404040; border-top: 1px solid #404040; border-top-right-radius: 8px;' +
							'box-shadow: inset -1px 1px #303030, 2px -2px 4px rgba(25,25,25,0.4); cursor: pointer;' +
						'}',
						'.green-dj.menu-btn .menu-btn-inner {transform: rotate(270deg); margin-top: 50px; margin-left: -5px;}',
						'.green-dj.menu-container {' +
							'position: absolute; top: 54px; bottom: 54px; left: 0; right: 0; margin-right: 345px; z-index: 1000; background-color: #202020; display: none;' +
						'}',
						'.green-dj.menu-container .menu-container-inner {margin: 20px;}',
						'.green-dj.menu-container .menu-close {float: right; font-size: 32px; color: gray; cursor: pointer;}',
						'.green-dj.menu-container .menu-close:hover {color: lightgray;}',
						'.green-dj.menu-container .menu-tabs {border-bottom: 1px solid gray; padding: 5px;}',
						'.green-dj.menu-container .menu-tabs .tab {' +
							'margin: 5px; padding: 5px 15px; cursor: pointer; border-right: 1px solid gray; border-left: 1px solid gray;' +
							'border-top: 1px solid gray; border-top-left-radius: 5px; border-top-right-radius: 5px;' +
						'}',
						'.green-dj.menu-container .menu-tabs .tab:hover {background-color: #303030;}',
						'.green-dj.menu-container .menu-tabs .tab.active {border-bottom: 1px solid #202020;}',
						'.green-dj.menu-container .menu-tabs .tab.active:hover {background-color: #202020; cursor: default;}',
						'.green-dj.menu-container .tabs-content {padding-top: 20px;}',
						'.green-dj.menu-container .panel {display: none;}',
						'.green-dj.menu-container .panel.active {display: block;}',
					'</style>'
				].join(''));
			};

			this.switchTab = function(el, newTab) {
				$('.green-dj.menu-container .tab').each(function() {
					if($(this).hasClass('active')) {
						$(this).removeClass('active');
					}
				});
				el.addClass('active');
				$('[data-greendj-tab]').each(function() {
					if($(this).data('greendj-tab') === newTab) {
						if(!$(this).hasClass('active')) {
							$(this).addClass('active');
						}
					} else {
						if($(this).hasClass('active')) {
							$(this).removeClass('active');
						}
					}
				});
			};

			this.toggleMenu = function() {
				$('.menu-btn, .menu-container').toggle();
			};

			this.init();
		}
		window.greenDj = new GreenDjObject();
	} else {
		greenDj.info('Already loaded!');
	}
})();
