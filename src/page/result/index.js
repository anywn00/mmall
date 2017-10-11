/*
* @Author: 第九
* @Date:   2017-10-11 17:45:15
* @Last Modified by:   第九
* @Last Modified time: 2017-10-11 18:26:49
*/
require('./index.css');
require('../common/nav-simple/index.js');

var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	$element.show();	
})
