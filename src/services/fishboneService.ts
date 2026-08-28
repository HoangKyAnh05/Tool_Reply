import { 
  FishboneProject, 
  EvolutionLevel, 
  LevelSnapshot, 
  QualityGateCriteria, 
  UpgradeRequirement 
} from '../types/fishbone';

export const fishboneService = {
  /**
   * Calculate overall maturity score from dimensions and weights
   */
  calculateMaturityScore(level: EvolutionLevel): number {
    if (!level.dimensions || level.dimensions.length === 0) return level.maturityScore || 0;
    let totalWeight = 0;
    let weightedSum = 0;

    level.dimensions.forEach((d) => {
      const w = d.weight > 0 ? d.weight : 20;
      totalWeight += w;
      weightedSum += (d.score || 0) * w;
    });

    if (totalWeight === 0) return 0;
    return Math.round(weightedSum / totalWeight);
  },

  /**
   * Computes Gap Analysis comparing Current State vs Target State
   */
  computeGapAnalysis(level: EvolutionLevel) {
    const cur = level.currentState;
    const tgt = level.targetState;

    return {
      teamSizeGap: tgt.teamSize - cur.teamSize,
      tasksPerWeekGap: tgt.tasksPerWeek - cur.tasksPerWeek,
      sopCountGap: tgt.sopCount - cur.sopCount,
      qualityScoreGap: tgt.qualityScore - cur.qualityScore,
      automationPercentGap: tgt.automationPercent - cur.automationPercent
    };
  },

  /**
   * Evaluates if Quality Gate is ready for Level Up
   */
  evaluateQualityGate(level: EvolutionLevel): { isReady: boolean; exitCriteria: QualityGateCriteria[]; failingReasons: string[] } {
    const failingReasons: string[] = [];
    const updatedCriteria: QualityGateCriteria[] = [];

    // 1. Check Maturity Score
    const currentMaturity = this.calculateMaturityScore(level);
    const maturitySatisfied = currentMaturity >= 50;
    if (!maturitySatisfied) {
      failingReasons.push(`Điểm trưởng thành (Maturity Score) mới đạt ${currentMaturity}/100 (Yêu cầu tối thiểu ≥ 50).`);
    }
    updatedCriteria.push({
      id: 'qc_maturity',
      title: 'Điểm Trưởng Thành Toàn Diện (Maturity Score) ≥ 50',
      category: 'Process',
      targetRequirement: 'Nâng cao đồng đều các chiều',
      isSatisfied: maturitySatisfied,
      failureReason: maturitySatisfied ? undefined : `Hiện tại đạt ${currentMaturity}/100`
    });

    // 2. Check Mandatory Requirements
    const mandatoryReqs = level.requirements.filter((r) => r.isMandatoryForLevelUp);
    const incompleteMandatory = mandatoryReqs.filter((r) => r.status !== 'done' && r.progress < 100);
    const reqsSatisfied = incompleteMandatory.length === 0;
    if (!reqsSatisfied) {
      failingReasons.push(`Còn ${incompleteMandatory.length} Hạng Mục Bắt Buộc (Critical Requirements) chưa hoàn thành.`);
    }
    updatedCriteria.push({
      id: 'qc_reqs',
      title: 'Hoàn thành 100% các Upgrade Requirements bắt buộc',
      category: 'Quality',
      targetRequirement: `${mandatoryReqs.length} hạng mục bắt buộc`,
      isSatisfied: reqsSatisfied,
      failureReason: reqsSatisfied ? undefined : `Còn ${incompleteMandatory.length} mục chưa xong (${incompleteMandatory.map(r => r.title).join(', ')})`
    });

    // 3. Check Critical Blockers
    const criticalBlockers = (level.blockers || []).filter((b) => b.severity === 'critical');
    const blockersSatisfied = criticalBlockers.length === 0;
    if (!blockersSatisfied) {
      failingReasons.push(`Có ${criticalBlockers.length} điểm nghẽn nghiêm trọng (Critical Blockers) cần tháo gỡ.`);
    }
    updatedCriteria.push({
      id: 'qc_blockers',
      title: 'Không còn điểm nghẽn nghiêm trọng (0 Critical Blockers)',
      category: 'Process',
      targetRequirement: 'Giải quyết triệt để rủi ro vận hành',
      isSatisfied: blockersSatisfied,
      failureReason: blockersSatisfied ? undefined : `Còn điểm nghẽn: ${criticalBlockers[0]?.title}`
    });

    const isReady = failingReasons.length === 0;
    return { isReady, exitCriteria: updatedCriteria, failingReasons };
  },

  /**
   * Executes Level Up: creates snapshot, marks level completed, unlocks next level
   */
  executeLevelUp(project: FishboneProject, currentLevel: EvolutionLevel): FishboneProject {
    const snapshot: LevelSnapshot = {
      snapshotId: `snap_lvl_${currentLevel.number}_${Date.now()}`,
      levelNumber: currentLevel.number,
      levelName: currentLevel.name,
      savedAt: new Date().toISOString(),
      maturityScore: currentLevel.maturityScore,
      state: { ...currentLevel.currentState },
      dimensions: [...currentLevel.dimensions],
      completedRequirementsCount: currentLevel.requirements.filter((r) => r.status === 'done').length
    };

    const nextLevelNumber = currentLevel.number + 1;
    const updatedLevels = project.levels.map((lvl) => {
      if (lvl.number === currentLevel.number) {
        return {
          ...lvl,
          status: 'completed' as const,
          progress: 100,
          completedAt: new Date().toISOString()
        };
      }
      if (lvl.number === nextLevelNumber) {
        return {
          ...lvl,
          status: 'in_progress' as const,
          currentState: { ...currentLevel.targetState }
        };
      }
      return lvl;
    });

    return {
      ...project,
      projectVersion: project.projectVersion + 1,
      currentLevelNumber: nextLevelNumber,
      levels: updatedLevels,
      snapshots: [snapshot, ...project.snapshots],
      updatedAt: new Date().toISOString()
    };
  },

  /**
   * Generates AI Prompts (Mode 1: Current State, Mode 2: Upgrade Path, Mode 3: Full Evolution Analysis)
   */
  generateAiPrompt(project: FishboneProject, mode: 'current_state' | 'upgrade' | 'full_evolution'): string {
    const currentLvl = project.levels.find((l) => l.number === project.currentLevelNumber) || project.levels[0];
    const jsonStr = JSON.stringify(project, null, 2);

    if (mode === 'current_state') {
      return `Bạn là Giám đốc Vận hành & Cố vấn Chiến lược Doanh nghiệp (COO & Strategy Advisor).

ĐÂY LÀ HIỆN TRẠNG TIẾN HÓA DOANH NGHIỆP CỦA TÔI:
Dự án: ${project.name} (${project.industry})
Mô tả: ${project.description}
Cấp độ hiện tại: Level ${currentLvl.number} - ${currentLvl.name}
Điểm Trưởng Thành (Maturity Score): ${currentLvl.maturityScore}/100

HIỆN TRẠNG VẬN HÀNH (CURRENT STATE):
- Quy mô nhân sự: ${currentLvl.currentState.teamSize} người
- Số lượng task/tuần: ${currentLvl.currentState.tasksPerWeek} tasks
- Quy trình vận hành: ${currentLvl.currentState.workflowType}
- Số lượng SOP chuẩn: ${currentLvl.currentState.sopCount} SOP
- Điểm chất lượng: ${currentLvl.currentState.qualityScore}/100
- Tỷ lệ tự động hóa: ${currentLvl.currentState.automationPercent}%
- Doanh thu hàng tháng: ${currentLvl.currentState.revenueMonthlyVnd}

MỤC TIÊU CẤP ĐỘ TIẾP THEO (TARGET STATE):
- Quy mô nhân sự: ${currentLvl.targetState.teamSize} người (+${currentLvl.targetState.teamSize - currentLvl.currentState.teamSize})
- SOP mục tiêu: ${currentLvl.targetState.sopCount} SOP
- Tự động hóa mục tiêu: ${currentLvl.targetState.automationPercent}%

YÊU CẦU:
Hãy phân tích xem các điểm nghẽn lớn nhất trong giai đoạn này là gì và những việc tôi cần ưu tiên xử lý ngay trong tuần này.

DỮ LIỆU JSON ĐẦY ĐỦ:
${jsonStr}`;
    }

    if (mode === 'upgrade') {
      return `Bạn là Chuyên gia Tái Cấu Trúc & Tự Động Hóa Doanh Nghiệp.

NHIỆM VỤ:
Phân tích hiện trạng Level ${currentLvl.number} và thiết kế lộ trình nâng cấp (Upgrade Requirements, Tasks, Quality Gate) để giúp doanh nghiệp tiến lên Level ${currentLvl.number + 1}.

DỮ LIỆU DỰ ÁN FISHBONE HIỆN TẠI:
${jsonStr}

YÊU CẦU TRẢ VỀ:
1. Bảng Gap Analysis chi tiết giữa Current State và Target State.
2. Danh sách 3-5 Upgrade Requirements mới kèm acceptance criteria chuẩn chỉnh.
3. Các chỉ số KPI trọng yếu cần đo lường.
4. Điều kiện kiểm định chất lượng (Quality Gate Exit Criteria) để được phép Level Up.
5. Trả về toàn bộ dưới dạng file JSON cấu trúc hợp lệ theo schema 1.0 của ứng dụng để tôi có thể Paste trực tiếp vào app.`;
    }

    return `Bạn là Chuyên gia Tư Vấn Trưởng Thành Hệ Thống Doanh Nghiệp (Enterprise Evolution Analyst).

NHIỆM VỤ:
Phân tích toàn bộ lịch sử tiến hóa từ Level 1 đến Level ${project.currentLevelNumber} của dự án "${project.name}".

LỊCH SỬ TIẾN HÓA & SNAPSHOTS:
${JSON.stringify(project.snapshots, null, 2)}

YÊU CẦU:
1. Đánh giá tốc độ và chất lượng tăng trưởng: Tỷ lệ giữa "Mở Rộng Quy Mô (Scale)" vs "Độ Trưởng Thành Vận Hành (Maturity)".
2. Nhận diện các lỗi lặp đi lặp lại hoặc các chiều (Dimensions) bị tụt hậu.
3. Đề xuất chiến lược dài hạn để đạt Level Mục Tiêu (Level ${project.targetLevelNumber}).`;
  }
};
