document.addEventListener("DOMContentLoaded", () => {
    // Initialize all components
    initScrollAnimations();
    initMap();
    initSmoothScroll();
    initHoverEffects();
    initNavbar();
    initGradientTextAnimation();
    initFormValidation();
});

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Exclude .gradient-text from scroll animations
    document.querySelectorAll('.expertise-card, .service-content, .testimonial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize map
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.warn('Map element not found');
        return;
    }

    if (typeof L === 'undefined') {
        console.warn('Leaflet library not loaded');
        return;
    }

    try {
        const map = L.map('map').setView([53.229, -4.123], 12);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap & CartoDB',
            maxZoom: 19
        }).addTo(map);

        const marker = L.marker([53.229, -4.123]).addTo(map);
        marker.bindPopup("Our mobile service area");
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Hover effects on service features
function initHoverEffects() {
    document.querySelectorAll('.service-features li').forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Hide/show navbar on scroll
function initNavbar() {
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');

    if (!navbar) {
        console.warn('Navbar element not found');
        return;
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.style.top = '-80px';
        } else {
            navbar.style.top = '0';
        }
        lastScrollY = window.scrollY;
    });
}

// Gradient text animation
function initGradientTextAnimation() {
    const gradientText = document.querySelector(".gradient-text");

    if (!gradientText) {
        console.warn('Element with class .gradient-text not found');
        return;
    }

    const originalText = gradientText.textContent.trim();
    
    if (!originalText) {
        console.warn('Element .gradient-text found but text is empty');
        return;
    }

    try {
        // Mark element as animated
        gradientText.classList.add('js-animated');
        
        console.log('Original text:', originalText);
        
        // Clear content
        gradientText.innerHTML = '';
        
        // Split text into words instead of characters
        const words = originalText.split(' ');
        let charIndex = 0;
        
        words.forEach((word, wordIndex) => {
            // Create container for word
            const wordSpan = document.createElement('span');
            wordSpan.classList.add('word-container');
            
            // Create spans for each character in word
            [...word].forEach((char) => {
                const charSpan = document.createElement('span');
                charSpan.classList.add('fade-char');
                charSpan.textContent = char;
                charSpan.style.animationDelay = `${charIndex * 0.03}s`;
                wordSpan.appendChild(charSpan);
                charIndex++;
            });
            
            gradientText.appendChild(wordSpan);
            
            // Add space after word (except last one)
            if (wordIndex < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.classList.add('fade-char');
                spaceSpan.textContent = '\u00A0'; // non-breaking space
                spaceSpan.style.animationDelay = `${charIndex * 0.03}s`;
                gradientText.appendChild(spaceSpan);
                charIndex++;
            }
        });

        console.log(`Gradient-text animation initialized for ${words.length} words`);
        
        // Check that elements were created
        setTimeout(() => {
            const createdChars = gradientText.querySelectorAll('.fade-char');
            console.log(`Created ${createdChars.length} animated characters`);
        }, 100);
        
    } catch (error) {
        console.error('Error creating gradient-text animation:', error);
        // Restore original text
        gradientText.innerHTML = originalText;
        gradientText.classList.remove('js-animated');
    }
}

// Form validation
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) {
        console.warn('Contact form not found');
        return;
    }

    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#667eea';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(255, 107, 107)') {
                this.style.borderColor = '#ccc';
            }
        });
    });
}

// Contact form functions for Belt'n'Clutch Mobile Repairs
function sendWhatsApp() {
    try {
        // Get form values
        const name = document.getElementById('name')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const car = document.getElementById('car')?.value.trim();
        const issue = document.getElementById('issue')?.value.trim();
        
        // Validate required fields
        if (!name || !phone || !car || !issue) {
            alert('Please fill in all fields before sending.');
            return;
        }
        
        // WhatsApp business number
        const whatsappNumber = '447442109885';
        
        // Create WhatsApp message
        const message = `*New Service Request - Belt'n'Clutch Mobile Repairs*

*Name:* ${name}
*Phone:* ${phone}
*Vehicle:* ${car}

*Issue Description:*
${issue}

*Service Area:* Anglesey & Gwynedd
*Speciality:* Ford EcoBoost, Timing Belts, Clutches`;
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Optional: Clear form after successful submission
        setTimeout(() => {
            if (confirm('Message sent! Would you like to clear the form?')) {
                clearForm();
            }
        }, 1000);
        
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        alert('An error occurred. Please try again or contact us directly.');
    }
}

function sendEmail() {
    try {
        // Get form values
        const name = document.getElementById('name')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const car = document.getElementById('car')?.value.trim();
        const issue = document.getElementById('issue')?.value.trim();
        
        // Validate required fields
        if (!name || !phone || !car || !issue) {
            alert('Please fill in all fields before sending.');
            return;
        }
        
        // Business email
        const businessEmail = 'mobilemechanixpro@gmail.com';
        
        // Create email subject and body
        const subject = `Service Request from ${name} - Belt'n'Clutch Mobile Repairs`;
        const body = `New Service Request - Belt'n'Clutch Mobile Repairs

Name: ${name}
Phone: ${phone}
Vehicle: ${car}

Issue Description:
${issue}

Service Area: Anglesey & Gwynedd
Speciality: Ford EcoBoost, Timing Belts, Clutches

---
This message was sent from the Belt'n'Clutch website contact form.`;
        
        // Create mailto URL
        const mailtoURL = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoURL;
        
        // Optional: Clear form after successful submission
        setTimeout(() => {
            if (confirm('Email client opened! Would you like to clear the form?')) {
                clearForm();
            }
        }, 1000);
        
    } catch (error) {
        console.error('Error opening email client:', error);
        alert('An error occurred. Please try again or contact us directly at mobilemechanixpro@gmail.com');
    }
}

// Clear form function
function clearForm() {
    const formElements = ['name', 'phone', 'car', 'issue'];
    formElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
            element.style.borderColor = '#ccc';
        }
    });
}

// Utility function to validate phone number format
function validatePhoneNumber(phone) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Utility function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
 const toggleButton = document.getElementById('theme-toggle');
  let lastScrollY = window.scrollY;

  // переключение темы
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    toggleButton.textContent =
      document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  });

  // автоскрытие при скролле вниз
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      toggleButton.classList.add('hidden');
    } else {
      toggleButton.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
  });
