/*
* @Author: 第九
* @Date:   2017-10-10 11:25:49
* @Last Modified by:   第九
* @Last Modified time: 2017-10-11 17:34:17
*/
require('./index.css');
var _mm = require('util/mm.js');

var page = {
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent: function(){
		var _this = this;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	searchSubmit: function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			_mm.goHome();
		}
	}
};

page.init();