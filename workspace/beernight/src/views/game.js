import {
  getState,
  setState,
  selectQuestion,
  resetGameState,
  resetAll,
  getRemainingQuestionsCount,
  isQuestionUsed
} from '../state.js'

/**
 * 게임 화면 렌더링
 */
export function renderGameView() {
  const app = document.getElementById('app')
  const questions = getState('questions')
  const remaining = getRemainingQuestionsCount()

  app.innerHTML = `
    <div class="container">
      <div class="header">
        <h1>🎮 게임 진행 중</h1>
        <p class="text-secondary">📍 남은 질문 <strong>${remaining}</strong>개</p>
      </div>

      <div id="cards-grid" class="grid mb-6"></div>

      <div class="footer">
        <button id="btn-reset-game" class="btn btn-secondary">
          게임 리셋
        </button>
      </div>
    </div>
  `

  // 카드 렌더링
  renderCards()

  // 이벤트 리스너 등록
  attachEventListeners()
}

/**
 * 카드 그리드 렌더링
 */
function renderCards() {
  const questions = getState('questions')
  const container = document.getElementById('cards-grid')

  container.innerHTML = questions
    .map(
      (q, idx) => `
        <button
          class="card question-card"
          data-index="${idx}"
          ${isQuestionUsed(idx) ? 'disabled' : ''}
        >
          <span class="card-number">${idx + 1}</span>
        </button>
      `
    )
    .join('')
}

/**
 * 이벤트 리스너 등록
 */
function attachEventListeners() {
  const app = document.getElementById('app')

  // 이벤트 위임: app 컨테이너 내에서만 리스너 동작
  const handleClick = (e) => {
    // 카드 클릭
    if (e.target.classList.contains('question-card')) {
      const idx = parseInt(e.target.dataset.index)

      if (!isQuestionUsed(idx)) {
        selectQuestion(idx)
        setState('currentView', 'result')
      }
    }

    // 게임 리셋
    if (e.target.id === 'btn-reset-game') {
      const confirmed = confirm('게임을 리셋하시겠습니까?')
      if (confirmed) {
        resetGameState()
        resetAll()
        setState('currentView', 'setup')
      }
    }
  }

  // app 컨테이너에 리스너 등록
  app.addEventListener('click', handleClick)

  // 뷰 변경 시 리스너 제거 (메모리 누수 방지)
  return () => {
    app.removeEventListener('click', handleClick)
  }
}
