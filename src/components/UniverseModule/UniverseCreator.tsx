import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  SlidersHorizontal, 
  DollarSign, 
  Clock, 
  Users, 
  Target, 
  Shield, 
  Zap, 
  FileText,
  RotateCcw
} from 'lucide-react';

interface UniverseCreatorProps {
  initialText?: string;
  onAnalyze: (rawText: string, structuredData?: any) => void;
  onCancel: () => void;
}

export const UniverseCreator: React.FC<UniverseCreatorProps> = ({
  initialText = '',
  onAnalyze,
  onCancel
}) => {
  const [mode, setMode] = useState<'quick' | 'structured'>('quick');
  const [quickText, setQuickText] = useState(
    initialText ||
    'Tôi có 100 triệu VNĐ và đang có ý định mở một quán ăn nhỏ gần trường đại học. Tôi giỏi về marketing online nhưng chưa từng có kinh nghiệm quản lý vận hành bếp hay nhà hàng thực tế.'
  );

  // Structured fields
  const [situation, setSituation] = useState(initialText || '');
  const [goal, setGoal] = useState('Xây dựng nguồn thu nhập thụ động và thương hiệu ẩm thực có lãi sau 3 tháng');
  const [money, setMoney] = useState('100 Triệu VNĐ');
  const [skills, setSkills] = useState('Marketing Online, Sáng tạo nội dung video, Giao tiếp');
  const [riskTolerance, setRiskTolerance] = useState<'CONSERVATIVE' | 'BALANCED' | 'AGGRESSIVE'>('BALANCED');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'quick') {
      if (!quickText.trim()) return;
      onAnalyze(quickText);
    } else {
      const combined = `${situation}\n\nMục tiêu: ${goal}\nNgân sách: ${money}\nKỹ năng: ${skills}\nĐộ chấp nhận rủi ro: ${riskTolerance}`;
      onAnalyze(combined, { situation, goal, money, skills, riskTolerance });
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto bg-slate-950">
      <div className="max-w-2xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative">
        {/* Top switch modes */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Khởi Tạo Kịch Bản Quyết Định</span>
            </h2>
            <p className="text-xs text-slate-400">
              Nhập tình huống theo ngôn ngữ tự nhiên để AI bóc tách Dữ Kiện & Giả Định
            </p>
          </div>

          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setMode('quick')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                mode === 'quick'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Nhập Nhanh
            </button>
            <button
              onClick={() => setMode('structured')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                mode === 'structured'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Chi Tiết
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'quick' ? (
            <div className="space-y-2">
              <label className="block font-bold text-slate-300">
                Mô tả tình huống / Kế hoạch / Quyết định của bạn:
              </label>
              <textarea
                value={quickText}
                onChange={(e) => setQuickText(e.target.value)}
                placeholder="Ví dụ: Tôi có 100M và đang tính mở quán ăn gần trường đại học..."
                rows={6}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none font-sans leading-relaxed"
              />
              <p className="text-[11px] text-slate-500 italic">
                💡 Mẹo: Viết càng tự nhiên và chi tiết về số tiền, nhân sự, mục tiêu thì AI mô phỏng càng chính xác.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  1. Tình huống hiện tại:
                </label>
                <textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="Mô tả bối cảnh hiện tại của bạn..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Mục tiêu kỳ vọng:</span>
                  </label>
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ngân sách / Vốn:</span>
                  </label>
                  <input
                    type="text"
                    value={money}
                    onChange={(e) => setMoney(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kỹ năng & Kinh nghiệm có sẵn:</span>
                  </label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    <span>Độ chấp nhận rủi ro:</span>
                  </label>
                  <select
                    value={riskTolerance}
                    onChange={(e: any) => setRiskTolerance(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-cyan-500"
                  >
                    <option value="CONSERVATIVE">Thận trọng (Bảo toàn vốn là số 1)</option>
                    <option value="BALANCED">Cân bằng (Chấp nhận rủi ro vừa phải)</option>
                    <option value="AGGRESSIVE">Mạo hiểm (Liều ăn nhiều)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-semibold transition"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-cyan-600/30 hover:scale-[1.02] active:scale-[0.98] transition"
            >
              <span>Phân Tích & Phỏng Vấn Thích Ứng</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
