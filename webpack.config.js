const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[hash:6].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              limit: 2048, // file-loader 不支持
            },
          },
        ],
      },
      {
        test: /\.woff2$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[path][name].[ext]",
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:8083/",
      },
    },
    hot: true,
  },
  resolveLoader: {
    modules: ["./node_modules", "./myLoaders"],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new CleanWebpackPlugin(),
    // new miniCssExtractPlugin({
    //   filename: "css/index-[hash:6].css",
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "inline-source-map",
};
