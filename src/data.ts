import { MenuItem } from './types';

export const STORE_INFO = {
  name: '현풍닭칼국수 강남역삼점',
  slogan: '한 끼의 식사라도 건강을 생각하겠습니다',
  phone: '02-6954-2118',
  address: '서울 강남구 테헤란로20길 19',
  addressDetail: '강남역 3번/4번 출구 & 역삼역 3번 출구 사이 도보 5분',
  hours: {
    weekday: {
      open: '11:00',
      close: '21:00',
      lastOrder: '20:30',
    },
    weekend: {
      open: '11:00',
      close: '20:00',
      lastOrder: '19:30',
    }
  },
  packagingInfo: '각 메뉴당 용기 및 패키징 비용 1,000원 추가',
};

// Map generated images to human-friendly keys or relative paths
export const IMAGES = {
  kalguksu: '/src/assets/images/chicken_kalguksu_hero_1781226845846.jpg',
  suyeok: '/src/assets/images/herbal_suyeok_menu_1781226867990.jpg',
  coldNoodle: '/src/assets/images/cold_noodles_menu_1781226884501.jpg',
};

export const MENU_ITEMS: MenuItem[] = [
  // 메인메뉴
  {
    id: 'm1',
    name: '닭칼국수',
    price: 9000,
    description: '현풍의 시그니처! 장시간 우려낸 깊고 구수한 순백의 닭육수와 쫄깃한 면발, 촉촉한 닭가슴살 고명의 완벽한 조화',
    category: 'main',
    isPopular: true,
    image: IMAGES.kalguksu
  },
  {
    id: 'm2',
    name: '삼계칼국수',
    price: 11500,
    description: '칼국수에 삼계탕 한 그릇을 통째로! 인삼, 대추와 함께 뼈째 잘 푹 고아낸 보양 특선 칼국수',
    category: 'main',
    isSpecial: true,
    image: IMAGES.kalguksu
  },
  {
    id: 'm3',
    name: '닭칼국수(곱배기)',
    price: 9500,
    description: '국수 마니아분들을 위해 곱배기로 푸짐하고 든든하게 대접합니다',
    category: 'main',
    isPopular: true,
    image: IMAGES.kalguksu
  },
  {
    id: 'm4',
    name: '닭곰탕',
    price: 9500,
    description: '면보다 든든한 밥이 생각날 때! 맑고 깊은 닭육수에 촉촉한 닭살을 넣어 밥 한 그릇 말아 뚝딱 비우는 최고 보양식',
    category: 'main',
    image: IMAGES.kalguksu
  },
  {
    id: 'm5',
    name: '닭곰탕(특)',
    price: 10000,
    description: '더 넉넉한 닭가슴살 고명과 뜨끈하고 풍성한 국물로 가득 채운 진귀한 보양 닭곰탕',
    category: 'main',
    image: IMAGES.kalguksu
  },

  // 식사 및 세트메뉴 (수육 포함)
  {
    id: 'c1',
    name: '닭칼수육세트',
    price: 17000,
    description: '닭칼국수와 야들야들한 한방 미니수육을 한 번에! 가장 많은 사랑을 받는 1인 실속 만족 세트',
    category: 'combo',
    isPopular: true,
    image: IMAGES.suyeok
  },
  {
    id: 'c2',
    name: '미니수육 (닭곰탕 세트)',
    price: 11000,
    description: '명품 닭곰탕에 미니수육을 곁들여 단백질 가득하게 채우는 최고의 보양 한 상 차림 (단품 닭곰탕 8,000원 기준 수육 업그레이드 조합)',
    category: 'combo',
    image: IMAGES.suyeok
  },
  {
    id: 'c3',
    name: '한방수육',
    price: 23000,
    description: '몸에 좋은 한방 약재와 함께 푹 삶아 기름기는 쏙 빼고 담백함과 부드러운 육질만 살린 명품 요리수육',
    category: 'combo',
    isSpecial: true,
    image: IMAGES.suyeok
  },
  {
    id: 'c4',
    name: '현풍왕족발한접시',
    price: 25000,
    description: '탱글탱글 쫄깃하고 깊은 풍미의 족발을 특제 소스와 함께 한 접시 푸짐하게 즐기는 사이드 안주 메뉴',
    category: 'combo',
    image: IMAGES.suyeok
  },

  // 여름메뉴
  {
    id: 's1',
    name: '김치말이냉국수',
    price: 9000,
    description: '얼음이 동동 뜨는 매콤·탄산 터지는 비법 동치미 김치 육수에 쫄깃한 면발과 아삭한 김치 고명으로 더위 격파!',
    category: 'summer',
    isPopular: true,
    image: IMAGES.coldNoodle
  },
  {
    id: 's2',
    name: '김치말이냉국수(특집)',
    price: 10000,
    description: '여름 무더위를 단숨에 날려버릴 곱배기 육수와 넉넉하고 시원한 면발 특집 구성',
    category: 'summer',
    isSpecial: true,
    image: IMAGES.coldNoodle
  },

  // 겨울메뉴
  {
    id: 'w1',
    name: '멸치칼국수',
    price: 8500,
    description: '찬 바람 부는 계절, 남해안 멸치를 진하게 우려내어 시원하고 개운하게 속을 달래주는 깊은 겨울 바다의 맛',
    category: 'winter',
    image: IMAGES.kalguksu
  },

  // 사이드메뉴
  {
    id: 'sd1',
    name: '김치손만두',
    price: 5000,
    description: '얇고 쫄깃한 만두피 속을 매콤칼칼한 김치와 야채로 꽉 채운 수제 손만두 (5pcs)',
    category: 'side',
    isPopular: true,
  },
  {
    id: 'sd2',
    name: '갈비만두',
    price: 5000,
    description: '은은한 숯불 갈비향의 달콤 짭조름한 양념 고기가 가득 차서 칼국수 매운맛과 찰떡궁합인 별미 만두',
    category: 'side',
  },
  {
    id: 'sd3',
    name: '고기손만두',
    price: 5000,
    description: '육즙 가득한 한돈과 신선한 야채가 조화롭게 녹아들어 부드러움의 극치를 달리는 수제 고기만두',
    category: 'side',
  }
];

// 피크타임 혼잡도 및 혼밥 만족팁 데이터
export const PEAK_HOURS = [
  { hour: '11:00', busyLevel: 25, label: '여유로움', color: 'bg-emerald-500' },
  { hour: '11:30', busyLevel: 45, label: '조금 혼잡', color: 'bg-amber-500' },
  { hour: '11:50', busyLevel: 95, label: '매우 혼잡 (직장인 피크)', color: 'bg-red-500' },
  { hour: '12:20', busyLevel: 99, label: '매우 혼잡 (대기 있음)', color: 'bg-red-500' },
  { hour: '12:50', busyLevel: 70, label: '순차 입점중', color: 'bg-amber-500' },
  { hour: '13:20', busyLevel: 35, label: '쾌적함', color: 'bg-emerald-500' },
  { hour: '14:00', busyLevel: 15, label: '여유로움', color: 'bg-emerald-500' },
];

export const WAITING_TIPS = [
  {
    title: '빠른 회전율의 비밀',
    desc: '칼국수 단일 대표 메뉴에 최적화된 시스템과 신속한 조리로, 대기열이 있어도 평균 대기 시간 10~15분 내외로 착석 가능합니다.'
  },
  {
    title: '혼밥족을 위한 최고의 솔루션',
    desc: '창가와 중심부에 넓은 1인 전용 바(Bar) 테이블이 가득 마련되어 있어, 대기가 긴 직장인 피크타임에도 1인 고용 방문 시 2~4인 팀보다 빠르게 선입장할 수 있습니다.'
  },
  {
    title: '전설의 매운 실비김치',
    desc: '현풍닭칼국수의 트레이드마크! 마성의 아주 매운 전설 실비김치와 누구나 부담 없이 먹을 수 있는 안매운 김치가 상시 완비되어 있습니다. (반반 선택도 당연히 가능!)'
  }
];
