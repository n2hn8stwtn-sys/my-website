const button = document.getElementById("myButton");

button.addEventListener("click", function() {
    alert("Ты нажала на кнопку! 💚");
});

const themeButton = document.getElementById("themeButton")

themeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        themeButton.textContent = "☀️ Светлая тема";
    } else {
        themeButton.textContent = "🌙 Тёмная тема";
    }
});

const menuButton = document.getElementById("menuButton"); 
const nav = document.querySelector("header nav"); 

menuButton.addEventListener("click", function() { 
    nav.classList.toggle("active"); 
    menuButton.classList.toggle("active")
});

const aboutSection = document.querySelector(".about-container")

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

if (aboutSection) {
    observer.observe(aboutSection);
}

const cards = document.querySelectorAll(".card");

const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

cards.forEach(function(card) {
    cardObserver.observe(card);
});