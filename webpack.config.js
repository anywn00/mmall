
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebPackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");


// 环境变量配置，dev / online

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
		'common' : ['./src/page/common/index.js'],
		'index' : ['./src/page/index/index.js'],
		'login' : ['./src/page/login/index.js']
	},
	output: {
		path : './dist',
		publicPath : '/dist',
		filename: 'js/[name].js'
	},
	externals : {
        'jquery' : 'window.jQuery'
    },
	module : {
		loaders : [
			{
				test:/\.css$/,
				loader:ExtractTextPlugin.extract("style-loader","css-loader")
				//loader:"style-loader!css-loader"
			},
			{
		        test: /\.(png|jpg|jpeg|gif)$/,
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
     	new HtmlWebPackPlugin(getHtmlConfig('index','首页'))
    ]

};
config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')

module.exports = config;