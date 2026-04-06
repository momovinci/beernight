# 🍺 Beernight

질문과 답변자를 랜덤으로 매칭해주는 재밌는 웹 게임!

## 🎮 게임 방식

1. **설정 페이지**: 질문과 답변자 정보 입력
   - 질문: 무한 추가 가능 (최소 1개)
   - 답변자: 사진 + 이름 입력 (최소 2명)

2. **게임 화면**: 카드 선택
   - 질문 개수만큼 번호 카드 표시
   - 카드를 선택하면 질문과 랜덤 매칭된 2명의 답변자 표시
   - 선택한 카드는 다시 선택 불가

3. **결과 화면**: 매칭 결과 확인
   - 선택된 질문 1개 표시
   - 랜덤으로 선택된 답변자 2명 표시
   - 다음 카드 선택으로 계속 진행

## 🛠️ 기술 스택

- **구현**: Vanilla HTML/JS (프레임워크 없음)
- **스타일**: Tailwind CSS v4
- **빌드**: Vite
- **패키지 매니저**: npm
- **상태 관리**: Plain JS 모듈

## 📁 프로젝트 구조

```
beernight/
├── docs/
│   ├── service-spec.md              # 서비스 기획 스펙
│   └── component-structure.md       # 컴포넌트 & 기술 설계
├── tokens/
│   ├── flat.json                    # 디자인 토큰 (170+)
│   └── dist/tokens.css              # 생성된 CSS 변수
├── src/
│   ├── main.js                      # 진입점, 뷰 라우터
│   ├── state.js                     # 전역 상태 관리
│   ├── styles/main.css              # Tailwind + 커스텀 스타일
│   └── views/
│       ├── setup.js                 # 설정 페이지
│       ├── game.js                  # 게임 화면
│       └── result.js                # 결과 화면
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저가 자동으로 열리며 `http://localhost:5173` 에서 앱을 볼 수 있습니다.

### 3. 프로덕션 빌드

```bash
npm run build
```

`dist/` 폴더에 최적화된 파일이 생성됩니다.

### 4. 빌드 결과 미리보기

```bash
npm run preview
```

## 📋 디자인 토큰

### 주요 색상

| 용도 | 토큰 | 색상 |
|------|------|------|
| 배경 | `--background-base` | #ffffff |
| 카드 | `--surface-elevation1` | #fafafa |
| 주요 버튼 | `--surface-primary` | #f90873 |
| 보조 버튼 | `--surface-secondary` | #4060ff |
| 텍스트 | `--content-highemphasis1` | #000000f2 |
| 테두리 | `--border-base` | #dadade |

### 숫자 토큰

- **간격**: `--spacing-100` (4px), `--spacing-500` (24px)
- **반지름**: `--radius-200` (8px), `--radius-1000` (999px)
- **폰트**: Pretendard Variable (400, 500, 600, 700)

자세한 내용은 `docs/component-structure.md` 참고

## 🎨 컴포넌트

### SetupView
- QuestionItem: 질문 입력 + 삭제
- AnswererItem: 사진 업로드 + 이름 입력 + 삭제
- 게임 시작 버튼 (유효성 검사)

### GameView
- QuestionCard: 번호 표시 카드 (선택/비활성화 상태)
- 남은 질문 개수 표시
- 게임 리셋 버튼

### ResultView
- 선택된 질문 표시
- AnswererProfile: 사진 + 이름 (2명)
- 다음 카드 선택 버튼

## 📊 상태 구조

```javascript
{
  questions: string[],                    // 질문 목록
  answerers: Array<{name, photo}>,        // 답변자 목록
  usedQuestionIndexes: Set<number>,       // 사용된 질문 인덱스
  currentView: 'setup' | 'game' | 'result',
  currentQuestion: {text, index},         // 현재 선택 질문
  currentAnswerers: Array<answerer>       // 현재 매칭 답변자 2명
}
```

## 🔄 데이터 흐름

```
설정 페이지 (질문 + 답변자 입력)
    ↓ "게임 시작" 버튼
    ↓
게임 화면 (카드 선택)
    ↓ 카드 클릭
    ↓
결과 화면 (질문 + 랜덤 답변자 2명)
    ↓ "다음 카드" 버튼
    ↓
게임 화면 (반복) ← 모든 카드 선택 시 게임 완료
```

## 📝 스타일링

- **CSS**: Tailwind CSS v4 (utility-first)
- **토큰**: `tokens/dist/tokens.css` 자동 생성
- **커스텀**: `src/styles/main.css` 에서 확장

### Tailwind 설정

`tailwind.config.js` 에서 토큰 기반 커스텀 색상 정의:

```javascript
colors: {
  'primary': 'var(--content-primary)',
  'btn-primary': 'var(--surface-primary)',
  // ...
}
```

## 🧪 테스트

현재 테스트 프레임워크는 설정되지 않음. 수동 테스트 진행:

1. 설정 페이지: 질문 추가/삭제, 답변자 추가/삭제, 유효성 검사
2. 게임 화면: 카드 선택, 비활성화 상태 확인
3. 결과 화면: 질문 표시, 랜덤 답변자 매칭 확인
4. 게임 리셋: 상태 초기화 및 설정 페이지 반환

## 🚧 추후 확장 가능 항목

- [ ] LocalStorage: 게임 진행 상태 저장/복원
- [ ] 다크모드: `colors/dark/*` 토큰 활용
- [ ] 애니메이션: 카드 선택 시 전환 효과
- [ ] 음향 효과: 게임 진행 중 사운드
- [ ] 공유 기능: 결과 스크린샷/링크 공유
- [ ] 테스트: Vitest + jsdom

## 📄 문서

- **서비스 기획**: `docs/service-spec.md`
- **컴포넌트 & 기술**: `docs/component-structure.md`
- **디자인 토큰**: `docs/figma-design-tokens-structure.md`

## 🎯 개발 팁

### 상태 변경 감시

```javascript
import { onStateChange } from './state.js'

onStateChange('currentView', (newView) => {
  console.log('뷰 변경:', newView)
})
```

### 새로운 뷰 추가

1. `src/views/newview.js` 생성
2. `renderNewView()` 함수 정의
3. `src/main.js` 의 `switchView()` 에 케이스 추가

## 📞 문의

이 프로젝트는 Beernight 게임 개발을 위해 만들어졌습니다.
추가 기능이나 수정 사항은 `docs/` 폴더의 스펙 문서를 참고하세요.

---

**Happy Gaming! 🎉**
