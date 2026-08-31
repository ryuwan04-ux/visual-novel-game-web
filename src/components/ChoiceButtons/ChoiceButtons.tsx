import React from 'react';
import { Choice } from '@/types/game';
import './ChoiceButtons.css';

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
  disabled?: boolean;
}

export const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({
  choices,
  onChoiceSelect,
  disabled = false,
}) => {
  return (
    <div className="choice-buttons-container">
      {choices.map((choice) => (
        <button
          key={choice.id}
          className="choice-button"
          onClick={() => onChoiceSelect(choice)}
          disabled={disabled}
          title={`호감도: ${choice.affectionDelta > 0 ? '+' : ''}${choice.affectionDelta} | 이해도: ${choice.understandingDelta > 0 ? '+' : ''}${choice.understandingDelta}`}
        >
          <span className="choice-text">{choice.text}</span>
          <div className="choice-stats">
            {choice.affectionDelta !== 0 && (
              <span className={`stat affection ${choice.affectionDelta > 0 ? 'positive' : 'negative'}`}>
                ❤️ {choice.affectionDelta > 0 ? '+' : ''}{choice.affectionDelta}
              </span>
            )}
            {choice.understandingDelta !== 0 && (
              <span className={`stat understanding ${choice.understandingDelta > 0 ? 'positive' : 'negative'}`}>
                💡 {choice.understandingDelta > 0 ? '+' : ''}{choice.understandingDelta}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};
