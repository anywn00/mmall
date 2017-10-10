/*
* @Author: 第九
* @Date:   2017-10-10 14:05:21
* @Last Modified by:   第九
* @Last Modified time: 2017-10-10 16:17:15
*/
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js')

var nav = {
	init: function(){
		//加载登陆用户信息
		this.loadUserInfo();
		this.bindEvent();
	},
	//加载登陆用户信息
	loadUserInfo: function(){
		_user.checkLogin(function(res){
			$('.login').show().siblinds('.no-login').hide()
			.find('.user-info .username').html(res.username);
		},function(errMsg){

		})
	},

	bindEvent: function(){
		//登陆页面
		$('.link-login').click(function(){
			window.location.href = './user-login.html'
		});
	}

}

nav.init();