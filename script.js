/* =========================================================
   MAY ARTFOTOS
   SCRIPT.JS — PARTE 3
========================================================= */


/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

const lightboxLinks = document.querySelectorAll(".lightbox");


/* =========================================================
   ABRIR FOTO
========================================================= */

lightboxLinks.forEach((photo) => {

    photo.addEventListener("click", (event) => {

        event.preventDefault();

        const imageURL = photo.getAttribute("href");
        const title = photo.dataset.title || "";

        if (!imageURL) {
            return;
        }

        lightboxImage.src = imageURL;
        lightboxImage.alt = title;

        lightboxCaption.textContent = title;

        lightbox.classList.add("active");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    });

});


/* =========================================================
   FECHAR LIGHTBOX
========================================================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    setTimeout(() => {

        lightboxImage.src = "";
        lightboxImage.alt = "";
        lightboxCaption.textContent = "";

    }, 350);

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


/* =========================================================
   FECHAR CLICANDO FORA DA FOTO
========================================================= */

if (lightbox) {

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


/* =========================================================
   FECHAR COM ESC
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (lightbox.classList.contains("active")) {

            closeLightbox();

        }

    }

});


/* =========================================================
   ANIMAÇÃO DE ENTRADA
========================================================= */

const revealElements = document.querySelectorAll(
    ".intro, .section-heading, .category-heading, .photo-grid, .category-footer, .statement, .about, .contact"
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   LINKS INTERNOS COM SCROLL SUAVE
========================================================= */

const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
);


internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetID = link.getAttribute("href");

        if (
            !targetID ||
            targetID === "#"
        ) {
            return;
        }

        const target = document.querySelector(targetID);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   VOLTAR AO TOPO
========================================================= */

const backTop = document.querySelector(".back-top");


if (backTop) {

    backTop.addEventListener("click", (event) => {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   FECHAR LIGHTBOX AO REDIMENSIONAR
========================================================= */

window.addEventListener("resize", () => {

    if (
        window.innerWidth > 1200 &&
        lightbox.classList.contains("active")
    ) {

        closeLightbox();

    }

});


/* =========================================================
   CARREGAMENTO DA PÁGINA
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});
// =====================================================
// TRATAMENTO — ANTES / DEPOIS
// =====================================================

const treatmentToggle = document.getElementById("treatmentToggle");
const treatmentPhoto = document.getElementById("treatmentPhoto");
const treatmentLabel = document.getElementById("treatmentLabel");

let showingBefore = true;

treatmentToggle.addEventListener("click", () => {
    if (showingBefore) {
        treatmentPhoto.src = "./tratamento-depois.jpeg";
        treatmentPhoto.alt = "Tratamento fotográfico depois";
        treatmentLabel.textContent = "DEPOIS";
        showingBefore = false;
    } else {
        treatmentPhoto.src = "./tratamento-antes.jpeg";
        treatmentPhoto.alt = "Tratamento fotográfico antes";
        treatmentLabel.textContent = "ANTES";
        showingBefore = true;
    }
});