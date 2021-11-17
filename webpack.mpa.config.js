const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { glob } = require("glob");

const setMpa = () => {
  const file = glob.sync(path.join(__dirname, "./src/*/index.js"));
  const entry = {};
  const htmlWebpackPlugins = [];
  file.map((item, index) => {
    const entryitem = item;
    const match = entryitem.match(/src\/(.*)\/index\.js$/);
    const pageName = match[1];
    entry[pageName] = entryitem;
    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        template: `./src/${pageName}/index.html`,
        filename: `${pageName}.html`,
        chunks: [pageName],
      })
    );
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMpa();
module.exports = {
  // entry: {
  //     index: "./src/index.js",
  //     // login: "./src/login.js",
  // },
  entry,
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"), //必须是绝对路径
    // 常用的占位符， name hash chunkhash contenthash
    filename: "[name]-[chunkhash:6].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.js$/,
        use: [
          "replace-loader",
          {
            loader: "replace-loader-async",
            options: {
              origin: "ho",
              replaced: "fun",
            },
          },
        ],
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
  resolveLoader: {
    modules: ["./node_modules", "./myLoaders", "./myLoaders/less"],
  },
  plugins: [
    // new htmlWebpackPlugin({
    //     template: "./src/index.html",
    //     filename: "index.html",
    //     chunks: ["index"]
    // }),
    // new htmlWebpackPlugin({
    //     template: "./src/index.html",
    //     filename: "login.html",
    //     chunks: ["login"]
    // }),
    ...htmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash:6].css",
    }),
  ],
  devtool: "cheap-module-eval-source-map",
};
