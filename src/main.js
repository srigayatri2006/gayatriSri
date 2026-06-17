import './style.css'

/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className
    
    // Optional: Close all other skill sections
    for(let i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[id]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            // We restrict tab content matching to prevent breaking modals/sections
            if(tabContent.classList.contains('qualification__content')){
                tabContent.classList.remove('qualification__active')
            }
        })
        target.classList.add('qualification__active')

        tabs.forEach(t =>{
            t.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalIndex){
    modalViews[modalIndex].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () =>{
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    modalViews.forEach((modalView) => {
        if (event.target === modalView) {
            modalView.classList.remove('active-modal')
        }
    })
})

/*==================== PORTFOLIO CAROUSEL ====================*/
const portfolioWrapper = document.querySelector('.portfolio__wrapper'),
      portfolioSlides = document.querySelectorAll('.portfolio__slide'),
      portfolioArrowLeft = document.querySelector('.portfolio__arrow-left'),
      portfolioArrowRight = document.querySelector('.portfolio__arrow-right'),
      portfolioDots = document.querySelectorAll('.portfolio__dot')

let currentPortfolioSlide = 0
const maxPortfolioSlides = portfolioSlides.length

function updatePortfolioCarousel() {
    if(portfolioWrapper) {
        portfolioWrapper.style.transform = `translateX(-${currentPortfolioSlide * 100}%)`
        
        portfolioSlides.forEach((slide, index) => {
            if (index === currentPortfolioSlide) {
                slide.classList.add('active-slide')
            } else {
                slide.classList.remove('active-slide')
            }
        })

        portfolioDots.forEach((dot, index) => {
            if (index === currentPortfolioSlide) {
                dot.classList.add('active-dot')
            } else {
                dot.classList.remove('active-dot')
            }
        })
    }
}

if(portfolioArrowRight) {
    portfolioArrowRight.addEventListener('click', () => {
        currentPortfolioSlide = (currentPortfolioSlide + 1) % maxPortfolioSlides
        updatePortfolioCarousel()
    })
}

if(portfolioArrowLeft) {
    portfolioArrowLeft.addEventListener('click', () => {
        currentPortfolioSlide = (currentPortfolioSlide - 1 + maxPortfolioSlides) % maxPortfolioSlides
        updatePortfolioCarousel()
    })
}

portfolioDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentPortfolioSlide = index
        updatePortfolioCarousel()
    })
})

/*==================== TESTIMONIAL CAROUSEL ====================*/
const testimonialWrapper = document.querySelector('.testimonial__wrapper'),
      testimonialSlides = document.querySelectorAll('.testimonial__slide'),
      testimonialDots = document.querySelectorAll('.testimonial__dot')

let currentTestimonialSlide = 0
const maxTestimonialSlides = testimonialSlides.length

function updateTestimonialCarousel() {
    if(testimonialWrapper) {
        testimonialWrapper.style.transform = `translateX(-${currentTestimonialSlide * 100}%)`
        
        testimonialSlides.forEach((slide, index) => {
            if (index === currentTestimonialSlide) {
                slide.classList.add('active-slide')
            } else {
                slide.classList.remove('active-slide')
            }
        })

        testimonialDots.forEach((dot, index) => {
            if (index === currentTestimonialSlide) {
                dot.classList.add('active-dot')
            } else {
                dot.classList.remove('active-dot')
            }
        })
    }
}

// Auto scroll testimonials
let testimonialInterval = setInterval(() => {
    if(maxTestimonialSlides > 0) {
        currentTestimonialSlide = (currentTestimonialSlide + 1) % maxTestimonialSlides
        updateTestimonialCarousel()
    }
}, 5000)

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(testimonialInterval) // stop auto-scroll on click
        currentTestimonialSlide = index
        updateTestimonialCarousel()
    })
})

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-up class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER) ====================*/
// We apply reveal targets to the sections and cards
const revealElements = [
    document.querySelector('.home__data'),
    document.querySelector('.home__img'),
    document.querySelector('.home__social'),
    document.querySelector('.about__img'),
    document.querySelector('.about__data'),
    ...document.querySelectorAll('.skills__content'),
    document.querySelector('.qualification__container'),
    ...document.querySelectorAll('.services__content'),
    document.querySelector('.portfolio__container'),
    document.querySelector('.project__container'),
    document.querySelector('.testimonial__container'),
    ...document.querySelectorAll('.contact__information'),
    document.querySelector('.contact__form')
]

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('reveal-active')
            observer.unobserve(entry.target) // Stop observing after animation triggers
        }
    })
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
})

revealElements.forEach(el => {
    if(el) {
        el.classList.add('reveal')
        revealObserver.observe(el)
    }
})

/*==================== FORM SUBMISSION SIMULATION ====================*/
const contactForm = document.querySelector('.contact__form')
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const submitBtn = contactForm.querySelector('.submit-btn')
        const originalText = submitBtn.innerHTML
        
        submitBtn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin button__icon"></i>'
        submitBtn.disabled = true
        
        setTimeout(() => {
            submitBtn.innerHTML = 'Message Sent! <i class="bx bx-check-circle button__icon"></i>'
            submitBtn.style.backgroundColor = '#2ecc71'
            contactForm.reset()
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText
                submitBtn.style.backgroundColor = ''
                submitBtn.disabled = false
            }, 3000)
        }, 1500)
    })
}

/*==================== HERO PARTICLE ANIMATION ====================*/
const initHeroParticles = () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const heroWrapper = document.querySelector('.home__hero-wrapper');
    const imgContainer = document.querySelector('.home__img-container');
    
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let heroWidth = 180;
    let particles = [];
    const particleCount = 65; // Balanced for good visuals and CPU usage
    
    // Mouse interaction states
    let mouse = { x: null, y: null, active: false, rx: null, ry: null };

    // Update canvas size and scale for retina displays
    const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        cx = width / 2;
        cy = height / 2;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        
        if (heroWrapper) {
            heroWidth = heroWrapper.clientWidth;
        }
    };

    // Initialize/Resize
    resize();
    window.addEventListener('resize', resize);

    // Track mouse movement over the image container
    if (imgContainer) {
        imgContainer.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        });

        imgContainer.addEventListener('mouseleave', () => {
            mouse.active = false;
            mouse.x = null;
            mouse.y = null;
        });
    }

    // Particle Object Definition
    class Particle {
        constructor() {
            this.reset(true);
        }

        reset(init = false) {
            const innerRadius = heroWidth / 2;
            // Spawn particles in a ring surrounding the circular hero image
            this.baseRadius = innerRadius + Math.random() * 45 + 5; 
            this.angle = Math.random() * Math.PI * 2;
            
            // Random direction and orbit speeds
            this.orbitSpeed = (0.003 + Math.random() * 0.007) * (Math.random() < 0.5 ? 1 : -1);
            
            // Wobble offsets to simulate 3D/ambient pathing
            this.wobbleSpeed = 0.01 + Math.random() * 0.02;
            this.wobbleAmplitude = 3 + Math.random() * 8;
            this.wobblePhase = Math.random() * Math.PI * 2;
            
            // Particle properties
            this.size = 0.8 + Math.random() * 2.2;
            this.alpha = init ? Math.random() * 0.6 + 0.1 : 0; // Fade in initially
            this.maxAlpha = 0.4 + Math.random() * 0.5;
            this.fadeInSpeed = 0.01 + Math.random() * 0.02;
            this.sparkleSpeed = 0.005 + Math.random() * 0.01;
            this.sparklePhase = Math.random() * Math.PI * 2;
            
            // Dynamic coordinates
            this.x = cx + Math.cos(this.angle) * this.baseRadius;
            this.y = cy + Math.sin(this.angle) * this.baseRadius;
            
            // Interactive drag coordinates
            this.offsetX = 0;
            this.offsetY = 0;
        }

        update() {
            // 1. Orbital motion
            this.angle += this.orbitSpeed;
            this.wobblePhase += this.wobbleSpeed;
            
            // Orbit distance with pulsing wobble
            const currentRadius = this.baseRadius + Math.sin(this.wobblePhase) * this.wobbleAmplitude;
            
            // Base circular path
            let targetX = cx + Math.cos(this.angle) * currentRadius;
            let targetY = cy + Math.sin(this.angle) * currentRadius;

            // 2. Mouse Interaction: Pull particles slightly towards the mouse if close
            if (mouse.active && mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - targetX;
                const dy = mouse.y - targetY;
                const dist = Math.hypot(dx, dy);
                
                if (dist < 100) {
                    // Pull strength increases closer to cursor
                    const force = (100 - dist) / 100 * 12;
                    this.offsetX += (dx / dist) * force * 0.1;
                    this.offsetY += (dy / dist) * force * 0.1;
                }
            }

            // Apply dampening to interactive offsets so they settle back to their orbits
            this.offsetX *= 0.92;
            this.offsetY *= 0.92;

            this.x = targetX + this.offsetX;
            this.y = targetY + this.offsetY;

            // 3. Opacity logic (Fade in, then sparkle/pulsate alpha)
            if (this.alpha < this.maxAlpha) {
                this.alpha += this.fadeInSpeed;
            } else {
                // Ambient sparkling effect
                this.sparklePhase += this.sparkleSpeed;
                this.alpha = this.maxAlpha * (0.6 + Math.sin(this.sparklePhase) * 0.4);
            }
        }

        draw(color) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            // Draw glowing outer particle
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = color;
            ctx.fill();
            
            // Draw a tiny core light for premium glass/neon style
            if (this.size > 1.5) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = this.alpha * 1.2;
                ctx.fill();
            }
            
            ctx.restore();
        }
    }

    // Populate particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Get current theme color from page variables
    const getThemeColor = () => {
        const styles = getComputedStyle(document.body);
        const primary = styles.getPropertyValue('--first-color').trim();
        return primary || 'hsl(250, 69%, 61%)';
    };

    let color = getThemeColor();
    let themeCheckTimer = 0;

    // Main animation loop
    let animationFrameId;
    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // Periodically verify theme color changes to avoid running getComputedStyle every frame
        themeCheckTimer++;
        if (themeCheckTimer % 30 === 0) {
            color = getThemeColor();
        }

        // Draw and update particles
        particles.forEach(p => {
            p.update();
            p.draw(color);
        });

        animationFrameId = requestAnimationFrame(animate);
    };

    // Intersection Observer to stop the loop when out of viewport (optimized CPU usage)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
            } else {
                cancelAnimationFrame(animationFrameId);
            }
        });
    }, { threshold: 0.05 });

    const homeSection = document.getElementById('home');
    if (homeSection) {
        observer.observe(homeSection);
    } else {
        animate();
    }
};

// Start particles on document load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroParticles);
} else {
    initHeroParticles();
}
