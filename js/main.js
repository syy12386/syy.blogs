document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const projectItems = document.querySelectorAll('.project-item');
    const skillItems = document.querySelectorAll('.skill-item');
    const contactItems = document.querySelectorAll('.contact-item');

    const typingTextElement = document.querySelector('#intro-typing');
    if (typingTextElement) {
        const fullText = ' | AI Agent 开发者';
        let index = 0;

        const typeInterval = setInterval(() => {
            if (index < fullText.length) {
                typingTextElement.textContent += fullText[index];
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }

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

        if (scrollY > 50) {
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