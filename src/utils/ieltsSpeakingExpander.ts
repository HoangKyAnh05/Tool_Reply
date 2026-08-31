/**
 * IELTS Speaking Answer Standardization & Expansion Engine
 * Đảm bảo câu trả lời IELTS Speaking luôn đạt độ dài chuẩn phòng thi:
 * - Part 1: 3 - 5 câu hoàn chỉnh (Direct Answer -> Elaboration -> Example/Reason -> Personal Feeling)
 * - Part 2: 10 - 15 câu hoàn chỉnh (Đầy đủ 4 ý Cue Card cho bài nói 2 phút)
 * - Part 3: 3 - 5 câu hoàn chỉnh (Luận điểm -> Nguyên nhân -> Dẫn chứng thực tế -> Đánh giá tương lai)
 */

interface ExpandedAnswerRecipe {
  matchKeywords: RegExp;
  expandedAnswer: string;
}

// Kho các bài mẫu mở rộng chi tiết cho các câu hỏi thường gặp
const PART2_CURATED_EXPANSIONS: Record<number, string> = {
  // #1: Describe a person you admire a lot
  1: `🌟 Today I would love to talk about my beloved grandmother, who has always been my greatest role model and source of inspiration.
👵 She grew up in a humble rural village during an era of significant socio-economic turmoil.
💪 Despite overcoming tremendous hardships in her early years, she faced every adversity with unwavering resilience and grace.
📚 Although she never had the privilege of receiving higher formal education, her wisdom and emotional intelligence are boundless.
🌾 She spent decades working tirelessly in agriculture while single-handedly nurturing our extended family.
🍲 What I admire most about her is her boundless generosity; she never hesitated to share meals with struggling neighbors.
🤝 Even in her advanced age today, she remains the emotional anchor who unites all generations under our roof.
💡 Whenever I confront setbacks in my academic pursuits or personal life, her patient words always offer profound clarity.
❤️ She taught me that true strength is quiet and that kindness is the most enduring legacy a person can leave behind.
🌸 Watching her live each day with contentment and gratitude has fundamentally shaped my own core values.
🎯 To put it simply, she embodies everything I aspire to become as a compassionate and resilient human being.`,

  // #2: Describe an energetic person you know
  2: `⚡ Today I would love to share a story about my university close friend, Minh, who is widely renowned for his boundless energy.
🏃 We first crossed paths during our freshman orientation week at university nearly four years ago.
🤝 From our very first interaction, his vibrant aura, radiant smile, and cheerful demeanor immediately caught my attention.
🌅 What makes Minh exceptionally energetic is his disciplined daily routine and relentless positive drive.
👟 He consistently wakes up at 5:00 AM every single morning to go for a brisk 10-kilometer jog around the lake.
📚 After that, he heads straight to the campus library to review seminar materials before official morning lectures begin.
💼 Besides maintaining top academic standing in our computer science cohort, he also actively presides over the student leadership council.
🚀 He possesses an extraordinary capacity to multitask effortlessly between demanding software projects and charity campaigns.
😊 I vividly recall during our grueling finals week last semester when everyone was feeling utterly drained and exhausted.
🔥 Minh stepped forward and organized lively group study sessions, bringing healthy snacks and cheering everyone on.
🎉 His infectious enthusiasm and optimism effortlessly lifted the collective spirits of our entire study group.
💡 Whenever I find myself procrastinating or feeling low on motivation, observing his passionate work ethic instantly inspires me.
🎯 He genuinely proves that high energy is not just a genetic gift, but a conscious lifestyle choice driven by purpose.
🌟 All in all, having such an energetic companion has profoundly elevated my own personal standards and daily productivity.`
};

/**
 * Đếm số câu hoàn chỉnh trong văn bản (dựa trên dấu chấm, chấm hỏi, chấm than)
 */
export function countSentences(text: string): number {
  if (!text) return 0;
  // Làm sạch các mũi tên → hoặc dấu gạch đầu dòng
  const clean = text.replace(/→/g, '. ').replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
  const sentences = clean
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);
  return sentences.length;
}

/**
 * Tự động chuẩn hóa và mở rộng câu trả lời Speaking theo đúng tiêu chuẩn số câu:
 * - Part 1: 3 - 5 câu
 * - Part 2: 10 - 15 câu
 * - Part 3: 3 - 5 câu
 */
export function getStandardizedSpeakingAnswer(
  part: string,
  question: string,
  currentAnswer: string,
  vocabRaw?: string,
  cueCardPrompt?: string,
  itemId?: number | string
): string {
  if (!currentAnswer) return '';

  const sentenceCount = countSentences(currentAnswer);

  // 1. XỬ LÝ PART 2: Cần từ 10 đến 15 câu
  if (part === 'Part 2' || part.includes('Part 2')) {
    // Nếu đã có bài viết chuẩn bị sẵn trong danh mục curated
    const numId = typeof itemId === 'number' ? itemId : parseInt(String(itemId), 10);
    if (!isNaN(numId) && PART2_CURATED_EXPANSIONS[numId]) {
      return PART2_CURATED_EXPANSIONS[numId];
    }

    // Nếu bài hiện tại đã đủ 10 câu trở lên thì giữ nguyên
    if (sentenceCount >= 10) {
      return currentAnswer;
    }

    // Mở rộng bài Part 2 lên 10 - 13 câu hoàn chỉnh
    return expandPart2Answer(question, currentAnswer, vocabRaw, cueCardPrompt);
  }

  // 2. XỬ LÝ PART 1: Cần từ 3 đến 5 câu
  if (part === 'Part 1' || part.includes('Part 1')) {
    if (sentenceCount >= 3 && sentenceCount <= 6) {
      return currentAnswer;
    }
    return expandPart1Answer(question, currentAnswer, vocabRaw);
  }

  // 3. XỬ LÝ PART 3: Cần từ 3 đến 5 câu
  if (part === 'Part 3' || part.includes('Part 3')) {
    if (sentenceCount >= 3 && sentenceCount <= 6) {
      return currentAnswer;
    }
    return expandPart3Answer(question, currentAnswer, vocabRaw);
  }

  return currentAnswer;
}

/**
 * Mở rộng câu trả lời Part 1 lên 3 - 5 câu hoàn chỉnh
 */
function expandPart1Answer(question: string, rawAnswer: string, vocabRaw?: string): string {
  // Bỏ icon và dấu → để lấy nội dung cốt lõi
  const cleanCore = rawAnswer
    .replace(/→/g, ' ')
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .trim();

  // Trích xuất từ vựng chính
  const vocabItems = vocabRaw
    ? vocabRaw.split('\n').map((l) => l.split(' - ')[0].trim()).filter(Boolean)
    : [];
  const vocabHighlight = vocabItems.slice(0, 2).join(' and ');

  return `💼 To be completely honest, ${cleanCore.replace(/\.$/, '')}.
⏰ In my daily routine, I dedicate consistent time to this because it directly stimulates my productivity.
${vocabHighlight ? `💡 Engaging with ${vocabHighlight} allows me to maintain a healthy mental focus.` : '🌟 Furthermore, it gives me a genuine sense of accomplishment after exhausting working hours.'}
🎯 Looking ahead, I certainly plan to maintain this positive habit as an essential part of my lifestyle.`;
}

/**
 * Mở rộng câu trả lời Part 3 lên 3 - 5 câu phân tích chuyên sâu
 */
function expandPart3Answer(question: string, rawAnswer: string, vocabRaw?: string): string {
  const cleanCore = rawAnswer
    .replace(/→/g, ' ')
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .trim();

  const vocabItems = vocabRaw
    ? vocabRaw.split('\n').map((l) => l.split(' - ')[0].trim()).filter(Boolean)
    : [];
  const primaryVocab = vocabItems[0] || 'structural transformation';
  const secondaryVocab = vocabItems[1] || 'equitable long-term policies';

  return `🌐 From an analytical perspective, ${cleanCore.replace(/\.$/, '')}.
⚡ The primary underlying driver behind this phenomenon is the rapid emergence of ${primaryVocab}, which alters conventional societal norms.
📊 For instance, empirical evidence across urban economies shows that when institutions fail to adapt, severe disparity and bottlenecks inevitably occur.
🤝 Therefore, forward-looking stakeholders must proactively implement ${secondaryVocab} to ensure sustainable and inclusive development.
🎯 Ultimately, striking a balanced equilibrium between technological convenience and human well-being remains the quintessential imperative of our time.`;
}

/**
 * Mở rộng bài nói Part 2 lên 10 - 14 câu hoàn chỉnh theo cấu trúc Cue Card 4 phần
 */
function expandPart2Answer(
  question: string,
  rawAnswer: string,
  vocabRaw?: string,
  cueCardPrompt?: string
): string {
  const cleanCore = rawAnswer
    .replace(/→/g, ' ')
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .trim();

  const vocabItems = vocabRaw
    ? vocabRaw.split('\n').map((l) => l.split(' - ')[0].trim()).filter(Boolean)
    : [];
  const v1 = vocabItems[0] || 'profound personal significance';
  const v2 = vocabItems[1] || 'unwavering commitment';
  const v3 = vocabItems[2] || 'transformative experience';

  return `🌟 Today, I would like to share a detailed account regarding this topic, which holds ${v1} for me.
📍 When thinking about ${question.toLowerCase().replace(/\.$/, '')}, this particular experience instantly springs to my mind.
🤝 I first encountered this situation nearly three years ago during an important transitional phase of my life.
🏡 At that time, the circumstances were quite demanding, requiring immense focus and adaptability.
✨ What made the entire experience truly unforgettable was the presence of ${v2}.
📚 On a daily basis, it pushed me beyond my conventional comfort zone and tested my mental stamina.
💼 I vividly recall a specific occasion where obstacles seemed almost insurmountable, yet perseverance eventually prevailed.
🔥 Working through those moments demanded rapid decision-making alongside collaborative teamwork.
😊 Looking back, that journey fostered a tremendous sense of ${v3} that reshaped my worldview.
💡 It fundamentally taught me that difficult challenges often disguise the greatest opportunities for self-discovery.
❤️ Beyond the tangible accomplishments, the emotional memories and bonds formed during that period remain deeply cherished.
🎯 Whenever I face new dilemmas today, recalling those valuable lessons provides me with renewed confidence.
🌈 All in all, it stands out as one of the most enriching chapters that will continue to guide my future aspirations.`;
}
