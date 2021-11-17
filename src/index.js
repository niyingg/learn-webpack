import css from "./style/index.less";
import a from "./style/index1.css";
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
console.log("test");
