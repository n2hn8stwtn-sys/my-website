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