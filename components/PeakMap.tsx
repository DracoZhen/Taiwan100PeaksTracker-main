
import React, { useEffect, useRef } from 'react';
import { Peak } from '../types';

interface PeakMapProps {
  peaks: Peak[];
  climbedIds: string[];
}

const PeakMap: React.FC<PeakMapProps> = ({ peaks, climbedIds }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // 初始化地圖
    mapInstanceRef.current = L.map(mapContainerRef.current, {
        center: [23.7, 120.95],
        zoom: 8,
        zoomControl: false, // 自定義放置或隱藏以保持整潔
        scrollWheelZoom: true
    });

    // 加入縮放控制到右下角
    L.control.zoom({ position: 'bottomright' }).addTo(mapInstanceRef.current);

    // 使用 Esri Terrain 地形圖資
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri'
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapInstanceRef.current) return;

    // 清除舊標記
    markersRef.current.forEach(m => m.remove());
    markersRef.current.clear();

    // 重新繪製標記
    peaks.forEach(peak => {
      const isClimbed = climbedIds.includes(peak.id);
      
      const marker = L.circleMarker([peak.lat, peak.lng], {
        radius: isClimbed ? 6 : 4,
        fillColor: isClimbed ? '#10b981' : '#94a3b8',
        color: isClimbed ? '#ffffff' : '#cbd5e1',
        weight: 1.5,
        opacity: 1,
        fillOpacity: isClimbed ? 0.9 : 0.6,
        className: isClimbed ? 'active-marker' : ''
      }).addTo(mapInstanceRef.current);

      marker.bindPopup(`
        <div class="font-sans p-1 min-w-[140px]">
          <div class="flex items-center gap-2 mb-1 border-b border-slate-100 pb-1">
            <span class="text-[9px] font-black bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">#${peak.rank}</span>
            <strong class="text-slate-800 text-sm font-black">${peak.name}</strong>
          </div>
          <div class="grid grid-cols-2 gap-1 my-1.5 text-[10px]">
            <div><span class="text-slate-400">海拔:</span> <span class="font-bold">${peak.height}m</span></div>
            <div><span class="text-slate-400">難度:</span> <span class="font-bold">${peak.difficulty}</span></div>
          </div>
          <div class="mt-2 text-[10px] flex items-center justify-center p-1 rounded-lg ${isClimbed ? 'bg-emerald-50 text-emerald-600 font-bold' : 'bg-slate-50 text-slate-400'}">
            ${isClimbed ? '✅ 已完登' : '尚未登頂'}
          </div>
        </div>
      `, { closeButton: false, offset: [0, -5] });

      markersRef.current.set(peak.id, marker);
    });
  }, [peaks, climbedIds]);

  return (
    <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-black text-slate-700 flex items-center gap-2">
            <i className="fa-solid fa-map-location-dot text-emerald-600"></i>
            台灣地形分佈
        </h3>
        <div className="flex gap-2.5 text-[9px] font-bold">
            <div className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span>已登</div>
            <div className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-300 rounded-full"></span>待戰</div>
        </div>
      </div>
      
      <div className="flex-1 rounded-2xl overflow-hidden border border-slate-100 relative group">
        <div ref={mapContainerRef} className="w-full h-full z-0" />
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-slate-200 text-[9px] font-bold text-slate-500 shadow-sm">
            地形瀏覽模式
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeakMap;
