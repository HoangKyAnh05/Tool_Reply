import React from 'react';
import { ChartVisualData } from '../../types/ieltsWriting';
import { BarChart3, TrendingUp, PieChart as PieIcon, Table as TableIcon, MapPin, ArrowRight, Layers } from 'lucide-react';

interface IeltsTask1ChartViewerProps {
  chartData: ChartVisualData;
  title: string;
}

export const IeltsTask1ChartViewer: React.FC<IeltsTask1ChartViewerProps> = ({ chartData, title }) => {
  const { chartType, series = [], categories = [], unit = '', mapLocations = [], processSteps = [], tableHeaders = [], tableRows = [] } = chartData;

  // Find max value for scaling
  let maxValue = 100;
  if (series.length > 0) {
    const allVals = series.flatMap((s) => s.data.map((d) => d.value));
    if (allVals.length > 0) {
      maxValue = Math.max(...allVals, 10);
    }
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col space-y-4">
      {/* Header with Type Badge */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {chartType === 'line' && <TrendingUp className="w-4 h-4" />}
            {chartType === 'bar' && <BarChart3 className="w-4 h-4" />}
            {chartType === 'pie' && <PieIcon className="w-4 h-4" />}
            {chartType === 'table' && <TableIcon className="w-4 h-4" />}
            {chartType === 'map' && <MapPin className="w-4 h-4" />}
            {chartType === 'process' && <Layers className="w-4 h-4" />}
          </span>
          <div>
            <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-purple-600/30 text-purple-300 border border-purple-500/30">
              {chartType.toUpperCase()} CHART
            </span>
            <h4 className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">{title}</h4>
          </div>
        </div>
        {unit && (
          <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded-md border border-slate-700">
            Đơn vị: {unit}
          </span>
        )}
      </div>

      {/* 1. LINE GRAPH VISUALIZATION */}
      {chartType === 'line' && (
        <div className="flex flex-col space-y-3">
          <div className="w-full h-56 bg-slate-950/80 rounded-xl border border-slate-800/80 p-3 relative flex flex-col justify-between">
            {/* SVG Lines */}
            <svg viewBox="0 0 400 180" className="w-full h-full overflow-visible">
              {/* Horizontal Grid lines */}
              {[0, 45, 90, 135].map((y, idx) => (
                <line
                  key={idx}
                  x1="30"
                  y1={y + 15}
                  x2="390"
                  y2={y + 15}
                  stroke="#334155"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
              ))}

              {/* Data Series Lines */}
              {series.map((s, sIdx) => {
                const points = s.data.map((d, i) => {
                  const x = 50 + (i / Math.max(1, s.data.length - 1)) * 320;
                  const y = 150 - (d.value / maxValue) * 130;
                  return `${x},${y}`;
                });
                const pathD = `M ${points.join(' L ')}`;
                const color = s.color || ['#38bdf8', '#a855f7', '#34d399', '#f59e0b'][sIdx % 4];

                return (
                  <g key={sIdx}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="filter drop-shadow-md"
                    />
                    {s.data.map((d, i) => {
                      const x = 50 + (i / Math.max(1, s.data.length - 1)) * 320;
                      const y = 150 - (d.value / maxValue) * 130;
                      return (
                        <g key={i}>
                          <circle cx={x} cy={y} r="4.5" fill={color} stroke="#0f172a" strokeWidth="2" />
                          <text
                            x={x}
                            y={y - 8}
                            fill="#cbd5e1"
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            {d.value}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                );
              })}

              {/* X Axis Labels */}
              {categories.map((cat, idx) => {
                const x = 50 + (idx / Math.max(1, categories.length - 1)) * 320;
                return (
                  <text key={idx} x={x} y="172" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">
                    {cat}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
            {series.map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                <span
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: s.color || ['#38bdf8', '#a855f7', '#34d399', '#f59e0b'][idx % 4] }}
                />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. BAR CHART VISUALIZATION */}
      {chartType === 'bar' && (
        <div className="flex flex-col space-y-3">
          <div className="w-full bg-slate-950/80 rounded-xl border border-slate-800/80 p-4 space-y-3.5">
            {categories.map((cat, cIdx) => (
              <div key={cIdx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>{cat}</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {series.map((s, sIdx) => {
                    const val = s.data[cIdx]?.value || 0;
                    const percent = Math.min(100, Math.round((val / maxValue) * 100));
                    const color = s.color || ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b'][sIdx % 4];

                    return (
                      <div key={sIdx} className="flex items-center gap-2 text-xs">
                        <span className="w-20 text-[10px] text-slate-400 font-medium truncate">{s.label}</span>
                        <div className="flex-1 h-4 bg-slate-900 rounded-full overflow-hidden relative">
                          <div
                            className="h-full rounded-full transition-all duration-500 shadow-sm flex items-center justify-end pr-1.5 text-[9px] font-mono font-bold text-white"
                            style={{ width: `${Math.max(12, percent)}%`, backgroundColor: color }}
                          >
                            {val}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {series.map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: s.color || ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b'][idx % 4] }}
                />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PIE CHART VISUALIZATION */}
      {chartType === 'pie' && (
        <div className="flex flex-col space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {series.map((s, sIdx) => {
              const total = s.data.reduce((acc, curr) => acc + curr.value, 0) || 100;
              return (
                <div key={sIdx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="text-xs font-bold text-center text-purple-300">{s.label}</h5>
                  <div className="space-y-1.5">
                    {s.data.map((d, dIdx) => {
                      const pct = Math.round((d.value / total) * 100);
                      const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#06b6d4'];
                      const c = colors[dIdx % colors.length];
                      return (
                        <div key={dIdx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 truncate max-w-[130px]">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c }} />
                            <span className="text-slate-300 text-[11px] truncate">{d.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-white text-[11px] font-bold">{pct}%</span>
                            <span className="text-[10px] text-slate-400">({d.value})</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. TABLE VISUALIZATION */}
      {chartType === 'table' && (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-300">
              <tr>
                {tableHeaders.map((header, idx) => (
                  <th key={idx} className="p-2.5 font-bold uppercase tracking-wider text-[11px]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-900/50 transition">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className={`p-2.5 ${cIdx === 0 ? 'font-bold text-white' : 'font-mono text-cyan-300'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. MAP VISUALIZATION */}
      {chartType === 'map' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2.5">
            {mapLocations.map((loc, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    📍
                  </span>
                  <span className="text-xs font-bold text-white">{loc.name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="px-2 py-1 rounded bg-rose-950/50 border border-rose-500/30 text-rose-300 text-[11px]">
                    <span className="text-[9px] block text-slate-400">TRƯỚC ĐÂY:</span>
                    <span>{loc.pastStatus}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="px-2 py-1 rounded bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-[11px]">
                    <span className="text-[9px] block text-slate-400">HIỆN TẠI / TƯƠNG LAI:</span>
                    <span>{loc.presentStatus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. PROCESS VISUALIZATION */}
      {chartType === 'process' && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/90 border border-indigo-500/30 space-y-1.5 relative shadow-sm hover:border-indigo-400 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                  <span className="text-lg">{step.icon || '⚙️'}</span>
                </div>
                <h5 className="text-xs font-bold text-indigo-300 leading-snug">{step.title}</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
