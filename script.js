import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const countdownElement = document.getElementById('countdown');
const messageElement = document.getElementById('message');
const newYearMessageElement = document.getElementById('new-year-message');
const wishElement = document.getElementById('wish');
const musicToggle = document.getElementById('music-toggle');
const restartButton = document.getElementById('restart');
const confettiContainer = document.getElementById('confetti');
const visitorCountElement = document.getElementById('visitor-count');
const liveViewersElement = document.getElementById('live-viewers');

const wishes = [
    "May this year bring new happiness, new goals, new achievements, and a lot of new inspirations in your life.",
    "Wishing you a year fully loaded with happiness.",
    "May the new year bring you warmth, love, and light to guide your path to a positive destination.",
    "Here’s wishing you all the joy of the season. Have a Happy New Year!",
    "Wishing you a Happy New Year with the hope that you will have many blessings in the year to come."
];

const translations = [
    "Happy New Year!",
    "Feliz Año Nuevo!",
    "Bonne Année!",
    "Frohes Neues Jahr!",
    "Buon Anno!",
    "Feliz Ano Novo!",
    "С Новым Годом!",
    "Feliz Año Nuevo!",
    "新年快乐!",
    "明けましておめでとうございます!",
    "새해 복 많이 받으세요!",
    "Frohes Neues Jahr!",
    "Feliz Año Nuevo!",
    "Bonne Année!",
    "Feliz Ano Novo!",
    "С Новым Годом!",
    "Buon Anno!",
    "新年快乐!",
    "明けましておめでとうございます!",
    "새해 복 많이 받으세요!"
];

const fireworkSound = new Audio('firework-sound.mp3');
const backgroundMusic = new Audio('background-music.mp3');
backgroundMusic.loop = true;

function updateCountdown() {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, 0, 1);
    const timeDifference = nextYear - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (timeDifference > 0) {
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        clearInterval(countdownInterval);
        countdownElement.classList.add('hidden');
        messageElement.classList.remove('hidden');
        wishElement.textContent = wishes[Math.floor(Math.random() * wishes.length)];
        newYearMessageElement.textContent = translations[Math.floor(Math.random() * translations.length)];
        startFireworks();
        startConfetti();
    }

    if (timeDifference <= 10000 && timeDifference > 0) {
        document.getElementById('countdown').textContent = seconds;
        speakCountdown(seconds);
    }
}

function speakCountdown(seconds) {
    const utterance = new SpeechSynthesisUtterance(seconds.toString());
    speechSynthesis.speak(utterance);
}

function startFireworks() {
    const fireworks = document.querySelectorAll('.firework');
    fireworks.forEach(firework => {
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
    });
    fireworkSound.play();
}

function startConfetti() {
    for (let i = 0; i < 100; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        confettiPiece.style.left = `${Math.random() * 100}%`;
        confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confettiPiece);
    }
}

musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = 'Pause Music';
    } else {
        backgroundMusic.pause();
        musicToggle.textContent = 'Play Music';
    }
});

restartButton.addEventListener('click', () => {
    location.reload();
});

async function updateVisitorCount() {
    const visitorDoc = doc(db, "stats", "visitorCount");
    const visitorSnapshot = await getDoc(visitorDoc);

    if (visitorSnapshot.exists()) {
        await updateDoc(visitorDoc, {
            count: increment(1)
        });
        const updatedSnapshot = await getDoc(visitorDoc);
        visitorCountElement.textContent = updatedSnapshot.data().count;
    } else {
        await setDoc(visitorDoc, {
            count: 20000
        });
        visitorCountElement.textContent = 20000;
    }
}

function updateLiveViewers() {
    // Placeholder for live viewers count
    liveViewersElement.textContent = Math.floor(Math.random() * 9000) + 1135;
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
updateVisitorCount();
updateLiveViewers();
