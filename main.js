import "./style.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import MainContent from "./components/MainContent/MainContent";

const initialize = () => {
  Header();
  Hero();
  MainContent();
  getPhotos("movie", "Mi Lista");
  getPhotos("series", "Últimas añadidas");
  getPhotos("documentaries", "Documentales");
  getPhotos("animation", "Animación");
  Footer();
};

const getPhotos = async (keyword, title) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${keyword}&include_adult=false&language=en-US&page=1&api_key=${
      import.meta.env.VITE_CLIENT_ID
    }`
  );
  const results = await data.json();

  const photos = results.results.filter((photo) => photo.backdrop_path);

  printPhotos(photos, title);
};

const printPhotos = (photos, title) => {
  const container = document.querySelector("#results");
  const carouselContainer = document.createElement("div");
  carouselContainer.classList.add("mylist-carousel");

  if (photos.length === 0) {
    const message = document.createElement("div");
    message.classList.add("no-results-message");
    message.innerHTML = `
    <h2 class="error-message"> Ups... parece que no tenemos lo que buscas</h2>
    <p>Tal vez te interese echar un vistazo a alguna de nuestras series estrella 😊</p>
    `;
    getPhotos("collection", "Series que te pueden interesar");
    container.appendChild(message);
  } else {
    const carouselHTML = `
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
      integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
      crossorigin="anonymous"
    />
    <div class="mylist-carousel-container">
      <div class="title"><h3>${title}</h3></div>
      <div class="mylist-prev">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </div>
      <div class="mylist-carousel-list">
        <ul class="mylist-slider-content" id="mylist-slider-content">
          ${photos
            .map((photo) => {
              const imageUrl = `https://image.tmdb.org/t/p/w500${photo.backdrop_path}`;
              const videoUrl = `https://www.themoviedb.org/tv/${photo.id}`;
              return `
              <li>
                <div>
                  <a href="${videoUrl}" target="_blank">
                    <img src="${imageUrl}" alt="${photo.original_name}" />
                  </a>
                </div>
              </li>`;
            })
            .join("")}
        </ul>
      </div>
      <div class="mylist-next">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </div>
    </div>
  `;

    carouselContainer.innerHTML = carouselHTML;
    container.appendChild(carouselContainer);
    initializeMyListCarousel(carouselContainer);
  }

  const initializeMyListCarousel = (carouselContainer) => {
    const sliderContent = carouselContainer.querySelector(
      "#mylist-slider-content"
    );
    const contentArray = sliderContent.children;
    let currentIndex = 0;
    const itemWidth = contentArray[0].clientWidth + 15;

    const smoothScroll = (targetIndex) => {
      const targetPosition = -targetIndex * itemWidth;
      const start =
        parseFloat(getComputedStyle(sliderContent).transform.split(",")[4]) ||
        0;
      const distance = targetPosition - start;
      const duration = 500;
      let startTime = null;

      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        sliderContent.style.transform = `translateX(${
          start + distance * easeInOut(progress)
        }px)`;
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      const easeInOut = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };

      requestAnimationFrame(animation);
    };

    const myListNext = () => {
      if (currentIndex < contentArray.length - 1) {
        currentIndex++;
        smoothScroll(currentIndex);
      }
    };

    const myListPrev = () => {
      if (currentIndex > 0) {
        currentIndex--;
        smoothScroll(currentIndex);
      }
    };

    carouselContainer
      .querySelector(".mylist-next")
      .addEventListener("click", myListNext);
    carouselContainer
      .querySelector(".mylist-prev")
      .addEventListener("click", myListPrev);
  };
};

initialize();

document.querySelector("#searchBtn").addEventListener("click", () => {
  const input = document.querySelector("#search-container input");
  const value = input.value;
  const container = document.querySelector("#results");
  container.innerHTML = "";
  getPhotos(value, "Resultados de Búsqueda");
  input.value = "";
});
