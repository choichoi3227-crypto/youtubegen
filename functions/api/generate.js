export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();

  // GPU 서버(ComfyUI)로 작업 요청 전달
  const response = await fetch(`${env.AI_SERVER_URL}/api/generate-shorts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: body.prompt,
      voice: body.voice || "ko-KR-Standard-A"
    })
  });

  const result = await response.json();
  
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" }
  });
}
