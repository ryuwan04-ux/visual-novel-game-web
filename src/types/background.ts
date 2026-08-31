/**
 * 게임 배경(Background) 타입 정의
 */
export type BackgroundType = 
  | 'club_room_morning'
  | 'club_room_afternoon'
  | 'club_room_evening'
  | 'cafe_morning'
  | 'cafe_afternoon'
  | 'cafe_evening'
  | 'corridor_morning'
  | 'corridor_afternoon'
  | 'corridor_evening'
  | 'classroom'
  | 'school_gate'
  | 'rooftop'
  | 'library';

export interface Background {
  id: BackgroundType;
  name: string;
  imageUrl: string;
  description: string;
  ambiance?: {
    bgmTrack?: string;
    lighting: 'bright' | 'normal' | 'dim' | 'dark';
    mood: string;
  };
}

export const BACKGROUNDS: Record<BackgroundType, Background> = {
  club_room_morning: {
    id: 'club_room_morning',
    name: '동아리실 (아침)',
    imageUrl: '/images/backgrounds/club_room_morning.png',
    description: '햇빛이 창을 통해 들어오는 밝은 아침의 동아리실',
    ambiance: {
      bgmTrack: '/audio/bgm/morning_peaceful.mp3',
      lighting: 'bright',
      mood: '활기차고 희망적인',
    },
  },
  club_room_afternoon: {
    id: 'club_room_afternoon',
    name: '동아리실 (오후)',
    imageUrl: '/images/backgrounds/club_room_afternoon.png',
    description: '따뜻한 오후 햇빛이 가득한 동아리실. 작업 테이블에는 전자 부품들이 흩어져 있다.',
    ambiance: {
      bgmTrack: '/audio/bgm/afternoon_study.mp3',
      lighting: 'normal',
      mood: '집중력 있는',
    },
  },
  club_room_evening: {
    id: 'club_room_evening',
    name: '동아리실 (저녁)',
    imageUrl: '/images/backgrounds/club_room_evening.png',
    description: '형광등이 켜진 저녁의 동아리실. 창밖은 어두워졌고, 실내는 따뜻한 불빛으로 물들어 있다.',
    ambiance: {
      bgmTrack: '/audio/bgm/evening_cozy.mp3',
      lighting: 'dim',
      mood: '따뜻하고 친밀한',
    },
  },
  cafe_morning: {
    id: 'cafe_morning',
    name: '학교 카페 (아침)',
    imageUrl: '/images/backgrounds/cafe_morning.png',
    description: '학교 카페. 아침 햇빛이 들어오는 창가 테이블. 커피 머신이 부르르 거린다.',
    ambiance: {
      bgmTrack: '/audio/bgm/cafe_morning.mp3',
      lighting: 'bright',
      mood: '신선하고 활발한',
    },
  },
  cafe_afternoon: {
    id: 'cafe_afternoon',
    name: '학교 카페 (오후)',
    imageUrl: '/images/backgrounds/cafe_afternoon.png',
    description: '카페 내부. 학생들이 삼삼오오 앉아있고, 따뜻한 커피 향이 가득하다.',
    ambiance: {
      bgmTrack: '/audio/bgm/cafe_afternoon.mp3',
      lighting: 'normal',
      mood: '편안하고 소박한',
    },
  },
  cafe_evening: {
    id: 'cafe_evening',
    name: '학교 카페 (저녁)',
    imageUrl: '/images/backgrounds/cafe_evening.png',
    description: '저녁의 카페. 창밖으로는 해가 지고, 실내는 따뜻한 조명으로 감싸다.',
    ambiance: {
      bgmTrack: '/audio/bgm/cafe_evening.mp3',
      lighting: 'dim',
      mood: '낭만적이고 조용한',
    },
  },
  corridor_morning: {
    id: 'corridor_morning',
    name: '학교 복도 (아침)',
    imageUrl: '/images/backgrounds/corridor_morning.png',
    description: '학교 복도. 아침 햇빛이 긴 복도를 따라 비추고 있다. 조용하고 한적하다.',
    ambiance: {
      bgmTrack: '/audio/bgm/corridor_morning.mp3',
      lighting: 'bright',
      mood: '고요하고 신선한',
    },
  },
  corridor_afternoon: {
    id: 'corridor_afternoon',
    name: '학교 복도 (오후)',
    imageUrl: '/images/backgrounds/corridor_afternoon.png',
    description: '오후의 복도. 창문으로 부드러운 햇빛이 들어오고, 먼 곳에서 시계 초침 소리가 들린다.',
    ambiance: {
      bgmTrack: '/audio/bgm/corridor_afternoon.mp3',
      lighting: 'normal',
      mood: '평화로운',
    },
  },
  corridor_evening: {
    id: 'corridor_evening',
    name: '학교 복도 (저녁)',
    imageUrl: '/images/backgrounds/corridor_evening.png',
    description: '저녁 시간의 복도. 형광등 불빛만 켜져 있고, 복도는 침침하다. 발걸음 소리가 크게 울린다.',
    ambiance: {
      bgmTrack: '/audio/bgm/corridor_evening.mp3',
      lighting: 'dark',
      mood: '긴장되고 신비로운',
    },
  },
  classroom: {
    id: 'classroom',
    name: '교실',
    imageUrl: '/images/backgrounds/classroom.png',
    description: '고요한 교실. 책상과 의자가 정렬되어 있고, 칠판에는 수식이 남아있다.',
    ambiance: {
      bgmTrack: '/audio/bgm/classroom_study.mp3',
      lighting: 'normal',
      mood: '진지하고 집중된',
    },
  },
  school_gate: {
    id: 'school_gate',
    name: '학교 정문',
    imageUrl: '/images/backgrounds/school_gate.png',
    description: '학교 정문 앞. 넓은 광장과 등하교 학생들이 지나다닌다.',
    ambiance: {
      bgmTrack: '/audio/bgm/school_gate.mp3',
      lighting: 'bright',
      mood: '활기차고 생동적인',
    },
  },
  rooftop: {
    id: 'rooftop',
    name: '학교 옥상',
    imageUrl: '/images/backgrounds/rooftop.png',
    description: '학교 옥상. 탁 트인 하늘과 도시 전망이 보인다. 상큼한 바람이 불어온다.',
    ambiance: {
      bgmTrack: '/audio/bgm/rooftop_wind.mp3',
      lighting: 'bright',
      mood: '자유로운',
    },
  },
  library: {
    id: 'library',
    name: '학교 도서관',
    imageUrl: '/images/backgrounds/library.png',
    description: '학교 도서관. 책장들이 줄지어 있고, 조용한 분위기가 감돈다. 페이지 넘어가는 소리만 들린다.',
    ambiance: {
      bgmTrack: '/audio/bgm/library_silence.mp3',
      lighting: 'normal',
      mood: '침착하고 집중된',
    },
  },
};

export const BACKGROUND_PRESETS = {
  teachingSession: ['club_room_afternoon', 'club_room_evening', 'classroom', 'library'],
  casualMeeting: ['cafe_afternoon', 'corridor_afternoon', 'school_gate'],
  romanticScene: ['cafe_evening', 'rooftop', 'club_room_evening'],
  tenseScene: ['corridor_evening', 'classroom'],
  projectWork: ['club_room_afternoon', 'club_room_evening'],
};
