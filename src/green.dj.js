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
				$('#chat-header').find('.divider').after('<div class="chat-header-button" style="margin-left: 13px; margin-right: 0; ' + this.getSettingsCss() + '" onclick="greenDj.onSettingsClick()">&nbsp;</div>');
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

			this.getSettingsCss = function() {
				return "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAABIAAAASABGyWs+AAADpklEQVRIx6XUT4hVVRwH8M859z5HJYYxcFJHRftDpDazEF6W1iJqUQQhIYwKrawgatEqKDRqEeQ2l9IisU22mfYFMkU+c+GfUSv8Q+qYBqlDmPruvafFve/NGAZB58Dl3nu+h/M7v++f4J6jTaa0y4f4wEcyZeeeyLyBQ0CCjubtaZpn+jdc7P+OCGIPGKoQLQNLBdUcXGjQ2r0XBJUhC1XyGpCkYcvBCg/0D8hVFhpSCbPnEiVjTpr0sEKQidhiUKk0aAuiTFB4xKSTxqR6b2xOHzRhiTGHjadKUhi3G1HEbuMKqaqM6xizxITBuopAO0jm+d56XblgyhmrPC6pzN77uPMeslZSaDniKXeETgq0iSqPmXS/EhkoZL17Ssqar2b9DxudFlN1uPldyZ3ytv2CqFLI5KZNOofVNlmmVMplKrzltFwRak5relKIMR21VoXod+/Z76+G8wW2+9jiZm0qjKbUU0JsZCPEVLqAUnTCenvdljXztr3WOyEqcSFVNQMdhFl5lGV21Ciu2OC8liKl0FNJrmuVQ4ZxrBzLsl6Lo1xMBGW2zagCu5zX0pWCTk/WXS3n7URhNNuqFBJRno1UUgiG7PCpluiiN92e4wmXjPS88YtXDeFFM34OtyRVaO/0rGHLDapUcgdskSl72/vurP15wCsKUTTjoqu+yb1voGG4lvW5mpu7zdvRrl14tulJadAaazwZ/c+RjQTBTQMWSJLosi8FacSlf14hSN6wRiXIzDhjyuehLYkhDdnuEwtxyRozgjR7jf72QSeN4KZ37XddTUSIKZmxxw4URozfnVTt2ezaakSBHfaYSUmUhydqxqLQLVu1kK7a4JyWol7qC2m1H+4hpEN1oRUtptE1bMJKXUEml8sEXSt9bVgX01mzo1N7oSmxCpkVyFTW+dFrBpTNHPC6I9aqZFgh1qe357gxV9hmv6pv58xlk87iQZssbewcVaLtvpAr6JgbKN9Z9B8D5ZqNTomqTj8T59lnka4oM2XCMZmkaGaSOWbClEzUtcg+8+pM7ClxvsVouWGrdTYbs80duUwmd8c2Yzandba6oYXF5jdKZITolm+97IznHRQFmWNmvKCSRO/4TE4IjvvKM5KX/CqGdKnfxCBZpOvPujmiyhI/GcSMR/3WdD5XuE/LtZ5WY79N0XU3RUUTs1x1EVwIV4Im4gvRTdfFnsj6maiip66OpoZpcDmlNBeXGrROT/OdXhVzR8BBz+Fg83VP3N+wsnCZlvq+gQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNC0xMC0wMVQwOTozMzozMi0wNDowMFi803IAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTQtMTAtMDFUMDk6MzM6MzItMDQ6MDAp4WvOAAAAAElFTkSuQmCC);";
			};

			this.getSettingsHtml = function() {
				return "Hello world";
			};

			this.initSettingsButton();
		}
		window.greenDj = new GreenDjObject();
	}
})();
