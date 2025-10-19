import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { useScenario } from '../../hooks/useScenario';
import { useState, useEffect } from 'react';

export const ContentStream = () => {
  const content = useAppStore((state) => state.content);
  const scenarioMode = useAppStore((state) => state.scenarioMode);
  const { activeEvents } = useScenario();
  const [streamItems, setStreamItems] = useState<any[]>([]);
  
  // Merge regular content with scenario events
  useEffect(() => {
    if (scenarioMode) {
      const events = activeEvents.map(e => ({
        ...e,
        isScenario: true,
        type: 'event',
      }));
      setStreamItems([...events, ...content.slice(0, 5)]);
    } else {
      setStreamItems(content.slice(0, 10));
    }
  }, [content, scenarioMode, activeEvents]);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/98 to-transparent p-4 pb-6 pointer-events-none z-40">
      <div className="max-w-full px-4">
        <div className="flex items-center justify-between mb-3 pointer-events-auto">
          <h3 className="text-white text-base font-bold flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-lg">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span>LIVE INTELLIGENCE STREAM</span>
          </h3>
          <div className="text-sm text-gray-300 bg-gray-800/80 px-3 py-2 rounded-lg">
            {streamItems.length} active items
          </div>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          <AnimatePresence mode="popLayout">
            {streamItems.slice(0, 8).map((item, index) => (
              <StreamItem key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const StreamItem = ({ item, index }: { item: any; index: number }) => {
  // Determine item type
  const isBreaking = item.urgent || item.impact === 'critical';
  const isScenario = item.isScenario;
  const isTv = item.platformId === 'tv';
  const isSpeech = isTv || item.platformId === 'radio' || item.platformId === 'podcasts';
  
  // Platform icons
  const platformIcons: Record<string, string> = {
    tv: '📺',
    government: '🏛️',
    stock: '📈',
    twitter: '📱',
    'digital-news': '📰',
    podcasts: '🎙️',
    radio: '📻',
    print: '📄',
  };
  
  // Generate mock screenshot for TV content
  const tvScreenshot = isTv ? generateTVScreenshot(item) : null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      className={`
        flex-shrink-0 w-96 rounded-xl overflow-hidden pointer-events-auto cursor-pointer
        ${isBreaking ? 'ring-4 ring-red-500 shadow-2xl shadow-red-500/50' : ''}
        ${isScenario ? 'ring-4 ring-yellow-500 shadow-2xl shadow-yellow-500/50' : ''}
        backdrop-blur-lg bg-gradient-to-br from-gray-900 to-black border-2 border-gray-600
        hover:border-blue-500 transition-all hover:scale-105 hover:shadow-2xl
      `}
    >
      {/* Breaking/Scenario badge */}
      {(isBreaking || isScenario) && (
        <div className={`px-3 py-1 text-xs font-bold ${isBreaking ? 'bg-red-500' : 'bg-yellow-500'} text-white`}>
          {isBreaking && '🔴 BREAKING NEWS'}
          {isScenario && '⭐ SCENARIO EVENT'}
        </div>
      )}
      
      {/* TV Screenshot */}
      {tvScreenshot && (
        <div className="relative h-48 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
          {/* Scanlines effect */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-transparent via-white to-transparent animate-scan"></div>
          
          {/* Main content */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="text-6xl mb-3 animate-pulse">{platformIcons[item.platformId]}</div>
              <div className="text-white text-lg font-bold mb-2 drop-shadow-lg">{item.source}</div>
              <div className="bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full inline-flex items-center space-x-2">
                <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                <span>BROADCASTING LIVE</span>
              </div>
            </div>
          </div>
          
          {/* Bottom chyron/ticker */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-3">
            <div className="text-white text-sm font-bold line-clamp-2 drop-shadow-lg">
              🔴 {item.title}
            </div>
          </div>
          
          {/* Top corner LIVE badge */}
          <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-black px-3 py-1.5 rounded shadow-lg flex items-center space-x-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span>LIVE</span>
          </div>
          
          {/* Time stamp */}
          <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {new Date(item.timestamp).toLocaleTimeString()}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="p-3">
        <div className="flex items-start space-x-2 mb-2">
          <span className="text-xl flex-shrink-0">{platformIcons[item.platformId]}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">{item.source}</span>
              <span className="text-xs text-gray-500">
                {item.time || new Date(item.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <h4 className="text-white text-sm font-medium leading-tight line-clamp-2 mb-1">
              {item.title}
            </h4>
            {item.titleArabic && (
              <p className="text-gray-400 text-xs leading-tight line-clamp-1 mb-2">
                {item.titleArabic}
              </p>
            )}
            
            {/* Speech-to-text segment */}
            {isSpeech && item.description && (
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-3 mb-2 border-l-4 border-blue-400">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-blue-300 font-bold">💬 TRANSCRIPT</span>
                  <span className="text-xs text-gray-400">Speech-to-Text</span>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed line-clamp-3 italic">
                  <span className="text-blue-400 text-lg">"</span>{item.description}<span className="text-blue-400 text-lg">"</span>
                </p>
              </div>
            )}
            
            {/* Stock market data */}
            {item.platformId === 'stock' && item.data?.topMovers && (
              <div className="space-y-1 mb-2">
                {item.data.topMovers.slice(0, 3).map((mover: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{mover.ticker}</span>
                    <span className={mover.change > 0 ? 'text-green-400' : 'text-red-400'}>
                      {mover.change > 0 ? '↗' : '↘'} {mover.change.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Twitter metrics */}
            {item.platformId === 'twitter' && item.data && (
              <div className="flex items-center space-x-3 text-xs text-gray-400 mb-2">
                {item.data.totalTweets && (
                  <span>📊 {item.data.totalTweets.toLocaleString()} tweets</span>
                )}
                {item.data.positiveSentiment && (
                  <span>
                    {item.data.positiveSentiment > 0.7 ? '😊' : item.data.positiveSentiment > 0.4 ? '😐' : '😟'} 
                    {' '}{(item.data.positiveSentiment * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            )}
            
            {/* Sentiment indicator */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {item.sentiment !== undefined && (
                  <div className="flex items-center space-x-1">
                    <span className={`text-xs ${
                      item.sentiment > 0.3 ? 'text-green-400' : 
                      item.sentiment < -0.3 ? 'text-red-400' : 
                      'text-gray-400'
                    }`}>
                      {item.sentiment > 0.3 ? '😊' : item.sentiment < -0.3 ? '😟' : '😐'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {(item.sentiment * 100).toFixed(0)}% {item.sentiment > 0 ? 'positive' : 'negative'}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Impact badge */}
              {item.impact && (
                <span className={`text-xs px-2 py-0.5 rounded ${
                  item.impact === 'critical' ? 'bg-red-500/20 text-red-400' :
                  item.impact === 'high' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.impact}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Generate mock TV screenshot data
const generateTVScreenshot = (item: any) => {
  return {
    channel: item.source,
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    chyron: item.title,
  };
};

