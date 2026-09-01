import React from 'react';
import { GameScene, GameChoice } from '@/types/scene';
import { CHARACTERS } from '@/data/gameData';
import './SceneRenderer.css';

interface SceneRendererProps {
  scene: GameScene;
  onChoiceSelect: (choice: GameChoice) => void;
  isLoading?: boolean;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  scene,
  onChoiceSelect,
  isLoading = false,
}) => {
  const getCharacterName = (characterId?: string) => {
    if (!characterId) return '류완';
    const character = CHARACTERS.find((c) => c.id === characterId);
    return character?.name || '류완';
  };

  return (
    <div className="scene-renderer">
      <div className="scene-header">
        <h2 className="scene-title">{scene.title}</h2>
        <p className="scene-description">{scene.description}</p>
      </div>

      <div className="scene-content">
        <div className="dialogue-section">
          {scene.dialogue.map((line, index) => (
            <div key={index} className="dialogue-line">
              <span className="character-name">{line.character}:</span>
              <p className="dialogue-text">{line.text}</p>
            </div>
          ))}
        </div>

        {scene.choices && scene.choices.length > 0 && (
          <div className="choices-section">
            <h3>뭐를 선택할까요?</h3>
            <div className="choices-list">
              {scene.choices.map((choice) => (
                <button
                  key={choice.id}
                  className="choice-option"
                  onClick={() => onChoiceSelect(choice)}
                  disabled={isLoading}
                >
                  <span className="choice-text">{choice.text}</span>
                  <div className="choice-stats">
                    {choice.affectionDelta !== 0 && (
                      <span className={`stat ${choice.affectionDelta > 0 ? 'positive' : 'negative'}`}>
                        ❤️ {choice.affectionDelta > 0 ? '+' : ''}{choice.affectionDelta}
                      </span>
                    )}
                    {choice.understandingDelta !== 0 && (
                      <span className={`stat ${choice.understandingDelta > 0 ? 'positive' : 'negative'}`}>
                        💡 {choice.understandingDelta > 0 ? '+' : ''}{choice.understandingDelta}
                      </span>
                    )}
                    {choice.trustDelta !== 0 && (
                      <span className={`stat ${choice.trustDelta > 0 ? 'positive' : 'negative'}`}>
                        🤝 {choice.trustDelta > 0 ? '+' : ''}{choice.trustDelta}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
