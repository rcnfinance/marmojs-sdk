const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.ts',
    library: "marmojs-sdk",
    libraryTarget: "umd"
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
};