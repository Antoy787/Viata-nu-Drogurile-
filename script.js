// Navigation
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Validation
const validateForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return; // Exit if form doesn't exist

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (!name || !email || !message) return; // Exit if any required elements are missing

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        let errorMessage = '';

        // Name validation
        if (!name.value || name.value.trim() === '') {
            isValid = false;
            errorMessage += 'Numele este obligatoriu.\n';
            name.classList.add('error');
        } else {
            name.classList.remove('error');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value || !emailRegex.test(email.value)) {
            isValid = false;
            errorMessage += 'Adresa de email nu este validă.\n';
            email.classList.add('error');
        } else {
            email.classList.remove('error');
        }

        // Message validation
        if (!message.value || message.value.trim() === '') {
            isValid = false;
            errorMessage += 'Mesajul este obligatoriu.\n';
            message.classList.add('error');
        } else {
            message.classList.remove('error');
        }

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Mesajul a fost trimis cu succes!');
            form.reset();
        } else {
            alert(errorMessage);
        }
    });
};

// Scroll to Top Button
const scrollToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-top';
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Add CSS for scroll to top button
const addScrollTopStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            display: none;
            font-size: 20px;
            z-index: 1000;
            transition: all 0.3s ease;
        }
        .scroll-top:hover {
            background-color: #388E3C;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
};

// Page Transitions
document.addEventListener('DOMContentLoaded', () => {
    // Create wrapper if it doesn't exist
    let wrapper = document.querySelector('.page-wrapper');
    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.className = 'page-wrapper';
        // Move all body children except header into wrapper
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const children = Array.from(document.body.children);
        children.forEach(child => {
            if (child !== header && child !== footer) {
                wrapper.appendChild(child);
            }
        });
        document.body.insertBefore(wrapper, footer);
    }
    
    // Add fade-in class when page loads
    wrapper.classList.add('fade-in');
    
    const links = document.querySelectorAll('a[href]:not([href^="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            wrapper.classList.add('fade-out');
            
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    });

    // Initialize other functions
    navSlide();
    validateForm();
    scrollToTop();
    addScrollTopStyles();

    // Button functionality for showing features
    const showFeaturesBtn = document.getElementById('showFeatures');
    const featuresSection = document.getElementById('features');

    if (showFeaturesBtn && featuresSection) {
        showFeaturesBtn.addEventListener('click', function() {
            featuresSection.classList.toggle('hidden');
            
            // Update button text based on section visibility
            if (featuresSection.classList.contains('hidden')) {
                showFeaturesBtn.textContent = 'Află De Ce';
            } else {
                showFeaturesBtn.textContent = 'Ascunde Secțiunea';
            }
            
            // Smooth scroll to features section when revealed
            if (!featuresSection.classList.contains('hidden')) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Quote Generator
    const quotes = [
        "Fiecare zi curată este o victorie în lupta cu dependența.",
        "Recuperarea nu este o destinație, ci o călătorie de fiecare zi.",
        "Puterea ta de a spune 'nu' este mai mare decât dependența.",
        "Viața fără droguri este o viață plină de posibilități.",
        "Fiecare pas către recuperare este un pas către libertate.",
        "Tu ești mai puternic decât orice substanță.",
        "Viața ta merită să fie trăită cu mintea limpede.",
        "Alege sănătatea, alege viața, alege libertatea.",
        "Fiecare zi de abstinență este o zi de victorie.",
        "Recuperarea începe cu primul pas către schimbare."
    ];

    const quoteText = document.getElementById('quote-text');
    const newQuoteBtn = document.getElementById('new-quote');

    if (quoteText && newQuoteBtn) {
        let currentQuoteIndex = 0;

        function getRandomQuote() {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * quotes.length);
            } while (newIndex === currentQuoteIndex);
            
            currentQuoteIndex = newIndex;
            return quotes[newIndex];
        }

        newQuoteBtn.addEventListener('click', () => {
            quoteText.style.opacity = '0';
            setTimeout(() => {
                quoteText.textContent = getRandomQuote();
                quoteText.style.opacity = '1';
            }, 300);
        });
    }
}); 