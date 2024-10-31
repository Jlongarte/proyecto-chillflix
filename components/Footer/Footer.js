import "./Footer.css";

const template = () => `
<img src="" alt=""/>
<nav>
    <ul>
        <li>Aviso Legal</li>
        <li>Política de Privacidad</li>
        <li>Politica de Cookies</li>
        <li>Términos de Uso</li>
        <li>Ayuda</li>
        <li>Empleo</li>
    </ul>
</nav>
<p><span><a href="https://www.linkedin.com/in/%F0%9F%92%BB-janire-gonzalez-13aa78258/" target="_blank">&copy;Garayoa.</a></span> Todos los derechos reservados</p>
`;

const Footer = () => {
  document.querySelector("footer").innerHTML = template();
};

export default Footer;
