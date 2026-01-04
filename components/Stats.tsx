
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Peak } from '../types';

interface StatsProps {
  allPeaks: Peak[];
  climbedIds: string[];
}

const Stats: React.FC<StatsProps> = ({ allPeaks, climbedIds }) => {
  const climbedCount = climbedIds.length;
  const totalCount = allPeaks.length;
  const remainingCount = totalCount - climbedCount;
  const percentage = Math.round((climbedCount / totalCount) * 100);

  const data = [
    { name: '已完成', value: climbedCount, color: '#10b981' },
    { name: '未完成', value: remainingCount, color: '#f1f5f9' }
  ];

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col items-center text-center">
      <div className="w-full flex items-center justify-between mb-6">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
          完登進度
        </h3>
        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg">KPI DASHBOARD</span>
      </div>

      <div className="relative w-full h-48 mb-6 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 'bold' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-slate-800 tracking-tighter">{percentage}%</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completion</span>
        </div>
      </div>
      
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">已登頂</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-2xl font-black text-emerald-600">{climbedCount}</span>
            <span className="text-xs font-bold text-slate-400">座</span>
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">剩餘</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-2xl font-black text-slate-700">{remainingCount}</span>
            <span className="text-xs font-bold text-slate-400">座</span>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full py-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20">
        <p className="text-xs font-black text-white">
          {climbedCount === totalCount ? '🌟 達成完登百岳壯舉！' : `🔥 繼續向第 ${climbedCount + 1} 座邁進`}
        </p>
      </div>
    </div>
  );
};

export default Stats;
