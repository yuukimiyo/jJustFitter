/*
 * jquery.justfitter.jp 0.5 jQuery plugin
 *
 * Copyright (c) 2012 Yuuki miyoshi
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Yuuki miyoshi
 * @version 0.5
 * @url http://github.com/yuukimiyo/jWaterSurface
 * @github https://github.com/yuukimiyo/jWaterSurface
 *
 * ＜はじめに＞
 * jQuery UI のresizableで２ペインの左側のサイズを変更した際に右ペインの幅を正しくあわせる為のプラグインです。
 * 自分で使う為に作成したプラグインです。ご利用される場合は自己責任でお願いします。
 * 
 * <*>現在２ペインまでしか対応していません。
 * 
 * ＜ご利用方法＞
 * jQuery（1.7.2でテストしています）と共にJavaScriptとして読み込んでください。
 * 
 * 左右２ペインで表示させたい２つの要素（divタグなど）をラッパー要素でかこみ、
 * このラッパー要素に対して他のjQueryプラグインと同様に適用してください。
 * 
 * ＜オプション＞
 * [resizableColumn] : .resizable
 * 　左ペインのコラム要素を指定して下さい。
 * [dependentColumn] : .dependent
 * 　右ペインのコラム要素を指定して下さい。
 */

(function(jQuery) {

	var options;
	var justfitterElements;

	/**
	 * jResizableColumnsのメイン関数
	 */
	jQuery.fn.justfitter = function(options) {
		justfitterElements = new Array();
		
		var options = jQuery.extend({
			wrapper : "#wrapper",
			direction : "xy",
			onshift : "true",
			xoffset : 0,
			yoffset : 0
		}, options);
		
		var justfitterElement;
		
		return this.each(function() {
			target = this;
			
			if (jQuery(target).size() == 0) return false;
			if (jQuery(options.wrapper).size() == 0) return false;
			
			resizeChild(target);
			
			jQuery(window).resize(function() {
				resizeChild(target);
			});
			jQuery(options.wrapper).resize(function() {
				resizeChild(target);
			});
		});
		
		function resizeChild(_target) {
			
			var shiftX = 0;
			var shiftY = 0;
			
			if ( options.onshift == "true") {
				shiftX = jQuery(_target).offset().left - jQuery(options.wrapper).offset().left;
				shiftY = jQuery(_target).offset().top - jQuery(options.wrapper).offset().top;
			}
			if (options.direction == "xy" | options.direction == "x") {
				jQuery(_target).width(parseInt(
					  jQuery(options.wrapper).innerWidth()
					- (jQuery(_target).outerWidth() - jQuery(_target).innerWidth())
					- options.xoffset
					- shiftX
				));
			}
			if (options.direction == "xy" | options.direction == "y") {
				jQuery(_target).height(
					  jQuery(options.wrapper).innerHeight()
					- (jQuery(_target).outerHeight() - jQuery(_target).innerHeight())
					- options.yoffset
					- shiftY
				);
			}
		};
	};
})(jQuery);
