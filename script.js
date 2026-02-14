const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const message = document.getElementById("message");
const buttonsBox = document.querySelector(".buttons");
const nowPlaying = document.getElementById("nowPlaying");
const songImg = document.getElementById("songImg");
const songText = document.getElementById("songText");
const confettiContainer = document.getElementById("confetti-container");
let yesChosen = false;
let noSongStarted = false;
let audioUnlocked = false;
const yesWrap = document.getElementById("yesWrap");
const noWrap = document.getElementById("noWrap");


// 🎵 Audio elements (make sure these IDs exist in index.html)
const noSong = document.getElementById("noSong");
const yesSong = document.getElementById("yesSong");

let noClickCount = 0;
let yesScale = 1;
let noScale = 1;

const noTexts = [
  "No 🙃",
  "Are you sure?",
  "Whtttt?? 😐",
  "Pkkaaa??? 🤨",
  "Hddd heii 😭",
  "NOO??? 😢",
  "Sochh Looo 😵",
  "💔💔"
];

const yesTexts = [
  "Yes 💘",
  "Obviously Haan 💖",
  "Haanji!! 🥰🥰",
  "You know you want to 😏💕",
  "Just say YES 🥰",
  "Yess Yess Yess!!! 😭",
  "YES IT IS!!! 😙",
  "Ji Pkkaaa!! 💕💖",
  "Yess Babbyy 💘🥰"
];

function unlockAudio() {
  if (audioUnlocked) return;

  noSong.muted = true;
  noSong.play().then(() => {
    noSong.pause();
    noSong.currentTime = 0;
    noSong.muted = false;
    audioUnlocked = true;
  }).catch(() => {});
}

function launchConfetti() {
  const colors = ["#ff4d6d", "#ff9a9e", "#fad0c4", "#fff", "#ffccd5"];

  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
    confetti.style.width = 6 + Math.random() * 6 + "px";
    confetti.style.height = 8 + Math.random() * 10 + "px";

    confettiContainer.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}

function getRandomText(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function launchConfettiMultiple(times, gap = 300) {
  for (let i = 0; i < times; i++) {
    setTimeout(() => {
      launchConfetti();
    }, i * gap);
  }
}

function moveNoButton() {
  const boxRect = buttonsBox.getBoundingClientRect();
  const btnRect = noWrap.getBoundingClientRect();

  const padding = 12;

  const maxX = boxRect.width - btnRect.width - padding;
  const maxY = boxRect.height - btnRect.height - padding;

  const x = padding + Math.random() * maxX;
  const y = padding + Math.random() * maxY;

  noWrap.style.left = `${x}px`;
  noWrap.style.top = `${y}px`;
}

noBtn.addEventListener("pointerdown", () => {
  unlockAudio();
  // 🎵 play NO song (only once)
  if (!yesChosen && !noSongStarted) {
    noSong.volume = 0.5;
    noSong.play();
    noSong.play().catch(err => {
      console.log("NO song play blocked:", err);
    })
    noSongStarted = true;

    nowPlaying.style.display = "flex";
    songImg.src = "no.jpg.jpeg";
    songText.innerText = "Playing : Ahista from Laila Majnu";
  }

  noClickCount++;

  // Resize logic
  yesScale += 0.4;
  noScale = Math.max(0.3, noScale - 0.05);

  yesWrap.style.transform = `scale(${yesScale})`;
  noWrap.style.transform = `scale(${noScale})`;


  // Text change
  noBtn.innerText = getRandomText(noTexts);
  yesBtn.innerText = getRandomText(yesTexts);

  // Move AFTER logic
  setTimeout(moveNoButton, 60);

  if (noClickCount >= 7) {
    noWrap.style.display = "none";
  }
});


// 📱 Mobile support


// 💖 YES button logic
yesBtn.addEventListener("click", () => {
  // Stop NO sound
  noSong.pause();
  noSong.currentTime = 0;
  

  // ▶️ Play YES song
  if (!yesChosen) {
    noSong.pause();
    noSong.currentTime = 0;

    yesSong.currentTime = 0;
    yesSong.volume = 0.6;
    yesSong.play();

    nowPlaying.style.display = "flex";
    songImg.src = "yes.jpg.jpeg";
    songText.innerText = "Playing : O Meri Laila from Laila Majnu";

    yesChosen = true; // 🔒 lock AFTER switch
  }

  launchConfettiMultiple(15, 300);
  // UI changes
  question.style.display = "none";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";

  // ✅ Show big centered message
  message.classList.add("final-message");

  message.innerHTML = `
  <div style="font-size:2.3rem; font-weight:700;">YAYYYYYY 💘🥰</div>
  <div style="font-size:2.3rem; font-weight:700;">I KNEWWWW ITT 😙😙💜</div>
  <div style="font-size:2.3rem; font-weight:700;">Love Youuuu❤️💛💕💝💜</div>
  <div style="margin-top:14px;">Sooo Pasta 🍝 or Pizza 🍕 Date?? 😆</div>
  <div style="margin-top:8px; opacity:0.9;">Ik you are gonna choose Pizza 😏😏</div>
`;

});







