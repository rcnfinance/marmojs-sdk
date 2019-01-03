const path = require('path');

module.exports = {
  entry: './src/builder/IntentBuilder.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: path.join('[name]', 'index.js'),
    library: "marmojs-sdk",
    libraryTarget: "umd"
  }
};