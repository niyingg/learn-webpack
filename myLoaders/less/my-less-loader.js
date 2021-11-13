const less = require("less");

module.exports = function (source) {
    less.render(source, (e, output) => {
        this.callback(e, output.css)
        // 这里使用return 和 this.callback的效果不一样，使用return css-loader得不到资源，why？
    })
}