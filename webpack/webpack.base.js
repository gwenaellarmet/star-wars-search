const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const loaders = [
  {
    loader: 'css-loader?minimize',
    options: {
      modules: true,
    },
  },
  {
    loader: 'sass-loader',
  },
];

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.join(__dirname, '../', 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: loaders,
        }),
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};
