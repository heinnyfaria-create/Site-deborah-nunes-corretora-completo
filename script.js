/* MENU DO CELULAR: abre e fecha os links. */
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const menuIsOpen = mobileMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(menuIsOpen));
    menuButton.setAttribute("aria-label", menuIsOpen ? "Fechar menu" : "Abrir menu");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
    });
  });
}

/* ANO AUTOMÁTICO NO RODAPÉ. */
const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();

/* ANIMAÇÕES AO ROLAR A PÁGINA. */
const elementsToReveal = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  elementsToReveal.forEach((element) => revealObserver.observe(element));
} else {
  elementsToReveal.forEach((element) => element.classList.add("is-visible"));
}
/* ================================================================
   CARROSSEL AUTOMÁTICO DOS EMPREENDIMENTOS

   As imagens são carregadas usando:
   - pasta informada no HTML;
   - quantidade informada no HTML;
   - nomes numerados como 01.webp, 02.webp e 03.webp.
   ================================================================ */

const propertyCarousels =
  document.querySelectorAll("[data-carousel]");

propertyCarousels.forEach((carousel) => {
  const folder = carousel.dataset.folder;
  const totalImages = Number(carousel.dataset.total);
  const propertyName = carousel.dataset.name;

  const previousButton =
    carousel.querySelector(".carousel-prev");

  const nextButton =
    carousel.querySelector(".carousel-next");

  const counter =
    carousel.querySelector(".carousel-counter");

  const currentNumber =
    carousel.querySelector("[data-current]");

  const totalNumber =
    carousel.querySelector("[data-count]");

  const imageFragment = document.createDocumentFragment();

  /* Cria automaticamente todas as imagens */
  for (let index = 1; index <= totalImages; index++) {
    const image = document.createElement("img");

    const fileNumber =
      String(index).padStart(2, "0");

    image.className = "property-slide";

    image.src =
      `${folder}/${fileNumber}.webp`;

    image.alt =
      `${propertyName} — foto ${index}`;

    /* Carrega as outras imagens conforme necessário */
    image.loading =
      index === 1 ? "eager" : "lazy";

    if (index === 1) {
      image.classList.add("is-active");
    }

    imageFragment.appendChild(image);
  }

  /* Coloca as imagens dentro do carrossel */
  carousel.prepend(imageFragment);

  const slides =
    carousel.querySelectorAll(".property-slide");

  let currentSlide = 0;

  totalNumber.textContent = slides.length;

  function showSlide(slideNumber) {
    slides.forEach((slide, index) => {
      slide.classList.toggle(
        "is-active",
        index === slideNumber
      );
    });

    currentNumber.textContent = slideNumber + 1;
  }

  /* Se existir apenas uma foto, esconde os controles */
  if (slides.length <= 1) {
    previousButton.hidden = true;
    nextButton.hidden = true;
    counter.hidden = true;
    return;
  }

  previousButton.addEventListener("click", () => {
    currentSlide =
      (currentSlide - 1 + slides.length) %
      slides.length;

    showSlide(currentSlide);
  });

  nextButton.addEventListener("click", () => {
    currentSlide =
      (currentSlide + 1) %
      slides.length;

    showSlide(currentSlide);
  });
});