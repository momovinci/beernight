import { getState, setState, getRemainingQuestionsCount } from '../state.js'

/**
 * 결과 화면 렌더링
 */
export function renderResultView() {
  const app = document.getElementById('app')
  const currentQuestion = getState('currentQuestion')
  const currentAnswerers = getState('currentAnswerers')
  const remaining = getRemainingQuestionsCount()

  if (!currentQuestion || !currentAnswerers) {
    setState('currentView', 'game')
    return
  }

  app.innerHTML = `
    <div class="container">
      <div class="header">
        <h1>랜덤 결과</h1>
      </div>

      <!-- 좌우 레이아웃: 질문(좌측) / 답변자(우측) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
        <!-- 왼쪽: 질문 카드 -->
        <section class="section" style="perspective: 1200px; margin-bottom: 0; height: 320px; padding: 24px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
          <div class="flip-card-container" style="position: relative; width: 100%; height: 100%; cursor: pointer;">
            <div class="flip-card" style="position: relative; width: 100%; height: 100%; transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); transform-style: preserve-3d; animation: flipCard3D 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;">
              <!-- 앞면 (숫자) -->
              <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; background: #BAD4FF; border-radius: 12px; color: white; font-size: 64px; font-weight: bold; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">
                ${currentQuestion.index + 1}
              </div>
              <!-- 뒷면 (질문) -->
              <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; background: #E4E4E7; border-radius: 12px; color: var(--content-highemphasis1); font-size: 20px; font-weight: 600; padding: 24px; text-align: center; transform: rotateY(180deg); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">
                ${currentQuestion.text}
              </div>
            </div>
          </div>
        </section>

        <!-- 오른쪽: 답변자 목록 (좌우 배치) -->
        <section class="section" style="margin-bottom: 0; height: 320px; padding: 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
          <div style="display: flex; gap: 16px; width: 100%; height: 100%; align-items: center; justify-content: center;">
            ${currentAnswerers
              .map(
                (answerer, idx) => `
              <div class="profile" style="text-align: center; animation: fadeInLeft 0.6s ease-out ${idx * 0.2}s forwards; opacity: 0;">
                ${
                  answerer.photo
                    ? `<img src="${answerer.photo}" class="profile-avatar" alt="${answerer.name}" style="border-radius: 999px; border: none;" />`
                    : `<div class="profile-avatar" style="background-color: var(--surface-default); display: flex; align-items: center; justify-content: center; font-size: 40px; border-radius: 999px; border: none;">👤</div>`
                }
                <p class="profile-name">${answerer.name}</p>
              </div>
            `
              )
              .join('')}
          </div>
        </section>
      </div>

      <!-- 남은 질문 (칩 형태) -->
      <div style="text-align: center; margin-bottom: 32px;">
        <span style="display: inline-block; background-color: var(--surface-elevation1); color: var(--content-highemphasis1); padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
          📍 남은 질문: ${remaining}개
        </span>
      </div>

      <!-- 하단 버튼 -->
      <div class="footer" style="display: flex; gap: 12px; justify-content: center;">
        <button id="btn-end-game" class="btn btn-secondary" style="font-size: 14px; padding: 10px 20px;">
          랜덤뽑기 종료
        </button>
        <button id="btn-next-card" class="btn btn-primary" style="font-size: 14px; padding: 10px 20px;">
          ${remaining > 0 ? '다음 카드 선택' : '게임 완료'}
        </button>
      </div>
    </div>
  `

  // 이벤트 리스너 등록
  attachEventListeners()
}

/**
 * 이벤트 리스너 등록
 */
function attachEventListeners() {
  const app = document.getElementById('app')

  const handleClick = (e) => {
    if (e.target.id === 'btn-next-card') {
      const remaining = getRemainingQuestionsCount()

      if (remaining > 0) {
        setState('currentView', 'game')
      } else {
        const confirmed = confirm('모든 카드를 선택했습니다! 다시 게임을 하시겠습니까?')
        if (confirmed) {
          setState('currentView', 'setup')
        }
      }
    }

    if (e.target.id === 'btn-end-game') {
      setState('currentView', 'setup')
    }
  }

  // app 컨테이너에만 리스너 등록
  app.addEventListener('click', handleClick)

  // 뷰 변경 시 리스너 제거
  return () => {
    app.removeEventListener('click', handleClick)
  }
}
