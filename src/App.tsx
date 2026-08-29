import { useState } from 'react';
import MenuScreen from './screens/MenuScreen';
import LevelSelectScreen from './screens/LevelSelectScreen';
import GameScreen from './screens/GameScreen';
import type { GameMode } from './game/constants/LevelConstants';
import './index.css';

type Screen = 'menu' | 'levelselect' | 'game';

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [selectedMode, setSelectedMode] = useState<GameMode>('ion');
  const [selectedLevel, setSelectedLevel] = useState(1);

  if (screen === 'game') {
    return (
      <GameScreen
        mode={selectedMode}
        level={selectedLevel}
        onExit={() => setScreen('levelselect')}
        onLevelSelect={() => setScreen('levelselect')}
      />
    );
  }

  if (screen === 'levelselect') {
    return (
      <LevelSelectScreen
        mode={selectedMode}
        onSelect={(level) => { setSelectedLevel(level); setScreen('game'); }}
        onBack={() => setScreen('menu')}
      />
    );
  }

  return (
    <MenuScreen
      onSelectMode={(mode) => { setSelectedMode(mode); setScreen('levelselect'); }}
    />
  );
}
