// 游戏状态
let gameData = {
    day: 1,
    timeOfDay: 'morning', // morning, afternoon, evening
    study: 50,
    money: 1000,
    social: 40,
    energy: 100,
    mood: 70,
    npcs: {
        liying: { favor: 20 },
        wanghao: { favor: 15 },
        chenyue: { favor: 25 },
        zhangwei: { favor: 30 },
        linxia: { favor: 10 }
    },
    eventLog: ['欢迎来到大学生活！选择一个地点开始你的第一天吧。']
};

// DOM元素
const screens = {
    start: document.getElementById('startScreen'),
    game: document.getElementById('gameScreen'),
    ending: document.getElementById('endingScreen')
};

const stats = {
    study: { bar: document.getElementById('studyBar'), val: document.getElementById('studyVal') },
    money: { bar: document.getElementById('moneyBar'), val: document.getElementById('moneyVal') },
    social: { bar: document.getElementById('socialBar'), val: document.getElementById('socialVal') },
    energy: { bar: document.getElementById('energyBar'), val: document.getElementById('energyVal') },
    mood: { bar: document.getElementById('moodBar'), val: document.getElementById('moodVal') }
};

const ui = {
    dayNum: document.getElementById('dayNum'),
    timeOfDay: document.getElementById('timeOfDay'),
    eventLog: document.getElementById('eventLog'),
    npcList: document.getElementById('npcList')
};

const modals = {
    event: document.getElementById('eventModal'),
    menu: document.getElementById('menuModal'),
    eventTitle: document.getElementById('eventTitle'),
    eventDescription: document.getElementById('eventDescription'),
    eventChoices: document.getElementById('eventChoices')
};

const timeOrder = ['morning', 'afternoon', 'evening'];
const timeNames = {
    morning: '早晨',
    afternoon: '下午',
    evening: '晚上'
};

// 初始化游戏
function initGame() {
    // 绑定事件
    document.getElementById('newGameBtn').addEventListener('click', startNewGame);
    document.getElementById('loadGameBtn').addEventListener('click', loadGame);
    document.getElementById('saveBtn').addEventListener('click', saveGame);
    document.getElementById('menuBtn').addEventListener('click', openMenu);
    document.getElementById('saveMenuBtn').addEventListener('click', saveGame);
    document.getElementById('loadMenuBtn').addEventListener('click', loadGame);
    document.getElementById('returnMenuBtn').addEventListener('click', returnToMenu);
    document.getElementById('restartBtn').addEventListener('click', startNewGame);
    
    // 绑定地点点击事件
    document.querySelectorAll('.location-card').forEach(card => {
        card.addEventListener('click', () => {
            const locationId = card.dataset.location;
            handleLocationClick(locationId);
        });
    });
    
    // 检查是否有存档
    const saveData = localStorage.getItem('collegeSimSave');
    if (saveData) {
        document.getElementById('loadGameBtn').style.display = 'inline-block';
    }
}

// 开始新游戏
function startNewGame() {
    gameData = {
        day: 1,
        timeOfDay: 'morning',
        study: 50,
        money: 1000,
        social: 40,
        energy: 100,
        mood: 70,
        npcs: {
            liying: { favor: 20 },
            wanghao: { favor: 15 },
            chenyue: { favor: 25 },
            zhangwei: { favor: 30 },
            linxia: { favor: 10 }
        },
        eventLog: ['欢迎来到大学生活！选择一个地点开始你的第一天吧。']
    };
    
    updateUI();
    showScreen('game');
}

// 显示指定屏幕
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    screens[screenName].classList.remove('hidden');
}

// 更新UI
function updateUI() {
    // 更新日期和时间
    ui.dayNum.textContent = gameData.day;
    ui.timeOfDay.textContent = timeNames[gameData.timeOfDay];
    
    // 更新属性条
    updateStat('study', gameData.study);
    updateStat('money', gameData.money);
    updateStat('social', gameData.social);
    updateStat('energy', gameData.energy);
    updateStat('mood', gameData.mood);
    
    // 更新事件日志
    updateEventLog();
    
    // 更新NPC列表
    updateNPCList();
}

// 更新单个属性
function updateStat(statName, value) {
    const maxValues = {
        study: 100,
        money: 10000,
        social: 100,
        energy: 100,
        mood: 100
    };
    
    const max = maxValues[statName];
    const percentage = Math.min(100, (value / max) * 100);
    
    stats[statName].bar.style.width = percentage + '%';
    stats[statName].val.textContent = value;
}

// 更新事件日志
function updateEventLog() {
    ui.eventLog.innerHTML = gameData.eventLog.slice(-5).map((log, index) => {
        return `<p>${log}</p>`;
    }).join('');
}

// 更新NPC列表
function updateNPCList() {
    ui.npcList.innerHTML = '';
    
    Object.entries(npcs).forEach(([npcId, npcData]) => {
        const favor = gameData.npcs[npcId].favor;
        const favorLevel = getFavorLevel(favor);
        
        const npcCard = document.createElement('div');
        npcCard.className = 'npc-card';
        npcCard.innerHTML = `
            <div class="npc-avatar">${npcData.avatar}</div>
            <div class="npc-info">
                <span class="npc-name">${npcData.name}</span>
                <span class="npc-relation">${favorLevel}</span>
                <div class="npc-favor-bar">
                    <div class="npc-favor-fill" style="width: ${favor}%"></div>
                </div>
            </div>
        `;
        
        ui.npcList.appendChild(npcCard);
    });
}

// 获取好感度等级
function getFavorLevel(favor) {
    if (favor >= 80) return '💗 恋人';
    if (favor >= 60) return '💕 亲密好友';
    if (favor >= 40) return '🤝 好友';
    if (favor >= 20) return '👋 熟人';
    return '😐 陌生人';
}

// 处理地点点击
function handleLocationClick(locationId) {
    // 检查体力
    if (gameData.energy <= 0) {
        addEventLog('你太累了，需要休息！');
        return;
    }
    
    const location = locations[locationId];
    if (!location) return;
    
    // 应用地点效果
    applyEffects(location.effects, location.name);
    
    // 检查是否触发地点事件
    if (location.events && location.events.length > 0 && Math.random() < 0.3) {
        const event = getRandomEvent(location.events);
        if (event) {
            showEventModal(event);
            return;
        }
    }
    
    // 检查是否触发全局随机事件
    if (Math.random() < 0.15) {
        const event = getGlobalRandomEvent();
        if (event) {
            showEventModal(event);
            return;
        }
    }
    
    // 更新时间
    advanceTime();
}

// 应用效果
function applyEffects(effects, locationName) {
    let logText = `你去了${locationName}。`;
    const effectTexts = [];
    
    if (effects.study) {
        gameData.study = clamp(gameData.study + effects.study, 0, 100);
        effectTexts.push(effects.study > 0 ? `学业+${effects.study}` : `学业${effects.study}`);
    }
    if (effects.money) {
        gameData.money = clamp(gameData.money + effects.money, 0, 10000);
        effectTexts.push(effects.money > 0 ? `金钱+${effects.money}` : `金钱${effects.money}`);
    }
    if (effects.social) {
        gameData.social = clamp(gameData.social + effects.social, 0, 100);
        effectTexts.push(effects.social > 0 ? `社交+${effects.social}` : `社交${effects.social}`);
    }
    if (effects.energy) {
        gameData.energy = clamp(gameData.energy + effects.energy, 0, 100);
        effectTexts.push(effects.energy > 0 ? `体力+${effects.energy}` : `体力${effects.energy}`);
    }
    if (effects.mood) {
        gameData.mood = clamp(gameData.mood + effects.mood, 0, 100);
        effectTexts.push(effects.mood > 0 ? `心情+${effects.mood}` : `心情${effects.mood}`);
    }
    
    if (effectTexts.length > 0) {
        logText += ' ' + effectTexts.join('，');
    }
    
    addEventLog(logText);
    updateUI();
}

// 应用事件选择效果
function applyChoiceEffects(effects) {
    if (effects.study) {
        gameData.study = clamp(gameData.study + effects.study, 0, 100);
    }
    if (effects.money) {
        gameData.money = clamp(gameData.money + effects.money, 0, 10000);
    }
    if (effects.social) {
        gameData.social = clamp(gameData.social + effects.social, 0, 100);
    }
    if (effects.energy) {
        gameData.energy = clamp(gameData.energy + effects.energy, 0, 100);
    }
    if (effects.mood) {
        gameData.mood = clamp(gameData.mood + effects.mood, 0, 100);
    }
    
    updateUI();
}

// 限制数值范围
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// 添加事件日志
function addEventLog(text) {
    gameData.eventLog.push(text);
    if (gameData.eventLog.length > 20) {
        gameData.eventLog.shift();
    }
}

// 推进时间
function advanceTime() {
    const currentIndex = timeOrder.indexOf(gameData.timeOfDay);
    
    if (currentIndex < timeOrder.length - 1) {
        // 还有下一个时间段
        gameData.timeOfDay = timeOrder[currentIndex + 1];
    } else {
        // 进入下一天
        gameData.day++;
        gameData.timeOfDay = 'morning';
        
        // 每天恢复少量体力和心情
        gameData.energy = clamp(gameData.energy + 10, 0, 100);
        gameData.mood = clamp(gameData.mood + 5, 0, 100);
        
        // 检查游戏是否结束
        if (gameData.day > 120) {
            showEnding();
            return;
        }
        
        addEventLog(`=== 第${gameData.day}天 ===`);
    }
    
    updateUI();
}

// 显示事件弹窗
function showEventModal(event) {
    modals.eventTitle.textContent = event.title;
    modals.eventDescription.textContent = event.description;
    
    // 清空选项
    modals.eventChoices.innerHTML = '';
    
    // 创建选项按钮
    event.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.addEventListener('click', () => {
            handleChoice(choice);
        });
        modals.eventChoices.appendChild(btn);
    });
    
    modals.event.classList.remove('hidden');
}

// 处理事件选择
function handleChoice(choice) {
    // 应用效果
    applyChoiceEffects(choice.effects);
    
    // 添加日志
    addEventLog(`【事件】${modals.eventTitle.textContent} - ${choice.text}`);
    
    // 检查是否有NPC好感度变化（随机）
    if (Math.random() < 0.2) {
        const npcIds = Object.keys(gameData.npcs);
        const randomNpc = npcIds[Math.floor(Math.random() * npcIds.length)];
        const favorChange = Math.floor(Math.random() * 10) - 3; // -3 到 +6
        if (favorChange !== 0) {
            gameData.npcs[randomNpc].favor = clamp(
                gameData.npcs[randomNpc].favor + favorChange,
                0,
                100
            );
            const npc = npcs[randomNpc];
            addEventLog(`${npc.name}的好感度${favorChange > 0 ? '+' : ''}${favorChange}`);
        }
    }
    
    // 关闭弹窗
    closeModal();
    
    // 更新时间
    advanceTime();
}

// 关闭事件弹窗
function closeModal() {
    modals.event.classList.add('hidden');
}

// 打开菜单
function openMenu() {
    modals.menu.classList.remove('hidden');
}

// 关闭菜单
function closeMenu() {
    modals.menu.classList.add('hidden');
}

// 返回主菜单
function returnToMenu() {
    closeMenu();
    showScreen('start');
}

// 保存游戏
function saveGame() {
    const saveData = {
        gameData: gameData,
        savedAt: new Date().toISOString()
    };
    localStorage.setItem('collegeSimSave', JSON.stringify(saveData));
    addEventLog('💾 游戏已保存！');
    closeMenu();
    
    // 更新加载按钮状态
    document.getElementById('loadGameBtn').style.display = 'inline-block';
}

// 加载游戏
function loadGame() {
    const saveData = localStorage.getItem('collegeSimSave');
    if (!saveData) {
        addEventLog('❌ 没有找到存档！');
        return;
    }
    
    try {
        const parsed = JSON.parse(saveData);
        gameData = parsed.gameData;
        updateUI();
        showScreen('game');
        addEventLog(`📥 已加载存档（保存于${formatDate(parsed.savedAt)}）`);
    } catch (e) {
        addEventLog('❌ 存档损坏！');
    }
    
    closeMenu();
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
}

// 显示结局
function showEnding() {
    const ending = determineEnding(gameData);
    
    document.getElementById('endingTitle').textContent = ending.title;
    document.getElementById('endingImage').textContent = ending.image;
    document.getElementById('endingDescription').textContent = ending.description;
    
    document.getElementById('endStudy').textContent = gameData.study;
    document.getElementById('endMoney').textContent = gameData.money;
    document.getElementById('endSocial').textContent = gameData.social;
    document.getElementById('endEnergy').textContent = gameData.energy;
    document.getElementById('endMood').textContent = gameData.mood;
    
    showScreen('ending');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initGame);