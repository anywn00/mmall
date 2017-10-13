/*
* @Author: 第九
* @Date:   2017-10-12 16:03:54
* @Last Modified by:   第九
* @Last Modified time: 2017-10-13 17:23:20
*/
require('./index.css');
require('../common/nav/index.js');
require('../common/crumb/index.js');
require('../common/header/index.js');

var listTemplate= require('./list.string');
var _mm 		= require('util/mm.js');
var _product	= require('service/product-service.js');
var Pagination  = require('util/pagination/index.js');

var page = {
	data : {
		categoryId  : _mm.getUrlParam('categoryId') || '',
		keyword 	: _mm.getUrlParam('keyword') || '',
		orderBy 	: _mm.getUrlParam('orderBy') || 'default',
		pageNum 	: 1,
		pageSize 	: 3
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadList();
	},
	bindEvent: function(){
		var _this = this;
		$('.sort-item').click(function(){
			_this.data.pageNum = 1;
			var $this = $(this),
				type = $this.data('type');
			if('default' === type){
				//已经是active了
				if($this.hasClass('active')){
					return;
				}
				//其他
				else {
					$this.addClass('active').siblings().removeClass('active asc desc');
					_this.data.orderBy = 'default';
				}
			} else if('price' === type){
				//active class 处理
				$this.addClass('active').siblings().removeClass('active asc desc');
				//升序降序处理
				if(!$this.hasClass('asc')){
					$this.addClass('asc').removeClass('desc');
					_this.data.orderBy = 'price_asc';
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.orderBy = 'price_desc';
				}
			}
			_this.loadList();
		});
	},
	loadList: function(){
		var _this 		= this,
			$listCon 	= $('.p-list-con');
		//删除冗余的字段
		this.data.categoryId ? (delete this.data.keyword) : (delete this.data.categoryId);
		//加载分页
		_product.list(this.data,function(res){
			var result = _mm.renderHtml(listTemplate,res);
			$listCon.html(result);

			_this.loadPagination({
				prePage 		: res.prePage,
				hasPreviousPage : res.hasPreviousPage,
				nextPage 		: res.nextPage,
				hasNextPage 	: res.hasNextPage,
				pageNum 		: res.pageNum,
				pages 			: res.pages
			});

			/*根据pageNum pages(总页数) 获取分页信息*/
			// _this.loadPagination({
			// 	prePage   		: (res.pageNum - 1) > 0 ? (res.pageNum - 1) : 1,
			// 	hasPreviousPage : !(res.pageNum === 1),
			// 	nextPage        : (res.pageNum + 1) < res.pages ? (res.pageNum + 1) : res.pages,
			// 	hasNextPage		: !(res.pageNum === res.pages),
			// 	pageNum 		: res.pageNum,
			//  	pages 			: res.pages
			// })
		},function(errMsg){
			$listCon.html(errMsg);
		})
	},
	loadPagination: function(pageInfo){
		var _this = this;
		this.pagination ? '' : this.pagination = new Pagination();
		this.pagination.render($.extend({},pageInfo,{
			container 	: $('.pagination'),
			onSelect	: function(pageNum){
				_this.data.pageNum = pageNum;
				_this.loadList();
			}
		}));
	}
};

$(function(){
	page.init();
})