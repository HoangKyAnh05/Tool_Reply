import { RoadmapDayItem, Roadmap100Data } from '../types/roadmap100';

const STORAGE_KEY = 'imagine_roadmap_100_data';

export const roadmap100Service = {
  /**
   * Tạo AI Prompt chuẩn JSON Schema cho 100 ngày dựa trên chủ đề
   */
  generatePrompt100Days(topic: string): string {
    const cleanTopic = (topic || 'Xây kênh TikTok bán hàng triệu view từ số 0').trim();
    return `Bạn là một Chuyên Gia Chiến Lược Nội Dung & Đạo Diễn Sản Xuất hàng đầu thế giới.
Hãy xây dựng cho tôi một LỘ TRÌNH 100 NGÀY CHI TIẾT TỪNG NGÀY (Từ Ngày 1 đến Ngày 100) theo đúng chủ đề sau:
👉 CHỦ ĐỀ: "${cleanTopic}"

Lộ trình 100 ngày cần được phân chia khoa học theo 4 giai đoạn tiến hóa:
- Giai đoạn 1 (Ngày 1 - 25): Đặt nền móng, định vị nhân hiệu, giải quyết nỗi đau cốt lõi, thấu hiểu tệp khách hàng.
- Giai đoạn 2 (Ngày 26 - 50): Tăng tốc nội dung, chủ đề tranh luận đa chiều, mở rộng tiếp cận, kéo tương tác mạnh.
- Giai đoạn 3 (Ngày 51 - 75): Bứt phá với nội dung viral, bắt trend thịnh hành, câu chuyện truyền cảm hứng sâu sắc.
- Giai đoạn 4 (Ngày 76 - 100): Chuyển đổi đỉnh cao, khai thác đơn hàng, tri ân khách hàng và xây dựng cộng đồng trung thành.

YÊU CẦU BẮT BUỘC VỀ KẾT QUẢ ĐẦU RA:
- Trả về KẾT QUẢ DUY NHẤT LÀ MỘT MẢNG JSON HỢP LỆ (Valid JSON Array), tuyệt đối không thêm lời chào, không thêm markdown ngoài khối json.
- Mảng gồm đúng 100 phần tử (từ day = 1 đến day = 100).
- Mỗi phần tử tuân thủ chính xác cấu trúc JSON sau:
[
  {
    "day": 1,
    "title": "Tiêu đề ngắn gọn, cuốn hút của ngày",
    "taskAction": "Hôm nay cần quay, chụp, làm gì cụ thể (Kịch bản hook 3 giây đầu, hành động chính, góc quay)",
    "category": "Video ngắn",
    "btsDescription": "Mô tả hậu trường làm việc: cách chuẩn bị đạo cụ, góc máy, ánh sáng, tâm lý, lưu ý khi thực hiện",
    "benefit": "Lợi ích sau khi hoàn thành việc/video/ảnh: tăng follow, kéo tương tác, tăng uy tín nhân hiệu, chốt đơn"
  },
  ... tiếp tục đủ 100 ngày ...
]
`;
  },

  /**
   * Sinh thuật toán 100 ngày mẫu sinh động theo chủ đề người dùng nhập
   */
  generateSample100Days(topic: string): Roadmap100Data {
    const cleanTopic = (topic || '100 ngày xây dựng thương hiệu cá nhân & sáng tạo nội dung triệu view').trim();
    const days: RoadmapDayItem[] = [];

    const categories = ['Video ngắn', 'Bộ ảnh Concept', 'Video ngắn', 'Livestream', 'Bộ ảnh Hậu trường', 'Video ngắn', 'Thử thách 24h'];

    for (let d = 1; d <= 100; d++) {
      let stageTitle = '';
      let actionFocus = '';
      let btsFocus = '';
      let benefitFocus = '';
      const cat = categories[(d - 1) % categories.length];

      if (d <= 25) {
        stageTitle = 'Khởi Động Nền Móng & Định Vị';
        actionFocus = `Quay video/chụp ảnh chủ đề "${cleanTopic}": Chia sẻ lý do vì sao bắt đầu và giải quyết sai lầm phổ biến số ${d} mà 90% người mới mắc phải.`;
        btsFocus = `Setup góc quay tự nhiên tại bàn làm việc, ánh sáng đèn softbox 45 độ, thu âm micro cài áo không dây, chuẩn bị 3 câu hook mở đầu.`;
        benefitFocus = `Xác lập vị thế chuyên gia ngay từ đầu, thu hút tệp khán giả chất lượng đầu tiên, rèn luyện sự tự tin trước ống kính.`;
      } else if (d <= 50) {
        stageTitle = 'Tăng Tốc & Kéo Tương Tác';
        actionFocus = `Thực hiện nội dung tương tác chuyên sâu ngày ${d}: Đặt câu hỏi phản biện, so sánh 2 góc nhìn đối lập về "${cleanTopic}" để kích thích bình luận.`;
        btsFocus = `Ghi hình ngoại cảnh hoặc không gian mở, dùng gimbal chống rung, quay cận cảnh thao tác thực tế để tạo sự chân thực và cuốn hút.`;
        benefitFocus = `Tăng tỷ lệ bình luận và chia sẻ lên gấp 3 lần, thuật toán đẩy video vào luồng đề xuất, mở rộng tệp follower mới.`;
      } else if (d <= 75) {
        stageTitle = 'Bứt Phá & Nội Dung Viral';
        actionFocus = `Sản xuất siêu phẩm nội dung ngày ${d}: Kể một câu chuyện thất bại rồi vượt qua ngoạn mục liên quan đến "${cleanTopic}", lồng nhạc cao trào.`;
        btsFocus = `Chia kịch bản làm 4 phân đoạn (Hook - Cao trào - Bài học - Kêu gọi), dùng ánh sáng tương phản cinematic, dựng video nhịp cắt nhanh.`;
        benefitFocus = `Chạm vào cảm xúc sâu sắc của khán giả, tạo sự đồng cảm lớn, tăng lượng lưu video và viral mạnh mẽ sang các nền tảng khác.`;
      } else {
        stageTitle = 'Chuyển Đổi Doanh Thu & Cộng Đồng';
        actionFocus = `Nội dung giá trị cao ngày ${d}: Đúc kết trọn bộ cẩm nang / quy trình thực chiến "${cleanTopic}" và hướng dẫn khán giả hành động ngay.`;
        btsFocus = `Setup góc quay chuyên nghiệp, bảng ghi chú mindmap phía sau, chuẩn bị tài liệu quà tặng để gửi tặng khán giả theo dõi.`;
        benefitFocus = `Chuyển đổi khán giả theo dõi thành khách hàng trung thành, xây dựng cộng đồng fan cứng, tạo nguồn thu nhập bền vững.`;
      }

      days.push({
        day: d,
        title: `Ngày ${d}: ${stageTitle} (Bài ${d})`,
        taskAction: actionFocus,
        category: cat,
        centerMedia: {
          type: 'none',
          url: '',
          name: ''
        },
        bts: {
          description: btsFocus,
          imageUrl: ''
        },
        benefit: benefitFocus,
        status: d <= 3 ? 'completed' : d === 4 ? 'in_progress' : 'todo'
      });
    }

    return {
      id: `roadmap-${Date.now()}`,
      topic: cleanTopic,
      days,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  /**
   * Lưu trữ lộ trình vào localStorage
   */
  saveRoadmap(data: Roadmap100Data): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save roadmap to localStorage', e);
    }
  },

  /**
   * Lấy lộ trình từ localStorage hoặc nạp mặc định
   */
  loadRoadmap(): Roadmap100Data {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not parse stored roadmap, generating default', e);
    }
    const defaultData = this.generateSample100Days('100 ngày xây dựng kênh bán hàng & sáng tạo video triệu view');
    this.saveRoadmap(defaultData);
    return defaultData;
  },

  /**
   * Parse chuỗi JSON dán vào từ ChatGPT/Gemini
   */
  parseRoadmapJson(jsonStr: string, currentTopic?: string): RoadmapDayItem[] {
    let clean = jsonStr.trim();
    // Bỏ markdown code block nếu có
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    let parsed: any;
    try {
      parsed = JSON.parse(clean);
    } catch (err: any) {
      throw new Error('Định dạng JSON không hợp lệ! Vui lòng kiểm tra lại dấu ngoặc và dấu phẩy.');
    }

    // Nếu JSON trả về bọc trong { days: [...] } hoặc { roadmap: [...] }
    let rawList: any[] = [];
    if (Array.isArray(parsed)) {
      rawList = parsed;
    } else if (parsed && Array.isArray(parsed.days)) {
      rawList = parsed.days;
    } else if (parsed && Array.isArray(parsed.roadmap)) {
      rawList = parsed.roadmap;
    } else if (parsed && Array.isArray(parsed.items)) {
      rawList = parsed.items;
    } else {
      throw new Error('JSON không chứa mảng danh sách ngày!');
    }

    if (rawList.length === 0) {
      throw new Error('Danh sách ngày trong JSON rỗng!');
    }

    // Chuẩn hóa danh sách
    const normalizedDays: RoadmapDayItem[] = rawList.map((item, idx) => {
      const dayNum = Number(item.day || item.ngay || idx + 1);
      return {
        day: dayNum,
        title: String(item.title || item.tieuDe || item.name || `Ngày ${dayNum}`),
        taskAction: String(item.taskAction || item.action || item.task || item.nhiemVu || item.quayChup || 'Quay video/chụp ảnh theo chủ đề trong ngày'),
        category: String(item.category || item.theLoai || 'Video ngắn'),
        centerMedia: {
          type: (item.centerMedia?.type || item.mediaType || 'none') as any,
          url: String(item.centerMedia?.url || item.mediaUrl || ''),
          name: String(item.centerMedia?.name || '')
        },
        bts: {
          description: String(item.btsDescription || item.bts?.description || item.hauTruong || 'Chuẩn bị góc máy, ánh sáng và kịch bản'),
          imageUrl: String(item.bts?.imageUrl || item.btsImageUrl || '')
        },
        benefit: String(item.benefit || item.loiIch || item.ketQua || 'Nâng cao kỹ năng và kéo thêm lượng người theo dõi mới'),
        status: (item.status === 'completed' ? 'completed' : item.status === 'in_progress' ? 'in_progress' : 'todo') as any
      };
    });

    return normalizedDays;
  }
};
