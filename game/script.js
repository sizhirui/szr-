// 游戏状态
let gameData = {
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

const screens = {
    start: document.getElementById('startScreen'),
    game: document.getElementById('gameScreen'),
    ending: document.getElementById('endingScreen')
};

const stats = {
    study: { bar: document.getElementById('barStudy'), val: document.getElementById('statStudy') },
    money: { bar: document.getElementById('barMoney'), val: document.getElementById('statMoney') },
    social: { bar: document.getElementById('barSocial'), val: document.getElementById('statSocial') },
    energy: { bar: document.getElementById('barEnergy'), val: document.getElementById('statEnergy') },
    mood: { bar: document.getElementById('barMood'), val: document.getElementById('statMood') }
};

const ui = {
    dayNum: document.getElementById('dayNum'),
    timeOfDay: document.getElementById('timeOfDay'),
    eventLog: document.getElementById('eventLogContent')
};

const modals = {
    event: document.getElementById('eventModal'),
    eventTitle: document.getElementById('eventTitle'),
    eventDesc: document.getElementById('eventDesc'),
    eventChoices: document.getElementById('eventChoices')
};

const timeNames = {
    morning: '上午',
    afternoon: '下午',
    evening: '晚上'
};

const locations = {
    classroom: {
        name: '教学楼',
        icon: '🏛️',
        effects: { study: 15, energy: -15, mood: -5 },
        events: [
            { text: '你认真听了一节课，学到了很多知识！', choices: null },
            { text: '老师点名提问，你回答得非常好！', choices: null },
            { text: '课堂上有点无聊，但还是坚持下来了。', choices: null }
        ]
    },
    library: {
        name: '图书馆',
        icon: '📖',
        effects: { study: 20, energy: -20, mood: -10 },
        events: [
            { text: '在图书馆安静地学习，效率很高！', choices: null },
            { text: '找到了一本非常有用的参考书。', choices: null },
            { text: '图书馆座位很紧张，你站着学习了一会儿。', choices: null }
        ]
    },
    dormitory: {
        name: '宿舍',
        icon: '🏠',
        effects: { energy: 40, mood: 10, study: -5 },
        events: [
            { text: '好好休息了一下，精力充沛！', choices: null },
            { text: '室友们在聊天，你加入了愉快的讨论。', choices: null },
            { text: '睡了个懒觉，感觉非常舒服。', choices: null }
        ]
    },
    canteen: {
        name: '食堂',
        icon: '🍜',
        effects: { energy: 25, mood: 5, money: -15 },
        events: [
            { text: '吃了一顿美味的饭菜，心情很好！', choices: null },
            { text: '在食堂遇到了同学，一起聊了聊天。', choices: null },
            { text: '饭菜有点贵，但味道不错。', choices: null }
        ]
    },
    club: {
        name: '社团中心',
        icon: '🎭',
        effects: { social: 20, energy: -15, mood: 15 },
        events: [
            { text: '参加了社团活动，认识了很多新朋友！', choices: null },
            { text: '社团举办了一场精彩的表演。', choices: null },
            { text: '你在社团里展示了自己的才艺！', choices: null }
        ]
    },
    outside: {
        name: '校外区域',
        icon: '🌆',
        effects: { money: 80, energy: -25, social: 5 },
        events: [
            { text: '打了一天工，赚了不少钱！', choices: null },
            { text: '工作很辛苦，但报酬不错。', choices: null },
            { text: '遇到了一个有趣的顾客。', choices: null }
        ]
    }
};

const endings = {
    scholar: { icon: '🏆', title: '学霸结局', desc: '你以优异的成绩毕业，获得了名校研究生录取资格！' },
    socialite: { icon: '🌟', title: '社交达人', desc: '你在大学期间结交了无数好友，人脉遍布各行各业！' },
    wealthy: { icon: '💰', title: '商业精英', desc: '你在大学期间积累了第一桶金，开启了创业之路！' },
    balanced: { icon: '🎓', title: '全面发展', desc: '你在学业、社交和生活之间找到了完美平衡！' },
    normal: { icon: '🎒', title: '平凡之路', desc: '普普通通的大学生活，也是一种幸福。' }
};

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

function loadGame() {
    const saveData = localStorage.getItem('collegeSimSave');
    if (saveData) {
        gameData = JSON.parse(saveData);
        updateUI();
        showScreen('game');
    } else {
        alert('没有找到存档！');
    }
}

function saveGame() {
    localStorage.setItem('collegeSimSave', JSON.stringify(gameData));
    alert('游戏已保存！');
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function updateUI() {
    ui.dayNum.textContent = gameData.day;
    ui.timeOfDay.textContent = timeNames[gameData.timeOfDay];
    
    updateStat('study', gameData.study);
    updateStat('money', gameData.money);
    updateStat('social', gameData.social);
    updateStat('energy', gameData.energy);
    updateStat('mood', gameData.mood);
    
    updateEventLog();
}

function updateStat(statName, value) {
    const maxValues = {
        study: 100,
        money: 10000,
        social: 100,
        energy: 100,
        mood: 100
    };
    const max = maxValues[statName];
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    if (stats[statName].bar) {
        stats[statName].bar.style.width = percentage + '%';
    }
    if (stats[statName].val) {
        stats[statName].val.textContent = value;
    }
}

function updateEventLog() {
    ui.eventLog.innerHTML = gameData.eventLog.slice(-5).map((log, index) => {
        return `<div class="log-item${index === gameData.eventLog.slice(-5).length - 1 ? ' new' : ''}">${log}</div>`;
    }).join('');
}

function addEventLog(text) {
    gameData.eventLog.push(text);
    updateEventLog();
}

function handleLocationClick(locationId) {
    if (gameData.energy <= 0) {
        addEventLog('你太累了，需要休息！');
        return;
    }

    const location = locations[locationId];
    if (!location) return;

    const randomEvent = location.events[Math.floor(Math.random() * location.events.length)];
    
    applyEffects(location.effects);
    addEventLog(`${location.icon} ${randomEvent.text}`);
    
    advanceTime();
    checkGameEnd();
}

function applyEffects(effects) {
    Object.entries(effects).forEach(([key, value]) => {
        if (gameData[key] !== undefined) {
            gameData[key] = Math.max(0, Math.min(100, gameData[key] + value));
        }
    });
    updateUI();
}

function advanceTime() {
    const times = ['morning', 'afternoon', 'evening'];
    const currentIndex = times.indexOf(gameData.timeOfDay);
    
    if (currentIndex === times.length - 1) {
        gameData.day++;
        gameData.timeOfDay = 'morning';
        gameData.energy = Math.min(100, gameData.energy + 30);
        addEventLog(`=== 第 ${gameData.day} 天 ===`);
    } else {
        gameData.timeOfDay = times[currentIndex + 1];
    }
}

function checkGameEnd() {
    if (gameData.day > 30) {
        showEnding();
    }
}

function showEnding() {
    let endingKey = 'normal';
    
    if (gameData.study >= 80) endingKey = 'scholar';
    else if (gameData.social >= 80) endingKey = 'socialite';
    else if (gameData.money >= 5000) endingKey = 'wealthy';
    else if (gameData.study >= 60 && gameData.social >= 60 && gameData.mood >= 60) endingKey = 'balanced';
    
    const ending = endings[endingKey];
    document.getElementById('endingIcon').textContent = ending.icon;
    document.getElementById('endingTitle').textContent = ending.title;
    document.getElementById('endingDesc').textContent = ending.desc;
    
    showScreen('ending');
}

function openMenu() {
    alert('菜单功能开发中...');
}

function goToStart() {
    showScreen('start');
}

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});