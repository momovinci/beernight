import {
  getState,
  setState,
  addQuestion,
  removeQuestion,
  updateQuestion,
  addAnswerer,
  removeAnswerer,
  updateAnswerer
} from '../state.js'

/**
 * 설정 페이지 렌더링
 */
export function renderSetupView() {
  const app = document.getElementById('app')
  const questions = getState('questions')
  const answerers = getState('answerers')

  app.innerHTML = `
    <div class="container">
      <div class="header">
        <h1>🍺 Beernight</h1>
        <p class="text-secondary">질문과 답변자를 설정하고 게임을 시작하세요!</p>
      </div>

      <!-- 좌우 레이아웃 (모바일에서는 1열, 데스크톱에서는 2열) -->
      <div class="setup-two-column" style="display: grid; gap: 24px; margin-bottom: 24px;">
        <!-- 질문 섹션 (좌측) -->
        <section class="section">
          <h2>질문 목록 (최소 1개)</h2>
          <div id="questions-list" class="mb-4"></div>
          <button id="btn-add-question" class="btn btn-secondary">
            + 질문 추가
          </button>
        </section>

        <!-- 답변자 섹션 (우측) -->
        <section class="section">
          <h2>답변자 목록 (최소 2명)</h2>
          <div id="answerers-list" class="mb-4"></div>
          <button id="btn-add-answerer" class="btn btn-secondary">
            + 답변자 추가
          </button>
        </section>
      </div>

      <!-- 하단 버튼 -->
      <div class="footer">
        <button id="btn-start-game" class="btn btn-primary" style="font-size: 16px; padding: 12px 24px;">
          게임 시작
        </button>
      </div>
    </div>
  `

  // 질문 리스트 렌더링
  renderQuestionList()

  // 답변자 리스트 렌더링
  renderAnswererList()

  // 버튼 유효성 검사
  updateStartButtonState()

  // 이벤트 리스너 등록
  attachEventListeners()
}

/**
 * 질문 리스트 렌더링
 */
function renderQuestionList() {
  const questions = getState('questions')
  const container = document.getElementById('questions-list')

  container.innerHTML = questions
    .map(
      (q, idx) => `
        <div class="list-item">
          <input
            type="text"
            class="question-input"
            data-index="${idx}"
            value="${q}"
            placeholder="질문을 입력하세요"
          />
          <button class="btn btn-delete question-delete" data-index="${idx}">×</button>
        </div>
      `
    )
    .join('')
}

/**
 * 답변자 리스트 렌더링
 */
function renderAnswererList() {
  const answerers = getState('answerers')
  const container = document.getElementById('answerers-list')

  container.innerHTML = answerers
    .map(
      (a, idx) => `
        <div class="list-item flex-col" style="position: relative; align-items: center;">
          <button class="btn btn-delete answerer-delete" data-index="${idx}" style="position: absolute; top: -1px; right: 8px; width: auto; padding: 4px 8px;">×</button>
          <div class="flex gap-4 w-full" style="align-items: center;">
            <div style="flex: 0 0 auto;">
              <input
                type="file"
                accept="image/*"
                class="answerer-photo-input"
                data-index="${idx}"
                style="display: none;"
              />
              <button
                class="btn btn-photo answerer-photo-btn"
                data-index="${idx}"
                style="width: 100px; height: 100px; padding: 0; border-radius: 8px; overflow: hidden;"
              >
                ${
                  a.photo
                    ? `<img src="${a.photo}" style="width: 100%; height: 100%; object-fit: cover;" />`
                    : '📸 사진'
                }
              </button>
            </div>
            <div style="flex: 1;">
              <input
                type="text"
                class="answerer-name-input"
                data-index="${idx}"
                value="${a.name}"
                placeholder="이름을 입력하세요"
                style="width: 100%;"
              />
            </div>
          </div>
        </div>
      `
    )
    .join('')
}

/**
 * 이벤트 리스너 등록
 */
function attachEventListeners() {
  const app = document.getElementById('app')

  // 입력 이벤트
  const handleInput = (e) => {
    if (e.target.classList.contains('question-input')) {
      const idx = parseInt(e.target.dataset.index)
      updateQuestion(idx, e.target.value)
      updateStartButtonState()
    }
    if (e.target.classList.contains('answerer-name-input')) {
      const idx = parseInt(e.target.dataset.index)
      const answerer = getState('answerers')[idx]
      updateAnswerer(idx, e.target.value, answerer.photo)
      updateStartButtonState()
    }
  }

  // 클릭 이벤트
  const handleClick = (e) => {
    if (e.target.classList.contains('question-delete')) {
      const idx = parseInt(e.target.dataset.index)
      removeQuestion(idx)
      renderQuestionList()
      updateStartButtonState()
    }

    if (e.target.classList.contains('answerer-delete')) {
      const idx = parseInt(e.target.dataset.index)
      removeAnswerer(idx)
      renderAnswererList()
      updateStartButtonState()
    }

    if (e.target.classList.contains('answerer-photo-btn')) {
      const idx = parseInt(e.target.dataset.index)
      const fileInput = app.querySelector(
        `.answerer-photo-input[data-index="${idx}"]`
      )
      fileInput.click()
    }

    if (e.target.id === 'btn-add-question') {
      addQuestion('')
      renderQuestionList()
      updateStartButtonState()
    }

    if (e.target.id === 'btn-add-answerer') {
      addAnswerer('', null)
      renderAnswererList()
      updateStartButtonState()
    }

    if (e.target.id === 'btn-start-game') {
      handleStartGame()
    }
  }

  // 파일 선택 이벤트
  const handleChange = (e) => {
    if (e.target.classList.contains('answerer-photo-input')) {
      const idx = parseInt(e.target.dataset.index)
      const file = e.target.files[0]

      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const answerer = getState('answerers')[idx]
          updateAnswerer(idx, answerer.name, event.target.result)
          renderAnswererList()
        }
        reader.readAsDataURL(file)
      }
    }
  }

  // app 컨테이너에 리스너 등록 (한 번만)
  app.addEventListener('input', handleInput)
  app.addEventListener('click', handleClick)
  app.addEventListener('change', handleChange)
}

/**
 * 게임 시작 처리
 */
function handleStartGame() {
  const questions = getState('questions')
  const answerers = getState('answerers')

  // 유효성 검사
  if (questions.length === 0) {
    alert('최소 1개의 질문을 입력해주세요')
    return
  }

  if (answerers.length < 2) {
    alert('최소 2명의 답변자를 입력해주세요')
    return
  }

  // 빈 질문 확인
  if (questions.some(q => q.trim() === '')) {
    alert('모든 질문을 입력해주세요')
    return
  }

  // 빈 답변자 이름 확인
  if (answerers.some(a => a.name.trim() === '')) {
    alert('모든 답변자의 이름을 입력해주세요')
    return
  }

  // 게임 시작
  setState('currentView', 'game')
}

/**
 * 게임 시작 버튼 상태 업데이트
 */
function updateStartButtonState() {
  const btn = document.getElementById('btn-start-game')
  const questions = getState('questions')
  const answerers = getState('answerers')

  const isValid =
    questions.length > 0 &&
    answerers.length >= 2 &&
    questions.every(q => q.trim() !== '') &&
    answerers.every(a => a.name.trim() !== '')

  btn.disabled = !isValid
}
