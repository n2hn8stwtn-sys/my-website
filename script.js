const button = document.getElementById("myButton");

button.addEventListener("click", function() {
    alert("Ты нажала на кнопку! 💚");
});

const themeButton = document.getElementById("themeButton")

themeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        themeButton.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeButton.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeButton.textContent = "☀️";
}

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

window.add("load", function() {
    const preloader = document.getElementById("preloader");

    preloader.classList.add("hide");
});

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 500);
})