import { Character, LearningModule } from '@/types/game';

/**
 * 게임 캐릭터 초기 데이터
 */
export const CHARACTERS: Character[] = [
  {
    id: 'char_001',
    name: '성원',
    description: '밝고 적극적인 성격의 초보 부원',
    joinReason: '부장님(류완)이 좋아서 들어옴',
    personality: '밝고 적극적, 긍정적, 때로로 무모함',
    learningField: 'circuit',
    cuteMistakePattern: '저항값을 반대로 읽거나 극성을 헷갈림 → "어? 이게 왜 이러지?"',
    gapMoe: '강한 척하지만 실은 부장을 많이 의존하고 있음',
    affection: 20,
    understanding: 15,
    trust: 25,
    imageUrl: '/images/characters/sungwon.png',
  },
  {
    id: 'char_002',
    name: '세준',
    description: '츤데레 성향의 초보 부원. 나를 싫어하는 척하지만 속으로는...',
    joinReason: '학점 때문에 선택한 과목 (실제로는 심장이 두근거려서)',
    personality: '차분하고 논리적이지만 츤데레. 나를 무시하듯 혐오감 표출, 하지만 속마음은 정반대',
    learningField: 'programming',
    cuteMistakePattern: '나를 무시하려다가 실수를 지적받으면 "뭐하는 거야?!" 라고 짜증 내며 도움을 거절하다 결국 받음',
    gapMoe: '"부장님 따위가 뭐 하는 사람인데..." 라며 비꼬지만, 나를 볼 때마다 눈을 마주치지 못하고 얼굴이 빨개짐. 나 몰래 나에 대해 잔뜩 생각하고 있음',
    affection: 15,
    understanding: 20,
    trust: 20,
    imageUrl: '/images/characters/sejun.png',
  },
  {
    id: 'char_003',
    name: '예준',
    description: '소심하고 예민한 성격의 초보 부원',
    joinReason: '친구 따라서 들어옴 (처음엔 거부감 있었음)',
    personality: '소심하고 예민, 섬세함, 불안감 많음',
    learningField: 'physics',
    cuteMistakePattern: '전기 개념이 어렵다며 자주 울상, "이건 왜 이런 거예요?" 반복',
    gapMoe: '자신없지만 한 가지를 이해하면 깊이 있는 통찰을 함',
    affection: 10,
    understanding: 10,
    trust: 15,
    imageUrl: '/images/characters/yejun.png',
  },
  {
    id: 'char_004',
    name: '동진',
    description: '장난기 많고 호기심 많은 초보 부원',
    joinReason: '재미있을 것 같아서 (진짜 그 이유)',
    personality: '장난기 많고 호기심 많음, 직관력 뛰어남, 집중력 산만함',
    learningField: 'sensors',
    cuteMistakePattern: '부품을 마음대로 만져서 자꾸 에러 발생, "아 이건 뭐예요?" 하면서 실수',
    gapMoe: '태평스럽지만 위급한 상황에서 집중력 발휘, 직관으로 문제 푸는 천재',
    affection: 25,
    understanding: 12,
    trust: 18,
    imageUrl: '/images/characters/dongjin.png',
  },
];

/**
 * 일진 캐릭터들 (대치 씬용)
 */
export const BULLIES: Character[] = [
  {
    id: 'bully_001',
    name: '아라라기 김건우',
    description: '일진 멤버 1',
    joinReason: 'N/A',
    personality: '거만하고 폭력적, 주동적으로 괴롭힘',
    learningField: 'circuit',
    cuteMistakePattern: 'N/A',
    gapMoe: 'N/A',
    affection: 0,
    understanding: 0,
    trust: 0,
    imageUrl: '/images/characters/bully_01.png',
  },
  {
    id: 'bully_002',
    name: '민승',
    description: '일진 멤버 2',
    joinReason: 'N/A',
    personality: '냉소적이고 조롱적, 심리전 담당',
    learningField: 'programming',
    cuteMistakePattern: 'N/A',
    gapMoe: 'N/A',
    affection: 0,
    understanding: 0,
    trust: 0,
    imageUrl: '/images/characters/bully_02.png',
  },
  {
    id: 'bully_boss',
    name: '양기영',
    description: '일진 대장',
    joinReason: 'N/A',
    personality: '침착하고 계산적, 위협과 회유를 섞어 사용',
    learningField: 'sensors',
    cuteMistakePattern: 'N/A',
    gapMoe: 'N/A',
    affection: 0,
    understanding: 0,
    trust: 0,
    imageUrl: '/images/characters/bully_boss.png',
  },
];

/**
 * 주인공 캐릭터
 */
export const PROTAGONIST = {
  id: 'protagonist',
  name: '류완',
  role: '동아리 부장',
  expertise: ['회로설계', '납땜', 'C언어', '아두이노', '전자기학', '센서활용'],
  description: '전기·전자 분야에 깊은 지식을 가진 능력 있는 부장',
  imageUrl: '/images/characters/ryuwan.png',
};

/**
 * 학습 모듈 초기 데이터
 */
export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'module_circuit',
    characterId: 'char_001',
    topic: '기초 회로/납땜',
    progressPercent: 0,
    completed: false,
    scenes: [
      {
        id: 'scene_circuit_01',
        characterId: 'char_001',
        title: '저항 읽는 법 배우기',
        background: '동아리실, 오후 4시, 햇빛이 들어오는 창가',
        backgroundImage: '/images/backgrounds/club_room_afternoon.png',
        dialogue: [],
        affectionChange: 5,
        understandingChange: 15,
        trustChange: 3,
        bgmTrack: '/audio/bgm/afternoon_study.mp3',
        sfxEffects: [],
      },
    ],
  },
  {
    id: 'module_programming',
    characterId: 'char_002',
    topic: 'C언어/아두이노 기초',
    progressPercent: 0,
    completed: false,
    scenes: [],
  },
  {
    id: 'module_physics',
    characterId: 'char_003',
    topic: '전자기학 이론',
    progressPercent: 0,
    completed: false,
    scenes: [],
  },
  {
    id: 'module_sensors',
    characterId: 'char_004',
    topic: '센서/부품 활용',
    progressPercent: 0,
    completed: false,
    scenes: [],
  },
];

/**
 * 엔딩 조건
 */
export const ENDING_CONDITIONS = {
  trueEnding: {
    affectionMin: 80,
    understandingMin: 90,
    trustMin: 75,
    projectCompleted: true,
  },
  goodEnding: {
    affectionMin: 60,
    understandingMin: 70,
    trustMin: 60,
    projectCompleted: true,
  },
  normalEnding: {
    affectionMin: 0,
    understandingMin: 0,
    trustMin: 0,
    projectCompleted: true,
  },
  badEnding: {
    affectionMin: 0,
    understandingMin: 0,
    trustMin: 0,
    projectCompleted: false,
  },
};
