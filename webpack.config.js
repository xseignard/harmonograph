const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [new HtmlWebpackPlugin({ template: 'src/index.html' })];
if (process.env.NODE_ENV === 'production') {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
		})
	);
}

module.exports = {
	entry: './src/main.js',
	devtool: 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			// js
			{ test: /\.js$/, use: ['babel-loader'], include: [path.resolve(__dirname, 'src')] },
			// css
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
		],
	},
	plugins,
	devServer: {
		host: '0.0.0.0',
		contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
		open: true,
	},
};
