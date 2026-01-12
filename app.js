// Демо-данные приложения
const demoData = {
    user: {
        id: 123456789,
        username: "@demo_user",
        firstName: "Демо",
        lastName: "Пользователь",
        photoUrl: null,
        balance: 100.4,
        stars: 100,
        referrals: 5,
        items: 12,
        cases: 3
    },
    
    caseData: {
        'limited': {
            name: 'ЛИМИТИРОВАННЫЙ КЕЙС',
            items: ['Редкий скин (500 ⭐)', 'Эксклюзивный предмет (300 ⭐)', 'Обычный предмет (50 ⭐)', 'Уникальная эмблема', 'Бонусные звезды (100 ⭐)'],
            price: 0,
            count: 2
        },
        'sweet': {
            name: 'Сладость или Гадость',
            items: ['Сладкий приз (100 ⭐)', 'Не очень сладкий приз (30 ⭐)', 'Гадость (10 ⭐)', 'Сюрприз (50 ⭐)', 'Случайный предмет'],
            price: 25,
            count: 25
        },
        'referral': {
            name: 'Реферальный кейс',
            items: ['Бонус за приглашение (50 ⭐)', 'Дополнительный кейс', 'Скидка 10%', 'Бесплатный спин', 'Реферальные бонусы'],
            price: 0,
            count: 0
        },
        'tiktok': {
            name: 'ТИКТОКЕРСКИЙ КЕЙС',
            items: ['Вирусный предмет (200 ⭐)', 'Трендовый скин (150 ⭐)', 'Обычный предмет (50 ⭐)', 'Эксклюзивный контент', 'Бонусные очки'],
            price: 0,
            count: 0
        },
        'regular': {
            name: 'Обычный кейс',
            items: ['Обычный предмет (50 ⭐)', 'Необычный предмет (80 ⭐)', 'Редкий предмет (120 ⭐)', 'Небольшой бонус', 'Случайная награда'],
            price: 25,
            count: 25
        },
        'peach': {
            name: 'Персик или Шавель',
            items: ['Персик (150 ⭐)', 'Шавель (20 ⭐)', 'Что-то среднее (70 ⭐)', 'Смешанный результат', 'Сюрприз (100 ⭐)'],
            price: 35,
            count: 35
        },
        'all': {
            name: 'Все или ничего',
            items: ['ВСЕ (500 ⭐)', 'НИЧЕГО (0 ⭐)', 'ПОЛОВИНА (250 ⭐)', 'УДВОЕНИЕ', 'СБРОС'],
            price: 50,
            count: 50
        }
    },
    
    inventoryItems: [
        { id: 1, name: "Scared Cat (Random)", icon: "😺", price: 9000, rarity: "legendary", owned: true },
        { id: 2, name: "Signet Ring (Random)", icon: "💍", price: 5600, rarity: "epic", owned: true },
        { id: 3, name: "Vintage Cigar (Random)", icon: "🚬", price: 4800, rarity: "epic", owned: true },
        { id: 4, name: "Golden Watch", icon: "⌚", price: 7500, rarity: "legendary", owned: false },
        { id: 5, name: "Mysterious Potion", icon: "🧪", price: 1200, rarity: "rare", owned: false },
        { id: 6, name: "Lucky Coin", icon: "🪙", price: 800, rarity: "common", owned: true },
        { id: 7, name: "Magic Wand", icon: "🪄", price: 3500, rarity: "epic", owned: false },
        { id: 8, name: "Crystal Ball", icon: "🔮", price: 6000, rarity: "legendary", owned: false }
    ],
    
    upgrades: [
        { id: 1, name: "Увеличение шанса выпадения", desc: "Повышает шанс получения редких предметов на 5%", price: 100, purchased: false },
        { id: 2, name: "Дополнительный кейс в день", desc: "Открывайте на 1 кейс больше каждый день", price: 250, purchased: false },
        { id: 3, name: "Премиум подписка", desc: "Эксклюзивные кейсы и предметы каждый месяц", price: 500, purchased: false },
        { id: 4, name: "Ускоренное получение наград", desc: "Сокращает время получения ежедневных наград", price: 150, purchased: false }
    ],
    
    spinPrizes: [
        '10 ⭐', '50 ⭐', '100 ⭐', 'Кейс "Обычный"', 'Кейс "Все или ничего"', 
        'Ничего', 'Бонусный предмет', 'Удвоение следующего выигрыша'
    ]
};

// Состояние приложения
let appState = {
    balance: demoData.user.balance,
    stars: demoData.user.stars,
    userData: null,
    currentPage: 'home-page',
    gameStats: {
        wins: 0,
        losses: 0,
        totalGames: 0
    },
    purchasedUpgrades: [],
    openedCases: []
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    console.log('StarsCase Demo запущен!');
    
    // Проверяем, открыто ли в Telegram WebApp
    if (window.Telegram && Telegram.WebApp) {
        initTelegramWebApp();
    } else {
        initDemoMode();
    }
    
    // Инициализация навигации
    initNavigation();
    
    // Инициализация кейсов
    initCases();
    
    // Инициализация колеса удачи
    initSpinWheel();
    
    // Инициализация игр
    initGames();
    
    // Инициализация улучшений
    initUpgrades();
    
    // Инициализация инвентаря
    initInventory();
    
    // Инициализация модальных окон
    initModals();
    
    // Запуск таймера ограниченного кейса
    startLimitedTimer();
});

// Инициализация Telegram WebApp
function initTelegramWebApp() {
    console.log('Работает в Telegram WebApp');
    
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
    
    const user = Telegram.WebApp.initDataUnsafe.user;
    
    if (user) {
        // Обновляем данные пользователя
        updateUserData(user);
        
        // Если есть аватар, загружаем его
        if (user.photo_url) {
            loadUserAvatar(user.photo_url);
        }
    }
}

// Инициализация демо-режима
function initDemoMode() {
    console.log('Работает в демо-режиме');
    
    // Создаем демо-пользователя
    updateUserData(demoData.user);
    
    // Добавляем демо-бейдж
    addDemoBadge();
}

// Обновление данных пользователя
function updateUserData(userData) {
    appState.userData = userData;
    
    // Обновляем UI
    document.getElementById('user-username').textContent = 
        userData.username || `${userData.firstName} ${userData.lastName || ''}`.trim();
    document.getElementById('user-id').textContent = `ID: ${userData.id}`;
    
    // Обновляем статистику
    updateStats();
}

// Загрузка аватара пользователя
function loadUserAvatar(photoUrl) {
    const avatarElement = document.getElementById('user-avatar');
    const placeholder = avatarElement.querySelector('.avatar-placeholder');
    
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    avatarElement.style.backgroundImage = `url(${photoUrl})`;
}

// Добавление демо-бейджа
function addDemoBadge() {
    const badge = document.createElement('div');
    badge.className = 'demo-badge';
    badge.textContent = 'DEMO';
    document.body.appendChild(badge);
}

// Обновление статистики
function updateStats() {
    document.querySelector('.balance-display').textContent = `${appState.balance.toFixed(1)} ⭐`;
    
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length >= 4) {
        statValues[0].textContent = appState.stars;
        statValues[1].textContent = demoData.user.referrals;
        statValues[2].textContent = demoData.user.items;
        statValues[3].textContent = demoData.user.cases;
    }
}

// Инициализация навигации
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });
    
    // Обработка кнопки "Все" на главной
    document.getElementById('view-all-cases').addEventListener('click', function() {
        switchPage('cases-page');
    });
}

// Переключение страниц
function switchPage(pageId) {
    // Обновляем навигацию
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        }
    });
    
    // Обновляем страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(pageId).classList.add('active');
    appState.currentPage = pageId;
}

// Инициализация кейсов
function initCases() {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        card.addEventListener('click', function() {
            const caseType = this.getAttribute('data-case');
            openCase(caseType);
        });
    });
}

// Открытие кейса
function openCase(caseType) {
    const caseInfo = demoData.caseData[caseType];
    
    if (!caseInfo) {
        showNotification('Кейс не найден');
        return;
    }
    
    // Проверяем, есть ли кейсы
    if (caseInfo.count <= 0 && caseInfo.price > 0) {
        showNotification('У вас недостаточно кейсов!');
        return;
    }
    
    // Проверяем баланс для платных кейсов
    if (caseInfo.price > 0 && appState.balance < caseInfo.price) {
        showNotification(`Недостаточно звезд! Нужно ${caseInfo.price} ⭐`);
        return;
    }
    
    // Списываем стоимость кейса
    if (caseInfo.price > 0) {
        appState.balance -= caseInfo.price;
        updateStats();
    }
    
    // Уменьшаем количество кейсов
    if (caseInfo.count > 0) {
        demoData.caseData[caseType].count--;
        updateCaseCount(caseType);
    }
    
    // Показываем анимацию открытия
    showCaseAnimation(caseType);
}

// Обновление количества кейсов
function updateCaseCount(caseType) {
    const caseCard = document.querySelector(`.case-card[data-case="${caseType}"]`);
    if (caseCard) {
        const countElement = caseCard.querySelector('.case-count');
        if (countElement) {
            countElement.textContent = demoData.caseData[caseType].count;
        }
    }
}

// Показать анимацию открытия кейса
function showCaseAnimation(caseType) {
    const caseInfo = demoData.caseData[caseType];
    const modal = document.getElementById('case-modal');
    
    // Устанавливаем название кейса
    document.getElementById('modal-case-name').textContent = caseInfo.name;
    
    // Очищаем предыдущие предметы
    const itemsContainer = document.getElementById('case-items-scroll');
    itemsContainer.innerHTML = '';
    
    // Создаем предметы для анимации
    const items = [...caseInfo.items, ...caseInfo.items, ...caseInfo.items];
    
    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'case-item-animated';
        itemElement.textContent = item;
        itemElement.dataset.index = index;
        itemsContainer.appendChild(itemElement);
    });
    
    // Сбрасываем позицию
    itemsContainer.style.top = '0px';
    
    // Скрываем выигранный предмет
    document.getElementById('won-item').textContent = '???';
    
    // Показываем модальное окно
    modal.classList.add('active');
    
    // Запускаем анимацию
    startCaseAnimation(items);
}

// Запуск анимации кейса
function startCaseAnimation(items) {
    const scrollContainer = document.getElementById('case-items-scroll');
    const itemHeight = 120;
    const totalItems = items.length;
    
    // Случайный выигрышный предмет
    const targetIndex = Math.floor(Math.random() * (totalItems / 3));
    const wonPrize = items[targetIndex];
    
    // Анимация прокрутки
    let position = (totalItems / 3) * itemHeight;
    let speed = 50;
    let acceleration = 1.05;
    let decelerationStart = 1500;
    let animationStart = Date.now();
    
    function animate() {
        const elapsed = Date.now() - animationStart;
        
        if (elapsed > decelerationStart) {
            const decelerationFactor = 1 - (elapsed - decelerationStart) / 2000;
            speed = Math.max(5, speed * decelerationFactor);
        } else {
            speed = Math.min(100, speed * acceleration);
        }
        
        position += speed;
        scrollContainer.style.top = `-${position % (totalItems * itemHeight)}px`;
        
        if (speed > 5) {
            requestAnimationFrame(animate);
        } else {
            // Завершение анимации
            document.getElementById('won-item').textContent = wonPrize;
            
            // Добавляем время открытия
            const now = new Date();
            const timeString = now.toLocaleString('ru-RU');
            document.getElementById('modal-open-time').textContent = `Открыт: ${timeString}`;
            
            // Добавляем в историю
            appState.openedCases.push({
                case: wonPrize,
                time: now,
                prize: wonPrize
            });
        }
    }
    
    animate();
}

// Инициализация колеса удачи
function initSpinWheel() {
    const spinBtn = document.getElementById('spin-btn');
    const spinWheel = document.getElementById('spin-wheel');
    
    spinBtn.addEventListener('click', function() {
        // Проверяем баланс
        if (appState.balance < 10) {
            showNotification('Недостаточно звезд для спина!');
            return;
        }
        
        // Списываем стоимость
        appState.balance -= 10;
        updateStats();
        
        // Блокируем кнопку
        spinBtn.disabled = true;
        
        // Анимация вращения
        spinWheel.style.transition = 'transform 3s cubic-bezier(0.2, 0.8, 0.3, 1)';
        const randomRotation = 1800 + Math.floor(Math.random() * 360);
        spinWheel.style.transform = `rotate(${randomRotation}deg)`;
        
        // Определяем выигрыш
        setTimeout(() => {
            const prize = demoData.spinPrizes[Math.floor(Math.random() * demoData.spinPrizes.length)];
            
            // Добавляем выигрыш
            if (prize.includes('⭐')) {
                const amount = parseInt(prize);
                appState.balance += amount;
                appState.stars += amount;
                updateStats();
            }
            
            // Показываем уведомление
            showNotification(`🎉 Вы выиграли: ${prize}`);
            
            // Разблокируем кнопку
            spinBtn.disabled = false;
            
            // Сбрасываем вращение
            setTimeout(() => {
                spinWheel.style.transition = 'none';
                spinWheel.style.transform = 'rotate(0deg)';
            }, 100);
        }, 3000);
    });
}

// Инициализация игр
function initGames() {
    // Игра "Орёл и Решка"
    document.getElementById('play-coin-game').addEventListener('click', function() {
        openCoinGame();
    });
    
    // Другие игры (заглушки)
    document.getElementById('play-labuba-game').addEventListener('click', function() {
        showNotification('Игра "Где ЛАБУБА?" в разработке');
    });
    
    document.getElementById('play-dice-game').addEventListener('click', function() {
        showNotification('Игра "Кости" в разработке');
    });
}

// Открытие игры "Орёл и Решка"
function openCoinGame() {
    const modal = document.getElementById('coin-game-modal');
    
    // Обновляем статистику
    document.getElementById('game-balance').textContent = `${appState.balance} ⭐`;
    document.getElementById('game-wins').textContent = appState.gameStats.wins;
    document.getElementById('game-losses').textContent = appState.gameStats.losses;
    
    // Показываем модальное окно
    modal.classList.add('active');
    
    // Инициализация элементов игры
    initCoinGame();
}

// Инициализация игры "Орёл и Решка"
function initCoinGame() {
    const coin = document.getElementById('coin');
    const betInput = document.getElementById('bet-input');
    const coinButtons = document.querySelectorAll('.coin-btn');
    const betControlBtns = document.querySelectorAll('.bet-control-btn');
    
    // Управление ставкой
    betControlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            let currentBet = parseInt(betInput.value);
            const maxBet = Math.min(1000, Math.floor(appState.balance));
            
            switch(action) {
                case 'minus':
                    currentBet = Math.max(10, currentBet - 10);
                    break;
                case 'plus':
                    currentBet = Math.min(maxBet, currentBet + 10);
                    break;
                case 'half':
                    currentBet = Math.max(10, Math.floor(maxBet / 2));
                    break;
                case 'max':
                    currentBet = maxBet;
                    break;
            }
            
            betInput.value = currentBet;
        });
    });
    
    // Обработка выбора стороны
    coinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const choice = this.getAttribute('data-choice');
            const betAmount = parseInt(betInput.value);
            
            // Проверки
            if (betAmount < 10 || betAmount > 1000) {
                document.getElementById('coin-game-result').textContent = 'Ставка должна быть от 10 до 1000 ⭐';
                return;
            }
            
            if (betAmount > appState.balance) {
                document.getElementById('coin-game-result').textContent = 'Недостаточно звезд!';
                return;
            }
            
            // Блокируем кнопки
            coinButtons.forEach(btn => btn.disabled = true);
            
            // Анимация подбрасывания монеты
            coin.classList.add('flipping');
            
            // Определяем результат
            setTimeout(() => {
                const result = Math.random() < 0.5 ? 'eagle' : 'tails';
                const isWin = choice === result;
                
                coin.classList.remove('flipping');
                
                // Обновляем статистику
                appState.gameStats.totalGames++;
                
                if (isWin) {
                    appState.gameStats.wins++;
                    appState.balance += betAmount * 2;
                    appState.stars += betAmount;
                    
                    document.getElementById('coin-game-result').innerHTML = `
                        <div>🎉 ПОБЕДА!</div>
                        <div>Вы выиграли ${betAmount * 2} ⭐</div>
                        <div>Выпало: ${result === 'eagle' ? '🦅 Орёл' : '🪙 Решка'}</div>
                    `;
                } else {
                    appState.gameStats.losses++;
                    appState.balance -= betAmount;
                    
                    document.getElementById('coin-game-result').innerHTML = `
                        <div>😞 ПОРАЖЕНИЕ</div>
                        <div>Вы проиграли ${betAmount} ⭐</div>
                        <div>Выпало: ${result === 'eagle' ? '🦅 Орёл' : '🪙 Решка'}</div>
                    `;
                }
                
                // Обновляем UI
                updateStats();
                document.getElementById('game-balance').textContent = `${appState.balance} ⭐`;
                document.getElementById('game-wins').textContent = appState.gameStats.wins;
                document.getElementById('game-losses').textContent = appState.gameStats.losses;
                
                // Разблокируем кнопки
                coinButtons.forEach(btn => btn.disabled = false);
            }, 2000);
        });
    });
}

// Инициализация улучшений
function initUpgrades() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const upgradeName = this.parentElement.querySelector('.upgrade-name').textContent;
            const upgradePrice = parseInt(this.parentElement.querySelector('.upgrade-price').textContent);
            
            // Проверяем баланс
            if (appState.balance < upgradePrice) {
                showNotification(`Недостаточно звезд! Нужно ${upgradePrice} ⭐`);
                return;
            }
            
            // Проверяем, куплено ли уже
            if (this.disabled) {
                showNotification('Вы уже приобрели это улучшение');
                return;
            }
            
            // Списываем средства
            appState.balance -= upgradePrice;
            updateStats();
            
            // Помечаем как купленное
            this.disabled = true;
            this.textContent = 'Куплено';
            
            // Добавляем в список купленных
            appState.purchasedUpgrades.push(upgradeName);
            
            showNotification(`Улучшение "${upgradeName}" успешно приобретено!`);
        });
    });
}

// Инициализация инвентаря
function initInventory() {
    renderInventory();
    
    // Обработка переключателей
    const toggleOptions = document.querySelectorAll('.toggle-option');
    toggleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Обновляем активный класс
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Фильтруем инвентарь
            const mode = this.getAttribute('data-mode');
            filterInventory(mode);
        });
    });
    
    // Обработка сортировки
    const sortOptions = document.querySelectorAll('.sort-option');
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Обновляем активный класс
            sortOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Сортируем инвентарь
            const sort = this.getAttribute('data-sort');
            sortInventory(sort);
        });
    });
}

// Рендеринг инвентаря
function renderInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    
    demoData.inventoryItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'inventory-item';
        
        itemElement.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-details">
                <div class="item-name">${item.name}
                    <span class="item-rarity ${item.rarity}">${getRarityName(item.rarity)}</span>
                </div>
                <div class="item-price">${item.price} ★</div>
            </div>
        `;
        
        // Добавляем обработчик клика
        itemElement.addEventListener('click', function() {
            showNotification(`${item.name} - ${item.price} ★\nРедкость: ${getRarityName(item.rarity)}`);
        });
        
        inventoryList.appendChild(itemElement);
    });
}

// Фильтрация инвентаря
function filterInventory(mode) {
    const items = document.querySelectorAll('.inventory-item');
    
    items.forEach(item => {
        switch(mode) {
            case 'all':
                item.style.display = 'flex';
                break;
            case 'demo':
                item.style.display = 'flex';
                break;
            case 'owned':
                // В демо-режиме показываем все
                item.style.display = 'flex';
                break;
        }
    });
}

// Сортировка инвентаря
function sortInventory(sortType) {
    switch(sortType) {
        case 'price-asc':
            demoData.inventoryItems.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            demoData.inventoryItems.sort((a, b) => b.price - a.price);
            break;
        case 'default':
            demoData.inventoryItems.sort((a, b) => a.id - b.id);
            break;
    }
    
    renderInventory();
}

// Получение названия редкости
function getRarityName(rarity) {
    const names = {
        'common': 'Обычный',
        'rare': 'Редкий',
        'epic': 'Эпический',
        'legendary': 'Легендарный'
    };
    
    return names[rarity] || rarity;
}

// Инициализация модальных окон
function initModals() {
    // Закрытие модального окна кейса
    document.getElementById('close-case-modal').addEventListener('click', function() {
        document.getElementById('case-modal').classList.remove('active');
    });
    
    document.getElementById('collect-btn').addEventListener('click', function() {
        document.getElementById('case-modal').classList.remove('active');
        showNotification('Награда добавлена в инвентарь!');
    });
    
    document.getElementById('open-another-btn').addEventListener('click', function() {
        document.getElementById('case-modal').classList.remove('active');
        setTimeout(() => {
            // Можно открыть случайный кейс
            const caseTypes = Object.keys(demoData.caseData);
            const randomCase = caseTypes[Math.floor(Math.random() * caseTypes.length)];
            openCase(randomCase);
        }, 300);
    });
    
    // Закрытие модального окна игры
    document.getElementById('close-coin-modal').addEventListener('click', function() {
        document.getElementById('coin-game-modal').classList.remove('active');
    });
    
    document.getElementById('close-coin-btn').addEventListener('click', function() {
        document.getElementById('coin-game-modal').classList.remove('active');
    });
    
    // Закрытие модального окна уведомлений
    document.getElementById('close-notification-modal').addEventListener('click', function() {
        document.getElementById('notification-modal').classList.remove('active');
    });
    
    document.getElementById('ok-notification-btn').addEventListener('click', function() {
        document.getElementById('notification-modal').classList.remove('active');
    });
    
    // Ежедневный бонус
    document.getElementById('daily-gift-btn').addEventListener('click', function() {
        appState.balance += 10;
        appState.stars += 10;
        updateStats();
        
        // Блокируем кнопку на 24 часа (в демо-режиме просто меняем текст)
        this.disabled = true;
        this.textContent = 'Бонус получен';
        
        showNotification('Ежедневный бонус +10 ⭐ получен!');
    });
}

// Показать уведомление
function showNotification(message) {
    const modal = document.getElementById('notification-modal');
    document.getElementById('notification-content').textContent = message;
    modal.classList.add('active');
}

// Запуск таймера ограниченного кейса
function startLimitedTimer() {
    const timerElement = document.getElementById('limited-timer');
    
    if (!timerElement) return;
    
    // Устанавливаем время окончания (2 дня от текущего момента)
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 2);
    endTime.setHours(endTime.getHours() + 4);
    endTime.setMinutes(endTime.getMinutes() + 49);
    endTime.setSeconds(endTime.getSeconds() + 12);
    
    function updateTimer() {
        const now = new Date();
        const diff = endTime - now;
        
        if (diff <= 0) {
            timerElement.textContent = 'Время вышло!';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        timerElement.textContent = `${days}Д ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Консольные команды для тестирования (только для разработки)
console.log('Доступные команды:');
console.log('appState - посмотреть состояние приложения');
console.log('addStars(amount) - добавить звезды');
console.log('resetDemo() - сбросить демо-данные');

window.addStars = function(amount) {
    appState.balance += amount;
    appState.stars += amount;
    updateStats();
    console.log(`Добавлено ${amount} ⭐`);
};

window.resetDemo = function() {
    appState = {
        balance: demoData.user.balance,
        stars: demoData.user.stars,
        userData: demoData.user,
        currentPage: 'home-page',
        gameStats: {
            wins: 0,
            losses: 0,
            totalGames: 0
        },
        purchasedUpgrades: [],
        openedCases: []
    };
    
    // Сбрасываем кейсы
    for (const key in demoData.caseData) {
        if (demoData.caseData[key].count === 0) {
            demoData.caseData[key].count = demoData.caseData[key].price || 10;
        }
    }
    
    // Сбрасываем улучшения
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.disabled = false;
        btn.textContent = 'Купить';
    });
    
    // Сбрасываем ежедневный бонус
    const dailyBtn = document.getElementById('daily-gift-btn');
    dailyBtn.disabled = false;
    dailyBtn.textContent = 'Получить +10 ⭐';
    
    updateStats();
    console.log('Демо-данные сброшены!');
};