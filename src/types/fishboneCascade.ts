export type CascadeDirection = 'top_down' | 'bottom_up';

export interface CascadeMessageNode {
  id: string;
  roleName: string;            // e.g. "CEO / Tổng Giám Đốc", "Trưởng Phòng Mua Hàng"
  department: string;          // e.g. "Ban Điều Hành", "Khối Mua Hàng & Vận Hành"
  roleIcon: string;            // e.g. "👑", "👔", "📋", "🚚", "🤝"
  direction: CascadeDirection; // 'top_down' | 'bottom_up'
  stageOrder: number;          // 1, 2, 3, 4, 5...
  
  // Content of communication
  messageTitle: string;        // e.g. "Chỉ Đạo Nhập 5 Tấn Cá Hồi Na Uy Tươi"
  exactMessage: string;        // The verbatim directive or report message
  actionRequired: string;      // Action to be executed
  keyConstraints: string;      // Budget, Deadline, SLA, Temperature, Quality
  evidenceOrOutput: string;    // Document/Deliverable (PO, Bill of Lading, Test report)
  
  status?: 'pending' | 'in_progress' | 'completed';
  timestamp?: string;
}

export interface CascadeScenario {
  id: string;
  topicTitle: string;          // e.g. "Công ty bán cá: Nhập khẩu khẩn cấp lô 5 tấn Cá Hồi Na Uy"
  companyType: string;         // e.g. "Thủy Hải Sản Nhập Khẩu Quốc Tế"
  objective: string;           // e.g. "Đáp ứng nhu cầu tiệc cưới và chuỗi nhà hàng sashimi cuối tuần"
  budgetAndDeadline: string;   // e.g. "1.2 Tỷ VNĐ • Hạn giao kho: Thứ Sáu 16:00"
  icon: string;
  color: string;
  
  // The two-way communication chains
  topDownDirectives: CascadeMessageNode[]; // From CEO down to Supplier
  bottomUpFeedback: CascadeMessageNode[];  // From Supplier reporting back up to CEO
}
