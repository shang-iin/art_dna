"use client";

import React, { useMemo, useState } from "react";

type ArchetypeKey =
  | "paris"
  | "vienna"
  | "florence"
  | "berlin"
  | "uk"
  | "barcelona"
  | "iceland"
  | "greece";

type Option = {
  label: string;
  scores: Record<ArchetypeKey, number>;
};

type Question = {
  id: string;
  title: string;
  options: Option[];
};

const ARCHETYPES: Record<
  ArchetypeKey,
  {
    title: string;
    subtitle: string;
    keywords: string[];
    desc: string;
    cities: string[];
    artists: string[];
    rituals: string[];
  }
> = {
  paris: {
    title: "Parisian Flâneur",
    subtitle: "巴黎漫游者",
    keywords: ["敏感", "氛围感", "审美细腻", "诗性观察"],
    desc:
      "你对城市与艺术的感受力很强，能在光影、街道、咖啡馆与偶然的瞬间里捕捉到生活的诗意。你不追求效率，而更在意生活的质地。对你来说，美不是奢侈品，而是一种日常的精神姿态。",
    cities: ["Paris", "Lyon", "Brussels"],
    artists: ["Claude Monet", "Edgar Degas", "Charles Baudelaire"],
    rituals: ["独自散步 30 分钟", "咖啡馆写下 3 句话", "慢慢看一幅画直到记住一个细节"],
  },
  vienna: {
    title: "Viennese Intellectual",
    subtitle: "维也纳思考者",
    keywords: ["理性", "深度", "结构感", "克制优雅"],
    desc:
      "你习惯用结构与思想理解世界。音乐、哲学、艺术史并非装饰，而是你精神系统的一部分。你不急于表达，但一旦开口往往有穿透力。你越能把复杂事物整理为清晰框架，越能获得稳定与安全感。",
    cities: ["Vienna", "Prague", "Salzburg"],
    artists: ["Gustav Klimt", "Gustav Mahler", "Sigmund Freud"],
    rituals: ["听一张古典专辑", "读 10 页书并写一句总结", "把今天的事归纳成 3 个要点"],
  },
  florence: {
    title: "Florentine Classicist",
    subtitle: "佛罗伦萨古典主义者",
    keywords: ["经典审美", "长期主义", "内在稳定", "工艺细节"],
    desc:
      "你相信真正的美需要时间沉淀。你欣赏比例、结构与工艺，愿意为可持续的内在积累投入耐心。经典之所以经典，是因为它经得起时间；而你的魅力也来自这种沉稳与耐看。",
    cities: ["Florence", "Rome", "Siena"],
    artists: ["Leonardo da Vinci", "Michelangelo", "Raphael"],
    rituals: ["读 10 分钟艺术史", "做一次 25 分钟深度专注", "观察一件物品的工艺细节 2 分钟"],
  },
  berlin: {
    title: "Berlin Avant-Garde",
    subtitle: "柏林先锋者",
    keywords: ["独立", "实验精神", "表达欲", "边界突破"],
    desc:
      "你更在意表达与创造，而不是被规则驯化。你欣赏观点、冲突与实验，愿意把不确定性当作能量来源。艺术在你眼里不是装饰，而是一种力量：推动你拆开旧结构，再建立新的秩序。",
    cities: ["Berlin", "Amsterdam", "Hamburg"],
    artists: ["Wassily Kandinsky", "Anselm Kiefer", "Franz Kafka"],
    rituals: ["写一段不解释的表达", "看一部先锋电影或展览纪录", "做一个打破惯性的小决定"],
  },
  uk: {
    title: "British Curator",
    subtitle: "英国策展者",
    keywords: ["文化资本", "审美判断", "连接能力", "知识型气质"],
    desc:
      "你像一个策展人而不是观众：更在意线索、语境与系统。你擅长把艺术、历史与当代议题串联成自己的文化地图。你的高级感来自克制的判断与长期积累的品味。",
    cities: ["London", "Oxford", "Edinburgh"],
    artists: ["J.M.W. Turner", "David Hockney", "Virginia Woolf"],
    rituals: ["看一个展览并写 3 句观察", "读 10 页非虚构", "收藏一条想长期保留的观点"],
  },
  barcelona: {
    title: "Barcelona Visionary",
    subtitle: "巴塞罗那幻想者",
    keywords: ["色彩", "想象力", "感官世界", "形态直觉"],
    desc:
      "你容易被色彩、形状与想象力击中。你对现实的另一种可能非常敏感：艺术对你来说不是复制，而是创造新的世界。你适合把灵感当作日常燃料，持续地玩耍与生成。",
    cities: ["Barcelona", "Valencia", "Palma"],
    artists: ["Antoni Gaudí", "Salvador Dalí", "Joan Miró"],
    rituals: ["记录一个梦", "画一个随意的形状并延展", "看一件超现实作品 5 分钟"],
  },
  iceland: {
    title: "Iceland Minimalist",
    subtitle: "冰岛极简者",
    keywords: ["留白", "冷静", "自然感", "低噪音"],
    desc:
      "你对干净与安静有天然偏好。信息越少，你越能回到自己；空间越开阔，你越有力量。你追求的高级感不是堆砌，而是删减后的清晰与呼吸感。",
    cities: ["Reykjavík", "Akureyri", "Helsinki"],
    artists: ["Olafur Eliasson", "Roni Horn", "Arvo Pärt"],
    rituals: ["减少一天的信息输入", "看天空或海面 5 分钟", "听一段环境音乐直到心跳变慢"],
  },
  greece: {
    title: "Aegean Philosopher",
    subtitle: "希腊哲思者",
    keywords: ["人文精神", "意义感", "历史纵深", "永恒视角"],
    desc:
      "你对世界的兴趣不仅是美，还有意义。你更容易被神话、历史与思想触动。你会把艺术当作理解人类存在的一种方式：越接近本质，你越觉得安稳。",
    cities: ["Athens", "Santorini", "Crete"],
    artists: ["Socrates", "Plato", "Nikos Kazantzakis"],
    rituals: ["写下一个真正想弄明白的问题", "读 1 页哲学或人文", "看海 3 分钟不说话"],
  },
};

const KEYS: ArchetypeKey[] = [
  "paris",
  "vienna",
  "florence",
  "berlin",
  "uk",
  "barcelona",
  "iceland",
  "greece",
];

function scoreOnly(key: ArchetypeKey): Record<ArchetypeKey, number> {
  return {
    paris: key === "paris" ? 1 : 0,
    vienna: key === "vienna" ? 1 : 0,
    florence: key === "florence" ? 1 : 0,
    berlin: key === "berlin" ? 1 : 0,
    uk: key === "uk" ? 1 : 0,
    barcelona: key === "barcelona" ? 1 : 0,
    iceland: key === "iceland" ? 1 : 0,
    greece: key === "greece" ? 1 : 0,
  };
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    title: "你发旅行照片时，更想让别人感受到什么？",
    options: [
      { label: "像电影截图一样的氛围感", scores: scoreOnly("paris") },
      { label: "构图干净、克制、有秩序", scores: scoreOnly("vienna") },
      { label: "经典建筑与历史感", scores: scoreOnly("florence") },
      { label: "怪酷、小众、别人没见过", scores: scoreOnly("berlin") },
    ],
  },
  {
    id: "q2",
    title: "你刷社交媒体最容易停在哪类内容？",
    options: [
      { label: "展览、书单、策展、文化分析", scores: scoreOnly("uk") },
      { label: "高饱和色彩、热烈建筑、想象力内容", scores: scoreOnly("barcelona") },
      { label: "极简空间、自然、低噪音生活", scores: scoreOnly("iceland") },
      { label: "古迹、神话、哲学、人文纵深", scores: scoreOnly("greece") },
    ],
  },
  {
    id: "q3",
    title: "累到不想说话时，你最想怎么恢复？",
    options: [
      { label: "去街上走走，买杯咖啡，看光线和人群", scores: scoreOnly("paris") },
      { label: "一个人待着，把思绪整理清楚", scores: scoreOnly("vienna") },
      { label: "去博物馆或古建筑里待一会", scores: scoreOnly("florence") },
      { label: "去看展、看电影，重新刺激自己", scores: scoreOnly("berlin") },
    ],
  },
  {
    id: "q4",
    title: "你理解的“高级感”更接近哪一种？",
    options: [
      { label: "见多识广、判断很准、有文化地图", scores: scoreOnly("uk") },
      { label: "色彩、想象力、感官冲击都很强", scores: scoreOnly("barcelona") },
      { label: "删减之后的清晰、留白与安静", scores: scoreOnly("iceland") },
      { label: "历史、文明、意义感和纵深", scores: scoreOnly("greece") },
    ],
  },
  {
    id: "q5",
    title: "你更想长期住在哪种城市？",
    options: [
      { label: "日常像电影，连散步都很有情绪", scores: scoreOnly("paris") },
      { label: "安静，但精神密度很高", scores: scoreOnly("vienna") },
      { label: "每天都能看到经典艺术和建筑", scores: scoreOnly("florence") },
      { label: "总能遇到新鲜观点和实验表达", scores: scoreOnly("berlin") },
    ],
  },
  {
    id: "q6",
    title: "你最想拥有哪种房间？",
    options: [
      { label: "像策展人的家：书、展览目录、收藏有条理", scores: scoreOnly("uk") },
      { label: "像一间视觉实验室：颜色和形态都在流动", scores: scoreOnly("barcelona") },
      { label: "像一间安静避难所：极简、冷静、能呼吸", scores: scoreOnly("iceland") },
      { label: "像文明碎片博物馆：古典、神话、故事感", scores: scoreOnly("greece") },
    ],
  },
  {
    id: "q7",
    title: "第一次进博物馆，你通常先做什么？",
    options: [
      { label: "先看哪件作品让我有感觉", scores: scoreOnly("paris") },
      { label: "先读导览、先理解结构", scores: scoreOnly("vienna") },
      { label: "先去最经典的那几件", scores: scoreOnly("florence") },
      { label: "先找最怪、最新、最有冲突的作品", scores: scoreOnly("berlin") },
    ],
  },
  {
    id: "q8",
    title: "你更想被朋友夸哪一点？",
    options: [
      { label: "你很会看东西，也很会判断", scores: scoreOnly("uk") },
      { label: "你审美很特别，真的很有灵感", scores: scoreOnly("barcelona") },
      { label: "你整个人都很干净、很静", scores: scoreOnly("iceland") },
      { label: "你讲话有深度，很像在读一本书", scores: scoreOnly("greece") },
    ],
  },
  {
    id: "q9",
    title: "你最容易为什么花钱？",
    options: [
      { label: "香水、画册、咖啡馆、电影感小物", scores: scoreOnly("paris") },
      { label: "书、讲座、音乐会、知识订阅", scores: scoreOnly("vienna") },
      { label: "经典设计、工艺品、可以留很多年的东西", scores: scoreOnly("florence") },
      { label: "先锋设计、小众品牌、实验视觉", scores: scoreOnly("berlin") },
    ],
  },
  {
    id: "q10",
    title: "你最想做哪种账号？",
    options: [
      { label: "展览、书单、策展、文化观察", scores: scoreOnly("uk") },
      { label: "色彩、建筑、穿搭、梦一样的视觉", scores: scoreOnly("barcelona") },
      { label: "自然、留白、极简生活记录", scores: scoreOnly("iceland") },
      { label: "古典艺术、神话、哲学与历史", scores: scoreOnly("greece") },
    ],
  },
  {
    id: "q11",
    title: "理想中的夜晚更像哪一种？",
    options: [
      { label: "街边散步，灯光和空气刚刚好", scores: scoreOnly("paris") },
      { label: "听音乐会，或者读书读到很晚", scores: scoreOnly("vienna") },
      { label: "在古城、教堂、博物馆附近慢慢走", scores: scoreOnly("florence") },
      { label: "去看独立电影、演出或夜间展览", scores: scoreOnly("berlin") },
    ],
  },
  {
    id: "q12",
    title: "你更像哪种旅行搭子？",
    options: [
      { label: "我会先做足功课，再决定怎么逛", scores: scoreOnly("uk") },
      { label: "我更想去最有颜色和感官冲击的地方", scores: scoreOnly("barcelona") },
      { label: "我想去人少、风景大、很安静的地方", scores: scoreOnly("iceland") },
      { label: "我想去最有文明厚度和神话感的地方", scores: scoreOnly("greece") },
    ],
  },
  {
    id: "q13",
    title: "你更偏爱的颜色气质？",
    options: [
      { label: "朦胧柔和、像雾一样", scores: scoreOnly("paris") },
      { label: "中性、干净、理性、克制", scores: scoreOnly("vienna") },
      { label: "温暖、古典、像老画里的颜色", scores: scoreOnly("florence") },
      { label: "强烈、鲜明、带一点锋利", scores: scoreOnly("berlin") },
    ],
  },
  {
    id: "q14",
    title: "什么样的人最吸引你？",
    options: [
      { label: "很会判断世界，也很会组织信息的人", scores: scoreOnly("uk") },
      { label: "有强烈生命力和创造力的人", scores: scoreOnly("barcelona") },
      { label: "冷静、稳定、很少废话的人", scores: scoreOnly("iceland") },
      { label: "有教养、有底蕴、讲话有历史感的人", scores: scoreOnly("greece") },
    ],
  },
  {
    id: "q15",
    title: "你最怕自己变成哪种状态？",
    options: [
      { label: "麻木，对生活没有感受", scores: scoreOnly("paris") },
      { label: "混乱，脑子没有结构", scores: scoreOnly("vienna") },
      { label: "轻飘，没有积累和根基", scores: scoreOnly("florence") },
      { label: "无聊，被规则困住", scores: scoreOnly("berlin") },
    ],
  },
  {
    id: "q16",
    title: "你更想拥有哪种能力？",
    options: [
      { label: "看懂展览、系统表达观点", scores: scoreOnly("uk") },
      { label: "持续创造新的视觉和表达", scores: scoreOnly("barcelona") },
      { label: "在极简和安静中保持力量", scores: scoreOnly("iceland") },
      { label: "让经历沉淀成深度和智慧", scores: scoreOnly("greece") },
    ],
  },
  {
    id: "q17",
    title: "哪种旅行纪念品最打动你？",
    options: [
      { label: "票根、香氛、明信片、胶片照片", scores: scoreOnly("paris") },
      { label: "展览目录、书、资料、地图", scores: scoreOnly("vienna") },
      { label: "工艺品、雕塑复制、经典图案小物", scores: scoreOnly("florence") },
      { label: "小众设计师作品或奇怪收藏", scores: scoreOnly("berlin") },
    ],
  },
  {
    id: "q18",
    title: "你最容易在什么时刻突然觉得“活着真好”？",
    options: [
      { label: "看见一束光、一个街角、一个表情", scores: scoreOnly("uk") },
      { label: "被某种色彩、建筑或想象力猛地击中", scores: scoreOnly("barcelona") },
      { label: "风很大，世界很安静，脑子忽然空下来", scores: scoreOnly("iceland") },
      { label: "站在古迹前，感觉自己被时间包围", scores: scoreOnly("greece") },
    ],
  },
  {
    id: "q19",
    title: "如果一句话概括你的审美追求，会是？",
    options: [
      { label: "有情绪，有呼吸，有余味", scores: scoreOnly("paris") },
      { label: "有逻辑，有层次，有判断", scores: scoreOnly("vienna") },
      { label: "有经典感，有历史感，有沉淀", scores: scoreOnly("florence") },
      { label: "有锋芒，有创造力，有不同", scores: scoreOnly("berlin") },
    ],
  },
  {
    id: "q20",
    title: "最后一题：你更想成为哪一种自己？",
    options: [
      { label: "看得更远、更懂世界的人", scores: scoreOnly("uk") },
      { label: "有想象力，也有热烈生命力的人", scores: scoreOnly("barcelona") },
      { label: "更安静，但更有力量的人", scores: scoreOnly("iceland") },
      { label: "有深度、有文明感的人", scores: scoreOnly("greece") },
    ],
  },
];

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapText(text: string, maxCharsPerLine: number, maxLines: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  const lines: string[] = [];
  let current = "";

  for (const ch of clean) {
    current += ch;
    if (current.length >= maxCharsPerLine) {
      lines.push(current);
      current = "";
      if (lines.length >= maxLines) break;
    }
  }

  if (lines.length < maxLines && current) lines.push(current);

  if (clean.length > maxCharsPerLine * maxLines && lines.length) {
    lines[lines.length - 1] =
      lines[lines.length - 1].slice(0, Math.max(0, maxCharsPerLine - 1)) + "…";
  }

  return lines;
}

function buildPosterSvg(opts: {
  brand: string;
  title: string;
  subtitle: string;
  keywords: string;
  desc: string;
  cities: string;
  artists: string;
  rituals: string;
}) {
  const W = 1080;
  const H = 1600;

  const kwLines = wrapText(opts.keywords, 36, 2);
  const descLines = wrapText(opts.desc, 30, 4);
  const cityLines = wrapText(opts.cities, 32, 2);
  const artistLines = wrapText(opts.artists, 32, 2);
  const ritualLines = wrapText(opts.rituals, 30, 3);

  const t = (s: string) => escapeXml(s);

  const descSvg = descLines
    .map(
      (line, i) => `
      <text x="120" y="${470 + i * 44}"
        font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
        font-size="28"
        font-weight="500"
        fill="#444444">
        ${t(line)}
      </text>`
    )
    .join("");

  const ritualSvg = ritualLines
    .map(
      (line, i) => `
      <text x="120" y="${1175 + i * 42}"
        font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
        font-size="24"
        font-weight="600"
        fill="#111111">
        ${t(line)}
      </text>`
    )
    .join("");

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#fafafa"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#000000" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="70" y="70" width="${W - 140}" height="${H - 140}" rx="44" fill="#ffffff" filter="url(#shadow)"/>
  <rect x="70" y="70" width="${W - 140}" height="${H - 140}" rx="44" fill="none" stroke="#eeeeee"/>

  <text x="120" y="160"
    font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
    font-size="28"
    font-weight="800"
    fill="#111111"
    letter-spacing="0.6">
    ${t(opts.brand)}
  </text>

  <text x="120" y="255"
    font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
    font-size="68"
    font-weight="900"
    fill="#111111">
    ${t(opts.title)}
  </text>

  <text x="120" y="315"
    font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
    font-size="32"
    font-weight="700"
    fill="#333333">
    ${t(opts.subtitle)}
  </text>

  <text x="120" y="385"
    font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
    font-size="22"
    font-weight="600"
    fill="#666666"
    letter-spacing="0.3">
    ${t(kwLines.join("  "))}
  </text>

  <line x1="120" y1="420" x2="${W - 120}" y2="420" stroke="#eeeeee" stroke-width="2"/>

  ${descSvg}

  <line x1="120" y1="660" x2="${W - 120}" y2="660" stroke="#eeeeee" stroke-width="2"/>

  <text x="120" y="740"
    font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
    font-size="20"
    font-weight="700"
    fill="#777777">
    推荐城市
  </text>

  <text x="120" y="790"
    font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
    font-size="34"
    font-weight="900"
    fill="#111111">
    ${t(cityLines.join("  "))}
  </text>

  <text x="120" y="900"
    font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
    font-size="20"
    font-weight="700"
    fill="#777777">
    艺术气质来源
  </text>

  <text x="120" y="950"
    font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
    font-size="30"
    font-weight="800"
    fill="#111111">
    ${t(artistLines.join("  "))}
  </text>

  <text x="120" y="1100"
    font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
    font-size="20"
    font-weight="700"
    fill="#777777">
    今日小练习
  </text>

  ${ritualSvg}

  <line x1="120" y1="${H - 230}" x2="${W - 120}" y2="${H - 230}" stroke="#eeeeee" stroke-width="2"/>

  <text x="120" y="${H - 170}"
    font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
    font-size="18"
    font-weight="600"
    fill="#777777">
    Find your ArtDNA.
  </text>

  <text x="${W - 120}" y="${H - 170}" text-anchor="end"
    font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial"
    font-size="18"
    font-weight="600"
    fill="#777777">
    #ArtDNA  #ArtDNAEurope
  </text>
</svg>`.trim();

  return svg;
}

async function svgToPngBlob(svg: string, width = 1080, height = 1350) {
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.decoding = "async";
  img.src = url;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("SVG 图片加载失败"));
  });

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 不可用");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  URL.revokeObjectURL(url);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png", 1.0)
  );
  if (!blob) throw new Error("PNG 导出失败");
  return blob;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function computeResult(answers: number[]): ArchetypeKey {
  const totals: Record<ArchetypeKey, number> = {
    paris: 0,
    vienna: 0,
    florence: 0,
    berlin: 0,
    uk: 0,
    barcelona: 0,
    iceland: 0,
    greece: 0,
  };

  for (let i = 0; i < QUESTIONS.length; i++) {
    const selected = answers[i];
    if (selected === -1) continue;
    const opt = QUESTIONS[i].options[selected];
    for (const k of KEYS) totals[k] += opt.scores[k] ?? 0;
  }

  let max = -Infinity;
  for (const k of KEYS) max = Math.max(max, totals[k]);

  const maxKeys = KEYS.filter((k) => totals[k] === max);

  let hash = 7;
  for (const v of answers) hash = (hash * 31 + (v + 2)) >>> 0;
  const pickIndex = maxKeys.length ? hash % maxKeys.length : 0;
  return maxKeys[pickIndex] ?? "paris";
}

export default function TestPage() {
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));
  const [done, setDone] = useState(false);

  const answeredCount = useMemo(() => answers.filter((x) => x !== -1).length, [answers]);
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  const resultKey = useMemo(() => (done ? computeResult(answers) : null), [done, answers]);
  const profile = resultKey ? ARCHETYPES[resultKey] : null;

  const canSubmit = answeredCount === QUESTIONS.length;

  const reset = () => {
    setAnswers(Array(QUESTIONS.length).fill(-1));
    setDone(false);
  };

  const buildPosterBlob = async () => {
    if (!profile) return null;

    const svg = buildPosterSvg({
      brand: "ArtDNA · Europe",
      title: profile.title,
      subtitle: profile.subtitle,
      keywords: profile.keywords.join(" · "),
      desc: profile.desc,
      cities: profile.cities.join(" · "),
      artists: profile.artists.join(" · "),
      rituals: profile.rituals.join(" · "),
    });

    const blob = await svgToPngBlob(svg, 1080, 1600);
    return blob;
  };

  const savePosterToAlbum = async () => {
    if (!profile) return;

    try {
      const blob = await buildPosterBlob();
      if (!blob) return;
      downloadBlob(blob, "ArtDNA-Europe-Poster.png");
      alert("海报已保存（下载）✅\n你可以在下载文件中找到它，再保存到相册。");
    } catch (e) {
      console.error(e);
      alert("保存海报失败：请刷新页面重试");
    }
  };

  return (
    <main style={S.page}>
      <div style={S.card}>
        <header style={S.header}>
          <div>
            <div style={S.brand}>ArtDNA · Europe</div>
            <div style={S.small}>艺术人格测试 · 20题 · 8种结果</div>
          </div>
          <a href="/" style={S.backLink}>
            ← 返回首页
          </a>
        </header>

        {!done && (
          <>
            <div style={S.progressWrap}>
              <div style={S.progressBarBg}>
                <div style={{ ...S.progressBarFill, width: `${progress}%` }} />
              </div>
              <div style={S.progressText}>
                {answeredCount}/{QUESTIONS.length} · {progress}%
              </div>
            </div>

            <div style={S.list}>
              {QUESTIONS.map((q, qi) => (
                <section key={q.id} style={S.qBlock}>
                  <div style={S.qTitle}>
                    {qi + 1}. {q.title}
                  </div>

                  <div style={S.options}>
                    {q.options.map((opt, oi) => {
                      const selected = answers[qi] === oi;
                      return (
                        <button
                          key={oi}
                          onClick={() => {
                            const next = [...answers];
                            next[qi] = oi;
                            setAnswers(next);
                          }}
                          style={{
                            ...S.optionBtn,
                            ...(selected ? S.optionBtnSelected : {}),
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            <button
              onClick={() => {
                if (!canSubmit) {
                  alert("请先完成所有题目 ✅");
                  return;
                }
                setDone(true);
              }}
              style={{
                ...S.primaryBtn,
                opacity: canSubmit ? 1 : 0.45,
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
            >
              查看我的艺术人格
            </button>
          </>
        )}

        {done && profile && (
          <div style={S.resultWrap}>
            <div style={S.resultTop}>
              <div style={S.resultLabel}>你的艺术人格</div>
              <div style={S.resultTitle}>{profile.title}</div>
              <div style={S.resultSub}>{profile.subtitle}</div>
              <div style={S.keywords}>{profile.keywords.join(" · ")}</div>
            </div>

            <p style={S.desc}>{profile.desc}</p>

            <div style={S.row}>
              <div style={S.kv}>
                <div style={S.k}>推荐城市</div>
                <div style={S.v}>{profile.cities.join(" · ")}</div>
              </div>
              <div style={S.kv}>
                <div style={S.k}>艺术气质来源</div>
                <div style={S.v}>{profile.artists.join(" · ")}</div>
              </div>
            </div>

            <div style={S.kvWide}>
              <div style={S.k}>今日疗愈小练习</div>
              <div style={S.v}>{profile.rituals.join(" · ")}</div>
            </div>

<div style={S.actionsStack}>
  <button onClick={savePosterToAlbum} style={S.primaryBtn}>
    保存海报到相册
  </button>

  <button onClick={reset} style={S.ghostBtn}>
    重新测试
  </button>
</div>
          </div>
        )}
      </div>
    </main>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3f3f3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: "#111",
  },
  card: {
    width: 760,
    maxWidth: "100%",
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    padding: 28,
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },
  brand: { fontSize: 22, fontWeight: 800, letterSpacing: 0.2 },
  small: { fontSize: 12, color: "#666", marginTop: 6 },
  backLink: { fontSize: 12, color: "#111", textDecoration: "none", opacity: 0.75 },

  progressWrap: { marginBottom: 18 },
  progressBarBg: { height: 8, background: "#eee", borderRadius: 99, overflow: "hidden" },
  progressBarFill: { height: 8, background: "#111", borderRadius: 99 },
  progressText: { marginTop: 8, fontSize: 12, color: "#666" },

  list: { display: "flex", flexDirection: "column", gap: 16, marginBottom: 18 },
  qBlock: { padding: 16, borderRadius: 16, background: "#fafafa", border: "1px solid #eee" },
  qTitle: { fontSize: 14, fontWeight: 700, marginBottom: 10, lineHeight: 1.5 },
  options: { display: "grid", gridTemplateColumns: "1fr", gap: 10 },

  optionBtn: {
    textAlign: "left",
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #e6e6e6",
    background: "#fff",
    cursor: "pointer",
    lineHeight: 1.35,
  },
  optionBtnSelected: {
    background: "#111",
    color: "#fff",
    border: "1px solid #111",
  },

  primaryBtn: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    background: "#111",
    color: "#fff",
    border: "none",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryBtn: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    background: "#eee",
    color: "#111",
    border: "none",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },

  resultWrap: { paddingTop: 20, paddingBottom: 10 },
  resultTop: { textAlign: "center" },
  resultLabel: { fontSize: 12, color: "#666" },
  resultTitle: { fontSize: 46, fontWeight: 900, marginTop: 10, letterSpacing: "-0.5px" },
  resultSub: { fontSize: 18, color: "#444", marginTop: 8, fontWeight: 700 },
  keywords: { marginTop: 14, fontSize: 14, color: "#666", letterSpacing: "0.5px" },

  desc: { marginTop: 18, lineHeight: 1.9, color: "#333", fontSize: 16 },

  row: { marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  kv: { padding: 14, borderRadius: 16, background: "#fafafa", border: "1px solid #eee" },
  kvWide: { marginTop: 12, padding: 14, borderRadius: 16, background: "#fafafa", border: "1px solid #eee" },
  k: { fontSize: 12, color: "#666", marginBottom: 6 },
  v: { fontSize: 14, fontWeight: 700, lineHeight: 1.5 },

  actionsStack: {
    marginTop: 14,
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
  },

  ghostBtn: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    background: "#f7f7f7",
    color: "#111",
    border: "1px solid #e5e5e5",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
};