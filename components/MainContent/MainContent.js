import "./MainContent.css";

const template = () => `
<h2 id="message"></h2>
<ul id="results"></ul>

`;

const listeners = () => {
  console.log(document.querySelector("#message"));
};

const MainContent = () => {
  document.querySelector(".main-content").innerHTML = template();
  listeners();
};

export default MainContent;
