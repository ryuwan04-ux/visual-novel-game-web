import React, { useEffect } from 'react';
import { useBackgroundStore } from '@/store/backgroundStore';
import { BackgroundManager } from '@/utils/backgroundManager';
import './BackgroundDisplay.css';

interface BackgroundDisplayProps {
  backgroundId?: string;
}

export const BackgroundDisplay: React.FC<BackgroundDisplayProps> = ({
  backgroundId,
}) => {
  const { currentBackground, setBackground, transitionDuration } =
    useBackgroundStore();

  useEffect(() => {
    if (backgroundId) {
      setBackground(backgroundId as any);
    }
  }, [backgroundId, setBackground]);

  const background = BackgroundManager.getBackground(
    currentBackground as any
  );

  if (!background) {
    return <div className="background-display">배경을 로드할 수 없습니다.</div>;
  }

  return (
    <div
      className="background-display"
      style={{
        backgroundImage: `url(${background.imageUrl})`,
        transition: `background-image ${transitionDuration}ms ease-in-out`,
      }}
      title={background.description}
    >
      <div className="bg-overlay" />
      <div className="bg-info">{background.name}</div>
    </div>
  );
};
