document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const projectItems = document.querySelectorAll('.project-item');
    const skillItems = document.querySelectorAll('.skill-item');
    const contactItems = document.querySelectorAll('.contact-item');

    const line1 = document.getElementById('typing-line-1');
    const line2 = document.getElementById('typing-line-2');
    const line3 = document.getElementById('typing-line-3');
    const line4 = document.getElementById('typing-line-4');

    if (line1) line1.classList.add('line-1');
    if (line2) line2.classList.add('line-2');
    if (line3) line3.classList.add('line-3');
    if (line4) line4.classList.add('line-4');

    const text1 = 'Hello, I\'m';
    const text2 = '<span class="shiny-text" id="shiny-name">小羊星冰乐</span>';
    const text3 = '<span class="highlight">安理计算机28届学子</span> | 后端开发者，正在努力学习AI Coding中...';
    const text4 = '每一步向前，都在成为更好的自己。Let\'s build something amazing together.';

    let currentLine = 1;
    let currentText = text1;
    let currentElement = line1;
    let currentChar = 0;

    const typeNext = () => {
        if (!currentElement) return;

        if (currentChar >= currentText.length) {
            if (currentLine === 1) {
                currentLine = 2;
                currentText = text2;
                currentElement = line2;
                currentChar = 0;
                setTimeout(typeNext, 200);
                return;
            } else if (currentLine === 2) {
                currentLine = 3;
                currentText = text3;
                currentElement = line3;
                currentChar = 0;
                setTimeout(typeNext, 200);
                return;
            } else if (currentLine === 3) {
                currentLine = 4;
                currentText = text4;
                currentElement = line4;
                currentChar = 0;
                setTimeout(typeNext, 200);
                return;
            } else {
                return;
            }
        }

        const char = currentText[currentChar];
        
        if (char === '<') {
            const tagEnd = currentText.indexOf('>', currentChar);
            if (tagEnd !== -1) {
                currentElement.innerHTML += currentText.substring(currentChar, tagEnd + 1);
                currentChar = tagEnd + 1;
            }
        } else {
            currentElement.innerHTML += char;
            currentChar++;
        }

        setTimeout(typeNext, 40);
    };

    setTimeout(typeNext, 500);

    const mapMarkers = document.querySelectorAll('.map-marker');
    mapMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            showCityInfo(city);
        });
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });

    projectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(15px)';

        setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });

    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translate(-2px, -2px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0, 0)';
        });
    });

    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 20;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');

        if (!isNaN(parseInt(text))) {
            const targetValue = parseInt(text);
            let currentValue = 0;
            const increment = targetValue / 30;
            const duration = 1000;
            const stepTime = duration / 30;

            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    stat.textContent = text;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(currentValue) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                }
            }, stepTime);
        }
    });

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const header = document.querySelector('.header');

        if (header && scrollY > 50) {
            header.style.transform = 'translateY(0)';
        }
    });

    const btnPrimary = document.querySelector('.btn-primary');
    if (btnPrimary) {
        btnPrimary.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(15);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);

            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

function showCityInfo(city) {
    const cityPanel = document.getElementById('cityPanel');
    const cityName = document.getElementById('cityName');
    const cityContent = document.getElementById('cityContent');

    const cityInfo = {
        '北京': '中华人民共和国首都，历史悠久的古都，2023年春天第一次来到这里，参观了故宫和长城。',
        '上海': '国际化大都市，中国经济中心，2022年出差去过外滩和陆家嘴。',
        '广州': '南方重要城市，美食天堂，2021年旅游品尝了正宗的粤菜。',
        '深圳': '中国硅谷，科技创新中心，多次出差到此，感受科技的力量。',
        '成都': '天府之国，美食之都，2023年秋天去了宽窄巷子和大熊猫基地。',
        '杭州': '人间天堂，西湖美景，2022年夏天游览了西湖十景。',
        '西安': '十三朝古都，兵马俑所在地，2021年冬天参观了兵马俑博物馆。',
        '厦门': '海滨城市，文艺气息浓厚，2023年春天去了鼓浪屿。',
        '重庆': '山城，火锅之都，2022年秋天体验了长江索道。',
        '南京': '六朝古都，历史名城，2021年春天参观了中山陵。',
        '武汉': '九省通衢，英雄城市，2022年出差到此，感受了热干面的魅力。',
        '长沙': '娱乐之都，美食之城，2023年夏天吃了正宗的臭豆腐。'
    };

    cityName.textContent = city;
    cityContent.innerHTML = `<p>${cityInfo[city] || '暂无详细信息'}</p>`;
    
    if (cityPanel) {
        cityPanel.style.display = 'block';
    }
}

function closeCityPanel() {
    const cityPanel = document.getElementById('cityPanel');
    if (cityPanel) {
        cityPanel.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    const modal = document.getElementById('modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.getElementById('modalImage');

    galleryCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && modalImage) {
                modalImage.src = img.src;
                modalImage.alt = img.alt || '照片';
            }

            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                if (modalImage) {
                    modalImage.src = '';
                }
            }
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                if (modalImage) {
                    modalImage.src = '';
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.getElementById('projects-scroll');
    if (!scrollContainer) return;

    const items = scrollContainer.querySelectorAll('.scroll-stack-item');
    const wrapper = scrollContainer.querySelector('.scroll-stack-wrapper');
    const endElement = scrollContainer.querySelector('.scroll-stack-end');

    const config = {
        itemDistance: 80,
        itemScale: 0.04,
        baseScale: 0.85,
        stackPosition: '20%',
        scaleEndPosition: '10%'
    };

    let lenis = null;
    let rafId = null;
    let lastTransforms = new Map();

    const parsePercentage = (value, containerHeight) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value);
    };

    const calculateProgress = (scrollTop, start, end) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    };

    const getElementOffset = (element) => {
        return element.offsetTop;
    };

    const updateTransforms = () => {
        if (!items.length) return;

        const scrollTop = scrollContainer.scrollTop;
        const containerHeight = scrollContainer.clientHeight;
        const stackPositionPx = parsePercentage(config.stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(config.scaleEndPosition, containerHeight);

        const endElementTop = endElement ? getElementOffset(endElement) : 0;

        items.forEach((card, i) => {
            if (!card) return;

            const cardTop = getElementOffset(card);
            const triggerStart = cardTop - stackPositionPx - config.itemDistance * i;
            const triggerEnd = cardTop - scaleEndPositionPx;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = config.baseScale + i * config.itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);

            const newTransform = {
                scale: Math.round(scale * 1000) / 1000
            };

            const lastTransform = lastTransforms.get(i);
            const hasChanged = !lastTransform || Math.abs(lastTransform.scale - newTransform.scale) > 0.001;

            if (hasChanged) {
                const transform = `scale(${newTransform.scale})`;
                card.style.transform = transform;
                lastTransforms.set(i, newTransform);
            }
        });
    };

    const initLenis = () => {
        if (typeof Lenis !== 'undefined') {
            lenis = new Lenis({
                wrapper: scrollContainer,
                content: wrapper,
                duration: 1.2,
                easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                wheelMultiplier: 1,
                lerp: 0.1
            });

            lenis.on('scroll', updateTransforms);

            const raf = (time) => {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            };
            rafId = requestAnimationFrame(raf);
        } else {
            scrollContainer.addEventListener('scroll', updateTransforms, { passive: true });
        }
    };

    items.forEach((card, i) => {
        card.style.willChange = 'transform';
        card.style.transformOrigin = 'top center';
        card.style.backfaceVisibility = 'hidden';
    });

    initLenis();
    updateTransforms();
});