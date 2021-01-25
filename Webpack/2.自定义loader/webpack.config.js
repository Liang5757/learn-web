const path = require('path');

module.exports = {
  entry: { // string | object | array
    index: './index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'force-strict-loader',
          options: {
            sourceMap: true,
          }
        }
      }
    ]
  },
  mode: 'development',
}
