const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

CONFIG = {
    src: {
        path: path.resolve(__dirname, 'app'),
        entry: path.resolve(__dirname, 'app/index.js'),
        assets: path.resolve(__dirname, 'app/assets')
    },
    dist: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'assets'
    }
}

const webpackConfig = {
  entry: CONFIG.src.entry,
  output: {
    filename: CONFIG.dist.filename,
    path: CONFIG.dist.path,
    publicPath: CONFIG.dist.publicPath
  },
  plugins: [
      new HtmlWebpackPlugin(),
      new CopyWebpackPlugin([
        {
            context: CONFIG.src.assets,
            from: '**/*',
            to: CONFIG.publicPath
        }
    ])
  ]
};

module.exports = webpackConfig;