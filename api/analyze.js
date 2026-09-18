import { GoogleGenAI } from '@google/genai';
import { 
  FOURMULA_STEPS_SYSTEM_INSTRUCTION, 
  FOURMULA_STEPS_USER_PROMPT, 
  FOURMULA_STEPS_RESPONSE_SCHEMA 
} from '../src/prompts/fourmulaStepsPrompt.js';

export default async function handler(req, res) {
  // CORSヘッダー
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on server' });
  }

  try {
    const { mode, text, imageBase64, imageMimeType } = req.body || {};

    const ai = new GoogleGenAI({ apiKey });

    let contents = [];
    if (mode === 'image' && imageBase64) {
      contents = [
        FOURMULA_STEPS_USER_PROMPT,
        {
          inlineData: {
            data: imageBase64,
            mimeType: imageMimeType || 'image/jpeg'
          }
        }
      ];
    } else if (text && text.trim()) {
      contents = [
        `以下の数学問題について解説を作成してください：\n\n${text.trim()}\n\n${FOURMULA_STEPS_USER_PROMPT}`
      ];
    } else {
      return res.status(400).json({ error: '問題の画像またはテキストを指定してください。' });
    }

    const startTime = Date.now();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: FOURMULA_STEPS_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: FOURMULA_STEPS_RESPONSE_SCHEMA,
        temperature: 0.2
      }
    });
    const latencyMs = Date.now() - startTime;

    const rawText = response.text;
    const usageMetadata = response.usageMetadata || {};
    const promptTokens = usageMetadata.promptTokenCount || 0;
    const candidatesTokens = usageMetadata.candidatesTokenCount || 0;
    const totalTokens = usageMetadata.totalTokenCount || (promptTokens + candidatesTokens);

    let parsedData = null;
    try {
      parsedData = JSON.parse(rawText);
    } catch (parseErr) {
      console.warn('Direct JSON parse failed, returning raw text:', parseErr.message);
    }

    return res.status(200).json({
      success: true,
      data: parsedData,
      rawText: parsedData ? undefined : rawText,
      usage: {
        promptTokens,
        candidatesTokens,
        totalTokens,
        latencyMs
      }
    });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({
      error: err.message || 'AI解析処理中にエラーが発生しました。'
    });
  }
}
