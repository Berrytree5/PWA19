// Import necessary modules and plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Create and export the Webpack configuration
module.exports = () => {
  return {
    // Set the build mode
    mode: 'development',

    // Define the entry points for your application
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },

    // Configure the output for your bundled files
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    // Configure and add plugins to your Webpack configuration
    plugins: [
      // HtmlWebpackPlugin generates HTML and injects bundles
      new HtmlWebpackPlugin({
        template: './index.html', // Use this HTML template
        title: 'Text Editor', // Set the title
      }),

      // InjectManifest adds a custom service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Service worker source file
        swDest: 'src-sw.js', // Destination for the service worker
      }),

      // WebpackPwaManifest generates a manifest file
      new WebpackPwaManifest({
        fingerprints: false, // Disable fingerprints
        inject: true, // Inject into HTML
        name: 'Just another text editor', // App name
        short_name: 'JATE', // Short name
        description: 'Just another text editor!', // Description
        background_color: '#225ca3', // Background color
        theme_color: '#225ca3', // Theme color
        start_url: '/', // Start URL
        publicPath: '/', // Public path
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Icon source
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join("assets", "icons"), // Destination path
          },
        ],
      }),
    ],

    // Configure modules and loaders
    module: {
      rules: [
        // Load CSS files with style-loader and css-loader
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        // Transpile JavaScript files with Babel
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime"
              ]
            }
          }
        }
      ],
    },
  };
};
