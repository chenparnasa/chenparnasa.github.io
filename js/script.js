//---------------- Mobile Nav ----------------//
let mouseCursor = null;
let cursorMoveBound = false;

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.all-links li');

    if (!burger || !nav) return;

    if (burger.dataset.bound === 'true') return;
    burger.dataset.bound = 'true';

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        document.body.classList.toggle('menu-open');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index * 0.1 + 0.2}s`;
            }
        });

        burger.classList.toggle('toggle');
    });
};

//---------------- Active Link State ----------------//
function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop();
    const currentPage = (currentPath === "" || currentPath === "index.html") ? "index.html" : currentPath;

    const navLinks = document.querySelectorAll('.all-links a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split("/").pop();
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
}

//---------------- Mouse Cursor & Parallax ----------------//
function cursor(e) {
    const blobWrapper = document.querySelector('.blob-wrapper');
    if (blobWrapper) {
        const x = (e.clientX - window.innerWidth / 2) / 1.2;
        const y = (e.clientY - window.innerHeight / 2) / 1.2;
        const rotate = (e.clientX - window.innerWidth / 2) * 0.02;
        blobWrapper.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
    }

    const heroText = document.getElementById('hero-dynamic-text');
    if (heroText) {
        const tx = -(e.clientX - window.innerWidth / 2) / 60;
        const ty = -(e.clientY - window.innerHeight / 2) / 60;
        heroText.style.translate = `${tx}px ${ty}px`;
    }
}

function bindCursorHover(elements) {
    elements.forEach((link) => {
        link.addEventListener('mouseleave', () => {
            if (mouseCursor) mouseCursor.classList.remove('link-grow');
        });
        link.addEventListener('mouseover', () => {
            if (mouseCursor) mouseCursor.classList.add('link-grow');
        });
    });
}

//---------------- Email Utility ----------------//
function initEmailButton() {
    const emailBtn = document.querySelector('.email-trigger');
    if (!emailBtn) return;
    emailBtn.addEventListener('click', function() {
        const email = this.getAttribute('data-email');
        navigator.clipboard.writeText(email);
        const original = this.textContent;
        this.textContent = 'Copied';
        setTimeout(() => this.textContent = original, 2000);
    });
}

//---------------- Text Rotation (Hero Animation) ----------------//
function initTextRotation() {
    const heroElement = document.getElementById("hero-dynamic-text");
    if (!heroElement) return;

    const phrases = [
      'End-to-end<br>product designer',
      'Solving complex<br>problems',
      'Building digital<br>solutions'
    ];

    let currentIndex = 0;

    function rotate() {
        heroElement.animate([
            { filter: 'blur(0px)', opacity: 1 },
            { filter: 'blur(20px)', opacity: 0 },
            { filter: 'blur(0px)', opacity: 1 }
        ], {
            duration: 1200,
            easing: 'ease-in-out'
        });

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % phrases.length;
            heroElement.innerHTML = phrases[currentIndex];
        }, 600); 
    }

    setInterval(rotate, 4500);
}

//---------------- Lottie Lazy Load ----------------//
window.addEventListener('load', () => {
    setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
      document.body.appendChild(script);
  
      script.onload = () => {
        const player = document.getElementById('sites-anim');
        player.addEventListener('mouseenter', () => player.play());
        player.addEventListener('mouseleave', () => player.stop());
      };
  
    }, 3000);
  });

//---------------- Back to Top ----------------//

function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

//---------------- Scroll Spy (Project TOC) ----------------//
function initProjectTOC() {
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.project-toc a').forEach(link => {
                    link.classList.remove('active-link');
                });
                
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.project-toc a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active-link');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-section').forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll('.project-toc a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.project-toc a').forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');
        });
    });
}

//---------------- Video Replay ----------------//
function initVideoReplay() {
    const videoWrappers = document.querySelectorAll('.video-container');

    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        const btn = wrapper.querySelector('.replay-btn');

        if (!video || !btn) return;

        video.addEventListener('ended', () => {
            btn.style.display = 'block';
        });

        btn.addEventListener('click', () => {
            btn.style.display = 'none';
            video.currentTime = 0;
            video.play();
        });
    });
}

//---------------- Main Initialization ----------------//
function initInteractions() {
    mouseCursor = document.querySelector('.cursor');

    if (!cursorMoveBound) {
        window.addEventListener('mousemove', cursor);
        cursorMoveBound = true;
    }

    const navLinksEls = document.querySelectorAll('.nav-links li');
    const scrollDownEls = document.querySelectorAll('.scroll-down');
    const creditLinksEls = document.querySelectorAll('.credits a');
    const sideLinksEls = document.querySelectorAll('.side-link');

    navSlide();
    setActiveNavLink();
    bindCursorHover(navLinksEls);
    bindCursorHover(scrollDownEls);
    bindCursorHover(creditLinksEls);
    bindCursorHover(sideLinksEls);
    
    initEmailButton();
    initTextRotation();
    initBackToTop()
    initProjectTOC();
    initVideoReplay();
}

// Listen for fragment loading
document.addEventListener('site:fragments-loaded', initInteractions);

// Initial start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractions);
} else {
    initInteractions();
}

//---------------- Image Protection ----------------//
document.addEventListener('contextmenu', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
}, false);

document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
}, false);