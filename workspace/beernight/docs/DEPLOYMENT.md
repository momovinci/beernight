# Vercel 배포 가이드

Beernight를 Vercel에 배포하고 도메인을 연결하는 방법입니다.

---

## 📋 사전 준비

- [GitHub](https://github.com) 계정
- [Vercel](https://vercel.com) 계정 (무료)
- 로컬에서 git 커밋 완료

---

## 방법 1️⃣: GitHub 연동 (추천 - 자동 배포)

### 1단계: GitHub에 리포지토리 푸시

```bash
# GitHub에서 새 리포지토리 생성 (예: beernight)
# https://github.com/new

# 로컬 저장소에서
git remote add origin https://github.com/{username}/beernight.git
git branch -M main
git push -u origin main
```

### 2단계: Vercel에서 GitHub 연동

1. https://vercel.com/dashboard 접속
2. **"Add New"** → **"Project"** 클릭
3. **"Import Git Repository"** 선택
4. GitHub 연동 요청 → 승인
5. `beernight` 리포지토리 선택

### 3단계: 배포 설정

**Import project 페이지에서:**

| 항목 | 값 |
|------|-----|
| **Project Name** | beernight (또는 원하는 이름) |
| **Framework Preset** | "Vite" 선택 |
| **Root Directory** | `./` (기본값) |
| **Build Command** | `npm run build` (자동 인식) |
| **Output Directory** | `dist` (자동 인식) |
| **Install Command** | `npm install` (자동 인식) |

**Environment Variables** (필요시):
- 없어도 됩니다 (현재 프로젝트는 env 필요 없음)

### 4단계: 배포 시작

**"Deploy"** 버튼 클릭 → 자동 배포 시작

```
✓ 배포 완료 (보통 1-2분)
예: https://beernight-{id}.vercel.app
```

---

## 방법 2️⃣: Vercel CLI (로컬 배포)

### 1단계: Vercel CLI 설치

```bash
npm install -g vercel
```

### 2단계: 로그인

```bash
vercel login
```

브라우저가 열리면 Vercel 계정으로 로그인

### 3단계: 배포

```bash
cd /Users/chanyang/workspace/beernight
vercel
```

**프롬프트 응답:**
```
? Set up and deploy "~/workspace/beernight"? [Y/n] → Y
? Which scope do you want to deploy to? → Personal Namespace
? Link to existing project? [y/N] → N (처음이면)
? What's your project's name? → beernight
? In which directory is your code located? → ./
? Want to modify these settings? [y/N] → N
```

배포 완료! 🎉

```
✓ Deployed to https://beernight-{id}.vercel.app
```

---

## 🌐 도메인 연결

### Vercel 도메인 (무료)

1. https://vercel.com/dashboard → beernight 프로젝트 선택
2. **"Settings"** → **"Domains"**
3. **"Add"** 클릭
4. 도메인 입력 (예: `beernight.vercel.app`)
5. **"Add Domain"** 클릭

✅ 완료! (보통 즉시 적용)

### 커스텀 도메인 (본인 소유)

#### 도메인 구매

- [Namecheap](https://www.namecheap.com)
- [GoDaddy](https://www.godaddy.com)
- [Google Domains](https://domains.google)
- 기타 도메인 레지스트라

#### Vercel에서 도메인 연결

**1. Vercel 설정**
- https://vercel.com/dashboard → 프로젝트 선택
- **"Settings"** → **"Domains"**
- **"Add"** → 도메인 입력 (예: `mybeernight.com`)
- **"Add Domain"** 클릭

**2. DNS 레코드 설정 (도메인 레지스트라)**

Vercel에서 보여주는 DNS 레코드를 복사:
```
Type: CNAME
Name: (또는 www)
Value: cname.vercel-dns.com
```

도메인 레지스트라 DNS 관리에서:
1. DNS 레코드 추가
2. Vercel 정보 입력
3. 저장

**3. 대기**

DNS 전파: 5분 ~ 48시간

```bash
# 설정 확인
nslookup mybeernight.com

# 또는
dig mybeernight.com
```

✅ https://mybeernight.com 에 접속 가능!

---

## 🔄 자동 배포 (GitHub 연동 시)

GitHub에 푸시하면 자동으로 Vercel에 배포됩니다!

```bash
# 로컬에서 변경
echo "// 수정" >> src/state.js

# 커밋 & 푸시
git add .
git commit -m "fix: 상태 로직 개선"
git push origin main

# Vercel 자동 배포 시작 ✨
```

**배포 상태 확인:**
https://vercel.com/dashboard → b프로젝트 → Deployments

---

## 🧪 배포 후 확인

1. **앱 접속**
   ```
   https://beernight-{id}.vercel.app
   ```

2. **기능 테스트**
   - 설정 페이지 동작
   - 게임 진행
   - 결과 표시

3. **성능 확인**
   - Vercel Dashboard → Analytics
   - 로딩 시간, 오류 모니터링

---

## 🚨 문제 해결

### 배포 실패

**Vercel 로그 확인:**
```
https://vercel.com/dashboard → Deployments → 실패한 배포 클릭
```

**일반적인 원인:**
- `npm install` 실패 → `package-lock.json` 확인
- 빌드 오류 → `npm run build` 로컬 테스트
- 환경 변수 누락 → Environment Variables 확인

### 사이트가 보이지 않음

1. DNS 전파 대기 (최대 48시간)
2. 브라우저 캐시 지우기
3. 다른 브라우저 시도
4. Vercel 대시보드에서 도메인 상태 확인

### 리빌드

```bash
# Vercel 대시보드에서
Deployments → 배포 선택 → "Redeploy" 클릭
```

또는 GitHub에 푸시:
```bash
git commit --allow-empty -m "trigger rebuild"
git push origin main
```

---

## 📊 모니터링

### 실시간 로그

```bash
vercel logs [url]
```

### 대시보드

- **Overview**: 배포 현황
- **Deployments**: 배포 이력
- **Analytics**: 성능 & 방문
- **Settings**: 도메인, 환경 변수

---

## 🎯 체크리스트

배포 전 확인:

- [ ] `npm run build` 성공
- [ ] `dist/` 폴더 생성됨
- [ ] GitHub에 커밋 완료
- [ ] `.gitignore`에 `node_modules`, `dist` 포함
- [ ] `package.json`에 build 스크립트 있음
- [ ] Vercel 계정 생성

배포 후 확인:

- [ ] 앱 접속 가능
- [ ] 모든 기능 동작
- [ ] 이미지/파일 로딩됨
- [ ] 모바일 반응형 확인
- [ ] 도메인 설정 완료

---

## 📚 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Vite + Vercel 배포](https://vite.dev/guide/ssr.html#setting-up-the-dev-server)
- [DNS 레코드 가이드](https://vercel.com/docs/concepts/projects/custom-domains)

---

## 🎉 완료!

축하합니다! Beernight가 이제 인터넷에 공개되었습니다!

친구들과 URL을 공유하고 게임을 즐기세요! 🍺
