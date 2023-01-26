const path=require('path')
const CompressionPlugin=require("compression-webpack-plugin")

const config={
	entry:'./src/index.js',
	output:{
		path:path.resolve(__dirname,'build'),
		filename:'main.js'
	},
	devServer:{
		static:path.resolve(__dirname,'build'),
		compress:true,
		port:3000,
	},
	module:{
		rules:[
			{
				test:/\.(js|jsx)$/,
				loader: 'babel-loader',
				options:{
					presets:['@babel/preset-react','@babel/preset-env'],
				},
			},
			{
				test:/\.css$/,
				use:['style-loader','css-loader'],
			}
		],
	},
	resolve:{
		extensions:['.js', '.jsx']
	},
	
}

module.exports=config
