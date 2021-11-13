// 函数 声明式函数 不能是箭头函数
//必须要有返回值
module.exports = function (source) {
    const callback = this.async();
    setTimeout(() => {
        const res = source.replace(this.query.origin, this.query.replaced)
        callback(null, res)
    }, 1000);
}