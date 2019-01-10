const webpack = require('webpack');
const helpers = require('./helpers');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const VERSION = process.env.BUILD_VERSION;
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const API_ENV = process.env.API_ENV || 'PROD';
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'Bulma Angular',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer(),
  build:VERSION,
  host:HOST,
  hmr:HMR,
  port:PORT,
  env:ENV,
  API_ENV:API_ENV
};

module.exports = function (options) {
  isProd = options.env === 'production';
  return {
    entry: {
      'polyfills': './src/polyfills.browser.ts',
      'vendor':    './src/vendor.browser.ts',
      'main':      './src/main.browser.ts',
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [helpers.root('src'), helpers.root('node_modules')],

    },

    optimization: {
        splitChunks: {
           cacheGroups: {
              commons: {test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all"}
          }
       }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /linebreak/,
          loader: "transform?brfs"
        },
       {
         test: /\.ts$/,
         use: [
           '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
           'awesome-typescript-loader',
           'angular2-template-loader',
           'angular-router-loader'
         ]
       },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader']
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        },
      ],

    },
    plugins: [

      new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery',
          jquery: 'jquery',
          "window.jQuery": "jquery",
          Hammer: "hammerjs/hammer"
      }),
      new AssetsPlugin({
        path: helpers.root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
        helpers.root('src'), // location of your src
        {
          // your Angular Async Route paths relative to this root directory
        }
      ),

      new ContextReplacementPlugin(
        /\@angular(\\|\/)core(\\|\/)fesm5/,
        helpers.root('src'),{}
      ),
      new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' },
        { from: 'src/meta'},
      ]),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head',
        favicon:'src/assets/icon/favicon.png'
      }),
      new DefinePlugin({

        'TITLE': JSON.stringify(METADATA.title),
        'BUILD' : JSON.stringify(METADATA.build),
        'API_ENV' : JSON.stringify(METADATA.API_ENV),

        'process.env': {
          'TITLE' : JSON.stringify(METADATA.title),
          'BUILD' : JSON.stringify(METADATA.build),
          'API_ENV' : JSON.stringify(METADATA.API_ENV)
        }

      }),
      new LoaderOptionsPlugin({}),

      // Fix Angular 2
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)async/,
        helpers.root('node_modules/@angular/core/src/facade/async.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)collection/,
        helpers.root('node_modules/@angular/core/src/facade/collection.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)errors/,
        helpers.root('node_modules/@angular/core/src/facade/errors.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)lang/,
        helpers.root('node_modules/@angular/core/src/facade/lang.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)math/,
        helpers.root('node_modules/@angular/core/src/facade/math.js')
      ),
    ],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    },

    externals: {
       canvas:'canvas',
       fs:'fs',
       jsdom:'jsdom',
       xmldom:'xmldom'
   }

  };
}
