/*
* @Author: 第九
* @Date:   2017-10-10 14:05:21
* @Last Modified by:   第九
* @Last Modified time: 2017-10-11 17:34:04
*/
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js')
var _cart = require('service/cart-service.js')

var page = {
	init: function(){
		//加载登陆用户信息
		this.loadUserInfo();
		this.loadCartCount();
		this.bindEvent();
	},
	//加载登陆用户信息
	loadUserInfo: function(){
		_user.checkLogin(function(res){
			$('.user-info .no-login').hide().siblings('.user-info .login').show()
			.find('.username').text(res.username);
		},function(errMsg){
			//do nothing
		})
	},
	//加载购物车数量
	loadCartCount: function(){
		_cart.getCartCount(function(res){
			$('.nav-site .cart-count').text(res);
		},function(errMsg){
			$('.nav-site .cart-count').text(0);
		});
	},
	bindEvent: function(){
		//登陆页面
		$('.link-login').click(function(){
			_mm.doLogin();
		});
		//注册
		$('.link-register').click(function(){
			window.location.href = './user-register.html';
		});
		//退出
		$('.link-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	}

}

page.init();