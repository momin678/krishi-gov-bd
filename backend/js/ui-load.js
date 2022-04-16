
/**
 * 0.1.0
 * Deferred load js/css file, used for ui-jq.js and Lazy Loading.
 * 
 * @ flatfull.com All Rights Reserved.
 * Author url: http://themeforest.net/user/flatfull
 */
var uiLoad = uiLoad || {};

(function($, $document, uiLoad) {
	"use strict";

		var loaded = [],
		promise = false,
		deferred = $.Deferred();

		/**
		 * Chain loads the given sources
		 * @param srcs array, script or css
		 * @returns {*} Promise that will be resolved once the sources has been loaded.
		 */
		/*
		uiLoad.load = function (srcs) {
			console.log(srcs);
			srcs = $.isArray(srcs) ? srcs : srcs.split(/\s+/);
			console.log('Here i am ');
			console.log(srcs);
			srcs = srcs.toString();
			srcs = srcs.replace('admin/', '');
            console.log('Here i am 2');
			console.log(srcs);
			if(!promise){
				promise = deferred.promise();
			}
            console.log('Here i am 3');

			  $.each(srcs, function(index, src) {
				  console.log('Here i am 4');
				promise = promise.then( function(){
					return src.indexOf('.css') >=0 ? loadCSS(src) : loadScript(src);
				} );
			  });

      	// deferred.resolve();
      	return promise;
		};
		*/

		uiLoad.load = function (srcs) {
			srcs = $.isArray(srcs) ? srcs : srcs.split(/\s+/);
			if(!promise){
				promise = deferred.promise();
			}

			$.each(srcs, function(index, src) {
				promise = promise.then( function(){
					return src.indexOf('.css') >=0 ? loadCSS(src) : loadScript(src);
				} );
			});
			deferred.resolve();
			return promise;
		};

		/**
		 * Dynamically loads the given script
		 * @param src The url of the script to load dynamically
		 * @returns {*} Promise that will be resolved once the script has been loaded.
		 */
		var loadScript = function (src) {
			console.log('loo@me');
			console.log(src);
			console.log('test');
			if(loaded[src]) return loaded[src].promise();

			var deferred = $.Deferred();
			var script = $document.createElement('script');
			script.src = 'http://ideabank.eservice.gov.bd/'+src;
            console.log('here i am ... look @ me ');
            console.log(src);
            console.log(script);
			script.onload = function (e) {
				deferred.resolve(e);
			};
			script.onerror = function (e) {
				deferred.reject(e);
			};
			$document.body.appendChild(script);
			loaded[src] = deferred;

			return deferred.promise();
		};

		/**
		 * Dynamically loads the given CSS file
		 * @param href The url of the CSS to load dynamically
		 * @returns {*} Promise that will be resolved once the CSS file has been loaded.
		 */
		var loadCSS = function (href) {
			if(loaded[href]) return loaded[href].promise();

			var deferred = $.Deferred();
			var style = $document.createElement('link');
			style.rel = 'stylesheet';
			style.type = 'text/css';
            console.log(location.hostname);
			style.href = 'http://ideabank.eservice.gov.bd/'+href;
			style.onload = function (e) {
				deferred.resolve(e);
			};
			style.onerror = function (e) {
				deferred.reject(e);
			};
			$document.head.appendChild(style);
			loaded[href] = deferred;

			return deferred.promise();
		}

})(jQuery, document, uiLoad);