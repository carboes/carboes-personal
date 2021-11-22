const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const jsBundle = 'js/bundle.js'

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.ts'),
  devServer: {
    compress: false,
    port: 9000,
    hot: true,
    static: {
      directory: path.join(__dirname, './'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|ttf|eot|svg|hdr|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: ['base64-inline-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html',
      title: 'AIFA Test',
      jsBundle: jsBundle,
      //glb: '/models/AllStarTest.glb',
      //type: 'brain',
      output: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jpg'],
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: jsBundle,
  },
}
