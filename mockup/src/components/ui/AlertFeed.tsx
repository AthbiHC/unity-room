import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { useScenario } from '../../hooks/useScenario';

export const AlertFeed = () => {
  const showAlerts = useAppStore((state) => state.showAlerts);
  const alerts = useAppStore((state) => state.alerts);
  const toggleAlerts = useAppStore((state) => state.toggleAlerts);
  const scenarioMode = useAppStore((state) => state.scenarioMode);
  const { activeInsights } = useScenario();
  
  // Use scenario insights in scenario mode, regular alerts otherwise
  const displayItems = scenarioMode ? activeInsights.map(insight => ({
    id: insight.id,
    timestamp: new Date(),
    title: insight.title,
    description: insight.description,
    type: insight.type,
    platforms: insight.platforms,
  })) : alerts;
  
  if (!showAlerts) {
    return (
      <button
        onClick={toggleAlerts}
        className="fixed top-1/2 right-0 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 border-l-0 border border-blue-500/50 rounded-l-lg px-2 py-4 text-blue-300 text-sm transition-colors"
      >
        <div className="flex items-center space-x-1">
          <span className="rotate-180">▶</span>
          <span className="writing-mode-vertical">Alerts ({displayItems.length})</span>
        </div>
      </button>
    );
  }
  
  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      className="fixed right-4 top-32 bottom-20 w-96 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-gray-300 font-medium flex items-center space-x-2">
          <span>🔔</span>
          <span>{scenarioMode ? 'Intelligence Insights' : 'Live Alerts'}</span>
        </h3>
        <button
          onClick={toggleAlerts}
          className="text-gray-500 hover:text-gray-300 transition-colors"
        >
          ✕
        </button>
      </div>
      
      {/* Alerts list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {displayItems.map((alert, index) => (
            <AlertCard key={alert.id} alert={alert} index={index} />
          ))}
        </AnimatePresence>
        
        {displayItems.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">📭</div>
            <div className="text-sm">No alerts at the moment</div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AlertCard = ({ alert, index }: { alert: any; index: number }) => {
  const typeColors = {
    critical: 'border-red-500/50 bg-red-500/10',
    warning: 'border-yellow-500/50 bg-yellow-500/10',
    info: 'border-blue-500/50 bg-blue-500/10',
    success: 'border-green-500/50 bg-green-500/10',
    validation: 'border-green-500/50 bg-green-500/10',
    gap: 'border-yellow-500/50 bg-yellow-500/10',
    correlation: 'border-blue-500/50 bg-blue-500/10',
  };
  
  const typeIcons = {
    critical: '🚨',
    warning: '⚠️',
    info: 'ℹ️',
    success: '✅',
    validation: '✅',
    gap: '⚠️',
    correlation: '🔗',
  };
  
  const colorClass = typeColors[alert.type as keyof typeof typeColors] || typeColors.info;
  const icon = typeIcons[alert.type as keyof typeof typeIcons] || 'ℹ️';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
      className={`${colorClass} border rounded-lg p-3 cursor-pointer hover:bg-opacity-20 transition-all`}
    >
      <div className="flex items-start space-x-2">
        <span className="text-xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-medium mb-1">{alert.title}</h4>
          <p className="text-gray-300 text-xs leading-relaxed mb-2">{alert.description}</p>
          
          {alert.platforms && alert.platforms.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {alert.platforms.map((platformId: string) => (
                <span
                  key={platformId}
                  className="text-xs px-2 py-0.5 bg-gray-700/50 rounded text-gray-400"
                >
                  {platformId}
                </span>
              ))}
            </div>
          )}
          
          <div className="text-xs text-gray-500 mt-2">
            {new Date(alert.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

