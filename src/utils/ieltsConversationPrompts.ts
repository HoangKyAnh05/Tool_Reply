import { AnnotatedPhraseChunk } from './ieltsTextAnnotator';
import { IeltsVocabItem, IeltsQuestionPartType } from '../types/ielts';

/**
 * ==============================================================================
 * 1. PROMPT GIẢI THÍCH CHI TIẾT (KÈM CỘT ĐỐI TƯỢNG GIAO TIẾP PHÙ HỢP / NÓI VỚI AI)
 * ==============================================================================
 */

/**
 * Prompt giải thích chi tiết cho 1 CỤM TỪ / TỪ RIÊNG LẺ trong câu
 * (Bắt buộc có cột: Đối tượng giao tiếp phù hợp / Thường nói với loại người nào)
 */
export const buildExplanationPromptForChunk = (
  chunk: AnnotatedPhraseChunk,
  questionContext?: string
): string => {
  const meaning = chunk.vietnameseMeaning ? `"${chunk.vietnameseMeaning}"` : 'Dịch nghĩa chính xác theo ngữ cảnh câu';
  const purpose = chunk.purpose ? `\n- Ý nghĩa & Band 8.0+ Impact: ${chunk.purpose}` : '';
  const context = questionContext ? `\n- Ngữ cảnh câu hỏi / đề bài: "${questionContext}"` : '';

  return `[${chunk.icon}] Từ / Cụm từ: "${chunk.englishText}"
- Dịch nghĩa trong ngữ cảnh của câu: ${meaning}${purpose}${context}

Hãy đóng vai là Giảng viên IELTS Band 9.0 kiêm Chuyên gia Ngôn ngữ học bản xứ:
1. Giải thích chi tiết ý nghĩa, sắc thái biểu cảm và cách dùng của từ/cụm từ này trong ngữ cảnh câu văn trên.
2. Xác định rõ ĐỐI TƯỢNG GIAO TIẾP PHÙ HỢP: Câu/từ này thường nói với loại người như thế nào? (Người trẻ, bạn bè thân mật, người cùng tuổi / đồng nghiệp ngang hàng, thầy cô / giáo viên của mình, cấp trên, giám khảo thi IELTS, hay trong bối cảnh trang trọng với đối tác...).
3. Tạo các tình huống và câu hỏi thực tế trong đời sống & phòng thi IELTS (Speaking & Writing) mà tôi nên dùng từ này.
4. Trình bày dưới dạng BẢNG GIẢI THÍCH rõ ràng, có icon sinh động, bắt buộc gồm ĐỦ 5 CỘT:
   - 🎯 Tình huống / Ngữ cảnh sử dụng (Context & Situation)
   - 👥 Đối tượng giao tiếp phù hợp / Thường nói với ai (Target Audience: người trẻ/bạn bè, người cùng tuổi, thầy cô giáo, cấp trên, giám khảo... kèm mức độ Formal/Neutral/Informal)
   - 💬 Câu hỏi / Câu đối thoại mẫu chứa từ này (Example Sentence)
   - 🇻🇳 Dịch nghĩa của ví dụ giải thích theo ngữ cảnh (Vietnamese Translation)
   - 💡 Phân tích lý do dùng & Điểm cộng từ vựng (Vocabulary Impact & Band Boost)`;
};

/**
 * Prompt giải thích TOÀN BỘ TỪ / CỤM TỪ trong cả câu
 * (Bắt buộc có cột: Đối tượng giao tiếp phù hợp / Thường nói với loại người nào)
 */
export const buildAllExplanationPromptForChunks = (
  chunks: AnnotatedPhraseChunk[],
  questionContext?: string
): string => {
  const fullSentence = chunks.map((c) => c.englishText).join(' ');
  const contextStr = questionContext ? `\n- Ngữ cảnh đề bài / câu hỏi: "${questionContext}"` : '';

  const chunksListFormatted = chunks
    .map((chunk, idx) => {
      const meaning = chunk.vietnameseMeaning ? `"${chunk.vietnameseMeaning}"` : 'Dịch nghĩa chính xác theo ngữ cảnh';
      const purpose = chunk.purpose ? `\n  * Ý nghĩa & Band 8.0+ Impact: ${chunk.purpose}` : '';
      return `### [CỤM #${idx + 1}] ${chunk.icon} "${chunk.englishText}"
- Nghĩa trong câu: ${meaning}${purpose}`;
    })
    .join('\n\n');

  return `[📚 TỔNG HỢP PROMPT PHÂN TÍCH TỪNG TỪ TRONG CÂU - CÓ CỘT ĐỐI TƯỢNG GIAO TIẾP]
- Câu văn gốc hoàn chỉnh: "${fullSentence}"${contextStr}
- Tổng số từ / cụm từ được tách: ${chunks.length} cụm

DANH SÁCH CHI TIẾT CÁC TỪ & CỤM TỪ TRONG CÂU CẦN PHÂN TÍCH:
${chunksListFormatted}

================================================================================
YÊU CẦU ĐỐI VỚI GIẢNG VIÊN IELTS BAND 9.0 & CHUYÊN GIA NGÔN NGỮ:
Hãy phân tích CHI TIẾT TỪNG TỪ / CỤM TỪ trong danh sách trên theo ngữ cảnh của câu văn:
1. Giải thích cặn kẽ ý nghĩa, sắc thái từ và vai trò ngữ pháp của từng cụm trong câu.
2. Xác định rõ ĐỐI TƯỢNG GIAO TIẾP PHÙ HỢP cho từng cụm: Từ/câu đó thường nói với loại người như thế nào? (Người trẻ, bạn bè thân mật, người cùng tuổi / đồng nghiệp, thầy cô giáo, cấp trên, giám khảo IELTS...).
3. Trình bày BẢNG GIẢI THÍCH cho từng cụm (hoặc bảng tổng hợp), có icon sinh động, bắt buộc gồm ĐỦ 5 CỘT:
   - 🎯 Tình huống / Ngữ cảnh sử dụng (Context & Situation)
   - 👥 Đối tượng giao tiếp phù hợp / Thường nói với ai (Target Audience: người trẻ/bạn bè, người cùng tuổi, thầy cô giáo, cấp trên, giám khảo... kèm mức độ Formal/Neutral/Informal)
   - 💬 Câu hỏi / Câu đối thoại mẫu chứa từ này (Example Sentence)
   - 🇻🇳 Dịch nghĩa của ví dụ giải thích theo các ngữ cảnh sử dụng (Vietnamese Translation)
   - 💡 Phân tích lý do dùng & Điểm cộng từ vựng (Vocabulary Impact & Band Boost)

Hãy giải thích lần lượt từng từ/cụm từ thật chi tiết, trực quan và dễ học!`;
};

/**
 * Prompt giải thích cho 1 TỪ VỰNG GỢI Ý trong bảng từ vựng
 */
export const buildExplanationPromptForVocabItem = (item: IeltsVocabItem): string => {
  const meaning = item.meaning ? `"${item.meaning}"` : 'Dịch nghĩa chính xác theo ngữ cảnh';
  const sentence = item.visualSentence ? `\n- Câu ví dụ: "${item.visualSentence}"` : '';
  const sentenceTrans = item.sentenceMeaning ? `\n- Dịch nghĩa ví dụ: "${item.sentenceMeaning}"` : '';

  return `[${item.icon}] Từ / Cụm từ: "${item.word}"
- Dịch nghĩa trong ngữ cảnh: ${meaning}${sentence}${sentenceTrans}

Hãy đóng vai là Giảng viên IELTS Band 9.0 kiêm Chuyên gia Ngôn ngữ học bản xứ:
1. Giải thích chi tiết ý nghĩa và cách dùng của từ/cụm từ này trong ngữ cảnh câu văn trên.
2. Phân tích rõ ĐỐI TƯỢNG GIAO TIẾP: Từ này thường dùng khi nói chuyện với ai? (Người trẻ, bạn bè trang lứa, người cùng tuổi, thầy cô giáo, cấp trên, đồng nghiệp, giám khảo IELTS...).
3. Trình bày dưới dạng BẢNG GIẢI THÍCH rõ ràng, có icon sinh động, bắt buộc gồm ĐỦ 5 CỘT:
   - 🎯 Tình huống / Ngữ cảnh sử dụng (Context & Situation)
   - 👥 Đối tượng giao tiếp phù hợp / Thường nói với ai (Target Audience: bạn bè/người trẻ, người cùng tuổi, thầy cô giáo, cấp trên, giám khảo... kèm mức độ Formal/Neutral/Informal)
   - 💬 Câu hỏi / Câu đối thoại mẫu chứa từ này (Example Sentence)
   - 🇻🇳 Dịch nghĩa của ví dụ giải thích theo các ngữ cảnh sử dụng (Vietnamese Translation)
   - 💡 Phân tích lý do dùng & Điểm cộng từ vựng (Vocabulary Impact & Band Boost)`;
};

/**
 * Prompt giải thích TOÀN BỘ BẢNG TỪ VỰNG GỢI Ý
 */
export const buildAllExplanationPromptForVocabList = (vocabList: IeltsVocabItem[]): string => {
  const itemsFormatted = vocabList
    .map((item, idx) => {
      const meaning = item.meaning ? `"${item.meaning}"` : 'Dịch nghĩa chính xác theo ngữ cảnh';
      const sentence = item.visualSentence ? `\n  - Câu ví dụ: "${item.visualSentence}"` : '';
      const sentenceTrans = item.sentenceMeaning ? `\n  - Dịch nghĩa ví dụ: "${item.sentenceMeaning}"` : '';
      return `### [TỪ VỰNG #${idx + 1}] ${item.icon} "${item.word}"
- Nghĩa trong ngữ cảnh: ${meaning}${sentence}${sentenceTrans}`;
    })
    .join('\n\n');

  return `[📖 TỔNG HỢP PROMPT PHÂN TÍCH TOÀN BỘ BẢNG TỪ VỰNG - CÓ CỘT ĐỐI TƯỢNG GIAO TIẾP]
- Tổng số từ vựng: ${vocabList.length} từ

DANH SÁCH CHI TIẾT TỪ VỰNG CẦN PHÂN TÍCH:
${itemsFormatted}

================================================================================
YÊU CẦU ĐỐI VỚI GIẢNG VIÊN IELTS BAND 9.0:
Đối với TỪNG từ / cụm từ trong danh sách trên:
1. Giải thích chi tiết ý nghĩa và cách dùng trong ngữ cảnh câu văn / ví dụ.
2. Phân tích rõ ĐỐI TƯỢNG GIAO TIẾP: Từ này thường nói với ai (người trẻ, bạn bè, người cùng tuổi, thầy cô giáo, cấp trên, giám khảo...).
3. Trình bày dưới dạng BẢNG GIẢI THÍCH rõ ràng, có icon sinh động, bắt buộc gồm ĐỦ 5 CỘT:
   - 🎯 Tình huống / Ngữ cảnh sử dụng (Context & Situation)
   - 👥 Đối tượng giao tiếp phù hợp / Thường nói với ai (Target Audience: người trẻ/bạn bè, người cùng tuổi, thầy cô giáo, cấp trên, giám khảo... kèm sắc thái xưng hô)
   - 💬 Câu hỏi / Câu đối thoại mẫu chứa từ này (Example Sentence)
   - 🇻🇳 Dịch nghĩa của ví dụ giải thích theo các ngữ cảnh sử dụng (Vietnamese Translation)
   - 💡 Phân tích lý do dùng & Điểm cộng từ vựng (Vocabulary Impact & Band Boost)

Hãy giải thích lần lượt từng từ/cụm từ thật chi tiết, trực quan và đầy đủ!`;
};

/**
 * ==============================================================================
 * 2. PROMPT TẠO KỊCH BẢN ĐỐI THOẠI 20 CÂU NGẮN TỰ NHIÊN (DIALOGUE PROMPT)
 * ==============================================================================
 */

/**
 * Tạo kịch bản hội thoại 20 câu ngắn cho 1 CỤM TỪ / TỪ RIÊNG LẺ (Tự tra hội thoại từng từ)
 */
export const buildDialoguePromptForChunk = (
  chunk: AnnotatedPhraseChunk,
  questionContext?: string
): string => {
  const contextStr = questionContext ? `trong bối cảnh chủ đề: "${questionContext}"` : '';

  return `[💬 PROMPT TẠO ĐOẠN HỘI THOẠI 20 CÂU NGẮN TỰ NHIÊN CHO TỪ VỰNG]
Mục tiêu: Tạo một kịch bản giao tiếp đời thực tự nhiên, ngắn gọn ứng dụng từ/cụm từ:
👉 TỪ / CỤM TỪ TRỌNG TÂM: "${chunk.englishText}" (${chunk.vietnameseMeaning || 'Nghĩa theo ngữ cảnh'}) ${contextStr}

YÊU CẦU ĐẶC BIỆT DÀNH CHO BIÊN KỊCH NGÔN NGỮ BẢN XỨ:
1. 👥 XÁC ĐỊNH ĐỐI TƯỢNG GIAO TIẾP PHÙ HỢP:
   - Hãy chọn 1 cặp nhân vật phù hợp nhất với cụm từ này (Ví dụ: 2 người bạn trẻ cùng tuổi, hoặc Sinh viên nói chuyện với Giáo viên của mình, hoặc 2 đồng nghiệp tại chỗ làm).
   - Nêu rõ: Tên 2 nhân vật, vai trò, mối quan hệ và hoàn cảnh diễn ra cuộc trò chuyện.

2. 🌿 TÍNH TỰ NHIÊN CỦA ĐOẠN ĐỐI THOẠI:
   - Bắt đầu từ đoạn CHÀO HỎI tự nhiên, thân mật hoặc lịch sự đúng với đối tượng.
   - ĐẶT VẤN ĐỀ / MỞ ĐẦU câu chuyện mượt mà (không gượng ép, không như đọc bài văn).
   - TRAO ĐỔI / TRANH LUẬN / CHIA SẺ cảm xúc thực tế, trong đó CÓ SỬ DỤNG tự nhiên cụm từ "${chunk.englishText}" (In đậm từ này).
   - KẾT THÚC cuộc trò chuyện tự nhiên (hẹn gặp, đồng ý giải pháp, chào tạm biệt).

3. 📏 ĐỘ DÀI & ĐỊNH DẠNG:
   - Khoảng 20 CÂU ĐỐI THOẠI NGẮN (tương đương 10 lượt qua lại giữa 2 nhân vật: A - B - A - B...).
   - Câu ngắn gọn, súc tích, ngữ điệu nói đời thường (spoken English), không dùng câu dài lê thê như văn viết.
   - Trình bày SONG NGỮ: Mỗi lượt thoại có tiếng Anh kèm ngay bản dịch tiếng Việt tự nhiên phía dưới.
   - In đậm từ/cụm từ mục tiêu "${chunk.englishText}" và highlight các cụm từ nối tự nhiên.`;
};

/**
 * Tạo kịch bản hội thoại 20 câu ngắn cho CẢ CÂU (Lồng ghép toàn bộ các từ trong câu)
 */
export const buildDialoguePromptForChunks = (
  chunks: AnnotatedPhraseChunk[],
  questionContext?: string
): string => {
  const fullSentence = chunks.map((c) => c.englishText).join(' ');
  const vocabListStr = chunks.map((c, i) => `${i + 1}. "${c.englishText}" (${c.vietnameseMeaning})`).join('\n');
  const contextStr = questionContext ? `\n- Bối cảnh chủ đề / đề bài: "${questionContext}"` : '';

  return `[💬 PROMPT TẠO ĐOẠN HỘI THOẠI 20 CÂU NGẮN TỰ NHIÊN CHO CẢ CÂU VĂN]
- Câu gốc hoàn chỉnh: "${fullSentence}"${contextStr}
- Danh sách các cụm từ cần lồng ghép:
${vocabListStr}

YÊU CẦU ĐỐI VỚI CHUYÊN GIA BIÊN KỊCH TIẾNG ANH GIAO TIẾP:
1. 👥 THIẾT KẾ BỐI CẢNH & NHÂN VẬT GIAO TIẾP:
   - Chọn đối tượng phù hợp nhất (người trẻ, bạn bè cùng tuổi, thầy cô giáo hoặc đồng nghiệp).
   - Nêu rõ hoàn cảnh thực tế mà 2 nhân vật đang gặp nhau nói chuyện.

2. 🌿 TIẾN TRÌNH HỘI THOẠI ĐỜI THỰC:
   - Chào hỏi tự nhiên -> Đặt vấn đề / bắt đầu câu chuyện -> Bàn luận sâu (lồng ghép các từ vựng trên một cách mượt mà nhất) -> Kết thúc tự nhiên.
   - Khoảng 20 CÂU ĐỐI THOẠI NGẮN (10 lượt qua lại A - B), câu ngắn gọn, văn phong nói tự nhiên, không diễn thuyết.

3. 📖 ĐỊNH DẠNG SONG NGỮ ANH - VIỆT:
   - Từng câu đối thoại có tiếng Anh và bản dịch tiếng Việt đối ứng.
   - In đậm các từ vựng mục tiêu khi xuất hiện trong lời thoại.`;
};

/**
 * Tạo kịch bản hội thoại 20 câu ngắn cho 1 TỪ VỰNG trong bảng từ vựng gợi ý
 */
export const buildDialoguePromptForVocabItem = (item: IeltsVocabItem): string => {
  return `[💬 PROMPT TẠO ĐOẠN HỘI THOẠI 20 CÂU NGẮN TỰ NHIÊN CHO TỪ VỰNG GỢI Ý]
👉 TỪ / CỤM TỪ CẦN LUYỆN TẬP: "${item.word}" (${item.meaning})
- Câu ví dụ mẫu: "${item.visualSentence}"
- Dịch nghĩa ví dụ: "${item.sentenceMeaning || 'Nghĩa ngữ cảnh'}"

YÊU CẦU:
1. 👥 Chọn 1 loại đối tượng giao tiếp phù hợp (bạn bè người trẻ, người cùng tuổi, hoặc thầy cô giáo/cấp trên).
2. Viết đoạn hội thoại tự nhiên khoảng 20 CÂU ĐỐI THOẠI NGẮN (10 lượt trao đổi giữa 2 nhân vật):
   - Chào hỏi tự nhiên.
   - Đặt vấn đề / mở đầu câu chuyện.
   - Bàn luận có sử dụng tự nhiên từ "${item.word}" (In đậm).
   - Kết thúc cuộc trò chuyện ngắn gọn, tự nhiên.
3. Trình bày SONG NGỮ Anh - Việt cho từng câu đối thoại.`;
};

/**
 * Tạo kịch bản hội thoại 20 câu ngắn cho TOÀN BỘ BẢNG TỪ VỰNG GỢI Ý
 */
export const buildDialoguePromptForVocabList = (
  vocabList: IeltsVocabItem[],
  topicOrQuestion?: string
): string => {
  const vocabItemsStr = vocabList
    .map((v, i) => `${i + 1}. "${v.word}" - ${v.meaning}`)
    .join('\n');
  const topicStr = topicOrQuestion ? `Chủ đề / Đề bài: "${topicOrQuestion}"\n` : '';

  return `[💬 PROMPT TẠO ĐOẠN HỘI THOẠI 20 CÂU NGẮN TỰ NHIÊN - TOÀN BỘ TỪ VỰNG GỢI Ý]
${topicStr}- Tổng số từ vựng: ${vocabList.length} từ
Danh sách từ vựng cần tích hợp vào cuộc trò chuyện:
${vocabItemsStr}

YÊU CẦU:
1. 👥 Xác định 2 nhân vật giao tiếp phù hợp (ví dụ: 2 người bạn cùng tuổi, hoặc học sinh với thầy cô, hoặc 2 đồng nghiệp trẻ).
2. Xây dựng một cuộc trò chuyện khoảng 20 CÂU ĐỐI THOẠI NGẮN (10 lượt qua lại):
   - Đầy đủ: Chào hỏi tự nhiên -> Đặt vấn đề -> Trao đổi sôi nổi lồng ghép tự nhiên các từ vựng trên -> Kết thúc.
   - Câu thoại ngắn gọn, văn phong nói tự nhiên (không học vẹt, không văn viết).
   - Song ngữ Anh - Việt cho từng câu. In đậm các từ vựng mục tiêu.`;
};

/**
 * Tạo kịch bản hội thoại 20 câu ngắn cho CẢ ĐỀ BÀI + BÀI MẪU + TỪ VỰNG (Áp dụng cho mọi Part Speaking & Writing)
 */
export const buildDialoguePromptForLesson = (params: {
  topic?: string;
  question: string;
  part: IeltsQuestionPartType | string;
  fullAnswer: string;
  vocabList?: IeltsVocabItem[];
}): string => {
  const isWriting = params.part.includes('Writing');
  const vocabSummary = params.vocabList && params.vocabList.length > 0
    ? params.vocabList.map((v) => `- "${v.word}" (${v.meaning})`).join('\n')
    : '(Sử dụng từ vựng then chốt trong bài mẫu)';

  return `[💬 PROMPT KỊCH BẢN HỘI THOẠI 20 CÂU ĐỐI THOẠI NGẮN TỰ NHIÊN - IELTS ${params.part.toUpperCase()}]
📋 THÔNG TIN BÀI HỌC:
- Phần thi: ${params.part} ${isWriting ? '(Kỹ năng Viết)' : '(Kỹ năng Nói)'}
- Đề bài / Câu hỏi: "${params.question}"
- Bài mẫu Band 8.0+: 
"${params.fullAnswer.substring(0, 500)}..."
- Từ vựng gợi ý:
${vocabSummary}

================================================================================
YÊU CẦU ĐẶC BIỆT DÀNH CHO BIÊN KỊCH HỘI THOẠI BẢN XỨ:
Thay vì chỉ đọc bài luận/bài nói một chiều, hãy chuyển thể đề bài này thành một CUỘC ĐỐI THOẠI ĐỜI THỰC TỰ NHIÊN:
1. 👥 XÁC ĐỊNH ĐỐI TƯỢNG GIAO TIẾP:
   - Với đề tài này trong đời sống, người ta thường nói chuyện với loại người như thế nào? (Người trẻ, bạn bè cùng tuổi, đồng nghiệp, hay thảo luận học thuật với thầy cô giáo của mình...).
   - Giới thiệu 2 nhân vật (Tên, vai trò, địa điểm gặp gỡ).

2. 🌿 TIẾN TRÌNH HỘI THOẠI TỰ NHIÊN:
   - 1. Chào hỏi tự nhiên & hỏi thăm (Casual/Polite greeting).
   - 2. Đặt vấn đề / Mở đầu chủ đề liên quan đến đề bài này (Breaking the ice & introducing the topic).
   - 3. Bàn luận, đưa ra ý kiến, phản biện, kể ví dụ thực tế (lồng ghép tự nhiên các ý tưởng & từ vựng trên).
   - 4. Kết thúc cuộc trò chuyện ngắn gọn, tự nhiên.

3. 📏 ĐỘ DÀI & ĐỊNH DẠNG:
   - Tầm 20 CÂU ĐỐI THOẠI NGẮN (khoảng 10 lượt trao đổi qua lại giữa Nhân vật A và Nhân vật B).
   - Câu ngắn gọn đời thường (1-2 câu mỗi lượt thoại), súc tích, không diễn thuyết.
   - Định dạng SONG NGỮ: Từng câu tiếng Anh có ngay câu tiếng Việt dịch tự nhiên phía dưới.
   - In đậm từ vựng trọng tâm.`;
};
