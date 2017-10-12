/*
* @Author: 第九
* @Date:   2017-10-09 15:14:41
* @Last Modified by:   第九
* @Last Modified time: 2017-10-12 15:57:08
*/
require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');
require('util/slider/index.js');
var templateSilder = require('./unslider.string');
var _mm = require('util/mm.js');

$(function(){
	var bannerHtml = _mm.renderHtml(templateSilder);
	$('.banner-con').html(bannerHtml);
	//加载unsilder插件
	var $slider = $('.banner').unslider({
		dots: true
	});
	$('.banner-arrow').click(function(){
		var fn = $(this).hasClass('prev') ? 'prev' : 'next';
		$slider.data('unslider')[fn]();
	});
})