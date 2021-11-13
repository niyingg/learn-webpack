module.exports = function (source) {
    return `
      const a = document.createElement('style');
      a.innerHTML = ${source};
      document.head.appendChild(a);
    `
}