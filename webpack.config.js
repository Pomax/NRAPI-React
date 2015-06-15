var path = require("path");
module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: 'public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders:  ['babel-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.jsx$/,
        loaders:  ['babel-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
      }
    ]
  }
};
