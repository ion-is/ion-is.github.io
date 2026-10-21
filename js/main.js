// ===== 유튜브 설정 =====
// YouTube Data API 키 (발급 방법은 README.md 참고). 비워 두면 아래 SHORTS 목록을 그대로 보여줍니다.
const YOUTUBE_API_KEY = '';
// 채널 핸들 (채널 주소 youtube.com/@핸들 에서 @ 뒤 부분)
const CHANNEL_HANDLE = 'Ion-is';
// 조회수 순으로 보여줄 영상 개수
const TOP_COUNT = 4;

// API 키가 없거나 불러오기에 실패했을 때 보여줄 영상 ID 목록
// 쇼츠 주소 https://www.youtube.com/shorts/AbCdEfGhIjK 에서 마지막 부분(AbCdEfGhIjK)을 넣으세요.
const SHORTS = [
  // 'AbCdEfGhIjK',
];

const API = 'https://www.googleapis.com/youtube/v3';
const MAX_PAGES = 4; // 업로드 목록을 최대 200개(50 x 4)까지 확인

async function api(path, params) {
  const url = new URL(`${API}/${path}`);
  Object.entries({ ...params, key: YOUTUBE_API_KEY }).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API ${res.status}`);
  return res.json();
}

// 채널의 업로드 영상 중 조회수가 높은 순으로 TOP_COUNT개를 가져옵니다.
async function fetchTopVideos() {
  const channel = await api('channels', { part: 'contentDetails', forHandle: `@${CHANNEL_HANDLE}` });
  const uploads = channel.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads) throw new Error('채널을 찾을 수 없습니다');

  const ids = [];
  let pageToken = '';
  for (let i = 0; i < MAX_PAGES; i++) {
    const page = await api('playlistItems', {
      part: 'contentDetails', playlistId: uploads, maxResults: 50,
      ...(pageToken && { pageToken }),
    });
    page.items.forEach((item) => ids.push(item.contentDetails.videoId));
    pageToken = page.nextPageToken;
    if (!pageToken) break;
  }

  const videos = [];
  for (let i = 0; i < ids.length; i += 50) {
    const batch = await api('videos', { part: 'statistics,snippet', id: ids.slice(i, i + 50).join(',') });
    videos.push(...batch.items);
  }

  return videos
    .map((v) => ({ id: v.id, title: v.snippet.title, views: Number(v.statistics.viewCount || 0) }))
    .sort((a, b) => b.views - a.views)
    .slice(0, TOP_COUNT);
}

function shortCard(video, index) {
  const card = document.createElement('figure');
  card.className = 'short-item';

  const frame = document.createElement('div');
  frame.className = 'short';
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.id)}`;
  iframe.title = video.title || `Ion-is 쇼츠 ${index + 1}`;
  iframe.loading = 'lazy';
  iframe.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  frame.appendChild(iframe);
  card.appendChild(frame);

  if (video.views !== undefined) {
    const caption = document.createElement('figcaption');
    caption.innerHTML = `<span class="rank">${index + 1}</span> 조회수 ${video.views.toLocaleString('ko-KR')}회`;
    card.appendChild(caption);
  }
  return card;
}

function placeholderCard() {
  const card = document.createElement('div');
  card.className = 'short short-placeholder';
  card.innerHTML = '<span class="play" aria-hidden="true">▶</span><span>곧 업로드됩니다</span>';
  return card;
}

function fill(grid, videos) {
  grid.replaceChildren();
  videos.forEach((v, i) => grid.appendChild(shortCard(v, i)));
  for (let i = videos.length; i < TOP_COUNT; i++) grid.appendChild(placeholderCard());
}

async function renderShorts() {
  const grid = document.getElementById('shorts-grid');
  if (!grid) return;

  const fallback = SHORTS.slice(0, TOP_COUNT).map((id) => ({ id }));
  fill(grid, fallback);

  if (!YOUTUBE_API_KEY) return;
  try {
    fill(grid, await fetchTopVideos());
  } catch (err) {
    console.warn('인기 영상을 불러오지 못해 기본 목록을 보여줍니다.', err);
  }
}

function setupNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

renderShorts();
setupNav();
