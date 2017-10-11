/*
* @Author: 第九
* @Date:   2017-10-11 15:18:24
* @Last Modified by:   第九
* @Last Modified time: 2017-10-11 17:29:20
*/
require('./index.css');
require('../common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var formErr = {
	show: function(msg){
		$('.user-wrap .err-item').show().find('.err-msg').text(msg);
	}
}
var page = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		$("#submit").click(function(){
			_this.submit();
		});
	},
	submit: function(){
		var formData = {
			username 		: $.trim($('#username').val()),
			password 		: $.trim($('#password').val()),
			passwordConfirm : $.trim($('#password-confirm').val()),
			phone 			: $.trim($('#phone').val()),
			email 			: $.trim($('#email').val()),
			question 		: $.trim($('#question').val()),
			answer 			: $.trim($('#answer').val())
		},
		result = this.formValidate(formData);
		//验证成功
		if(result.status){
			_user.register(formData,function(res){
				window.location.href = './result.html?type=register';
			},function(errMsg){
				formErr.show(errMsg);
			})
		}
		//验证不通过
		else{
			formErr.show(result.msg);
		}
	},
	formValidate: function(data){
		var result = {
			status 	: false,
			msg	    : ''
		};
		if(!_mm.validate(data.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_mm.validate(data.password,'require')){
			result.msg = '用户密码不能为空';
			return result;
		}

		if(data.password.length < 6){
			result.msg = '用户密码长度不能小于6位';
			return result;
		}
		
		if(data.password != data.passwordConfirm){
			result.msg = '两次输入密码不一致';
			return result;
		}

		if(!_mm.validate(data.phone,'phone')){
			result.msg = '手机格式不正确';
			return result;
		}
		if(!_mm.validate(data.email,'email')){
			result.msg = '邮箱格式不正确';
			return result;
		}

		if(!_mm.validate(data.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        
        if(!_mm.validate(data.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }

        result.status = true;
        return result;
	}

};

page.init();