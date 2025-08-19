const links = document.querySelectorAll(".sidebar .nav a");
const sections = document.querySelectorAll("section.tab");

// Funksiya: hash dəyişdikdə aktiv linki və sekməni göstər
function setActiveFromHash() {
  const hash = window.location.hash || "#main";
  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === hash);
  });
  sections.forEach((section) => {
    section.style.display = section.id === hash.substring(1) ? "block" : "none";
  });
}

// Sidebar linklərinə klik event əlavə et
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // standart scroll-u dayandır
    const hash = link.getAttribute("href");
    window.location.hash = hash; // URL hash-i dəyiş
    setActiveFromHash(); // aktiv link və tab yenilə
  });
});

// Səhifə açıldıqda hash-ə uyğun aktiv tabı göstər
window.addEventListener("load", setActiveFromHash);
window.addEventListener("hashchange", setActiveFromHash);
