const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// 쇼츠 생성 API
app.post('/api/generate-shorts', (req, res) => {
    const { prompt } = req.body;
    
    // functions 폴더의 파이썬 워크플로우 실행
    // Wan 2.1 -> XTTS -> Whisper -> Real-ESRGAN 통합 스크립트
    exec(`python3 ./functions/video_pipeline.py --prompt "${prompt}"`, (err, stdout, stderr) => {
        if (err) return res.status(500).json({ success: false });
        
        // 결과 파일을 GitHub LFS 폴더로 이동 후 URL 반환
        const videoUrl = stdout.trim();
        res.json({ success: true, videoUrl });
    });
});

// 트렌드 분석 API (간이 구현)
app.get('/api/trends', (req, res) => {
    // 유튜브 API 또는 크롤링 데이터 반환
    res.json([{kw: "AI 수익화", score: 98}, {kw: "Wan 2.1 사용법", score: 85}]);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
