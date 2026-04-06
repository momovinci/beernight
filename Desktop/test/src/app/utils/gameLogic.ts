import { questions, respondents, Question, Respondent } from "../data/content";

/**
 * 게임 상태를 관리하는 클래스
 * - 사용된 질문 추적
 * - 이전 턴의 답변자 기억
 * - 제약 조건에 맞는 랜덤 선택
 */
export class GameState {
  private usedQuestionIds: Set<number> = new Set();
  private lastSelectedRespondentIds: number[] = [];

  /**
   * 사용되지 않은 질문 중 랜덤으로 1개 선택
   * @returns 선택된 질문 객체, 또는 모든 질문을 사용했으면 null
   */
  getRandomQuestion(): Question | null {
    const availableQuestions = questions.filter(
      (q) => !this.usedQuestionIds.has(q.id)
    );

    if (availableQuestions.length === 0) {
      return null; // 게임 종료
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    this.usedQuestionIds.add(selectedQuestion.id);

    return selectedQuestion;
  }

  /**
   * 직전 선택자를 제외하고 랜덤으로 2명의 답변자 선택
   * @returns [답변자1, 답변자2]
   */
  getRandomRespondents(): [Respondent, Respondent] {
    // 직전에 뽑힌 답변자 ID를 제외한 후보자 목록
    const availableRespondents = respondents.filter(
      (r) => !this.lastSelectedRespondentIds.includes(r.id)
    );

    // 2명을 선택해야 하는데 available이 2명 이상이어야 함
    if (availableRespondents.length < 2) {
      throw new Error(
        "선택 가능한 답변자가 2명 미만입니다. 게임 로직 오류."
      );
    }

    // Fisher-Yates 셔플로 2명 선택
    const selected: Respondent[] = [];
    const tempList = [...availableRespondents];

    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * tempList.length);
      selected.push(tempList[randomIndex]);
      tempList.splice(randomIndex, 1);
    }

    // 현재 선택한 답변자를 "직전 선택"으로 업데이트
    this.lastSelectedRespondentIds = [selected[0].id, selected[1].id];

    return [selected[0], selected[1]];
  }

  /**
   * 게임이 끝났는지 확인 (모든 질문을 사용했는가)
   */
  isGameOver(): boolean {
    return this.usedQuestionIds.size === questions.length;
  }

  /**
   * 남은 질문 개수
   */
  getRemainingQuestionsCount(): number {
    return questions.length - this.usedQuestionIds.size;
  }

  /**
   * 사용된 질문 개수
   */
  getUsedQuestionsCount(): number {
    return this.usedQuestionIds.size;
  }

  /**
   * 게임 리셋
   */
  reset(): void {
    this.usedQuestionIds.clear();
    this.lastSelectedRespondentIds = [];
  }
}

// 싱글톤 인스턴스 (필요시 사용)
export const gameState = new GameState();
