const path = require("path");

module.exports = {
	entry: {
		app: ["./demo/app.js"]
	},
	output: {
    libraryTarget : 'commonjs2',
    path: path.resolve(__dirname, "dist/assets"),
    filename: "[name].js",
  },
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: { react: path.resolve('node_modules/react') },
	},
	module: {
		rules: [
			{
				test: /(\.js?$|\.jsx?$)/,
				use: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	mode: 'production'
}
