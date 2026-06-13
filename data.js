// 地点数据
const locations = {
    classroom: {
        name: '教学楼',
        icon: '🏛️',
        description: '认真学习，提升学业成绩',
        effects: {
            study: 15,
            energy: -20,
            mood: -5
        },
        events: ['class_event_1', 'class_event_2', 'class_event_3']
    },
    library: {
        name: '图书馆',
        icon: '📖',
        description: '安静的学习环境',
        effects: {
            study: 20,
            energy: -15,
            mood: 5
        },
        events: ['library_event_1', 'library_event_2']
    },
    dormitory: {
        name: '宿舍',
        icon: '🏠',
        description: '休息恢复体力',
        effects: {
            energy: 30,
            mood: 5,
            study: -5
        },
        events: ['dorm_event_1', 'dorm_event_2', 'dorm_event_3']
    },
    canteen: {
        name: '食堂',
        icon: '🍜',
        description: '补充能量，恢复体力',
        effects: {
            energy: 25,
            mood: 10,
            money: -20
        },
        events: ['canteen_event_1', 'canteen_event_2']
    },
    club: {
        name: '社团中心',
        icon: '🎭',
        description: '结交朋友，提升社交',
        effects: {
            social: 15,
            energy: -15,
            mood: 10,
            study: -5
        },
        events: ['club_event_1', 'club_event_2', 'club_event_3']
    },
    outside: {
        name: '校外区域',
        icon: '🌆',
        description: '打工赚钱或逛街',
        effects: {
            money: 100,
            energy: -25,
            mood: -5,
            study: -5
        },
        events: ['outside_event_1', 'outside_event_2', 'outside_event_3']
    }
};

// 随机事件数据
const events = {
    class_event_1: {
        title: '课堂提问',
        description: '老师突然点名提问，你能回答出来吗？',
        choices: [
            { text: '积极回答', effects: { study: 10, social: 5, mood: 5 } },
            { text: '低头装睡', effects: { mood: -10, study: -5 } },
            { text: '求助同学', effects: { social: -5, study: 5 } }
        ]
    },
    class_event_2: {
        title: '小组作业',
        description: '老师布置了小组作业，需要组队完成。',
        choices: [
            { text: '主动担任组长', effects: { social: 10, study: 5, mood: 5 } },
            { text: '默默做自己的部分', effects: { study: 10, social: -5 } },
            { text: '和同学聊天摸鱼', effects: { social: 5, study: -10, mood: 5 } }
        ]
    },
    class_event_3: {
        title: '课堂小测',
        description: '老师突然进行随堂测验！',
        choices: [
            { text: '认真答题', effects: { study: 15, energy: -10 } },
            { text: '偷看同桌', effects: { study: 5, social: -10, mood: -5 } },
            { text: '交白卷', effects: { study: -15, mood: -10 } }
        ]
    },
    library_event_1: {
        title: '发现好书',
        description: '在书架上发现了一本非常有用的参考书！',
        choices: [
            { text: '认真阅读', effects: { study: 20, energy: -10 } },
            { text: '借回去慢慢看', effects: { study: 10 } },
            { text: '放回原位', effects: {} }
        ]
    },
    library_event_2: {
        title: '图书馆占座',
        description: '你发现一个好位置，但已经有人放了书包占座。',
        choices: [
            { text: '礼貌询问是否有人', effects: { social: 5, mood: 5 } },
            { text: '直接坐下', effects: { mood: -10, social: -5 } },
            { text: '换个位置', effects: { mood: -5 } }
        ]
    },
    dorm_event_1: {
        title: '室友聚会',
        description: '室友们提议一起打牌娱乐。',
        choices: [
            { text: '加入他们', effects: { social: 10, mood: 15, energy: -10 } },
            { text: '继续学习', effects: { study: 10, social: -5, mood: -5 } },
            { text: '睡觉休息', effects: { energy: 15, social: -5 } }
        ]
    },
    dorm_event_2: {
        title: '宿舍检查',
        description: '宿管阿姨要来检查卫生了！',
        choices: [
            { text: '赶紧打扫', effects: { mood: -5, energy: -10 } },
            { text: '假装不在', effects: { mood: -15 } },
            { text: '整理自己的床位', effects: { mood: 5 } }
        ]
    },
    dorm_event_3: {
        title: '深夜游戏',
        description: '室友们深夜打游戏很吵，影响你休息。',
        choices: [
            { text: '友好提醒', effects: { social: 5, mood: 5 } },
            { text: '戴上耳机', effects: { mood: -5, energy: -5 } },
            { text: '一起加入', effects: { social: 10, mood: 10, energy: -20 } }
        ]
    },
    canteen_event_1: {
        title: '美食诱惑',
        description: '食堂推出了新的特色菜，看起来很美味！',
        choices: [
            { text: '尝试新菜', effects: { mood: 15, energy: 5, money: -30 } },
            { text: '吃普通套餐', effects: { mood: 5, money: -15 } },
            { text: '不吃了省钱', effects: { mood: -10, energy: -10 } }
        ]
    },
    canteen_event_2: {
        title: '偶遇同学',
        description: '在食堂遇到了同班同学。',
        choices: [
            { text: '主动打招呼', effects: { social: 10, mood: 5 } },
            { text: '假装没看到', effects: { social: -5 } },
            { text: '一起吃饭', effects: { social: 15, mood: 10, money: -10 } }
        ]
    },
    club_event_1: {
        title: '社团招新',
        description: '多个社团在招新，你想加入哪个？',
        choices: [
            { text: '加入学习社', effects: { study: 10, social: 5 } },
            { text: '加入运动社', effects: { energy: 10, social: 10, mood: 10 } },
            { text: '加入文艺社', effects: { mood: 15, social: 10 } }
        ]
    },
    club_event_2: {
        title: '社团活动',
        description: '社团组织了一次户外活动。',
        choices: [
            { text: '积极参与', effects: { social: 15, mood: 15, energy: -10 } },
            { text: '负责后勤', effects: { social: 10, energy: -15 } },
            { text: '请假不去', effects: { social: -10, mood: -5 } }
        ]
    },
    club_event_3: {
        title: '社团冲突',
        description: '两个社团同时举办活动，时间冲突了。',
        choices: [
            { text: '去朋友多的那个', effects: { social: 10, mood: 5 } },
            { text: '两个都去一会儿', effects: { social: 5, energy: -20 } },
            { text: '都不去', effects: { social: -10, mood: -5 } }
        ]
    },
    outside_event_1: {
        title: '兼职机会',
        description: '看到一则兼职招聘广告。',
        choices: [
            { text: '去面试', effects: { money: 150, energy: -20, mood: 5 } },
            { text: '觉得太累放弃', effects: { mood: -5 } },
            { text: '推荐给朋友', effects: { social: 10 } }
        ]
    },
    outside_event_2: {
        title: '逛街购物',
        description: '路过一家喜欢的商店，有打折活动。',
        choices: [
            { text: '买心仪已久的东西', effects: { mood: 20, money: -100 } },
            { text: '看看就好', effects: { mood: 5 } },
            { text: '赶紧离开', effects: { mood: -5 } }
        ]
    },
    outside_event_3: {
        title: '意外发现',
        description: '在公园散步时发现了一个有趣的地方。',
        choices: [
            { text: '进去探索', effects: { mood: 15, energy: -10 } },
            { text: '拍照留念', effects: { mood: 10 } },
            { text: '直接离开', effects: {} }
        ]
    },
    random_event_1: {
        title: '捡到钱包',
        description: '在路上捡到一个钱包，里面有一些现金。',
        choices: [
            { text: '交给失物招领', effects: { mood: 15, social: 10 } },
            { text: '据为己有', effects: { money: 50, mood: -15 } },
            { text: '原地等待失主', effects: { mood: 10, social: 5, energy: -10 } }
        ]
    },
    random_event_2: {
        title: '天气突变',
        description: '突然下起了大雨！',
        choices: [
            { text: '冒雨跑回去', effects: { energy: -15, mood: -10 } },
            { text: '在附近躲雨', effects: { energy: -5, mood: -5 } },
            { text: '打电话叫朋友送伞', effects: { social: 5, mood: 5 } }
        ]
    },
    random_event_3: {
        title: '收到礼物',
        description: '收到了一个神秘的礼物！',
        choices: [
            { text: '开心收下', effects: { mood: 20 } },
            { text: '谨慎询问来源', effects: { mood: 10 } },
            { text: '拒绝接收', effects: { mood: -5 } }
        ]
    },
    random_event_4: {
        title: '考试临近',
        description: '突然发现下周有重要考试！',
        choices: [
            { text: '熬夜复习', effects: { study: 20, energy: -30, mood: -10 } },
            { text: '制定复习计划', effects: { study: 15, energy: -10 } },
            { text: '随缘吧', effects: { study: -5, mood: 5 } }
        ]
    },
    random_event_5: {
        title: '生日惊喜',
        description: '今天是你的生日，朋友们准备了惊喜！',
        choices: [
            { text: '开心庆祝', effects: { social: 20, mood: 25, energy: -15 } },
            { text: '低调度过', effects: { social: 5, mood: 10 } },
            { text: '假装忘记', effects: { social: -10, mood: -5 } }
        ]
    }
};

// NPC数据
const npcs = {
    liying: {
        name: '李颖',
        avatar: '👩‍🎓',
        description: '学霸级人物，成绩优异',
        location: ['classroom', 'library'],
        favoriteStats: ['study'],
        initialFavor: 20,
        dialogues: {
            low: ['你好...', '我要去图书馆学习了'],
            medium: ['最近学习怎么样？', '一起去图书馆吧'],
            high: ['有你在身边学习效率更高呢~', '周末有空一起去自习吗？']
        }
    },
    wanghao: {
        name: '王浩',
        avatar: '👨‍🎤',
        description: '社团活跃分子，社交达人',
        location: ['club', 'canteen'],
        favoriteStats: ['social'],
        initialFavor: 15,
        dialogues: {
            low: ['嗨！新来的？', '要不要加入我们社团？'],
            medium: ['兄弟！今天有活动一起来啊', '带你认识新朋友'],
            high: ['你是我最好的兄弟！', '有什么事随时找我！']
        }
    },
    chenyue: {
        name: '陈悦',
        avatar: '👩‍🍳',
        description: '温柔善良的食堂小姐姐',
        location: ['canteen', 'dormitory'],
        favoriteStats: ['mood'],
        initialFavor: 25,
        dialogues: {
            low: ['同学要点什么？', '今天有新菜哦'],
            medium: ['又来啦？', '我给你留了一份好吃的'],
            high: ['见到你真开心~', '周末有空一起去吃饭吗？']
        }
    },
    zhangwei: {
        name: '张伟',
        avatar: '👨‍💼',
        description: '你的室友，游戏爱好者',
        location: ['dormitory', 'outside'],
        favoriteStats: ['energy'],
        initialFavor: 30,
        dialogues: {
            low: ['在干嘛呢？', '开黑吗？'],
            medium: ['兄弟！今晚通宵上分！', '帮我带个饭呗'],
            high: ['不愧是我室友！', '以后游戏包教包会！']
        }
    },
    linxia: {
        name: '林夏',
        avatar: '👩‍🎨',
        description: '文艺社社长，多才多艺',
        location: ['club', 'library'],
        favoriteStats: ['social', 'mood'],
        initialFavor: 10,
        dialogues: {
            low: ['你好...', '欢迎来文艺社'],
            medium: ['你的气质很适合我们社团', '要不要试试文艺活动？'],
            high: ['和你在一起感觉很放松~', '周末一起去看画展吧？']
        }
    }
};

// 结局数据
const endings = {
    academic: {
        title: '🎓 学术之星',
        image: '🏆',
        description: '你专注于学业，成绩名列前茅，获得了奖学金，成功保研。你的大学生活充实而辉煌！',
        required: { study: 80 }
    },
    social: {
        title: '👑 社交达人',
        image: '🎉',
        description: '你广交朋友，活跃于各个社团，成为校园里的风云人物。你的人脉遍布全校！',
        required: { social: 80 }
    },
    wealthy: {
        title: '💰 创业精英',
        image: '💼',
        description: '你善于理财，通过兼职和投资积累了第一桶金，成为了校园里的小富豪！',
        required: { money: 5000 }
    },
    healthy: {
        title: '⚡ 活力少年',
        image: '💪',
        description: '你注重健康，保持良好的作息和充沛的体力，成为了运动健将！',
        required: { energy: 80 }
    },
    happy: {
        title: '😊 快乐大学生',
        image: '🌈',
        description: '你保持积极乐观的心态，每一天都过得开心快乐，这就是最美好的大学时光！',
        required: { mood: 80 }
    },
    lover: {
        title: '💕 校园恋人',
        image: '💑',
        description: '你找到了心仪的另一半，共同度过了美好的大学时光，收获了甜蜜的爱情！',
        required: { favor: 80 }
    },
    balanced: {
        title: '⭐ 全面发展',
        image: '🌟',
        description: '你在各个方面都表现出色，学业、社交、生活都平衡得很好，成为了真正的人生赢家！',
        required: { study: 60, social: 60, money: 60, energy: 60, mood: 60 }
    },
    normal: {
        title: '🎒 平凡之路',
        image: '🚶',
        description: '你的大学生活普普通通，没有太多波澜，但也充满了温馨的回忆。这就是真实的青春。',
        required: {}
    }
};

// 获取随机事件
function getRandomEvent(eventKeys) {
    const availableEvents = eventKeys.filter(key => events[key]);
    if (availableEvents.length === 0) return null;
    return events[availableEvents[Math.floor(Math.random() * availableEvents.length)]];
}

// 获取全局随机事件
function getGlobalRandomEvent() {
    const globalEvents = ['random_event_1', 'random_event_2', 'random_event_3', 'random_event_4', 'random_event_5'];
    return events[globalEvents[Math.floor(Math.random() * globalEvents.length)]];
}

// 判断结局
function determineEnding(gameData) {
    const { study, money, social, energy, mood, npcs } = gameData;
    
    // 检查恋爱结局
    const maxFavor = Math.max(...Object.values(npcs).map(n => n.favor));
    if (maxFavor >= 80) {
        return endings.lover;
    }
    
    // 检查学术结局
    if (study >= 80) {
        return endings.academic;
    }
    
    // 检查社交结局
    if (social >= 80) {
        return endings.social;
    }
    
    // 检查财富结局
    if (money >= 5000) {
        return endings.wealthy;
    }
    
    // 检查健康结局
    if (energy >= 80) {
        return endings.healthy;
    }
    
    // 检查快乐结局
    if (mood >= 80) {
        return endings.happy;
    }
    
    // 检查全面发展结局
    if (study >= 60 && social >= 60 && money >= 60 && energy >= 60 && mood >= 60) {
        return endings.balanced;
    }
    
    // 默认结局
    return endings.normal;
}