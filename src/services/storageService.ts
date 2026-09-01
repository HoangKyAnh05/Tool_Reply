import { IeltsSpeakingLesson, IeltsRecallTestResult, IeltsCustomQuestion } from '../types/ielts';
import { GenzSavedPhrase, GenzGenerationResult } from '../types/genz';
import { ParallelUniverseSimulation } from '../types/universe';
import { AppSettings } from '../types/settings';
import { ActionTask, CompletedAction, ActionUserProfile, ActionBadge } from '../types/actionEngine';
import { FishboneProject } from '../types/fishbone';
import { FishboneVocabItem } from '../types/fishboneVocab';
import { genzMaster1000Bank } from '../data/genzMaster1000Bank';

const STORAGE_KEYS = {
  SETTINGS: 'app_settings_v1',
  IELTS_LESSONS: 'ielts_lessons_v1',
  IELTS_CURRENT: 'ielts_current_lesson_v1',
  IELTS_TEST_RESULTS: 'ielts_test_results_v1',
  GENZ_SAVED: 'genz_saved_phrases_v1',
  GENZ_HISTORY: 'genz_generation_history_v1',
  SIMULATIONS: 'universe_simulations_v1',
  ACTIVE_SIM_ID: 'universe_active_sim_id_v1',
  ACTION_TASKS: 'action_engine_tasks_v1',
  ACTION_HISTORY: 'action_engine_history_v1',
  ACTION_PROFILE: 'action_engine_profile_v1',
  FISHBONE_PROJECT: 'fishbone_project_v1',
  FISHBONE_CUSTOM_VOCAB: 'fishbone_custom_vocab_v1'
};

export const defaultSettings: AppSettings = {
  aiProvider: 'builtin',
  geminiApiKey: '',
  geminiModel: 'gemini-1.5-flash',
  openaiApiKey: '',
  openaiModel: 'gpt-4o-mini',
  customApiUrl: '',
  customApiKey: '',
  imageProvider: 'pollinations',
  language: 'vi',
  soundEffects: true,
  theme: 'dark',
};

// Default profile for Action Engine
export const defaultActionProfile: ActionUserProfile = {
  username: 'Chiến Binh Hành Động',
  avatar: '🦁',
  totalXP: 450,
  dailyXP: 120,
  currentStreak: 4,
  longestStreak: 12,
  totalActions: 18,
  totalCourageActions: 5,
  totalAntiProcrastinationActions: 7,
  todayFocusMinutes: 65,
  lastActiveDate: new Date().toISOString().split('T')[0]
};

// Preset initial tasks for Today
export const defaultActionTasks: ActionTask[] = [
  {
    id: 'task_1',
    title: 'Hoàn thành bài tập Java Spring Boot',
    description: 'Xây dựng API authentication JWT và kết nối PostgreSQL',
    category: 'Study',
    priority: 'MUST_DO',
    estimatedDuration: 45,
    dueDate: new Date().toISOString().split('T')[0],
    status: 'READY',
    isToday: true,
    nextActionTitle: 'Mở IntelliJ IDEA và viết Entity User trong 10 phút',
    postponedCount: 0,
    timeSpentMinutes: 0,
    createdAt: Date.now() - 7200000
  },
  {
    id: 'task_2',
    title: 'Luyện đề IELTS Speaking Part 2 & 3',
    description: 'Thực hành Visual Master Map chủ đề Minimum Wage & Technology',
    category: 'Study',
    priority: 'MUST_DO',
    estimatedDuration: 30,
    dueDate: new Date().toISOString().split('T')[0],
    status: 'IN_PROGRESS',
    isToday: true,
    nextActionTitle: 'Bật app Imagine Studio và nói theo chuỗi icon 5 phút',
    postponedCount: 0,
    timeSpentMinutes: 15,
    createdAt: Date.now() - 14400000
  },
  {
    id: 'task_3',
    title: 'Gửi tin nhắn đề xuất hợp tác cho đối tác',
    description: 'Viết email ngắn gọn kèm portfolio dự án',
    category: 'Communication',
    priority: 'SHOULD_DO',
    estimatedDuration: 15,
    dueDate: new Date().toISOString().split('T')[0],
    status: 'READY',
    isToday: true,
    nextActionTitle: 'Soạn 3 dòng chào đầu tiên trong Gmail',
    postponedCount: 2,
    timeSpentMinutes: 0,
    createdAt: Date.now() - 86400000,
    isCourageous: true
  },
  {
    id: 'task_4',
    title: 'Dọn dẹp bàn làm việc & backup dữ liệu',
    description: 'Lau màn hình và sync code lên GitHub',
    category: 'Personal',
    priority: 'QUICK_WIN',
    estimatedDuration: 10,
    dueDate: new Date().toISOString().split('T')[0],
    status: 'READY',
    isToday: true,
    nextActionTitle: 'Cất cốc nước và đẩy commit git push',
    postponedCount: 0,
    timeSpentMinutes: 0,
    createdAt: Date.now() - 3600000
  }
];

// Preset Hall of Fame achievements
export const defaultActionHistory: CompletedAction[] = [
  {
    id: 'act_1',
    taskId: 't_old_1',
    taskTitle: 'Gửi CV ứng tuyển công ty công nghệ',
    actionTitle: 'Gửi CV dù rất ngại và sợ bị từ chối',
    category: 'Work',
    difficulty: 'FEARLESS',
    xpEarned: 100,
    isProcrastinated: true,
    isCourageous: true,
    courageReason: 'Tôi đã vượt qua nỗi sợ để gửi email trực tiếp cho Tech Lead.',
    reflectionNote: 'Không cần hết sợ mới làm, cứ bấm Send là nhẹ nhõm hẳn.',
    visibility: 'public',
    reactions: { respect: 8, brave: 12, letsGo: 15, proud: 6 },
    completedAt: Date.now() - 3600000 * 5
  },
  {
    id: 'act_2',
    taskId: 't_old_2',
    taskTitle: 'Tập thể dục 30 phút buổi sáng',
    actionTitle: 'Xỏ giày chạy bộ 5 phút đầu tiên sau 1 tháng lười biếng',
    category: 'Health',
    difficulty: 'BRAVE',
    xpEarned: 50,
    isProcrastinated: true,
    isCourageous: false,
    visibility: 'public',
    reactions: { respect: 5, brave: 3, letsGo: 9, proud: 4 },
    completedAt: Date.now() - 86400000
  }
];

// Default Fishbone Project
export const defaultFishboneProject: FishboneProject = {
  schemaVersion: '1.0',
  projectVersion: 1,
  id: 'fishbone_company_growth',
  name: 'Tiến Hóa Doanh Nghiệp F&B & Công Nghệ',
  industry: 'F&B & Tech Operations',
  description: 'Bản đồ tiến hóa từ mô hình khởi đầu đơn lẻ đến chuỗi vận hành tự động hóa chuẩn ISO',
  currentLevelNumber: 1,
  targetLevelNumber: 5,
  updatedAt: new Date().toISOString(),
  dimensions: [
    { id: 'dim_people', name: 'Nhân Sự & Đào Tạo', weight: 20, score: 60, icon: '👥' },
    { id: 'dim_process', name: 'Quy Trình & SOP', weight: 25, score: 45, icon: '📋' },
    { id: 'dim_quality', name: 'Chất Lượng & QA', weight: 20, score: 70, icon: '🎯' },
    { id: 'dim_tech', name: 'Công Nghệ & Tự Động', weight: 15, score: 35, icon: '💻' },
    { id: 'dim_finance', name: 'Tài Chính & Dòng Tiền', weight: 20, score: 65, icon: '💰' }
  ],
  levels: [
    {
      id: 'lvl_1',
      number: 1,
      name: 'Level 1: Vận Hành Khởi Đầu (Founder-Centric)',
      tagline: 'Giai đoạn sinh tồn, phụ thuộc 90% vào người sáng lập',
      description: 'Mọi quyết định và công việc đều do Founder tự làm bằng tay, chưa có tài liệu quy chuẩn SOP.',
      objective: 'Xây dựng 5 SOP cốt lõi, tuyển dụng 2 nhân sự cứng và ổn định dòng tiền dương.',
      status: 'in_progress',
      progress: 65,
      maturityScore: 52,
      currentState: {
        teamSize: 3,
        tasksPerWeek: 45,
        workflowType: 'Thủ công hoàn toàn qua chat Zalo',
        sopCount: 2,
        qualityScore: 65,
        automationPercent: 10,
        revenueMonthlyVnd: '65M'
      },
      targetState: {
        teamSize: 6,
        tasksPerWeek: 90,
        workflowType: 'Quy chuẩn hóa checklist trên app',
        sopCount: 10,
        qualityScore: 85,
        automationPercent: 40,
        revenueMonthlyVnd: '150M'
      },
      dimensions: [
        { id: 'dim_people', name: 'Nhân Sự', weight: 20, score: 55 },
        { id: 'dim_process', name: 'Quy Trình SOP', weight: 25, score: 40 },
        { id: 'dim_quality', name: 'Chất Lượng', weight: 20, score: 65 },
        { id: 'dim_tech', name: 'Tự Động Hóa', weight: 15, score: 30 },
        { id: 'dim_finance', name: 'Tài Chính', weight: 20, score: 60 }
      ],
      requirements: [
        {
          id: 'req_1',
          levelId: 'lvl_1',
          dimensionId: 'dim_process',
          dimensionName: 'Quy Trình SOP',
          title: 'Soạn thảo bộ 5 SOP Mở/Đóng ca & Pha chế chuẩn',
          description: 'Văn bản hóa các bước nấu/pha chế để nhân viên mới học trong 2 ngày.',
          priority: 'critical',
          status: 'in_progress',
          owner: 'Founder',
          progress: 80,
          isMandatoryForLevelUp: true,
          acceptanceCriteria: ['5 SOP hoàn thành có hình ảnh', 'Nhân viên mới thi đỗ bài test 90%'],
          tasks: [
            {
              id: 't_sop_1',
              requirementId: 'req_1',
              title: 'Chụp ảnh các bước chuẩn bị nguyên liệu',
              priority: 'high',
              status: 'done',
              estimatedEffortDays: 1,
              completionPercent: 100
            },
            {
              id: 't_sop_2',
              requirementId: 'req_1',
              title: 'In bảng checklist ép plastic treo tại bếp',
              priority: 'critical',
              status: 'in_progress',
              estimatedEffortDays: 1,
              completionPercent: 60
            }
          ]
        },
        {
          id: 'req_2',
          levelId: 'lvl_1',
          dimensionId: 'dim_tech',
          dimensionName: 'Công Nghệ',
          title: 'Triển khai phần mềm POS & Máy in bill tự động',
          description: 'Loại bỏ ghi order giấy để tránh sai sót và thất thoát doanh thu.',
          priority: 'high',
          status: 'done',
          owner: 'Tech Lead',
          progress: 100,
          isMandatoryForLevelUp: true,
          acceptanceCriteria: ['Kết nối máy in bill mượt mà', 'Báo cáo doanh thu đồng bộ theo ngày'],
          tasks: []
        }
      ],
      kpis: [
        { id: 'kpi_rev', name: 'Doanh Thu Hàng Tháng', category: 'Finance', currentValue: 75, targetValue: 120, unit: 'Triệu VND', minThreshold: 60, weight: 30, status: 'on_track' },
        { id: 'kpi_sop', name: 'Số lượng SOP chuẩn', category: 'Process', currentValue: 4, targetValue: 8, unit: 'SOP', minThreshold: 5, weight: 25, status: 'on_track' },
        { id: 'kpi_err', name: 'Tỷ lệ sai sót đơn hàng', category: 'Quality', currentValue: 6, targetValue: 2, unit: '%', minThreshold: 4, weight: 25, status: 'at_risk' },
        { id: 'kpi_auto', name: 'Tỷ lệ tự động hóa', category: 'Tech', currentValue: 25, targetValue: 40, unit: '%', minThreshold: 20, weight: 20, status: 'on_track' }
      ],
      exitCriteria: [
        { id: 'qc_1', title: 'Điểm Process Maturity đạt ≥ 60/100', category: 'Process', targetRequirement: 'Hoàn thiện SOP cốt lõi', isSatisfied: false, failureReason: 'Hiện tại điểm Quy Trình mới đạt 45/100.' },
        { id: 'qc_2', title: 'Hoàn thành 100% các Requirement Critical bắt buộc', category: 'Quality', targetRequirement: 'Bảng checklist SOP hoàn chỉnh', isSatisfied: false, failureReason: 'Còn 1 task checklist in ấn chưa xong.' },
        { id: 'qc_3', title: 'Tỷ lệ sai sót đơn hàng ≤ 3%', category: 'KPI', targetRequirement: 'Hạn chế lỗi pha chế', isSatisfied: false, failureReason: 'Tỷ lệ sai sót thực tế đang ở mức 6%.' }
      ],
      blockers: [
        { id: 'blk_1', title: 'Chưa có người giám sát chất lượng ca tối', severity: 'critical', resolutionPlan: 'Bổ sung trưởng ca và phân quyền kiểm tra checklist cuối ngày.' }
      ],
      nextBestActions: [
        { id: 'nba_1', title: 'Hoàn thành việc in và dán bảng checklist SOP tại quầy pha chế', impact: 'Very High', effort: '1 ngày', requirementId: 'req_1' },
        { id: 'nba_2', title: 'Tổ chức buổi training 30 phút cho 2 nhân viên mới', impact: 'High', effort: '2 giờ' }
      ]
    },
    {
      id: 'lvl_2',
      number: 2,
      name: 'Level 2: Chuẩn Hóa & Phân Quyền Quản Lý',
      tagline: 'Giảm 70% sự can thiệp của Founder, hình thành ban quản lý',
      description: 'Có trưởng ca, quy trình kiểm toán tồn kho hàng tuần và hệ thống CRM chăm sóc khách hàng tự động.',
      objective: 'Tự động hóa 60% khâu vận hành, đạt doanh thu 250M/tháng.',
      status: 'locked',
      progress: 0,
      maturityScore: 20,
      currentState: { teamSize: 6, tasksPerWeek: 90, workflowType: 'Checklist', sopCount: 10, qualityScore: 85, automationPercent: 40, revenueMonthlyVnd: '150M' },
      targetState: { teamSize: 12, tasksPerWeek: 200, workflowType: 'Hệ thống ERP mini', sopCount: 25, qualityScore: 92, automationPercent: 65, revenueMonthlyVnd: '350M' },
      dimensions: [],
      requirements: [],
      kpis: [],
      exitCriteria: [],
      blockers: [],
      nextBestActions: []
    }
  ],
  snapshots: []
};

// Preset IELTS lesson
export const defaultIeltsLesson: IeltsSpeakingLesson = {
  id: 'ielts_sample_minimum_wage',
  topic: 'Minimum Wage & Economic Activity',
  question: 'Part 3: Do you believe increasing the minimum wage benefits or harms the national economy? Why?',
  part: 'Part 3',
  visualMasterMap: ['💵⬆️', '👷', '🪙', '🔒💼', '🆘', '🌊', '🛒', '🚀', '📈', '💪', '🎯'],
  fullSpeakingAnswer: `🤔 In my opinion, 💵⬆️ increasing the minimum wage can 🚀 spur economic activity rather than suppress it. 

🥇 First of all, when wages are too low, 👷 low-income workers are forced to 🪙 pinch pennies just to afford basic necessities, leaving them 🔒 remain stuck in a relentless cycle of financial stress. 

➕ In addition, providing a living wage creates a positive 🌊 ripple effect throughout the broader marketplace. When workers earn more, their 💪 purchasing power expands significantly, prompting greater 🛒 consumer spending at local businesses. 

🛑 However, some argue that higher labor costs could burden small firms. 🔗 As a result, wages should 🔄 be indexed to local living costs to maintain ⚖️ economic equilibrium. 

🎯 Ultimately, a well-calibrated minimum wage is a vital catalyst that 🏃 keeps pace with inflation and uplifts society as a whole.`,
  vocabList: [
    { id: 'v1', icon: '🪙', word: 'pinch pennies', meaning: 'tằn tiện từng đồng, thắt lưng buộc bụng', visualSentence: '🪙 When wages stagnate, families must pinch pennies to survive.', sentenceMeaning: 'Khi tiền lương đình trệ, các gia đình buộc phải tằn tiện từng đồng để sinh tồn.', category: 'Finance' },
    { id: 'v2', icon: '🔒💼', word: 'remain stuck in', meaning: 'kẹt cứng trong hoàn cảnh bế tắc', visualSentence: '🔒💼 Without career mobility, workers remain stuck in low-paying roles.', sentenceMeaning: 'Nếu thiếu cơ hội thăng tiến, người lao động sẽ kẹt cứng trong các vị trí lương thấp.', category: 'Work' },
    { id: 'v3', icon: '🌊', word: 'ripple effect', meaning: 'hiệu ứng gợn sóng lan tỏa', visualSentence: '🌊 A wage increase creates a positive ripple effect across consumer markets.', sentenceMeaning: 'Việc tăng lương tạo ra hiệu ứng lan tỏa tích cực trên toàn thị trường tiêu dùng.', category: 'Economy' },
    { id: 'v4', icon: '🚀', word: 'spur job growth', meaning: 'thúc đẩy tăng trưởng việc làm / kinh tế', visualSentence: '🚀 Higher disposable income spurs job growth in retail and dining.', sentenceMeaning: 'Thu nhập khả dụng cao hơn thúc đẩy tăng trưởng việc làm trong ngành bán lẻ và ăn uống.', category: 'Economy' },
    { id: 'v5', icon: '💪', word: 'purchasing power', meaning: 'sức mua của người tiêu dùng', visualSentence: '💪 A boost in purchasing power directly fuels local commerce.', sentenceMeaning: 'Sự gia tăng sức mua tiếp thêm động lực trực tiếp cho thương mại địa phương.', category: 'Finance' },
    { id: 'v6', icon: '🏃', word: 'keep pace with', meaning: 'bắt kịp, theo kịp đà tăng trưởng/lạm phát', visualSentence: '🏃 Base salaries must keep pace with the rising cost of living.', sentenceMeaning: 'Lương cơ bản phải bắt kịp với chi phí sinh hoạt ngày càng tăng.', category: 'General' },
    { id: 'v7', icon: '🔄', word: 'be indexed to', meaning: 'được điều chỉnh theo chỉ số (lạm phát/vùng)', visualSentence: '🔄 Minimum wage should be indexed to regional inflation metrics.', sentenceMeaning: 'Mức lương tối thiểu nên được điều chỉnh theo các chỉ số lạm phát khu vực.', category: 'Policy' }
  ],
  connectorTable: [
    { icon: '🤔', connector: 'In my opinion,', function: 'Opinion', vietnamese: 'Theo quan điểm của tôi' },
    { icon: '🥇', connector: 'First of all,', function: 'First point', vietnamese: 'Trước hết' },
    { icon: '➕', connector: 'In addition,', function: 'Add idea', vietnamese: 'Ngoài ra / Thêm vào đó' },
    { icon: '🔍', connector: 'For example,', function: 'Example', vietnamese: 'Ví dụ' },
    { icon: '🛑', connector: 'However,', function: 'Contrast', vietnamese: 'Tuy nhiên' },
    { icon: '🔗', connector: 'As a result,', function: 'Result', vietnamese: 'Kết quả là' },
    { icon: '🎯', connector: 'Therefore,', function: 'Conclusion', vietnamese: 'Vì vậy' },
    { icon: '❤️', connector: 'More importantly,', function: 'Emphasis', vietnamese: 'Quan trọng hơn cả' },
    { icon: '🎯', connector: 'Ultimately,', function: 'Final conclusion', vietnamese: 'Cuối cùng / Tựu trung lại' }
  ],
  bilingualSummary: {
    english: '💵⬆️ Higher wages prevent 👷 workers from needing to 🪙 pinch pennies or 🔒 remain stuck in poverty. This unleashes a 🌊 ripple effect that boosts 💪 purchasing power and 🚀 spurs economic growth.',
    vietnamese: '💵⬆️ Tăng lương cơ bản giúp 👷 người lao động không phải 🪙 tằn tiện từng đồng hay 🔒 kẹt mãi trong nghèo khó. Điều này tạo nên 🌊 hiệu ứng lan tỏa, nâng cao 💪 sức mua và 🚀 thúc đẩy nền kinh tế.'
  },
  thirtySecondMemory: {
    iconChain: '💵⬆️ → 👷 → 🪙 → 🔒💼 → 🌊 → 🛒 → 🚀 → 💪 → 🎯',
    explanations: [
      { icon: '💵⬆️', textEn: 'Raise minimum wage', textVi: 'Tăng mức lương tối thiểu' },
      { icon: '👷', textEn: 'Helps low-income workers', textVi: 'Hỗ trợ công nhân nghèo' },
      { icon: '🪙', textEn: 'No longer pinch pennies', textVi: 'Không còn tằn tiện từng đồng' },
      { icon: '🔒💼', textEn: 'Escape dead-end jobs', textVi: 'Thoát khỏi cảnh kẹt cứng' },
      { icon: '🌊', textEn: 'Spreads ripple effect', textVi: 'Tạo hiệu ứng lan tỏa' },
      { icon: '🛒', textEn: 'Increases spending', textVi: 'Kích cầu tiêu dùng' },
      { icon: '🚀', textEn: 'Spurs economic growth', textVi: 'Tăng trưởng kinh tế mạnh mẽ' },
      { icon: '💪', textEn: 'Stronger purchasing power', textVi: 'Nâng cao sức mua' },
      { icon: '🎯', textEn: 'Balanced sustainable future', textVi: 'Đạt cân bằng bền vững' }
    ]
  },
  vocabMemoryMap: [
    { icon: '🪙', vocabulary: 'pinch pennies', coreIdea: 'Save every little bit of money under tight constraint' },
    { icon: '🔒💼', vocabulary: 'remain stuck in', coreIdea: 'Unable to escape a restrictive or low-paying state' },
    { icon: '🌊', vocabulary: 'ripple effect', coreIdea: 'One localized policy change triggers widespread impact' },
    { icon: '🚀', vocabulary: 'spur job growth', coreIdea: 'Catalyze and encourage employment & business expansion' },
    { icon: '💪', vocabulary: 'purchasing power', coreIdea: 'Financial capacity of citizens to acquire goods' },
    { icon: '🏃', vocabulary: 'keep pace with', coreIdea: 'Maintain consistent progression alongside inflation' },
    { icon: '🔄', vocabulary: 'be indexed to', coreIdea: 'Automatically adjusted relative to official economic benchmarks' }
  ],
  recallTest: {
    iconSequence: ['🪙', '🔒💼', '🌊', '🚀', '💪'],
    targetConcepts: ['pinch pennies', 'remain stuck in', 'ripple effect', 'spur job growth', 'purchasing power'],
    hintWords: ['pinch', 'stuck', 'ripple', 'spur', 'power']
  },
  createdAt: Date.now() - 3600000
};

export const storageService = {
  getSettings(): AppSettings {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return defaultSettings;
    try {
      return { ...defaultSettings, ...JSON.parse(raw) };
    } catch {
      return defaultSettings;
    }
  },

  saveSettings(settings: AppSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // IELTS
  getIeltsLessons(): IeltsSpeakingLesson[] {
    const raw = localStorage.getItem(STORAGE_KEYS.IELTS_LESSONS);
    if (!raw) {
      const initial = [defaultIeltsLesson];
      localStorage.setItem(STORAGE_KEYS.IELTS_LESSONS, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [defaultIeltsLesson];
    }
  },

  saveIeltsLesson(lesson: IeltsSpeakingLesson): void {
    const lessons = this.getIeltsLessons();
    const index = lessons.findIndex((l) => l.id === lesson.id);
    if (index >= 0) {
      lessons[index] = lesson;
    } else {
      lessons.unshift(lesson);
    }
    localStorage.setItem(STORAGE_KEYS.IELTS_LESSONS, JSON.stringify(lessons));
    localStorage.setItem(STORAGE_KEYS.IELTS_CURRENT, JSON.stringify(lesson));
  },

  getCurrentIeltsLesson(): IeltsSpeakingLesson {
    const raw = localStorage.getItem(STORAGE_KEYS.IELTS_CURRENT);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {}
    }
    return defaultIeltsLesson;
  },

  saveRecallTestResult(result: IeltsRecallTestResult): void {
    const raw = localStorage.getItem(STORAGE_KEYS.IELTS_TEST_RESULTS) || '[]';
    try {
      const list = JSON.parse(raw);
      list.unshift(result);
      localStorage.setItem(STORAGE_KEYS.IELTS_TEST_RESULTS, JSON.stringify(list));
    } catch {}
  },

  getRecallTestResults(lessonId?: string): IeltsRecallTestResult[] {
    const raw = localStorage.getItem(STORAGE_KEYS.IELTS_TEST_RESULTS) || '[]';
    try {
      const list: IeltsRecallTestResult[] = JSON.parse(raw);
      if (lessonId) return list.filter((r) => r.lessonId === lessonId);
      return list;
    } catch {
      return [];
    }
  },

  // Custom User-Created Questions Bank
  getCustomIeltsQuestions(part?: string): IeltsCustomQuestion[] {
    const raw = localStorage.getItem('ielts_custom_questions_v1');
    if (!raw) return [];
    try {
      const list: IeltsCustomQuestion[] = JSON.parse(raw);
      if (part) return list.filter((q) => q.part === part);
      return list;
    } catch {
      return [];
    }
  },

  saveCustomIeltsQuestion(item: Omit<IeltsCustomQuestion, 'id' | 'createdAt'> & { id?: string }): IeltsCustomQuestion {
    const list = this.getCustomIeltsQuestions();
    const newItem: IeltsCustomQuestion = {
      id: item.id || `custom_${Date.now()}`,
      part: item.part,
      category: item.category || 'Tự tạo',
      topic: item.topic || item.category || 'Tự tạo',
      question: item.question,
      cueCardPrompt: item.cueCardPrompt,
      vocab: item.vocab,
      answer: item.answer,
      imageUrl: item.imageUrl,
      createdAt: Date.now()
    };
    const filtered = list.filter((q) => q.id !== newItem.id);
    const updated = [newItem, ...filtered];
    localStorage.setItem('ielts_custom_questions_v1', JSON.stringify(updated));
    return newItem;
  },

  deleteCustomIeltsQuestion(id: string): void {
    const list = this.getCustomIeltsQuestions();
    const updated = list.filter((q) => q.id !== id);
    localStorage.setItem('ielts_custom_questions_v1', JSON.stringify(updated));
  },

  // GenZify
  getGenzSaved(): GenzSavedPhrase[] {
    const raw = localStorage.getItem(STORAGE_KEYS.GENZ_SAVED);
    let userCustom: GenzSavedPhrase[] = [];
    if (raw) {
      try {
        userCustom = JSON.parse(raw);
      } catch {
        userCustom = [];
      }
    }
    // Lấy danh sách ID đã xóa nếu có
    const deletedRaw = localStorage.getItem(`${STORAGE_KEYS.GENZ_SAVED}_deleted`);
    const deletedIds = new Set<string>(deletedRaw ? JSON.parse(deletedRaw) : []);

    const userIds = new Set(userCustom.map((p) => p.id));
    const activeBank = genzMaster1000Bank.filter((p) => !userIds.has(p.id) && !deletedIds.has(p.id));
    return [...userCustom.filter((p) => !deletedIds.has(p.id)), ...activeBank];
  },

  saveGenzPhrase(phrase: GenzSavedPhrase): void {
    const raw = localStorage.getItem(STORAGE_KEYS.GENZ_SAVED);
    let userCustom: GenzSavedPhrase[] = [];
    if (raw) {
      try {
        userCustom = JSON.parse(raw);
      } catch {
        userCustom = [];
      }
    }
    const idx = userCustom.findIndex((p) => p.id === phrase.id || p.generatedText === phrase.generatedText);
    if (idx >= 0) {
      userCustom[idx] = phrase;
    } else {
      userCustom.unshift(phrase);
    }
    localStorage.setItem(STORAGE_KEYS.GENZ_SAVED, JSON.stringify(userCustom));
  },

  deleteGenzPhrase(id: string): void {
    const raw = localStorage.getItem(STORAGE_KEYS.GENZ_SAVED);
    let userCustom: GenzSavedPhrase[] = [];
    if (raw) {
      try {
        userCustom = JSON.parse(raw);
      } catch {
        userCustom = [];
      }
    }
    userCustom = userCustom.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.GENZ_SAVED, JSON.stringify(userCustom));

    // Thêm vào danh sách deletedIds để không bị nạp lại từ bank mặc định
    const deletedRaw = localStorage.getItem(`${STORAGE_KEYS.GENZ_SAVED}_deleted`);
    const deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      localStorage.setItem(`${STORAGE_KEYS.GENZ_SAVED}_deleted`, JSON.stringify(deletedIds));
    }
  },

  // Simulations
  getSimulations(): ParallelUniverseSimulation[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SIMULATIONS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveSimulation(sim: ParallelUniverseSimulation): void {
    const list = this.getSimulations();
    const idx = list.findIndex((s) => s.simulation_id === sim.simulation_id);
    if (idx >= 0) {
      list[idx] = sim;
    } else {
      list.unshift(sim);
    }
    localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(list));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SIM_ID, sim.simulation_id);
  },

  deleteSimulation(id: string): void {
    const list = this.getSimulations().filter((s) => s.simulation_id !== id);
    localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(list));
  },

  getActiveSimulationId(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_SIM_ID);
  },

  // Feature 4: Action Engine & Hall of Fame
  getActionTasks(): ActionTask[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTION_TASKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ACTION_TASKS, JSON.stringify(defaultActionTasks));
      return defaultActionTasks;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return defaultActionTasks;
    }
  },

  saveActionTasks(tasks: ActionTask[]): void {
    localStorage.setItem(STORAGE_KEYS.ACTION_TASKS, JSON.stringify(tasks));
  },

  getActionHistory(): CompletedAction[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTION_HISTORY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ACTION_HISTORY, JSON.stringify(defaultActionHistory));
      return defaultActionHistory;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return defaultActionHistory;
    }
  },

  saveActionHistory(history: CompletedAction[]): void {
    localStorage.setItem(STORAGE_KEYS.ACTION_HISTORY, JSON.stringify(history));
  },

  getActionProfile(): ActionUserProfile {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTION_PROFILE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ACTION_PROFILE, JSON.stringify(defaultActionProfile));
      return defaultActionProfile;
    }
    try {
      return { ...defaultActionProfile, ...JSON.parse(raw) };
    } catch {
      return defaultActionProfile;
    }
  },

  saveActionProfile(profile: ActionUserProfile): void {
    localStorage.setItem(STORAGE_KEYS.ACTION_PROFILE, JSON.stringify(profile));
  },

  // Feature 5: Fishbone Evolution System
  getFishboneProject(): FishboneProject {
    const raw = localStorage.getItem(STORAGE_KEYS.FISHBONE_PROJECT);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.FISHBONE_PROJECT, JSON.stringify(defaultFishboneProject));
      return defaultFishboneProject;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return defaultFishboneProject;
    }
  },

  saveFishboneProject(project: FishboneProject): void {
    project.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.FISHBONE_PROJECT, JSON.stringify(project));
  },

  getCustomFishboneItems(): FishboneVocabItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.FISHBONE_CUSTOM_VOCAB);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveCustomFishboneItem(item: FishboneVocabItem): void {
    const current = this.getCustomFishboneItems();
    const existingIdx = current.findIndex((i) => i.id === item.id);
    let updated: FishboneVocabItem[];
    if (existingIdx >= 0) {
      updated = current.map((i) => (i.id === item.id ? item : i));
    } else {
      updated = [item, ...current];
    }
    localStorage.setItem(STORAGE_KEYS.FISHBONE_CUSTOM_VOCAB, JSON.stringify(updated));
  },

  deleteCustomFishboneItem(id: number | string): void {
    const current = this.getCustomFishboneItems();
    const updated = current.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.FISHBONE_CUSTOM_VOCAB, JSON.stringify(updated));
  }
};
