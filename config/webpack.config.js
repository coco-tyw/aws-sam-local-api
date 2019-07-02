// import * as Webpack from 'webpack';
// import {resolve} from 'path';
// import {sync} from 'glob';
const Webpack = require('webpack');
const Path = require('path');
const Glob = require('glob');
const resolve = Path.resolve;
const sync = Glob.sync

/** ビルド対象ルートディレクトリ */
const SRC_PATH = resolve(__dirname, '../src/functions/');
/** entryとなるファイル名 */
const ENTRY_NAME = 'index.js';
/** ビルド結果出力先 */
const BUILT_PATH = resolve(__dirname, '../built');
/** ビルド種別 */
const BUILD_VARIANT = process.env.NODE_ENV;

/**
 * ビルド対象のentryを解決する
 * @returns {Webpack.Entry} entry
 */
const resolveEntry = () => {
  const entries = {};
  const targets = sync(`${SRC_PATH}/**/${ENTRY_NAME}`);
  const pathRegex = new RegExp(`${SRC_PATH}/(.+?)/${ENTRY_NAME}`);
  targets.forEach((value) => {
    let key;
    switch (BUILD_VARIANT) {
      case 'production':
        key = value.replace(pathRegex, 'prd_$1/index');
        break;
      case 'development':
        key = value.replace(pathRegex, 'dev_$1/index');
        break;
    }
    entries[key] = value;
  });
  console.log('brfore: ', targets);
  console.log('after: ', entries);
  return entries;
};

const config = {
  target: 'node',
  mode: BUILD_VARIANT === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.js']
  },
  entry: resolveEntry(),
  output: {
    filename: '[name].js',
    path: BUILT_PATH,
    library: '[name]',
    libraryTarget: 'commonjs2'
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.ts?$/,
  //       loader: 'awesome-typescript-loader'
  //     }
  //   ]
  // }
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: [
  //         {
  //           loader: 'babel-loader',
  //           options: {
  //             presets: [['@babel/preset-env', { modules: false }]]
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
};

// export default config;
module.exports = config;