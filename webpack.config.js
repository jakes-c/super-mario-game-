var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './lib/game.js',
  output: {
    path: path.resolve(__dirname, 'assets/javascripts'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};