// ================================================
// 1. MOBILE MENU SYSTEM 
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '☰';
            });
        });
    }
});
// ================================================
// AUTO-TYPER + TRANSLATION SYSTEM 
// ================================================

const phrasesEN = [
  "Join our FREE 5-day crash course and start speaking Japanese with confidence.",
  "Master Japanese basics quickly with expert guidance.",
  "Unlock Japanese culture and communication in just 5 days.",
  "Step into the world of Japanese language with ease."
];

const phrasesJP = [
  "無料の5日間集中コースに参加して、自信を持って日本語を話しましょう。",
  "専門家の指導で日本語の基礎をすばやく習得しましょう。",
  "わずか5日間で日本文化と言語を体験しましょう。",
  "やさしく日本語の世界へ踏み出しましょう。"
];

let phrases = phrasesEN;
let phraseIndex = 0;
let charIndex = 0;
let typing = true;
let typingTimeout; // store timeout so we can clear it

const rotatingText = document.getElementById("rotating-text");

function typeWriter() {
  if (!rotatingText) return;

  const currentPhrase = phrases[phraseIndex];

  if (typing) {
    rotatingText.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      typing = false;
      typingTimeout = setTimeout(typeWriter, 1500); // pause before deleting
      return;
    }
  } else {
    rotatingText.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      typing = true;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  // SLOWER SPEED
  // typing = true => typing letters
  // typing = false => deleting letters
  typingTimeout = setTimeout(typeWriter, typing ? 50 : 40); 
}

// Start typing
typeWriter();

// ================================================
// 2. COUNTER ANIMATION
// ================================================
const counters = document.querySelectorAll(".counter");
const speed = 200;
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / speed;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});

// ================================================
// 3. SCROLL REVEAL (FADE-IN)
// ================================================
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// ================================================
// 4. VIDEO CAROUSEL (About Page)
// ================================================
const videos = document.querySelectorAll(".carousel-video");
if (videos.length > 0) {
    let current = 0;
    let sequenceStarted = false;

    const playVideo = (index) => {
        videos.forEach(v => { v.pause(); v.currentTime = 0; });
        current = index;
        videos[current].play();
    };

    const handleVideoEnd = () => {
        current = (current + 1) % videos.length;
        playVideo(current);
    };

    videos.forEach((video, index) => {
        video.addEventListener("ended", handleVideoEnd);
        video.addEventListener("click", () => {
            videos.forEach(v => v.muted = false);
            playVideo(index);
        });
    });

    document.addEventListener('click', () => {
        if (!sequenceStarted) {
            sequenceStarted = true;
            videos.forEach(v => v.muted = false);
            playVideo(current);
        }
    }, { once: true });
}

// ================================================
// 5. DOJO FIREWORKS & AUDIO (Dojo Page)
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    const DojoSection = document.querySelector('.programs-section'); 
    if (!DojoSection) return;

    const fireworksCanvas = document.createElement('canvas');
    fireworksCanvas.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:9999; display:none;";
    document.body.appendChild(fireworksCanvas);
    const ctx = fireworksCanvas.getContext("2d");

    let fireworks = [];
    let hasPlayed = false;

    function resize() {
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Firework {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = window.innerHeight;
            this.targetY = Math.random() * (window.innerHeight / 2);
            this.exploded = false;
            this.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
            this.particles = [];
        }
        update() {
            if (!this.exploded) {
                this.y -= 4;
                if (this.y <= this.targetY) {
                    this.exploded = true;
                    for (let i = 0; i < 30; i++) {
                        this.particles.push({
                            x: this.x, y: this.y,
                            vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6,
                            alpha: 1
                        });
                    }
                }
            } else {
                this.particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.alpha -= 0.02; });
                this.particles = this.particles.filter(p => p.alpha > 0);
            }
        }
        draw() {
            if (!this.exploded) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, 3, 3);
            } else {
                this.particles.forEach(p => {
                    ctx.globalAlpha = p.alpha;
                    ctx.fillStyle = this.color;
                    ctx.fillRect(p.x, p.y, 2, 2);
                });
                ctx.globalAlpha = 1;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        fireworks.forEach((fw, i) => {
            fw.update();
            fw.draw();
            if (fw.exploded && fw.particles.length === 0) fireworks.splice(i, 1);
        });
        requestAnimationFrame(animate);
    }

    const dojoObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !hasPlayed) {
            hasPlayed = true;
            fireworksCanvas.style.display = "block";
            animate();
            let interval = setInterval(() => fireworks.push(new Firework()), 400);
            const audio = new Audio("audio/voice.mp3");
            audio.play().catch(() => {});
            setTimeout(() => { clearInterval(interval); }, 5000);
        }
    }, { threshold: 0.5 });

    dojoObserver.observe(DojoSection);
});

// ================================================
// 6. INFINITE LOGO/CARD CAROUSEL 
// ================================================
const track = document.querySelector(".carousel-track");
if (track) {
    const btnLeft = document.querySelector(".carousel-btn.left");
    const btnRight = document.querySelector(".carousel-btn.right");
    let isHovered = false;

    const cards = Array.from(track.children);
    cards.forEach(card => track.appendChild(card.cloneNode(true)));

    track.addEventListener("mouseenter", () => isHovered = true);
    track.addEventListener("mouseleave", () => isHovered = false);

    function animateCarousel() {
        if (!isHovered) {
            track.scrollLeft += 1;
            if (track.scrollLeft >= track.scrollWidth / 2) track.scrollLeft = 0;
        }
        requestAnimationFrame(animateCarousel);
    }
    animateCarousel();

    if (btnLeft && btnRight) {
        btnLeft.addEventListener("click", () => track.scrollLeft -= 300);
        btnRight.addEventListener("click", () => track.scrollLeft += 300);
    }
}