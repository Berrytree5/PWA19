const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { url } = require('inspector');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Add HtmlWebpackPlugin to generate HTML files
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      new HtmlWebpackPlugin({
        template: './src/install.html',
        filename: 'install.html',
        chunks: ['install'],
      }),

      // Add WebpackPwaManifest for manifest file
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Creates notes with or without active connection',
        background_color: '#ffffff',
        theme_color: '#2196F3',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'logo'),
          },
        ],
      }),

      // Add InjectManifest for service worker
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'src-sw.js',
      }),
    ],

    module: {
      rules: [
        // Add CSS loader
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        // Add Babel loader
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],

                plugins: [
                          "@babel/plugin-proposal-object-rest-spread",

                          "@babel/transorm-runtime",
                ]
            },
          },
        },
      ],
    },
  };
};
