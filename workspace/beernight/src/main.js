import './styles/main.css'
import { onStateChange, getState } from './state.js'
import { renderSetupView } from './views/setup.js'
import { renderGameView } from './views/game.js'
import { renderResultView } from './views/result.js'

/**
 * 뷰 전환 라우터
 */
function switchView(viewName) {
  switch (viewName) {
    case 'setup':
      renderSetupView()
      break
    case 'game':
      renderGameView()
      break
    case 'result':
      renderResultView()
      break
    default:
      renderSetupView()
  }
}

/**
 * 앱 초기화
 */
function initApp() {
  // 상태 변경 리스너 등록
  onStateChange('currentView', (viewName) => {
    switchView(viewName)
  })

  // 초기 뷰 렌더링
  const initialView = getState('currentView')
  switchView(initialView)
}

// 앱 시작
initApp()
