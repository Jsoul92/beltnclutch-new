document.addEventListener("DOMContentLoaded", () => {
    // Scroll animations
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

    // Исключаем .gradient-text из анимаций скролла
    document.querySelectorAll('.expertise-card, .service-content, .testimonial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    const map = L.map('map').setView([53.229, -4.123], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap & CartoDB',
      maxZoom: 19
    }).addTo(map);

    const marker = L.marker([53.229, -4.123]).addTo(map);
    marker.bindPopup("Our mobile service area");

    // Smooth scroll for anchor links
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

    // Hover effects on service features
    document.querySelectorAll('.service-features li').forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Hide/show navbar on scroll
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY) {
                navbar.style.top = '-100px';
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
            console.warn('Элемент с классом .gradient-text не найден');
            return;
        }

        const originalText = gradientText.textContent.trim();
        
        if (!originalText) {
            console.warn('Элемент .gradient-text найден, но текст пустой');
            return;
        }

        try {
            // Помечаем элемент как анимированный
            gradientText.classList.add('js-animated');
            
            // Сохраняем оригинальные стили для отладки
            console.log('Оригинальный текст:', originalText);
            
            // Очищаем содержимое
            gradientText.innerHTML = '';
            
            // Разбиваем текст на слова, а не на символы
            const words = originalText.split(' ');
            let charIndex = 0;
            
            words.forEach((word, wordIndex) => {
                // Создаем контейнер для слова
                const wordSpan = document.createElement('span');
                wordSpan.classList.add('word-container');
                
                // Создаем spans для каждого символа в слове
                [...word].forEach((char) => {
                    const charSpan = document.createElement('span');
                    charSpan.classList.add('fade-char');
                    charSpan.textContent = char;
                    charSpan.style.animationDelay = `${charIndex * 0.03}s`;
                    wordSpan.appendChild(charSpan);
                    charIndex++;
                });
                
                gradientText.appendChild(wordSpan);
                
                // Добавляем пробел после слова (кроме последнего)
                if (wordIndex < words.length - 1) {
                    const spaceSpan = document.createElement('span');
                    spaceSpan.classList.add('fade-char');
                    spaceSpan.textContent = '\u00A0'; // неразрывный пробел
                    spaceSpan.style.animationDelay = `${charIndex * 0.03}s`;
                    gradientText.appendChild(spaceSpan);
                    charIndex++;
                }
            });

            console.log(`Анимация gradient-text инициализирована для ${words.length} слов`);
            
            // Проверяем, что элементы созданы
            setTimeout(() => {
                const createdChars = gradientText.querySelectorAll('.fade-char');
                console.log(`Создано ${createdChars.length} анимированных символов`);
            }, 100);
            
        } catch (error) {
            console.error('Ошибка при создании анимации gradient-text:', error);
            // Восстанавливаем оригинальный текст
            gradientText.innerHTML = originalText;
            gradientText.classList.remove('js-animated');
        }
    }

    // Инициализируем анимацию текста
    initGradientTextAnimation();
});