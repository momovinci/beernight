// 전역 상태 객체
let appState = {
  questions: [],
  answerers: [],
  usedQuestionIndexes: new Set(),
  currentView: 'setup',
  currentQuestion: null,
  currentAnswerers: null,
  previousAnswerers: null
}

// 상태 변경 리스너들
const listeners = new Map()

/**
 * 특정 키의 상태 변경을 감시
 */
export function onStateChange(key, callback) {
  if (!listeners.has(key)) {
    listeners.set(key, [])
  }
  listeners.get(key).push(callback)
}

/**
 * 상태 변경 및 리스너 호출
 */
function notifyListeners(key, value) {
  if (listeners.has(key)) {
    listeners.get(key).forEach(callback => callback(value))
  }
}

/**
 * 상태 값 가져오기
 */
export function getState(key) {
  return appState[key]
}

/**
 * 상태 값 설정
 */
export function setState(key, value) {
  appState[key] = value
  notifyListeners(key, value)
}

/**
 * 전체 상태 가져오기
 */
export function getFullState() {
  return { ...appState }
}

/**
 * 질문 추가
 */
export function addQuestion(text = '') {
  appState.questions.push(text)
  notifyListeners('questions', appState.questions)
}

/**
 * 질문 제거
 */
export function removeQuestion(index) {
  appState.questions.splice(index, 1)
  notifyListeners('questions', appState.questions)
}

/**
 * 질문 업데이트
 */
export function updateQuestion(index, text) {
  appState.questions[index] = text
  notifyListeners('questions', appState.questions)
}

/**
 * 답변자 추가
 */
export function addAnswerer(name = '', photo = null) {
  const answerer = {
    id: Math.random(),
    name,
    photo
  }
  appState.answerers.push(answerer)
  notifyListeners('answerers', appState.answerers)
  return answerer.id
}

/**
 * 답변자 제거
 */
export function removeAnswerer(index) {
  appState.answerers.splice(index, 1)
  notifyListeners('answerers', appState.answerers)
}

/**
 * 답변자 업데이트
 */
export function updateAnswerer(index, name, photo) {
  appState.answerers[index] = {
    ...appState.answerers[index],
    name,
    photo
  }
  notifyListeners('answerers', appState.answerers)
}

/**
 * 질문 선택 (카드 선택)
 */
export function selectQuestion(index) {
  appState.usedQuestionIndexes.add(index)
  appState.currentQuestion = {
    text: appState.questions[index],
    index
  }
  selectAnswerers()
  notifyListeners('currentQuestion', appState.currentQuestion)
}

/**
 * 랜덤으로 2명의 답변자 선택 (이전 선택자 제외)
 */
export function selectAnswerers() {
  if (appState.answerers.length < 2) {
    appState.currentAnswerers = appState.answerers.slice(0, 2)
  } else {
    // 이전에 선택된 답변자를 제외한 풀 생성
    let answererPool = appState.answerers

    if (appState.previousAnswerers && appState.previousAnswerers.length === 2) {
      // 이전 선택자의 id를 구해서 제외
      const prevIds = new Set(appState.previousAnswerers.map(a => a.id))
      answererPool = appState.answerers.filter(a => !prevIds.has(a.id))
    }

    // 풀에 2명 이상이 있으면 random select, 없으면 전체에서 선택
    if (answererPool.length >= 2) {
      const shuffled = answererPool.sort(() => Math.random() - 0.5)
      appState.currentAnswerers = shuffled.slice(0, 2)
    } else {
      const shuffled = [...appState.answerers].sort(() => Math.random() - 0.5)
      appState.currentAnswerers = shuffled.slice(0, 2)
    }
  }

  // 현재 선택된 답변자를 이전 선택으로 저장
  appState.previousAnswerers = appState.currentAnswerers ? [...appState.currentAnswerers] : null
  notifyListeners('currentAnswerers', appState.currentAnswerers)
}

/**
 * 게임 상태 초기화 (카드 리셋)
 */
export function resetGameState() {
  appState.usedQuestionIndexes.clear()
  appState.currentQuestion = null
  appState.currentAnswerers = null
  appState.previousAnswerers = null
  notifyListeners('usedQuestionIndexes', appState.usedQuestionIndexes)
}

/**
 * 전체 초기화
 */
export function resetAll() {
  appState = {
    questions: [],
    answerers: [],
    usedQuestionIndexes: new Set(),
    currentView: 'setup',
    currentQuestion: null,
    currentAnswerers: null,
    previousAnswerers: null
  }
  notifyListeners('questions', appState.questions)
  notifyListeners('answerers', appState.answerers)
  notifyListeners('currentView', 'setup')
}

/**
 * 남은 질문 개수
 */
export function getRemainingQuestionsCount() {
  return appState.questions.length - appState.usedQuestionIndexes.size
}

/**
 * 모든 질문 선택 완료 여부
 */
export function isAllQuestionsUsed() {
  return appState.usedQuestionIndexes.size === appState.questions.length
}

/**
 * 질문 선택 가능 여부 확인
 */
export function isQuestionUsed(index) {
  return appState.usedQuestionIndexes.has(index)
}
