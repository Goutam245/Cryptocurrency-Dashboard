import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Settings, Maximize2 } from 'lucide-react';
import { useWebSocketPrice } from '@/hooks/useWebSocketPrice';

const InstitutionalChart = () => {
  const [selectedPair, setSelectedPair] = useState('BTCUSDT');
  const [timeframe, setTimeframe] = useState('1');
  const { data, isConnected, latency } = useWebSocketPrice(selectedPair);

  const tradingPairs = [
    { symbol: 'BTCUSDT', name: 'BTC/USDT' },
    { symbol: 'ETHUSDT', name: 'ETH/USDT' },
    { symbol: 'BNBUSDT', name: 'BNB/USDT' },
    { symbol: 'ADAUSDT', name: 'ADA/USDT' },
  ];

  const timeframes = ['1', '5', '15', '60', '240', 'D', 'W'];

  const handleExportPDF = () => {
    console.log('Exporting compliance report...');
  };

  const tvUrl = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${selectedPair}&symbol=BINANCE%3A${selectedPair}&interval=${timeframe}&hidesidetoolbar=0&symboledit=1&saveimage=0&toolbarbg=%23141413&studies=%5B%22BB%40tv-basicstudies%22%2C%22MACD%40tv-basicstudies%22%2C%22RSI%40tv-basicstudies%22%2C%22MASimple%40tv-basicstudies%22%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en`;

  return (
    <div className="glass-card p-6 rounded-lg animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">Professional Charts</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-400'}`} />
            <span className="text-xs text-muted-foreground">
              {latency}ms latency
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" /> Settings
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="w-4 h-4 mr-2" /> Fullscreen
          </Button>
        </div>
      </div>

      {/* Pair + Timeframe */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          {tradingPairs.map((pair) => (
            <Button
              key={pair.symbol}
              onClick={() => setSelectedPair(pair.symbol)}
              size="sm"
              variant={selectedPair === pair.symbol ? 'default' : 'outline'}
            >
              {pair.name}
            </Button>
          ))}
        </div>
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              onClick={() => setTimeframe(tf)}
              size="sm"
              variant={timeframe === tf ? 'default' : 'outline'}
            >
              {tf === 'D' ? '1D' : tf === 'W' ? '1W' : `${tf}m`}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Info */}
      {data && (
        <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-secondary/20 p-3 rounded-lg">
          <div><span className="text-muted-foreground">Current:</span><p className="font-bold text-lg">${data.price}</p></div>
          <div><span className="text-muted-foreground">24h High:</span><p className="font-semibold">${data.high}</p></div>
          <div><span className="text-muted-foreground">24h Low:</span><p className="font-semibold">${data.low}</p></div>
          <div><span className="text-muted-foreground">Volume:</span><p className="font-semibold">{(data.volume / 1e6).toFixed(1)}M</p></div>
        </div>
      )}

      {/* Chart Embed */}
      <div className="w-full h-[500px] rounded-lg overflow-hidden border border-border">
        <iframe
          title="TradingView Chart"
          src={tvUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-muted-foreground flex justify-between">
        <div className="flex space-x-4">
          <span>SOC 2 Type II Compliant</span>
          <span>•</span>
          <span>MiCA Regulation Ready</span>
          <span>•</span>
          <span>Real-time WebSocket Feed</span>
        </div>
        <div>Last updated: {new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default InstitutionalChart;
