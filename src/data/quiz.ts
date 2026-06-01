export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    scores: {
      expression: number;
      mystery: number;
      chaos: number;
      social: number;
    };
  }[];
}

export interface Result {
  id: string;
  title: string;
  tagline: string;
  keywords: string[];
  description: string;
  quote: string;
  advice: string;
  scores: {
    expression: number;
    mystery: number;
    chaos: number;
    social: number;
  };
}

export const questions: Question[] = [
  {
    id: 1,
    text: "你发朋友圈的频率更接近？",
    options: [
      { text: "想发就发，一天几条也正常", scores: { expression: 2, mystery: 0, chaos: 1, social: 0 } },
      { text: "很少发，但每次都认真挑图和文案", scores: { expression: 1, mystery: 2, chaos: 0, social: 0 } },
      { text: "平时不发，某天突然连发很多条", scores: { expression: 0, mystery: 1, chaos: 2, social: 0 } },
      { text: "基本不发，主要负责看别人发", scores: { expression: 0, mystery: 2, chaos: 0, social: 1 } },
    ],
  },
  {
    id: 2,
    text: "你看到朋友发了一个很有意思的朋友圈，你通常会？",
    options: [
      { text: "立刻点赞评论，顺便接个梗", scores: { expression: 1, mystery: 0, chaos: 0, social: 2 } },
      { text: "点赞，但不一定评论", scores: { expression: 0, mystery: 1, chaos: 0, social: 1 } },
      { text: "心里觉得好笑，但默默划走", scores: { expression: 0, mystery: 2, chaos: 0, social: 0 } },
      { text: "截图发给另一个朋友讨论", scores: { expression: 0, mystery: 0, chaos: 1, social: 2 } },
    ],
  },
  {
    id: 3,
    text: "你最可能在什么时候发朋友圈？",
    options: [
      { text: "生活里发生了一件值得记录的小事", scores: { expression: 2, mystery: 0, chaos: 0, social: 0 } },
      { text: "深夜突然有点情绪", scores: { expression: 1, mystery: 1, chaos: 0, social: 0 } },
      { text: "拍到一张特别满意的照片", scores: { expression: 1, mystery: 1, chaos: 0, social: 0 } },
      { text: "忍不住想说一句很抽象的话", scores: { expression: 0, mystery: 0, chaos: 2, social: 0 } },
    ],
  },
  {
    id: 4,
    text: "你的朋友圈文案通常是？",
    options: [
      { text: "简短但有点氛围感", scores: { expression: 0, mystery: 2, chaos: 0, social: 0 } },
      { text: "很真实，想到什么写什么", scores: { expression: 2, mystery: 0, chaos: 0, social: 0 } },
      { text: "梗很多，甚至有点看不懂", scores: { expression: 0, mystery: 0, chaos: 2, social: 0 } },
      { text: "基本不写文案，只发图", scores: { expression: 1, mystery: 1, chaos: 0, social: 0 } },
    ],
  },
  {
    id: 5,
    text: "如果一条朋友圈没人点赞，你会？",
    options: [
      { text: "完全不在意，发完就忘", scores: { expression: 0, mystery: 1, chaos: 0, social: -1 } },
      { text: "有点在意，但不会表现出来", scores: { expression: 1, mystery: 1, chaos: 0, social: 0 } },
      { text: "开始怀疑是不是发得太怪了", scores: { expression: 1, mystery: 0, chaos: 1, social: 0 } },
      { text: "下次换个更容易被点赞的内容", scores: { expression: 2, mystery: 0, chaos: 0, social: 1 } },
    ],
  },
  {
    id: 6,
    text: "你朋友圈里最常出现的内容是？",
    options: [
      { text: "吃饭、风景、日常碎片", scores: { expression: 1, mystery: 0, chaos: 0, social: 1 } },
      { text: "只出现精选照片或重要时刻", scores: { expression: 0, mystery: 2, chaos: 0, social: 0 } },
      { text: "一些突然冒出来的感悟", scores: { expression: 1, mystery: 1, chaos: 0, social: 0 } },
      { text: "很难归类，主打一个随机", scores: { expression: 0, mystery: 0, chaos: 2, social: 0 } },
    ],
  },
  {
    id: 7,
    text: "朋友评价你的朋友圈，最可能说？",
    options: [
      { text: "\"你真的很会生活。\"", scores: { expression: 1, mystery: 1, chaos: 0, social: 0 } },
      { text: "\"你怎么老是突然出现？\"", scores: { expression: 0, mystery: 2, chaos: 1, social: 0 } },
      { text: "\"你发的东西有时候好好笑。\"", scores: { expression: 0, mystery: 0, chaos: 2, social: 1 } },
      { text: "\"你怎么什么都不发？\"", scores: { expression: 0, mystery: 2, chaos: 0, social: 0 } },
    ],
  },
  {
    id: 8,
    text: "你对朋友圈分组的态度是？",
    options: [
      { text: "很认真，不同人看到不同内容", scores: { expression: 1, mystery: 2, chaos: 0, social: 0 } },
      { text: "偶尔用，看情况", scores: { expression: 0, mystery: 1, chaos: 0, social: 0 } },
      { text: "基本不用，爱看不看", scores: { expression: 2, mystery: 0, chaos: 1, social: 0 } },
      { text: "我甚至不太发朋友圈", scores: { expression: 0, mystery: 2, chaos: 0, social: 0 } },
    ],
  },
  {
    id: 9,
    text: "如果让你发一条\"今日状态\"，你会选？",
    options: [
      { text: "今天也算努力活过了", scores: { expression: 1, mystery: 1, chaos: 0, social: 0 } },
      { text: "不想上班，但想发财", scores: { expression: 0, mystery: 0, chaos: 1, social: 1 } },
      { text: "天气不错，适合消失", scores: { expression: 0, mystery: 2, chaos: 0, social: 0 } },
      { text: "人在，魂不详", scores: { expression: 0, mystery: 0, chaos: 2, social: 0 } },
    ],
  },
  {
    id: 10,
    text: "朋友突然评论你一条旧朋友圈，你会？",
    options: [
      { text: "立刻回复，顺便聊起来", scores: { expression: 0, mystery: 0, chaos: 0, social: 2 } },
      { text: "回复一个表情或简短文字", scores: { expression: 0, mystery: 1, chaos: 0, social: 1 } },
      { text: "有点尴尬，不知道为什么被翻出来", scores: { expression: 0, mystery: 1, chaos: 0, social: 0 } },
      { text: "顺势又发一条新的", scores: { expression: 2, mystery: 0, chaos: 1, social: 0 } },
    ],
  },
  {
    id: 11,
    text: "你最不想让朋友圈呈现出哪种感觉？",
    options: [
      { text: "太刻意", scores: { expression: 0, mystery: 1, chaos: 0, social: 0 } },
      { text: "太无聊", scores: { expression: 1, mystery: 0, chaos: 1, social: 0 } },
      { text: "太脆弱", scores: { expression: 0, mystery: 2, chaos: 0, social: 0 } },
      { text: "太活跃", scores: { expression: 0, mystery: 1, chaos: 0, social: -1 } },
    ],
  },
  {
    id: 12,
    text: "你理想中的朋友圈状态是？",
    options: [
      { text: "真实记录生活，不用太完美", scores: { expression: 2, mystery: 0, chaos: 0, social: 0 } },
      { text: "偶尔出现，每次都有点质感", scores: { expression: 0, mystery: 2, chaos: 0, social: 0 } },
      { text: "好玩就行，别人看不懂也没关系", scores: { expression: 0, mystery: 0, chaos: 2, social: 0 } },
      { text: "既能互动，又不暴露太多自己", scores: { expression: 0, mystery: 1, chaos: 0, social: 1 } },
    ],
  },
];

export const results: Result[] = [
  {
    id: "low-profile",
    title: "低调潜水观察员",
    tagline: "你不常出现，但朋友圈里谁发生了什么，你其实都知道。",
    keywords: ["安静", "敏锐", "信息收集型人格"],
    description:
      "你是朋友圈里的隐形观察员。你不一定点赞，也不一定评论，但你对大家的近况掌握得非常精准。别人以为你消失了，其实你只是选择了静音模式。",
    quote: "看到了，但我不说。",
    advice: "偶尔冒个泡吧，不然朋友们真的会以为你卸载了微信。",
    scores: { expression: 30, mystery: 90, chaos: 25, social: 45 },
  },
  {
    id: "curator",
    title: "精致营业艺术家",
    tagline: "你不是在发朋友圈，你是在办一场私人展览。",
    keywords: ["质感", "审美", "精选人生"],
    description:
      "你对朋友圈有自己的审美标准。照片要挑，文案要想，顺序要排。你不一定发得多，但每次出现都像一张认真制作过的生活切片。",
    quote: "最近的一些小片段。",
    advice: "你已经很会营业了，偶尔发点废片反而更可爱。",
    scores: { expression: 70, mystery: 75, chaos: 20, social: 55 },
  },
  {
    id: "chaos",
    title: "间歇性发疯型选手",
    tagline: "平时安静如鸡，突然一晚连发五条，让所有人重新认识你。",
    keywords: ["随机", "爆发", "抽象"],
    description:
      "你的朋友圈很难预测。你可能连续几个月不出现，也可能在某个深夜突然开启高强度输出。朋友们看你的朋友圈，就像追一部没有预告的连续剧。",
    quote: "我也不知道我在说什么，但我先发了。",
    advice:
      "保持这个节奏，你的朋友圈很有生命力，只是偶尔会让人担心你的精神状态。",
    scores: { expression: 75, mystery: 60, chaos: 95, social: 65 },
  },
  {
    id: "vibe",
    title: "朋友圈气氛组组长",
    tagline: "只要你在线，别人的朋友圈就不会冷场。",
    keywords: ["热情", "接梗", "互动王者"],
    description:
      "你是朋友圈互动生态的重要组成部分。你点赞及时，评论有梗，朋友发什么你都能接住。你不是单纯刷朋友圈，你是在维护一种社交繁荣。",
    quote: "哈哈哈哈哈这个我必须评论。",
    advice: "你适合拥有一个\"朋友圈年度最佳评论员\"奖杯。",
    scores: { expression: 80, mystery: 25, chaos: 65, social: 95 },
  },
  {
    id: "night",
    title: "深夜情绪诗人",
    tagline: "白天正常生活，晚上开始和月亮、宇宙、人生谈判。",
    keywords: ["敏感", "氛围", "深夜限定"],
    description:
      "你的朋友圈有一种夜间限定的文学感。白天的你可能很正常，甚至很冷静，但到了某些时刻，你会突然想用一句话概括整个人生。",
    quote: "有些话，白天说不出口。",
    advice: "发可以，别发完第二天早上全部删掉。那也是你的一部分。",
    scores: { expression: 65, mystery: 80, chaos: 55, social: 40 },
  },
  {
    id: "real",
    title: "人间真实记录仪",
    tagline: "你的朋友圈不负责完美，负责证明生活真的发生过。",
    keywords: ["真实", "松弛", "接地气"],
    description:
      "你发朋友圈不太端着。吃了什么、去了哪里、发生了什么，你都能自然地记录下来。你的内容没有太强的表演感，反而让人觉得亲近。",
    quote: "今天就这样，挺好。",
    advice: "继续保持，你的朋友圈有一种\"活人感\"。",
    scores: { expression: 85, mystery: 20, chaos: 40, social: 70 },
  },
  {
    id: "npc",
    title: "神秘高级 NPC",
    tagline: "你很少出现，但每次出现都让人觉得你过得很有故事。",
    keywords: ["克制", "神秘", "有距离感"],
    description:
      "你在朋友圈里的存在感不是靠频率，而是靠氛围。你发得少，说得也少，但越少越让人好奇。别人看你的朋友圈，经常会自动脑补一整段故事。",
    quote: "最近。",
    advice: "你已经很高冷了，可以偶尔说点人话。",
    scores: { expression: 35, mystery: 98, chaos: 30, social: 30 },
  },
  {
    id: "nonsense",
    title: "快乐废话制造机",
    tagline: "你的朋友圈没有重点，但很有生命力。",
    keywords: ["活泼", "随机", "快乐污染源"],
    description:
      "你的朋友圈像一个随时营业的小剧场。可能是废话，可能是梗，可能是突然的灵感，也可能只是想让大家知道你还在快乐地活着。",
    quote: "不知道发什么，但感觉应该发点什么。",
    advice: "不要小看废话，它是朋友圈生态的重要氧气。",
    scores: { expression: 90, mystery: 25, chaos: 90, social: 85 },
  },
];

// 计算结果
export function calculateResult(scores: {
  expression: number;
  mystery: number;
  chaos: number;
  social: number;
}): Result {
  // 优先级列表（更有传播性的结果优先）
  const priorityOrder = [
    "nonsense",
    "chaos",
    "npc",
    "vibe",
    "night",
    "curator",
    "real",
    "low-profile",
  ];

  // 找出最高分维度
  const maxScore = Math.max(
    scores.expression,
    scores.mystery,
    scores.chaos,
    scores.social
  );

  // 如果最高分非常接近，取优先级更高的
  const threshold = 2;

  for (const id of priorityOrder) {
    const result = results.find((r) => r.id === id);
    if (!result) continue;

    const resultScore = Math.max(
      (scores.expression / 100) * 10,
      (scores.mystery / 100) * 10,
      (scores.chaos / 100) * 10,
      (scores.social / 100) * 10
    );

    return result;
  }

  // 默认返回第一个
  return results[0];
}