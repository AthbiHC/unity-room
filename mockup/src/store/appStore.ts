import { create } from 'zustand';
import type { PlatformMetrics, ContentItem, Alert } from '../data/mockDataGenerator';

export type VisualizationMode = 'network' | 'control-room' | 'command';

interface AppState {
  // Visualization mode
  mode: VisualizationMode;
  setMode: (mode: VisualizationMode) => void;
  
  // Selected platform
  selectedPlatform: string | null;
  selectPlatform: (platformId: string | null) => void;
  
  // Scenario playback
  scenarioMode: boolean;
  scenarioTime: number; // minutes from start
  scenarioPlaying: boolean;
  scenarioSpeed: number; // playback speed multiplier
  setScenarioMode: (enabled: boolean) => void;
  setScenarioTime: (time: number) => void;
  setScenarioPlaying: (playing: boolean) => void;
  setScenarioSpeed: (speed: number) => void;
  
  // Real-time data
  metrics: Record<string, PlatformMetrics>;
  content: ContentItem[];
  alerts: Alert[];
  updateData: (data: { metrics: Record<string, PlatformMetrics>; content: ContentItem[]; alerts: Alert[] }) => void;
  
  // UI state
  showDetails: boolean;
  showAlerts: boolean;
  showTimeline: boolean;
  toggleDetails: () => void;
  toggleAlerts: () => void;
  toggleTimeline: () => void;
  
  // Camera state (for smooth transitions)
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  setCameraPosition: (pos: [number, number, number]) => void;
  setCameraTarget: (target: [number, number, number]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Visualization mode
  mode: 'network',
  setMode: (mode) => set({ mode }),
  
  // Selected platform
  selectedPlatform: null,
  selectPlatform: (platformId) => set({ selectedPlatform: platformId, showDetails: !!platformId }),
  
  // Scenario playback
  scenarioMode: false,
  scenarioTime: 0,
  scenarioPlaying: false,
  scenarioSpeed: 1,
  setScenarioMode: (enabled) => set({ scenarioMode: enabled, scenarioTime: 0, scenarioPlaying: enabled }),
  setScenarioTime: (time) => set({ scenarioTime: time }),
  setScenarioPlaying: (playing) => set({ scenarioPlaying: playing }),
  setScenarioSpeed: (speed) => set({ scenarioSpeed: speed }),
  
  // Real-time data
  metrics: {},
  content: [],
  alerts: [],
  updateData: (data) => set({ metrics: data.metrics, content: data.content, alerts: data.alerts }),
  
  // UI state
  showDetails: false,
  showAlerts: true,
  showTimeline: false,
  toggleDetails: () => set((state) => ({ showDetails: !state.showDetails })),
  toggleAlerts: () => set((state) => ({ showAlerts: !state.showAlerts })),
  toggleTimeline: () => set((state) => ({ showTimeline: !state.showTimeline })),
  
  // Camera state
  cameraPosition: [0, 5, 15],
  cameraTarget: [0, 0, 0],
  setCameraPosition: (pos) => set({ cameraPosition: pos }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
}));

