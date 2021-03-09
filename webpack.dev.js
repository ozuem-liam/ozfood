import merge from 'webpack-merge';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import common from './webpack.common';

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new Dotenv({
      path: './.env',
      safe: false
    })
  ]
});