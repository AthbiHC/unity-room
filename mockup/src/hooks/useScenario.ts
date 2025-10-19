import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/appStore';
import { techFundScenario, techFundInsights } from '../data/scenarioData';

export const useScenario = () => {
  const scenarioMode = useAppStore((state) => state.scenarioMode);
  const scenarioPlaying = useAppStore((state) => state.scenarioPlaying);
  const scenarioTime = useAppStore((state) => state.scenarioTime);
  const scenarioSpeed = useAppStore((state) => state.scenarioSpeed);
  const setScenarioTime = useAppStore((state) => state.setScenarioTime);
  
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(Date.now());
  
  useEffect(() => {
    if (!scenarioMode || !scenarioPlaying) {
      return;
    }
    
    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = now;
      
      // Update scenario time (1 minute per second at 1x speed)
      const newTime = scenarioTime + (delta * 60 * scenarioSpeed);
      
      // Loop back to start if we reach the end
      const maxTime = Math.max(...techFundScenario.map(e => e.timestamp));
      if (newTime > maxTime + 60) {
        setScenarioTime(0);
      } else {
        setScenarioTime(newTime);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scenarioMode, scenarioPlaying, scenarioTime, scenarioSpeed, setScenarioTime]);
  
  // Get active events at current time
  const getActiveEvents = () => {
    return techFundScenario.filter(event => 
      event.timestamp <= scenarioTime && event.timestamp > scenarioTime - 30 // Last 30 minutes
    );
  };
  
  // Get active insights
  const getActiveInsights = () => {
    return techFundInsights.filter(insight =>
      insight.timestamp <= scenarioTime && insight.timestamp > scenarioTime - 60 // Last hour
    );
  };
  
  // Get active platforms (have recent events)
  const getActivePlatforms = () => {
    const recentEvents = techFundScenario.filter(event =>
      event.timestamp <= scenarioTime && event.timestamp > scenarioTime - 10 // Last 10 minutes
    );
    return [...new Set(recentEvents.map(e => e.platformId))];
  };
  
  return {
    isActive: scenarioMode,
    currentTime: scenarioTime,
    activeEvents: getActiveEvents(),
    activeInsights: getActiveInsights(),
    activePlatforms: getActivePlatforms(),
    totalDuration: Math.max(...techFundScenario.map(e => e.timestamp)),
    formatTime: (minutes: number) => {
      if (minutes < 1440) { // Same day
        const hours = Math.floor(minutes / 60);
        const mins = Math.floor(minutes % 60);
        return `${String(hours + 9).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
      } else { // Next day
        const hours = Math.floor((minutes - 1440) / 60);
        const mins = Math.floor((minutes - 1440) % 60);
        return `Day 2, ${String(hours + 8).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
      }
    },
  };
};

