const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common');


module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'CLOUDINARY_PRESET',
      'CLOUDINARY_URL',
      'ADMIN_PASSWORD',
      'ADMIN_NAME',
      'ADMIN_EMAIL',
      'TOKEN_SECRET'
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});