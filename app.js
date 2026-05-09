// 탭 전환 로직
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 로그인/회원가입 요청 (예시)
if(document.getElementById('loginForm')) {
    document.getElementById('loginForm').onsubmit = async (e) => {
        e.preventDefault();
        // server.js의 /api/login 호출 로직
        window.location.href = 'index.html';
    };
}

// AI 쇼츠 생성 요청
async function startShortsGen() {
    const prompt = document.getElementById('shortsPrompt').value;
    const progress = document.getElementById('shortsProgress');
    progress.innerHTML = "⏳ Wan 2.1 영상 생성 중... (업스케일 포함)";
    
    const response = await fetch('/api/generate-shorts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ prompt })
    });
    
    const data = await response.json();
    if(data.success) {
        progress.innerHTML = `✅ 완료! <a href="${data.videoUrl}" target="_blank">영상 보기</a>`;
    }
}

// 채널 브랜딩 생성 (오픈소스 이미지 모델 연동)
async function generateBranding() {
    const topic = document.getElementById('channelTopic').value;
    const result = document.getElementById('brandingResult');
    result.innerHTML = "🪄 AI가 채널명과 아이콘을 설계 중입니다...";
    // ... API 호출 로직
}
