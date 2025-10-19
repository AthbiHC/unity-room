import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { platforms } from '../../data/kuwaitData';

export const PlatformDetails = () => {
  const selectedPlatform = useAppStore((state) => state.selectedPlatform);
  const selectPlatform = useAppStore((state) => state.selectPlatform);
  const metrics = useAppStore((state) => state.metrics);
  const content = useAppStore((state) => state.content);
  
  const platform = platforms.find(p => p.id === selectedPlatform);
  const metric = selectedPlatform ? metrics[selectedPlatform] : null;
  const platformContent = content.filter(c => c.platformId === selectedPlatform).slice(0, 10);
  
  if (!platform) return null;
  
  return (
    <AnimatePresence>
      {selectedPlatform && (
        <motion.div
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          exit={{ x: -400 }}
          className="fixed left-4 top-32 bottom-20 w-96 bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-700" style={{ borderColor: platform.color + '40' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-3xl">{platform.icon}</span>
                <div>
                  <h3 className="text-white font-bold">{platform.name}</h3>
                  <p className="text-gray-400 text-sm">{platform.nameArabic}</p>
                </div>
              </div>
              <button
                onClick={() => selectPlatform(null)}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Platform info */}
            <div className="flex items-center space-x-4 text-sm">
              <span className={`px-2 py-1 rounded text-xs font-medium`} style={{ 
                backgroundColor: platform.color + '30',
                color: platform.color 
              }}>
                {platform.layer.toUpperCase()}
              </span>
              <span className="text-gray-400">Tier {platform.tier}</span>
              <span className="text-green-400">${platform.cost}/mo</span>
            </div>
          </div>
          
          {/* Metrics */}
          {metric && (
            <div className="p-4 border-b border-gray-700 grid grid-cols-2 gap-3">
              <MetricCard label="Volume" value={`${metric.volume.toFixed(1)}/min`} />
              <MetricCard label="Accuracy" value={`${(metric.accuracy * 100).toFixed(1)}%`} />
              <MetricCard 
                label="Sentiment" 
                value={metric.sentiment > 0 ? `+${(metric.sentiment * 100).toFixed(0)}%` : `${(metric.sentiment * 100).toFixed(0)}%`} 
              />
              <MetricCard label="Latency" value={`${metric.latency.toFixed(0)}ms`} />
              <MetricCard 
                label="Status" 
                value={metric.activeNow ? 'Active' : 'Inactive'}
                valueColor={metric.activeNow ? 'text-green-400' : 'text-gray-500'}
              />
              <MetricCard label="Uptime" value={`${(metric.uptime * 100).toFixed(2)}%`} />
            </div>
          )}
          
          {/* Recent content */}
          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="text-gray-300 font-medium mb-3 flex items-center space-x-2">
              <span>📋</span>
              <span>Recent Content</span>
            </h4>
            
            <div className="space-y-2">
              {platformContent.map((item) => (
                <ContentItem key={item.id} item={item} />
              ))}
              
              {platformContent.length === 0 && (
                <div className="text-center text-gray-500 py-4 text-sm">
                  No recent content
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MetricCard = ({ label, value, valueColor = 'text-white' }: { label: string; value: string; valueColor?: string }) => {
  return (
    <div className="bg-gray-800/50 rounded p-2">
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`text-sm font-medium ${valueColor}`}>{value}</div>
    </div>
  );
};

const ContentItem = ({ item }: { item: any }) => {
  const typeColors: Record<string, string> = {
    news: 'border-yellow-500/30',
    social: 'border-blue-500/30',
    official: 'border-green-500/30',
    financial: 'border-orange-500/30',
  };
  
  const sentimentColor = item.sentiment > 0.3 ? 'text-green-400' : item.sentiment < -0.3 ? 'text-red-400' : 'text-gray-400';
  
  return (
    <div className={`border ${typeColors[item.type] || 'border-gray-500/30'} rounded p-2 hover:bg-gray-800/30 transition-colors`}>
      <div className="flex items-start justify-between mb-1">
        <p className="text-white text-xs font-medium leading-tight flex-1">
          {item.title}
        </p>
        {item.urgent && (
          <span className="text-red-400 text-xs ml-2">🔥</span>
        )}
      </div>
      
      {item.titleArabic && (
        <p className="text-gray-400 text-xs mb-1 leading-tight">
          {item.titleArabic}
        </p>
      )}
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">{item.source}</span>
        <span className={`${sentimentColor}`}>
          {item.sentiment > 0 ? '↗' : item.sentiment < 0 ? '↘' : '→'} {(item.sentiment * 100).toFixed(0)}%
        </span>
      </div>
      
      <div className="text-xs text-gray-600 mt-1">
        {new Date(item.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

