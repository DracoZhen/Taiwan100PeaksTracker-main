
import React, { useState, useEffect, useMemo } from 'react';
import { TAIWAN_PEAKS } from './data/peaks';
import { Peak } from './types';
import Stats from './components/Stats';
import PeakMap from './components/PeakMap';

const App: React.FC = () => {
  const [climbedIds, setClimbedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRange, setFilterRange] = useState('All');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('climbed_peaks');
    if (saved) {
      setClimbedIds(JSON.parse(saved));
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('climbed_peaks', JSON.stringify(climbedIds));
  }, [climbedIds]);

  const toggleClimb = (id: string) => {
    setClimbedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const mountainRanges = useMemo(() => {
    const ranges = new Set(TAIWAN_PEAKS.map(p => p.mountainRange));
    return ['All', ...Array.from(ranges)];
  }, []);

  const filteredPeaks = useMemo(() => {
    return TAIWAN_PEAKS.filter(p => {
      const matchesSearch = p.name.includes(searchTerm) || p.location.includes(searchTerm);
      const matchesRange = filterRange === 'All' || p.mountainRange === filterRange;
      return matchesSearch && matchesRange;
    }).sort((a, b) => a.rank - b.rank);
  }, [searchTerm, filterRange]);

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Header - 精簡導航欄 */}
      <header className="bg-emerald-800 text-white py-4 px-6 shadow-md flex items-center justify-between z-30 h-16 shrink-0">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-mountain-summit text-xl text-yellow-400"></i>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-tight">台灣百岳紀錄</h1>
            <p className="text-[9px] text-emerald-200 opacity-80 uppercase font-bold tracking-widest leading-none">Taiwan 100 Peaks Tracker</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-[9px] text-emerald-200 font-bold leading-none">成就等級</p>
            <p className="text-xs font-bold leading-tight">
              {climbedIds.length >= 100 ? '百岳戰神' : climbedIds.length >= 50 ? '登山大師' : climbedIds.length >= 10 ? '山岳獵人' : '初出茅廬'}
            </p>
          </div>
          <div className="w-7 h-7 bg-yellow-400 rounded-lg flex items-center justify-center text-emerald-900 shadow-lg shadow-yellow-400/20">
            <i className="fa-solid fa-medal text-xs"></i>
          </div>
        </div>
      </header>

      {/* Main Content Area - 固定高度以啟用內部滾動 */}
      <main className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        
        {/* 左側：統計與搜尋 (加大後的 Stats 將呈現於此) */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1">
          <Stats allPeaks={TAIWAN_PEAKS} climbedIds={climbedIds} />
          
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-xs font-black text-slate-700 flex items-center gap-2 uppercase tracking-widest">
              <i className="fa-solid fa-filter text-emerald-600"></i> 快速搜尋
            </h3>
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input 
                type="text" 
                placeholder="搜尋山名或地點..." 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none cursor-pointer transition-all"
              value={filterRange}
              onChange={(e) => setFilterRange(e.target.value)}
            >
              {mountainRanges.map(range => (
                <option key={range} value={range}>{range === 'All' ? '所有山系' : range}</option>
              ))}
            </select>
          </div>

          <div className="bg-emerald-50/50 p-6 rounded-[2.5rem] border border-emerald-100/50">
             <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-3 flex items-center gap-2">
               <i className="fa-solid fa-lightbulb"></i> 登山小叮嚀
             </h4>
             <p className="text-xs text-emerald-700 font-bold leading-relaxed">
               百岳之美在於過程。登頂前請確保體能狀況與裝備齊全，並落實 LNT 無痕山林準則。
             </p>
          </div>
        </div>

        {/* 中間：互動式大型地圖 */}
        <div className="lg:col-span-6 flex flex-col h-full min-h-[300px]">
          <PeakMap peaks={TAIWAN_PEAKS} climbedIds={climbedIds} />
        </div>

        {/* 右側：精簡版百岳清單 */}
        <div className="lg:col-span-3 flex flex-col h-full overflow-hidden bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <h3 className="text-xs font-black text-slate-700 flex items-center gap-2 uppercase tracking-widest">
              <i className="fa-solid fa-list-check text-emerald-600"></i> 清單瀏覽
            </h3>
            <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
              {filteredPeaks.length} 座
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2 bg-slate-50/30">
            {filteredPeaks.map((peak) => {
              const isClimbed = climbedIds.includes(peak.id);
              return (
                <div 
                  key={peak.id}
                  onClick={() => toggleClimb(peak.id)}
                  className={`cursor-pointer group relative p-3 rounded-2xl border transition-all duration-150 flex items-center gap-3 ${isClimbed ? 'border-emerald-500 bg-white shadow-md ring-1 ring-emerald-500/10' : 'border-white hover:border-slate-200 bg-white'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isClimbed ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-100 text-slate-400'}`}>
                    {isClimbed ? <i className="fa-solid fa-check text-xs"></i> : <span className="text-[10px] font-black">#{peak.rank}</span>}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-black truncate ${isClimbed ? 'text-slate-800' : 'text-slate-600'}`}>{peak.name}</h4>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{peak.height}m</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter ${isClimbed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                        {peak.difficulty}級
                      </span>
                      {peak.notes && (
                        <span className="text-[9px] font-bold text-slate-400 truncate opacity-60">
                          {peak.notes}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredPeaks.length === 0 && (
              <div className="text-center py-10">
                <p className="text-xs text-slate-400 font-bold">未找到符合條件的山岳</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 底部進度條 */}
      <footer className="bg-slate-900 text-white px-8 py-2 flex items-center justify-between z-30 shrink-0 h-14 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-6">
          <div className="flex items-baseline gap-1">
            <span className="text-emerald-400 font-black text-xl">{climbedIds.length}</span>
            <span className="text-white/30 text-[10px] font-bold">/ 100</span>
          </div>
          <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
            <div 
              className="h-full bg-emerald-500 transition-all duration-700 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              style={{ width: `${(climbedIds.length / TAIWAN_PEAKS.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mr-2">Level Up Progress</span>
          {[...Array(5)].map((_, i) => (
             <i key={i} className={`fa-solid fa-star text-xs ${i < Math.floor(climbedIds.length / 20) ? 'text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]' : 'text-white/10'}`}></i>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default App;
