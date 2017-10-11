/*
* @Author: 第九
* @Date:   2017-10-09 14:54:31
* @Last Modified by:   第九
* @Last Modified time: 2017-10-11 17:33:30
*/
require('./index.css');
require('../common/nav-simple/index.js');

var _mm 	= require('util/mm.js');
var _user 	= require('service/user-service.js');
var formError = {
	show: function(msg){
		$('.err-item').show().find('.err-msg').text(msg);
	},
	hide: function(){
		$('.err-item').hide().find('err-msg').text('');
	}
}
var page	= {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		//点击
		$('#submit').click(function(){
			_this.submit();
		})
		//键盘回车
		$('.user-input').keyup(function(e){
			if(e.keycode === 13){
				_this.submit();
			}
		});
	},
	submit: function(){
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val())	
		},
		result = this.formValidate(formData);
		//验证成功
		if(result.status){
			_user.login(formData,function(res){
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			},function(errMsg){
				formError.show(errMsg)
			});
		}
		//验证错误
		else {
			formError.show(result.msg);
		} 
	},
	formValidate: function(formData){
		var result = {
			status  : false,
			msg 	: ''
		};
		if(!_mm.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		} 
		if(!_mm.validate(formData.password,'require')){
			result.msg = '用户密码不能为空';
			return result;	
		}
		result.status = true;
		//result.msg = '验证通过';
		return result;
	}

};

page.init();