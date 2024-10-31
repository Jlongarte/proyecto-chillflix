import "./Hero.css";

const template = () => `
  <div class="hero-slider">
    <div class="slide active" style="background-image: url('');">
      <div class="slide-content">
        <p class="category">EXPLORA</p>
        <h1 class="title">SERIES PARA MARATONEAR</h1>
      </div>
    </div>
    <div class="slide" style="background-image: url('https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/68e5d2b4-b8bd-4ac3-8d24-0d4ab9f661d5/compose?format=webp&label=hero_carousel_none_300&width=2880');">
      <div class="slide-content">
        <p class="category">COLECCIÓN</p>
        <h1 class="title">TODOS LOS CLÁSICOS</h1>
      </div>
    </div>
    <div class="slide" style="background-image: url('https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/23395A36BB3ED9D470C7DAD9F7505DA02D2A3F6B835836EBC02EE5E3DD198077/compose?format=webp&label=hero_carousel_none_300&width=2880');">
      <div class="slide-content">
        <p class="category">NUEVO</p>
        <h1 class="title">CINE DE AUTOR</h1>
      </div>
    </div>

    <div class="slide" style="background-image: url('https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/1AB2965C5F230407C8E91E6D14269FBD3F4ED99D10C2B0C7C8CBC12D392B0578/compose?format=webp&width=2880');">
      <div class="slide-content">
        <p class="category">RECOMENDADO</p>
        <h1 class="title">PELÍCULAS PARA VER EN FAMILIA</h1>
      </div>
    </div>

    <div class="slider-pagination">
      <span class="dot active" onclick="currentSlide(1)"></span>
      <span class="dot" onclick="currentSlide(2)"></span>
      <span class="dot" onclick="currentSlide(3)"></span>
      <span class="dot" onclick="currentSlide(4)"></span>
    </div>
    
    <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
    <a class="next" onclick="changeSlide(1)">&#10095;</a>
  </div>
`;

const Hero = () => {
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.innerHTML = template();

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    function showSlide(index) {
      slides[currentIndex].classList.remove("active");
      dots[currentIndex].classList.remove("active");
      currentIndex = index;
      slides[currentIndex].classList.add("active");
      dots[currentIndex].classList.add("active");
    }

    function showNextSlide() {
      showSlide((currentIndex + 1) % slides.length);
    }

    window.currentSlide = (index) => {
      showSlide(index - 1);
    };

    window.changeSlide = (n) => {
      showSlide((currentIndex + n + slides.length) % slides.length);
    };

    setInterval(showNextSlide, 3000);
  } else {
    console.error("No se encontró el contenedor '.hero'");
  }
};

export default Hero;
