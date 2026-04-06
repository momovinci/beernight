# Beernight 컴포넌트 구조 & 기술 설계

## 🏗️ 전체 아키텍처

```
┌──────────────────────────────────────────────┐
│           HTML/JS SPA 애플리케이션            │
│  (상태 기반 화면 전환, 라우터 라이브러리 없음) │
└──────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────┐
│         State 모듈 (state.js)                 │
│   전역 상태 관리 & 이벤트 발생                 │
└──────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────┐
│    Main 모듈 (main.js)                       │
│   화면 전환 라우터, 이벤트 리스너             │
└──────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────┐
│   View 모듈들 (setup.js, game.js, result.js) │
│   각 화면의 렌더 함수 & 이벤트 핸들러         │
└──────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────┐
│    DOM + CSS (Tailwind + tokens.css)         │
└──────────────────────────────────────────────┘
```

---

## 📋 상태 구조 (state.js)

```javascript
// 전역 상태 객체
const appState = {
  // 설정 데이터
  questions: ['질문1', '질문2', ...],  // string[]
  answerers: [
    { id: 0, name: '답변자1', photo: null | 'base64/blob' },
    { id: 1, name: '답변자2', photo: null | 'base64/blob' },
    ...
  ],

  // 게임 진행 상태
  usedQuestionIndexes: new Set([0, 2, ...]),  // Set<number>

  // 현재 화면 상태
  currentView: 'setup' | 'game' | 'result',

  // 결과 화면 데이터
  currentQuestion: {
    text: '질문 내용',
    index: 0
  } | null,

  currentAnswerers: [
    { id: 0, name: '답변자1', photo: '...' },
    { id: 1, name: '답변자2', photo: '...' }
  ] | null
}

// 상태 변경 함수들 (순수 함수)
export function setState(key, value) { /* ... */ }
export function getState() { /* ... */ }
export function resetGameState() { /* ... */ }
export function resetAll() { /* ... */ }
export function addQuestion(text) { /* ... */ }
export function removeQuestion(index) { /* ... */ }
export function addAnswerer(name, photo) { /* ... */ }
export function removeAnswerer(index) { /* ... */ }
export function selectQuestion(index) { /* ... */ }
export function selectAnswerers() { /* 랜덤 2명 선택 */ }
```

---

## 🎨 컴포넌트 트리 & 파일 구조

```
src/
├── main.js                    # 진입점, 뷰 라우터, 이벤트 위임
├── state.js                   # 상태 관리 모듈
├── styles/
│   └── main.css              # Tailwind @import + 커스텀 CSS
└── views/
    ├── setup.js              # 설정 페이지 렌더 + 로직
    ├── game.js               # 게임 화면 렌더 + 로직
    └── result.js             # 결과 화면 렌더 + 로직
```

---

## 📄 각 View 상세 구조

### 1. Setup View (`src/views/setup.js`)

**HTML 구조**:
```html
<div id="setup-view" class="...">
  <div class="setup-header">
    <h1>게임 설정</h1>
  </div>

  <div class="setup-container">
    <!-- 질문 섹션 -->
    <section class="questions-section">
      <h2>질문 목록</h2>
      <div id="questions-list" class="questions-list">
        <!-- QuestionItem × N (동적 생성) -->
        <div class="question-item">
          <input type="text" class="question-input" placeholder="질문을 입력하세요" />
          <button class="btn-delete">×</button>
        </div>
      </div>
      <button id="btn-add-question" class="btn-add">+ 질문 추가</button>
    </section>

    <!-- 답변자 섹션 -->
    <section class="answerers-section">
      <h2>답변자 목록</h2>
      <div id="answerers-list" class="answerers-list">
        <!-- AnswererItem × N (동적 생성) -->
        <div class="answerer-item">
          <input type="file" class="answerer-photo-input" accept="image/*" />
          <img class="answerer-photo-preview" src="" alt="preview" />
          <input type="text" class="answerer-name-input" placeholder="이름을 입력하세요" />
          <button class="btn-delete">×</button>
        </div>
      </div>
      <button id="btn-add-answerer" class="btn-add">+ 답변자 추가</button>
    </section>
  </div>

  <div class="setup-footer">
    <button id="btn-start-game" class="btn-primary" disabled>게임 시작</button>
  </div>
</div>
```

**JS 함수들**:
```javascript
export function renderSetupView() {
  // 1. 상태에서 질문/답변자 로드
  // 2. 위 HTML 생성 및 DOM 에 마운트
  // 3. 이벤트 리스너 등록
  //    - 질문 입력 → 상태 업데이트
  //    - 답변자 입력 → 상태 업데이트
  //    - 삭제 버튼 → removeQuestion / removeAnswerer
  //    - 사진 업로드 → base64 변환 후 상태 저장
  //    - 게임 시작 버튼 → 유효성 검사 후 game 뷰로 전환
}

function onQuestionInput(index, text) { /* state 업데이트 */ }
function onAnswererInput(index, name, photo) { /* state 업데이트 */ }
function onAddQuestion() { /* questions 배열에 빈 항목 추가 */ }
function onAddAnswerer() { /* answerers 배열에 빈 항목 추가 */ }
function onDeleteQuestion(index) { /* removeQuestion(index) */ }
function onDeleteAnswerer(index) { /* removeAnswerer(index) */ }
function onStartGame() {
  // 유효성 검사: questions.length >= 1, answerers.length >= 2
  // 통과하면: setState('currentView', 'game') → main.js 에서 감지해 뷰 전환
}
```

**이벤트 위임**:
- 동적 요소 추가/삭제 시 이벤트 위임 사용 (이벤트 버블링)
  - `#questions-list`, `#answerers-list` 에만 리스너 등록
  - 이벤트 타겟 검사로 어느 항목인지 파악

---

### 2. Game View (`src/views/game.js`)

**HTML 구조**:
```html
<div id="game-view" class="...">
  <div class="game-header">
    <h1>게임 진행 중</h1>
    <p class="remaining-count">📍 남은 질문 <span id="remaining-count">N</span>개</p>
  </div>

  <div class="game-container">
    <!-- 카드 그리드 -->
    <div id="cards-grid" class="cards-grid">
      <!-- QuestionCard × N (동적 생성) -->
      <button class="question-card" data-index="0">
        <span class="card-number">1</span>
      </button>
      <!-- ... -->
    </div>
  </div>

  <div class="game-footer">
    <button id="btn-reset-game" class="btn-secondary">게임 리셋</button>
  </div>
</div>
```

**JS 함수들**:
```javascript
export function renderGameView() {
  // 1. 미선택 카드만 렌더 (usedQuestionIndexes 확인)
  // 2. 그리드 레이아웃 적용
  // 3. 각 카드에 클릭 리스너
  // 4. 리셋 버튼에 리스너
}

function onCardClick(index) {
  // 1. 이미 선택됨 → 무시
  // 2. 선택되지 않음 → selectQuestion(index) 호출
  // 3. selectAnswerers() 호출 (랜덤 2명)
  // 4. setState('currentView', 'result')
  // 5. main.js에서 감지해 뷰 전환
}

function onResetGame() {
  // 1. resetGameState() 호출
  // 2. setState('currentView', 'setup')
  // 3. setup 뷰 렌더 (입력 필드 초기화)
}

function updateRemainingCount() {
  // document.getElementById('remaining-count').textContent = count
}
```

**카드 상태 스타일**:
```css
.question-card {
  /* 기본 상태: 선택 가능 */
  background-color: var(--surface-elevation1);  /* #fafafa */
  border: 1px solid var(--border-base);         /* #dadade */
}

.question-card:hover:not(:disabled) {
  /* 호버 상태 */
  opacity: 0.8;
  cursor: pointer;
}

.question-card:disabled {
  /* 선택됨 상태 */
  background-color: var(--surface-disabled);   /* #e4e4e7 */
  color: var(--content-helper1);
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

### 3. Result View (`src/views/result.js`)

**HTML 구조**:
```html
<div id="result-view" class="...">
  <div class="result-header">
    <h1>매칭 결과! 🎉</h1>
  </div>

  <div class="result-container">
    <!-- 질문 표시 -->
    <section class="question-display">
      <p id="current-question-text" class="question-text">질문 내용</p>
    </section>

    <!-- 답변자 2명 -->
    <section class="answerers-pair">
      <!-- AnswererProfile × 2 -->
      <div class="answerer-profile">
        <img class="answerer-avatar" src="" alt="avatar" />
        <p class="answerer-name">답변자1</p>
      </div>

      <div class="answerer-profile">
        <img class="answerer-avatar" src="" alt="avatar" />
        <p class="answerer-name">답변자2</p>
      </div>
    </section>
  </div>

  <div class="result-footer">
    <button id="btn-next-card" class="btn-primary">다음 카드 선택</button>
  </div>
</div>
```

**JS 함수들**:
```javascript
export function renderResultView() {
  // 1. currentQuestion, currentAnswerers 에서 데이터 로드
  // 2. 질문 텍스트 렌더
  // 3. 답변자 2명의 프로필 렌더
  // 4. 다음 버튼 클릭 리스너
}

function onNextCard() {
  // 1. setState('currentView', 'game')
  // 2. main.js에서 감지해 뷰 전환
}
```

**스타일**:
```css
.answerer-avatar {
  width: 100px;
  height: 100px;
  border-radius: var(--radius-300);  /* 8px 또는 16px */
  object-fit: cover;
  border: 2px solid var(--border-primary);
}

.answerer-name {
  margin-top: 12px;  /* spacing/100 * 3 */
  font-weight: var(--weight-medium);  /* 500 */
  color: var(--content-highemphasis1);
}
```

---

## 🎛️ Main 라우터 (main.js)

```javascript
import { appState, getState } from './state.js';
import { renderSetupView } from './views/setup.js';
import { renderGameView } from './views/game.js';
import { renderResultView } from './views/result.js';

// 마운트 포인트
const appContainer = document.getElementById('app');

// 뷰 전환 함수
function switchView(viewName) {
  appContainer.innerHTML = '';  // 이전 뷰 제거

  switch (viewName) {
    case 'setup':
      renderSetupView();
      break;
    case 'game':
      renderGameView();
      break;
    case 'result':
      renderResultView();
      break;
  }
}

// 상태 변경 감시 (간단한 옵저버 패턴)
export function onStateChange(key, value) {
  if (key === 'currentView') {
    switchView(value);
  }
}

// 앱 초기화
function init() {
  switchView('setup');
}

init();
```

---

## 🎨 Tailwind + Beernight 토큰 매핑

### 색상 토큰 활용

| 용도 | 토큰 경로 | CSS 변수 | 색상 | 사용 처 |
|------|---------|---------|------|--------|
| **배경** | background/base | `--background-base` | #ffffff | 전체 배경 |
| **카드 (기본)** | surface/elevation1 | `--surface-elevation1` | #fafafa | 게임 카드 |
| **카드 (비활성)** | surface/disabled | `--surface-disabled` | #e4e4e7 | 선택된 카드 |
| **버튼 (주요)** | surface/primary | `--surface-primary` | #f90873 | 게임 시작, 다음 |
| **버튼 (보조)** | surface/secondary | `--surface-secondary` | #4060ff | 리셋 |
| **텍스트 (주요)** | content/highemphasis1 | `--content-highemphasis1` | #000000f2 | 제목, 텍스트 |
| **텍스트 (보조)** | content/helper1 | `--content-helper1` | #00000099 | 플레이스홀더 |
| **테두리** | border/base | `--border-base` | #dadade | 카드 테두리 |
| **오버레이** | surface/overlay | `--surface-overlay` | #000000cc | 모달 배경 (필요시) |

### 숫자 토큰 활용

| 용도 | 토큰 경로 | CSS 변수 | 값 | 사용 처 |
|------|---------|---------|-----|--------|
| **간격 (작은)** | spacing/100 | `--spacing-100` | 4px | input 여백 |
| **간격 (큰)** | spacing/500 | `--spacing-500` | 24px | 섹션 간격 |
| **반지름 (카드)** | radius/200 | `--radius-200` | 8px | 카드, input |
| **반지름 (버튼)** | radius/1000 | `--radius-1000` | 999px | 완전 라운드 버튼 |
| **폰트 크기 (제목)** | size/700 | `--size-700` | 21px | 페이지 제목 (h1) |
| **폰트 크기 (본문)** | size/400 | `--size-400` | 14px | 일반 텍스트 |
| **폰트 무게** | weight/medium | `--weight-medium` | 500 | 카드 숫자, 이름 |
| **폰트 무게 (굵음)** | weight/bold | `--weight-bold` | 700 | 제목 |
| **폰트 패밀리** | font | `--font` | Pretendard Variable | 전체 글꼴 |

### 커스텀 Tailwind 설정 (vite 프로젝트용)

```css
/* src/styles/main.css */
@import "../../tokens/dist/tokens.css";
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 커스텀 컬러 확장 */
@layer utilities {
  .text-primary { @apply text-[var(--content-primary)]; }
  .bg-card { @apply bg-[var(--surface-elevation1)]; }
  .border-default { @apply border-[var(--border-base)]; }
  .btn-primary { @apply bg-[var(--surface-primary)] text-white px-4 py-2 rounded-[var(--radius-1000)] font-[var(--weight-medium)]; }
  .btn-secondary { @apply bg-[var(--surface-secondary)] text-white px-4 py-2 rounded-[var(--radius-1000)] font-[var(--weight-medium)]; }
}
```

---

## 🧠 상태 변경 흐름 (State Machine)

```
┌─────────┐
│ setup   │
└────┬────┘
     │ (사용자가 "게임 시작" 클릭)
     │ → setState('currentView', 'game')
     ↓
┌─────────┐
│ game    │
└────┬────┘
     │
     ├─ (사용자가 카드 클릭)
     │  → selectQuestion(index)
     │  → selectAnswerers()
     │  → setState('currentView', 'result')
     │
     └─ (사용자가 "리셋" 클릭)
        → resetGameState()
        → setState('currentView', 'setup')

┌─────────┐
│ result  │
└────┬────┘
     │ (사용자가 "다음" 클릭)
     │ → setState('currentView', 'game')
     ↓
  (반복)
```

---

## 🔧 핵심 유틸리티 함수

### `selectRandomAnswerers(answerers, exclude = [])`

```javascript
/**
 * 답변자 배열에서 제외 목록을 피하고 2명을 랜덤 선택
 */
function selectRandomAnswerers(answerers, exclude = []) {
  const candidates = answerers.filter(a => !exclude.includes(a.id));

  if (candidates.length < 2) {
    // 2명 이상 필요
    return answerers.slice(0, 2);
  }

  // Fisher-Yates 셔플 후 앞의 2명 선택
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
}
```

### `resetGameState()`

```javascript
function resetGameState() {
  setState('usedQuestionIndexes', new Set());
  setState('currentQuestion', null);
  setState('currentAnswerers', null);
}
```

### `resetAll()`

```javascript
function resetAll() {
  setState('questions', []);
  setState('answerers', []);
  resetGameState();
  setState('currentView', 'setup');
}
```

---

## 📐 반응형 레이아웃

```tailwind
<!-- 게임 카드 그리드 -->
<div id="cards-grid" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <!-- 카드들 -->
</div>

<!-- 답변자 페어 -->
<div class="flex flex-col md:flex-row gap-8 justify-center items-center">
  <!-- 2명의 답변자 -->
</div>
```

- **모바일 (< 768px)**: 1열
- **태블릿 (768px ~ 1024px)**: 2열
- **데스크톱 (> 1024px)**: 3열

---

## 🚀 로드맵 (추후 확장)

1. **LocalStorage 저장**: 게임 진행 상태 저장 및 복원
2. **다크 모드**: `colors/dark/*` 토큰 활용
3. **사운드 효과**: 카드 클릭, 결과 표시 시 음향
4. **카드 애니메이션**: 카드 선택 시 전환 효과
5. **공유 기능**: 결과 스크린샷 또는 링크 공유

