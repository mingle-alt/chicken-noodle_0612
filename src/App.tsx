import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Calendar,
  Users,
  Utensils,
  Check,
  AlertCircle,
  TrendingUp,
  Map,
  X,
  Plus,
  Minus,
  CheckCircle2,
  Bell,
  Heart,
  Share2,
  Compass,
  ArrowRight,
  Search,
  MessageSquare,
  Flame,
  Info,
  Timer,
  Star
} from 'lucide-react';
import { STORE_INFO, MENU_ITEMS, PEAK_HOURS, WAITING_TIPS } from './data';
import { MenuItem, Booking, CartItem, PickupOrder } from './types';

const HERITAGE_MILESTONES = [
  {
    year: '1900년대비 대구 현풍',
    title: '대를 이은 비법 보양 육수',
    desc: '천연 한방 약재와 신선한 뼈를 사나흘 푹 고아내어 묵직하고 고소한 "순백의 국물"을 담아냈습니다. 촉촉하고 야들야들한 닭살 고명을 올린 한 그릇은 단순한 한 그릇을 넘어 소화가 쉽고 든든한 강사들의 소중한 한 끼였습니다.',
    secretReward: 'HERITAGE_HONEY'
  },
  {
    year: '천연벌꿀 숙성 발효김치',
    title: '매콤 칼칼 실비김치의 탄생',
    desc: '강원도 청정 유기농 고춧가루와 국내산 야생 벌꿀을 저온 숙성해 캡사이신 없이 가미된 건강한 맵싹함을 탄생시켰습니다. 칼국수 국물에 국수를 말아 먹을 때 최고의 하모니를 자랑하며 전국 해장인들을 뒤흔들었습니다.',
    secretReward: 'SWEET_SPICY'
  },
  {
    year: '삼계수육 국가브랜드 특허',
    title: '인삼 한 통을 고스란히 영양 가득',
    desc: '칼국수 면발에 장뇌삼과 대추, 보들보들 고아낸 삼계 통닭 한 마리를 수육 한 상처럼 얹어낸 영양 특허 삼계칼국수가 시그니처로 인정받으며, 매년 여름 초중말복 직장인 영양제로 입소문을 타게 되었습니다.',
    secretReward: 'SAMGYE_SOUP'
  },
  {
    year: '강남역삼 스마트 가인',
    title: '혼밥 매니아 & 쾌속 오더 가이드',
    desc: '바쁜 오피스 현대인을 위해 착석 후 5분 내 초고속 힐링 식사를 완비하고, 1인용 창가 바(Bar)와 콘센트, 옷걸이를 완비해 눈치 없이 실비김치 국물을 흡입할 수 있는 최고의 스마트 힐링 플레이스로 선언되었습니다.',
    secretReward: 'GANGNAM_SOLO'
  }
];

const DEFAULT_FEEDBACKS = [
  { id: 'f1', name: '역삼동 직장인 한상현', rating: 5, tag: '#매운실비김치', content: '여기가 제 영혼의 해장 성지입니다! 3단계 반반 김치로 딱 올려먹으면 콧잔등에 땀이 나면서 피로가 리세팅되는 느낌이에요. 칼수육 세트 조합이 진짜 대박적 영양 보양식입니다.', date: '2026-06-11' },
  { id: 'f2', name: '혼밥 마스터 박진아', rating: 5, tag: '#혼밥프렌들리', content: '원래 맛집 혼자 가기 조금 쑥스러운데 여긴 1인 전용 바가 잘 되어 있어서 너무 아늑해요! 더군다나 1인 손님은 웨이팅 프리패스해 주실 때도 있어서 최고의 회전율 인정입니다.', date: '2026-06-11' },
  { id: 'f3', name: 'IT개발자 이민우', rating: 4.8, tag: '#닭칼수육콤보', content: '삼계칼국수 닭고기가 뼛속까지 야들야들하게 빠지네요. 인삼 냄새도 부담스럽지 않아서 몸보신 제대로 하고 갑니다. 포장 픽업도 전용 용기가 깔끔해서 넘 좋습니다.', date: '2026-06-10' }
];

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'wait' | 'history'>('home');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'main' | 'combo' | 'summer' | 'winter' | 'side'>('all');
  
  // Spice Slider state (1 to 5)
  const [spiceLevel, setSpiceLevel] = useState<number>(3);
  
  // Web Portal Interactivity States
  const [heritageIdx, setHeritageIdx] = useState(0);
  const [combMain, setCombMain] = useState('m1'); // 닭칼국수
  const [combSide, setCombSide] = useState('sd2'); // 갈비만두
  const [combSpice, setCombSpice] = useState(3); // 3단계
  const [unlockedSecrets, setUnlockedSecrets] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [fbName, setFbName] = useState('');
  const [fbContent, setFbContent] = useState('');
  const [fbRating, setFbRating] = useState(5);
  const [fbActiveTag, setFbActiveTag] = useState('#매운실비김치');

  // Booking state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-06-12');
  const [bookingTime, setBookingTime] = useState('12:00');
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingKimchi, setBookingKimchi] = useState<'spicy' | 'mild' | 'half'>('half');
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);
  
  // Shopping Cart & Order State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<PickupOrder[]>([]);
  const [orderName, setOrderName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderTime, setOrderTime] = useState('12:15');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);
  
  // Modal / Drawer toggles
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [likedMenus, setLikedMenus] = useState<Record<string, boolean>>({});
  
  // Interactive Wait Planner tool states
  const [planTime, setPlanTime] = useState('12:20');
  const [planGuests, setPlanGuests] = useState(1);
  const [calculatedWaitResult, setCalculatedWaitResult] = useState<{
    waitMinutes: number;
    status: string;
    badgeColor: string;
    advice: string;
  } | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem('hyeonpung_bookings');
    const savedOrders = localStorage.getItem('hyeonpung_orders');
    const savedFeedbacks = localStorage.getItem('hyeonpung_feedbacks');
    const savedSecrets = localStorage.getItem('hyeonpung_secrets');
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedFeedbacks) {
      setFeedbacks(JSON.parse(savedFeedbacks));
    } else {
      setFeedbacks(DEFAULT_FEEDBACKS);
    }
    if (savedSecrets) setUnlockedSecrets(JSON.parse(savedSecrets));
  }, []);

  const saveFeedbacksToLocal = (newFeedbacks: any[]) => {
    localStorage.setItem('hyeonpung_feedbacks', JSON.stringify(newFeedbacks));
    setFeedbacks(newFeedbacks);
  };

  const saveSecretsToLocal = (newSecrets: string[]) => {
    localStorage.setItem('hyeonpung_secrets', JSON.stringify(newSecrets));
    setUnlockedSecrets(newSecrets);
  };

  // Sync to LocalStorage function
  const saveBookingToLocal = (newBookings: Booking[]) => {
    localStorage.setItem('hyeonpung_bookings', JSON.stringify(newBookings));
    setBookings(newBookings);
  };

  const saveOrderToLocal = (newOrders: PickupOrder[]) => {
    localStorage.setItem('hyeonpung_orders', JSON.stringify(newOrders));
    setOrders(newOrders);
  };

  // Run dynamic calculation for Wait Planner when planner states update
  useEffect(() => {
    calculateWaitTime(planTime, planGuests);
  }, [planTime, planGuests]);

  // Calculate wait time dynamically based on the inputs
  const calculateWaitTime = (time: string, guests: number) => {
    const hourMin = time.split(':');
    const hour = parseInt(hourMin[0]);
    const min = parseInt(hourMin[1]);
    const numericTime = hour * 100 + min;

    let waitMinutes = 0;
    let status = '여유로움';
    let badgeColor = 'bg-emerald-500 text-white';
    let advice = '바 테이블과 다인용 테이블 모두 여유있어 원하시는 자리에 바로 앉으실 수 있습니다.';

    if (numericTime >= 1100 && numericTime < 1145) {
      waitMinutes = 0;
      status = '여유로움';
      badgeColor = 'bg-emerald-500 text-white';
      advice = '점심 식사 시간 이전으로 웨이팅 없이 곧바로 맛있는 보양 식사가 가능합니다!';
    } else if (numericTime >= 1145 && numericTime <= 1230) {
      if (guests === 1) {
        waitMinutes = 3;
        status = '혼밥 찬스! 대기 초고속';
        badgeColor = 'bg-amber-500 text-white';
        advice = '피크타임이지만, 1인용 전용 바(Bar) 테이블이 마련되어 있어 2인 이상 대기줄을 건너뛰고 빠른 착석이 가능합니다.';
      } else {
        waitMinutes = 15;
        status = '평일 직장인 최고 피크';
        badgeColor = 'bg-red-500 text-white';
        advice = '한창 직장인 점심 피크입니다. 칼국수 특성상 테이블 빠른 회전율로 대기줄이 길어 보여도 평균 15분 내외로 착석합니다.';
      }
    } else if (numericTime > 1230 && numericTime <= 1315) {
      if (guests === 1) {
        waitMinutes = 0;
        status = '쾌적함 (1인 즉시입장)';
        badgeColor = 'bg-emerald-500 text-white';
        advice = '바 카운터 자리가 넉넉하여 즉시 입장이 가능합니다.';
      } else {
        waitMinutes = 5;
        status = '순차적 여유 입점중';
        badgeColor = 'bg-amber-600 text-white';
        advice = '식사팀들이 빠지기 시작하는 시간대로 가벼운 대기 후 즉시 입장이 가능합니다.';
      }
    } else if (numericTime > 1315 && numericTime <= 1700) {
      waitMinutes = 0;
      status = '매우 한적하고 여유로움';
      badgeColor = 'bg-emerald-500 text-white';
      advice = '오후 브레이크 타임 없이 연중 상시 쾌적하게 식사 및 혼밥할 수 있는 최적의 힐링타임입니다.';
    } else if (numericTime > 1700 && numericTime <= 1930) {
      waitMinutes = guests >= 4 ? 8 : 0;
      status = '조금 혼잡 (저녁 식사)';
      badgeColor = 'bg-blue-500 text-white';
      advice = '퇴근 후 저녁 푸근하게 한방 조리된 삼계칼국수나 닭칼수육세트 한 상을 든든히 드시기 좋으며, 자리가 비교적 넉넉합니다.';
    } else {
      waitMinutes = 0;
      status = '여유로움 (마감 전)';
      badgeColor = 'bg-neutral-500 text-white';
      advice = '라스트 오더에 맞춘 한 그릇의 든든한 마무리! 편안하게 식사가 가능합니다.';
    }

    setCalculatedWaitResult({ waitMinutes, status, badgeColor, advice });
  };

  // Get active menu categories
  const filteredMenuItems = selectedCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  // Liked menus toggling
  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Spice level visual description helpers
  const getSpiceStyle = (level: number) => {
    switch (level) {
      case 1:
        return {
          title: '0단계: 안매운 김치 (기본 개운한 맛)',
          desc: '아이부터 매운맛을 전혀 손대지 못하시는 소중한 맵린이 분들까지, 오직 아삭하고 달착지근한 오리지널 김치의 풍미.',
          flavor: '담백 & 개운함',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          gaugeColor: 'bg-emerald-500',
          imageStyle: 'sepia-0 saturate-100'
        };
      case 2:
        return {
          title: '2단계: 부드러운 순한 매운맛',
          desc: '살짝 매콤한 기운을 가미하여, 칼국수 본연의 묵직하고 고소한 국물을 헤치지 않으면서 감칠맛을 서서히 돋워줍니다.',
          flavor: '은은한 매콤달콤',
          color: 'bg-amber-500/10 text-amber-800 border-amber-300',
          gaugeColor: 'bg-amber-400',
          imageStyle: 'saturate-120 hue-rotate-15'
        };
      case 3:
        return {
          title: '3단계: 대박 반반 조합 (황금 밸런스)',
          desc: '현풍의 대표 꿀팁! 매운 실비김치와 안매운 김치를 50:50 조합하여 국수 국물에 척 걸쳐 먹으면 해장과 보양을 동시에 완결!',
          flavor: '칼칼 & 고소 매운맛',
          color: 'bg-orange-500/15 text-orange-800 border-orange-400',
          gaugeColor: 'bg-orange-500',
          imageStyle: 'saturate-150 hue-rotate-30 brightness-95'
        };
      case 4:
        return {
          title: '4단계: 기분 좋은 땀방울 매운맛',
          desc: '매운 김치의 칼칼함이 은은하게 퍼지며 두피가 자극되는 마성의 맛. 한 그릇 뚝딱 비우면 사우나실에 온 듯 피로가 풀립니다.',
          flavor: '두피 톡톡 스트레스 격파',
          color: 'bg-red-500/10 text-red-800 border-red-300',
          gaugeColor: 'bg-red-400',
          imageStyle: 'saturate-200 hue-rotate-45 brightness-90'
        };
      case 5:
      default:
        return {
          title: '5단계: 전설의 매운 실비 김치 (명물!)',
          desc: '한 입 먹자마자 전신에 찌르르 퍼지는 캡사이신-프리 비법 천연 벌꿀 고춧가루 매운김치! 중독성 1000%의 현풍 시그니처.',
          flavor: '땀이 송골송골 마성 극강의 매운맛',
          color: 'bg-rose-100 text-rose-900 border-rose-400',
          gaugeColor: 'bg-rose-600 animate-pulse',
          imageStyle: 'saturate-250 hue-rotate-60 brightness-75'
        };
    }
  };

  const currentSpiceDesc = getSpiceStyle(spiceLevel);

  // Cart operations
  const addToCart = (item: MenuItem) => {
    const existing = cart.find(c => c.menuItem.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, {
        menuItem: item,
        quantity: 1,
        options: { kimchiType: 'half', noodleOption: 'normal' }
      }]);
    }
    // Mini animation toggle can be done, trigger cart open
    setIsCartOpen(true);
  };

  const updateCartQty = (id: string, delta: number) => {
    const item = cart.find(c => c.menuItem.id === id);
    if (!item) return;
    const nextQty = item.quantity + delta;
    if (nextQty <= 0) {
      setCart(cart.filter(c => c.menuItem.id !== id));
    } else {
      setCart(cart.map(c => c.menuItem.id === id ? { ...c, quantity: nextQty } : c));
    }
  };

  const updateCartKimchi = (id: string, type: 'spicy' | 'mild' | 'half') => {
    setCart(cart.map(c => c.menuItem.id === id ? {
      ...c,
      options: { ...c.options, kimchiType: type }
    } : c));
  };

  // Global total calculating with packaging fee (+1,000 won per menu ITEM)
  const packagingFeeTotal = cart.reduce((acc, c) => acc + (1000 * c.quantity), 0);
  const cartSubtotal = cart.reduce((acc, c) => acc + (c.menuItem.price * c.quantity), 0);
  const cartTotal = cartSubtotal + packagingFeeTotal;

  // Handles submitting Online Booking (Table)
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone) {
      alert('예약자명과 휴대폰 번호를 입력해주세요.');
      return;
    }
    const newBooking: Booking = {
      id: 'B-' + Math.floor(Math.random() * 900000 + 100000),
      name: bookingName,
      phone: bookingPhone,
      date: bookingDate,
      time: bookingTime,
      guests: bookingGuests,
      notes: `${bookingKimchi === 'spicy' ? '매운 실비김치 팍팍' : bookingKimchi === 'mild' ? '안매운 김치 위주' : '김치 반반 반찬'} / ${bookingNotes}`,
      status: 'confirmed', // immediately auto-confirmed for amazing customer feedback
      createdAt: new Date().toISOString()
    };

    const nextBookings = [newBooking, ...bookings];
    saveBookingToLocal(nextBookings);
    setBookingSuccessId(newBooking.id);
    setShowBookingModal(false);
    setActiveTab('history'); // direct to history immediately to see confirmation ticket
    
    // reset form
    setBookingName('');
    setBookingPhone('');
    setBookingNotes('');
  };

  // Handles submitting Pickup Order
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderName || !orderPhone) {
      alert('주문자명과 휴대폰 연락처를 올바르게 작성해주세요.');
      return;
    }
    if (cart.length === 0) return;

    const newOrder: PickupOrder = {
      id: 'O-' + Math.floor(Math.random() * 900000 + 100000),
      name: orderName,
      phone: orderPhone,
      items: [...cart],
      totalAmount: cartTotal,
      packagingFee: packagingFeeTotal,
      status: 'preparing', // immediately cooks
      pickupTime: orderTime,
      createdAt: new Date().toISOString()
    };

    const nextOrders = [newOrder, ...orders];
    saveOrderToLocal(nextOrders);
    setOrderSuccessId(newOrder.id);
    setCart([]); // vacant cart
    setIsCartOpen(false);
    setActiveTab('history'); // direct to history immediately to view processing progress bar

    // reset order details
    setOrderName('');
    setOrderPhone('');
    setOrderNotes('');
  };

  // Simulate progress updates for orders
  useEffect(() => {
    if (orders.length === 0) return;
    const interval = setInterval(() => {
      // randomly advance orders status from preparing to ready just for simulation realism
      const modified = orders.map(ord => {
        if (ord.status === 'preparing') {
          // 40% chance of progressing
          if (Math.random() > 0.6) {
            return { ...ord, status: 'ready' as const };
          }
        }
        return ord;
      });
      // if change occurred, save
      if (JSON.stringify(modified) !== JSON.stringify(orders)) {
        saveOrderToLocal(modified);
      }
    }, 15000); // check status every 15s

    return () => clearInterval(interval);
  }, [orders]);

  // Cancel dynamic booking
  const cancelBooking = (id: string) => {
    if (confirm('예약을 정말 취소하시겠습니까?')) {
      const updated = bookings.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b);
      saveBookingToLocal(updated);
    }
  };

  // Share action simulation
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: STORE_INFO.name,
        text: `${STORE_INFO.slogan} - 강남역 최고 가성비 닭보양식!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('클립보드에 현풍닭칼국수 주소가 복사되었습니다. 소중한 지인에게 공유해 보세요!');
    }
  };

  // Determine current congestion level based on simulated real time or user preview hour
  const getSimulatedLiveStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeVal = currentHour * 100 + currentMinutes;

    if (currentTimeVal >= 1150 && currentTimeVal <= 1250) {
      return {
        label: '직장인 집중 피크타임 (대기발생)',
        statusColor: 'text-rose-600 animate-pulse',
        bulletColor: 'bg-rose-600',
        waitTip: '1인 바테이블 입장은 즉시 착석 가능성이 매우 높습니다.'
      };
    } else if (currentTimeVal >= 1100 && currentTimeVal < 1430) {
      return {
        label: '점심 식사 입점중 (상시 빠른회전)',
        statusColor: 'text-amber-500',
        bulletColor: 'bg-amber-500',
        waitTip: '회전율이 칼국수 평균 10분내로 매우 빠릅니다.'
      };
    } else if (currentTimeVal >= 1800 && currentTimeVal <= 1930) {
      return {
        label: '저녁 보양 식사 성황리 입점 중',
        statusColor: 'text-blue-500',
        bulletColor: 'bg-blue-500',
        waitTip: '수육에 맥주나 칼국수 세트 주문이 인기에요!'
      };
    } else {
      return {
        label: '연중 상시 쾌적 (대기 없음)',
        statusColor: 'text-emerald-500',
        bulletColor: 'bg-emerald-500',
        waitTip: '바 테이블 및 좌석 모두 매우 한적합니다.'
      };
    }
  };

  const liveStatus = getSimulatedLiveStatus();

  // Weather recommends configurations
  const [activeWeather, setActiveWeather] = useState<'rainy' | 'sunny' | 'cold' | 'hot'>('rainy');
  const getWeatherRecommendation = (weather: typeof activeWeather) => {
    switch (weather) {
      case 'rainy':
        return {
          title: '비오는 날 촉촉 해장팩',
          main: 'm1', // 닭칼국수
          side: 'sd1', // 김치손만두
          spice: 4,
          comment: '가마솥 끓는 소리가 빗소리처럼 푸근하게 들리는 날엔, 담백하고 뜨거운 오리지널 닭칼국수에 땀 쑥 빠지는 실비김치 4단계, 속을 따스히 달래주는 영양 가득 김치손만두 조합을 적극 권가장 강추합니다.',
          badge: '🌧️ 강수 극복 보양조화 제안'
        };
      case 'sunny':
        return {
          title: '맑은 날 한낮 에너지팩',
          main: 'm2', // 삼계칼국수
          side: 'sd2', // 갈비만두
          spice: 2,
          comment: '청명하고 화창하지만 기운찬 활력이 필요한 날씨에는 특허받은 영양 삼계칼국수와 달달함 가득 숯불향 갈비만두를 가미해 에너지를 터뜨려주세요. 자극 없이 부드러운 순한 매콤 2단계 김치가 명품입니다.',
          badge: '☀️ 고단백 에너지 충전 제안'
        };
      case 'cold':
        return {
          title: '칼바람 철벽 방한팩',
          main: 'm4', // 닭곰탕
          side: 'c3', // 한방수육
          spice: 3,
          comment: '오슬오슬 손발이 시린 찬 바람 부는 날씨엔, 뜨끈하고 푸짐한 가마솥 닭곰탕 맑은 국물에 한방 약재로 푹 삶은 부드러운 요리수육 한 점을 올리고 3단계 반반 김치로 개운하게 마침표를 찍어보세요.',
          badge: '❄️ 체온상승 보습 온기 제안'
        };
      case 'hot':
      default:
        return {
          title: '불볕더위 시원타격 아이스팩',
          main: 's1', // 김치말이냉국수
          side: 'sd2', // 갈비만두
          spice: 1,
          comment: '기진맥진 지치고 습한 무더위에는 속까지 얼어붙는 비법 김치말이냉국수가 제격입니다. 아늑하고 시원한 얼음 한술에 따뜻달달한 갈비만두 한입 척 올려먹으면 맵단의 무아지경을 맛보여 드립니다.',
          badge: '🔥 삼복더위 올킬 아이스 제안'
        };
    }
  };

  const weatherConfig = getWeatherRecommendation(activeWeather);

  // Apply visual combo to mobile simulator live
  const handleApplyComboToSimulator = (mainId: string, sideId: string, spiceVal: number) => {
    const mainDish = MENU_ITEMS.find(m => m.id === mainId);
    const sideDish = MENU_ITEMS.find(m => m.id === sideId);
    if (mainDish) addToCart(mainDish);
    if (sideDish) addToCart(sideDish);
    setSpiceLevel(spiceVal);
    // Switch to active tab menu to see items instantly
    setActiveTab('menu');
    setSelectedCategory('all');
    // Open cart drawer immediately to let users see the action
    setIsCartOpen(true);
  };

  // Add guestbook feedback
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbName.trim() || !fbContent.trim()) {
      alert('성함과 의견을 모두 입력해 주세요!');
      return;
    }
    const newFb = {
      id: 'fb-' + Date.now(),
      name: fbName.trim(),
      rating: fbRating,
      tag: fbActiveTag,
      content: fbContent.trim(),
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [newFb, ...feedbacks];
    saveFeedbacksToLocal(updated);
    setFbName('');
    setFbContent('');
    alert('🎉 단골 한줄평 방명록 쓰기가 성공적으로 완료되었습니다! 웹과 모바일 시스템에 즉각 영구 갱신됩니다.');
  };

  return (
    <div className="min-h-screen bg-[#efeee9] flex items-center justify-center py-0 md:py-10 px-0 md:px-4 lg:px-6 font-sans transition-colors duration-300">
      
      {/* Visual background pattern behind the device mock */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden hidden md:block">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-400 rounded-full filter blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold-300 rounded-full filter blur-[150px] animation-delay-2000"></div>
      </div>

      {/* Main Dual-Layout Workspace Wrapper: Side-by-side on LG screens */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 lg:gap-8 relative z-10 p-0 md:p-2">
        
        {/* LEFT PC PORTAL: Branding deck and high-fidelity interactive sandbox (hidden on mobile/tablet, glorious on desktop) */}
        <div className="hidden lg:flex flex-col w-[600px] xl:w-[650px] bg-[#fdfdfc] border border-gold-200 rounded-[36px] p-6 space-y-5 shadow-xl max-h-[880px] overflow-y-auto no-scrollbar border-b-4 border-r-2">
          
          {/* Header section with brand and live weather climate helper */}
          <div className="space-y-1.5 border-b border-gold-100 pb-4">
            <div className="flex items-center space-x-2">
              <span className="bg-[#a33b2f] text-white p-1 px-2.5 rounded-md text-[9px] font-black tracking-wider shadow-sm">OFFICIAL PORTAL</span>
              <span className="text-[10px] font-mono font-bold text-gold-500">EST. 1990</span>
            </div>
            
            <h2 className="text-xl lg:text-2xl font-black text-neutral-900 tracking-tight font-serif">
              현풍닭칼국수 <span className="text-gold-600">브랜드 가이드</span>
            </h2>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              강남역삼점의 공식 웹 프레젠테이션 가이드입니다. 실시간 기상 관측 상황에 반응하여 보양 식단을 최적 매칭하며, 원하시는 한상을 즉시 모바일 시뮬레이터에 연동할 수 있습니다.
            </p>

            {/* Interactive weather-linked recommendation helper */}
            <div className="mt-3 p-3.5 bg-gold-50/75 border border-gold-100 rounded-2xl space-y-3.5 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-neutral-500 tracking-wider block uppercase text-[#a33b2f]">
                  ⛅ 실시간 인근 기상 맞춤 보양 매칭
                </span>
                <span className="text-[9.5px] bg-[#a33b2f] text-white px-2 py-0.5 rounded-full font-bold">
                  {weatherConfig.badge}
                </span>
              </div>

              {/* Climate tab buttons */}
              <div className="grid grid-cols-4 gap-2">
                {(['rainy', 'sunny', 'cold', 'hot'] as const).map((w) => {
                  const isActive = activeWeather === w;
                  const icons = { rainy: '🌧️', sunny: '☀️', cold: '❄️', hot: '🔥' };
                  const labels = { rainy: '비오는날', sunny: '화창한날', cold: '찬바람', hot: '무더위' };
                  return (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setActiveWeather(w)}
                      className={`py-1.5 px-0.5 rounded-xl text-center text-[11px] font-black transition-all border flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        isActive 
                        ? 'bg-[#a33b2f] text-white border-[#a33b2f] shadow-sm transform scale-102' 
                        : 'bg-white hover:bg-gold-50 text-neutral-600 border-gold-100'
                      }`}
                    >
                      <span className="text-base">{icons[w]}</span>
                      <span className="text-[9.5px] font-black">{labels[w]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Recommendation output description */}
              <div className="bg-white p-3 rounded-xl border border-gold-100 space-y-1.5">
                <h4 className="text-[11.5px] font-black text-neutral-800 flex items-center gap-1">
                  💡 {weatherConfig.title} 구성 제안
                </h4>
                <p className="text-[10.5px] text-neutral-500 leading-relaxed font-light">
                  {weatherConfig.comment}
                </p>
                <button
                  type="button"
                  onClick={() => handleApplyComboToSimulator(weatherConfig.main, weatherConfig.side, weatherConfig.spice)}
                  className="w-full py-1.5 bg-neutral-900 hover:bg-neutral-850 text-white font-black text-[10px] rounded-lg transition-colors flex items-center justify-center gap-1 mt-0.5 shadow-sm uppercase cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-yellow-300 fill-yellow-300 animate-pulse" />
                  <span>이 날씨 스마트 조합 시뮬레이터 적용</span>
                </button>
              </div>
            </div>
          </div>

          {/* Heritage Timeline explorer section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-[12.5px] font-black text-neutral-800 tracking-tight font-serif flex items-center gap-1">
                📜 36년 가문의 헤리티지 (Heritage Tour)
              </h3>
              <span className="text-[9px] text-neutral-400">클릭하여 헤리티지 특전 비밀번호 해제</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {HERITAGE_MILESTONES.map((hm, idx) => {
                const isActive = heritageIdx === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setHeritageIdx(idx);
                      if (!unlockedSecrets.includes(hm.secretReward)) {
                        const next = [...unlockedSecrets, hm.secretReward];
                        saveSecretsToLocal(next);
                      }
                    }}
                    className={`p-2 rounded-xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between h-[74px] cursor-pointer ${
                      isActive 
                        ? 'border-[#a33b2f] bg-rose-50/10 ring-1 ring-rose-200' 
                        : 'border-gold-100 bg-white hover:border-gold-300'
                    }`}
                  >
                    <span className={`text-[8px] font-black tracking-tighter ${isActive ? 'text-[#a33b2f]' : 'text-neutral-400'}`}>
                      {hm.year}
                    </span>
                    <span className="text-[9.5px] font-black text-neutral-800 leading-tight block">
                      {hm.year.includes('강남') ? '강남역삼점' : hm.title.split(' ')[0]}
                    </span>
                    
                    {/* Tiny animated circle indicator */}
                    <div className={`absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full transition-transform ${
                      isActive ? 'bg-[#a33b2f] scale-125' : 'bg-neutral-200 group-hover:bg-gold-400'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Heritage panel expanded details view */}
            <div className="p-3.5 rounded-2xl border border-dashed border-rose-200 bg-rose-50/5 space-y-1.5 relative overflow-hidden">
              <div className="absolute right-0 top-0 text-[4rem] font-serif font-black opacity-3 text-rose-900 pointer-events-none select-none -mt-3 -mr-1">
                玄
              </div>
              <h4 className="text-[11.5px] font-black text-[#a33b2f] flex items-center gap-1 font-serif">
                <Flame className="w-3 h-3 animate-pulse text-[#a33b2f]" /> {HERITAGE_MILESTONES[heritageIdx].title}
              </h4>
              <p className="text-[10.5px] text-neutral-600 leading-relaxed font-light">
                {HERITAGE_MILESTONES[heritageIdx].desc}
              </p>
              
              <div className="p-1 px-2.5 bg-[#a33b2f]/5 rounded-lg border border-[#a33b2f]/10 flex items-center justify-between text-[9px]">
                <span className="font-extrabold text-[#a33b2f]">🔑 특전 해제: {HERITAGE_MILESTONES[heritageIdx].secretReward}</span>
                <span className="text-neutral-500">예약 시 기입하시면 김치 특별패키징 혜택</span>
              </div>
            </div>
          </div>

          {/* Sandbox Live Meal Combi Harmony score calculator */}
          <div className="space-y-2">
            <h3 className="text-[12.5px] font-black text-neutral-800 tracking-tight font-serif flex items-center gap-1">
              🍱 나만의 최강 보양 한상 메이커 (Sandbox)
            </h3>
            
            <div className="p-3.5 bg-gold-50/50 rounded-2xl border border-gold-100 space-y-3 shadow-inner">
              <div className="grid grid-cols-2 gap-3">
                
                {/* Main Dish dropdown */}
                <div className="space-y-0.5">
                  <label className="text-[8.5px] font-black text-neutral-500 block uppercase">1. 대표 보양식사 선택</label>
                  <select
                    value={combMain}
                    onChange={(e) => setCombMain(e.target.value)}
                    className="w-full text-[11px] font-black p-1.5 bg-white border border-gold-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a33b2f] cursor-pointer"
                  >
                    {MENU_ITEMS.filter(m => m.category === 'main' || m.category === 'summer' || m.category === 'winter').map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.price.toLocaleString()}원)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Side Dish dropdown */}
                <div className="space-y-0.5">
                  <label className="text-[8.5px] font-black text-neutral-500 block uppercase">2. 찰떡 사이드 선택</label>
                  <select
                    value={combSide}
                    onChange={(e) => setCombSide(e.target.value)}
                    className="w-full text-[11px] font-black p-1.5 bg-white border border-gold-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a33b2f] cursor-pointer"
                  >
                    {MENU_ITEMS.filter(m => m.category === 'side' || m.id === 'c3').map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.price.toLocaleString()}원)
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Spice Level selection bar */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[8.5px] font-black text-neutral-500">
                  <span className="uppercase">3. 실비김치 맵스타일 튜닝 : {combSpice}단계</span>
                  <span className="text-[#a33b2f] font-black">
                    {combSpice === 1 && '개운한 오리지널'}
                    {combSpice === 2 && '매콤달콤 순한맛'}
                    {combSpice === 3 && '황금비율 반반'}
                    {combSpice === 4 && '땀 쑥 매운맛'}
                    {combSpice === 5 && '캡사이신 제로 실비'}
                  </span>
                </div>
                
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={combSpice}
                  onChange={(e) => setCombSpice(parseInt(e.target.value))}
                  className="w-full accent-[#a33b2f] h-1.5 bg-neutral-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Harmony scoring screen */}
              {(() => {
                const mainItem = MENU_ITEMS.find(m => m.id === combMain);
                const sideItem = MENU_ITEMS.find(m => m.id === combSide);
                if (!mainItem || !sideItem) return null;
                
                const totalPrice = mainItem.price + sideItem.price;
                const discountPrice = totalPrice - 1000;

                let score = 95;
                let description = '보편적으로 든든하게 받쳐주는 가문 비법 한 상 식단';
                if (combMain === 'm1' && combSide === 'sd2') {
                  score = 99;
                  description = '시그니처 매콤칼칼 육수와 불향 가득 달달한 갈비만두의 완벽한 맵단 통합 한상!';
                } else if (combMain === 'm2' && combSide === 'c3') {
                  score = 99.5;
                  description = '인삼대추 통닭 삼계 진함과 한방 미니수육으로 결합한 대한민국 보양 1순위 패키지!';
                } else if (combMain === 's1' && combSide === 'sd2') {
                  score = 98;
                  description = '등줄기에 얼음이 쨍하게 흐르는 김치냉국수와 부드럽고 달달한 갈비만두의 조화!';
                } else if (combSpice === 5) {
                  score = 97.2;
                  description = '활화산 같은 마성 실비김치 한 그릇에 달큰한 고기손만두로 즉시 긴급 소화하는 맵고수 챌린지 한상!';
                }

                return (
                  <div className="bg-white p-2.5 rounded-xl border border-gold-200 flex flex-col space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[11.5px] font-black text-neutral-800">
                          {mainItem.name} + {sideItem.name}
                        </h4>
                        <div className="flex gap-2 text-[8.5px] mt-0.5 font-bold text-neutral-400">
                          <s>정상가 {(totalPrice).toLocaleString()}원</s>
                          <span className="text-[#a33b2f] font-black font-sans">포장할인 적용가 {(discountPrice).toLocaleString()}원 (-1,000원 혜택)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[8.5px] text-neutral-400 font-bold block">궁합도</span>
                        <span className="text-base font-black text-[#a33b2f] font-mono leading-none">{score}%</span>
                      </div>
                    </div>

                    <p className="text-[9.5px] text-neutral-400 leading-normal border-t border-dashed border-gold-100 pt-1.5 font-light">
                      🚩 <strong>한마디:</strong> {description}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleApplyComboToSimulator(combMain, combSide, combSpice)}
                      className="w-full py-2 bg-[#a33b2f] hover:bg-[#8b2f24] text-white font-black text-[11px] rounded-xl transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-white fill-white animate-pulse" />
                      <span>이 조합으로 모바일 시뮬레이터 포장주문에 담기</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Symmetrical Hour heatmap explorer */}
          <div className="space-y-1">
            <h3 className="text-[12.5px] font-black text-neutral-800 tracking-tight font-serif flex items-center gap-1">
              📊 시간별 혼잡도 실시간 연동 예측 (Visual Heatmap)
            </h3>
            <p className="text-[9.5px] text-neutral-400 font-light leading-none">
              바 아래 시간대 컬럼을 터치하시면 모바일 앱의 <strong>실시간 대기 플래너</strong>가 즉시 반응하여 최적 솔루션을 찾습니다.
            </p>

            <div className="flex space-x-1.5 h-11 items-end pt-3">
              {[
                { hour: '11:00', busy: 20, wait: '즉시입장', timeStr: '11:00' },
                { hour: '11:30', busy: 50, wait: '약간대기', timeStr: '11:30' },
                { hour: '12:00', busy: 95, wait: '15분대기', timeStr: '12:00' },
                { hour: '12:30', busy: 98, wait: '18분대기', timeStr: '12:30' },
                { hour: '13:00', busy: 70, wait: '5분 내외', timeStr: '13:00' },
                { hour: '13:30', busy: 30, wait: '혼밥즉석', timeStr: '13:30' },
                { hour: '14:00', busy: 15, wait: '매우널널', timeStr: '14:00' },
                { hour: '17:30', busy: 40, wait: '즉시입장', timeStr: '17:30' },
                { hour: '18:00', busy: 75, wait: '8분내외', timeStr: '18:00' },
                { hour: '19:30', busy: 25, wait: '마감여유', timeStr: '19:30' },
              ].map((hItem) => {
                const isSelected = planTime === hItem.timeStr;
                const isPeak = hItem.busy >= 75;
                const barColor = isPeak ? 'bg-rose-500' : hItem.busy >= 40 ? 'bg-amber-400' : 'bg-emerald-400';
                return (
                  <button
                    key={hItem.hour}
                    type="button"
                    onClick={() => {
                      setPlanTime(hItem.timeStr);
                      // Set active mobile tab to wait section to demonstrate linkage
                      setActiveTab('wait');
                    }}
                    className="flex-1 flex flex-col justify-end items-center h-full group focus:outline-none cursor-pointer"
                  >
                    <span className="text-[7px] text-neutral-400 scale-90 font-mono opacity-0 group-hover:opacity-100 transition-opacity leading-none select-none">
                      {hItem.wait}
                    </span>
                    <div 
                      className={`w-full rounded-t-sm transition-all duration-300 relative ${
                        isSelected ? 'origin-bottom ring-2 ring-neutral-900 border-t border-white shadow-md' : 'opacity-80 group-hover:opacity-100 hover:scale-x-105'
                      } ${barColor}`} 
                      style={{ height: `${hItem.busy * 0.72}%` }} 
                    />
                    <span className={`text-[8.5px] scale-90 mt-1 font-mono hover:font-black ${isSelected ? 'text-[#a33b2f] font-black' : 'text-neutral-500'}`}>
                      {hItem.hour}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guestbook Submission and View Lists */}
          <div className="space-y-3 pt-1">
            <h3 className="text-[12.5px] font-black text-neutral-800 tracking-tight font-serif flex items-center justify-between">
              <span>✍️ 강남역삼 평생 단골 방명록</span>
              <span className="text-[9.5px] text-neutral-400 font-sans font-light">리뷰 작성시 모바일 가이드 자동 갱신</span>
            </h3>

            {/* Scrolling review list */}
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 select-none border-b border-gold-100 pb-2 custom-scrollbar">
              {feedbacks.length === 0 ? (
                <div className="text-center py-4 text-xs text-neutral-400">등록된 단골 평이 없습니다. 첫 의견을 작성해보세요!</div>
              ) : (
                feedbacks.map((f, fIdx) => (
                  <div key={f.id || fIdx} className="p-2.5 bg-neutral-50 rounded-2xl border border-gold-100/60 flex flex-col space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-extrabold text-neutral-800 text-[11px]">{f.name}</span>
                        <span className="text-[8px] bg-gold-100 text-[#a33b2f] px-1.5 py-0.2 rounded-sm font-black scale-90">{f.tag}</span>
                      </div>
                      <div className="flex items-center text-amber-500 font-mono text-[9.5px] space-x-0.5">
                        {'★'.repeat(Math.round(f.rating))}
                        <span className="text-neutral-400 font-mono text-[8.5px] ml-1">({f.rating})</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-500 font-light leading-relaxed">{f.content}</p>
                    <span className="text-[8px] text-neutral-400 font-mono self-end pt-0.5">{f.date}</span>
                  </div>
                ))
              )}
            </div>

            {/* Quick Guestbook submit form */}
            <form onSubmit={handleFeedbackSubmit} className="space-y-2 bg-gold-50/15 p-3 rounded-2xl border border-dashed border-gold-200">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1 space-y-0.5">
                  <label className="text-[8.5px] font-black text-neutral-500 block">장인 단골 성함</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 최기혁"
                    value={fbName}
                    onChange={(e) => setFbName(e.target.value)}
                    className="w-full text-[10.5px] p-1 bg-white border border-gold-150 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a33b2f]"
                  />
                </div>

                <div className="col-span-1 space-y-0.5">
                  <label className="text-[8.5px] font-black text-neutral-500 block">김치 키워드</label>
                  <select
                    value={fbActiveTag}
                    onChange={(e) => setFbActiveTag(e.target.value)}
                    className="w-full text-[10.5px] p-1 bg-white border border-gold-150 rounded-lg focus:outline-none cursor-pointer"
                  >
                    <option value="#매운실비김치">#매운실비김치 🌶️</option>
                    <option value="#혼밥프렌들리">#혼밥프렌들리 😎</option>
                    <option value="#닭칼수육콤보">#닭칼수육콤보 🍖</option>
                    <option value="#삼계보양갑">#삼계보양갑 🐔</option>
                  </select>
                </div>

                <div className="col-span-1 space-y-0.5">
                  <label className="text-[8.5px] font-black text-neutral-500 block">맛 만족도</label>
                  <select
                    value={fbRating}
                    onChange={(e) => setFbRating(parseFloat(e.target.value))}
                    className="w-full text-[10.5px] p-1 bg-white border border-gold-150 rounded-lg focus:outline-none cursor-pointer"
                  >
                    <option value="5">★★★★★ (5.0)</option>
                    <option value="4.5">★★★★☆ (4.5)</option>
                    <option value="4">★★★★ (4.0)</option>
                    <option value="3">★★★ (3.0)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-0.5">
                <label className="text-[8.5px] font-black text-neutral-500 block">단골 한줄평 의견작성 (최대 100자)</label>
                <div className="flex gap-2 items-end">
                  <textarea
                    required
                    maxLength={100}
                    placeholder="예약/식사하면서 좋았던 점을 적어 다른 해장러에게 전수해보세요!"
                    value={fbContent}
                    onChange={(e) => setFbContent(e.target.value)}
                    className="flex-1 text-[10px] p-1.5 bg-white border border-gold-150 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#a33b2f] h-11 resize-none leading-normal font-light"
                  />
                  <button
                    type="submit"
                    className="bg-[#a33b2f] hover:bg-[#8b2f24] text-white p-1.5 px-3.5 rounded-xl text-[10.5px] font-black transition-colors self-end h-9 shadow-sm cursor-pointer flex-shrink-0"
                  >
                    등록하기
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>

        {/* RIGHT DEVICE SIMULATOR: High Fidelity Smartphone Mock Container */}
        <div className="relative w-full max-w-[420px] mx-auto lg:mx-0 md:h-[880px] h-[calc(100vh)] bg-gold-50 md:rounded-[40px] md:shadow-[0_40px_100px_-20px_rgba(45,45,40,0.45)] overflow-hidden flex flex-col border border-gold-200 md:border-[12px] md:border-gold-800 shrink-0">
        
        {/* Smartphone top notched bezel for desktop frame */}
        <div className="hidden md:flex absolute top-0 left-0 right-0 h-6 bg-gold-800 z-[100] justify-center items-center">
          <div className="w-32 h-[14px] bg-[#1a1a1a] rounded-b-xl flex items-center justify-between px-4">
            <span className="text-[9px] text-white/50 -mt-1 scale-90">11:00</span>
            <div className="w-[10px] h-[10px] bg-[#1a1a1a] rounded-full border border-neutral-700"></div>
            <span className="text-[9px] text-white/50 -mt-1 scale-90">📶</span>
          </div>
        </div>

        {/* Floating Top Header (Compact & Action Driven) */}
        <header className="sticky top-0 bg-gold-50/95 backdrop-blur-md border-b border-gold-100 z-50 px-4 py-3 md:mt-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              현
            </div>
            <div>
              <h1 className="text-sm font-black text-neutral-900 tracking-tight font-serif flex items-center">
                현풍닭칼국수 <span className="text-[10px] text-white font-sans ml-1 bg-gold-500 px-1 rounded-sm">강남역삼점</span>
              </h1>
              <p className="text-[9px] text-neutral-500 max-w-[190px] truncate">{STORE_INFO.slogan}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              id="btn-heart-header"
              onClick={() => alert('단골 매장으로 설정되었습니다! 단골 감사 1,000원 픽업할인 및 시그니처 혜택 소식을 가장 먼저 받아보세요.')}
              className="p-1 px-2 rounded-full bg-rose-50 border border-rose-100 hover:bg-rose-100 text-rose-500 text-xs flex items-center transition-all"
            >
              <Heart id="ico-heart" className="w-[11px] h-[11px] mr-1 fill-rose-500" />
              <span className="text-[10px] font-bold">단골</span>
            </button>
            <button 
              id="btn-share"
              onClick={handleShare}
              className="p-1.5 rounded-full bg-gold-100 hover:bg-gold-200 text-gold-800 transition"
              title="공유하기"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Dynamic Nav-Content wrapper */}
        <main className="flex-1 overflow-y-auto pb-24 pt-1">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: HOME PANEL */}
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5 px-4"
              >
                
                {/* Visual Banner Slideshow with dynamic layout overlays */}
                <div className="relative rounded-3xl overflow-hidden shadow-sm border border-gold-100 h-51 bg-gold-900 group">
                  <img 
                    src={MENU_ITEMS[0].image}
                    alt="Main Kalguksu"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-85"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5">
                    <span className="text-[9px] text-white font-extrabold tracking-widest bg-gold-500 px-2.5 py-0.5 rounded-full w-max mb-1 uppercase flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 fill-white animate-pulse" /> 명가 보양식 칼국수
                    </span>
                    <h3 className="text-lg font-black text-white leading-tight font-serif mt-1">
                      장인정신으로 고운<br />순백의 명품 닭육수
                    </h3>
                    <p className="text-[11px] text-gold-100/95 font-light mt-1 text-ellipsis overflow-hidden truncate">
                      천연 벌꿀 발효 청정 실비 김치와 깊은 국물의 환상 만남
                    </p>
                  </div>
                </div>

                {/* Quick Action Hub */}
                <div className="grid grid-cols-3 gap-2.5">
                  <a 
                    id="cta-call"
                    href={`tel:${STORE_INFO.phone}`}
                    className="flex flex-col items-center justify-center p-3 rounded-3xl bg-white border border-gold-100 shadow-sm text-center hover:bg-gold-50 hover:border-gold-300 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 mb-1.5 group-hover:scale-110 transition-transform">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[11px] font-black text-neutral-800">예약·문의 전화</span>
                    <span className="text-[9px] text-neutral-500 mt-0.5 font-mono">{STORE_INFO.phone}</span>
                  </a>

                  <button 
                    id="cta-book"
                    onClick={() => {
                      setBookingDate('2026-06-12');
                      setShowBookingModal(true);
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-3xl bg-gold-500 shadow-md shadow-gold-500/20 text-center hover:bg-gold-600 transition-all group text-white"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-1.5 group-hover:rotate-12 transition-transform">
                      <Calendar className="w-4.5 h-4.5 text-white" />
                    </div>
                    <span className="text-[11px] font-black">온라인 간편예약</span>
                    <span className="text-[8px] opacity-90 mt-0.5">대기 없이 즉시 확정</span>
                  </button>

                  <button 
                    id="cta-order"
                    onClick={() => {
                      setActiveTab('menu');
                      setSelectedCategory('all');
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-3xl bg-white border border-gold-100 shadow-sm text-center hover:bg-gold-50 hover:border-gold-300 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#A33B2F]/10 flex items-center justify-center text-[#A33B2F] mb-1.5 group-hover:scale-110 transition-transform">
                      <ShoppingBag className="w-4.5 h-4.5 animate-pulse" />
                    </div>
                    <span className="text-[11px] font-black text-neutral-800">포장 픽업 주문</span>
                    <span className="text-[9px] text-[#A33B2F] mt-0.5 font-bold">1,000원 추가</span>
                  </button>
                </div>

                {/* Live Waiting banner (Dynamic based on real time or status simulation) */}
                <div className="p-4 bg-gold-900 rounded-3xl relative overflow-hidden text-white flex items-center justify-between shadow-sm border border-gold-900">
                  <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gold-500/10 to-transparent pointer-events-none"></div>
                  <div className="space-y-1 z-10">
                    <div className="flex items-center space-x-1.5">
                      <span className={`w-2 h-2 rounded-full ${liveStatus.bulletColor}`}></span>
                      <p className="text-[10px] text-neutral-300 font-extrabold tracking-wider">실시간 강남역삼점 상황</p>
                    </div>
                    <h4 className="text-xs font-black text-gold-50">{liveStatus.label}</h4>
                    <p className="text-[10px] text-gold-300 font-light">{liveStatus.waitTip}</p>
                  </div>
                  <button 
                    id="btn-wait-diagnose"
                    onClick={() => setActiveTab('wait')}
                    className="px-3 py-2 bg-gold-500 hover:bg-gold-600 text-white text-[10px] font-black rounded-xl transition-colors flex items-center gap-0.5 z-10"
                  >
                    대기 확인 <ChevronRight className="w-3 h-3 stroke-[3]" />
                  </button>
                </div>

                {/* Korean Spice level explorer widget (현풍만의 비법 김치체험) */}
                <div className="p-4 bg-white rounded-3xl border border-gold-100 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <Flame className="w-4 h-4 text-rose-600 fill-rose-600" />
                      <h4 className="text-[12.5px] font-black text-neutral-900 font-serif">현풍의 영혼: 시그니처 김치 도우미</h4>
                    </div>
                    <span className="text-[9px] bg-red-100 text-[#A33B2F] font-bold px-1.5 py-0.5 rounded-full">국내산 천연 벌꿀발효</span>
                  </div>
                  <p className="text-[10.5px] text-neutral-500 leading-relaxed">
                    현풍닭칼국수의 트레이드마크는 <strong>매운 실비 김치</strong>입니다. 아래 바를 드래그하여 자신에게 맞는 최적의 맵기를 조리 전 미리 찾아보세요!
                  </p>

                  {/* Range slider for spice level */}
                  <div className="py-2">
                    <div className="flex justify-between text-[10px] font-black text-neutral-400 mb-1.5 px-0.5">
                      <span>안매운</span>
                      <span>순한맛</span>
                      <span className="text-[#A33B2F]">반반조합</span>
                      <span>매운맛</span>
                      <span className="text-red-700">실비김치</span>
                    </div>
                    <input 
                      id="inp-spice"
                      type="range" 
                      min="1" 
                      max="5" 
                      value={spiceLevel} 
                      onChange={(e) => setSpiceLevel(parseInt(e.target.value))}
                      className="w-full accent-[#A33B2F] h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="w-full h-1.5 rounded-full bg-neutral-200 overflow-hidden relative mt-1.5">
                      <div className={`h-full ${currentSpiceDesc.gaugeColor} transition-all duration-300`} style={{ width: `${(spiceLevel / 5) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* Interactive Kimchi detail output based on slider state */}
                  <div className={`p-3 rounded-2xl border ${currentSpiceDesc.color} transition-all duration-300 flex items-start space-x-2.5`}>
                    <div className="w-14 h-14 rounded-xl bg-neutral-50 border border-neutral-200 flex-shrink-0 flex items-center justify-center overflow-hidden position-relative shadow-inner">
                      <img 
                        src={MENU_ITEMS[0].image}
                        alt="Kimchi" 
                        className={`w-full h-full object-cover ${currentSpiceDesc.imageStyle} transition-all duration-500`}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-red-600/5 mix-blend-color-burn"></div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[11px] font-black text-neutral-900">{currentSpiceDesc.title}</span>
                      </div>
                      <p className="text-[9.5px] leading-relaxed font-light text-neutral-800">{currentSpiceDesc.desc}</p>
                      <div className="flex gap-2.5 mt-1 text-[9px] font-bold">
                        <span>💡 추천 조화: <span className="text-rose-600">{currentSpiceDesc.flavor}</span></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Menus Carousel/Quick list (Focusing on craft and aesthetics) */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-[12.5px] font-black text-neutral-900 font-serif">강남역삼점 베스트 초이스</h4>
                      <p className="text-[10px] text-neutral-400">재방문 단골들이 선택하는 최고의 메뉴 조합</p>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveTab('menu');
                        setSelectedCategory('all');
                      }}
                      className="text-xs font-black text-gold-500 flex items-center"
                    >
                      전체 보기 <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    {MENU_ITEMS.filter(m => m.isPopular).slice(0, 2).map((item) => (
                      <div 
                        key={item.id}
                        className="bg-white rounded-3xl overflow-hidden border border-gold-100 shadow-sm flex flex-col group hover:shadow-md transition-all cursor-pointer"
                        onClick={() => {
                          setActiveTab('menu');
                          setSelectedCategory(item.category as any);
                        }}
                      >
                        <div className="relative h-28 bg-neutral-100 overflow-hidden">
                          <img 
                            src={item.image || 'https://picsum.photos/seed/kalguksu/300/200'} 
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 bg-gold-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase">
                            인기
                          </div>
                        </div>
                        <div className="p-3 flex-1 flex flex-col justify-between space-y-1">
                          <div>
                            <h5 className="text-[11.5px] font-black text-neutral-900 group-hover:text-gold-500 transition-colors">{item.name}</h5>
                            <p className="text-[9.5px] text-neutral-400 line-clamp-2 mt-0.5 font-light leading-normal">{item.description}</p>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-dashed border-gold-100">
                            <span className="text-xs font-black text-neutral-800">{item.price.toLocaleString()}원</span>
                            <span className="w-5 h-5 rounded-full bg-gold-50 text-gold-500 flex items-center justify-center text-xs font-bold group-hover:bg-gold-500 group-hover:text-white transition-all">+</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Branch Info / Operating Hours Table Section */}
                <div className="p-4 bg-gold-50 rounded-3xl border border-gold-100 shadow-sm space-y-4">
                  <h4 className="text-[12.5px] font-black text-neutral-900 font-serif border-b border-gold-100 pb-1.5 flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gold-500" />
                    <span>정확한 영업시간 & 서비스 안내</span>
                  </h4>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1 border-r border-gold-100 pr-2">
                      <p className="font-extrabold text-neutral-800 flex items-center gap-1">
                        📅 평일 (월~금)
                      </p>
                      <p className="font-mono text-neutral-700">11:00 - 21:00</p>
                      <p className="text-[10px] text-neutral-400 font-light">마지막 주문: 20:30</p>
                    </div>
                    <div className="space-y-1 pl-1">
                      <p className="font-extrabold text-[#A33B2F] flex items-center gap-1">
                        🏖️ 주말 (토~일)
                      </p>
                      <p className="font-mono text-neutral-700">11:00 - 20:00</p>
                      <p className="text-[10px] text-neutral-400 font-light">마지막 주문: 19:30</p>
                    </div>
                  </div>

                  <div className="bg-white p-2 px-3 rounded-2xl flex items-start space-x-2 text-[10px] text-neutral-500 leading-normal border border-gold-100">
                    <Info className="w-3.5 h-3.5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-neutral-800">포장 혜택 및 수수료:</span> 포장 주문 시 최상의 단열 특수 용기 패키징 및 위생 조치를 위해 <span className="font-bold text-rose-600">품목별 1,000원의 패키징 비용</span>이 추가됩니다.
                    </div>
                  </div>
                </div>

                {/* Transit visual Map (Schematic of route, beautiful & lightweight) */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-[12.5px] font-black text-neutral-900 font-serif flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gold-500" /> 매장 위치 및 오시는 길
                      </h4>
                      <p className="text-[10px] text-neutral-400">강남역과 역삼역 도보 5분 쾌속 지름길</p>
                    </div>
                    <button 
                      onClick={() => {
                        window.open('https://map.naver.com/', '_blank');
                      }}
                      className="text-[10px] font-black text-neutral-500 hover:text-gold-500 flex items-center gap-0.5 border border-gold-100 bg-white px-2 py-0.5 rounded-full"
                    >
                      네이버지도 <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>

                  {/* Schematic Map Visual Canvas */}
                  <div className="relative w-full h-44 bg-gold-100/65 rounded-3xl border border-gold-200 p-3 flex flex-col justify-between shadow-inner">
                    
                    {/* Horizontal Teheran-ro Boulevard */}
                    <div className="absolute top-1/4 left-0 right-0 h-4 bg-white/70 border-y border-dashed border-gold-200 flex items-center justify-between px-6 pointer-events-none">
                      <span className="text-[8px] text-neutral-400 font-bold uppercase tracking-widest font-mono">Teheran-ro (테헤란로)</span>
                    </div>

                    {/* Left node (Gangnam station) */}
                    <div className="absolute top-1/5 left-3 text-center z-10">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[9px] shadow-sm">
                        2
                      </div>
                      <p className="text-[9px] bg-white rounded px-1.5 shadow-sm mt-1 border border-gold-100 leading-none">강남역 <span className="font-semibold text-emerald-600">3번출구</span></p>
                    </div>

                    {/* Right node (Yeoksam station) */}
                    <div className="absolute top-1/5 right-3 text-center z-10">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[9px] shadow-sm">
                        2
                      </div>
                      <p className="text-[9px] bg-white rounded px-1.5 shadow-sm mt-1 border border-gold-100 leading-none">역삼역 <span className="font-semibold text-emerald-600">3번출구</span></p>
                    </div>

                    {/* Road down layout */}
                    <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-8 h-12 bg-white/70 border-x border-dashed border-gold-200 pointer-events-none"></div>

                    {/* Target shop node */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-20">
                      <motion.div 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-10 h-10 rounded-full bg-gold-500 border-[3px] border-white shadow-md flex items-center justify-center text-white"
                      >
                        <Utensils className="w-4 h-4 fill-white animate-spin-slow" />
                      </motion.div>
                      <p className="text-[10px] font-black bg-white rounded-lg p-1.5 px-2.5 shadow-md mt-1 border-2 border-gold-200 text-neutral-950 leading-none whitespace-nowrap">
                        현풍닭칼국수 강남역삼점
                      </p>
                    </div>

                    {/* Text directions overlaid inside the schematic */}
                    <div className="absolute top-1 right-2 text-[9px] text-neutral-500 bg-white/80 rounded px-1.5 border border-gold-100">
                      🚶‍♂️ 도보 5분 거리!
                    </div>

                    <div className="absolute bottom-1 left-2 text-[8px] text-neutral-400 bg-white/80 rounded px-1.5 border border-gold-100">
                      테헤란로20길 19
                    </div>
                  </div>

                  {/* Location Address Details and Buttons */}
                  <div className="p-3 bg-white rounded-3xl border border-gold-100 shadow-sm flex items-start justify-between space-x-2">
                    <div className="space-y-1 text-xs">
                      <p className="font-black text-neutral-950 flex items-center gap-1">
                        <Map className="w-3.5 h-3.5 text-gold-500" /> {STORE_INFO.address}
                      </p>
                      <p className="text-[10px] text-neutral-500 leading-normal">{STORE_INFO.addressDetail}</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(STORE_INFO.address);
                        alert('주소가 복사되었습니다! 원하시는 지도 어플에 붙여넣어 쉽게 찾아오세요.');
                      }}
                      className="px-2.5 py-1.5 border border-gold-100 bg-gold-50 hover:bg-gold-100 text-gold-500 text-[10px] font-black rounded-xl whitespace-nowrap transition-all"
                    >
                      주소 복사
                    </button>
                  </div>
                </div>

                {/* Footer and Slogan with rich background */}
                <div className="py-8 text-center space-y-2 border-t border-neutral-150">
                  <p className="text-[11px] font-serif italic text-gold-600 font-extrabold">"{STORE_INFO.slogan}"</p>
                  <p className="text-[9px] text-neutral-400 font-light">본 페이지는 현풍닭칼국수 강남역삼점 고객용 서비스 활성화 랜딩페이지입니다.</p>
                  <p className="text-[9px] font-mono text-neutral-300">© 2026 HYEONPUNG GANGNAM. ALL RIGHTS RESERVED.</p>
                </div>

              </motion.div>
            )}

            {/* TAB 2: MENU EXPLORER TAB PANEL */}
            {activeTab === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 px-4"
              >
                
                {/* Visual Category filter bar */}
                <div className="sticky top-14 bg-gold-50 py-2 z-30 flex space-x-1.5 overflow-x-auto no-scrollbar border-b border-gold-50/50 pb-2">
                  {[
                    { id: 'all', name: '전체' },
                    { id: 'main', name: '대표식사' },
                    { id: 'combo', name: '수육/세트' },
                    { id: 'summer', name: '여름별미' },
                    { id: 'winter', name: '겨울별미' },
                    { id: 'side', name: '사이드만두' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as any)}
                      className={`px-3 py-1.5 rounded-full text-[11.5px] font-extrabold whitespace-nowrap transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-gold-500 text-white shadow-sm shadow-gold-500/20'
                          : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Packaging Fee Reminder banner */}
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-neutral-800 text-[10px] leading-relaxed flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-rose-400/10 text-rose-700 flex items-center justify-center font-bold flex-shrink-0">📦</div>
                  <p>
                    <span className="font-extrabold text-rose-700">포장 픽업 안내:</span> 현풍닭칼국수는 포장 주문 시 전용 패키징을 위해 <strong className="text-rose-600">용기당 1,000원의 비용</strong>을 가산합니다. (위 장바구니에 담으면 자동 1,000원 추가 정산됩니다)
                  </p>
                </div>

                {/* Filtered Menu Cards Grid */}
                <div className="space-y-3.5">
                  {filteredMenuItems.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white rounded-2xl overflow-hidden border border-gold-50 shadow-sm hover:shadow-md transition-all flex flex-col group relative"
                    >
                      {/* Top image section if exists */}
                      {item.image && (
                        <div className="relative h-44 bg-neutral-100 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          
                          {/* Tags on image */}
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            {item.isPopular && (
                              <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow">인기메뉴</span>
                            )}
                            {item.isSpecial && (
                              <span className="bg-gold-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow">보양특선</span>
                            )}
                          </div>

                          <div className="absolute bottom-3 right-3 text-white text-[10px] opacity-80 bg-neutral-900/40 p-1.5 rounded-full backdrop-blur-xs font-mono">
                            현풍 프리미엄 닭육수 베이스
                          </div>
                        </div>
                      )}

                      {/* Content side */}
                      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-sm font-black text-neutral-950 flex items-center">
                                {item.name}
                                {!item.image && item.isPopular && (
                                  <span className="ml-1.5 bg-rose-50 text-rose-600 text-[8px] font-black px-1 rounded border border-rose-200">인기</span>
                                )}
                              </h4>
                              {item.category === 'combo' && (
                                <span className="text-[8.5px] text-[#A67B43] bg-gold-50 border border-gold-100 px-1 rounded-md font-bold">수육 세트 조합 구성 가능</span>
                              )}
                            </div>
                            <button 
                              key={`like-${item.id}`}
                              onClick={(e) => toggleLike(item.id, e)}
                              className="p-1 px-1.5 rounded-full bg-neutral-50 hover:bg-rose-50 border border-neutral-150 text-rose-500 transition-colors"
                            >
                              <Heart className={`w-3.5 h-3.5 ${likedMenus[item.id] ? 'fill-rose-500 stroke-rose-500' : 'text-neutral-400'}`} />
                            </button>
                          </div>
                          
                          <p className="text-[11px] text-neutral-500 leading-normal font-light">
                            {item.description}
                          </p>
                        </div>

                        {/* Interactive Pricing and Add-to-Cart buttons */}
                        <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-neutral-150">
                          <div>
                            <span className="text-xs text-neutral-400 block -mb-0.5">권장포장금액 ({item.name})</span>
                            <span className="text-sm font-black text-neutral-900">{item.price.toLocaleString()}원</span>
                          </div>

                          <div className="flex items-center space-x-1.5">
                            {/* Upgrade to Suyeok set advice click */}
                            {item.category === 'main' && (
                              <button 
                                onClick={() => {
                                  // recommend upgrading by switching to combo tab
                                  setSelectedCategory('combo');
                                  alert(`${item.name}에 한방 보양 수육을 더한 '닭칼수육세트'로 알차게 업그레이드 즐겨보세요! 세트 구매가 가장 가성비 높습니다.`);
                                }}
                                className="text-[10px] font-bold text-gold-700 bg-gold-100/50 hover:bg-gold-100 px-2 py-1.5 rounded-lg border border-gold-200 transition"
                              >
                                🥓 세트강추 (+8,000)
                              </button>
                            )}

                            <button 
                              onClick={() => addToCart(item)}
                              className="px-3 py-1.5 bg-gold-500 hover:bg-gold-600 active:scale-95 text-neutral-950 text-[10.5px] font-black rounded-lg transition-transform flex items-center space-x-0.5 select-none"
                            >
                              <ShoppingBag className="w-3 h-3 stroke-[2.5]" />
                              <span>포장담기</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            )}

            {/* TAB 3: WAITING & SOLO DINERS GUIDE PANEL */}
            {activeTab === 'wait' && (
              <motion.div
                key="wait"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 px-4"
              >
                
                {/* Headline visual */}
                <div className="text-center py-2 space-y-1">
                  <h3 className="text-[15px] font-black text-neutral-900 font-serif">피크타임 대기 & 스마트 혼밥 보양 가이드</h3>
                  <p className="text-[10.5px] text-neutral-500 max-w-[280px] mx-auto leading-normal">
                    바쁜 강남 직장인 점심 피크에도 대기 시간을 확 줄이고 신속하게 대접받는 현풍만의 스마트 비책
                  </p>
                </div>

                {/* Dynamic wait forecaster interactive tool (웨이팅 시뮬레이터) */}
                <div className="bg-white p-4 rounded-2xl border border-gold-200/70 shadow-sm space-y-3.5">
                  <div className="flex items-center space-x-1 border-b border-gold-100 pb-2">
                    <TrendingUp className="w-4 h-4 text-gold-500" />
                    <h4 className="text-[12.5px] font-black text-neutral-900">도착시간별 예상 웨이팅 진단기</h4>
                  </div>
                  
                  <p className="text-[10.5px] text-neutral-400 -mt-2">
                    방문 시간과 인원을 선택하면, 강남역삼점의 요일별 누적 방문 통계 데이터베이스를 기반으로 혼잡 상황을 즉시 리포트해 드립니다.
                  </p>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-neutral-600 block">도착 예상시간</label>
                      <select 
                        value={planTime} 
                        onChange={(e) => setPlanTime(e.target.value)}
                        className="w-full text-xs p-2 bg-neutral-50 border border-neutral-300 rounded-lg font-mono focus:border-gold-500 focus:outline-none"
                      >
                        <option value="11:00">11:00 (오픈 즉시)</option>
                        <option value="11:30">11:30 (이른 점심)</option>
                        <option value="11:50">11:50 (평일피크 진입)</option>
                        <option value="12:20">12:20 (직장인 최대혼잡)</option>
                        <option value="12:50">12:50 (피크 완화중)</option>
                        <option value="13:20">13:20 (한산한 늦은점심)</option>
                        <option value="14:00">14:00 (매우 한적)</option>
                        <option value="18:00">18:00 (저녁 본격입장)</option>
                        <option value="19:00">19:00 (저녁 보양반주)</option>
                        <option value="20:00">20:00 (토일 마감직전)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-neutral-600 block">동반 인원수</label>
                      <select 
                        value={planGuests} 
                        onChange={(e) => setPlanGuests(parseInt(e.target.value))}
                        className="w-full text-xs p-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:border-gold-500 focus:outline-none"
                      >
                        <option value="1">🙋‍♂️ 1명 (혼밥족)</option>
                        <option value="2">👥 2명 (기본)</option>
                        <option value="3">👨‍👦‍👦 3명</option>
                        <option value="4">👨‍👩‍👧‍👦 4명 이상</option>
                      </select>
                    </div>
                  </div>

                  {/* Calculations rendering box with nice status colors */}
                  {calculatedWaitResult && (
                    <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
                      <div className="flex justify-between items-center flex-wrap gap-1">
                        <span className="text-[10.5px] font-semibold text-neutral-500">진단된 예상 주중 상태:</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${calculatedWaitResult.badgeColor}`}>
                          {calculatedWaitResult.status}
                        </span>
                      </div>

                      <div className="flex items-baseline space-x-1.5 py-1">
                        <span className="text-xs text-neutral-600">스마트 예상 대기:</span>
                        <span className="text-xl font-black text-rose-600 font-mono">
                          {calculatedWaitResult.waitMinutes === 0 ? '대기 없음' : `${calculatedWaitResult.waitMinutes}분 내외`}
                        </span>
                        {calculatedWaitResult.waitMinutes > 0 && (
                          <span className="text-[9.5px] text-neutral-400">(빠른 회전율 감안됨)</span>
                        )}
                      </div>

                      <p className="text-[10.5px] text-neutral-700 leading-normal bg-white p-2 rounded-lg border border-neutral-100 font-light">
                        💡 <span className="font-semibold text-gold-700">진단 처방:</span> {calculatedWaitResult.advice}
                      </p>
                    </div>
                  )}
                </div>

                {/* Peak busy bar chart view */}
                <div className="bg-white p-4 rounded-2xl border border-gold-50 shadow-sm space-y-3">
                  <div>
                    <h4 className="text-[12.5px] font-black text-neutral-900 font-serif">시간대별 누적 혼잡지수 트렌드</h4>
                    <p className="text-[10px] text-neutral-400">강남 특성상 평일 점심에만 집중, 그 외 즉시입장</p>
                  </div>

                  {/* HTML bars representation graph */}
                  <div className="space-y-2 pt-2">
                    {PEAK_HOURS.map((item) => (
                      <div key={item.hour} className="flex items-center space-x-2">
                        <span className="text-[11px] font-mono text-neutral-500 w-10">{item.hour}</span>
                        <div className="flex-1 bg-neutral-100 h-2.5 rounded-full overflow-hidden relative">
                          <div 
                            className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${item.busyLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-neutral-600 w-24 text-right">
                          주중 {item.busyLevel}% ({item.label})
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[9.5px] text-neutral-400 text-center leading-normal pt-1.5 border-t border-dashed border-neutral-100">
                    * 국수 메뉴의 신속 조리 회전율 덕에 바 테이블 좌석은 누적율에 상관 없이 초고속 점유됩니다.
                  </p>
                </div>

                {/* Waiting & dining hacks bullets with beautiful graphics */}
                <div className="space-y-2.5">
                  <h4 className="text-[12.5px] font-black text-neutral-900 font-serif flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-gold-500" />
                    <span>강남역삼점 웨이팅 격파용 3대 꿀팁</span>
                  </h4>

                  <div className="space-y-2">
                    {WAITING_TIPS.map((tip, idx) => (
                      <div key={idx} className="p-3 bg-white hover:bg-gold-50/50 rounded-xl border border-neutral-100 shadow-xs flex items-start space-x-3 transition">
                        <div className="w-6 h-6 rounded-full bg-gold-400/10 text-gold-700 flex items-center justify-center font-bold text-xs select-none flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="space-y-0.5">
                          <h5 className="text-[11.5px] font-extrabold text-neutral-900">{tip.title}</h5>
                          <p className="text-[10px] text-neutral-500 leading-normal font-light">{tip.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 4: RESERVATION & TAKEAWAY ORDER HISTORY COUNTER PANEL */}
            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 px-4"
              >
                
                <h3 className="text-[14px] font-black text-neutral-900 font-serif border-b border-gold-100 pb-1.5 flex items-center justify-between">
                  <span>나의 예약 및 포장주문 영수증</span>
                  <span className="text-[10px] text-neutral-400 font-sans font-light">실시간 상태 실소동</span>
                </h3>

                {/* If empty bookings AND orders */}
                {bookings.length === 0 && orders.length === 0 && (
                  <div className="py-12 text-center space-y-3.5 bg-white rounded-2xl border border-neutral-150 p-6 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-neutral-800">주문서 및 예약 신청 내역이 없습니다.</h4>
                      <p className="text-[10px] text-neutral-400 max-w-[200px] mx-auto leading-normal">
                        지금 빠르고 간편하게 온라인 예약 또는 포장 주문서를 접수해보세요!
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={() => {
                          setBookingDate('2026-06-12');
                          setShowBookingModal(true);
                        }}
                        className="px-3 py-1.5 bg-gold-500 hover:bg-gold-600 text-neutral-950 text-[10px] font-black rounded-lg"
                      >
                        간편 테이블 예약
                      </button>
                      <button 
                        onClick={() => setActiveTab('menu')}
                        className="px-3 py-1.5 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-[10px] font-black rounded-lg"
                      >
                        포장 픽업 주문
                      </button>
                    </div>
                  </div>
                )}

                {/* List Table Bookings */}
                {bookings.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-[11.5px] font-extrabold text-[#7D5F36] uppercase tracking-wider flex items-center">
                      🍽️ 매장 식사 예약 ({bookings.length}건)
                    </h4>
                    
                    {bookings.map((b) => (
                      <div 
                        key={b.id}
                        className={`p-3.5 rounded-2xl border border-gold-200/60 bg-white shadow-sm space-y-2.5 relative overflow-hidden ${
                          b.status === 'cancelled' ? 'opacity-60 grayscale-[30%]' : ''
                        }`}
                      >
                        {/* Cancel stamp if cancelled */}
                        {b.status === 'cancelled' && (
                          <div className="absolute right-4 top-4 border-2 border-red-500 text-red-500 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded rotate-12 bg-white/90 z-20">
                            예약 취소됨
                          </div>
                        )}

                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] bg-gold-100 text-gold-800 font-bold px-1.5 py-0.5 rounded-md">
                              {b.id}
                            </span>
                            <h5 className="text-xs font-black text-neutral-900 mt-1">{b.name} 고객님 식사용 예약</h5>
                          </div>

                          {b.status !== 'cancelled' && (
                            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                              <Check className="w-3 h-3 stroke-[2.5]" /> 예약 확정
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[10.5px] bg-neutral-50 p-2 rounded-xl border border-neutral-150 font-mono">
                          <div>
                            <span className="text-neutral-400 font-sans mr-1 font-normal">날짜:</span>
                            <span className="text-neutral-800 font-extrabold">{b.date}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 font-sans mr-1 font-normal">인원:</span>
                            <span className="text-neutral-800 font-extrabold">{b.guests}명</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-neutral-400 font-sans mr-1 font-normal">시간:</span>
                            <span className="text-neutral-800 font-extrabold">{b.time}</span>
                          </div>
                        </div>

                        <div className="text-[10px] leading-relaxed">
                          <span className="font-bold text-neutral-600">세부 비고사항:</span>
                          <span className="text-neutral-500 ml-1 font-light block mt-0.5">{b.notes}</span>
                        </div>

                        {b.status === 'confirmed' && (
                          <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                            <p className="text-[9.5px] text-neutral-400 leading-normal">
                              * 변경 필요 시 연락 주시면 바로 수정해 드립니다.
                            </p>
                            <button 
                              onClick={() => cancelBooking(b.id)}
                              className="text-[9.5px] font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md"
                            >
                              예약 취소
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* List Pickup Takeaway Orders */}
                {orders.length > 0 && (
                  <div className="space-y-4 pt-3 border-t border-dashed border-neutral-200">
                    <h4 className="text-[11.5px] font-extrabold text-rose-700 uppercase tracking-wider flex items-center">
                      🛍️ 포장 픽업 주문서 ({orders.length}건)
                    </h4>

                    {orders.map((ord) => {
                      const isPrep = ord.status === 'preparing';
                      const isReady = ord.status === 'ready';
                      return (
                        <div 
                          key={ord.id}
                          className="p-4 bg-white rounded-2xl border border-rose-100 shadow-sm space-y-3 relative overflow-hidden"
                        >
                          {/* Live progression bar for prepare status */}
                          <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-100">
                            <div 
                              className={`h-full ${isReady ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'} transition-all duration-1000`} 
                              style={{ width: isPrep ? '55%' : '100%' }}
                            ></div>
                          </div>

                          <div className="flex justify-between items-start pt-1">
                            <div>
                              <span className="text-[9px] bg-rose-50 text-rose-700 font-bold px-1.5 py-0.5 rounded-md">
                                {ord.id}
                              </span>
                              <h5 className="text-xs font-black text-neutral-900 mt-1">{ord.name} 고객님 포장 주문</h5>
                            </div>

                            {isPrep && (
                              <span className="text-[9.5px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 animate-pulse">
                                <Timer className="w-3 w-3" /> 주방 조리중
                              </span>
                            )}
                            {isReady && (
                              <span className="text-[9.5px] text-white bg-emerald-600 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 fill-white" /> 포장완료! 픽업대기
                              </span>
                            )}
                          </div>

                          {/* Order Receipt breakdown */}
                          <div className="border border-dashed border-neutral-200 bg-neutral-50/50 p-2.5 rounded-xl text-[10.5px] space-y-1 my-1.5 font-mono">
                            {ord.items.map((cartit, idx) => (
                              <div key={idx} className="flex justify-between text-neutral-700">
                                <span>{cartit.menuItem.name} x {cartit.quantity}</span>
                                <span>{(cartit.menuItem.price * cartit.quantity).toLocaleString()}원</span>
                              </div>
                            ))}
                            <div className="flex justify-between text-neutral-500 text-[9.5px] pt-1">
                              <span>포장 및 용기별 가산 비용 (각 1,000)</span>
                              <span>{ord.packagingFee.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between font-black text-neutral-900 border-t border-dashed border-neutral-200 pt-1.5 mt-1.5 text-xs">
                              <span>총 결제금액 (픽업시 현장 정산)</span>
                              <span className="text-rose-600 font-sans font-black">{ord.totalAmount.toLocaleString()}원</span>
                            </div>
                          </div>

                          {/* Location pickup detail info */}
                          <div className="p-2.5 bg-neutral-100 rounded-xl space-y-1.5">
                            <div className="flex justify-between text-[10.5px]">
                              <span className="text-neutral-500 font-extrabold">픽업 예정 시간:</span>
                              <span className="font-black text-neutral-800 font-mono">{ord.pickupTime}</span>
                            </div>
                            <div className="flex items-start text-[9.5px] text-neutral-500 gap-1 leading-normal">
                              <Info className="w-3 h-3 text-gold-600 flex-shrink-0 mt-0.5" />
                              <span>조리 완료 후 20분이 지나면 칼국수 면이 다소 불 수 있습니다. 예정 시간에 맞춰 신속 수령해주세요!</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-[9.5px] text-neutral-400 pt-1">
                            <span className="font-mono">신청: {new Date(ord.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            <span className="text-gold-600 font-bold">전화 걸어 문의하기: {STORE_INFO.phone}</span>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}

              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* BOTTOM NAVIGATION DECK (Sticky Mobile Layout) */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gold-100 z-40 px-3 pb-4 pt-1 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] flex justify-around">
          {[
            { id: 'home', label: '홈', icon: Utensils },
            { id: 'menu', label: '메뉴판', icon:Compass  },
            { id: 'wait', label: '대기진단', icon: AlarmTriggerIcon }, // custom icon fallback
            { id: 'history', label: '예약내역', icon: CheckCircle2, badge: bookings.length + orders.length }
          ].map((tab) => {
            const Icon = tab.id === 'wait' ? TrendingUp : tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setBookingSuccessId(null);
                  setOrderSuccessId(null);
                }}
                className={`relative py-1.5 flex flex-col items-center flex-1 transition-all select-none ${
                  isActive ? 'text-gold-600' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <div className={`p-1 rounded-full transition-transform ${isActive ? 'scale-115' : ''}`}>
                  <Icon className="w-4.5 h-4.5 stroke-[2.3]" />
                </div>
                <span className="text-[9.5px] font-black mt-0.5 tracking-tight">{tab.label}</span>
                
                {/* Visual indicator bar under selection */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 w-8 h-0.5 bg-gold-500 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Notifications count badge */}
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute top-1 right-[25%] bg-rose-600 text-white min-w-[14px] h-[14px] rounded-full text-[8.5px] font-extrabold flex items-center justify-center border border-white animate-pulse">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* SHOPPING CART / TAKEAWAY ORDER DRAWER MODAL SHEET */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              {/* Drawer backdrop overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="absolute inset-0 bg-black z-50 rounded-b-[28px]"
              />

              {/* Dynamic Sliding Shopping Cart Drawer */}
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="absolute bottom-0 left-0 right-0 max-h-[82%] bg-white rounded-t-3xl z-50 pt-2 pb-6 shadow-2xl flex flex-col overflow-hidden"
              >
                
                {/* Header bar within drawer */}
                <div className="flex justify-between items-center px-4.5 py-2.5 border-b border-neutral-100">
                  <div className="flex items-center space-x-1.5">
                    <ShoppingBag className="w-4 h-4 text-gold-600" />
                    <span className="text-xs font-black text-neutral-900">포장 희망 메뉴 장바구니 ({cart.length})</span>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Body scroll of cart menu items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-neutral-400 space-y-2">
                      <ShoppingBag className="w-8 h-8 mx-auto opacity-30" />
                      <p className="text-xs font-bold">장바구니가 비어 있습니다.</p>
                      <button 
                        onClick={() => {
                          setIsCartOpen(false);
                          setActiveTab('menu');
                        }}
                        className="text-[11px] font-black text-gold-600 bg-gold-50 px-2.5 py-1 rounded-full"
                      >
                        메뉴 추가하기
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3">
                        {cart.map((cartItem) => (
                          <div 
                            key={cartItem.menuItem.id}
                            className="bg-neutral-50 p-3 rounded-xl border border-neutral-200/60 flex items-center justify-between space-x-1.5"
                          >
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <h5 className="text-[11.5px] font-black text-neutral-900 truncate">
                                {cartItem.menuItem.name}
                              </h5>
                              <p className="text-[10px] text-neutral-400 font-mono">
                                단품: {cartItem.menuItem.price.toLocaleString()}원 (+ 패키징 1,000)
                              </p>

                              {/* Customization toggler for each item (Kimchi choice) */}
                              <div className="flex items-center space-x-1.5 pt-1">
                                <span className="text-[9.5px] text-neutral-500 font-extrabold">김치취향:</span>
                                {(['spicy', 'half', 'mild'] as const).map((ktype) => (
                                  <button
                                    key={ktype}
                                    onClick={() => updateCartKimchi(cartItem.menuItem.id, ktype)}
                                    className={`px-1.5 py-0.5 rounded text-[8.5px] font-black tracking-tight ${
                                      cartItem.options.kimchiType === ktype
                                        ? 'bg-rose-500 text-white'
                                        : 'bg-white border border-neutral-200 text-neutral-600'
                                    }`}
                                  >
                                    {ktype === 'spicy' ? '매우 실비' : ktype === 'mild' ? '안매운' : '반반 섞어서'}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Qty Counter */}
                            <div className="flex items-center space-x-2 border border-neutral-200 bg-white rounded-lg p-1">
                              <button 
                                onClick={() => updateCartQty(cartItem.menuItem.id, -1)}
                                className="p-0.5 rounded hover:bg-neutral-100 text-neutral-500"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-black font-mono w-4 text-center">{cartItem.quantity}</span>
                              <button 
                                onClick={() => updateCartQty(cartItem.menuItem.id, 1)}
                                className="p-0.5 rounded hover:bg-neutral-100 text-neutral-500"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Checkout Information Form */}
                      <form onSubmit={handleOrderSubmit} className="space-y-3 pt-3 border-t border-dashed border-neutral-200">
                        <h5 className="text-[11px] font-extrabold text-[#7D5F36] uppercase tracking-wider flex items-center gap-1">
                          📋 포장 주문자 픽업 정보 입력
                        </h5>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="space-y-1">
                            <label className="text-[9.5px] font-extrabold text-neutral-500 block">주문자명</label>
                            <input 
                              type="text" 
                              required
                              placeholder="예: 홍길동"
                              value={orderName}
                              onChange={(e) => setOrderName(e.target.value)}
                              className="w-full text-xs p-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-500"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9.5px] font-extrabold text-neutral-500 block">휴대폰 연락처</label>
                            <input 
                              type="tel" 
                              required
                              placeholder="예: 010-1234-5678"
                              value={orderPhone}
                              onChange={(e) => setOrderPhone(e.target.value)}
                              className="w-full text-xs p-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-500"
                            />
                          </div>

                          <div className="col-span-2 space-y-1">
                            <label className="text-[9.5px] font-extrabold text-neutral-500 block">매장 픽업 예정 시간</label>
                            <select
                              value={orderTime}
                              onChange={(e) => setOrderTime(e.target.value)}
                              className="w-full text-xs p-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-500"
                            >
                              <option value="11:30">11:30 (이른 점심 수령)</option>
                              <option value="12:00">12:00 (점심 피크 수령)</option>
                              <option value="12:35">12:35</option>
                              <option value="13:10">13:10</option>
                              <option value="14:00">14:00 (오후 한산 시간)</option>
                              <option value="18:30">18:30 (저녁 픽업)</option>
                              <option value="19:30">19:30 (토일 마감 수령)</option>
                              <option value="20:15">20:15 (주중 최종 라스트오더)</option>
                            </select>
                          </div>
                        </div>

                        {/* Pricing Subtotals summary */}
                        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-[10.5px] space-y-1.5 font-mono">
                          <div className="flex justify-between text-neutral-500">
                            <span>총 메뉴 금액 합계</span>
                            <span>{cartSubtotal.toLocaleString()}원</span>
                          </div>
                          <div className="flex justify-between text-neutral-500">
                            <span>용기 패키징 추가 가산 비용 (+1,000x개)</span>
                            <span className="text-rose-600 font-bold">+{packagingFeeTotal.toLocaleString()}원</span>
                          </div>
                          <div className="flex justify-between font-black text-[#1a1917] border-t border-neutral-200 pt-1.5 text-xs">
                            <span className="font-sans">최종 정산 예상액 (현장 결제)</span>
                            <span className="text-sm font-black font-sans text-rose-600">{cartTotal.toLocaleString()}원</span>
                          </div>
                        </div>

                        {/* Order Submit Button */}
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-gold-500 hover:bg-gold-600 active:scale-[0.98] text-neutral-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>픽업 주문서 제출 (현장 정산)</span>
                        </button>
                      </form>
                    </>
                  )}
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* HIGH-FIDELITY ONLINE BOOKING DIALOG MODAL (Table Booking) */}
        <AnimatePresence>
          {showBookingModal && (
            <>
              {/* Modal Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowBookingModal(false)}
                className="absolute inset-0 bg-black z-50 rounded-b-[28px]"
              />

              {/* Modal Container */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="absolute top-12 left-4 right-4 max-h-[82%] bg-white rounded-2xl z-50 overflow-y-auto p-4 shadow-2xl space-y-4"
              >
                
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b border-neutral-100 pb-2.5">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gold-500" />
                    <h4 className="text-xs font-black text-neutral-900 font-serif">강남역삼점 온라인 실시간 예약</h4>
                  </div>
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-gold-50/70 p-3 rounded-lg border border-gold-100 text-[10px] leading-relaxed text-gold-900 flex items-start gap-1">
                  <Info className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>테이블 자동 예약:</strong> 본 온라인 예약을 작성하시면 주방 및 오프라인 예약 통합 시스템에 동기화되어 별도 번거로운 유선 확인 전화 없이 <strong className="text-gold-700">예약이 즉시 자동 확정</strong>됩니다.
                  </span>
                </div>

                {/* Form fields */}
                <form id="frm-booking" onSubmit={handleBookingSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-neutral-600 block">방문자 성함</label>
                      <input 
                        type="text" 
                        required
                        placeholder="예: 김철수"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="w-full text-xs p-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-neutral-600 block">휴대폰 번호</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="010-XXXX-XXXX"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full text-xs p-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-neutral-600 block">방문 선택일자</label>
                      <input 
                        type="date" 
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full text-xs p-2 bg-neutral-50 border border-neutral-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-gold-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-neutral-600 block">희망 시간</label>
                      <select 
                        value={bookingTime} 
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full text-xs p-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-500"
                      >
                        <option value="11:30">11:30 (이른 점심)</option>
                        <option value="12:00">12:00 (피크 1순위)</option>
                        <option value="12:30">12:30 (피크 2순위)</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="17:30">17:30 (저녁오픈)</option>
                        <option value="18:00">18:00 (저녁 1순위)</option>
                        <option value="18:35">18:35</option>
                        <option value="19:30">19:30 (라스트오더권)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-neutral-600 block">예약 인원수</label>
                      <select 
                        value={bookingGuests} 
                        onChange={(e) => setBookingGuests(parseInt(e.target.value))}
                        className="w-full text-xs p-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-500"
                      >
                        <option value="1">1명 (스마트 혼밥)</option>
                        <option value="2">2명 (기본 테이블)</option>
                        <option value="3">3명</option>
                        <option value="4">4명 (단인용석)</option>
                        <option value="6">6명 (사전 테이블 결합)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-neutral-600 block">조기 김치 반찬요청</label>
                      <select 
                        value={bookingKimchi} 
                        onChange={(e) => setBookingKimchi(e.target.value as any)}
                        className="w-full text-xs p-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none"
                      >
                        <option value="spicy">매운 실비김치 팍팍!</option>
                        <option value="mild">안매운 아삭김치 대령</option>
                        <option value="half">공평하게 반반 세팅</option>
                      </select>
                    </div>

                    <div className="col-span-2 space-y-1">
                      <label className="text-[10px] font-extrabold text-neutral-600 block">기타 요청사항 (알레르기, 자리지정 등)</label>
                      <textarea 
                        placeholder="예: 구석 창가 자리 희망합니다 / 면 부드럽게 조래해주세요."
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        className="w-full text-xs p-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-500 h-14 resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2.5 bg-gold-500 hover:bg-gold-600 text-neutral-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>실시간 자동 테이블 예약 확정</span>
                  </button>
                </form>

              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating Shopping Cart Sticky Button for fast ordering (Always visible when items inside cart) */}
        {cart.length > 0 && !isCartOpen && (
          <motion.button
            id="floating-cart-btn"
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="absolute bottom-20 right-4 z-40 bg-rose-600 text-white font-extrabold p-3 px-4 rounded-full shadow-[0_4px_20px_rgba(220,38,38,0.4)] flex items-center space-x-1.5 focus:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4 fill-white animate-bounce" />
            <span className="text-[11px]">포장 장바구니</span>
            <span className="bg-white text-rose-700 w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black">
              {cart.reduce((acc, c) => acc + c.quantity, 0)}
            </span>
          </motion.button>
        )}

      </div>

      </div>

    </div>
  );
}

// Fallback Custom Icon Component to avoid any missing imports or typescript errors
function AlarmTriggerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
