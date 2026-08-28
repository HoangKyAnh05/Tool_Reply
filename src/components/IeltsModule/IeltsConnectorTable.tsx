import React from 'react';
import { Link2, Volume2 } from 'lucide-react';
import { IeltsConnectorItem } from '../../types/ielts';
import { audioService } from '../../services/audioService';

interface IeltsConnectorTableProps {
  connectorTable: IeltsConnectorItem[];
}

export const IeltsConnectorTable: React.FC<IeltsConnectorTableProps> = ({ connectorTable }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <Link2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            Connector Visual System (Hệ Thống Liên Từ Trực Quan)
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              Structural Anchors
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Liên từ có gắn icon neo cấu trúc bài nói, giúp chuyển ý mượt mà chuẩn Band 8.0+
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {connectorTable.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/50 transition group"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shrink-0">
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-300 text-xs truncate">
                  {item.connector}
                </span>
                <button
                  onClick={() => audioService.speakText(item.connector, 'en')}
                  className="text-slate-500 hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px]">
                  {item.function}
                </span>
                <span className="truncate">{item.vietnamese}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
