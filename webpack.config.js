const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

console.log(__dirname)
module.exports = {
    entry: {
        index: "./src/index.js",
        a: "./src/a.js"
    },// 支持字符串或者对象，对象时为mpa
    mode: 'development',
    output: {
        path: path.resolve(__dirname, "./dist"), //必须是绝对路径
        // 常用的占位符， name hash chunkhash contenthash
        filename: "[name]-[hash:6].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "ni.html"
        }),
        new CleanWebpackPlugin()
    ]
}