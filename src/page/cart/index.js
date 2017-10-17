/*
* @Author: Administrator
* @Date:   2017-10-15 20:14:59
* @Last Modified by:   第九
* @Last Modified time: 2017-10-17 19:52:20
*/
require('./index.css');
require('../common/header/index.js');
require('../common/crumb/index.js');

var _nav 			= require('../common/nav/index.js');
var cartHtmlPlugin 	= require('./index.string');
var _mm 			= require('util/mm.js');
var _cart 			= require('service/cart-service.js');

var page = {
	data: {},
	init: function(){
		this.loadCart();
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		//单选
		$(document).on('click','.cart-select',function(){
			var $this = $(this),
				productId = $this.parents('.cart-table').data('product-id');
			//选中一个商品	
			if($this.is(':checked')){
				_cart.selectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			//取消选中商品
			else{
				_cart.unselectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
		});
		
		//全选 / 取消
		$(document).on('click','.cart-select-all',function(){
			var $this = $(this);
			//全选
			if($this.is(':checked')){
				_cart.selectAll(function(res){
					_this.renderCart(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			//取消
			else{
				_cart.unselectAll(function(res){
					_this.renderCart(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
		})

		//删除单个商品
		$(document).on('click','.cart-delete',function(){
			if(window.confirm('确认要删除该商品？')){
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		// 删除选中商品
		$(document).on('click','.cart-select-deleted',function(){
			if(window.confirm('确认要删除选中的商品？')){
				var arrProductId = [],
				$selectProduct = $('.cart-select:checked');
				for(var i = 0, iLength = $selectProduct.length; i < iLength; i++){
					arrProductId.push($($selectProduct[i]).parents('.cart-table').data('productId'));
				}
				//删除选中的商品
				if(arrProductId.length > 0){
					var productIds = arrProductId.join(',')
					_this.deleteCartProduct(productIds);
				} 
				//没有选中要删除的商品
				else{
					_mm.errorTips('没有选中要删除的商品');
				}	
			}
		});

		//数量操作
		$(document).on('click','.count-btn',function(){
			var $this 		= $(this),
				$pCount 	= $(this).siblings('.count-input'),
				type 		= $this.data('type') === 'plus' ? 'plus' : 'minus',
				minCount 	= 1,
				maxCount 	= parseInt($pCount.data('stock')),
				curCount 	= parseInt($pCount.val()),
				newCount	= 0;
				productInfo = {
					productId : $this.parents('.cart-table').data('product-id'),
					count     : 1
				};
			// +	
			if(type === 'plus') {
				if(curCount >= maxCount){
					_mm.errorTips('该商品数量已达到上限');
					return;
				}
				newCount = curCount + 1;
 			}
			// -
			else {
				if(curCount <= minCount){
					return;
				}
				newCount = curCount - 1;
			}
			productInfo.count = newCount;
			_cart.updateCart(productInfo,function(res){
				_this.renderCart(res);	
			},function(errMsg){
				_mm.errorTips(errMsg);
			});	
		});
		//去结算
		$(document).on('click','.submit-btn',function(){
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
 				window.location.href = './confirm.html';
			}else{
				_mm.errorTips('请选择商品后再提交');
			}
		});
	},

	//加载购物车信息
	loadCart:function(){
		var _this = this,
			$cartWrap = $('.cart-wrap');

		$cartWrap.html('<div class="loading"></div>');
    	// 加载购物车列表
		_cart.cartList(function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartErr();
		});
	},
	//渲染购物车
	renderCart : function(data){
		this.filter(data);
		// 缓存购物车信息
        this.data.cartInfo = data;
		var cartHtml = _mm.renderHtml(cartHtmlPlugin,data);
		$('.cart-wrap').html(cartHtml);
		_nav.loadCartCount();
	},
	//删除指定商品 支持批量删除 productIds用逗号分割
	deleteCartProduct: function(productIds){
		var _this = this;
		_cart.deleteCartProduct(productIds,function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartErr();
		});
	},
	//匹配数据
	filter: function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	//显示错误信息	
	showCartErr: function(){
		$('.cart-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
	}
};

$(function(){
	page.init();
})

