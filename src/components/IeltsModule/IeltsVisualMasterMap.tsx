import React from 'react';
import { Layers, Sparkles, Volume2 } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface IeltsVisualMasterMapProps {
  icons: string[];
  explanations?: { icon: string; textEn: string; textVi: string }[];
}

export const IeltsVisualMasterMap: React.FC<IeltsVisualMasterMapProps> = ({
  icons,
  explanations = []
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Visual Master Map (Sơ Đồ Neo Ý Tưởng Trực Quan)
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                Icon Chain
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Ghi nhớ chuỗi logic qua Visual Anchors thay vì học vẹt từng câu chữ
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const fullStr = explanations.map(e => `${e.textEn}`).join('. ');
            audioService.speakText(fullStr, 'en');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold hover:bg-indigo-600/30 transition"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Nghe toàn bộ chuỗi</span>
        </button>
      </div>

      {/* Interactive Icon Chain */}
      <div className="flex flex-wrap items-center gap-2 p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl mb-4">
        {icons.map((icon, idx) => (
          <React.Fragment key={idx}>
            <button
              onClick={() => {
                const exp = explanations.find(e => e.icon === icon);
                if (exp) {
                  audioService.speakText(exp.textEn, 'en');
                }
              }}
              title={explanations.find(e => e.icon === icon)?.textVi || `Bước ${idx + 1}`}
              className="group relative flex items-center justify-center min-w-12 h-12 px-3 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-indigo-500 hover:bg-indigo-950/40 transition-all transform hover:scale-110 shadow-md text-2xl"
            >
              <span>{icon}</span>
              <span className="absolute -top-2 -right-1 text-[9px] font-mono font-bold bg-slate-800 text-indigo-300 px-1 rounded border border-slate-700">
                {idx + 1}
              </span>
            </button>
            {idx < icons.length - 1 && (
              <span className="text-slate-600 font-bold select-none text-base">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 30-Second Memory Explanations Grid */}
      {explanations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
          {explanations.map((exp, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60 hover:border-slate-700 transition text-xs"
            >
              <span className="text-xl shrink-0 p-1 bg-slate-900 rounded-md border border-slate-800">
                {exp.icon}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-slate-200 truncate flex items-center justify-between">
                  <span>{exp.textEn}</span>
                  <button
                    onClick={() => audioService.speakText(exp.textEn, 'en')}
                    className="text-slate-500 hover:text-indigo-400 ml-1"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </p>
                <p className="text-slate-400 text-[11px] truncate">{exp.textVi}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
