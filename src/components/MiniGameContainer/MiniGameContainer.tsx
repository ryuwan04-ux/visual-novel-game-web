import React, { useState, useEffect } from 'react';
import { MiniGameType, MINI_GAMES } from '@/types/miniGame';
import './MiniGameContainer.css';

interface MiniGameContainerProps {
  gameType: MiniGameType;
  difficulty: 1 | 2 | 3;
  characterName: string;
  onComplete: (isSuccessful: boolean, score: number) => void;
  onCancel: () => void;
}

export const MiniGameContainer: React.FC<MiniGameContainerProps> = ({
  gameType,
  difficulty,
  characterName,
  onComplete,
  onCancel,
}) => {
  const config = MINI_GAMES[gameType];
  const [timeRemaining, setTimeRemaining] = useState(config.timeLimit);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          const isSuccessful = score >= config.targetScore;
          onComplete(isSuccessful, score);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [gameStarted, score, config, onComplete]);

  const handleGameAction = () => {
    const newScore = score + 10;
    setScore(newScore);
    setProgress((newScore / config.targetScore) * 100);
  };

  const getGameTitle = () => {
    switch (gameType) {
      case 'soldering_timing':
        return `${characterName}와 함께 납땜하기`;
      case 'component_search':
        return `${characterName}와 함께 부품 찾기`;
      case 'code_debug':
        return `${characterName}와 함께 코드 디버깅`;
    }
  };

  const getGameInstructions = () => {
    switch (gameType) {
      case 'soldering_timing':
        return '정확한 타이밍에 클릭하여 완벽한 납땜을 완성하세요!';
      case 'component_search':
        return '5개의 부품 중 3개를 정확히 찾아내세요!';
      case 'code_debug':
        return '잘못된 코드를 찾아 수정하세요!';
    }
  };

  const renderGameContent = () => {
    switch (gameType) {
      case 'soldering_timing':
        return (
          <div className="mini-game-content">
            <div className="soldering-animation">
              <div className="solder-point" />
              {gameStarted && (
                <div className="solder-cursor" />
              )}
            </div>
            {gameStarted && (
              <button className="game-action-btn" onClick={handleGameAction}>
                ⚡ 클릭!
              </button>
            )}
          </div>
        );
      case 'component_search':
        return (
          <div className="mini-game-content">
            <div className="component-grid">
              {Array.from({ length: 9 }).map((_, i) => (
                <button
                  key={i}
                  className="component-card"
                  onClick={() => {
                    if (i < 3) {
                      handleGameAction();
                    }
                  }}
                >
                  {i < 3 ? '��' : '?'}
                </button>
              ))}
            </div>
          </div>
        );
      case 'code_debug':
        return (
          <div className="mini-game-content">
            <div className="code-block">
              <pre>{`int main() {
  int x = 5;
  cout << x + "hello"; // 에러!
  return 0;
}`}</pre>
            </div>
            {gameStarted && (
              <button className="game-action-btn" onClick={handleGameAction}>
                🔧 수정하기
              </button>
            )}
          </div>
        );
    }
  };

  return (
    <div className="mini-game-overlay">
      <div className="mini-game-container">
        <div className="mini-game-header">
          <h2>{getGameTitle()}</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <p className="game-instructions">{getGameInstructions()}</p>

        <div className="game-stats">
          <div className="stat-item">
            <span>시간</span>
            <div className="timer">{(timeRemaining / 1000).toFixed(1)}s</div>
          </div>
          <div className="stat-item">
            <span>점수</span>
            <div className="score">{score} / {config.targetScore}</div>
          </div>
          <div className="stat-item">
            <span>난이도</span>
            <div className="difficulty">{'★'.repeat(difficulty)}</div>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {!gameStarted && (
          <button
            className="start-game-btn"
            onClick={() => setGameStarted(true)}
          >
            게임 시작!
          </button>
        )}

        {gameStarted && renderGameContent()}
      </div>
    </div>
  );
};
