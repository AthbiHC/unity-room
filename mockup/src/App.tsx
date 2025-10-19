import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { NetworkGraph } from './components/visualizations/NetworkGraph';
import { HUD } from './components/ui/HUD';
import { AlertFeed } from './components/ui/AlertFeed';
import { PlatformDetails } from './components/ui/PlatformDetails';
import { ContentStream } from './components/ui/ContentStream';
import { BreakingNews } from './components/ui/BreakingNews';
import { useDataStream } from './hooks/useDataStream';
import { useAppStore } from './store/appStore';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function App() {
  // Initialize data stream
  useDataStream();
  
  const mode = useAppStore((state) => state.mode);
  const setMode = useAppStore((state) => state.setMode);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '1') setMode('network');
      if (e.key === '2') setMode('control-room');
      if (e.key === '3') setMode('command');
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setMode]);
  
  return (
    <div className="w-full h-screen bg-black">
      {/* 3D Canvas */}
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#0a0a0a']} />
          
          {/* Render current visualization mode */}
          {mode === 'network' && <NetworkGraph />}
          {mode === 'control-room' && <NetworkGraph />} {/* TODO: Build Control Room */}
          {mode === 'command' && <NetworkGraph />} {/* TODO: Build Command Dashboard */}
          
          {/* Post-processing effects */}
          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
      
      {/* UI Overlays */}
      <HUD />
      <AlertFeed />
      <PlatformDetails />
      <ContentStream />
      <BreakingNews />
      
      {/* Loading indicator */}
      <LoadingScreen />
    </div>
  );
}

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 pointer-events-none opacity-0 animate-fade-out">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          جهينة
        </h1>
        <p className="text-gray-400 text-xl">Loading Intelligence Platform...</p>
        <p className="text-gray-500 text-sm mt-2">عند جهينة الخبر اليقين</p>
      </div>
    </div>
  );
};

export default App;
