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

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        
        // 1. Calculate a smooth increment 
        // We use Math.max to ensure it always moves at least by 1
        const increment = Math.ceil(target / 50); 

        // 2. Dynamic Speed Logic
        let delay;
        if (target <= 10) {
            delay = 310; // Very slow (0.5s) for small numbers like 2 or 10
        } else if (target > 50) {
            delay = 80;  // Very speedy for high numbers
        } else {
            delay = 100; // Balanced speed for numbers in between
        }

        if (count < target) {
            // Update the text
            counter.innerText = count + increment;
            
            // If we accidentally go over target due to increment, fix it
            if (+counter.innerText > target) {
                counter.innerText = target;
            }

            // Call the function again with our dynamic delay
            setTimeout(updateCount, delay);
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

// =// ================================================
// 6. FIXED INFINITE CAROUSEL + WORKING BUTTONS
// ================================================
const track = document.querySelector(".carousel-track");
const btnLeft = document.querySelector(".carousel-btn.left");
const btnRight = document.querySelector(".carousel-btn.right");

if (track) {
    let isPaused = false;
    let scrollAmount = 0;

    // 1. Clone cards for the infinite loop
    const cards = Array.from(track.children);
    cards.forEach(card => track.appendChild(card.cloneNode(true)));

    // 2. The Auto-Scroll Function
    function step() {
        if (!isPaused) {
            track.scrollLeft += 1;
            if (track.scrollLeft >= track.scrollWidth / 2) {
                track.scrollLeft = 0;
            }
        }
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // 3. Button Logic (The Fix)
    const handleButtonClick = (direction) => {
        isPaused = true; // Stop auto-scroll so button can work
        const jump = 330; // Card width + gap
        
        track.scrollBy({
            left: direction === 'left' ? -jump : jump,
            behavior: 'smooth'
        });

        // Resume auto-scroll after 2 seconds of inactivity
        setTimeout(() => { isPaused = false; }, 2000);
    };

    if (btnLeft) btnLeft.addEventListener("click", () => handleButtonClick('left'));
    if (btnRight) btnRight.addEventListener("click", () => handleButtonClick('right'));

    // 4. Pause on Hover
    track.addEventListener("mouseenter", () => isPaused = true);
    track.addEventListener("mouseleave", () => isPaused = false);
}
    // ===============================================================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('teacherModal');
    const registerBtn = document.getElementById('register-btn'); // Matches the new ID
    const closeBtn = document.querySelector('.close-modal');

    if(registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
