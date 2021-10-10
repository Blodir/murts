const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const developmentServerConfig = {
	name: "dev-server",
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
              configFile: path.resolve(__dirname, "server", "tsconfig.development.json")
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

const productionServerConfig = {
	name: "prod-server",
	target: 'node',
  mode: 'production',
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
              configFile: path.resolve(__dirname, "server", "tsconfig.production.json")
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

module.exports = [developmentServerConfig, productionServerConfig, clientConfig];