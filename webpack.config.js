const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const serverConfig = {
	name: "server",
	target: 'node',
  mode: 'development',
  entry: './server/src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, "server", "tsconfig.json")
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'server')
  },
  plugins: [
  ]
};

const clientConfig = {
	name: "client",
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './client/src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, "client", "tsconfig.json")
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'client')
  },
  plugins: [
    new HtmlWebpackPlugin({
			template: './client/index.html'
		})
  ]
};

module.exports = [serverConfig, clientConfig];