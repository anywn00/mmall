/*
* @Author: Administrator
* @Date:   2017-10-22 14:15:58
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-29 18:06:19
*/
require('./index.css');
require('../common/crumb/index.js');
require('../common/header/index.js');

var _nav 				= require('../common/nav/index.js');
var _mm 				= require('util/mm.js');
var _module 			= require('./address-model.js');
var _order              = require('service/order-service.js');
var _address 			= require('service/address-service.js');

var templateAddress     = require('./address-list.string');
var templateProduct     = require('./product-list.string');

var page = {
	 data : {
        selectedAddressId : null
    },
	init: function(){
		this.loadEvent();
		this.bindEvent();	
	},
	bindEvent: function(){
		var _this = this;
		//地址的选择 
		$(document).on('click','.address-item',function(){
			var $this = $(this);
			$this.addClass('active').siblings('.address-item').removeClass('active');
			_this.data.selectedAddressId = $this.data('id');
		});

		//提交订单
		$(document).on('click','.submit-btn',function(){
			var shipping = _this.data.selectedAddressId;
			if(!shipping){
				_mm.errorTips('请选择地址后提交!');
				return;
			}
			_order.createOrder({
				shipping : shipping
			},function(res){
				window.location.href = './payment.html?orderNumber=' + res.orderNo;
			},function(errMsg){
				 _mm.errorTips(errMsg)
			});
		});
		//添加地址
		$(document).on('click','.address-add',function(){
			_module.show({
				isUpdate : false,
				success  : function(){
					_this.loadAddressList();
				}
			});
		});
		//添加编辑
		$(document).on('click','.address-update',function(e){
			e.stopPropagation();
			 var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res){
                _module.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function(){
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
		});
		//删除地址
		$(document).on('click','.address-delete',function(e){
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			if(window.confirm('确认要删除该地址？')){
				_address.deleteAddress(shippingId,function(res){
					 _this.loadAddressList();
				},function(errMsg){
					_mm.errorTips('删除地址失败!');
				})
			}
		});
	},
	loadEvent: function(){
		this.loadAddressList();
        this.loadProductList();
	},
	// 加载地址列表
	loadAddressList: function(){
		var _this = this;
 		$('.address-con').html('<div class="loading"></div>');
 		_address.getAddressList(function(res){
 			var addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
 		},function(errMsg){
 			 $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
 		});
	},
	addressFilter: function(data){
		var shippingId = this.data.selectedAddressId;
		if(shippingId){
			var selectedAddressIdFlag = false;
			for(var i=0,len = data.list.length;i < len; i++){
				if(data.list[i].id === shippingId){
					data.list[i].isActived = true;
					selectedAddressIdFlag = true;
				}
			}
            // 如果以前选中的地址不在列表里，将其删除
           if(!selectedAddressIdFlag){
           	 this.data.selectedAddressId = null;
           }
		}
	},

	// 加载商品清单
    loadProductList : function(){
        var _this       = this;
        $('.product-con').html('<div class="loading"></div>');
        // 获取地址列表
        _order.getProductList(function(res){
            var productListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function(errMsg){
            $('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
        })
    }


};


$(function(){
	page.init();
})


