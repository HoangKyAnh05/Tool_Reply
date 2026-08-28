import React from 'react';
import { 
  Orbit, 
  Sparkles, 
  GitBranch, 
  ArrowRight, 
  Eye, 
  Zap, 
  ShieldAlert, 
  TrendingUp, 
  RotateCcw,
  Compass,
  FileCode,
  Layers
} from 'lucide-react';

interface UniverseHomeProps {
  onStartNew: () => void;
  onOpenImport: () => void;
  onLoadPreset: (scenarioText: string) => void;
}

const EXAMPLE_SCENARIOS = [
  {
    title: 'Mở quán ăn sinh viên 100M',
    tagline: 'Có 100 triệu, định mở quán gần đại học, giỏi marketing nhưng chưa quản lý F&B bao giờ.',
    category: 'Kinh doanh',
    icon: '🍜'
  },
  {
    title: 'Nghỉ việc để làm Freelance / Startup',
    tagline: 'Đang làm IT lương 25M, muốn nghỉ việc để build sản phẩm SaaS riêng nhưng chỉ có 6 tháng tiền tiết kiệm.',
    category: 'Sự nghiệp',
    icon: '💻'
  },
  {
    title: 'Chuyển việc sang công ty đa quốc gia',
    tagline: 'Nhận offer công ty lớn lương cao x1.5 nhưng phải chuyển vào TP.HCM sống xa gia đình.',
    category: 'Bước ngoặt',
    icon: '✈️'
  },
  {
    title: 'Đầu tư tiết kiệm vào thị trường mới',
    tagline: 'Có 200M tiết kiệm, phân vân giữa gửi ngân hàng an toàn hay đầu tư chứng khoán/bất động sản vùng ven.',
    category: 'Tài chính',
    icon: '📈'
  }
];

export const UniverseHome: React.FC<UniverseHomeProps> = ({
  onStartNew,
  onOpenImport,
  onLoadPreset
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto bg-slate-950 relative select-none">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/20 to-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl w-full text-center space-y-6 relative z-10 py-6">
        {/* Core Taglines */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-500/10 mb-2">
          <Orbit className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '25s' }} />
          <span>PARALLEL UNIVERSE • AI DECISION SIMULATION ENGINE</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          SEE YOUR DECISION BEFORE YOU LIVE IT.
        </h1>

        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Mô tả tình huống, quyết định, kế hoạch hay ngã rẽ bạn đang phân vân. 
          AI sẽ phân tích Dữ Kiện, Giả Định, Biến Số Đòn Bẩy và trực quan hóa từng vũ trụ tương lai trước mắt bạn.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onStartNew}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-600/25 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Sparkles className="w-4 h-4" />
            <span>+ TẠO MÔ PHỎNG QUYẾT ĐỊNH MỚI</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenImport}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition"
          >
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>Nhập JSON / Continue Prompt</span>
          </button>
        </div>

        {/* Example Scenarios Grid */}
        <div className="pt-10 text-left">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Các kịch bản mẫu phổ biến (Click để thử ngay):</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {EXAMPLE_SCENARIOS.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => onLoadPreset(sc.tagline)}
                className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90 transition text-left group flex items-start gap-3.5 shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition">
                  {sc.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-200 text-xs group-hover:text-cyan-300 transition">
                      {sc.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      {sc.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {sc.tagline}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Core Principles Footnote */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            Không bói toán • Phân tích nhân quả khoa học
          </span>
          <span className="flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-purple-400" />
            Đa vũ trụ phân nhánh theo quyết định
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            Trực quan hóa hình ảnh theo đúng ngữ cảnh
          </span>
        </div>
      </div>
    </div>
  );
};
