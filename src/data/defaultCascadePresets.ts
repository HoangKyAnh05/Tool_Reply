import { CascadeScenario } from '../types/fishboneCascade';

export const DEFAULT_CASCADE_PRESETS: CascadeScenario[] = [
  // ==========================================
  // SCENARIO 1: CÔNG TY BÁN CÁ - NHẬP HÀNG CÁ HỒI
  // ==========================================
  {
    id: "scenario_seafood_import",
    topicTitle: "Công Ty Thủy Sản: Nhập Khẩu 5 Tấn Cá Hồi Na Uy Tươi Cao Cấp",
    companyType: "Doanh Nghiệp Nhập Khẩu & Phân Phối Thủy Hải Sản Cao Cấp (Ocean Fresh Co.)",
    objective: "Nhập khẩu khẩn cấp 5 tấn cá hồi Na Uy tươi nguyên con (size 6-7kg) bằng đường hàng không phục vụ cao điểm cuối tuần.",
    budgetAndDeadline: "Ngân sách tối đa: 1.35 Tỷ VNĐ • Hạn chót về kho lạnh: Thứ Sáu 14:00",
    icon: "🐟",
    color: "#06b6d4",
    topDownDirectives: [
      {
        id: "td_1",
        stageOrder: 1,
        roleName: "CEO / Tổng Giám Đốc",
        department: "Ban Điều Hành & Chiến Lược",
        roleIcon: "👑",
        direction: "top_down",
        messageTitle: "Phê Duyệt Lệnh Mua Khẩn Cấp & Hạn Mức Ngân Sách",
        exactMessage: "Gửi Giám đốc Mua hàng: Tôi phê duyệt chủ trương nhập khẩn cấp 5 tấn cá hồi Na Uy tươi nguyên con. Ngân sách trần là 1.35 tỷ đồng. Yêu cầu cá phải cập cảng hàng không và về kho tổng trước 14:00 thứ Sáu để kịp cấp đông bảo quản và giao cho 40 nhà hàng đối tác.",
        actionRequired: "Phê duyệt ngân sách 1.35 tỷ, ra lệnh điều động toàn chuỗi cung ứng.",
        keyConstraints: "Ngân sách tối đa 1.35 tỷ VNĐ • Hạn chót: Thứ Sáu 14:00",
        evidenceOrOutput: "Quyết định phê duyệt mua hàng khẩn cấp (#QD-CEO-2026/08)",
        status: "completed"
      },
      {
        id: "td_2",
        stageOrder: 2,
        roleName: "Giám Đốc Khối Mua Hàng & Vận Hành",
        department: "Khối Chuỗi Cung Ứng & Vận Hành",
        roleIcon: "👔",
        direction: "top_down",
        messageTitle: "Xây Dựng Kế Hoạch Vận Chuyển Lạnh & Tiêu Chuẩn QA/QC",
        exactMessage: "Gửi Trưởng phòng Thu mua: Triển khai ngay hợp đồng với đối tác Oslo Fjord Seafood. Chỉ định hãng bay vận chuyển thẳng bằng đá gel nhiệt độ 0°C đến 2°C. Trưởng phòng Kho chuẩn bị sẵn 2 xe tải lạnh chuyên dụng túc trực tại sân bay Nội Bài trước 11:00 trưa thứ Sáu.",
        actionRequired: "Lựa chọn nhà cung ứng đạt chuẩn GlobalG.A.P, thiết lập chuỗi cung ứng lạnh Air-Freight.",
        keyConstraints: "Nhiệt độ bay: 0°C - 2°C • Chuẩn GlobalG.A.P / ASC",
        evidenceOrOutput: "Kế hoạch Logistics & Tiêu chuẩn nghiệm thu (#SOP-LOG-44)",
        status: "completed"
      },
      {
        id: "td_3",
        stageOrder: 3,
        roleName: "Trưởng Phòng Thu Mua (Purchasing Manager)",
        department: "Phòng Thu Mua & Đàm Phán",
        roleIcon: "📋",
        direction: "top_down",
        messageTitle: "Chốt Giá, Điều Khoản Hợp Đồng & Lịch Bay Với Bên Bán",
        exactMessage: "Gửi Chuyên viên Mua hàng: Hoàn tất hợp đồng thương mại với đại diện Oslo Seafood. Đàm phán giá chốt 260.000đ/kg CIF Nội Bài. Yêu cầu bên bán xuất đủ chứng thư kiểm dịch (Health Certificate) và C/O form EUR.1 trước khi cất cánh.",
        actionRequired: "Đàm phán giá CIF, kiểm tra hồ sơ pháp lý kiểm dịch động vật.",
        keyConstraints: "Giá CIF ≤ 260.000 VNĐ/kg • Đủ C/O EUR.1 & Health Cert",
        evidenceOrOutput: "Hợp đồng ngoại thương đã ký kết (#PO-NORWAY-889)",
        status: "completed"
      },
      {
        id: "td_4",
        stageOrder: 4,
        roleName: "Chuyên Viên Thu Mua & Quản Lý Kho Lạnh",
        department: "Bộ Phận Thực Thi Đơn Hàng & Kho Vận",
        roleIcon: "🚚",
        direction: "top_down",
        messageTitle: "Phát Hành Đơn Hàng PO & Yêu Cầu Đóng Thùng Tiêu Chuẩn",
        exactMessage: "Gửi Quản lý bán hàng Oslo Seafood: Chúng tôi gửi Đơn đặt hàng chính thức PO #PO-NORWAY-889 cho 5.000kg cá hồi tươi size 6-7kg. Yêu cầu đóng thùng xốp ép khí, mỗi thùng 20kg kèm 4 túi đá gel sinh học, dán tem nhãn QR truy xuất nguồn gốc.",
        actionRequired: "Gửi PO, yêu cầu tiêu chuẩn đóng gói và cung cấp mã AWB chuyến bay.",
        keyConstraints: "Thùng xốp chuẩn 20kg/thùng • 4 túi đá gel • QR code truy xuất",
        evidenceOrOutput: "Đơn đặt hàng quốc tế PO & Xác nhận giữ chỗ khoang hàng bay",
        status: "completed"
      },
      {
        id: "td_5",
        stageOrder: 5,
        roleName: "Nhà Cung Cấp Bên Bán (Oslo Fjord Seafood)",
        department: "Bộ Phận Xuất Khẩu & Kho Hàng Quốc Tế (Oslo, Na Uy)",
        roleIcon: "🤝",
        direction: "top_down",
        messageTitle: "Xác Nhận Đơn Hàng & Đóng Gói Tại Cảng Hàng Không Gardermoen",
        exactMessage: "Kính gửi Ocean Fresh Co.: Chúng tôi đã nhận đủ tiền đặt cọc và PO. Lô hàng 5.000kg cá hồi tươi vừa thu hoạch lúc 04:00 sáng nay đã được sơ chế, đóng thùng đá gel và đang được đưa vào khoang lạnh chuyến bay số hiệu QR8952 cất cánh sang Việt Nam.",
        actionRequired: "Thu hoạch, phân loại size 6-7kg, đóng gói thùng xốp đá gel và bàn giao hải quan sân bay.",
        keyConstraints: "Thời gian thu hoạch dưới 6 giờ • Nhiệt độ khoang bay 1.5°C",
        evidenceOrOutput: "Vận đơn hàng không AWB #157-98234412 & Hóa đơn chiếu lệ",
        status: "completed"
      }
    ],
    bottomUpFeedback: [
      {
        id: "bu_1",
        stageOrder: 1,
        roleName: "Nhà Cung Cấp Bên Bán (Oslo Fjord Seafood)",
        department: "Bộ Phận Xuất Khẩu & Kho Hàng Quốc Tế (Oslo, Na Uy)",
        roleIcon: "🤝",
        direction: "bottom_up",
        messageTitle: "Báo Hàng Đã Cất Cánh & Gửi Mã Theo Dõi Nhiệt Độ Thời Gian Thực",
        exactMessage: "Báo cáo Ocean Fresh: Chuyến bay QR8952 chở 5 tấn cá hồi đã cất cánh từ Oslo lúc 08:30. Thiết bị cảm biến nhiệt độ thời gian thực (Datalogger) đang báo ổn định ở 1.2°C. Dự kiến hạ cánh Nội Bài lúc 09:15 sáng thứ Sáu.",
        actionRequired: "Gửi mã AWB tracking và link theo dõi nhiệt độ khoang lạnh liên tục.",
        keyConstraints: "Truyền dữ liệu GPS & Nhiệt độ cảm biến liên tục",
        evidenceOrOutput: "Báo cáo hành trình bay & Dữ liệu nhiệt độ DataLogger",
        status: "completed"
      },
      {
        id: "bu_2",
        stageOrder: 2,
        roleName: "Chuyên Viên Thu Mua & Quản Lý Kho Lạnh",
        department: "Bộ Phận Thực Thi Đơn Hàng & Kho Vận",
        roleIcon: "🚚",
        direction: "bottom_up",
        messageTitle: "Nghiệm Thu Tại Sân Bay, Test Nhiệt Độ & Nhập Kho Tổng",
        exactMessage: "Báo cáo Trưởng phòng: Máy bay đã hạ cánh lúc 09:15. Đội kho đã hoàn tất thông quan và kiểm đếm đủ 250 thùng (5.000kg). Đo nhiệt độ thân cá đạt 1.4°C, mắt trong suốt, mang đỏ tươi, không dập nát. 2 xe lạnh đã đưa toàn bộ về kho tổng an toàn lúc 11:30.",
        actionRequired: "Thông quan hải quan, đo nhiệt độ bằng máy laser, vận chuyển về kho tổng.",
        keyConstraints: "Nhiệt độ thân cá: 1.4°C (Đạt chuẩn) • Đủ 250 thùng • Không hư hại",
        evidenceOrOutput: "Biên bản bàn giao hàng hóa tại sân bay & Phiếu nhập kho",
        status: "completed"
      },
      {
        id: "bu_3",
        stageOrder: 3,
        roleName: "Trưởng Phòng Thu Mua (Purchasing Manager)",
        department: "Phòng Thu Mua & Đàm Phán",
        roleIcon: "📋",
        direction: "bottom_up",
        messageTitle: "Hoàn Tất Nghiệm Thu QA/QC & Chuyển Hồ Sơ Thanh Toán",
        exactMessage: "Báo cáo Giám đốc Khối: Phòng Thu mua và Bộ phận KCS đã nghiệm thu chất lượng lô 5 tấn cá hồi đạt điểm 10/10. Tổng chi phí thực tế là 1.28 tỷ (tiết kiệm 70 triệu so với ngân sách trần). Đã chuyển toàn bộ hồ sơ sang Phòng Kế toán giải ngân đợt cuối.",
        actionRequired: "Nghiệm thu chất lượng KCS, đối chiếu hóa đơn, xác nhận tiết kiệm ngân sách.",
        keyConstraints: "Chất lượng 100% đạt chuẩn Sashimi • Tiết kiệm 70 triệu VNĐ",
        evidenceOrOutput: "Biên bản kiểm định chất lượng (QA/QC Report) & Đề nghị thanh toán",
        status: "completed"
      },
      {
        id: "bu_4",
        stageOrder: 4,
        roleName: "Giám Đốc Khối Mua Hàng & Vận Hành",
        department: "Khối Chuỗi Cung Ứng & Vận Hành",
        roleIcon: "👔",
        direction: "bottom_up",
        messageTitle: "Báo Cáo Sẵn Sàng Phân Phối Cho Chuỗi 40 Nhà Hàng",
        exactMessage: "Báo cáo Tổng Giám Đốc: Toàn bộ 5 tấn cá hồi tươi Na Uy đã được sơ chế, bảo quản chuẩn tại kho tổng sớm hơn kế hoạch 2.5 tiếng (hoàn thành lúc 11:30 thay vì 14:00). Bộ phận Logistics đã sẵn sàng xuất hàng giao cho 40 nhà hàng đối tác từ 15:00 chiều nay.",
        actionRequired: "Tổng hợp báo cáo tiến độ, chỉ đạo đội giao vận bắt đầu phân phối.",
        keyConstraints: "Vượt tiến độ 2.5 giờ • 100% sẵn sàng xuất kho",
        evidenceOrOutput: "Báo cáo tổng hợp chuỗi cung ứng & Lịch trình xuất hàng",
        status: "completed"
      },
      {
        id: "bu_5",
        stageOrder: 5,
        roleName: "CEO / Tổng Giám Đốc",
        department: "Ban Điều Hành & Chiến Lược",
        roleIcon: "👑",
        direction: "bottom_up",
        messageTitle: "Ký Lệnh Mở Bán Chính Thức & Tuyên Dương Đội Ngũ",
        exactMessage: "Gửi toàn thể Khối Vận hành & Kinh doanh: Tôi đánh giá rất cao sự phối hợp nhịp nhàng và thần tốc của các bạn. Lô hàng về sớm 2.5 tiếng và tiết kiệm 70 triệu ngân sách. Tôi chính thức ký lệnh xuất kho phục vụ thị trường và quyết định thưởng nóng cho đội Logistics 15 triệu đồng.",
        actionRequired: "Ký lệnh mở bán thị trường, phê duyệt thưởng nóng cho đội ngũ vận hành.",
        keyConstraints: "Ký lệnh xuất kho toàn hệ thống • Phê duyệt thưởng nóng",
        evidenceOrOutput: "Lệnh phát hành mở bán thương mại (#LENH-CEO-2026/08) & Quyết định khen thưởng",
        status: "completed"
      }
    ]
  },

  // ==========================================
  // SCENARIO 2: CÔNG TY CÔNG NGHỆ - XỬ LÝ SỰ CỐ SERVER
  // ==========================================
  {
    id: "scenario_saas_incident",
    topicTitle: "Công Ty SaaS: Khẩn Cấp Khắc Phục Sự Cố Sập Máy Chủ Dịp Black Friday",
    companyType: "Doanh Nghiệp Nền Tảng Thương Mại Điện Tử & Cloud SaaS (CloudScale AI)",
    objective: "Khôi phục hệ thống thanh toán và cơ sở dữ liệu bị quá tải lưu lượng gấp 15 lần trong 30 phút.",
    budgetAndDeadline: "Ngân sách mở rộng server khẩn: 25.000 USD • Thời gian khắc phục (SLA): Dưới 30 phút",
    icon: "🚀",
    color: "#8b5cf6",
    topDownDirectives: [
      {
        id: "saas_td_1",
        stageOrder: 1,
        roleName: "CEO / Tổng Giám Đốc",
        department: "Ban Điều Hành",
        roleIcon: "👑",
        direction: "top_down",
        messageTitle: "Kích Hoạt Tình Trạng Khẩn Cấp Mức 1 (P0 Incident)",
        exactMessage: "Gửi CTO & Giám đốc Hạ tầng: Hệ thống thanh toán đang gián đoạn, ảnh hưởng 20.000 khách mua hàng. Yêu cầu kích hoạt chế độ Red Alert P0 ngay lập tức, huy động 100% đội ngũ Core Tech khôi phục dưới 30 phút.",
        actionRequired: "Kích hoạt Red Alert P0, cấp quyền ngân sách mở rộng hạ tầng Cloud không giới hạn.",
        keyConstraints: "SLA tối đa: 30 phút • Zero Data Loss",
        evidenceOrOutput: "Lệnh tình trạng khẩn cấp P0 Incident",
        status: "completed"
      },
      {
        id: "saas_td_2",
        stageOrder: 2,
        roleName: "CTO / Giám Đốc Công Nghệ",
        department: "Khối Kỹ Thuật & Kiến Trúc",
        roleIcon: "👔",
        direction: "top_down",
        messageTitle: "Chỉ Đạo Bật Auto-Scaling & Cách Ly Database Shard Lỗi",
        exactMessage: "Gửi Trưởng nhóm DevOps & Tech Lead Backend: Bật ngay cơ chế Auto-Scaling x10 cụm Kubernetes trên AWS. Cách ly shard Database bị nghẽn I/O và chuyển hướng lưu lượng thanh toán sang cụm dự phòng Singapore.",
        actionRequired: "Chuyển hướng Traffic, kích hoạt 50 cụm node c5.4xlarge dự phòng.",
        keyConstraints: "Thời gian scale dưới 5 phút • Tách biệt Shard nghẽn",
        evidenceOrOutput: "Kiến trúc chuyển đổi dự phòng Failover Architecture Plan",
        status: "completed"
      },
      {
        id: "saas_td_3",
        stageOrder: 3,
        roleName: "Trưởng Nhóm DevOps & SRE (DevOps Lead)",
        department: "Phòng Vận Hành Hệ Thống (SRE Team)",
        roleIcon: "📋",
        direction: "top_down",
        messageTitle: "Phát Lệnh Mở Rộng Hạ Tầng Tới Nhà Cung Cấp AWS",
        exactMessage: "Gửi Kỹ sư trực ca SRE & AWS Enterprise Support: Mở vé hỗ trợ khẩn cấp P0 tới AWS Technical Account Manager. Yêu cầu nâng trần hạn mức vCPU ngay lập tức cho cụm ap-southeast-1.",
        actionRequired: "Gửi yêu cầu khẩn mở hạn mức máy chủ Cloud tới AWS Support.",
        keyConstraints: "Nâng trần từ 200 lên 1.000 vCPU",
        evidenceOrOutput: "AWS Support Case #P0-992144",
        status: "completed"
      },
      {
        id: "saas_td_4",
        stageOrder: 4,
        roleName: "Kỹ Sư Trực Ca SRE (Site Reliability Engineer)",
        department: "Đội Trực Chiến Kỹ Thuật (War Room)",
        roleIcon: "💻",
        direction: "top_down",
        messageTitle: "Chạy Script Cân Bằng Tải & Làm Sạch Bộ Nhớ Đệm Redis",
        exactMessage: "Gửi AWS Support: Chúng tôi đã kích hoạt lệnh Terraform apply mở rộng cụm node. Vui lòng xác nhận routing mạng từ cổng Cloudflare vào hệ thống.",
        actionRequired: "Chạy Terraform pipeline, flush Redis deadlock cache.",
        keyConstraints: "Khắc phục deadlock trong 5 phút",
        evidenceOrOutput: "Log thực thi Terraform & Cloudflare routing rule",
        status: "completed"
      },
      {
        id: "saas_td_5",
        stageOrder: 5,
        roleName: "Đối Tác Hạ Tầng Điện Toán Đám Mây (AWS Support)",
        department: "Đội Ngũ Hỗ Trợ Doanh Nghiệp (AWS Enterprise Support)",
        roleIcon: "🤝",
        direction: "top_down",
        messageTitle: "Mở Rộng Băng Thông & Tăng Cường Node Máy Chủ Chuyên Dụng",
        exactMessage: "Kính gửi CloudScale AI: Chúng tôi đã phê duyệt mở rộng 800 vCPU và định tuyến lại mạng kết nối tốc độ 100Gbps chuyên dụng cho cụm máy chủ của quý công ty.",
        actionRequired: "Phân bổ tức thì 800 vCPU và mở rộng băng thông mạng 100Gbps.",
        keyConstraints: "Thời gian đáp ứng: 3 phút",
        evidenceOrOutput: "Biên bản mở rộng tài nguyên Cloud Provisioning Log",
        status: "completed"
      }
    ],
    bottomUpFeedback: [
      {
        id: "saas_bu_1",
        stageOrder: 1,
        roleName: "Đối Tác Hạ Tầng Điện Toán Đám Mây (AWS Support)",
        department: "Đội Ngũ Hỗ Trợ Doanh Nghiệp (AWS Enterprise Support)",
        roleIcon: "🤝",
        direction: "bottom_up",
        messageTitle: "Xác Nhận Hạ Tầng Mở Rộng Hoạt Động 100% Công Suất",
        exactMessage: "Báo cáo SRE CloudScale: Toàn bộ 50 node máy chủ mới đã online với chỉ số CPU dưới 35%, độ trễ mạng đạt 4ms.",
        actionRequired: "Bàn giao cụm máy chủ mới và gửi báo cáo thông số tài nguyên.",
        keyConstraints: "Độ trễ ≤ 5ms • CPU Load ≤ 40%",
        evidenceOrOutput: "Báo cáo hiệu năng hạ tầng CloudWatch Metric Report",
        status: "completed"
      },
      {
        id: "saas_bu_2",
        stageOrder: 2,
        roleName: "Kỹ Sư Trực Ca SRE (Site Reliability Engineer)",
        department: "Đội Trực Chiến Kỹ Thuật (War Room)",
        roleIcon: "💻",
        direction: "bottom_up",
        messageTitle: "Kiểm Tra Khả Năng Chịu Tải & Khôi Phục Luồng Dữ Liệu",
        exactMessage: "Báo cáo DevOps Lead: Hệ thống đã xử lý 18.000 giao dịch/phút mượt mà, tỷ lệ lỗi HTTP 500 giảm về 0%. Không có giao dịch nào bị thất thoát dữ liệu.",
        actionRequired: "Chạy stress test thời gian thực, xác minh tính toàn vẹn cơ sở dữ liệu.",
        keyConstraints: "Tỷ lệ lỗi 0% • Xử lý 18.000 req/min",
        evidenceOrOutput: "Báo cáo kiểm thử tải thời gian thực Datadog",
        status: "completed"
      },
      {
        id: "saas_bu_3",
        stageOrder: 3,
        roleName: "Trưởng Nhóm DevOps & SRE (DevOps Lead)",
        department: "Phòng Vận Hành Hệ Thống (SRE Team)",
        roleIcon: "📋",
        direction: "bottom_up",
        messageTitle: "Báo Cáo Toàn Diện Về Ổn Định Hệ Thống Lên CTO",
        exactMessage: "Báo cáo CTO: Sự cố đã được xử lý triệt để sau đúng 18 phút (sớm hơn 12 phút so với SLA). Cơ sở dữ liệu và cổng thanh toán hoạt động ổn định 99.99%.",
        actionRequired: "Đóng cổng sự cố khẩn cấp, tổng hợp tài liệu Post-Mortem sơ bộ.",
        keyConstraints: "Tổng thời gian khắc phục: 18 phút (Vượt chuẩn SLA 30 phút)",
        evidenceOrOutput: "Báo cáo sự cố khẩn cấp Incident Report #IR-882",
        status: "completed"
      },
      {
        id: "saas_bu_4",
        stageOrder: 4,
        roleName: "CTO / Giám Đốc Công Nghệ",
        department: "Khối Kỹ Thuật & Kiến Trúc",
        roleIcon: "👔",
        direction: "bottom_up",
        messageTitle: "Báo Cáo Hoàn Thành Lên CEO & Tối Ưu Kiến Trúc Tương Lai",
        exactMessage: "Báo cáo Tổng Giám Đốc: Hệ thống đã hoàn toàn ổn định trở lại, doanh thu Black Friday tiếp tục tăng trưởng kỷ lục. Không phát sinh thiệt hại tài chính nghiêm trọng.",
        actionRequired: "Báo cáo toàn cảnh lên CEO, đề xuất kế hoạch nâng cấp kiến trúc vĩnh viễn.",
        keyConstraints: "Bảo toàn 100% doanh thu khách hàng",
        evidenceOrOutput: "Báo cáo hiệu năng công nghệ & Đề xuất nâng cấp kiến trúc",
        status: "completed"
      },
      {
        id: "saas_bu_5",
        stageOrder: 5,
        roleName: "CEO / Tổng Giám Đốc",
        department: "Ban Điều Hành",
        roleIcon: "👑",
        direction: "bottom_up",
        messageTitle: "Hạ Lệnh Báo Động, Gửi Thư Cảm Ơn Khách Hàng & Thưởng Nóng Đội Kỹ Thuật",
        exactMessage: "Gửi toàn thể công ty: Cảm ơn phản ứng thần tốc của khối Tech trong 18 phút. Tôi chính thức bãi bỏ tình trạng khẩn cấp và duyệt thưởng đặc biệt cho đội War Room.",
        actionRequired: "Ký lệnh bãi bỏ Red Alert, duyệt thưởng nóng cho khối Tech.",
        keyConstraints: "Duyệt thưởng 100 triệu VNĐ cho đội trực chiến",
        evidenceOrOutput: "Thông báo bãi bỏ tình trạng khẩn cấp & Quyết định khen thưởng",
        status: "completed"
      }
    ]
  },

  // ==========================================
  // SCENARIO 3: CHUỖI F&B - MỞ CHI NHÁNH MỚI
  // ==========================================
  {
    id: "scenario_fnb_franchise",
    topicTitle: "Chuỗi F&B: Khẩn Trương Khai Trương Cửa Hàng Nhượng Quyền Thứ 20",
    companyType: "Chuỗi Cà Phê & Trà Sữa Nhượng Quyền (Highland Bean Co.)",
    objective: "Hoàn thiện thi công nội thất, lắp đặt máy móc pha chế và đào tạo 25 nhân sự kịp ngày đại lễ.",
    budgetAndDeadline: "Ngân sách đầu tư: 2.8 Tỷ VNĐ • Hạn khai trương: Ngày 15 tháng sau",
    icon: "☕",
    color: "#f59e0b",
    topDownDirectives: [
      {
        id: "fnb_td_1",
        stageOrder: 1,
        roleName: "CEO / Chủ Tịch HĐQT",
        department: "Ban Điều Hành",
        roleIcon: "👑",
        direction: "top_down",
        messageTitle: "Ký Phê Duyệt Dự Án Chi Nhánh 20 & Hạn Mức Đầu Tư",
        exactMessage: "Gửi Giám đốc Phát triển Mặt bằng: Duyệt địa điểm mặt bằng Quận 1. Ngân sách gói nhượng quyền 2.8 tỷ. Yêu cầu bàn giao và khai trương chính xác ngày 15.",
        actionRequired: "Phê duyệt hợp đồng nhượng quyền và giải ngân vốn giai đoạn 1.",
        keyConstraints: "Ngân sách: 2.8 Tỷ • Khai trương: Ngày 15",
        evidenceOrOutput: "Quyết định thành lập chi nhánh mới (#QD-FNB-20)",
        status: "completed"
      },
      {
        id: "fnb_td_2",
        stageOrder: 2,
        roleName: "Giám Đốc Vận Hành & Chuỗi Cung Ứng",
        department: "Khối Vận Hành & Tiêu Chuẩn Chuỗi",
        roleIcon: "👔",
        direction: "top_down",
        messageTitle: "Ban Hành Bản Vẽ Thiết Kế & Lệnh Mua Máy Pha Cà Phê Ý",
        exactMessage: "Gửi Quản lý Thi công & Đào tạo: Ký hợp đồng nhập khẩu 2 máy pha espresso La Marzocco từ Ý và bắt đầu tuyển dụng đào tạo 25 barista theo chuẩn SOP chuỗi.",
        actionRequired: "Ký hợp đồng cung ứng máy móc pha chế nhập khẩu và kế hoạch đào tạo barista.",
        keyConstraints: "Máy pha chuẩn La Marzocco • 25 Barista đạt chứng chỉ",
        evidenceOrOutput: "Bản vẽ 3D nội thất & Hợp đồng thiết bị máy pha cà phê",
        status: "completed"
      },
      {
        id: "fnb_td_3",
        stageOrder: 3,
        roleName: "Trưởng Ban Quản Lý Dự Án & Thi Công",
        department: "Phòng Dự Án & Xây Dựng",
        roleIcon: "📋",
        direction: "top_down",
        messageTitle: "Giao Chỉ Tiêu Tiến Độ Thi Công Tới Nhà Thầu Xây Dựng",
        exactMessage: "Gửi Nhà thầu Nội thất: Yêu cầu hoàn thiện thi công sàn, hệ thống điện nước 3 pha và quầy bar trước ngày 10 để đội máy móc vào lắp đặt.",
        actionRequired: "Giám sát thi công 24/7, nghiệm thu từng hạng mục quầy bar.",
        keyConstraints: "Hoàn thiện thi công trước ngày 10 • Điện 3 pha an toàn",
        evidenceOrOutput: "Biên bản bàn giao mặt bằng thi công & Lịch trình biểu mẫu Gantt",
        status: "completed"
      },
      {
        id: "fnb_td_4",
        stageOrder: 4,
        roleName: "Cửa Hàng Trưởng & Giám Sát Vận Hành (Store Manager)",
        department: "Ban Quản Trị Cửa Hàng Chi Nhánh 20",
        roleIcon: "🚚",
        direction: "top_down",
        messageTitle: "Đặt Hàng Nguyên Vật Liệu Ban Đầu Tới Tổng Kho",
        exactMessage: "Gửi Tổng kho nguyên liệu: Lập đơn hàng hạt cà phê Arabica Cầu Đất, sữa tươi thanh trùng và bao bì ly giấy in logo số lượng 1 tháng đầu.",
        actionRequired: "Đặt hàng nguyên liệu dự trữ, kiểm thử máy pos bán hàng.",
        keyConstraints: "Dự trữ đủ 1.000kg cà phê • 20.000 ly giấy in logo",
        evidenceOrOutput: "Phiếu đề xuất cấp nguyên liệu ban đầu",
        status: "completed"
      },
      {
        id: "fnb_td_5",
        stageOrder: 5,
        roleName: "Nhà Thầu Thiết Bị & Thi Công Nội Thất",
        department: "Đơn Vị Tổng Thầu Xây Dựng & Cung Cấp Thiết Bị",
        roleIcon: "🤝",
        direction: "top_down",
        messageTitle: "Cam Kết Bàn Giao Thiết Bị & Quầy Bar Đúng Tiêu Chuẩn",
        exactMessage: "Kính gửi Highland Bean: Đội ngũ 30 kỹ sư đang hoàn thiện quầy bar và lắp đặt hệ thống lọc nước RO công nghiệp, cam kết bàn giao đúng ngày 10.",
        actionRequired: "Lắp đặt quầy bar inox, hệ thống xử lý nước RO và máy lạnh trung tâm.",
        keyConstraints: "Nước đạt chuẩn TDS < 50 ppm cho pha cà phê",
        evidenceOrOutput: "Biên bản nghiệm thu kỹ thuật điện nước và thiết bị quầy bar",
        status: "completed"
      }
    ],
    bottomUpFeedback: [
      {
        id: "fnb_bu_1",
        stageOrder: 1,
        roleName: "Nhà Thầu Thiết Bị & Thi Công Nội Thất",
        department: "Đơn Vị Tổng Thầu Xây Dựng & Cung Cấp Thiết Bị",
        roleIcon: "🤝",
        direction: "bottom_up",
        messageTitle: "Bàn Giao Toàn Bộ Không Gian Quầy Bar & Máy Móc",
        exactMessage: "Báo cáo Quản lý Dự án: Đã hoàn tất 100% thi công sớm 1 ngày (ngày 09). Máy pha cà phê và máy xay đã được cân chỉnh áp suất 9 bar chuẩn quốc tế.",
        actionRequired: "Bàn giao chìa khóa mặt bằng và hướng dẫn vận hành máy móc.",
        keyConstraints: "Áp suất máy pha đạt 9 bar • Bàn giao sớm 1 ngày",
        evidenceOrOutput: "Biên bản bàn giao chìa khóa công trình hoàn tất",
        status: "completed"
      },
      {
        id: "fnb_bu_2",
        stageOrder: 2,
        roleName: "Cửa Hàng Trưởng & Giám Sát Vận Hành (Store Manager)",
        department: "Ban Quản Trị Cửa Hàng Chi Nhánh 20",
        roleIcon: "🚚",
        direction: "bottom_up",
        messageTitle: "Chạy Thử Nghiệm Bán Hàng (Soft Opening) & Đào Tạo Barista",
        exactMessage: "Báo cáo Trưởng ban: Đã thử nghiệm pha chế 500 ly cà phê miễn phí cho khách hàng nội bộ. 25 Barista đạt chuẩn tốc độ phục vụ dưới 90 giây/ly.",
        actionRequired: "Chạy thử nghiệm nội bộ 2 ngày, đánh giá chất lượng đồ uống.",
        keyConstraints: "Tốc độ ra món ≤ 90s • Điểm hài lòng đồ uống 98%",
        evidenceOrOutput: "Báo cáo kết quả chạy thử Soft Opening",
        status: "completed"
      },
      {
        id: "fnb_bu_3",
        stageOrder: 3,
        roleName: "Trưởng Ban Quản Lý Dự Án & Thi Công",
        department: "Phòng Dự Án & Xây Dựng",
        roleIcon: "📋",
        direction: "bottom_up",
        messageTitle: "Báo Cáo Nghiệm Thu Tổng Thể Công Trình Lên Giám Đốc",
        exactMessage: "Báo cáo Giám đốc Vận hành: Chi nhánh 20 đã hoàn thiện toàn bộ giấy phép PCCC, An toàn Vệ sinh Thực phẩm và trang thiết bị, sẵn sàng 100% cho ngày 15.",
        actionRequired: "Hoàn tất hồ sơ pháp lý PCCC, ATVSTP và giấy phép kinh doanh.",
        keyConstraints: "100% đầy đủ giấy phép pháp lý",
        evidenceOrOutput: "Giấy chứng nhận ATVSTP & Giấy chứng nhận thẩm duyệt PCCC",
        status: "completed"
      },
      {
        id: "fnb_bu_4",
        stageOrder: 4,
        roleName: "Giám Đốc Vận Hành & Chuỗi Cung Ứng",
        department: "Khối Vận Hành & Tiêu Chuẩn Chuỗi",
        roleIcon: "👔",
        direction: "bottom_up",
        messageTitle: "Trình Lệnh Khai Trương Chính Thức Lên Chủ Tịch",
        exactMessage: "Báo cáo Chủ tịch: Cửa hàng thứ 20 đã hoàn thiện xuất sắc, chiến dịch marketing truyền thông đã thu hút 5.000 lượt check-in đăng ký trước ngày khai trương.",
        actionRequired: "Trình ký lệnh khai trương và báo cáo chiến dịch truyền thông ra mắt.",
        keyConstraints: "5.000 khách hàng tiềm năng đăng ký",
        evidenceOrOutput: "Báo cáo tổng kết dự án đầu tư mở điểm bán",
        status: "completed"
      },
      {
        id: "fnb_bu_5",
        stageOrder: 5,
        roleName: "CEO / Chủ Tịch HĐQT",
        department: "Ban Điều Hành",
        roleIcon: "👑",
        direction: "bottom_up",
        messageTitle: "Cắt Băng Khai Trương & Kích Hoạt Chiến Dịch Toàn Chuỗi",
        exactMessage: "Gửi toàn hệ thống: Tôi chính thức tuyên bố khai trương Chi nhánh thứ 20! Chúc mừng cột mốc mới của thương hiệu và chúc cửa hàng đạt doanh thu vượt kỳ vọng.",
        actionRequired: "Chủ trì lễ cắt băng khánh thành, kích hoạt chương trình khuyến mãi toàn quốc.",
        keyConstraints: "Khai trương chính thức ngày 15",
        evidenceOrOutput: "Biên bản ghi nhận ngày khai trương chính thức",
        status: "completed"
      }
    ]
  }
];
