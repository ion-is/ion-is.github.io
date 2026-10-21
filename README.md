# 이창연 개인 홈페이지

퍼실리테이터 15년 경력과 유튜브 채널 Ion-is 활동을 함께 소개하는 한 페이지짜리 정적 홈페이지입니다.
`index.html`을 더블클릭하면 브라우저에서 바로 볼 수 있습니다.

## 파일 구성
- `index.html`: 페이지 내용
- `css/style.css`: 디자인 (색은 맨 위 `:root`에서 바꿈)
- `js/main.js`: 쇼츠 목록, 모바일 메뉴
- `assets/`: 이미지

## 직접 채워야 할 내용
`index.html`에서 `수정:` 주석이 달린 곳을 찾아 바꾸세요.

1. **조회수 인기 영상 4개**: 페이지가 열릴 때마다 YouTube Data API로 채널 영상의 조회수를 불러와 높은 순으로 4개를 보여줍니다.
   `js/main.js` 맨 위의 `YOUTUBE_API_KEY`에 API 키를 넣고, `CHANNEL_HANDLE`이 채널 핸들과 맞는지 확인하세요.
   - **API 키 발급**: https://console.cloud.google.com 에서 프로젝트 만들기 → "YouTube Data API v3" 사용 설정 → 사용자 인증 정보 → API 키 만들기
   - **키 보호(꼭 하세요)**: API 키는 홈페이지 소스에 그대로 보입니다. 키 설정에서 "애플리케이션 제한사항 → HTTP 리퍼러"에 홈페이지 주소(예: `https://내사이트.netlify.app/*`)를 등록하고, "API 제한사항"을 YouTube Data API v3로만 설정하세요.
   - 방문 한 번에 쓰는 할당량은 약 3단위입니다. 무료 할당량은 하루 10,000단위입니다.
   - 리퍼러 제한을 걸면 파일을 더블클릭해 열었을 때(`file://`)는 불러오지 못하고, 그때는 아래 `SHORTS` 목록이 보입니다.
   - 예비 목록: 키가 없거나 불러오기에 실패하면 `SHORTS` 배열의 영상을 보여줍니다.
     `https://www.youtube.com/shorts/AbCdEfGhIjK` → `'AbCdEfGhIjK'`
2. **유튜브 채널 주소**: 지금은 `https://www.youtube.com/@Ion-is`로 넣어 두었습니다. 실제 주소인지 확인하세요.
3. **인스타그램 등 SNS 주소**
4. **퍼실리테이션 이력**: 타임라인의 연도와 내용을 실제 이력으로 바꿉니다.
5. **이미지**: `assets/avatar.svg`, `assets/profile.svg`를 실제 이미지로 교체합니다.
   PNG/JPG를 쓰면 `index.html`에서 파일 이름도 함께 바꿔주세요.

## 무료로 공개하기
- **Netlify Drop**: https://app.netlify.com/drop 에 `mypage` 폴더를 끌어다 놓으면 바로 주소가 생깁니다.
- **GitHub Pages**: 저장소에 파일을 올리고 Settings → Pages에서 `main` 브랜치를 선택합니다.
