import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  Code, 
  FileJson, 
  AlertCircle, 
  ArrowDownUp,
  Send,
  HelpCircle
} from 'lucide-react';
import { CascadeScenario } from '../../types/fishboneCascade';
import { audioService } from '../../services/audioService';

interface PasteCascadeJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyScenario: (scenario: CascadeScenario) => void;
  currentTopicTitle?: string;
}

export const PasteCascadeJsonModal: React.FC<PasteCascadeJsonModalProps> = ({
  isOpen,
  onClose,
  onApplyScenario,
  currentTopicTitle = 'Công ty bán cá, cần nhập một lô hàng 5 tấn cá hồi Na Uy tươi'
}) => {
  const [jsonInput, setJsonInput] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const AI_PROMPT_TEMPLATE = `Bạn là Chuyên gia Tư vấn Quản trị Doanh nghiệp & Vận hành Chuỗi Cung ứng.
Nhiệm vụ của bạn là tạo cấu trúc Sơ đồ Xương cá Lời Truyền Tin 2 Chiều (Top-Down Directive & Bottom-Up Feedback Loop) cho chủ đề sau:

👉 CHỦ ĐỀ / TÌNH HUỐNG DOANH NGHIỆP:
"${currentTopicTitle}"

Hãy phân tích quy trình truyền tin qua 5 cấp bậc từ cao xuống thấp và ngược lại:
1. Cấp 1: CEO / Ban Tổng Giám Đốc (Ra quyết định, ngân sách, chỉ đạo cốt lõi)
2. Cấp 2: Giám Đốc Khối / Phó Tổng Giám Đốc (Lập kế hoạch, tiêu chuẩn kỹ thuật & QA/QC)
3. Cấp 3: Trưởng Phòng Nghiệp Vụ (Đàm phán hợp đồng, phân công nhân sự, chốt giá)
4. Cấp 4: Chuyên Viên / Nhân Viên Thực Thi / Quản Kho (Soạn PO, chuẩn bị kho bãi, đo đếm)
5. Cấp 5: Đối Tác / Nhà Cung Cấp Bên Bán (Xác nhận, đóng gói, bàn giao vận đơn)

Sau đó là LUỒNG TRUYỀN TIN NGƯỢC LẠI (Từ Bên Bán -> Nhân viên -> Trưởng phòng -> Giám đốc -> Sếp tổng báo cáo kết quả và duyệt mở bán/hoàn tất).

YÊU CẦU: Trả về ĐÚNG 1 ĐOẠN MÃ JSON HỢP LỆ THEO SCHEMA DƯỚI ĐÂY (Không kèm giải thích bên ngoài):

\`\`\`json
{
  "id": "scenario_custom_${Date.now()}",
  "topicTitle": "${currentTopicTitle}",
  "companyType": "Tên & Loại hình Doanh nghiệp cụ thể",
  "objective": "Mục tiêu cụ thể của đợt công tác / nghiệp vụ này",
  "budgetAndDeadline": "Ngân sách tối đa • Hạn chót hoàn thành",
  "icon": "🐟",
  "color": "#06b6d4",
  "topDownDirectives": [
    {
      "id": "td_1",
      "stageOrder": 1,
      "roleName": "CEO / Tổng Giám Đốc",
      "department": "Ban Điều Hành & Chiến Lược",
      "roleIcon": "👑",
      "direction": "top_down",
      "messageTitle": "Tiêu đề lời chỉ đạo của Sếp",
      "exactMessage": "Lời nhắn/lời dặn nguyên văn của Sếp gửi cho cấp dưới...",
      "actionRequired": "Hành động cụ thể cần thực hiện",
      "keyConstraints": "Ràng buộc ngân sách, thời gian, tiêu chuẩn kỹ thuật",
      "evidenceOrOutput": "Văn bản/Chứng từ xuất ra (Quyết định, Hợp đồng...)",
      "status": "completed"
    },
    {
      "id": "td_2",
      "stageOrder": 2,
      "roleName": "Giám Đốc Khối",
      "department": "Khối Vận Hành & Chuyên Môn",
      "roleIcon": "👔",
      "direction": "top_down",
      "messageTitle": "Tiêu đề chỉ đạo của Giám đốc Khối",
      "exactMessage": "Lời nhắn của Giám đốc gửi Trưởng phòng...",
      "actionRequired": "Hành động chuyên môn",
      "keyConstraints": "Tiêu chuẩn QA/QC",
      "evidenceOrOutput": "Kế hoạch nghiệp vụ",
      "status": "completed"
    },
    {
      "id": "td_3",
      "stageOrder": 3,
      "roleName": "Trưởng Phòng Nghiệp Vụ",
      "department": "Phòng Ban Chuyên Trách",
      "roleIcon": "📋",
      "direction": "top_down",
      "messageTitle": "Tiêu đề giao việc của Trưởng phòng",
      "exactMessage": "Lời dặn của Trưởng phòng tới Nhân viên...",
      "actionRequired": "Đàm phán & chốt điều khoản",
      "keyConstraints": "Giá cả & chứng từ hợp pháp",
      "evidenceOrOutput": "Hợp đồng thương mại",
      "status": "completed"
    },
    {
      "id": "td_4",
      "stageOrder": 4,
      "roleName": "Chuyên Viên Thực Thi & Quản Kho",
      "department": "Bộ Phận Thực Thi",
      "roleIcon": "🚚",
      "direction": "top_down",
      "messageTitle": "Tiêu đề gửi đơn đặt hàng tới Bên Bán",
      "exactMessage": "Lời nhắn gửi đối tác nhà cung cấp...",
      "actionRequired": "Phát hành đơn hàng PO",
      "keyConstraints": "Quy cách đóng thùng",
      "evidenceOrOutput": "Đơn đặt hàng chính thức PO",
      "status": "completed"
    },
    {
      "id": "td_5",
      "stageOrder": 5,
      "roleName": "Đối Tác Nhà Cung Cấp (Bên Bán)",
      "department": "Đơn Vị Cung Ứng Ngoài",
      "roleIcon": "🤝",
      "direction": "top_down",
      "messageTitle": "Tiếp nhận đơn & Cam kết cung cấp",
      "exactMessage": "Lời phản hồi từ Bên Bán cam kết giao hàng...",
      "actionRequired": "Thu hoạch, đóng gói và xuất hàng",
      "keyConstraints": "Nhiệt độ & thời gian vận chuyển",
      "evidenceOrOutput": "Vận đơn xuất kho & Hóa đơn",
      "status": "completed"
    }
  ],
  "bottomUpFeedback": [
    {
      "id": "bu_1",
      "stageOrder": 1,
      "roleName": "Đối Tác Nhà Cung Cấp (Bên Bán)",
      "department": "Đơn Vị Cung Ứng Ngoài",
      "roleIcon": "🤝",
      "direction": "bottom_up",
      "messageTitle": "Báo hàng đã xuất cảng & Gửi mã tracking",
      "exactMessage": "Lời báo tin từ Bên Bán hàng đã xuất xưởng...",
      "actionRequired": "Gửi mã tracking và dữ liệu cảm biến",
      "keyConstraints": "Cập nhật dữ liệu thời gian thực",
      "evidenceOrOutput": "Mã vận đơn AWB & Báo cáo lộ trình",
      "status": "completed"
    },
    {
      "id": "bu_2",
      "stageOrder": 2,
      "roleName": "Chuyên Viên Thực Thi & Quản Kho",
      "department": "Bộ Phận Thực Thi",
      "roleIcon": "🚚",
      "direction": "bottom_up",
      "messageTitle": "Tiếp nhận hàng, nghiệm thu kỹ thuật & nhập kho",
      "exactMessage": "Lời báo cáo của Nhân viên lên Trưởng phòng...",
      "actionRequired": "Đo đếm số lượng, kiểm tra tiêu chuẩn thực tế",
      "keyConstraints": "Không hư hại, đủ số lượng",
      "evidenceOrOutput": "Biên bản bàn giao & Phiếu nhập kho",
      "status": "completed"
    },
    {
      "id": "bu_3",
      "stageOrder": 3,
      "roleName": "Trưởng Phòng Nghiệp Vụ",
      "department": "Phòng Ban Chuyên Trách",
      "roleIcon": "📋",
      "direction": "bottom_up",
      "messageTitle": "Nghiệm thu đạt 100% & Trình hồ sơ thanh toán",
      "exactMessage": "Lời báo cáo của Trưởng phòng lên Giám đốc...",
      "actionRequired": "Nghiệm thu chất lượng, gửi Kế toán giải ngân",
      "keyConstraints": "Đạt chuẩn chất lượng, tiết kiệm ngân sách",
      "evidenceOrOutput": "Biên bản QA/QC & Đề nghị thanh toán",
      "status": "completed"
    },
    {
      "id": "bu_4",
      "stageOrder": 4,
      "roleName": "Giám Đốc Khối",
      "department": "Khối Vận Hành & Chuyên Môn",
      "roleIcon": "👔",
      "direction": "bottom_up",
      "messageTitle": "Báo cáo sẵn sàng vận hành lên Sếp Tổng",
      "exactMessage": "Lời báo cáo tổng hợp của Giám đốc lên Sếp...",
      "actionRequired": "Chỉ đạo triển khai phân phối/bán hàng",
      "keyConstraints": "Vượt tiến độ thời gian",
      "evidenceOrOutput": "Báo cáo tổng kết vận hành",
      "status": "completed"
    },
    {
      "id": "bu_5",
      "stageOrder": 5,
      "roleName": "CEO / Tổng Giám Đốc",
      "department": "Ban Điều Hành & Chiến Lược",
      "roleIcon": "👑",
      "direction": "bottom_up",
      "messageTitle": "Ký lệnh hoàn tất, mở bán & Thưởng nóng",
      "exactMessage": "Lời khen ngợi và quyết định cuối cùng của Sếp...",
      "actionRequired": "Ký lệnh mở bán chính thức, phê duyệt khen thưởng",
      "keyConstraints": "Phát hành lệnh toàn hệ thống",
      "evidenceOrOutput": "Lệnh phát hành chính thức & Quyết định khen thưởng",
      "status": "completed"
    }
  ]
}
\`\`\`
`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(AI_PROMPT_TEMPLATE);
    setCopiedPrompt(true);
    audioService.playBeep('click');
    setTimeout(() => setCopiedPrompt(false), 3000);
  };

  const handleApplyJson = () => {
    setErrorMessage(null);
    if (!jsonInput.trim()) {
      setErrorMessage('Vui lòng dán chuỗi JSON hợp lệ vào ô bên dưới.');
      return;
    }

    try {
      // Remove markdown code blocks if user pasted with ```json ... ```
      let cleaned = jsonInput.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
      }

      const parsed: CascadeScenario = JSON.parse(cleaned);

      if (!parsed.topicTitle || !parsed.topDownDirectives || !parsed.bottomUpFeedback) {
        setErrorMessage('Dữ liệu JSON thiếu trường bắt buộc (topicTitle, topDownDirectives, hoặc bottomUpFeedback).');
        return;
      }

      audioService.playBeep('success');
      onApplyScenario(parsed);
      onClose();
    } catch (err: any) {
      setErrorMessage(`Lỗi cú pháp JSON: ${err.message}. Vui lòng kiểm tra lại định dạng JSON từ AI.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xl shadow-md shadow-cyan-500/20 text-white font-bold">
              📥
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                Bộ Công Cụ AI Prompt & Dán JSON Xương Cá Truyền Tin
              </h3>
              <p className="text-xs text-slate-400">
                Tạo và hiển thị tức thì sơ đồ xương cá truyền tin 2 chiều cho bất kỳ chủ đề doanh nghiệp nào
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Step 1: Copy AI Prompt */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-black flex items-center justify-center border border-cyan-500/30">
                  1
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  Sao chép Prompt chuẩn đưa vào ChatGPT / Claude / Gemini
                </h4>
              </div>

              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold transition shadow-md shadow-cyan-500/20 active:scale-95"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Đã Copy Prompt!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy AI Prompt</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Prompt đã được cấu trúc hoàn chỉnh với chủ đề: <strong className="text-cyan-300">"{currentTopicTitle}"</strong>. Bạn chỉ cần nhấn copy, dán vào AI và copy đoạn JSON trả về.
            </p>
          </div>

          {/* Step 2: Paste JSON */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-black flex items-center justify-center border border-indigo-500/30">
                  2
                </span>
                <label className="text-xs sm:text-sm font-bold text-white">
                  Dán chuỗi JSON kết quả từ AI vào đây
                </label>
              </div>

              {jsonInput && (
                <button
                  onClick={() => setJsonInput('')}
                  className="text-[11px] text-slate-400 hover:text-red-400 transition"
                >
                  Xóa nội dung
                </button>
              )}
            </div>

            <textarea
              rows={9}
              placeholder='Dán đoạn mã JSON từ AI vào đây (ví dụ: { "topicTitle": "...", "topDownDirectives": [...], "bottomUpFeedback": [...] })'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-4 font-mono text-xs text-slate-200 placeholder-slate-600 focus:outline-none resize-none"
            />

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sơ đồ xương cá sẽ tự động cập nhật ngay khi áp dụng</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Đóng
            </button>

            <button
              onClick={handleApplyJson}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition"
            >
              <Check className="w-4 h-4" />
              <span>Áp Dụng Vào Xương Cá</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
