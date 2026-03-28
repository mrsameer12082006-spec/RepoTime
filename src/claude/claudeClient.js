/**
 * Calls the Groq API using https module (works reliably on Windows + Node v25)
 */
const https = require("https");
 
function httpsPost(url, headers, body) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: "POST",
      headers: {
        ...headers,
        "Content-Length": Buffer.byteLength(body),
      },
    };
 
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });
 
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}
 
async function callClaude(systemPrompt, userPrompt) {
  const apiKey = process.env.GROQ_API_KEY;
 
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not set. Copy .env.example to .env and add your Groq API key.\nGet a free key at: https://console.groq.com"
    );
  }
 
  const body = JSON.stringify({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1500,
    temperature: 0.4,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });
 
  const result = await httpsPost(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body
  );
 
  if (result.status !== 200) {
    throw new Error(`Groq API error ${result.status}: ${result.body}`);
  }
 
  const data = JSON.parse(result.body);
 
  try {
    return data.choices[0].message.content;
  } catch (err) {
    throw new Error("Unexpected Groq response format: " + JSON.stringify(data));
  }
}
 
module.exports = { callClaude };
 