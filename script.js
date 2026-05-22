// --- QUẢN LÝ LUỒNG MÀN HÌNH ---
const introScreen = document.getElementById('hacker-intro');
const bootScreen = document.getElementById('boot-screen');
const mainContent = document.getElementById('main-content');

const delay = ms => new Promise(res => setTimeout(res, ms));

// 1. Click khởi chạy Terminal Hacker
function startHackerIntro() {
    document.getElementById('click-to-enter').style.display = 'none';
    document.getElementById('terminal-screen').style.display = 'flex';
    
    const termText = document.getElementById('terminal-text');
    const lines = [
        "$ ./auth --user=Hkaniss",
        "[AUTH] Identity verified... OK",
        "[SYS] Decrypting mainframes...",
        "[SYS] Accessing profile node...",
        "> LOADING [|||||||||||||||||||] 100%"
    ];
    
    let timeDelay = 0;
    lines.forEach((line, index) => {
        setTimeout(() => {
            termText.innerHTML += line + "<br>";
            if (index === lines.length - 1) {
                setTimeout(() => {
                    introScreen.style.opacity = '0';
                    setTimeout(() => {
                        introScreen.style.display = 'none';
                        startBootSequence(); // Kích hoạt chạy % Loading
                    }, 800);
                }, 1000);
            }
        }, timeDelay);
        timeDelay += 500; 
    });
}

// 2. Chạy Loading 0-100%
function startBootSequence() {
    bootScreen.style.display = 'flex';
    const loadText = document.getElementById('load-text');
    const sysLogs = document.getElementById('sys-logs');
    const logs = [
        "[SYS] Bypassing firewall protocols...",
        "[SYS] Loading graphical interface...",
        "[SYS] Audio driver active...",
        "[OK] ACCESS GRANTED."
    ];

    let progress = 0;
    let logIdx = 0;
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2;
        if (progress > 100) progress = 100;
        loadText.innerText = progress + "%";
        
        if (progress % 25 === 0 && logIdx < logs.length) {
            sysLogs.innerHTML += logs[logIdx] + "<br>";
            logIdx++;
        }

        if (progress >= 100) {
            clearInterval(interval);
            finishBoot();
        }
    }, 80); // Tốc độ chạy %
}

// 3. Mở Profile & Tự động phát nhạc
async function finishBoot() {
    document.getElementById('sys-logs').innerHTML += "<span style='color:#0f0'>[SUCCESS] INITIALIZATION COMPLETE</span>";
    await delay(600);
    bootScreen.style.opacity = '0';
    await delay(800);
    bootScreen.style.display = 'none';
    
    // Hiện giao diện chính
    mainContent.style.display = 'block';
    setTimeout(() => {
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'scale(1)';
        playAudio(); // Gọi nhạc chạy
    }, 50);
}

// --- QUẢN LÝ TRÌNH PHÁT NHẠC VÀ ÂM LƯỢNG ---
const audio = document.getElementById('audio-player');
const btnPlay = document.getElementById('m-play');
const btnPrev = document.getElementById('m-prev');
const btnNext = document.getElementById('m-next');
const playIcon = document.getElementById('play-icon');
const mTitle = document.getElementById('m-title');
const mStatus = document.getElementById('m-status');
const musicLogo = document.getElementById('music-logo');
const volumeSlider = document.getElementById('volume-slider');

let isPlaying = false;
const tracks = ['track1.mp3', 'track2.mp3', 'track3.mp3', 'track4.mp3', 'track5.mp3']; // Thay link file mp3 của bạn
const trackNames = ['Tuyển Bạn Gái', 'Ngày Rời Chuyến Bay', 'Không Buông', 'In Love', 'Ai Ngoài Anh'];
let trackIdx = 0;

// Khởi tạo âm lượng 50%
if(audio) audio.volume = 1;

function loadTrack(idx) {
    audio.src = tracks[idx];
    mTitle.innerText = trackNames[idx];
}

function playAudio() {
    isPlaying = true;
    audio.play().catch(e => {
        mStatus.innerText = "Error: Bị chặn Auto-play";
    });
    playIcon.className = "fa-solid fa-pause";
    mStatus.innerText = "System playing...";
    mStatus.style.color = "var(--neon-cyan)";
    musicLogo.style.animationPlayState = "running"; // Xoay logo
}

function pauseAudio() {
    isPlaying = false;
    audio.pause();
    playIcon.className = "fa-solid fa-play";
    mStatus.innerText = "Playback paused";
    mStatus.style.color = "var(--text-dim)";
    musicLogo.style.animationPlayState = "paused"; // Dừng logo
}

btnPlay.addEventListener('click', () => {
    if (isPlaying) pauseAudio();
    else playAudio();
});

btnNext.addEventListener('click', () => {
    trackIdx = (trackIdx + 1) % tracks.length;
    loadTrack(trackIdx);
    playAudio();
});

btnPrev.addEventListener('click', () => {
    trackIdx = (trackIdx - 1 + tracks.length) % tracks.length;
    loadTrack(trackIdx);
    playAudio();
});

audio.addEventListener('ended', () => {
    btnNext.click(); // Tự qua bài
});

// Xử lý kéo thanh âm thanh
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// --- QUẢN LÝ WEBHOOK GỬI TIN NHẮN ---
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1507368429395509328/2k7-99u4KQZIswwTle3AmtCV7E-6AlBUfVVwkLDesbqliolZ_jqv_8Tq9tbeHwHmzXlP'; 
const form = document.getElementById('webhook-form');
const wBtn = document.getElementById('w-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('w-name').value;
    const msg = document.getElementById('w-msg').value;

    if (WEBHOOK_URL === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
        alert("Bạn cần dán Link Webhook Discord vào dòng 127 của file script.js!");
        return;
    }

    const originalText = wBtn.innerHTML;
    wBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> SENDING...';
    wBtn.style.color = '#fff';
    wBtn.style.background = 'var(--neon-cyan)';
    wBtn.style.borderColor = 'var(--neon-cyan)';

    const payload = {
        username: "HKANISS TERMINAL",
        embeds: [{
            title: "🔔 ENCRYPTED TRANSMISSION RECEIVED",
            color: 65535, 
            fields: [
                { name: "SENDER ID", value: "`" + name + "`", inline: true },
                { name: "MESSAGE CONTENT", value: msg, inline: false }
            ],
            footer: { text: "Sent via Cyber Profile" }
        }]
    };

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        wBtn.innerHTML = '<i class="fa-solid fa-check"></i> SENT SUCCESSFULLY';
        wBtn.style.background = '#00ff00';
        wBtn.style.borderColor = '#00ff00';
        form.reset();
    } catch (err) {
        wBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> ERROR!';
        wBtn.style.background = 'var(--neon-red)';
    }

    setTimeout(() => {
        wBtn.innerHTML = originalText;
        wBtn.style = '';
    }, 3000);
});