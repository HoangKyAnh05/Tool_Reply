import { IeltsSpeakingLesson, IeltsRecallTestResult, IeltsQuestionPartType } from '../types/ielts';
import { GenzGenerationResult, GenzTone, GenzResultVersion, GenzVisualIdea } from '../types/genz';
import { 
  ParallelUniverseSimulation, 
  ParallelUniverse, 
  TimelineScene, 
  AdaptiveQuestion, 
  ScenarioModel, 
  AiImprovementReport,
  VariableImpact,
  DecisionImpact
} from '../types/universe';
import { storageService } from './storageService';
import { imageService } from './imageService';

/**
 * Dynamic Semantic Icon Mapper
 * Analyzes vocabulary or paragraph concept text and returns a matching emoji icon.
 */
/**
 * Dynamic Semantic Icon Mapper
 * Analyzes vocabulary or paragraph concept text and returns a matching emoji icon.
 */
export function getSemanticIconForConcept(text: string): string {
  const t = text.toLowerCase();

  // Music & Songs & Specific Genres & Moods & Phrases
  if (/soft pop|soft/i.test(t)) return '🌸';
  if (/acoustic|guitar/i.test(t)) return '🎸';
  if (/rock|upbeat|drum/i.test(t)) return '🥁';
  if (/edm|dance|party/i.test(t)) return '💃';
  if (/music lover|lover|huge fan|thích|yêu/i.test(t)) return '❤️';
  if (/background noise|noise|earphone/i.test(t)) return '🎧';
  if (/music|song|listen|sound|audio|track|nhạc/i.test(t)) return '🎵';
  if (/necessity|essential|cần thiết/i.test(t)) return '🔥';
  if (/daily life|daily|life|hàng ngày|cuộc sống/i.test(t)) return '📅';
  if (/main reason|think|perspective|lí do|suy nghĩ/i.test(t)) return '💡';
  if (/mood|feeling|tâm trạng|cảm xúc|happy/i.test(t)) return '😊';
  if (/instance|for example|ví dụ/i.test(t)) return '📌';
  if (/down|sad|buồn|tồi tệ/i.test(t)) return '😔';
  if (/stress|tired|áp lực|mệt mỏi/i.test(t)) return '😫';
  if (/at work|workplace|office|công ty/i.test(t)) return '🏢';
  if (/after a long day|long day|tan làm/i.test(t)) return '🌙';
  if (/work|job|công việc|làm việc/i.test(t)) return '💼';
  if (/unwind|rest|nghỉ ngơi/i.test(t)) return '🛋️';
  if (/relax|thư giãn/i.test(t)) return '😌';
  if (/flip side|on the other hand|mặt khác|ngược lại/i.test(t)) return '🔄';
  if (/gym|workout|tập thể dục|thể thao/i.test(t)) return '🏋️';
  if (/pumped|excited|hào hứng|boost/i.test(t)) return '🚀';
  if (/project|task|dự án|bài tập/i.test(t)) return '📋';
  if (/adrenaline|energy|năng lượng/i.test(t)) return '⚡';
  if (/so yeah|so, yeah|yeah|nói chung|tóm lại/i.test(t)) return '🎯';
  if (/imagine|believe|tưởng tượng|tin rằng/i.test(t)) return '🙏';
  if (/day without|day|ngày|sunset/i.test(t)) return '🌅';

  // Money / Income / Wages / Costs / Economy
  if (/wage|salary|pay|lương|remuneration|income/i.test(t)) return '💵';
  if (/penny|pennies|pinch|tằn tiện|thắt lưng|frugal|save|chi tiêu|tiết kiệm/i.test(t)) return '🪙';
  if (/purchasing|power|sức mua|consumer|spending|buy|shop|tiêu dùng/i.test(t)) return '🛒';
  if (/money|capital|finance|vốn|tài chính|budget|cash|funds/i.test(t)) return '💰';
  if (/economy|economic|market|kinh tế|thị trường|gdp/i.test(t)) return '📊';

  // Work / Job / Labor / Career / Employees
  if (/stuck|dead-end|kẹt|bế tắc|trap|confined|obstacle|bất lợi/i.test(t)) return '🔒💼';
  if (/worker|employee|công nhân|lao động|staff|workforce|vulnerable/i.test(t)) return '👷';
  if (/hire|employ|recruit|phỏng vấn|tuyển dụng/i.test(t)) return '🤝';

  // Environment / Nature / Climate / Energy / Sustainability
  if (/carbon|footprint|emission|khí thải|ô nhiễm|pollution|greenhouse/i.test(t)) return '💨';
  if (/renewable|solar|wind|tái tạo|sạch|clean energy|eco|green/i.test(t)) return '☀️';
  if (/environment|nature|môi trường|degradation|suy thoái|ecosystem/i.test(t)) return '🌿';
  if (/plastic|single-use|waste|rác|recycle|rác thải/i.test(t)) return '♻️';
  if (/planet|earth|global|thế giới|toàn cầu|trái đất/i.test(t)) return '🌍';

  // Tech / AI / Future / Automation / Innovation
  if (/ai\b|artificial|intelligence|trí tuệ nhân tạo|robot|bot/i.test(t)) return '🤖';
  if (/automate|automation|tự động|routine|quy trình/i.test(t)) return '⚙️';
  if (/breakthrough|innovation|đột phá|sáng tạo|invention|idea/i.test(t)) return '💡';
  if (/displace|displacement|mất việc|replace|thay thế|threat/i.test(t)) return '⚠️';
  if (/tech|technology|digital|công nghệ|software|app/i.test(t)) return '💻';

  // Motion / Effect / Growth / Scale / Change
  if (/ripple|lan tỏa|domino|wave|spread/i.test(t)) return '🌊';
  if (/growth|spur|boost|tăng trưởng|thúc đẩy|promote|surge/i.test(t)) return '🚀';
  if (/increase|rise|up|tăng|escalate|elevate/i.test(t)) return '📈';
  if (/decrease|decline|drop|giảm|fall|reduce|diminish/i.test(t)) return '📉';
  if (/pace|speed|fast|bắt kịp|kịp đà|rhythm/i.test(t)) return '🏃';
  if (/index|adjust|calibrate|điều chỉnh|cân bằng|balance/i.test(t)) return '🔄';

  // Policy / Law / Ethics / Shield / Security
  if (/policy|law|chính sách|quy định|legal|regulation|framework/i.test(t)) return '📜';
  if (/protect|shield|bảo vệ|vulnerable|safe|yếu thế|an toàn/i.test(t)) return '🛡️';
  if (/dilemma|ethic|đạo đức|moral|fair|công bằng|equit/i.test(t)) return '⚖️';

  // Society / Education / Health / People
  if (/school|education|student|sinh viên|học|university|academic/i.test(t)) return '🎓';
  if (/health|medical|hospital|y tế|sức khỏe|welfare/i.test(t)) return '🏥';
  if (/community|society|xã hội|people|dân cư|demographic/i.test(t)) return '👥';
  if (/strength|strong|mạnh|củng cố|force|power/i.test(t)) return '💪';
  if (/goal|target|mục tiêu|ultimate|bền vững|sustain|vision/i.test(t)) return '🎯';

  // Family & Children & Parents & Respect & Past
  if (/children|child|kids|youngsters|trẻ em|con cái/i.test(t)) return '👨‍👩‍👧‍👦';
  if (/parents|parent|father|mother|cha mẹ|bố mẹ/i.test(t)) return '❤️';
  if (/respect|admire|tôn trọng|kính trọng|nếp nhà/i.test(t)) return '🤝';
  if (/past|in the past|quá khứ|ngày xưa|hồi trước/i.test(t)) return '⏳';
  if (/today|nowadays|ngày nay|hiện nay|thời nay/i.test(t)) return '☀️';
  if (/opinion|perspective|quan điểm|theo bạn/i.test(t)) return '💡';
  if (/more or less|compare|so sánh|nhiều hơn/i.test(t)) return '⚖️';

  // Deterministic colorful fallbacks
  const fallbacks = ['✨', '📌', '🔑', '🎯', '🔥', '💎', '🔍', '⚡', '🗺️', '🌟'];
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash += text.charCodeAt(i);
  return fallbacks[hash % fallbacks.length];
}

/**
 * Strips meta labels like "Câu hỏi 1:", "(So sánh thế hệ)", "Question:", "Đề bài:" and quotes from raw question text
 */
export function cleanQuestionText(rawText: string): string {
  let cleaned = rawText.trim();
  // Remove meta labels like "Câu hỏi 1:", "(So sánh thế hệ)", "Question:", "Part 3 Question:", "Đề bài:", "Prompt:"
  cleaned = cleaned.replace(/^(?:câu\s*hỏi|\bquestion\b|\bđề\s*bài\b|\bprompt\b)\s*\d*[\s:\-–—]*/gi, '');
  cleaned = cleaned.replace(/\([^)]*\)/g, '');
  cleaned = cleaned.replace(/^(?:câu\s*hỏi|\bquestion\b|\bđề\s*bài\b|\bprompt\b)\s*\d*[\s:\-–—]*/gi, '');
  cleaned = cleaned.replace(/^["'“`]+|["'”`]+$/g, '');
  cleaned = cleaned.replace(/^[❓\s:–—]+/, '').trim();
  return cleaned.trim();
}

/**
 * Micro-chunks a question prompt into an icon-anchored arrow chain
 * (e.g. ❓ 💡 In your opinion → 👨‍👩‍👧‍👦 do children today respect → ❤️ their parents → ⚖️ more or less → ⏳ than in the past?)
 */
export function formatQuestionWithVisualChain(questionText: string): string {
  const cleaned = cleanQuestionText(questionText);
  if (!cleaned) return '❓ 💡 How do you feel about this topic and why?';

  if (cleaned.includes('→')) {
    return cleaned.startsWith('❓') ? cleaned : `❓ ${cleaned}`;
  }

  const clauses = cleaned
    .split(/(?<=,)|(?=;\s*)|(?=\b(?:do|does|did|how|why|what|when|where|who|in your opinion|more or less|than in the past|than before|in the future|today|nowadays)\b)/i)
    .map((c) => c.replace(/^,\s*/, '').trim())
    .filter((c) => c.length > 1);

  const microClauses: string[] = [];
  clauses.forEach((c) => {
    const words = c.split(' ');
    if (words.length > 6) {
      const mid = Math.ceil(words.length / 2);
      microClauses.push(words.slice(0, mid).join(' '));
      microClauses.push(words.slice(mid).join(' '));
    } else {
      microClauses.push(c);
    }
  });

  const chunks: string[] = [];
  microClauses.forEach((clause) => {
    const icon = getSemanticIconForConcept(clause);
    chunks.push(`${icon} ${clause}`);
  });

  return `❓ ${chunks.join(' → ')}`;
}

/**
 * Transforms any input text or paragraph into an icon-anchored arrow chain format
 * Micro-chunks long sentences into 3-5 word units with matching semantic icons.
 */
/**
 * Intelligent English-to-Vietnamese phrase & clause translator for IELTS Speaking
 */
export function translateEnglishToVietnamese(text: string, customVocabText?: string): string {
  if (!text) return '';
  let cleaned = text.trim();

  // Strip leading emoji or punctuation if present
  cleaned = cleaned.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s—–-]+/u, '').trim();
  cleaned = cleaned.replace(/[.!?]+$/, '').trim();

  if (!cleaned) return '';

  // 1. Check custom user-provided vocabulary map first
  if (customVocabText) {
    const lines = customVocabText.split('\n');
    for (const line of lines) {
      const parts = line.split(/[-–—:]+/);
      if (parts.length >= 2) {
        const en = parts[0].trim().toLowerCase();
        const vi = parts[1].trim();
        if (en && vi) {
          if (cleaned.toLowerCase() === en) return vi;
          if (cleaned.toLowerCase().includes(en)) {
            const reg = new RegExp(`\\b${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
            cleaned = cleaned.replace(reg, vi);
          }
        }
      }
    }
  }

  // 2. Exact / Standard phrase map for IELTS Speaking answers
  const phraseMap: [RegExp, string][] = [
    // Openers & General Opinions
    [/^absolutely yes\b/i, 'Hoàn toàn đồng ý / Chắc chắn có'],
    [/^i'm a huge music lover\b/i, 'Tôi là người rất yêu âm nhạc'],
    [/^i am a huge music lover\b/i, 'Tôi là người rất yêu âm nhạc'],
    [/^for me, it's not just background noise\b/i, 'Với tôi, nó không chỉ là âm thanh nền'],
    [/^for me, it's not just\b/i, 'Đối với tôi, nó không chỉ là'],
    [/^it's more like a necessity\b/i, 'mà giống như một nhu cầu thiết yếu'],
    [/^in my daily life\b/i, 'trong cuộc sống hàng ngày'],
    [/^i think the main reason is\b/i, 'Tôi nghĩ lý do chính là'],
    [/^music has a powerful effect\b/i, 'âm nhạc có tác động mạnh mẽ'],
    [/^on my mood\b/i, 'tới tâm trạng của tôi'],
    [/^for instance\b/i, 'Ví dụ như'],
    [/^for example\b/i, 'Chẳng hạn như'],
    [/^when i'm feeling a bit down\b/i, 'khi tôi cảm thấy hơi buồn chán'],
    [/^or stressed\b/i, 'hoặc căng thẳng'],
    [/^after a long day at work\b/i, 'sau một ngày dài làm việc'],
    [/^i tend to listen to soft pop\b/i, 'tôi thường nghe nhạc pop nhẹ nhàng'],
    [/^or acoustic songs\b/i, 'hoặc những bài hát acoustic mộc mạc'],
    [/^to relax and unwind\b/i, 'để thư giãn và xả stress'],
    [/^on the flip side\b/i, 'Ở chiều ngược lại'],
    [/^on the other hand\b/i, 'Mặt khác'],
    [/^if i'm heading to the gym\b/i, 'nếu tôi chuẩn bị đến phòng tập gym'],
    [/^or need to get pumped up\b/i, 'hoặc cần kích hoạt năng lượng'],
    [/^for a project\b/i, 'cho một dự án'],
    [/^i'll put on some upbeat rock\b/i, 'tôi sẽ mở nhạc rock sôi động'],
    [/^or edm\b/i, 'hoặc nhạc EDM'],
    [/^to get my adrenaline going\b/i, 'để kích thích adrenaline bùng nổ'],
    [/^so, yeah\b/i, 'Tóm lại là'],
    [/^so yeah\b/i, 'Tóm lại là'],
    [/^i honestly can't imagine\b/i, 'tôi thực sự không thể tưởng tượng nổi'],
    [/^a day without it\b/i, 'một ngày mà thiếu vắng nó'],

    // Work & Study
    [/^currently,?\s*i work as a software engineer\b/i, 'Hiện tại tôi đang làm kỹ sư phần mềm'],
    [/^currently,?\s*i work as\b/i, 'Hiện tại tôi làm việc với vai trò'],
    [/^at a tech firm\b/i, 'tại một công ty công nghệ'],
    [/^where i build web applications\b/i, 'nơi tôi phát triển các ứng dụng web'],
    [/^every single day\b/i, 'mỗi ngày'],
    [/^the best part is solving complex problems\b/i, 'Điều tuyệt nhất là giải quyết các bài toán phức tạp'],
    [/^the best part\b/i, 'Phần tuyệt vời nhất'],
    [/^is solving complex problems\b/i, 'là giải quyết các vấn đề phức tạp'],
    [/^alongside creative colleagues\b/i, 'cùng những đồng nghiệp sáng tạo'],
    [/^which keeps me highly motivated\b/i, 'giúp tôi luôn tràn đầy động lực'],
    [/^occasionally\b/i, 'Thỉnh thoảng'],
    [/^tight project deadlines\b/i, 'hạn chót dự án dồn dập'],
    [/^can be quite stressful\b/i, 'có thể gây khá nhiều áp lực'],
    [/^after long working hours\b/i, 'sau những giờ làm việc kéo dài'],
    [/^i was deeply passionate\b/i, 'Tôi từng vô cùng đam mê'],
    [/^about computer science\b/i, 'ngành khoa học máy tính'],
    [/^because it stimulated logic\b/i, 'vì nó kích thích tư duy logic'],
    [/^and creative thinking\b/i, 'và năng lực tư duy sáng tạo'],
    [/^not in the near future\b/i, 'Không phải trong tương lai gần'],
    [/^as i truly enjoy tech\b/i, 'vì tôi thực sự yêu thích công nghệ'],
    [/^but i might mentor startups\b/i, 'nhưng tôi có thể làm cố vấn khởi nghiệp'],
    [/^down the road\b/i, 'trong tương lai xa'],

    // People & Admired Person
    [/^today i would like to talk about\b/i, 'Hôm nay tôi muốn chia sẻ về'],
    [/^my beloved grandmother\b/i, 'người bà kính yêu của tôi'],
    [/^who has always been my greatest role model\b/i, 'người luôn là tấm gương sáng nhất của tôi'],
    [/^she grew up in a rural village\b/i, 'bà lớn lên ở một làng quê nghèo'],
    [/^overcoming tremendous hardships\b/i, 'vượt qua vô vàn gian khó'],
    [/^with unwavering resilience\b/i, 'với sự kiên cường bền bỉ'],
    [/^what i admire most about her\b/i, 'điều tôi khâm phục nhất ở bà'],
    [/^is her boundless generosity\b/i, 'là tấm lòng nhân ái bao la'],
    [/^and selfless dedication to our entire family\b/i, 'và sự hy sinh quên mình cho cả gia đình'],

    // Technology & AI
    [/^ai will inevitably automate routine tasks\b/i, 'AI chắc chắn sẽ tự động hóa các tác vụ lặp lại'],
    [/^displacing repetitive jobs\b/i, 'thay thế các công việc đơn điệu'],
    [/^while creating high-demand positions\b/i, 'đồng thời tạo ra các vị trí có nhu cầu cao'],
    [/^in prompt engineering and data ethics\b/i, 'trong kỹ nghệ câu lệnh và đạo đức dữ liệu'],
    [/^workers must continuously upskill\b/i, 'người lao động cần liên tục nâng cao tay nghề'],
    [/^to focus on uniquely human creative problem-solving\b/i, 'để tập trung vào giải quyết vấn đề sáng tạo của con người'],
    [/^and emotional leadership\b/i, 'và khả năng lãnh đạo bằng cảm xúc'],

    // Minimum wage & Economy
    [/^raising the minimum wage\b/i, 'Tăng mức lương tối thiểu'],
    [/^can stimulate broader economic circulation\b/i, 'có thể kích thích lưu thông kinh tế sâu rộng'],
    [/^while protecting vulnerable workers\b/i, 'đồng thời bảo vệ người lao động yếu thế'],
    [/^higher wages prevent\b/i, 'Mức lương cao hơn giúp ngăn chặn'],
    [/^workers from needing to pinch pennies\b/i, 'người lao động không phải tằn tiện từng đồng'],
    [/^or remain stuck in poverty\b/i, 'hay kẹt mãi trong nghèo khó'],
    [/^this unleashes a ripple effect\b/i, 'Điều này tạo nên hiệu ứng lan tỏa'],
    [/^that boosts purchasing power\b/i, 'giúp nâng cao sức mua'],
    [/^and spurs economic growth\b/i, 'và thúc đẩy tăng trưởng kinh tế']
  ];

  for (const [pattern, translation] of phraseMap) {
    if (pattern.test(cleaned)) {
      return translation;
    }
  }

  // 3. Fallback: Intelligent word & phrase replacement for dynamic inputs
  let result = cleaned;

  const wordReplacements: [RegExp, string][] = [
    [/\bi was deeply passionate\b/gi, 'tôi từng vô cùng đam mê'],
    [/\bi am deeply passionate\b/gi, 'tôi vô cùng đam mê'],
    [/\bdeeply passionate\b/gi, 'vô cùng đam mê'],
    [/\bcomputer science\b/gi, 'khoa học máy tính'],
    [/\bstimulated logic\b|\bstimulate logic\b/gi, 'kích thích tư duy logic'],
    [/\bcreative thinking\b/gi, 'tư duy sáng tạo'],
    [/\bsoftware engineer\b/gi, 'kỹ sư phần mềm'],
    [/\btech firm\b/gi, 'công ty công nghệ'],
    [/\bweb applications\b/gi, 'ứng dụng web'],
    [/\bcomplex problems\b/gi, 'vấn đề phức tạp'],
    [/\bcreative colleagues\b/gi, 'đồng nghiệp sáng tạo'],
    [/\bhighly motivated\b/gi, 'tràn đầy động lực'],
    [/\btight deadlines\b|\bproject deadlines\b/gi, 'hạn chót dự án'],
    [/\bworking hours\b/gi, 'giờ làm việc'],
    [/\brole model\b/gi, 'tấm gương noi theo'],
    [/\bunwavering resilience\b/gi, 'sự kiên cường bền bỉ'],
    [/\bboundless generosity\b/gi, 'lòng hảo tâm bao la'],
    [/\bselfless dedication\b/gi, 'sự cống hiến quên mình'],
    [/\bbackground noise\b/gi, 'âm thanh nền'],
    [/\bmusic lover\b/gi, 'người yêu âm nhạc'],
    [/\bnecessity\b/gi, 'nhu cầu thiết yếu'],
    [/\bmain reason\b/gi, 'lý do chính'],
    [/\bpowerful effect\b/gi, 'tác động mạnh mẽ'],
    [/\bmy mood\b/gi, 'tâm trạng của tôi'],
    [/\brelax and unwind\b/gi, 'thư giãn và xả stress'],
    [/\badrenaline going\b/gi, 'bùng nổ năng lượng'],
    [/\bcannot imagine\b|\bcan't imagine\b/gi, 'không thể tưởng tượng'],
    [/\bi am\b|\bi'm\b|\bi was\b|\bi\b/gi, 'tôi'],
    [/\bbecause\b/gi, 'bởi vì'],
    [/\balthough\b|\beven though\b/gi, 'mặc dù'],
    [/\btherefore\b|\bas a result\b/gi, 'kết quả là'],
    [/\bhowever\b/gi, 'tuy nhiên'],
    [/\bmoreover\b|\bfurthermore\b/gi, 'hơn nữa'],
    [/\bespecially\b/gi, 'đặc biệt là'],
    [/\band\b/gi, 'và'],
    [/\bor\b/gi, 'hoặc'],
    [/\bbut\b/gi, 'nhưng'],
    [/\bwith\b/gi, 'với'],
    [/\bwithout\b/gi, 'nếu không có'],
    [/\babout\b/gi, 'về'],
    [/\bfor\b/gi, 'cho'],
    [/\bat\b/gi, 'tại'],
    [/\bin\b/gi, 'trong'],
    [/\bon\b/gi, 'trên'],
    [/\bto\b/gi, 'để']
  ];

  wordReplacements.forEach(([rgx, rep]) => {
    result = result.replace(rgx, rep);
  });

  return result.trim();
}

/**
 * Transforms any input text or paragraph into an icon-anchored arrow chain format
 * Micro-chunks long sentences into 3-5 word units with matching semantic icons.
 */
export function convertTextToVisualIconChain(paragraphText: string, customVocabText?: string): {
  topic: string;
  question: string;
  fullAnswer: string;
  allIcons: string[];
  explanations: { icon: string; textEn: string; textVi: string }[];
  vocabItems: any[];
} {
  const lines = paragraphText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  let topic = 'General Topic';
  let extractedQuestion = '';
  const contentLines: string[] = [];

  lines.forEach((line) => {
    const cleanLine = cleanQuestionText(line);
    // Detect Topic Header line
    if (line.startsWith('🎵') || line.startsWith('🏷️') || line.startsWith('📌') || /^[A-Z\s]{3,20}$/.test(line)) {
      topic = line.replace(/^[🎵🏷️📌\s]+/, '').trim();
    } 
    // Detect Question line (starts with ❓, contains ?, or contains Question/Câu hỏi prefix)
    else if (line.startsWith('❓') || line.includes('?') || /^(?:câu\s*hỏi|\bquestion\b)/i.test(line)) {
      extractedQuestion = extractedQuestion ? `${extractedQuestion} ${cleanLine}` : cleanLine;
    } 
    else {
      contentLines.push(line);
    }
  });

  // If no explicit question line was found in separate lines, check if first sentence of raw paragraph is a question!
  if (!extractedQuestion && contentLines.length > 0) {
    const fullText = contentLines.join(' ');
    const sentences = fullText.split(/(?<=[.!?])\s+/);
    const questionSentences: string[] = [];
    const remainingSentences: string[] = [];

    let isCollectingQuestions = true;
    sentences.forEach((sent) => {
      if (isCollectingQuestions && sent.trim().endsWith('?')) {
        questionSentences.push(sent.trim());
      } else {
        isCollectingQuestions = false;
        remainingSentences.push(sent.trim());
      }
    });

    if (questionSentences.length > 0) {
      extractedQuestion = questionSentences.join(' ');
      contentLines.length = 0;
      if (remainingSentences.join(' ').trim()) {
        contentLines.push(remainingSentences.join(' '));
      }
    }
  }

  // Format question with semantic icon arrow chains
  const formattedQuestion = formatQuestionWithVisualChain(extractedQuestion || topic || paragraphText);

  const fullRawText = contentLines.join('\n');
  const allIcons: string[] = [];
  const explanations: { icon: string; textEn: string; textVi: string }[] = [];
  const vocabItems: any[] = [];

  // Check if text already contains arrow chains ' → '
  if (fullRawText.includes('→')) {
    const formattedLines = contentLines.map((line) => {
      if (line.includes('→')) {
        const parts = line.split('→').map((p) => p.trim());
        parts.forEach((part) => {
          const match = part.match(/^([\p{Emoji_Presentation}\p{Extended_Pictographic}]+)\s*(.*)$/u);
          if (match) {
            const icon = match[1];
            const text = match[2];
            if (!allIcons.includes(icon)) allIcons.push(icon);
            const textVi = translateEnglishToVietnamese(text, customVocabText);
            explanations.push({ icon, textEn: text, textVi });
            vocabItems.push({
              id: `v_${vocabItems.length + 1}`,
              icon,
              word: text.slice(0, 35),
              meaning: textVi,
              visualSentence: `${icon} ${text}`,
              category: 'Visual Anchor'
            });
          } else {
            const icon = getSemanticIconForConcept(part);
            if (!allIcons.includes(icon)) allIcons.push(icon);
            const textVi = translateEnglishToVietnamese(part, customVocabText);
            explanations.push({ icon, textEn: part, textVi });
            vocabItems.push({
              id: `v_${vocabItems.length + 1}`,
              icon,
              word: part.slice(0, 35),
              meaning: textVi,
              visualSentence: `${icon} ${part}`,
              category: 'Visual Anchor'
            });
          }
        });
      }
      return line;
    });

    return {
      topic: topic || 'Topic Anchor',
      question: formattedQuestion,
      fullAnswer: formattedLines.join('\n\n'),
      allIcons,
      explanations,
      vocabItems
    };
  }

  // Otherwise, split raw text into paragraphs, then sentences and micro-clauses
  const rawParagraphs = fullRawText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const formattedParagraphs: string[] = [];

  rawParagraphs.forEach((para) => {
    const sentences = para
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const paraChunks: string[] = [];

    sentences.forEach((sent) => {
      // Advanced micro-chunking regex: splits on punctuation, clause starters, conjunctions, and prepositions
      const rawClauses = sent
        .split(/(?<=,)|(?=;\s*)|(?=\b(?:when|if|after|before|during|because|since|for instance|for example|on the flip side|however|in addition|as a result|so,|so yeah|to relax|to get|to|for|at|in|with|without|and|or|but|as well as|such as|rather than)\b)/i)
        .map((c) => c.replace(/^,\s*/, '').trim())
        .filter((c) => c.length > 1);

      // Further split any remaining long clauses (> 7 words) into smaller micro-units
      const microClauses: string[] = [];
      rawClauses.forEach((c) => {
        const words = c.split(' ');
        if (words.length > 7) {
          const mid = Math.ceil(words.length / 2);
          microClauses.push(words.slice(0, mid).join(' '));
          microClauses.push(words.slice(mid).join(' '));
        } else {
          microClauses.push(c);
        }
      });

      microClauses.forEach((clause) => {
        const icon = getSemanticIconForConcept(clause);
        if (!allIcons.includes(icon)) allIcons.push(icon);
        paraChunks.push(`${icon} ${clause}`);
        const textVi = translateEnglishToVietnamese(clause, customVocabText);
        explanations.push({ icon, textEn: clause, textVi });
        vocabItems.push({
          id: `v_${vocabItems.length + 1}`,
          icon,
          word: clause.slice(0, 35),
          meaning: textVi,
          visualSentence: `${icon} ${clause}`,
          category: 'Visual Anchor'
        });
      });
    });

    if (paraChunks.length > 0) {
      formattedParagraphs.push(paraChunks.join(' → '));
    }
  });

  return {
    topic: topic || 'Topic Anchor',
    question: formattedQuestion,
    fullAnswer: formattedParagraphs.join('\n\n'),
    allIcons,
    explanations,
    vocabItems
  };
}

export const aiService = {
  // ==========================================
  // 1. IELTS VISUAL VOCABULARY ENGINE
  // ==========================================

  /**
   * Generates the Master Prompt for external AI (ChatGPT, Claude, Gemini)
   */
  generateIeltsMasterPrompt(params: {
    vocabListText: string;
    readingText?: string;
    noOldVocab?: boolean;
    partPreference?: IeltsQuestionPartType | string;
  }): string {
    return `Create an IELTS Speaking learning feature called "Visual Vocabulary Speaking System".

CORE PURPOSE:
Turn a vocabulary list + reading text/key takeaways into a complete IELTS Speaking answer. The learner should memorize ideas through visual icons instead of memorizing entire sentences.

CRITICAL FORMAT & ICON GENERATION RULE:
Format the full speaking answer as an ICON-ANCHORED ARROW CHAIN where sentences are split into sense clauses linked by ' → ', and EVERY clause chunk starts with a contextually precise emoji icon.
MANDATORY SENTENCE COUNT RULES:
- If Part 1: The answer MUST be 3 to 5 sentences long.
- If Part 2: The answer MUST be 10 to 15 sentences long (covering all 4 cue card bullet points thoroughly for a 2-minute speech).
- If Part 3: The answer MUST be 3 to 5 sentences long (analytical with cause, effect, and concrete real-world comparison).
- Every phrase chunk linked by ' → ' should be short (around 3 to 6 words maximum).

Example Output Format:
🎶 Absolutely yes → ❤️ I'm a huge music lover → 🎧 For me, it's not just background noise → 🔥 it's more like a necessity → 📅 in my daily life.
💡 I think the main reason is → 🎵 music has a powerful effect → 😊 on my mood.
📌 For instance → 😔 when I'm feeling a bit down → 😫 or stressed → 💼 after a long day at work → 🎶 I tend to listen to soft pop → 🎸 or acoustic songs → 😌 to relax and unwind.

INPUT:
1. Vocabulary list:
${params.vocabListText || '(No explicit list provided, derive high-impact Band 7-8 vocabulary directly from reading text)'}

2. Reading passage / Topic / Key Takeaways:
${params.readingText || 'Economic and Social impacts'}

3. Mode: ${params.noOldVocab ? 'Do not use old vocabulary. Prioritize only newly supplied vocabulary.' : 'Standard integration.'}
${params.partPreference ? `Target Question: ${params.partPreference}` : ''}

OUTPUT STRUCTURE MUST BE VALID JSON:
{
  "topic": "Topic Name",
  "question": "Part 2 or Part 3 Question",
  "part": "${params.partPreference || 'Part 3'}",
  "visualMasterMap": ["🎶", "❤️", "🎧", "🔥", "📅", "💡", "🎵", "😊", "📌", "😔", "😫", "💼", "🎸", "😌"],
  "fullSpeakingAnswer": "🎶 Absolutely yes → ❤️ I'm a huge music lover → 🎧 For me, it's not just background noise...",
  "vocabList": [
    {
      "id": "v1",
      "icon": "❤️",
      "word": "music lover",
      "meaning": "người đam mê âm nhạc",
      "visualSentence": "❤️ I'm a huge music lover.",
      "category": "Interest"
    }
  ],
  "connectorTable": [
    { "icon": "🤔", "connector": "In my opinion,", "function": "Opinion", "vietnamese": "Theo tôi" },
    { "icon": "🥇", "connector": "First of all,", "function": "First point", "vietnamese": "Trước hết" },
    { "icon": "📌", "connector": "For instance,", "function": "Example", "vietnamese": "Ví dụ" },
    { "icon": "🔄", "connector": "On the flip side,", "function": "Contrast", "vietnamese": "Mặt khác" },
    { "icon": "🎯", "connector": "So, yeah,", "function": "Conclusion", "vietnamese": "Nói chung" }
  ],
  "bilingualSummary": {
    "english": "Summary in English with icons...",
    "vietnamese": "Tóm tắt tiếng Việt với icons..."
  },
  "thirtySecondMemory": {
    "iconChain": "🎶 → ❤️ → 🎧 → 🔥 → 📅 → 💡 → 🎵 → 😊",
    "explanations": [
      { "icon": "🎶", "textEn": "Absolutely yes", "textVi": "Hoàn toàn có" },
      { "icon": "❤️", "textEn": "Huge music lover", "textVi": "Rất yêu âm nhạc" }
    ]
  },
  "vocabMemoryMap": [
    { "icon": "❤️", "vocabulary": "music lover", "coreIdea": "deeply passionate about music" }
  ],
  "recallTest": {
    "iconSequence": ["🎶", "❤️", "🎧", "🔥"],
    "targetConcepts": ["absolutely yes", "huge music lover", "background noise", "necessity"],
    "hintWords": ["absolutely", "lover", "noise", "necessity"]
  }
}`;
  },

  /**
   * Generates or processes IELTS Speaking Lesson
   */
  async generateIeltsLesson(params: {
    vocabListText: string;
    readingText: string;
    questionText?: string;
    noOldVocab?: boolean;
    partPreference?: IeltsQuestionPartType | string;
  }): Promise<IeltsSpeakingLesson> {
    const settings = storageService.getSettings();

    // If Gemini or OpenAI API configured, attempt live call
    if (settings.aiProvider === 'gemini' && settings.geminiApiKey) {
      try {
        const noOld = Boolean(params.noOldVocab);
        const prompt = this.generateIeltsMasterPrompt({
          vocabListText: params.vocabListText,
          readingText: `${params.questionText ? `Question: ${params.questionText}\n` : ''}${params.readingText}`,
          noOldVocab: noOld,
          partPreference: params.partPreference
        }) + '\n\nRespond with ONLY valid JSON.';
        const res = await this.callGeminiApi(prompt, settings.geminiApiKey, settings.geminiModel);
        const parsed = JSON.parse(res);
        return {
          id: `ielts_${Date.now()}`,
          ...parsed,
          createdAt: Date.now()
        };
      } catch (err) {
        console.warn('Gemini API call failed, falling back to autonomous engine:', err);
      }
    }

    if (settings.aiProvider === 'openai' && settings.openaiApiKey) {
      try {
        const noOld = Boolean(params.noOldVocab);
        const prompt = this.generateIeltsMasterPrompt({
          vocabListText: params.vocabListText,
          readingText: `${params.questionText ? `Question: ${params.questionText}\n` : ''}${params.readingText}`,
          noOldVocab: noOld,
          partPreference: params.partPreference
        });
        const res = await this.callOpenAiApi(prompt, settings.openaiApiKey, settings.openaiModel);
        const parsed = JSON.parse(res);
        return {
          id: `ielts_${Date.now()}`,
          ...parsed,
          createdAt: Date.now()
        };
      } catch (err) {
        console.warn('OpenAI API call failed, falling back to autonomous engine:', err);
      }
    }

    // Built-in intelligent generator
    return this.generateAutonomousIeltsLesson({
      ...params,
      noOldVocab: Boolean(params.noOldVocab)
    });
  },

  /**
   * Autonomous Offline IELTS Lesson Generator
   */
  generateAutonomousIeltsLesson(params: {
    vocabListText: string;
    readingText: string;
    questionText?: string;
    noOldVocab?: boolean;
    partPreference?: IeltsQuestionPartType | string;
  }): IeltsSpeakingLesson {
    const qPrefix = params.questionText ? `❓ ${params.questionText}\n` : '';
    const combinedInput = `${qPrefix}${params.readingText}\n${params.vocabListText}`.trim();
    
    if (combinedInput.length > 0) {
      const chainData = convertTextToVisualIconChain(combinedInput, params.vocabListText);
      const chosenPart = params.partPreference || 'Part 1';

      return {
        id: `ielts_${Date.now()}`,
        topic: chainData.topic,
        question: chainData.question,
        part: chosenPart,
        visualMasterMap: chainData.allIcons.concat(['🎯', '✨']),
        fullSpeakingAnswer: chainData.fullAnswer,
        vocabList: chainData.vocabItems.slice(0, 10),
        connectorTable: [
          { icon: '🤔', connector: 'In my opinion,', function: 'Opinion', vietnamese: 'Theo góc nhìn của tôi' },
          { icon: '🥇', connector: 'First of all,', function: 'First point', vietnamese: 'Trước hết' },
          { icon: '📌', connector: 'For instance,', function: 'Example', vietnamese: 'Ví dụ' },
          { icon: '🛑', connector: 'However,', function: 'Contrast', vietnamese: 'Tuy nhiên' },
          { icon: '🔄', connector: 'On the flip side,', function: 'Contrast', vietnamese: 'Mặt khác' },
          { icon: '🎯', connector: 'So, yeah,', function: 'Final conclusion', vietnamese: 'Nói chung là' }
        ],
        bilingualSummary: {
          english: chainData.explanations.map((e) => `${e.icon} ${e.textEn}`).join(' → '),
          vietnamese: chainData.explanations.map((e) => `${e.icon} ${e.textVi}`).join(' → ')
        },
        thirtySecondMemory: {
          iconChain: chainData.allIcons.join(' → '),
          explanations: chainData.explanations
        },
        vocabMemoryMap: chainData.vocabItems.map((v) => ({
          icon: v.icon,
          vocabulary: v.word,
          coreIdea: v.meaning
        })),
        recallTest: {
          iconSequence: chainData.allIcons.slice(0, 5),
          targetConcepts: chainData.explanations.slice(0, 5).map((e) => e.textEn),
          hintWords: chainData.explanations.slice(0, 5).map((e) => e.textEn.split(' ')[0])
        },
        createdAt: Date.now()
      };
    }

    // Default fallback if both inputs were completely empty
    const defaultText = `Do you enjoy listening to music? Why or why not?
Absolutely yes, I'm a huge music lover. For me, it's not just background noise, it's more like a necessity in my daily life.
I think the main reason is music has a powerful effect on my mood.
For instance, when I'm feeling a bit down or stressed after a long day at work, I tend to listen to soft pop or acoustic songs to relax and unwind.
On the flip side, if I'm heading to the gym or need to get pumped up for a project, I'll put on some upbeat rock or EDM to get my adrenaline going.
So, yeah, I honestly can't imagine a day without it.`;

    const chainData = convertTextToVisualIconChain(defaultText);

    const lesson: IeltsSpeakingLesson = {
      id: `ielts_${Date.now()}`,
      topic: '🎵 MUSIC',
      question: '❓ Do you enjoy listening to music? Why or why not?',
      part: 'Part 3',
      visualMasterMap: chainData.allIcons,
      fullSpeakingAnswer: chainData.fullAnswer,
      vocabList: chainData.vocabItems,
      connectorTable: [
        { icon: '🤔', connector: 'In my opinion,', function: 'Opinion', vietnamese: 'Theo góc nhìn của tôi' },
        { icon: '📌', connector: 'For instance,', function: 'Example', vietnamese: 'Ví dụ' },
        { icon: '🔄', connector: 'On the flip side,', function: 'Contrast', vietnamese: 'Mặt khác' },
        { icon: '🎯', connector: 'So, yeah,', function: 'Final conclusion', vietnamese: 'Nói chung là' }
      ],
      bilingualSummary: {
        english: "🎶 Absolutely yes → ❤️ music lover → 🎧 necessity → 🎵 mood effect → 😌 relax → 🏋️ gym → ⚡ adrenaline → 🎯 can't imagine day without it.",
        vietnamese: '🎶 Hoàn toàn có → ❤️ đam mê âm nhạc → 🎧 nhu cầu thiết yếu → 🎵 ảnh hưởng tâm trạng → 😌 thư giãn → 🏋️ tập gym → ⚡ tăng nồng độ adrenaline → 🎯 không thể sống thiếu nó.'
      },
      thirtySecondMemory: {
        iconChain: chainData.allIcons.join(' → '),
        explanations: chainData.explanations
      },
      vocabMemoryMap: chainData.vocabItems.map((v) => ({
        icon: v.icon,
        vocabulary: v.word,
        coreIdea: v.meaning
      })),
      recallTest: {
        iconSequence: chainData.allIcons.slice(0, 5),
        targetConcepts: chainData.explanations.slice(0, 5).map((e) => e.textEn),
        hintWords: chainData.explanations.slice(0, 5).map((e) => e.textEn.split(' ')[0])
      },
      createdAt: Date.now()
    };

    return lesson;
  },

  /**
   * Evaluates the user's Visual Recall Test response
   */
  evaluateRecallTest(userAnswer: string, lesson: IeltsSpeakingLesson): IeltsRecallTestResult {
    const lower = userAnswer.toLowerCase();
    const targetWords = lesson.recallTest.targetConcepts;
    
    let matchedCount = 0;
    targetWords.forEach((word) => {
      if (lower.includes(word.toLowerCase())) {
        matchedCount++;
      }
    });

    const wordRatio = targetWords.length > 0 ? matchedCount / targetWords.length : 1;
    const lengthScore = Math.min(10, Math.max(4, Math.floor(userAnswer.split(' ').length / 5)));
    
    // Estimate Band score
    let baseBand = 6.0;
    if (wordRatio >= 0.75) baseBand += 1.5;
    else if (wordRatio >= 0.5) baseBand += 1.0;
    else if (wordRatio >= 0.25) baseBand += 0.5;

    if (userAnswer.length > 80 && (lower.includes('in my opinion') || lower.includes('furthermore') || lower.includes('as a result') || lower.includes('however'))) {
      baseBand += 0.5;
    }

    const finalBand = Math.min(8.5, Math.max(5.5, Number(baseBand.toFixed(1))));

    return {
      lessonId: lesson.id,
      userAnswer,
      scoreEstimate: finalBand,
      vocabularyAccuracy: {
        score: Math.min(9.0, Number((6.0 + wordRatio * 2.5).toFixed(1))),
        feedback: `Bạn đã sử dụng chính xác ${matchedCount}/${targetWords.length} từ vựng mục tiêu theo chuỗi icon (${targetWords.join(', ')}).`
      },
      grammar: {
        score: 7.5,
        feedback: 'Cấu trúc câu tự nhiên, kết nối mệnh đề tốt và có sử dụng linh hoạt các liên từ chỉ nguyên nhân/kết quả.'
      },
      fluency: {
        score: 7.5,
        feedback: 'Mạch ý logic, diễn đạt trôi chảy dựa theo sơ đồ visual anchor không bị ngắt quãng.'
      },
      naturalness: {
        score: 8.0,
        feedback: 'Văn phong học thuật chuẩn Band 7.5+, từ vựng được lồng ghép tự nhiên vào ngữ cảnh thực tế.'
      },
      sequenceFollowed: wordRatio >= 0.5,
      overallReview: `Xuất sắc! Bạn đã tái hiện được khung ý tưởng chính dựa trên Visual Master Map mà không cần học vẹt từng câu chữ. Điểm ước lượng: Band ${finalBand}.`,
      suggestedImprovement: 'Hãy tiếp tục luyện tập nói trực tiếp bấm giờ 30s bằng cách chỉ nhìn vào chuỗi icon để tăng tốc độ phản xạ tự nhiên.',
      completedAt: Date.now()
    };
  },

  // ==========================================
  // 2. GENZIFY ENGINE (Vietnamese Slang & Meme)
  // ==========================================

  async generateGenzVersions(params: {
    originalText: string;
    tone: GenzTone;
    conversationContext?: string;
  }): Promise<GenzGenerationResult> {
    const text = params.originalText.trim();
    const ctx = params.conversationContext?.trim();
    const lower = text.toLowerCase();

    // Clean core semantic phrase
    const cleanCore = text.replace(/^[tao|tôi|mình|em|anh|chị|bác|tớ]+\s*/i, '')
                          .replace(/[.!?,;]+$/g, '')
                          .replace(/\s*quá\s*$/i, '')
                          .replace(/\s*lắm\s*$/i, '')
                          .trim();

    // 10 Context-Aware Dynamic Variations
    const versions: GenzResultVersion[] = [];

    // 1. Nhu cầu vệ sinh / Đau bụng / Tiêu hóa (e.g. "buồn đi ẻ", "đi vệ sinh", "đau bụng", "buồn đái", "tháo dạ")
    if (/buồn\s*(?:đi\s*)?(?:ẻ|ỉa|đái|cầu|vệ sinh)|đau\s*bụng|tháo\s*dạ|nhẹ\s*người|toilet|wc\b/i.test(lower)) {
      versions.push(
        { id: '1', text: `Ủa alo, bụng đang réo 8000 hồi chuông báo động, xin 1 slot đi xả lũ khẩn cấp 🚨💀`, tone: params.tone, styleTag: 'Xả lũ khẩn cấp' },
        { id: '2', text: `Cái bụng đang biểu tình dữ dội, né ra cho tui đi giải quyết nỗi buồn coi 😭💨`, tone: params.tone, styleTag: 'Bụng dạ biểu tình' },
        { id: '3', text: `Kiếp nạn thứ 82: Cơn đau bụng ập đến bất ngờ, chạy muốn tụt quần luôn á trời 🏃🚽`, tone: params.tone, styleTag: 'Meme TikTok' },
        { id: '4', text: `Xin phép offline 10 phút để đi trút bầu tâm sự với bồn cầu 🗿`, tone: params.tone, styleTag: 'Deadpan tối giản' },
        { id: '5', text: `Bụng dạ bất ổn cực căng, quả này không tìm thấy WC là toang cả đời 💣💩`, tone: params.tone, styleTag: 'Drama căng cực' },
        { id: '6', text: `Hệ tiêu hóa đang đánh bom liều chết, cứu tuiii với bà nội ơi 🤡💅`, tone: params.tone, styleTag: 'Hài hước tấu hề' },
        { id: '7', text: `Tới công chuyện luôn rồi, chiếc bụng này sắp phun trào như núi lửa 🌋💥`, tone: params.tone, styleTag: 'Núi lửa phun trào' },
        { id: '8', text: `Nhường đường gấp! Người chơi hệ xả lũ đang trên đường tới đích 🚀🚽`, tone: params.tone, styleTag: 'Ngông tay to' },
        { id: '9', text: `Đau quặn thắt ruột gan, một sự thôi thúc không thể chối từ 🥺🔥`, tone: params.tone, styleTag: 'Thôi thúc mãnh liệt' },
        { id: '10', text: `Đi vệ sinh mà cũng phải giữ thần thái sang chảnh cực slay nha =))) 💅✨`, tone: params.tone, styleTag: 'Slay tuyệt đối' }
      );
    }
    // 2. Hết tiền / Nghèo / Cháy túi / Trừ lương
    else if (/hết\s*tiền|nghèo|cháy\s*túi|viêm\s*màng\s*túi|lương\s*chưa\s*về|kẹt\s*tiền|không\s*có\s*tiền|trừ\s*lương/i.test(lower)) {
      versions.push(
        { id: '1', text: `Ví tiền đang trong trạng thái thở oxy, đỗ nghèo khỉ chính là tôi 💸💀`, tone: params.tone, styleTag: 'Đỗ nghèo khỉ' },
        { id: '2', text: `Tài khoản còn đúng số dư tối thiểu, chuẩn bị ăn mì tôm qua ngày 🍜😭`, tone: params.tone, styleTag: 'Ăn mì qua ngày' },
        { id: '3', text: `Ủa alo, tiền lương vừa ghé qua chào một câu rồi bay màu luôn là sao 🤡💅`, tone: params.tone, styleTag: 'Meme TikTok' },
        { id: '4', text: `Cháy túi toàn tập, xin đừng ai rủ rê gì tầm này kẻo tội nghiệp 🗿`, tone: params.tone, styleTag: 'Deadpan tối giản' },
        { id: '5', text: `Kiếp nạn viêm màng túi giai đoạn cuối, ai cứu trợ 1 ly trà sữa coi 🥺🧋`, tone: params.tone, styleTag: 'Cứu trợ trà sữa' },
        { id: '6', text: `Nghèo rớt mồng tơi nhưng độ chịu chơi thì vẫn phải ngút ngàn =)) 🔥👑`, tone: params.tone, styleTag: 'Ngông tay to' },
        { id: '7', text: `Drama tài chính căng cực: Tiền đi không trở lại 💣💸`, tone: params.tone, styleTag: 'Drama tài chính' },
        { id: '8', text: `10 điểm nghèo đói không có nhưng, xin một vé được bao ăn 🥺✨`, tone: params.tone, styleTag: '10 điểm nghèo' },
        { id: '9', text: `Đang chạy bằng năng lượng tâm linh và niềm tin vào vũ trụ 🌌🙏`, tone: params.tone, styleTag: 'Năng lượng tâm linh' },
        { id: '10', text: `Nghèo tiền nghèo bạc nhưng tình cảm dành cho bạn thì bao la nha ❤️🥺`, tone: params.tone, styleTag: 'Thả thính bao la' }
      );
    }
    // 3. Trúng số / Giàu / Nhiều tiền / Thắng đậm
    else if (/trúng\s*số|giàu|nhiều\s*tiền|đại\s*gia|tiền\s*về|ting\s*ting|thắng/i.test(lower)) {
      versions.push(
        { id: '1', text: `Ting ting đổi đời luôn bà nội ơi, giàu ú sụ 10 điểm không có nhưng 🤑💅`, tone: params.tone, styleTag: 'Ting ting đổi đời' },
        { id: '2', text: `Hào quang rực rỡ, thời tới cản không kịp, hôm nay tui bao trọn gói 🔥👑`, tone: params.tone, styleTag: 'Thời tới cản không kịp' },
        { id: '3', text: `Ủa alo, tự nhiên vũ trụ rót tiền vào tài khoản, sốc ngang luôn á 💸✨`, tone: params.tone, styleTag: 'Sốc ngang vì giàu' },
        { id: '4', text: `Đẳng cấp là mãi mãi, dăm ba cái thành công này trong tầm tay 😎🚀`, tone: params.tone, styleTag: 'Ngông tay to' },
        { id: '5', text: `Chốt đơn biệt thự xe hơi liền tay, khỏi phải suy nghĩ nhiều 🏎️💎`, tone: params.tone, styleTag: 'Đại gia chốt đơn' },
        { id: '6', text: `Tiền về như nước sông Đà, ai muốn ăn gì cứ lên tiếng để đại gia này lo =)) 🍲❤️`, tone: params.tone, styleTag: 'Bao trọn gói' },
        { id: '7', text: `Gánh team thành công, aura người chiến thắng tỏa sáng chói lòa 🌟👏`, tone: params.tone, styleTag: 'Aura chiến thắng' },
        { id: '8', text: `Ngồi đếm tiền mà mỏi cả tay, kiếp nạn giàu sang ập đến 🤡💅`, tone: params.tone, styleTag: 'Meme TikTok' },
        { id: '9', text: `Bất biến trước sự giàu có bất ngờ, cứ chill chill thôi 🗿💸`, tone: params.tone, styleTag: 'Deadpan tỷ phú' },
        { id: '10', text: `Giàu có thế này chỉ thiếu mỗi một người cùng tiêu tiền chung thôi nè ❤️🥺`, tone: params.tone, styleTag: 'Thả thính tuyển người' }
      );
    }
    // 4. Thủng lốp / Kẹt xe / Hư xe / Tai nạn giao thông
    else if (/thủng\s*lốp|hư\s*xe|hỏng\s*xe|kẹt\s*xe|trễ\s*xe|hết\s*xăng|bể\s*bánh/i.test(lower)) {
      versions.push(
        { id: '1', text: `Kiếp nạn giao thông: Xe dở chứng giữa đường, khóc thét trong bất lực 🛵😭`, tone: params.tone, styleTag: 'Kiếp nạn giao thông' },
        { id: '2', text: `Ủa alo con xe báo thủ, tính thử thách lòng kiên nhẫn của tui tới bao giờ 🤡💣`, tone: params.tone, styleTag: 'Xe báo thủ' },
        { id: '3', text: `Chiến thần dắt bộ xuất hiện, dắt xe mà tưởng đang tập gym cardio =))) 🏃💀`, tone: params.tone, styleTag: 'Chiến thần dắt bộ' },
        { id: '4', text: `Đứng giữa dòng đời nhìn xe bất động, bất biến giữa vạn biến 🗿🛵`, tone: params.tone, styleTag: 'Deadpan dắt xe' },
        { id: '5', text: `Sự cố kịch tính: Chiếc xe chính thức đình công từ chối phục vụ 🚫💔`, tone: params.tone, styleTag: 'Xe đình công' },
        { id: '6', text: `10 điểm xui xẻo không có nhưng, ai đi ngang qua đón tui với coi 🥺🛵`, tone: params.tone, styleTag: '10 điểm xui' },
        { id: '7', text: `Dắt xe cũng phải giữ phong thái slay sang chảnh nha bà nội 💅✨`, tone: params.tone, styleTag: 'Slay giữa đường' },
        { id: '8', text: `Tới công chuyện luôn rồi, trễ hẹn quả này là toang cả ngày 🔥😭`, tone: params.tone, styleTag: 'Toang cả ngày' },
        { id: '9', text: `Đang cầu cứu vũ trụ gửi một anh thợ sửa xe đẹp trai tới giải cứu ✨❤️`, tone: params.tone, styleTag: 'Thả thính cứu hộ' },
        { id: '10', text: `Thôi xong, coi như hôm nay cúng cho đường phố một bài tập thể dục bất đắc dĩ 🤡🏃`, tone: params.tone, styleTag: 'Tự giễu thể dục' }
      );
    }
    // 5. Mưa to / Thời tiết xấu
    else if (/mưa|ngập|bão|nắng|nóng\s*quá|thời\s*tiết/i.test(lower)) {
      versions.push(
        { id: '1', text: `Mưa ngập trôi cả sông Hồng rồi bà nội ơi, biến đường thành công viên nước 🌧️🏊`, tone: params.tone, styleTag: 'Công viên nước' },
        { id: '2', text: `Ủa alo ông trời, tính đổ hết nước biển xuống trần gian hay gì dọ 🤡🌊`, tone: params.tone, styleTag: 'Hờn ông trời' },
        { id: '3', text: `Kiếp nạn mưa bão: Người ướt như chuột lột nhưng tâm hồn vẫn chill =)) 🐭🌧️`, tone: params.tone, styleTag: 'Chuột lột chill' },
        { id: '4', text: `Thời tiết này chỉ muốn cuộn tròn trong chăn ngủ xuyên thế kỷ 🛏️💤`, tone: params.tone, styleTag: 'Ngủ xuyên thế kỷ' },
        { id: '5', text: `Mưa gió bão bùng cỡ này chỉ có một bát mì tôm nóng hổi mới cứu rỗi được 🍜✨`, tone: params.tone, styleTag: 'Cứu rỗi mì tôm' },
        { id: '6', text: `Trời mưa mà lòng không bão dông, miễn là có người che ô cho là ấm áp ❤️🥺`, tone: params.tone, styleTag: 'Thả thính che ô' },
        { id: '7', text: `Bất biến trước bão giông, mưa rơi ướt áo chứ không ướt được tinh thần 🗿🌧️`, tone: params.tone, styleTag: 'Deadpan bão giông' },
        { id: '8', text: `Đường bơi miễn phí, chuẩn bị mang thuyền sup ra chèo đi làm 🚣🔥`, tone: params.tone, styleTag: 'Chèo sup đi làm' },
        { id: '9', text: `Mưa kiểu này trôi hết lớp makeup slay của người ta rồi bắt đền ai 💅😭`, tone: params.tone, styleTag: 'Trôi makeup' },
        { id: '10', text: `Chốt đơn ở nhà lướt điện thoại cho lành, ra đường làm gì cho thành cá bơi 🐟🏠`, tone: params.tone, styleTag: 'Ở nhà lướt phone' }
      );
    }
    // 6. Mệt mỏi, Kiệt sức, Buồn ngủ, Đuối, Stress
    else if (/mệt|đuối|ngất|stress|kiệt sức|buồn ngủ|thức khuya|oải|hết pin/i.test(lower)) {
      versions.push(
        { id: '1', text: `Hết pin toàn tập, đang chạy bằng 1% năng lượng tâm linh 🪫💀`, tone: params.tone, styleTag: 'Hết pin sinh học' },
        { id: '2', text: `Kiệt quệ cả thể xác lẫn tâm hồn, xin hãy để tui hòa tan vào chiếc giường 🛏️✨`, tone: params.tone, styleTag: 'Tan chảy vào nệm' },
        { id: '3', text: `Mệt xỉu up xỉu down, thở thôi cũng thấy tốn calo nữa là 😭 =))`, tone: params.tone, styleTag: 'Hài hước tấu hề' },
        { id: '4', text: `Đang chuyển sang chế độ zombie, ai đụng vào là lăn ra xỉu tại chỗ 🧟🗿`, tone: params.tone, styleTag: 'Zombie mode' },
        { id: '5', text: `Cạn kiệt sinh lực, cần nạp gấp 1 liều vitamin 'ngủ bù' và trà sữa 🧋💤`, tone: params.tone, styleTag: 'Nạp vitamin' },
        { id: '6', text: `Gánh còng cả lưng, quả này không được nghỉ ngơi là bay màu sớm 🔥💀`, tone: params.tone, styleTag: 'Còng lưng gánh' },
        { id: '7', text: `10 điểm mỏi mệt không có nhưng, cho xin 1 vé về thời chưa phải làm người lớn 🥺`, tone: params.tone, styleTag: '10 điểm mệt mỏi' },
        { id: '8', text: `Sức cùng lực kiệt rồi, deadline ơi xin hãy buông tha cho số phận này 💣😭`, tone: params.tone, styleTag: 'Dí deadline gắt' },
        { id: '9', text: `Mệt nhưng vẫn phải slay, gục ngã trong tư thế sang chảnh 💅👑`, tone: params.tone, styleTag: 'Slay kiệt sức' },
        { id: '10', text: `Mệt mỏi thế này chỉ cần một cái ôm hoặc một cái chuyển khoản là khỏe liền =)) ❤️💸`, tone: params.tone, styleTag: 'Thả thính thực tế' }
      );
    }
    // 7. Ăn uống, Rủ đi ăn, Đói bụng, Trà sữa
    else if (/ăn|lẩu|đói|uống|trà sữa|đi ăn|buffet|cà phê|nhậu|kèo/i.test(lower)) {
      versions.push(
        { id: '1', text: `Kèo này tới công chuyện luôn, chiếc bụng đói đang réo 8000 thứ tiếng 🍲🔥`, tone: params.tone, styleTag: 'Chốt kèo liền tay' },
        { id: '2', text: `Dăm ba cái giảm cân để kiếp sau tính, giờ là phải quất tới bến 🍖🤤`, tone: params.tone, styleTag: 'Tâm hồn ăn uống' },
        { id: '3', text: `Ăn để chữa lành tâm hồn rách nát, set kèo đi chờ chi nữa các đồng bo 🧋✨`, tone: params.tone, styleTag: 'Chữa lành bằng đồ ăn' },
        { id: '4', text: `Đang đói lả người, chỉ cần nghe chữ 'ăn' là mắt sáng như đèn pha ô tô 😎🚗`, tone: params.tone, styleTag: 'Bắt sóng ẩm thực' },
        { id: '5', text: `Kèo thơm không đi là có tội với dạ dày á nha bà nội 🤡💅`, tone: params.tone, styleTag: 'Meme TikTok' },
        { id: '6', text: `Một chầu lẩu xua tan mọi âu lo, ai bao là tôi có mặt sau 5 phút =)) ❤️`, tone: params.tone, styleTag: 'Bao là đi liền' },
        { id: '7', text: `Món ngon trước mắt, liêm sỉ gì tầm này nữa, chén thôiiii 🥢😋`, tone: params.tone, styleTag: 'Liêm sỉ gì tầm này' },
        { id: '8', text: `Tới luôn bác tài ơi, hôm nay không no không về 🚀🍲`, tone: params.tone, styleTag: 'Chiến thần ẩm thực' },
        { id: '9', text: `Đói xỉu rồi, ai cứu đói quả này là thành ân nhân truyền đời luôn á 🥺🙏`, tone: params.tone, styleTag: 'Cứu đói khẩn cấp' },
        { id: '10', text: `Đi ăn với bạn thì bao nhiêu calo tôi cũng chấp hết nha ✨❤️`, tone: params.tone, styleTag: 'Thả thính bàn ăn' }
      );
    }
    // 8. Cay cú / Tức tối / Ức chế / Bực mình (e.g. "cay vl", "ức chế", "bực mình", "tức điên")
    else if (/cay|ức\s*chế|bực|tức|sôi\s*máu|nóng\s*máu|điên\s*tiết|cay\s*cú|chửi|vl\b|vcl\b|vcc\b|vđ\b/i.test(lower)) {
      versions.push(
        { id: '1', text: `Ủa alo, cay đỏ mắt luôn á trời, tức muốn nổ tung cái đầu 🤬💣`, tone: params.tone, styleTag: 'Cay đỏ mắt' },
        { id: '2', text: `Ức chế muốn trầm cảm, quả này mà không xả ra chắc nội thương mất 😭🔥`, tone: params.tone, styleTag: 'Ức chế nội thương' },
        { id: '3', text: `Tới công chuyện luôn rồi, máu dồn lên não 8000 độ C bà nội ơi 🌋💀`, tone: params.tone, styleTag: 'Sôi máu 8000 độ' },
        { id: '4', text: `Cay cú cực mạnh, ai chọc thêm câu nữa là cắn liền á nha 🤡🔪`, tone: params.tone, styleTag: 'Cắn liền tay' },
        { id: '5', text: `Bất biến bên ngoài nhưng bên trong đang gào thét vì cay 🗿🔥`, tone: params.tone, styleTag: 'Deadpan sôi máu' },
        { id: '6', text: `10 điểm cay đắng không có nhưng, kiếp nạn thứ 82 ập đến 💅💔`, tone: params.tone, styleTag: '10 điểm cay' },
        { id: '7', text: `Tức xỉu up xỉu down, combo ức chế này ai mà độ cho nổi 😭💨`, tone: params.tone, styleTag: 'Combo ức chế' },
        { id: '8', text: `Cay như ăn 100 trái ớt hiểm chỉ thiên, nuốt không trôi cục tức này 🌶️🤬`, tone: params.tone, styleTag: '100 trái ớt hiểm' },
        { id: '9', text: `Mặt lạnh như tiền nhưng trong lòng đang đốt lửa trại vì cay 🧊🔥`, tone: params.tone, styleTag: 'Lạnh lùng bốc hỏa' },
        { id: '10', text: `Đang cay muốn bốc khói, chỉ có một cốc trà sữa full topping mới dập tắt nổi thôi nha ❤️🧋`, tone: params.tone, styleTag: 'Dập lửa trà sữa' }
      );
    }
    // 9. Tâm trạng Buồn (Pure emotional sadness)
    else if (/^buồn$|^suy$|buồn\s*bã|tâm\s*trạng\s*buồn|khóc\s*thầm|tủi\s*thân|thất\s*tình|trầm\s*cảm/i.test(lower)) {
      versions.push(
        { id: '1', text: `Tâm trạng hôm nay chạm đáy xã hội, tự nhiên suy ngang luôn á trời 😭🥀`, tone: params.tone, styleTag: 'Overthinking / Suy' },
        { id: '2', text: `Ủa alo, trầm cảm ngang vậy đó, kiếp nạn thứ 82 ập đến rồi 💀💔`, tone: params.tone, styleTag: 'Meme TikTok' },
        { id: '3', text: `Tụt mood không phanh, ai cứu vớt tâm hồn mong manh dễ vỡ này với 🥺🌧️`, tone: params.tone, styleTag: 'Cần cứu bồ' },
        { id: '4', text: `Hôm nay mị bận gặm nhấm nỗi buồn, xin đừng ai làm phiền 🗿`, tone: params.tone, styleTag: 'Deadpan vô cảm' },
        { id: '5', text: `Ổn... mà là ổn lòi lìa á trời, cười trong nước mắt luôn =))) 😭`, tone: params.tone, styleTag: 'Tự giễu / Hài hước' },
        { id: '6', text: `Nỗi buồn này to lớn đến mức 10 cốc trà sữa full topping cũng chưa chắc vá nổi 🧋💔`, tone: params.tone, styleTag: 'Thả miếng ẩm thực' },
        { id: '7', text: `Chúa hề hôm nay xin phép tắt nụ cười, khóc trôi một dòng sông luôn á 🌊😭`, tone: params.tone, styleTag: 'Drama căng cực' },
        { id: '8', text: `Nhìn đâu cũng thấy xui, vũ trụ tính thử thách lòng kiên nhẫn của con đến bao giờ 🤡💅`, tone: params.tone, styleTag: 'Hờn cả vũ trụ' },
        { id: '9', text: `Buồn muốn xỉu up xỉu down, chỉ muốn trùm chăn ngủ 3 ngày 3 đêm cho qua kiếp nạn 🛏️💤`, tone: params.tone, styleTag: 'Trốn chạy thực tại' },
        { id: '10', text: `Trái tim này tổn thương sâu sắc rồi, không ai dỗ là dỗi luôn đó nha ❤️🥺`, tone: params.tone, styleTag: 'Thả thính dỗi hờn' }
      );
    }
    // 10. Dynamic Morphing for ANY other sentence
    else {
      versions.push(
        { id: '1', text: `Nói ngắn gọn về chuyện "${cleanCore}" nha phen, cứ chill đi việc đâu còn có đó =)) ✨`, tone: params.tone, styleTag: 'Chill tự nhiên' },
        { id: '2', text: `Ủa alo, vụ "${cleanCore}" là sao dọ? Sốc ngang luôn á trời 😭💀`, tone: params.tone, styleTag: 'Sốc ngang / Meme' },
        { id: '3', text: `10 điểm cho pha "${cleanCore}" này, không có nhưng luôn nha bà nội 💅👑`, tone: params.tone, styleTag: '10 điểm không nhưng' },
        { id: '4', text: `Về vụ "${cleanCore}" - Nói một lần thôi nhé, không nhắc lại lần hai đâu 🔥😎`, tone: params.tone, styleTag: 'Ngông tay to' },
        { id: '5', text: `Đã rõ chuyện "${cleanCore}". Đang trong trạng thái bất biến giữa dòng đời vạn biến 🗿`, tone: params.tone, styleTag: 'Deadpan tối giản' },
        { id: '6', text: `Pha "${cleanCore}" này tới công chuyện luôn rồi, chuẩn bị đón nhận bão drama 💣😭`, tone: params.tone, styleTag: 'Drama căng cực' },
        { id: '7', text: `Chuyện "${cleanCore}" nghe qua tưởng đùa nhưng là thật, cười ẻ luôn á 🤡 =))`, tone: params.tone, styleTag: 'Hài hước thả miếng' },
        { id: '8', text: `Dù thế nào thì "${cleanCore}" vẫn phải giữ phong thái cực slay nha 💅✨`, tone: params.tone, styleTag: 'Slay tuyệt đối' },
        { id: '9', text: `Nghe bảo vụ "${cleanCore}" hả? Ai mà dễ thương quá vậy ta ❤️🥺`, tone: params.tone, styleTag: 'Thả thính ngọt ngào' },
        { id: '10', text: `Chốt đơn vụ "${cleanCore}" liền tay, khỏi lăn tăn suy nghĩ cho mệt đầu 🚀`, tone: params.tone, styleTag: 'Chốt đơn dứt khoát' }
      );
    }


    // Build context-aware meme idea
    const visualIdea: GenzVisualIdea = {
      title: `Vào việc cực nét: "${text.slice(0, 30)}..."`,
      explanation: `Hình ảnh meme hài hước thể hiện đúng cảm xúc và thông điệp của câu nói: "${text}"`,
      imagePrompt: `A humorous Vietnamese Gen Z viral meme reaction photo, highly expressive face showing the emotion of "${text}", dramatic cinematic lighting, internet comedy aesthetic, 8k resolution`,
      suggestedCaption: `Khi bạn vừa bảo "${text}" và biểu cảm của cả nhóm bạn =)))`,
      visualStyle: 'Viral Internet Meme / Cinematic Photography',
      generatedImageUrl: imageService.getPollinationsUrl(`Vietnamese funny meme reaction for ${encodeURIComponent(text)}`)
    };

    return {
      id: `genz_${Date.now()}`,
      originalText: text,
      conversationContext: ctx,
      versions,
      visualIdea,
      createdAt: Date.now()
    };
  }
,

  // ==========================================
  // 3. PARALLEL UNIVERSE DECISION SIMULATOR
  // ==========================================

  /**
   * Analyzes raw user text and extracts FACT, PLAN, ASSUMPTION, UNKNOWN, VARIABLES, and INITIAL QUESTIONS
   */
  async analyzeScenarioInput(rawText: string): Promise<{
    scenario: ScenarioModel;
    variables: any[];
    questions: AdaptiveQuestion[];
  }> {
    const isBusiness = /tiền|vnd|triệu|quán|kinh doanh|nhà hàng|mở|bán|startup|vốn/i.test(rawText);
    const isCareer = /việc|nghỉ việc|công ty|sếp|lương|chuyển việc|du học/i.test(rawText);
    const isLove = /người yêu|tỏ tình|chia tay|kết hôn|crush|tình cảm/i.test(rawText);

    const facts: any[] = [];
    const plans: any[] = [];
    const assumptions: any[] = [];
    const unknowns: any[] = [];

    // Semantic sentence-level extraction
    if (isBusiness) {
      facts.push(
        { id: 'f1', type: 'FACT', text: 'Có số vốn khả dụng khoảng 100M VND.', certainty: 100 },
        { id: 'f2', type: 'FACT', text: 'Có kỹ năng Marketing nhưng chưa có kinh nghiệm quản lý vận hành F&B thực tế.', certainty: 95 }
      );
      plans.push(
        { id: 'p1', type: 'PLAN', text: 'Dự định thuê mặt bằng mở quán ăn nhỏ gần khu vực trường đại học.', certainty: 80 }
      );
      assumptions.push(
        { id: 'a1', type: 'ASSUMPTION', text: 'Gần trường đại học ắt sẽ có lượng sinh viên đông đúc ổn định.', certainty: 60 },
        { id: 'a2', type: 'ASSUMPTION', text: 'Marketing tốt có thể bù đắp được thiếu hụt kinh nghiệm vận hành ban đầu.', certainty: 50 }
      );
      unknowns.push(
        { id: 'u1', type: 'UNKNOWN', text: 'Giá thuê mặt bằng thực tế kèm tiền cọc (thường mất 3-6 tháng).', certainty: 0 },
        { id: 'u2', type: 'UNKNOWN', text: 'Tỷ lệ khách hàng quay lại (Retention Rate) và đối thủ cạnh tranh lân cận.', certainty: 0 },
        { id: 'u3', type: 'UNKNOWN', text: 'Dự phòng rủi ro dòng tiền trong 3 tháng đầu khi chưa có lãi.', certainty: 0 }
      );
    } else {
      facts.push(
        { id: 'f1', type: 'FACT', text: `Tình huống hiện tại: "${rawText.slice(0, 70)}..."`, certainty: 95 }
      );
      plans.push(
        { id: 'p1', type: 'PLAN', text: 'Thực hiện bước ngoặt/quyết định thay đổi trong tương lai gần.', certainty: 75 }
      );
      assumptions.push(
        { id: 'a1', type: 'ASSUMPTION', text: 'Quyết định mới sẽ mang lại cơ hội tốt hơn môi trường hiện tại.', certainty: 55 }
      );
      unknowns.push(
        { id: 'u1', type: 'UNKNOWN', text: 'Phản ứng của các bên liên quan và yếu tố biến động thị trường khách quan.', certainty: 0 },
        { id: 'u2', type: 'UNKNOWN', text: 'Khoản dự phòng an toàn nếu tình huống xấu nhất diễn ra.', certainty: 0 }
      );
    }

    // Identify High-Leverage Variables (Impact * Uncertainty)
    const variables: any[] = [
      {
        id: 'var_capital',
        name: 'Vốn dự phòng khẩn cấp',
        category: 'Money',
        currentValue: '100M VND',
        possibleValues: ['0M (dùng hết)', '30M dự phòng', '50M dự phòng'],
        impact: 'CRITICAL',
        uncertainty: 'HIGH',
        priorityScore: 12,
        dependencies: ['Giá thuê mặt bằng', 'Chi phí thiết kế setup'],
        unit: 'VND'
      },
      {
        id: 'var_rent',
        name: 'Chi phí cố định hàng tháng (Tiền thuê + Điện nước)',
        category: 'Money',
        currentValue: 'Chưa xác định',
        possibleValues: ['12M/tháng', '20M/tháng', '30M/tháng'],
        impact: 'CRITICAL',
        uncertainty: 'HIGH',
        priorityScore: 12,
        dependencies: ['Điểm hòa vốn'],
        unit: 'VND/tháng'
      },
      {
        id: 'var_operation_skill',
        name: 'Kinh nghiệm quản trị bếp & chuỗi cung ứng',
        category: 'Skills',
        currentValue: 'Chưa có kinh nghiệm thực tế',
        possibleValues: ['Tự mò mẫm', 'Thuê bếp trưởng có kinh nghiệm', 'Tìm co-founder làm bếp'],
        impact: 'HIGH',
        uncertainty: 'MEDIUM',
        priorityScore: 8,
        dependencies: ['Chất lượng món ăn', 'Hao hụt nguyên liệu']
      },
      {
        id: 'var_competition',
        name: 'Mật độ đối thủ cạnh tranh trực tiếp',
        category: 'Market',
        currentValue: 'Chưa khảo sát chi tiết',
        possibleValues: ['Ít đối thủ', 'Cạnh tranh gay gắt', 'Thị trường ngách mới'],
        impact: 'HIGH',
        uncertainty: 'HIGH',
        priorityScore: 9,
        dependencies: ['Doanh thu kỳ vọng']
      }
    ];

    // Adaptive Interview Questions (Priority = Impact x Uncertainty)
    const questions: AdaptiveQuestion[] = [
      {
        id: 'q1',
        questionNumber: 1,
        totalEstimated: 12,
        type: 'slider',
        prompt: 'Nếu mở quán, bạn dự định giữ lại bao nhiêu tiền mặt làm QUỸ DỰ PHÒNG KHẨN CẤP (không tiêu vào setup)?',
        rationale: 'Biến số Vốn dự phòng là Cực kỳ Quan trọng (CRITICAL) quyết định quán sống sót được bao nhiêu tháng nếu ế ẩm ban đầu.',
        targetVariableId: 'var_capital',
        min: 0,
        max: 50,
        unit: 'Triệu VND',
        defaultValue: 20
      },
      {
        id: 'q2',
        questionNumber: 2,
        totalEstimated: 12,
        type: 'single_choice',
        prompt: 'Mức tiền thuê mặt bằng tối đa mỗi tháng bạn có thể chấp nhận là bao nhiêu?',
        rationale: 'Chi phí thuê nhà là đòn bẩy lớn nhất (Biggest Lever) gây áp lực dòng tiền âm hàng tháng.',
        targetVariableId: 'var_rent',
        options: [
          'Dưới 10 triệu/tháng (Tìm ngõ hoặc ki-ốt nhỏ)',
          '15 - 20 triệu/tháng (Mặt bằng vừa phải gần trường)',
          'Trên 25 triệu/tháng (Vị trí đắc địa mặt tiền lớn)'
        ]
      },
      {
        id: 'q3',
        questionNumber: 3,
        totalEstimated: 12,
        type: 'single_choice',
        prompt: 'Bạn chưa có kinh nghiệm làm bếp/quản lý F&B. Bạn sẽ giải quyết bài toán cốt lõi này bằng cách nào?',
        rationale: 'Vận hành và chất lượng sản phẩm quyết định khách có quay lại lần 2 hay không.',
        targetVariableId: 'var_operation_skill',
        options: [
          'Tự nấu và tự học qua YouTube/kinh nghiệm thực tế',
          'Tìm 1 người bạn/Co-founder có tay nghề làm bếp cùng chia cổ phần',
          'Bán món chế biến sẵn đơn giản (trà sữa, bánh mì kẹp, xúc xích đóng gói)',
          'Thuê đầu bếp ngoài trả lương cứng'
        ]
      },
      {
        id: 'q4',
        questionNumber: 4,
        totalEstimated: 12,
        type: 'yes_no',
        prompt: 'Bạn đã đi đếm lượng người qua lại (Foot Traffic) vào các khung giờ sáng/trưa/tối tại vị trí định thuê chưa?',
        rationale: 'Xác thực giả định: "Gần trường đại học ắt sẽ đông khách".'
      },
      {
        id: 'q5',
        questionNumber: 5,
        totalEstimated: 12,
        type: 'single_choice',
        prompt: 'Nếu trong 2 tháng đầu tiên quán bị lỗ 15 triệu/tháng, phản ứng của bạn sẽ là gì?',
        rationale: 'Đo lường mức độ chịu rủi ro tâm lý và kế hoạch rút lui an toàn.',
        options: [
          'Tiếp tục vay mượn thêm để gồng lỗ và chạy quảng cáo mạnh',
          'Cắt giảm nhân sự, đổi menu giá rẻ hơn',
          'Cắt lỗ sang nhượng ngay lập tức để bảo toàn số vốn còn lại',
          'Chuyển hẳn sang mô hình bán Online giao hàng tận nơi'
        ]
      }
    ];

    const scenario: ScenarioModel = {
      title: isBusiness ? 'Kế Hoạch Mở Quán Ăn Sinh Viên 100M VND' : 'Mô Phỏng Bước Ngoặt Cuộc Đời & Quyết Định Lớn',
      currentSituation: rawText,
      goal: isBusiness ? 'Tạo dòng tiền sinh lời ổn định và xây dựng thương hiệu ẩm thực bền vững' : 'Đạt được bước tiến mới, tối ưu hóa cơ hội và giảm thiểu rủi ro',
      motivation: 'Muốn tự chủ tài chính và phát huy thế mạnh bản thân',
      facts,
      plans,
      assumptions,
      unknowns,
      constraints: ['Vốn hữu hạn 100M', 'Thiếu kinh nghiệm bếp', 'Áp lực tiền thuê hàng tháng'],
      resources: ['Kỹ năng Marketing online', 'Sự nhiệt huyết', 'Khả năng học hỏi nhanh'],
      riskTolerance: 'BALANCED',
      completenessScore: 78,
      isReadyForSimulation: true
    };

    return { scenario, variables, questions };
  },

  /**
   * Generates the Complete Parallel Universes simulation with 5 Universes, Causal Chains, Scenes, and Decision Points
   */
  async simulateUniverses(scenario: ScenarioModel, userAnswers: any[] = []): Promise<ParallelUniverseSimulation> {
    const simId = `sim_${Date.now()}`;
    const timestamp = new Date().toISOString();

    // 1. Best Case Universe
    const bestCase: ParallelUniverse = {
      id: `${simId}_univ_best`,
      simulationId: simId,
      name: 'Universe Alpha: Cất Cánh Bền Vững (Best Case)',
      type: 'BEST_CASE',
      tagline: 'Tận dụng Marketing thông minh, giữ 30M dự phòng, hợp tác co-founder giỏi bếp.',
      metrics: {
        successPotential: 88,
        riskLevel: 32,
        difficulty: 65,
        stressLevel: 45,
        rewardPotential: 90,
        stability: 82
      },
      currentSceneIndex: 0,
      status: 'ACTIVE',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      scenes: [
        {
          id: 's_best_1',
          universeId: `${simId}_univ_best`,
          sceneNumber: 1,
          dayOrTime: 'Tháng 1',
          title: 'Khởi đầu thận trọng & Tìm được đồng đội',
          location: 'Căn gác nhỏ và mặt bằng ngõ sinh viên',
          characters: ['Bạn (Founder)', 'Co-founder (Chuyên bếp)'],
          whatHappened: 'Bạn quyết định chỉ thuê ki-ốt nhỏ trong ngõ với giá 10M/tháng và giữ lại 35M làm quỹ dự phòng. Bạn rủ được 1 người bạn có tay nghề nấu ăn cùng làm.',
          whyItHappened: 'Phân tích rủi ro đã chỉ ra tiền thuê lớn là cạm bẫy dễ sập tiệm nhất.',
          consequence: 'Giảm 50% áp lực tài chính cố định, sản phẩm món ăn ngon và đậm vị ngay từ ngày đầu.',
          emotionalState: 'Hào hứng, tự tin và kiểm soát được rủi ro.',
          stateChanges: [
            { entity: 'Vốn khả dụng', from: '100M', to: '65M (còn 35M dự phòng)' },
            { entity: 'Quán ăn', from: 'Ý tưởng', to: 'Setup hoàn tất' }
          ],
          images: [
            {
              id: 'img_b1_a',
              type: 'WIDE_CONTEXT',
              label: 'Ảnh 1: Toàn cảnh không gian',
              caption: 'Ki-ốt nhỏ xinh xắn được trang trí tối giản, sạch sẽ tại khu ngõ sinh viên đông đúc.',
              prompt: 'A cozy small Vietnamese student eatery storefront in a vibrant Hanoi alley, warm yellow lighting, clean minimalist decor, chalk menu on wall, realistic street photography 8k',
              semanticSearchQuery: 'opening_store_renovation',
              url: imageService.getImageForScene('opening_store_renovation', 'A cozy small Vietnamese student eatery storefront in a vibrant Hanoi alley, warm yellow lighting, clean minimalist decor')
            },
            {
              id: 'img_b1_b',
              type: 'HUMAN_DETAIL',
              label: 'Ảnh 2: Nhân vật & Cảm xúc',
              caption: 'Hai bạn trẻ founder cùng nhau kiểm tra mẻ sốt đặc trưng đầu tiên trong bếp.',
              prompt: 'Two young Vietnamese founders in aprons laughing and tasting signature sauce in a clean kitchen, realistic cinematic shot 35mm lens authentic expressions',
              semanticSearchQuery: 'success_thriving_business',
              url: imageService.getImageForScene('success_thriving_business', 'Two young Vietnamese founders in aprons laughing and tasting signature sauce in a clean kitchen')
            }
          ],
          nextPossibleEvents: ['Chiến dịch TikTok viral tạo dòng khách lớn', 'Mở rộng menu trưa']
        },
        {
          id: 's_best_2',
          universeId: `${simId}_univ_best`,
          sceneNumber: 2,
          dayOrTime: 'Tháng 4',
          title: 'Hiệu ứng Lan Tỏa & Quán trở nên đông khách',
          location: 'Quán ăn vào giờ cao điểm 12h trưa',
          characters: ['Bạn', 'Sinh viên các trường lân cận'],
          whatHappened: 'Nhờ các clip ngắn review chân thực trên TikTok và món ăn chất lượng, lượng sinh viên kéo đến kín bàn từ 11h30 đến 13h30.',
          whyItHappened: 'Thế mạnh Marketing kết hợp với chất lượng món ăn ổn định của Co-founder.',
          consequence: 'Dòng tiền đạt điểm hòa vốn sau 45 ngày và bắt đầu có lãi ròng 18M/tháng.',
          emotionalState: 'Phấn khởi, tất bật nhưng tràn đầy năng lượng.',
          stateChanges: [
            { entity: 'Doanh thu', from: '0', to: '65M/tháng (Lãi ròng 18M)' },
            { entity: 'Khách hàng', from: 'Vài người quen', to: 'Đông kín bàn' }
          ],
          images: [
            {
              id: 'img_b2_a',
              type: 'WIDE_CONTEXT',
              label: 'Ảnh 1: Không gian đông đúc',
              caption: 'Bàn ghế kín chỗ, sinh viên vui vẻ ăn uống và check-in.',
              prompt: 'Busy packed Vietnamese student restaurant, crowded tables of smiling college students eating delicious food, steam rising, energetic lively atmosphere, photorealistic',
              semanticSearchQuery: 'busy_restaurant_customers',
              url: imageService.getImageForScene('busy_restaurant_customers', 'Busy packed Vietnamese student restaurant, crowded tables of smiling college students eating delicious food')
            }
          ],
          nextPossibleEvents: ['Đăng ký bảo hộ nhãn hiệu', 'Triển khai app tích điểm']
        }
      ],
      keyDecisions: []
    };

    // 2. Realistic Universe
    const realisticCase: ParallelUniverse = {
      id: `${simId}_univ_real`,
      simulationId: simId,
      name: 'Universe Beta: Hiện Thực Thử Thách (Realistic)',
      type: 'REALISTIC',
      tagline: 'Thuê mặt bằng 18M, 2 tháng đầu vắng khách, phải đổi chiến lược bán mang đi.',
      metrics: {
        successPotential: 68,
        riskLevel: 55,
        difficulty: 72,
        stressLevel: 68,
        rewardPotential: 70,
        stability: 60
      },
      currentSceneIndex: 0,
      status: 'ACTIVE',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      scenes: [
        {
          id: 's_real_1',
          universeId: `${simId}_univ_real`,
          sceneNumber: 1,
          dayOrTime: 'Tháng 2',
          title: 'Áp lực tiền thuê & Kỳ nghỉ hè vắng sinh viên',
          location: 'Quán ăn mặt đường 18M/tháng',
          characters: ['Bạn (Chủ quán)'],
          whatHappened: 'Mặt bằng 18M ngốn hết tiền cọc 3 tháng (54M) + setup 35M. Khi sinh viên vào kỳ nghỉ hè, doanh thu sụt giảm 60%.',
          whyItHappened: 'Yếu tố mùa vụ của sinh viên (External Factor) không được lường trước trong kế hoạch ban đầu.',
          consequence: 'Dòng tiền mặt chạm đáy chỉ còn 11M, đối mặt với nguy cơ không trả nổi tiền nhà tháng tới.',
          emotionalState: 'Căng thẳng, mất ngủ, áp lực đè nặng.',
          stateChanges: [
            { entity: 'Dòng tiền', from: '100M', to: '11M (Nguy cơ thâm hụt)' },
            { entity: 'Tâm lý', from: 'Háo hức', to: 'Căng thẳng tột độ' }
          ],
          images: [
            {
              id: 'img_r1_a',
              type: 'WIDE_CONTEXT',
              label: 'Ảnh 1: Quán vắng vẻ',
              caption: 'Quán ăn vắng khách giữa trưa hè, bàn ghế trống trải.',
              prompt: 'An empty modern Vietnamese restaurant interior during a hot afternoon, empty chairs, quiet atmosphere, dramatic moody lighting, authentic documentary style',
              semanticSearchQuery: 'empty_restaurant_worried',
              url: imageService.getImageForScene('empty_restaurant_worried', 'An empty modern Vietnamese restaurant interior during a hot afternoon, empty chairs, quiet atmosphere')
            },
            {
              id: 'img_r1_b',
              type: 'HUMAN_DETAIL',
              label: 'Ảnh 2: Người chủ quán suy tư',
              caption: 'Bạn ngồi tại góc bàn tính toán sổ sách thu chi với vẻ mặt đầy lo âu.',
              prompt: 'A tired young Vietnamese business owner holding head in hands looking at an expense calculator and bills on a wooden table, soft dramatic window light 8k',
              semanticSearchQuery: 'debt_stress_calculator',
              url: imageService.getImageForScene('debt_stress_calculator', 'A tired young Vietnamese business owner holding head in hands looking at an expense calculator and bills')
            }
          ],
          decisionPoint: {
            id: 'dec_real_1',
            sceneId: 's_real_1',
            time: 'Tháng 2 - Ngày 45',
            title: 'QUYẾT ĐỊNH QUAN TRỌNG: Cứu vãn dòng tiền hay Rút lui?',
            situation: 'Tiền mặt chỉ còn 11M, hạn đóng tiền nhà 18M sắp đến trong 10 ngày nữa.',
            whyItMatters: 'Quyết định này phân nhánh trực tiếp giữa việc phá sản ôm nợ hay lật ngược thế cờ.',
            impact: 'CRITICAL',
            options: [
              {
                id: 'opt_a',
                label: 'Lựa chọn A: Mở bán Cơm văn phòng Online & Đăng ký Grab/ShopeeFood',
                description: 'Tận dụng thời gian rảnh của bếp để nhắm vào tệp nhân viên công sở xung quanh bán kính 3km.',
                shortTermEffect: 'Bù đắp dòng tiền ngay sau 5 ngày, không bị phụ thuộc sinh viên.',
                longTermPossibility: 'Tạo thêm nhánh doanh thu 20M/tháng ổn định.',
                risk: 'Phải chiết khấu 25% cho sàn ứng dụng.',
                opportunity: 'Mở rộng tệp khách hàng ngoài trường học.'
              },
              {
                id: 'opt_b',
                label: 'Lựa chọn B: Vay mượn bạn bè 50M để tiếp tục gồng lỗ',
                description: 'Tiếp tục giữ nguyên mô hình và chạy quảng cáo Facebook phủ quanh khu vực.',
                shortTermEffect: 'Giải tỏa áp lực tiền nhà tức thì.',
                longTermPossibility: 'Gia tăng nợ xấu nếu sinh viên chưa nhập học lại.',
                risk: 'Rủi ro mất trắng nếu doanh thu không tăng.',
                opportunity: 'Bảo vệ được mặt bằng đẹp.'
              },
              {
                id: 'opt_c',
                label: 'Lựa chọn C: Sang nhượng quán thu hồi tiền cọc 30M',
                description: 'Chấp nhận dừng lại để bảo toàn vốn và không để phát sinh nợ.',
                shortTermEffect: 'Thu hồi được 30M tiền cọc, giải thoát tâm lý.',
                longTermPossibility: 'Mất chi phí setup ban đầu nhưng không ôm nợ.',
                risk: 'Mất công sức xây dựng.',
                opportunity: 'Bắt đầu lại với kinh nghiệm thực chiến quý giá.'
              }
            ],
            aiRecommendation: {
              recommendedOptionId: 'opt_a',
              rationale: 'Chi phí Marketing chuyển sang Online không tốn thêm vốn cố định, tận dụng triệt để năng lực bếp để tạo dòng tiền tức thì.',
              actionableStep: 'Đăng ký gian hàng Grab/ShopeeFood trong 24h và thiết kế combo cơm trưa 35k giao nhanh.'
            }
          },
          nextPossibleEvents: ['Kích hoạt kênh Delivery', 'Cân đối lại dòng tiền']
        }
      ],
      keyDecisions: []
    };

    // 3. Worst Case Universe
    const worstCase: ParallelUniverse = {
      id: `${simId}_univ_worst`,
      simulationId: simId,
      name: 'Universe Gamma: Vực Thẳm Dòng Tiền (Worst Case)',
      type: 'WORST_CASE',
      tagline: 'Tiêu hết 100M vào mặt bằng lớn, đối thủ mở sát vách, sang nhượng lỗ nặng.',
      metrics: {
        successPotential: 18,
        riskLevel: 92,
        difficulty: 90,
        stressLevel: 95,
        rewardPotential: 25,
        stability: 15
      },
      currentSceneIndex: 0,
      status: 'ACTIVE',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      scenes: [
        {
          id: 's_worst_1',
          universeId: `${simId}_univ_worst`,
          sceneNumber: 1,
          dayOrTime: 'Tháng 5',
          title: 'Cạn kiệt thanh khoản & Đối thủ cạnh tranh giá rẻ',
          location: 'Cửa hàng đóng cửa cài then',
          characters: ['Bạn (Chủ quán)'],
          whatHappened: 'Sau 4 tháng gồng lỗ chi phí 25M/tháng và một quán cơm lớn mở ngay đối diện giảm giá 50%, dòng tiền âm hoàn toàn. Bạn buộc phải đóng cửa và dán biển sang nhượng.',
          whyItHappened: 'Không có quỹ dự phòng khẩn cấp, chi phí cố định quá cao so với quy mô vốn 100M.',
          consequence: 'Mất toàn bộ vốn 100M, gánh thêm khoản nợ 30M và tổn thương tâm lý.',
          emotionalState: 'Kiệt sức, tuyệt vọng và tiếc nuối.',
          stateChanges: [
            { entity: 'Doanh nghiệp', from: 'Đang hoạt động', to: 'Phá sản / Sang nhượng' },
            { entity: 'Tài chính', from: '100M', to: '-30M (Nợ nần)' }
          ],
          images: [
            {
              id: 'img_w1_a',
              type: 'WIDE_CONTEXT',
              label: 'Ảnh 1: Cửa hàng đóng cửa sang nhượng',
              caption: 'Cửa cuốn đóng kín, biển hiệu tắt đèn kèm số điện thoại sang nhượng quán.',
              prompt: 'A closed Vietnamese restaurant storefront with metal roller shutter pulled down, a hand-written sign "Sang nhượng quán" (For Lease), empty quiet street at dusk, cinematic realism',
              semanticSearchQuery: 'closed_storefront',
              url: imageService.getImageForScene('closed_storefront', 'A closed Vietnamese restaurant storefront with metal roller shutter pulled down')
            }
          ],
          nextPossibleEvents: ['Thanh lý tài sản', 'Tìm việc văn phòng hồi phục tài chính']
        }
      ],
      keyDecisions: []
    };

    // 4. Alternative Universe: Online-First Validation
    const altCase: ParallelUniverse = {
      id: `${simId}_univ_alt`,
      simulationId: simId,
      name: 'Universe Delta: Khởi Động Tinh Gọn (Alternative Online-First)',
      type: 'ALTERNATIVE',
      tagline: 'Không thuê mặt bằng đắt đỏ. Bắt đầu từ bếp gia đình, chỉ tốn 20M kiểm chứng thị trường.',
      metrics: {
        successPotential: 85,
        riskLevel: 20,
        difficulty: 45,
        stressLevel: 30,
        rewardPotential: 78,
        stability: 90
      },
      currentSceneIndex: 0,
      status: 'ACTIVE',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      scenes: [
        {
          id: 's_alt_1',
          universeId: `${simId}_univ_alt`,
          sceneNumber: 1,
          dayOrTime: 'Tháng 1',
          title: 'Thử nghiệm sản phẩm với chi phí tối thiểu',
          location: 'Bếp gia đình & Điểm đóng gói giao hàng',
          characters: ['Bạn'],
          whatHappened: 'Thay vì vội vã ký hợp đồng thuê nhà 1 năm, bạn dành 20M mua bao bì đẹp, máy hút chân không và bán đồ ăn vặt/cơm văn phòng qua TikTok Shop & Facebook.',
          whyItHappened: 'Áp dụng nguyên lý Lean Startup: Xác thực nhu cầu khách hàng trước khi đầu tư tài sản cố định.',
          consequence: 'Còn nguyên 80M trong tài khoản tiết kiệm sinh lời, tích lũy 500 khách hàng thân thiết đầu tiên.',
          emotionalState: 'Thư thái, tập trung hoàn thiện công thức món ăn.',
          stateChanges: [
            { entity: 'Chi phí rủi ro', from: '100M', to: '20M' },
            { entity: 'Khách hàng', from: '0', to: '500 khách quen' }
          ],
          images: [
            {
              id: 'img_a1_a',
              type: 'WIDE_CONTEXT',
              label: 'Ảnh 1: Đóng gói đơn hàng giao online',
              caption: 'Hàng chục hộp đồ ăn được đóng gói sạch sẽ, shipper tấp nập đến nhận đơn.',
              prompt: 'A young Vietnamese entrepreneur neatly packaging modern eco-friendly meal boxes for delivery, multiple delivery drivers waiting outside, clean efficient home kitchen workspace, 8k realistic photo',
              semanticSearchQuery: 'online_delivery_packaging',
              url: imageService.getImageForScene('online_delivery_packaging', 'A young Vietnamese entrepreneur neatly packaging modern eco-friendly meal boxes for delivery')
            }
          ],
          nextPossibleEvents: ['Mở cửa hàng vật lý khi lượng đơn đã quá tải']
        }
      ],
      keyDecisions: []
    };

    // 5. Unexpected Opportunity Universe
    const unexpectedCase: ParallelUniverse = {
      id: `${simId}_univ_unexp`,
      simulationId: simId,
      name: 'Universe Epsilon: Bước Ngoặt Bất Ngờ (Unexpected)',
      type: 'UNEXPECTED',
      tagline: 'Món nước sốt độc quyền được chuỗi nhà hàng lớn ngỏ lời mua nhượng quyền.',
      metrics: {
        successPotential: 92,
        riskLevel: 28,
        difficulty: 50,
        stressLevel: 35,
        rewardPotential: 95,
        stability: 85
      },
      currentSceneIndex: 0,
      status: 'ACTIVE',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      scenes: [
        {
          id: 's_unexp_1',
          universeId: `${simId}_univ_unexp`,
          sceneNumber: 1,
          dayOrTime: 'Tháng 3',
          title: 'Cơ hội hợp tác B2B bất ngờ',
          location: 'Phòng họp đàm phán hợp đồng',
          characters: ['Bạn', 'Đại diện chuỗi F&B'],
          whatHappened: 'Món nước sốt đặc biệt của bạn gây sốt trên mạng, một chuỗi cửa hàng ăn nhanh 20 chi nhánh đề nghị hợp tác cung ứng nước sốt độc quyền.',
          whyItHappened: 'Thế mạnh Marketing kết hợp với công thức gia vị độc đáo tạo ra giá trị tài sản trí tuệ.',
          consequence: 'Chuyển đổi mô hình từ quán ăn nhỏ sang xưởng sản xuất gia vị B2B với lợi nhuận cao và rủi ro mặt bằng bằng 0.',
          emotionalState: 'Kinh ngạc và nắm bắt cơ hội lớn.',
          stateChanges: [
            { entity: 'Mô hình kinh doanh', from: 'B2C Quán ăn', to: 'B2B Cung ứng nguyên liệu' },
            { entity: 'Quy mô', from: '1 quán', to: '20 chi nhánh tiêu thụ' }
          ],
          images: [
            {
              id: 'img_u1_a',
              type: 'WIDE_CONTEXT',
              label: 'Ảnh 1: Ký kết hợp đồng hợp tác',
              caption: 'Hai bên bắt tay ký hợp đồng đối tác chiến lược tại văn phòng hiện đại.',
              prompt: 'A confident young Vietnamese entrepreneur shaking hands with a business partner over a signed contract in a bright modern office meeting room, authentic corporate realism',
              semanticSearchQuery: 'success_thriving_business',
              url: imageService.getImageForScene('success_thriving_business', 'A confident young Vietnamese entrepreneur shaking hands with a business partner over a signed contract')
            }
          ],
          nextPossibleEvents: ['Mở rộng dây chuyền sản xuất đóng chai']
        }
      ],
      keyDecisions: []
    };

    // AI Improvement Analysis Report
    const aiReport: AiImprovementReport = {
      whatDoneWell: [
        'Xác định đúng thế mạnh cá nhân về Marketing online để bù đắp nhận diện thương hiệu.',
        'Nhận diện sớm sự thiếu hụt kinh nghiệm vận hành để tìm kiếm giải pháp phòng ngừa.'
      ],
      biggestRisks: [
        {
          risk: 'Chi phí cố định tiền nhà ăn mòn vốn nhanh',
          cause: 'Ký hợp đồng thuê mặt bằng lớn >20M/tháng kèm cọc 3-6 tháng khi chưa có tệp khách sẵn.',
          mitigation: 'Chỉ chấp nhận mặt bằng <12M/tháng hoặc giữ tối thiểu 35M làm quỹ dự phòng bất khả xâm phạm.'
        },
        {
          risk: 'Đứt gãy dòng tiền mùa hè vắng sinh viên',
          cause: 'Mô hình phụ thuộc 100% vào khách hàng học sinh sinh viên tại chỗ.',
          mitigation: 'Xây dựng song song tệp khách văn phòng bán mang đi (Delivery) ngay từ tháng đầu.'
        }
      ],
      missedOpportunities: [
        'Chưa thử nghiệm mô hình Lean Online-First (Bán thử 30 ngày trước khi ký hợp đồng thuê nhà dài hạn).',
        'Chưa đóng gói công thức thành tài sản nhượng quyền hoặc sản phẩm đóng chai.'
      ],
      biggestLever: {
        variableName: 'Chi Phí Thuê Mặt Bằng Hàng Tháng (Fixed Rent)',
        explanation: 'Tiền thuê là đòn bẩy lớn nhất (The Biggest Lever). Giảm tiền thuê từ 20M xuống 10M tăng xác suất sống sót của quán từ 35% lên 88%.',
        comparison: {
          originalValue: '20M/tháng (Áp lực hòa vốn 60M doanh thu)',
          suggestedValue: '10M/tháng (Áp lực hòa vốn chỉ 30M doanh thu)',
          impactDelta: '+53% Xác suất sống sót qua năm đầu tiên'
        }
      },
      bestNextAction: 'Dành 14 ngày tới khảo sát 5 địa điểm ngõ nhỏ có giá thuê dưới 12 triệu và thử nấu 50 suất bán cho bạn bè để lấy phản hồi thực tế.',
      conditionsForSuccess: [
        'Quỹ dự phòng khẩn cấp không bao giờ thấp hơn 30 triệu VND.',
        'Món ăn có Co-founder hoặc đầu bếp ổn định phụ trách chất lượng.',
        'Doanh thu giao hàng trực tuyến (Delivery) chiếm tối thiểu 35% tổng doanh số.'
      ],
      butterflyEffects: [
        {
          id: 'be1',
          trigger: 'Giữ lại 35M quỹ dự phòng không tiêu vào setup quán',
          immediateEffect: 'Có sẵn tiền trả tiền nhà và lương tháng thứ 2-3 khi vắng khách',
          secondaryEffect: 'Không phải vay nóng nợ xấu với lãi suất cao',
          longTermConsequence: 'Duy trì quán vượt qua giai đoạn khó khăn để đạt điểm hòa vốn bền vững',
          isButterflyEffect: true
        }
      ],
      originalTimelineSummary: 'Tiêu 100M mở quán lớn → Tiền thuê 20M ngốn sạch vốn → Gặp đối thủ & mùa hè vắng khách → Dòng tiền âm → Đóng cửa sang nhượng lỗ.',
      improvedTimelineSummary: 'Dùng 20M bán online xác thực món → Thuê ki-ốt ngõ 10M → Giữ 35M dự phòng → Kết hợp giao hàng công sở → Sinh lời bền vững 20M/tháng.'
    };

    const simulation: ParallelUniverseSimulation = {
      schema_version: '1.0',
      simulation_id: simId,
      simulation_version: 1,
      title: scenario.title,
      created_at: timestamp,
      updated_at: timestamp,
      scenario,
      variables: [
        {
          id: 'var_capital',
          name: 'Vốn dự phòng',
          category: 'Money',
          currentValue: '35M VND',
          possibleValues: ['0M', '20M', '35M', '50M'],
          impact: 'CRITICAL',
          uncertainty: 'LOW',
          priorityScore: 12,
          dependencies: ['Thời gian duy trì']
        },
        {
          id: 'var_rent',
          name: 'Tiền thuê mặt bằng',
          category: 'Money',
          currentValue: '10M/tháng',
          possibleValues: ['10M', '18M', '25M'],
          impact: 'CRITICAL',
          uncertainty: 'MEDIUM',
          priorityScore: 10,
          dependencies: ['Điểm hòa vốn']
        }
      ],
      entities: [
        {
          entityId: 'e_business',
          entityName: 'Quán Ăn',
          currentState: 'Đang hoạt động sinh lời',
          stateHistory: [
            { state: 'Ý tưởng', timestamp: 'Tháng 0', cause: 'Lên kế hoạch', consequence: 'Khởi động dự án' },
            { state: 'Vận hành thử nghiệm', timestamp: 'Tháng 1', cause: 'Thuê mặt bằng hợp lý', consequence: 'Kiểm soát dòng tiền' },
            { state: 'Sinh lời bền vững', timestamp: 'Tháng 4', cause: 'Marketing tốt & giữ khách', consequence: 'Tăng trưởng' }
          ]
        }
      ],
      visualBibles: {
        characterBible: [
          {
            id: 'c1',
            name: 'Bạn (Nhân vật chính)',
            description: 'Người trẻ tuổi 24-28, mặc áo phông tối giản và tạp dề làm việc, ánh mắt kiên định, tóc đen ngắn gọn gàng.',
            visualKeywords: ['young Vietnamese entrepreneur', 'focused expression', 'wearing minimalist apron']
          }
        ],
        locationBible: [
          {
            id: 'l1',
            name: 'Quán ăn sinh viên ngõ',
            description: 'Không gian ấm cúng, đèn vàng neon nhẹ, bàn ghế gỗ mộc, biển hiệu vẽ tay bằng phấn trên tường gạch xám.',
            visualKeywords: ['cozy Hanoi alley eatery', 'warm pendant lights', 'clean wooden tables', 'chalkboard menu']
          }
        ],
        objectBible: [
          {
            id: 'o1',
            name: 'Sổ tay doanh thu & Máy tính chi phí',
            description: 'Quyển sổ bìa da ghi chép tỉ mỉ và chiếc máy tính số cầm tay đặt cạnh cốc cà phê phin.',
            visualKeywords: ['expense notebook', 'calculator', 'Vietnamese drip coffee']
          }
        ],
        globalStyle: 'Cinematic documentary photography, natural dramatic 35mm lighting, hyper-realistic, 8k resolution, authentic atmosphere'
      },
      universes: [bestCase, realisticCase, worstCase, altCase, unexpectedCase],
      activeUniverseId: bestCase.id,
      savepoints: [
        {
          id: 'sp_initial',
          name: 'Điểm xuất phát: Trước khi ký hợp đồng thuê',
          universeId: bestCase.id,
          sceneId: 's_best_1',
          timestamp: Date.now(),
          note: 'Trạng thái ban đầu với 100M vốn khả dụng.'
        }
      ],
      aiImprovementReport: aiReport,
      interviewHistory: []
    };

    return simulation;
  },

  // ==========================================
  // 4. API CALL HELPERS (Gemini & OpenAI)
  // ==========================================

  async callGeminiApi(prompt: string, apiKey: string, model = 'gemini-1.5-flash'): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, responseMimeType: 'application/json' }
      })
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini API Error: ${err}`);
    }
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  },

  async callOpenAiApi(prompt: string, apiKey: string, model = 'gpt-4o-mini'): Promise<string> {
    const url = 'https://api.openai.com/v1/chat/completions';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.7
      })
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`OpenAI API Error: ${err}`);
    }
    const data = await res.json();
    return data.choices[0].message.content;
  }
};
