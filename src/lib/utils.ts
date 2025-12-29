import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const adjectives = [
  "쫄깃한",
  "고소한",
  "담백한",
  "부드러운",
  "풍미있는",
  "진한",
  "깔끔한",
  "촉촉한",
  "고급스러운",
  "클래식한",
  "산뜻한",
  "리치한",
  "정통의",
  "크리미한",
  "알덴테의",
  "향긋한",
  "소박한",
  "든든한",
  "따뜻한",
  "감칠맛나는",
];

const nouns = [
  "스파게티",
  "페투치네",
  "링귀네",
  "탈리아텔레",
  "부카티니",
  "카펠리니",
  "파파르델레",
  "펜네",
  "리카토니",
  "마카로니",
  "푸실리",
  "로티니",
  "파르팔레",
  "콘킬리에",
  "오레키에테",
  "뇨끼",
  "라자냐",
  "카넬로니",
  "토르텔리니",
  "라비올리",
];

export const getRandomNickname = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);

  return `${adjective}${noun}${number}`;
};
