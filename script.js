// add class navbarDark on navbar scroll
const header = document.querySelector('.navbar');
console.log(header)
window.onscroll = function() {
    const top = window.scrollY;
    if(top >=100) {
        header.classList.add('navbarDark');
    }
    else {
        header.classList.remove('navbarDark');
    }
}
// collapse navbar after click on small devices
const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')

navLinks.forEach((l) => {
    l.addEventListener('click', () => { new bootstrap.Collapse(menuToggle).toggle() })
})

// for card carousel
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

let carouselVp = document.querySelector("#carousel-vp");

let cCarouselInner = document.querySelector("#cCarousel-inner");
let carouselInnerWidth = cCarouselInner.getBoundingClientRect().width;

let leftValue = 0;

// Variable used to set the carousel movement value (card's width + gap)
const totalMovementSize =
    parseFloat(
        document.querySelector(".cCarousel-item").getBoundingClientRect().width,
        10
    ) +
    parseFloat(
        window.getComputedStyle(cCarouselInner).getPropertyValue("gap"),
        10
    );

prev.addEventListener("click", () => {
    if (leftValue != 0) {
        leftValue -= -totalMovementSize;
        cCarouselInner.style.left = leftValue + "px";
    }
});

next.addEventListener("click", () => {
    const carouselVpWidth = carouselVp.getBoundingClientRect().width;
    if (carouselInnerWidth - Math.abs(leftValue) > carouselVpWidth) {
        leftValue -= totalMovementSize;
        cCarouselInner.style.left = leftValue + "px";
    }
});

const mediaQuery510 = window.matchMedia("(max-width: 510px)");
const mediaQuery770 = window.matchMedia("(max-width: 770px)");

mediaQuery510.addEventListener("change", mediaManagement);
mediaQuery770.addEventListener("change", mediaManagement);

let oldViewportWidth = window.innerWidth;

function mediaManagement() {
    const newViewportWidth = window.innerWidth;

    if (leftValue <= -totalMovementSize && oldViewportWidth < newViewportWidth) {
        leftValue += totalMovementSize;
        cCarouselInner.style.left = leftValue + "px";
        oldViewportWidth = newViewportWidth;
    } else if (
        leftValue <= -totalMovementSize &&
        oldViewportWidth > newViewportWidth
    ) {
        leftValue -= totalMovementSize;
        cCarouselInner.style.left = leftValue + "px";
        oldViewportWidth = newViewportWidth;
    }
}
