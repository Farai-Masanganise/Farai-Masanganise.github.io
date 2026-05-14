//Image popup
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".card-pic").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
	document.body.style.overflow = "hidden";
  });
});
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}
lightbox.addEventListener("click", () => {
	closeLightbox();
});
lightboxImg.addEventListener("click", (e) => {
  e.stopPropagation();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape"&& lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

//FooterHiding
const footer = document.getElementById('footer');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= pageHeight - 50) {
    footer.style.opacity = '1';
    footer.style.pointerEvents = 'auto';
  } else {
    footer.style.opacity = '0';
    footer.style.pointerEvents = 'none';
  }
})