
import { GoogleGenAI } from '@google/genai';
import { GINA_DOCUMENT_TEXT } from '../constants/ginaDocumentText';
import type { ChatMessage } from '../types';

export const config = {
  runtime: 'edge',
};

if (!process.env.API_KEY) {
  // This will cause the function to fail during initialization if the key is missing.
  throw new Error("API_KEY environment variable is not set for the serverless function.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstructionText = `You are an expert AI assistant for healthcare professionals, specializing in the GINA (Global Initiative for Asthma) 2025 report. Your ONLY source of information is the GINA 2025 document provided below in the <document> tags.

Your tasks are:
1.  Answer questions accurately and concisely based *only* on the content of the provided GINA 2025 document.
2.  If the answer is found in the document, provide the answer and, if possible, cite the relevant section or page number (e.g., "according to GINA Box 4-5 on p.77...").
3.  If the user asks a question that cannot be answered using the provided document, you MUST respond with: "I'm sorry, but I cannot answer that question as the information is not found in the GINA 2025 guide provided to me."
4.  Do not answer any questions unrelated to asthma management or the GINA guidelines. Do not use any external knowledge.
5.  Format your responses using Markdown for clarity (e.g., use lists, bold text).

<document>
${GINA_DOCUMENT_TEXT}
</document>
`;

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { history } = await req.json() as { history: ChatMessage[] };

    if (!Array.isArray(history)) {
      return new Response('Invalid request body: "history" must be an array.', { status: 400 });
    }

    const geminiStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: history,
      config: {
        systemInstruction: systemInstructionText,
      },
    });

    const responseStream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            for await (const chunk of geminiStream) {
                const text = chunk.text;
                if(text) {
                    controller.enqueue(encoder.encode(text));
                }
            }
            controller.close();
        }
    });

    return new Response(responseStream, {
      headers: { 
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in AI chat handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'An internal error occurred.';
    return new Response(JSON.stringify({ error: `Server error: ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
