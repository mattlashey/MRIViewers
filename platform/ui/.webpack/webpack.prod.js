const { merge } = require('webpack-merge');
const path = require('path');
const webpackCommon = require('./../../../.webpack/webpack.base.js');
const pkg = require('./../package.json');

const ROOT_DIR = path.join(__dirname, './..');
const SRC_DIR = path.join(__dirname, '../src');
const DIST_DIR = path.join(__dirname, '../dist');

module.exports = (env, argv) => {
  const commonConfig = webpackCommon(env, argv, { SRC_DIR, DIST_DIR });

  return merge(commonConfig, {
    devtool: 'source-map',
    stats: {
      colors: true,
      hash: true,
      timings: true,
      assets: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: false,
      warnings: true,
    },
    optimization: {
      minimize: true,
      sideEffects: true,
    },
    output: {
      path: ROOT_DIR,
      library: 'ohifUi',
      libraryTarget: 'umd',
      filename: pkg.main,
    },
    externals: {
      '@ohif/core': {
        commonjs: '@ohif/core',
        commonjs2: '@ohif/core',
        amd: '@ohif/core',
        root: '@ohif/core',
      },
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
  });
};
