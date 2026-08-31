import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  BrainCircuit, 
  Sparkles, 
  Orbit, 
  Flame, 
  HelpCircle, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Award
} from 'lucide-react';

interface AppGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFeatureTab?: (tab: 'ielts' | 'genz' | 'universe' | 'action' | 'fishbone') => void;
}

export const AppGuideModal: React.FC<AppGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectFeatureTab
}) => {
  const [activeGuideTab, setActiveGuideTab] = useState<'overview' | 'ielts' | 'genz' | 'universe' | 'action' | 'fishbone'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">HƯỚNG DẪN SỬ DỤNG IMAGINE STUDIO</h3>
              <p className="text-xs text-slate-400">Cách sử dụng đơn giản 5 siêu tính năng trong tầm tay</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveGuideTab('overview')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeGuideTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Tổng Quan & Mẹo Nhanh
          </button>
          <button
            onClick={() => setActiveGuideTab('ielts')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeGuideTab === 'ielts' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🧠 1. IELTS Visual Map
          </button>
          <button
            onClick={() => setActiveGuideTab('genz')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeGuideTab === 'genz' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ 2. GenZify Meme
          </button>
          <button
            onClick={() => setActiveGuideTab('universe')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeGuideTab === 'universe' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🌌 3. Parallel Universe
          </button>
          <button
            onClick={() => setActiveGuideTab('action')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeGuideTab === 'action' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📅 4. Lịch Báo & Radar
          </button>
          <button
            onClick={() => setActiveGuideTab('fishbone')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeGuideTab === 'fishbone' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🐟 5. Fishbone
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto space-y-4 pr-1 text-xs text-slate-300 leading-relaxed">
          {activeGuideTab === 'overview' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                <span className="font-bold text-indigo-300 text-sm flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Mẹo Quan Trọng Nhất: Nút "⚡ NẠP DỮ LIỆU MẪU" (Fill Sample)</span>
                </span>
                <p>
                  Ở <strong>mọi tab tính năng</strong> trong ứng dụng, luôn có sẵn nút <strong>"⚡ Nạp Dữ Liệu Mẫu"</strong> màu nổi bật. Bạn chỉ cần bấm vào là hệ thống sẽ tự động điền sẵn bài học, kịch bản, việc cần làm hoặc dự án mẫu để bạn trải nghiệm ngay lập tức mà không cần tự nhập liệu!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <strong className="text-white flex items-center gap-1.5">
                    <span>🧠 IELTS Visual Map</span>
                  </strong>
                  <p className="text-slate-400">Ghi nhớ từ vựng IELTS Speaking bằng chuỗi biểu tượng cảm xúc (Icons). Phản xạ nói tự nhiên đạt Band 7.5 - 8.5 mà không cần học vẹt cả câu.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <strong className="text-white flex items-center gap-1.5">
                    <span>⚡ GenZify Meme Engine</span>
                  </strong>
                  <p className="text-slate-400">Biến câu từ khô cứng sang 9 phong cách Gen Z tự nhiên (Cool, Cà khịa, Hài hước, Drama, Thả thính...) kèm gợi ý Meme AI.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <strong className="text-white flex items-center gap-1.5">
                    <span>🌌 Parallel Universe Simulator</span>
                  </strong>
                  <p className="text-slate-400">Mô phỏng 5 vũ trụ tương lai song song cho các quyết định lớn trong đời (Nghề nghiệp, Tài chính, Start-up) kèm phân tích rủi ro & điểm rẽ nhánh.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <strong className="text-white flex items-center gap-1.5">
                    <span>🔥 Action Engine & Hall of Fame</span>
                  </strong>
                  <p className="text-slate-400">Động cơ triệt tiêu trì hoãn: Quy tắc 5 phút, chẩn đoán tâm lý "Tại sao chưa làm?", Courage Mode và Bảng vinh danh chiến tích.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 md:col-span-2">
                  <strong className="text-white flex items-center gap-1.5">
                    <span>🐟 Fishbone Evolution System</span>
                  </strong>
                  <p className="text-slate-400">Quản trị lộ trình tiến hóa doanh nghiệp / quy trình từ Level 1 (Khởi đầu) đến Target State hoàn chỉnh theo mô hình xương cá, Gap Analysis và Quality Gate.</p>
                </div>
              </div>
            </div>
          )}

          {activeGuideTab === 'ielts' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Hướng Dẫn Học IELTS Bằng Visual Master Map:</h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>Bấm nút <strong>"⚡ Nạp Mẫu IELTS"</strong> hoặc nhập danh sách từ vựng của bạn.</li>
                <li>Bấm <strong>"TẠO VISUAL MASTER MAP"</strong> để AI sinh ra chuỗi biểu tượng cảm xúc (Visual Story Map) kết nối các từ vựng.</li>
                <li>Xem bài nói mẫu Band 8.0+: Chú ý các liên từ có icon (Ví dụ: 🤔 <em>In my opinion</em>, 🥇 <em>First of all</em>, 🌊 <em>Ripple effect</em>).</li>
                <li>Bấm tab <strong>"Interactive Recall Quiz"</strong>: Nhìn chuỗi icon và tự nói lại câu trả lời vào micro để AI chấm điểm Band Score ngay lập tức!</li>
              </ol>
            </div>
          )}

          {activeGuideTab === 'genz' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Hướng Dẫn Biến Tấu Câu Nói Với GenZify:</h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>Bấm nút <strong>"⚡ Nạp Mẫu Chat"</strong> hoặc gõ câu bạn muốn biến tấu.</li>
                <li>Chọn 1 trong 9 phong cách (Tone) mong muốn (Ví dụ: <em>Cà khịa 💀, Tấu hề 😂, Ngông 🔥, Thả thính ❤️</em>).</li>
                <li>Bấm <strong>"BIẾN ĐỔI GEN Z & MEME"</strong>.</li>
                <li>Chọn câu ưng ý nhất để Sao chép, hoặc bấm vào <strong>Ảnh Meme</strong> để xem ảnh minh họa AI hài hước!</li>
              </ol>
            </div>
          )}

          {activeGuideTab === 'universe' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Hướng Dẫn Mô Phỏng Đa Vũ Trụ Quyết Định (Parallel Universe):</h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>Bấm <strong>"⚡ Nạp Kịch Bản Mẫu"</strong> (Ví dụ: <em>Khởi nghiệp AI vs Đi làm Big Tech</em>).</li>
                <li>AI sẽ tự động tách FACT (Sự thật), PLAN (Kế hoạch), UNKNOWN (Biến số rủi ro) và đặt 3-5 câu hỏi trắc nghiệm nhanh để làm rõ bối cảnh.</li>
                <li>Bấm <strong>"BẮT ĐẦU MÔ PHỎNG 5 VŨ TRỤ"</strong> để xem 5 dòng thời gian tương lai rẽ nhánh khác nhau.</li>
                <li>Xem kịch bản điện ảnh, hình ảnh AI từng cảnh (Scene), và bấm vào <strong>"ĐIỂM RẼ NHÁNH"</strong> để chọn hướng đi mới!</li>
              </ol>
            </div>
          )}

          {activeGuideTab === 'action' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Hướng Dẫn Lịch Báo Tin Tức Hot & Radar Nhu Cầu Đột Biến:</h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>Bấm vào <strong>dải ngày ngang</strong> hoặc chọn <strong>bất kỳ ngày nào trong lịch</strong> (hôm nay hoặc những ngày trước đó) để xem dữ liệu của ngày hôm đó.</li>
                <li>Xem <strong>10 bài báo & tin hot nhất thuộc 10 chủ đề khác nhau</strong> (AI, Tài chính, Khởi nghiệp, Xã hội, Giáo dục, Giải trí, Sức khỏe, BĐS, Khoa học xanh, Gen Z).</li>
                <li>Bấm nút <strong>"📖 ĐỌC TRONG APP"</strong> để mở giao diện đọc toàn văn bài báo đầy đủ, xem 3 điểm cốt lõi (Key Takeaways) và nghe phát âm Audio TTS.</li>
                <li>Chuyển sang tab <strong>"🚀 10 Nhu Cầu Đột Biến"</strong> để theo dõi Radar các nhu cầu tiêu dùng và thị trường tăng vọt (+200% đến +600%), nguyên nhân kích hoạt và cơ hội hành động kinh doanh!</li>
              </ol>
            </div>
          )}

          {activeGuideTab === 'fishbone' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">Hướng Dẫn Tiến Hóa Xương Cá (Fishbone Evolution):</h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>Bấm vào từng đốt xương cá (Level 1, Level 2, Level 3...) trên sơ đồ nằm ngang.</li>
                <li>Xem bảng <strong>Gap Analysis</strong> (Hiện trạng → Mục tiêu → Khoảng cách cần bổ sung về nhân sự, SOP, công nghệ).</li>
                <li>Hoàn thành các hạng mục <strong>Upgrade Requirements</strong> bắt buộc.</li>
                <li>Bấm nút <strong>"QUALITY GATE"</strong>: Khi đạt đủ điều kiện kiểm định chất lượng, hệ thống sẽ cho phép <strong>LEVEL UP</strong> và tự động lưu Snapshot lịch sử!</li>
              </ol>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-3">
          <span className="text-[11px] text-slate-500 font-medium">
            💡 Bạn có thể mở lại bảng hướng dẫn này bất cứ lúc nào từ thanh Navigation.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition"
          >
            Đã Hiểu, Bắt Đầu Thôi! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
