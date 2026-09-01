import React, { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { SaveManager } from '@/utils/saveManager';
import { AudioManager } from '@/utils/audioManager';
import { EndingManager } from '@/utils/endingManager';
import { BackgroundDisplay } from '@/components/BackgroundDisplay/BackgroundDisplay';
import { ChoiceButtons } from '@/components/ChoiceButtons/ChoiceButtons';
import { MiniGameContainer } from '@/components/MiniGameContainer/MiniGameContainer';
import './GameContainer.css';

interface GameContainerProps {
  onGameEnd?: (endingType: string) => void;
}

export const GameContainer: React.FC<GameContainerProps> = ({ onGameEnd }) => {
  const gameStore = useGameStore();
  const [isPlaying, setIsPlaying] = useState(true);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [miniGameType, setMiniGameType] = useState<'soldering_timing' | 'component_search' | 'code_debug'>('soldering_timing');
  const [playTime, setPlayTime] = useState(0);

  // 게임 시간 추적
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setPlayTime((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // 주기적 자동 저장
  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      SaveManager.autoSave({
        currentSceneId: gameStore.currentSceneId,
        characterStats: gameStore.characterStats,
        completedScenes: gameStore.completedScenes,
        projectProgress: gameStore.projectProgress,
        totalPlayTime: playTime,
        currentDate: gameStore.currentDate,
        inventory: gameStore.inventory,
      });
    }, 30000); // 30초마다 자동 저장

    return () => clearInterval(autoSaveTimer);
  }, [gameStore, playTime]);

  const handleChoiceSelect = (choice: any) => {
    // 스텟 업데이트
    if (choice.characterId) {
      if (choice.affectionDelta) {
        gameStore.updateCharacterStat(choice.characterId, 'affection', choice.affectionDelta);
      }
      if (choice.understandingDelta) {
        gameStore.updateCharacterStat(choice.characterId, 'understanding', choice.understandingDelta);
      }
      if (choice.trustDelta) {
        gameStore.updateCharacterStat(choice.characterId, 'trust', choice.trustDelta);
      }
    }

    // 씬 완료 처리
    gameStore.completeScene(gameStore.currentSceneId);

    // 다음 씬으로 이동
    if (choice.nextSceneId) {
      gameStore.setCurrentScene(choice.nextSceneId);
    }
  };

  const handleMiniGameComplete = (isSuccessful: boolean, score: number) => {
    setShowMiniGame(false);
    if (isSuccessful) {
      gameStore.updateProjectProgress(20);
    }
  };

  const handleGameEnd = () => {
    const endingType = EndingManager.determineEnding(
      gameStore.characterStats,
      gameStore.projectProgress
    );

    setIsPlaying(false);
    AudioManager.stopBGM();

    if (onGameEnd) {
      onGameEnd(endingType);
    }
  };

  const handleSaveGame = () => {
    const success = SaveManager.saveGame(
      {
        currentSceneId: gameStore.currentSceneId,
        characterStats: gameStore.characterStats,
        completedScenes: gameStore.completedScenes,
        projectProgress: gameStore.projectProgress,
        totalPlayTime: playTime,
        currentDate: gameStore.currentDate,
        inventory: gameStore.inventory,
      },
      0
    );

    if (success) {
      alert('게임이 저장되었습니다!');
    }
  };

  const handleLoadGame = () => {
    const saveData = SaveManager.loadGame(0);
    if (saveData) {
      gameStore.setCurrentScene(saveData.currentSceneId);
      setPlayTime(saveData.playtime);
      alert('게임이 로드되었습니다!');
    } else {
      alert('저장된 게임이 없습니다.');
    }
  };

  return (
    <div className="game-container">
      {showMiniGame && (
        <MiniGameContainer
          gameType={miniGameType}
          difficulty={1}
          characterName="성원"
          onComplete={handleMiniGameComplete}
          onCancel={() => setShowMiniGame(false)}
        />
      )}

      <BackgroundDisplay backgroundId="club_room_afternoon" />

      <div className="game-ui">
        <div className="game-header">
          <div className="game-title">비주얼 노벨: 전기·전자 동아리</div>
          <div className="game-stats">
            <div className="stat">📅 {gameStore.currentDate}일차</div>
            <div className="stat">⏱️ {Math.floor(playTime / 1000 / 60)}분</div>
            <div className="stat">🏗️ {gameStore.projectProgress}%</div>
          </div>
        </div>

        <div className="dialogue-container">
          <div className="dialogue-box">
            <p className="dialogue-text">
              "안녕! 너도 전기·전자 동아리에 들어온 거야? 함께 스마트 하우스를 만들어보자!"
            </p>
          </div>
        </div>

        <div className="character-stats">
          <div className="character-stat">
            <span>성원</span>
            <div className="stat-bar">
              <div className="stat-fill affection" style={{ width: `${gameStore.characterStats.char_001.affection}%` }} />
            </div>
            <span className="stat-value">호감도: {gameStore.characterStats.char_001.affection}</span>
          </div>
          <div className="character-stat">
            <span>세준</span>
            <div className="stat-bar">
              <div className="stat-fill understanding" style={{ width: `${gameStore.characterStats.char_002.understanding}%` }} />
            </div>
            <span className="stat-value">이해도: {gameStore.characterStats.char_002.understanding}</span>
          </div>
        </div>

        <ChoiceButtons
          choices={[
            {
              id: 'choice_1',
              text: '칭찬해주기 (호감도 +15)',
              affectionDelta: 15,
              understandingDelta: 10,
            },
            {
              id: 'choice_2',
              text: '엄격하게 지적하기 (이해도 +20)',
              affectionDelta: -5,
              understandingDelta: 20,
            },
            {
              id: 'choice_3',
              text: '손을 잡고 도와주기 (호감도 +20, 이해도 +15)',
              affectionDelta: 20,
              understandingDelta: 15,
            },
          ]}
          onChoiceSelect={(choice) => handleChoiceSelect(choice)}
        />

        <div className="game-controls">
          <button className="control-btn save-btn" onClick={handleSaveGame}>
            💾 저장
          </button>
          <button className="control-btn load-btn" onClick={handleLoadGame}>
            📂 불러오기
          </button>
          <button className="control-btn end-btn" onClick={handleGameEnd}>
            🏁 게임 종료
          </button>
        </div>
      </div>
    </div>
  );
};
