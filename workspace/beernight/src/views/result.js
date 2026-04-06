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
        <h1>🎉 매칭 결과!</h1>
      </div>

      <!-- 질문 표시 (플립 애니메이션) -->
      <section class="section" style="perspective: 1000px;">
        <div class="flip-card-container" style="position: relative; width: 100%; height: 200px; cursor: pointer;">
          <div class="flip-card" style="position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; animation: flipCard 0.8s ease-out forwards;">
            <!-- 앞면 (숫자) -->
            <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--surface-primary) 0%, rgba(249, 8, 115, 0.8) 100%); border-radius: 12px; color: white; font-size: 64px; font-weight: bold;">
              ${currentQuestion.index + 1}
            </div>
            <!-- 뒷면 (질문) -->
            <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--surface-secondary) 0%, rgba(64, 96, 255, 0.8) 100%); border-radius: 12px; color: white; font-size: 20px; font-weight: 600; padding: 24px; text-align: center; transform: rotateX(180deg);">
              ${currentQuestion.text}
            </div>
          </div>
        </div>
      </section>

      <!-- 답변자 페어 -->
      <section style="margin-bottom: 32px;">
        <div class="flex gap-4 flex-col" style="flex-direction: row;">
          ${currentAnswerers
            .map(
              answerer => `
            <div class="profile" style="flex: 1;">
              ${
                answerer.photo
                  ? `<img src="${answerer.photo}" class="profile-avatar" alt="${answerer.name}" />`
                  : `<div class="profile-avatar" style="background-color: var(--surface-default); display: flex; align-items: center; justify-content: center; font-size: 40px;">👤</div>`
              }
              <p class="profile-name">${answerer.name}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- 남은 질문 -->
      <div class="text-center mb-6">
        <p class="text-secondary">📍 남은 질문: <strong>${remaining}</strong>개</p>
      </div>

      <!-- 하단 버튼 -->
      <div class="footer">
        <button id="btn-next-card" class="btn btn-primary" style="font-size: 16px; padding: 12px 24px;">
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
  }

  // app 컨테이너에만 리스너 등록
  app.addEventListener('click', handleClick)

  // 뷰 변경 시 리스너 제거
  return () => {
    app.removeEventListener('click', handleClick)
  }
}
