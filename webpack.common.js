const path = require('path');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, '/Client/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'ozfoods',
      template: './index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'Client'),
        loaders: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'Client'),
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'file-loader?name=Client/img/[name].[ext]',
      }
    ],
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss', '.jpg', '.png', '.gif', '.jpeg']
  }
};