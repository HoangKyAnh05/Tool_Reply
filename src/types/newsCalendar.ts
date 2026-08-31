export interface DailyNewsItem {
  id: string;
  date: string; // YYYY-MM-DD
  topic: string;
  topicLabel: string;
  topicIcon: string;
  title: string;
  summary: string;
  content: string; // Toàn văn bài báo đọc trực tiếp trong app
  keyTakeaways: string[];
  sourceName: string;
  sourceUrl: string; // Link web thật (VnExpress, Tuổi Trẻ, CafeF...)
  author: string;
  readTime: string;
  publishedAt: string;
  viewsCount: number;
  imageUrl?: string;
}

export interface DailySurgeDemand {
  id: string;
  date: string; // YYYY-MM-DD
  field: string;
  fieldIcon: string;
  demandTitle: string;
  surgeRate: string; // e.g. "+420% trên Google Trends"
  surgeLevel: 'critical' | 'high' | 'trending';
  triggerReason: string; // Nguyên nhân thực tế theo bối cảnh thị trường
  targetDemographic: string; // Nhóm khách hàng thực tế
  actionOpportunity: string; // Cơ hội hành động / kinh doanh
  statSource: string; // Tên nguồn thống kê uy tín (Google Trends VN, Metric.vn, YouNet Media, GSO...)
  statUrl: string; // Link web thật đến nguồn thống kê số liệu
  statProof: string; // Số liệu thống kê chứng minh thực tế
  searchVolumeIndex: number; // Điểm chỉ số nhiệt
  imageUrl?: string; // Ảnh minh họa / biểu đồ
}

export interface DayNewsBundle {
  date: string;
  news: DailyNewsItem[]; // 10 bài báo mỗi chủ đề (100 bài)
  surgeDemands: DailySurgeDemand[]; // 10 nhu cầu có số liệu thống kê thật
}
