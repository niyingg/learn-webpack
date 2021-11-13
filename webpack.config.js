const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log(__dirname)
module.exports = {
    entry: {
        // index: "./src/index.js",
        login: "./src/login.js",
    },// 支持字符串或者对象，对象时为mpa
    mode: 'development',
    output: {
        path: path.resolve(__dirname, "./dist"), //必须是绝对路径
        // 常用的占位符， name hash chunkhash contenthash
        filename: "[name]-[chunkhash:6].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"]
            },
            {
                test: /\.js$/,
                use: path.resolve(__dirname, "./myLoaders/replace-loader")
            }
        ]
    },
    plugins: [
        // new htmlWebpackPlugin({
        //     template: "./src/index.html",
        //     filename: "ni.html",
        //     chunks: ["index"]
        // }),
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "login.html",
            chunks: ["login"]
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name]-[contenthash:6].css",
        })
    ]
}