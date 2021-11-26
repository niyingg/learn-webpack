import css from "./style/index.less";
import a from "./style/index.css";
import img from "./img/logo.png";
import axios from "axios";

axios({
  method: "get",
  url: "/api/info",
}).then(function (response) {
  console.log(response.data);
});
let image = new Image();
image.src = img;
console.log(img, "x=");
document.querySelector("#app").append(image);

// 针对css变化和js 变化的例子
// const container = document.getElementById("app");
// const btn = document.createElement("button");
// btn.innerHTML = "点击增加";
// btn.onclick = function () {
//   const div = document.createElement("div");
//   container.appendChild(div);
// };
// container.appendChild(btn);

const div = document.createElement("div");
div.innerHTML = 1;
div.onclick = function () {
  div.innerHTML = parseInt(div.innerHTML) + 1;
};
document.getElementById("app").appendChild(div);
