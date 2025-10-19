import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { useScenario } from '../../hooks/useScenario';
import { useEffect, useState } from 'react';

export const BreakingNews = () => {
  const content = useAppStore((state) => state.content);
  const alerts = useAppStore((state) => state.alerts);
  const scenarioMode = useAppStore((state) => state.scenarioMode);
  const { activeEvents, activeInsights } = useScenario();
  const [currentBreaking, setCurrentBreaking] = useState<any>(null);
  
  useEffect(() => {
    // Priority: Scenario events > Critical alerts > Urgent content
    let breakingItem = null;
    
    if (scenarioMode && activeEvents.length > 0) {
      const latestEvent = activeEvents[activeEvents.length - 1];
      if (latestEvent.impact === 'critical' || latestEvent.impact === 'high') {
        breakingItem = {
          ...latestEvent,
          type: 'scenario',
        };
      }
    } else {
      // Check for critical alerts
      const criticalAlert = alerts.find(a => a.type === 'critical');
      if (criticalAlert) {
        breakingItem = {
          ...criticalAlert,
          type: 'alert',
        };
      } else {
        // Check for urgent content
        const urgentContent = content.find(c => c.urgent);
        if (urgentContent) {
          breakingItem = {
            ...urgentContent,
            type: 'content',
          };
        }
      }
    }
    
    setCurrentBreaking(breakingItem);
  }, [content, alerts, scenarioMode, activeEvents, activeInsights]);
  
  if (!currentBreaking) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-4xl w-full px-4"
      >
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-2xl overflow-hidden border-2 border-red-400">
          {/* Animated border */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          
          <div className="relative p-4">
            <div className="flex items-start space-x-4">
              {/* Breaking badge */}
              <div className="flex-shrink-0">
                <div className="bg-white text-red-600 font-black text-lg px-4 py-2 rounded shadow-lg animate-pulse">
                  🔴 BREAKING
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-red-200 text-sm font-medium">
                    {currentBreaking.time || new Date(currentBreaking.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="text-red-200 text-sm">•</span>
                  <span className="text-red-200 text-sm">
                    {currentBreaking.source || currentBreaking.platforms?.[0] || 'Multiple Sources'}
                  </span>
                </div>
                
                <h2 className="text-white text-xl font-bold leading-tight mb-2">
                  {currentBreaking.title}
                </h2>
                
                {currentBreaking.titleArabic && (
                  <p className="text-red-100 text-lg leading-tight mb-2">
                    {currentBreaking.titleArabic}
                  </p>
                )}
                
                {currentBreaking.description && (
                  <p className="text-red-100 text-sm leading-relaxed">
                    {currentBreaking.description}
                  </p>
                )}
                
                {/* Metrics for scenario events */}
                {currentBreaking.data && (
                  <div className="mt-3 flex flex-wrap gap-3">
                    {currentBreaking.data.sectorGain && (
                      <div className="bg-white/20 rounded px-3 py-1">
                        <span className="text-red-100 text-xs">Market Impact: </span>
                        <span className="text-white text-sm font-bold">+{currentBreaking.data.sectorGain}%</span>
                      </div>
                    )}
                    {currentBreaking.data.marketCapAdded && (
                      <div className="bg-white/20 rounded px-3 py-1">
                        <span className="text-red-100 text-xs">Market Cap: </span>
                        <span className="text-white text-sm font-bold">${currentBreaking.data.marketCapAdded / 1000000}M</span>
                      </div>
                    )}
                    {currentBreaking.data.totalTweets && (
                      <div className="bg-white/20 rounded px-3 py-1">
                        <span className="text-red-100 text-xs">Volume: </span>
                        <span className="text-white text-sm font-bold">{currentBreaking.data.totalTweets.toLocaleString()} tweets</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Close button */}
              <button
                onClick={() => setCurrentBreaking(null)}
                className="flex-shrink-0 text-white hover:text-red-200 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          
          {/* Animated bottom bar */}
          <div className="h-1 bg-white/30 overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 10, ease: 'linear' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

