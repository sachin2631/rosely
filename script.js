const messages = [
  "Every petal is a little reminder that I cherish you.",
  "You are the bloom that colors my world.",
  "With you, every day feels like a garden in spring.",
  "Here is a rose for the one who makes my heart smile.",
];

const roseButton = document.getElementById("roseButton");
const surpriseButton = document.getElementById("surpriseButton");
const wishText = document.getElementById("wishText");
const particles = document.querySelector(".particles");
const noteInput = document.getElementById("noteInput");
const saveNote = document.getElementById("saveNote");
const clearNote = document.getElementById("clearNote");
const savedNote = document.getElementById("savedNote");

let messageIndex = 0;
let typingTimeout;

const typeMessage = (message) => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
  wishText.textContent = "";
  let charIndex = 0;
  const typeNext = () => {
    wishText.textContent += message[charIndex];
    charIndex += 1;
    if (charIndex < message.length) {
      typingTimeout = setTimeout(typeNext, 35);
    }
  };
  typeNext();
};

const cycleMessage = () => {
  messageIndex = (messageIndex + 1) % messages.length;
  typeMessage(messages[messageIndex]);
};

roseButton.addEventListener("click", () => {
  roseButton.classList.toggle("bloom");
  cycleMessage();
  spawnRing();
});

const spawnParticle = () => {
  const particle = document.createElement("span");
  particle.classList.add("particle");
  const size = Math.random() * 8 + 6;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${Math.random() * 4 + 6}s`;
  particle.style.animationDelay = `${Math.random() * 4}s`;
  particles.appendChild(particle);
  setTimeout(() => {
    particle.remove();
  }, 10000);
};

for (let i = 0; i < 22; i += 1) {
  spawnParticle();
}

setInterval(spawnParticle, 1200);

const showerPetals = () => {
  const roseCard = document.querySelector(".rose-card");
  for (let i = 0; i < 20; i += 1) {
    const petal = document.createElement("span");
    petal.classList.add("shower");
    petal.style.left = `${Math.random() * 90 + 5}%`;
    petal.style.animationDelay = `${Math.random() * 0.6}s`;
    roseCard.appendChild(petal);
    setTimeout(() => petal.remove(), 4000);
  }
};

const spawnRing = () => {
  const ring = document.createElement("span");
  ring.classList.add("glow-ring");
  roseButton.appendChild(ring);
  setTimeout(() => ring.remove(), 2800);
};

surpriseButton.addEventListener("click", showerPetals);

saveNote.addEventListener("click", () => {
  const value = noteInput.value.trim();
  savedNote.textContent = value
    ? `\u201c${value}\u201d`
    : "Your wish will sparkle here \ud83d\udc96";
});

clearNote.addEventListener("click", () => {
  noteInput.value = "";
  savedNote.textContent = "Your wish will sparkle here \ud83d\udc96";
});

window.addEventListener("load", () => {
  typeMessage(messages[0]);
});
