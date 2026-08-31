import { ConfrontationOutcome, ConfrontationResult, ConfrontationChoice } from '@/types/confrontation';

/**
 * 일진 대치 씬 엔진
 * 선택에 따른 결과 계산
 */
export class ConfrontationEngine {
  /**
   * 대치 상황 결과 계산
   */
  static calculateOutcome(
    choice: ConfrontationChoice,
    heroineTrust: number,
    protagonistCourage: number
  ): ConfrontationResult {
    const random = Math.random() * 100;
    const successChance = choice.successRate + (protagonistCourage * 0.5);
    const isSuccess = random < successChance;

    let outcome: ConfrontationOutcome;
    let finalTrust = heroineTrust + choice.trustDelta;
    let protagonistSafety = true;
    let bulliesDetermined = false;
    let relationshipChange = 0;

    switch (choice.action) {
      case 'confront':
        if (isSuccess) {
          outcome = 'victory';
          finalTrust = Math.min(100, finalTrust + 20);
          relationshipChange = 25;
          bulliesDetermined = false;
        } else {
          outcome = 'defeat';
          finalTrust = Math.max(0, finalTrust - 10);
          relationshipChange = -15;
          protagonistSafety = false;
          bulliesDetermined = true;
        }
        break;

      case 'negotiate':
        if (isSuccess) {
          outcome = 'compromise';
          finalTrust = Math.min(100, finalTrust + 15);
          relationshipChange = 15;
          bulliesDetermined = false;
        } else {
          outcome = 'defeat';
          finalTrust = Math.max(0, finalTrust - 15);
          relationshipChange = -20;
          protagonistSafety = false;
          bulliesDetermined = true;
        }
        break;

      case 'escape':
        outcome = 'escape';
        finalTrust = Math.max(0, finalTrust - 20); // 도망치면 신뢰도 감소
        relationshipChange = -25;
        protagonistSafety = true;
        bulliesDetermined = false;
        break;

      case 'call_for_help':
        outcome = 'draw';
        finalTrust = Math.min(100, finalTrust + 15);
        relationshipChange = 15;
        protagonistSafety = true;
        bulliesDetermined = false;
        break;

      case 'deceive':
        if (isSuccess) {
          outcome = 'victory';
          finalTrust = Math.min(100, finalTrust + 10);
          relationshipChange = 10;
          bulliesDetermined = false;
        } else {
          outcome = 'defeat';
          finalTrust = Math.max(0, finalTrust - 25); // 기만 실패 시 심각한 패널티
          relationshipChange = -30;
          protagonistSafety = false;
          bulliesDetermined = true;
        }
        break;

      default:
        outcome = 'defeat';
    }

    return {
      outcome,
      heroineTrust: finalTrust,
      protagonistSafety,
      bulliesDetermined,
      relationshipChange,
    };
  }

  /**
   * 대치 상황 결과 텍스트
   */
  static getOutcomeText(outcome: ConfrontationOutcome): string {
    switch (outcome) {
      case 'victory':
        return '류완의 당당하고 차분한 태도가 일진들을 밀어붙였다!';
      case 'draw':
        return '긴장이 풀리고 상황이 진정되었다.';
      case 'defeat':
        return '상황이 악화되었다...';
      case 'escape':
        return '간신히 그 자리를 빠져나갔다.';
      case 'compromise':
        return '타협점을 찾았다. 더 이상의 충돌은 없을 것 같다.';
    }
  }

  /**
   * 히로인의 반응 생성 (캐릭터별로 다름)
   */
  static getHeroineReaction(
    outcome: ConfrontationOutcome,
    heroineName: string,
    heroineId: string
  ): string {
    // 세준의 경우 (츤데레)
    if (heroineId === 'char_002') {
      switch (outcome) {
        case 'victory':
          return `"${heroineName}(이)가 류완을 보는 눈이 뜨거워진다. \"뭐하는 거야... 정말...\" (얼굴이 빨개진다)")`;
        case 'draw':
          return `"${heroineName}(이)가 안도의 한숨을 쉬며 류완에게 몸을 기댄다. 하지만 곧 정신을 차리고 물러난다. \"너무 무모했어...\"")`;
        case 'defeat':
          return `"${heroineName}(이)가 겁먹은 표정으로 류완을 본다. \"부장님...\" (평소의 날카로운 태도가 사라진다)")`;
        case 'escape':
          return `"${heroineName}(이)가 실망한 표정으로 류완을 본다. \"도망쳤어? 정말... 답답해.\" (하지만 눈동자는 걱정으로 가득하다)")`;
        case 'compromise':
          return `"${heroineName}(이)가 절망적이지 않은 표정으로 류완을 본다. \"적어도 상황은 나아졌네... 나쁘지 않은데?\" (얼굴이 붉어진다)")`;
      }
    }

    // 일반 히로인
    switch (outcome) {
      case 'victory':
        return `"${heroineName}(이)가 류완을 보는 눈이 찬탄으로 가득하다. \"부장님... 정말 멋있어요.\"")`;
      case 'draw':
        return `"${heroineName}(이)가 안도의 한숨을 쉬며 류완에게 몸을 기댄다. \"정말 다행이에요.\"")`;
      case 'defeat':
        return `"${heroineName}(이)가 겁먹은 표정으로 류완을 본다. \"부장님! 괜찮으세요?\"")`;
      case 'escape':
        return `"${heroineName}(이)가 의아한 표정으로 류완을 본다. \"왜 도망치셨어요?\"")`;
      case 'compromise':
        return `"${heroineName}(이)가 안심하는 표정이다. \"이제 걱정 안 해도 될까요?\"")`;
    }
  }

  /**
   * 일진들의 다음 행동 결정
   */
  static getBulliesNextMove(outcome: ConfrontationOutcome): string {
    switch (outcome) {
      case 'victory':
        return '일진들은 쓸쓸하게 그 자리를 떠난다. "다음엔 조심해."';
      case 'draw':
        return '일진들은 주악을 부르스스 씩지만, 결국 가까운 길을 간다.';
      case 'defeat':
        return '일진 대장이 위협적으로 말을 남기고 떠난다. "다음엔 안 봐주겠어."';
      case 'escape':
        return '일진들은 조롱하는 웃음을 흘리며 떠난다. "겁먹고 도망쳤네."';
      case 'compromise':
        return '일진들은 서로 눈을 마주치며 고개를 끄덕인다. "이정도면 됐어." 그리고 떠난다.';
    }
  }

  /**
   * 대치 상황 후 후속 신 결정
   */
  static getNextSceneAfterConfrontation(
    outcome: ConfrontationOutcome,
    heroineName: string
  ): { scene: string; timing: string } {
    switch (outcome) {
      case 'victory':
        return { scene: '귀가 후 히로인과의 대화', timing: '그날 밤' };
      case 'draw':
        return { scene: '귀가 후 히로인과의 대화', timing: '그날 밤' };
      case 'defeat':
        return { scene: '병원 또는 보건실', timing: '다음날' };
      case 'escape':
        return { scene: '히로인과의 불편한 침묵', timing: '다음날' };
      case 'compromise':
        return { scene: '귀가 후 안도의 시간', timing: '그날 밤' };
    }
  }
}
