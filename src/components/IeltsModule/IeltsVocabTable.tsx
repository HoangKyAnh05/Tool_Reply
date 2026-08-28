import React from 'react';
import { BookMarked, Volume2 } from 'lucide-react';
import { IeltsVocabItem } from '../../types/ielts';
import { audioService } from '../../services/audioService';

interface IeltsVocabTableProps {
  vocabList: IeltsVocabItem[];
}

export const IeltsVocabTable: React.FC<IeltsVocabTableProps> = ({ vocabList }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
          <BookMarked className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            Vocabulary Integration (Từ Vựng & Ngữ Cảnh Trực Quan)
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
              ICON → WORD → MEANING → VISUAL SENTENCE
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Từ vựng Band 7-8+ được nhúng trực tiếp kèm câu ví dụ trực quan hóa
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/60">
              <th className="py-2.5 px-3 w-14 text-center">Icon</th>
              <th className="py-2.5 px-3 w-44">Từ Vựng (Vocab)</th>
              <th className="py-2.5 px-3 w-56">Ý Nghĩa Tiếng Việt</th>
              <th className="py-2.5 px-3">Câu Ví Dụ Trực Quan (Visual Sentence)</th>
              <th className="py-2.5 px-2 w-12 text-center">Audio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {vocabList.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-3 text-center text-xl bg-slate-950/40">
                  {item.icon}
                </td>
                <td className="py-3 px-3 font-bold text-indigo-300">
                  {item.word}
                </td>
                <td className="py-3 px-3 text-slate-300 font-medium">
                  {item.meaning}
                </td>
                <td className="py-3 px-3 text-slate-300 select-text leading-relaxed">
                  {item.visualSentence}
                </td>
                <td className="py-3 px-2 text-center">
                  <button
                    onClick={() => audioService.speakText(item.word, 'en')}
                    title="Nghe phát âm"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-400 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
