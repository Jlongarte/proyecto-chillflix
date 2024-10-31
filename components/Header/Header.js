import "./Header.css";

const template = () => `
<p class="logo">chillflix</p>
<div id="search-container">
        <input type="text" placeholder="Buscar...">
        <button id="searchBtn">Buscar</button>
</div>

`;

const Header = () => {
  document.querySelector("header").innerHTML = template();
};

export default Header;
