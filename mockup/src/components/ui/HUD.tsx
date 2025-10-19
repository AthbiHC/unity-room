import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { platforms } from '../../data/kuwaitData';
import { generateSystemStats } from '../../data/mockDataGenerator';
import { useScenario } from '../../hooks/useScenario';

export const HUD = () => {
  const metrics = useAppStore((state) => state.metrics);
  const mode = useAppStore((state) => state.mode);
  const scenarioMode = useAppStore((state) => state.scenarioMode);
  const setScenarioMode = useAppStore((state) => state.setScenarioMode);
  
  const stats = Object.keys(metrics).length > 0 ? generateSystemStats(metrics) : null;
  const { formatTime, currentTime } = useScenario();
  
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              جهينة Juhainah
            </h1>
            <span className="text-gray-400 text-sm">Intelligence Platform</span>
          </div>
          
          {/* Mode indicator */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              {mode === 'network' && '🌐 Network Graph'}
              {mode === 'control-room' && '🎮 Control Room'}
              {mode === 'command' && '⌘ Command Dashboard'}
            </span>
            
            {scenarioMode && (
              <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/50">
                <span className="text-yellow-400 text-sm font-medium">SCENARIO MODE</span>
                <span className="text-yellow-300 text-xs">{formatTime(currentTime)}</span>
              </div>
            )}
            
            <button
              onClick={() => setScenarioMode(!scenarioMode)}
              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-300 text-sm transition-colors"
            >
              {scenarioMode ? 'Exit Scenario' : 'Play Scenario'}
            </button>
          </div>
        </div>
      </div>
      
      {/* System stats */}
      {stats && (
        <div className="absolute top-20 left-4 space-y-2">
          <StatusCard
            label="Platforms Active"
            value={`${stats.activePlatforms}/${stats.totalPlatforms}`}
            color="blue"
          />
          <StatusCard
            label="Monthly Cost"
            value={`$${stats.totalCost.toLocaleString()}`}
            color="green"
          />
          <StatusCard
            label="Daily Volume"
            value={`${stats.totalVolume.toLocaleString()} items`}
            color="purple"
          />
          <StatusCard
            label="Avg Accuracy"
            value={`${(stats.avgAccuracy * 100).toFixed(1)}%`}
            color="blue"
          />
        </div>
      )}
      
      {/* Platform health indicators */}
      <div className="absolute top-20 right-4">
        <div className="bg-black/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
          <h3 className="text-gray-300 text-sm font-medium mb-3">Platform Status</h3>
          <div className="space-y-2">
            {platforms.map((platform) => {
              const metric = metrics[platform.id];
              const isActive = metric?.activeNow;
              
              return (
                <div key={platform.id} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
                  <span className="text-xs text-gray-300">{platform.icon} {platform.name}</span>
                  {metric && (
                    <span className="text-xs text-gray-500 ml-auto">
                      {metric.volume.toFixed(0)}/min
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Layer breakdown */}
      {stats && (
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-gray-300 text-sm font-medium mb-3">Layer Distribution</h3>
            <div className="space-y-2">
              <LayerBar label="Truth" count={stats.layerBreakdown.truth.platforms} color="green" />
              <LayerBar label="Speed" count={stats.layerBreakdown.speed.platforms} color="blue" />
              <LayerBar label="Depth" count={stats.layerBreakdown.depth.platforms} color="purple" />
            </div>
          </div>
        </div>
      )}
      
      {/* Controls hint */}
      <div className="absolute bottom-4 right-4 text-right space-y-1 text-xs text-gray-500">
        <div>🖱️ Drag to rotate • Scroll to zoom</div>
        <div>Click platforms for details</div>
        <div>Press 1, 2, 3 to switch modes</div>
      </div>
    </div>
  );
};

const StatusCard = ({ label, value, color }: { label: string; value: string; color: string }) => {
  const colorClasses = {
    blue: 'border-blue-500/50 bg-blue-500/10 text-blue-300',
    green: 'border-green-500/50 bg-green-500/10 text-green-300',
    purple: 'border-purple-500/50 bg-purple-500/10 text-purple-300',
  }[color];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`${colorClasses} backdrop-blur-sm border rounded-lg px-4 py-2 min-w-[180px]`}
    >
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </motion.div>
  );
};

const LayerBar = ({ label, count, color }: { label: string; count: number; color: string }) => {
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  }[color];
  
  const percentage = (count / 8) * 100;
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs text-gray-400 w-12">{label}</span>
      <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className={`${colorClasses} h-full`}
        />
      </div>
      <span className="text-xs text-gray-400 w-4">{count}</span>
    </div>
  );
};

