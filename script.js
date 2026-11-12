
// ===== КНОПКА =====

const button = document.getElementById("myButton");

if (button) {
    button.addEventListener("click", function() {
        alert("Ты нажала на кнопку! 💚");
    });
}


// ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====

const themeButton = document.getElementById("themeButton");

if (themeButton) {
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
}


// ===== МОБИЛЬНОЕ МЕНЮ =====

const menuButton = document.getElementById("menuButton");
const nav = document.querySelector("header nav");

if (menuButton && nav) {
    menuButton.addEventListener("click", function() {
        nav.classList.toggle("active");
        menuButton.classList.toggle("active");

        const isOpen = nav.classList.contains("active");
        menuButton.setAttribute("aria-expanded", isOpen);
    });

    nav.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
            nav.classList.remove("active");
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}


// ===== АНИМАЦИЯ БЛОКА ОБО МНЕ =====

const aboutSection = document.querySelector(".about-container");

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


// ===== АНИМАЦИЯ КАРТОЧЕК =====

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


// ===== MUSICSPACE: КАТАЛОГ =====

const tracks = [
    {
        title: "Morning Light",
        artist: "Dreamer",
        mood: "calm"
    },
    {
        title: "New Energy",
        artist: "Sound Wave",
        mood: "energy"
    },
    {
        title: "Quiet Evening",
        artist: "Moon",
        mood: "sad"
    },
    {
        title: "Green World",
        artist: "Nature",
        mood: "calm"
    },
    {
        title: "Run Forward",
        artist: "Motion",
        mood: "energy"
    },
    {
        title: "Rainy Day",
        artist: "Blue Sky",
        mood: "sad"
    }
];

const musicSearch = document.getElementById("musicSearch");
const musicGrid = document.getElementById("musicGrid");
const musicMessage = document.getElementById("musicMessage");
const moodButtons = document.querySelectorAll(".mood-filters button");

let selectedMood = "all";

function renderTracks() {
    if (!musicGrid) return;

    const searchText = musicSearch
        ? musicSearch.value.toLowerCase().trim()
        : "";

    const filteredTracks = tracks.filter(function(track) {
        const matchesSearch =
            track.title.toLowerCase().includes(searchText) ||
            track.artist.toLowerCase().includes(searchText);

        const matchesMood =
            selectedMood === "all" || track.mood === selectedMood;

        return matchesSearch && matchesMood;
    });

    musicGrid.innerHTML = "";

    if (filteredTracks.length === 0) {
        musicMessage.textContent = "Ничего не найдено. Попробуй другой запрос.";
        return;
    }

    musicMessage.textContent = "Найдено треков: " + filteredTracks.length;

    filteredTracks.forEach(function(track) {
        const card = document.createElement("article");
        card.className = "card music-card";

        const title = document.createElement("h3");
        title.textContent = "🎵 " + track.title;

        const artist = document.createElement("p");
        artist.textContent = track.artist;

        const mood = document.createElement("p");

        const moodNames = {
            calm: "Спокойствие",
            energy: "Энергия",
            sad: "Меланхолия"
        };

        mood.textContent = "Настроение: " + moodNames[track.mood];

        card.append(title, artist, mood);
        musicGrid.appendChild(card);
    });
}

if (musicSearch) {
    musicSearch.addEventListener("input", renderTracks);
}

moodButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        selectedMood = button.dataset.mood;

        moodButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");
        renderTracks();
    });
});

if (musicGrid) {
    renderTracks();
}


// ===== ЗАГРУЗКА СТРАНИЦЫ =====

window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        preloader.classList.add("hide");
    }
});



// ===== MUSICSPACE: МУЗЫКАЛЬНЫЙ КАЛЕНДАРЬ =====

const calendarDays = document.getElementById("calendarDays");
const currentMonth = document.getElementById("currentMonth");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const selectedDateText = document.getElementById("selectedDate");
const eventInput = document.getElementById("eventInput");
const addEventButton = document.getElementById("addEvent");
const eventList = document.getElementById("eventList");

if (calendarDays && currentMonth) {

    let displayedDate = new Date();
    let selectedDate = new Date();

    let events = JSON.parse(
        localStorage.getItem("musicEvents") || "{}"
    );

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function renderCalendar() {
        calendarDays.innerHTML = "";

        currentMonth.textContent = displayedDate.toLocaleDateString(
            "ru-RU",
            {
                month: "long",
                year: "numeric"
            }
        );

        const year = displayedDate.getFullYear();
        const month = displayedDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let startDay = firstDay.getDay();
        startDay = startDay === 0 ? 6 : startDay - 1;

        for (let i = 0; i < startDay; i++) {
            const empty = document.createElement("div");
            empty.className = "calendar-day empty";
            calendarDays.appendChild(empty);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateKey = formatDate(date);

            const button = document.createElement("button");
            button.className = "calendar-day";
            button.textContent = day;
            button.type = "button";

            if (dateKey === formatDate(new Date())) {
                button.classList.add("today");
            }

            if (dateKey === formatDate(selectedDate)) {
                button.classList.add("selected");
            }

            if (events[dateKey]?.length) {
                button.textContent = day + " ♪";
            }

            button.addEventListener("click", function() {
                selectedDate = date;
                renderCalendar();
                renderEvents();
            });

            calendarDays.appendChild(button);
        }
    }

    function renderEvents() {
        const dateKey = formatDate(selectedDate);

        selectedDateText.textContent = selectedDate.toLocaleDateString(
            "ru-RU",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

        eventList.innerHTML = "";

        const dayEvents = events[dateKey] || [];

        if (dayEvents.length === 0) {
            eventList.textContent = "На эту дату пока нет событий.";
            return;
        }

        dayEvents.forEach(function(event, index) {
            const item = document.createElement("div");
            item.className = "event-item";

            const text = document.createElement("span");
            text.textContent = "🎵 " + event;

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.textContent = "Удалить";
            removeButton.style.marginLeft = "12px";
            removeButton.style.cursor = "pointer";

            removeButton.addEventListener("click", function() {
                events[dateKey].splice(index, 1);

                if (events[dateKey].length === 0) {
                    delete events[dateKey];
                }

                saveEvents();
                renderCalendar();
                renderEvents();
            });

            item.append(text, removeButton);
            eventList.appendChild(item);
        });
    }

    function saveEvents() {
        localStorage.setItem("musicEvents", JSON.stringify(events));
    }

    if (prevMonth) {
        prevMonth.addEventListener("click", function() {
            displayedDate.setMonth(displayedDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextMonth) {
        nextMonth.addEventListener("click", function() {
            displayedDate.setMonth(displayedDate.getMonth() + 1);
            renderCalendar();
        });
    }

    if (addEventButton && eventInput) {
        addEventButton.addEventListener("click", function() {
            const eventName = eventInput.value.trim();

            if (!eventName) {
                alert("Сначала введи название события!");
                return;
            }

            const dateKey = formatDate(selectedDate);

            if (!events[dateKey]) {
                events[dateKey] = [];
            }

            events[dateKey].push(eventName);

            saveEvents();

            eventInput.value = "";

            renderCalendar();
            renderEvents();
        });
    }

    renderCalendar();
    renderEvents();
}

