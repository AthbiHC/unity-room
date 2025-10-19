import { useEffect, useRef } from 'react';
import { DataSimulator } from '../data/mockDataGenerator';
import { useAppStore } from '../store/appStore';

export const useDataStream = () => {
  const simulatorRef = useRef<DataSimulator | null>(null);
  const updateData = useAppStore((state) => state.updateData);
  const scenarioMode = useAppStore((state) => state.scenarioMode);
  
  useEffect(() => {
    // Don't run real-time simulation in scenario mode
    if (scenarioMode) {
      return;
    }
    
    // Create simulator
    simulatorRef.current = new DataSimulator(2000); // Update every 2 seconds
    
    // Start simulation
    simulatorRef.current.start((data) => {
      updateData(data);
    });
    
    // Initial data
    updateData({
      metrics: simulatorRef.current.getMetrics(),
      content: simulatorRef.current.getContent(),
      alerts: simulatorRef.current.getAlerts(),
    });
    
    // Cleanup
    return () => {
      simulatorRef.current?.stop();
    };
  }, [scenarioMode, updateData]);
  
  return {
    isActive: !scenarioMode,
  };
};

