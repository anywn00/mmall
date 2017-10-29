
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebPackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");


// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function(name,title){
	return {
		title : title,
		template : './src/view/'+ name +'.html',
		filename : 'view/'+ name +'.html',
		inject : true,
		hash : true,
		chunks : ['common',name]
	}
}
var config = {
	entry: {
		'common' 		: ['./src/page/common/index.js'],
		'index' 		: ['./src/page/index/index.js'],
		'detail' 		: ['./src/page/detail/index.js'],
		'cart' 			: ['./src/page/cart/index.js'],
		'confirm' 			: ['./src/page/confirm/index.js'],
		'user-login' 	: ['./src/page/login/index.js'],
		'user-register' : ['./src/page/register/index.js'],
		'result' 		: ['./src/page/result/index.js'],
		'list' 			: ['./src/page/list/index.js']
	},
	output: {
		path : './dist',
		publicPath : '/dist/',
		filename: 'js/[name].js'
	},
	externals : {
        'jquery' : 'window.jQuery'
    },
    resolve : {
    	alias: {
    		node_modules 	: __dirname + '/node_modules',
    		util 			: __dirname + '/src/util',
    		page 			: __dirname + '/src/page',
    		service 		: __dirname + '/src/service',
    		image 			: __dirname + '/src/image'
    	}
    },
	module : {
		loaders : [
			{
				test:/\.css$/,
				loader:ExtractTextPlugin.extract("style-loader","css-loader")
				//loader:"style-loader!css-loader"
			},
			{
		        test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
		        loader: 'url-loader?limit=1000&name=resource/[name].[ext]'
			},
			{test : /\.string$/,loader: 'html-loader'}
		]
	},
	plugins: [
     	//把css单独打包到文件里
     	new ExtractTextPlugin('css/[name].css'),
     	//独立通用模块到js/base.js
     	new webpack.optimize.CommonsChunkPlugin({
     		name: 'common',
     		filename : 'js/base.js'
     	}),
   		//html模板的处理
     	new HtmlWebPackPlugin(getHtmlConfig('index','首页')),
     	new HtmlWebPackPlugin(getHtmlConfig('list','列表')),
     	new HtmlWebPackPlugin(getHtmlConfig('detail','详情')),
     	new HtmlWebPackPlugin(getHtmlConfig('cart','购物车')),
     	new HtmlWebPackPlugin(getHtmlConfig('confirm','订单确认')),
     	new HtmlWebPackPlugin(getHtmlConfig('user-login','登陆')),
     	new HtmlWebPackPlugin(getHtmlConfig('user-register','注册')),
     	new HtmlWebPackPlugin(getHtmlConfig('result','操作结果'))

    ]

};
if(WEBPACK_ENV === 'dev'){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;