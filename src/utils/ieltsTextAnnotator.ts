/**
 * IELTS Text & Speech Annotator Engine (Bite-sized Phrasal Analysis)
 * Tách các câu văn và cụm từ trong IELTS Writing & Speaking thành các đơn vị học thuật siêu nhỏ (Tối đa 5-6 từ)
 * Mỗi cụm đều có Icon trực quan liên quan, nghĩa tiếng Việt và lý do tại sao từ/cấu trúc đó được viết vào bài.
 */

export interface AnnotatedPhraseChunk {
  id: string;
  icon: string;
  englishText: string;
  vietnameseMeaning: string;
  purpose: string; // Lý do tác giả viết/nói từ này vào bài thi (Band 8.0+ Impact)
  categoryTag: 'Lexical' | 'Cohesion' | 'Grammar' | 'Overview' | 'DataHighlight' | 'Fluency' | 'General';
}

/**
 * Tách một chuỗi văn bản thành các cụm từ nhỏ tối đa 5 - 6 từ
 * Ưu tiên ngắt tại dấu câu, liên từ, giới từ, mệnh đề quan hệ
 */
export function splitIntoBiteSizedPhrases(text: string, maxWords = 6): string[] {
  if (!text.trim()) return [];

  // Bước 1: Tách sơ bộ theo dấu phẩy, chấm phẩy, hai chấm, gạch nối
  const baseSegments = text
    .split(/(?<=[,;:—])\s+|\s+[—–]\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const results: string[] = [];

  for (const seg of baseSegments) {
    const words = seg.split(/\s+/).filter(Boolean);
    if (words.length <= maxWords) {
      results.push(seg);
      continue;
    }

    // Bước 2: Tách sâu theo các mốc ngữ pháp tự nhiên (giới từ, liên từ, động từ phân từ, đại từ quan hệ)
    const subSegments = seg
      .split(/(?=\b(?:across|at|in|on|over|by|with|for|from|to|into|between|among|around|near|within|throughout|and|but|while|whereas|before|after|where|which|that|who|whose|starting in|finishing in|situated in|located in|embarking on|peaking at|resulting in|leading to|due to|owing to|such as)\b)/i)
      .map((s) => s.trim())
      .filter(Boolean);

    for (const sub of subSegments) {
      const subWords = sub.split(/\s+/).filter(Boolean);
      if (subWords.length <= maxWords) {
        results.push(sub);
      } else {
        // Bước 3: Nếu một vế vẫn dài hơn maxWords (ví dụ 8-10 từ liền nhau), tách thành từng khối 4-6 từ
        let temp: string[] = [];
        for (const w of subWords) {
          temp.push(w);
          if (temp.length >= maxWords) {
            results.push(temp.join(' '));
            temp = [];
          }
        }
        if (temp.length > 0) {
          results.push(temp.join(' '));
        }
      }
    }
  }

  return results.filter(Boolean);
}

// Thư viện quy tắc nhận diện Icon, Dịch nghĩa và Ý nghĩa bài thi cho từng cụm từ nhỏ
interface AnnotationRule {
  pattern: RegExp;
  icon: string;
  vi: string;
  purpose: string;
  tag: AnnotatedPhraseChunk['categoryTag'];
}

const PHRASE_RULES: AnnotationRule[] = [
  // 1. Mở bài & Dẫn nhập
  {
    pattern: /^(The provided line graph|The given bar chart|The supplied map|The diagram illustrates|The table presents|The chart demonstrates)/i,
    icon: '📊',
    vi: 'Biểu đồ được cung cấp thể hiện',
    purpose: 'Mở đầu bài viết bằng cách paraphrase lại đề thi học thuật, không chép lại nguyên văn đề bài.',
    tag: 'Lexical'
  },
  {
    pattern: /\b(attendance figures|number of participants|proportion of|percentage of|amount of)\b/i,
    icon: '👥',
    vi: 'số liệu người tham gia / tỷ lệ',
    purpose: 'Dùng danh từ học thuật chính xác chỉ đối tượng khảo sát thay cho các từ đơn giản như "people".',
    tag: 'Lexical'
  },
  {
    pattern: /\b(recreational activities|leisure pursuits|sporting events|extracurricular activities)\b/i,
    icon: '🎪',
    vi: 'các hoạt động giải trí',
    purpose: 'Cụm danh từ học thuật chỉ các loại hình vui chơi giải trí theo đúng ngữ cảnh đề thi.',
    tag: 'Lexical'
  },
  {
    pattern: /\b(community centre|social centre|educational institution|facility)\b/i,
    icon: '🏢',
    vi: 'tại trung tâm cộng đồng',
    purpose: 'Xác định địa điểm và bối cảnh xảy ra các hoạt động được phân tích.',
    tag: 'General'
  },
  {
    pattern: /\b(situated in|located in|nestled in|based in)\b/i,
    icon: '📍',
    vi: 'tọa lạc tại / nằm ở',
    purpose: 'Sử dụng mệnh đề quan hệ rút gọn dạng bị động (P2) để nâng điểm Grammatical Range.',
    tag: 'Grammar'
  },
  {
    pattern: /\b(over a two-decade period|throughout the period|between \d{4} and \d{4}|over the span of)\b/i,
    icon: '⏳',
    vi: 'trong suốt giai đoạn 2 thập kỷ',
    purpose: 'Diễn đạt mốc thời gian học thuật (20 năm = two-decade period), tránh lặp lại cấu trúc "for 20 years".',
    tag: 'DataHighlight'
  },
  {
    pattern: /\b(starting in \d{4}|commencing in \d{4}|beginning in \d{4})\b/i,
    icon: '🚀',
    vi: 'bắt đầu từ năm...',
    purpose: 'Mệnh đề hiện tại phân từ (V-ing) chỉ mốc khởi đầu của chuỗi khảo sát số liệu.',
    tag: 'DataHighlight'
  },

  // 2. Tổng quan (Overview) & Liên từ mạch lạc
  {
    pattern: /^(Overall|In general|Broadly speaking|Taken as a whole)/i,
    icon: '🎯',
    vi: 'Nhìn chung tổng thể',
    purpose: 'Mở đầu đoạn Tổng quan (Overview) - Tiêu chí tiên quyết bắt buộc để đạt Band 7.0+ Task 1.',
    tag: 'Overview'
  },
  {
    pattern: /\b(by far the most|the most consistently popular|the predominant)\b/i,
    icon: '👑',
    vi: 'vượt trội nhất / phổ biến ổn định nhất',
    purpose: 'Cấu trúc so sánh bậc nhất nhấn mạnh (by far the most) tạo điểm nhấn đắt giá cho Overview.',
    tag: 'Lexical'
  },
  {
    pattern: /^(Concurrently|Simultaneously|At the same time)/i,
    icon: '➕',
    vi: 'Đồng thời / Cùng lúc đó',
    purpose: 'Liên từ nâng cao chỉ sự việc diễn ra song hành, giúp câu văn nối nhịp mượt mà (Cohesion).',
    tag: 'Cohesion'
  },
  {
    pattern: /^(On the one hand|On one hand)/i,
    icon: '⚖️',
    vi: 'Một mặt / Về một phía',
    purpose: 'Bắt đầu phân tích luận điểm thứ nhất trong bài nghị luận thảo luận 2 chiều (Coherence).',
    tag: 'Cohesion'
  },
  {
    pattern: /^(On the other hand|In contrast|Conversely|On the contrary)/i,
    icon: '🔄',
    vi: 'Mặt khác / Ngược lại',
    purpose: 'Chuyển giao đối lập sang luận điểm thứ hai, tạo tính cân bằng và logic học thuật.',
    tag: 'Cohesion'
  },
  {
    pattern: /^(Furthermore|Moreover|In addition|Additionally)/i,
    icon: '🔗',
    vi: 'Hơn nữa / Thêm vào đó',
    purpose: 'Bổ sung thêm luận cứ bổ trợ, tăng điểm liên kết đoạn Coherence & Cohesion.',
    tag: 'Cohesion'
  },
  {
    pattern: /^(However|Nevertheless|Nonetheless|Despite this)/i,
    icon: '⚠️',
    vi: 'Tuy nhiên / Dẫu vậy',
    purpose: 'Tạo bước ngoặt nhượng bộ logic hoặc phản biện trong lập luận.',
    tag: 'Cohesion'
  },
  {
    pattern: /^(Consequently|Therefore|Thus|Hence|As a result)/i,
    icon: '⚡',
    vi: 'Do đó / Kết quả là',
    purpose: 'Chỉ ra hệ quả tất yếu từ nguyên nhân trước đó (Cause & Effect reasoning).',
    tag: 'Cohesion'
  },
  {
    pattern: /^(In conclusion|To conclude|In summary|Ultimately)/i,
    icon: '🏁',
    vi: 'Tóm lại / Kết luận',
    purpose: 'Mở đầu đoạn Kết bài, khẳng định lại lập trường (Thesis) để trọn vẹn Task Achievement.',
    tag: 'Overview'
  },
  {
    pattern: /^(Focusing on|Turning to|Regarding|With respect to|As for)/i,
    icon: '🔍',
    vi: 'Tập trung vào / Xét về khía cạnh',
    purpose: 'Cụm điều hướng sự chú ý của giám khảo sang nhóm số liệu hoặc luận cứ tiếp theo.',
    tag: 'Cohesion'
  },

  // 3. Xu hướng & Số liệu (Trends & Movement)
  {
    pattern: /\b(threefold rise|threefold increase|surged dramatically|skyrocketed|soared to)\b/i,
    icon: '📈',
    vi: 'tăng gấp 3 lần / tăng bùng nổ',
    purpose: 'Dùng cụm danh/động từ mạnh miêu tả bước nhảy vọt ấn tượng của số liệu (Band 8+ Lexical).',
    tag: 'DataHighlight'
  },
  {
    pattern: /\b(peaked at|reached a peak of|reaching the highest)\b/i,
    icon: '🏔️',
    vi: 'đạt đỉnh điểm ở mức...',
    purpose: 'Chỉ ra giá trị cực đại (peak) của biểu đồ kèm giới từ chuẩn xác "at".',
    tag: 'DataHighlight'
  },
  {
    pattern: /\b(steep contraction|continuous downturn|sharp drop|plummeted|plummet)\b/i,
    icon: '📉',
    vi: 'suy giảm mạnh / đà trượt dốc liên tục',
    purpose: 'Miêu tả chính xác đà suy giảm số liệu với tính từ chỉ mức độ ấn tượng.',
    tag: 'DataHighlight'
  },
  {
    pattern: /\b(negligible low|bottomed out at|hit a trough)\b/i,
    icon: '⚓',
    vi: 'mức thấp không đáng kể / chạm đáy',
    purpose: 'Chỉ ra giá trị cực tiểu của chuỗi dữ liệu với thuật ngữ mô tả chuyên sâu.',
    tag: 'DataHighlight'
  },
  {
    pattern: /\b(plateaued remarkably|remained virtually unchanged|stabilized at|levelled off)\b/i,
    icon: '➖',
    vi: 'giữ mức ổn định đi ngang',
    purpose: 'Diễn đạt trạng thái bão hòa/ổn định của số liệu, tránh lỗi chỉ biết dùng tăng/giảm.',
    tag: 'DataHighlight'
  },
  {
    pattern: /\b(minor oscillations|fluctuated marginally|narrow corridor)\b/i,
    icon: '〰️',
    vi: 'những dao động nhỏ / biến động hẹp',
    purpose: 'Mô tả tính chất dao động trong biên độ nhỏ một cách tinh tế và chuẩn học thuật.',
    tag: 'DataHighlight'
  },

  // 4. Luận điểm & Lập trường Task 2 (Opinion & Thesis)
  {
    pattern: /\b(I firmly contend|I whole-heartedly agree|I strongly argue|In my conviction)\b/i,
    icon: '💡',
    vi: 'tôi kiên quyết khẳng định rằng',
    purpose: 'Khẳng định lập trường rõ ràng (Clear thesis stance) xuyên suốt bài thi theo Band Descriptors.',
    tag: 'Overview'
  },
  {
    pattern: /\b(catalyze human flourishing|cornerstone of societal progress|driving force)\b/i,
    icon: '🌟',
    vi: 'chất xúc tác cho sự phát triển con người',
    purpose: 'Collocation học thuật trình độ C1/C2 ghi điểm tối đa về vốn từ Lexical Resource.',
    tag: 'Lexical'
  },
  {
    pattern: /\b(antidote to complacency|antidote to stagnation)\b/i,
    icon: '🛡️',
    vi: 'liều thuốc hóa giải sự tự mãn',
    purpose: 'Phép ẩn dụ học thuật tinh tế, biến lập luận trở nên sắc sảo và cuốn hút.',
    tag: 'Lexical'
  },
  {
    pattern: /\b(zero-sum thinking|toxic workplace politics|cutthroat hostility)\b/i,
    icon: '⚔️',
    vi: 'tư duy kẻ thắng người thua / triệt tiêu lẫn nhau',
    purpose: 'Thuật ngữ xã hội học/tâm lý học sâu sắc chứng minh kiến thức nền vững chắc.',
    tag: 'Lexical'
  },
  {
    pattern: /\b(coalesce for the common good|collaborative synergy|mutual support)\b/i,
    icon: '🤝',
    vi: 'hợp lực vì lợi ích chung',
    purpose: 'Cụm động từ - danh từ đắt giá dùng trong các chủ đề cộng đồng và hợp tác xã hội.',
    tag: 'Lexical'
  }
];

/**
 * Phân tích và gán Icon + Chú thích cho một cụm từ ngắn
 */
function analyzeSingleShortPhrase(
  phrase: string,
  index: number,
  totalInPara: number,
  vocabList?: { word?: string; meaning?: string; term?: string; explanation?: string }[]
): AnnotatedPhraseChunk {
  let assignedIcon = '📝';
  let meaningVi = '';
  let purpose = 'Cung cấp luận cứ và chi tiết bổ trợ cho ý chính của câu văn.';
  let categoryTag: AnnotatedPhraseChunk['categoryTag'] = 'General';

  // 1. Kiểm tra đối chiếu với từ vựng trọng tâm truyền vào (keyVocabulary / lexicalResource)
  if (vocabList && vocabList.length > 0) {
    for (const v of vocabList) {
      const targetWord = (v.word || v.term || '').trim().toLowerCase();
      if (targetWord && phrase.toLowerCase().includes(targetWord)) {
        assignedIcon = '🔑';
        meaningVi = v.meaning || v.explanation || '';
        purpose = `Dùng từ vựng trọng tâm "${targetWord}" để nâng cấp điểm Lexical Resource (Band 8.0+).`;
        categoryTag = 'Lexical';
        return {
          id: `chunk_${index + 1}`,
          icon: assignedIcon,
          englishText: phrase,
          vietnameseMeaning: meaningVi,
          purpose,
          categoryTag
        };
      }
    }
  }

  // 2. Đối chiếu với thư viện quy tắc PHRASE_RULES
  for (const rule of PHRASE_RULES) {
    if (rule.pattern.test(phrase)) {
      assignedIcon = rule.icon;
      meaningVi = rule.vi;
      purpose = rule.purpose;
      categoryTag = rule.tag;
      break;
    }
  }

  // 3. Quy tắc suy luận ngữ cảnh bổ trợ nếu chưa match
  if (assignedIcon === '📝') {
    if (/\b(\d{1,3}%|\d+\s*(participants|members|players|people|tonnes|units))\b/i.test(phrase)) {
      assignedIcon = '🔢';
      meaningVi = 'số liệu dẫn chứng chi tiết';
      purpose = 'Đưa ra số liệu cụ thể làm bằng chứng xác thực (Factual Evidence) bảo vệ luận điểm.';
      categoryTag = 'DataHighlight';
    } else if (/\b(in \d{4}|by \d{4}|between \d{4}|from \d{4})\b/i.test(phrase)) {
      assignedIcon = '⏳';
      meaningVi = 'mốc thời gian diễn ra số liệu';
      purpose = 'Cung cấp mốc thời gian chuẩn xác kèm giới từ phù hợp trong bài báo cáo.';
      categoryTag = 'DataHighlight';
    } else if (/^(which|where|who|whose|that)\b/i.test(phrase)) {
      assignedIcon = '🧩';
      meaningVi = 'mệnh đề quan hệ bổ nghĩa';
      purpose = 'Sử dụng mệnh đề quan hệ để tạo câu phức, ghi điểm tiêu chí Grammatical Range.';
      categoryTag = 'Grammar';
    } else if (/^(because|due to|owing to|since|as)\b/i.test(phrase)) {
      assignedIcon = '🧠';
      meaningVi = 'bởi vì / do nguyên nhân';
      purpose = 'Giải thích nguyên nhân gốc rễ, giúp câu văn có chiều sâu lập luận chặt chẽ.';
      categoryTag = 'Cohesion';
    } else if (/^(and|but|while|whereas|meanwhile)\b/i.test(phrase)) {
      assignedIcon = '⚖️';
      meaningVi = 'liên từ nối / đối chiếu';
      purpose = 'Liên từ tạo sự cân đối hoặc tương phản giữa các vế câu.';
      categoryTag = 'Cohesion';
    } else if (index === 0) {
      assignedIcon = '🌟';
      purpose = 'Vế mở đầu câu, đặt nền móng ngữ cảnh cho thông điệp tiếp theo.';
      categoryTag = 'Fluency';
    } else if (index === totalInPara - 1) {
      assignedIcon = '🎯';
      purpose = 'Vế kết thúc câu, hoàn thiện trọn vẹn ngữ nghĩa và nhịp điệu của câu.';
      categoryTag = 'General';
    }
  }

  return {
    id: `chunk_${index + 1}`,
    icon: assignedIcon,
    englishText: phrase,
    vietnameseMeaning: meaningVi,
    purpose,
    categoryTag
  };
}

/**
 * Tách một đoạn văn Writing thành các cụm từ ngắn (tối đa 5-6 từ), có Icon và giải thích chi tiết
 */
export function annotateWritingParagraph(
  paragraphText: string,
  vocabList?: { word?: string; meaning?: string; term?: string; explanation?: string }[]
): AnnotatedPhraseChunk[] {
  if (!paragraphText.trim()) return [];

  // Tách đoạn văn thành các câu hoàn chỉnh
  const sentences = paragraphText
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const rawPhrases: string[] = [];

  for (const sentence of sentences) {
    // Tách mỗi câu thành các cụm nhỏ tối đa 5-6 từ
    const phraseList = splitIntoBiteSizedPhrases(sentence, 6);
    rawPhrases.push(...phraseList);
  }

  // Gán Icon, Dịch nghĩa và Mục đích học thuật cho từng cụm nhỏ
  return rawPhrases.map((phrase, idx) =>
    analyzeSingleShortPhrase(phrase, idx, rawPhrases.length, vocabList)
  );
}

/**
 * Tách một chuỗi Speaking nối bằng dấu → thành các cụm học thuật ngắn (tối đa 5-6 từ), có Icon và giải thích
 */
export function annotateSpeakingAnswer(
  answerString: string,
  vocabRaw?: string
): AnnotatedPhraseChunk[] {
  if (!answerString.trim()) return [];

  // Tách từ vựng thô: "word - nghĩa"
  const vocabDict: Record<string, string> = {};
  if (vocabRaw) {
    const lines = vocabRaw.split('\n');
    for (const l of lines) {
      const parts = l.split(' - ');
      if (parts[0]) {
        vocabDict[parts[0].trim().toLowerCase()] = (parts.slice(1).join(' - ') || '').trim();
      }
    }
  }

  // Tách chuỗi theo dấu → hoặc xuống dòng
  const baseParts = answerString
    .split(/→|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const allChunks: AnnotatedPhraseChunk[] = [];
  let chunkIndex = 1;

  baseParts.forEach((rawPart) => {
    // Tách icon ở đầu nếu có
    const emojiMatch = rawPart.match(/^([\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]+)\s*(.*)/u);
    let initialIcon = '💬';
    let cleanText = rawPart;

    if (emojiMatch) {
      initialIcon = emojiMatch[1];
      cleanText = emojiMatch[2].trim();
    }

    // Tách cleanText thành các cụm nhỏ tối đa 5-6 từ
    const subPhrases = splitIntoBiteSizedPhrases(cleanText, 6);

    subPhrases.forEach((subText, sIdx) => {
      // Icon cho cụm nhỏ: cụm đầu dùng initialIcon nếu có, các cụm sau nhận diện theo nội dung
      let icon = sIdx === 0 && initialIcon !== '💬' ? initialIcon : '💬';
      let viMeaning = '';
      const lowerText = subText.toLowerCase();

      for (const [vWord, vMean] of Object.entries(vocabDict)) {
        if (lowerText.includes(vWord)) {
          viMeaning = vMean;
          icon = '🔑';
          break;
        }
      }

      // Xác định mục đích / ý nghĩa đưa cụm này vào bài thi Speaking
      let purpose = '';
      let categoryTag: AnnotatedPhraseChunk['categoryTag'] = 'General';

      if (chunkIndex === 1 && sIdx === 0) {
        purpose = 'Từ đệm mở đầu câu trả lời tự nhiên, tạo độ trôi chảy (Fluency) và bắt nhịp tự tin.';
        categoryTag = 'Fluency';
      } else if (chunkIndex === 2 && sIdx === 0) {
        purpose = 'Trả lời trực tiếp và rõ ràng vào trọng tâm câu hỏi (Direct Answer).';
        categoryTag = 'Overview';
      } else if (/^(where|which|who|that|whose|when)\b/i.test(subText)) {
        icon = '🧩';
        purpose = 'Mệnh đề quan hệ phức (Complex Clause) giúp ăn điểm Grammatical Range.';
        categoryTag = 'Grammar';
      } else if (/^(because|since|as|due to|so that)\b/i.test(subText)) {
        icon = '🧠';
        purpose = 'Cung cấp nguyên nhân sâu sắc, tránh câu trả lời cộc lốc thiếu luận cứ.';
        categoryTag = 'Cohesion';
      } else if (/^(and|but|however|although|meanwhile|furthermore)\b/i.test(subText)) {
        icon = '⚖️';
        purpose = 'Liên từ nối giúp câu nói mượt mà, chuyển ý linh hoạt tự nhiên.';
        categoryTag = 'Cohesion';
      } else if (viMeaning) {
        purpose = `Cài cắm từ vựng ăn điểm chủ đề (Topic-specific Collocation) để giám khảo chấm Band 7.5 - 8.5+.`;
        categoryTag = 'Lexical';
      } else if (icon === '💬') {
        icon = '🗣️';
        purpose = 'Bổ sung chi tiết ngữ cảnh cụ thể (Contextual Detail) giúp câu trả lời sống động.';
        categoryTag = 'General';
      } else {
        purpose = 'Vế diễn đạt chi tiết hỗ trợ triển khai ý tưởng trọn vẹn.';
        categoryTag = 'General';
      }

      allChunks.push({
        id: `spk_${chunkIndex++}`,
        icon,
        englishText: subText,
        vietnameseMeaning: viMeaning,
        purpose,
        categoryTag
      });
    });
  });

  return allChunks;
}
