import { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';
import { GINA_DOCUMENT_TEXT } from '../constants/ginaDocumentText';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

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


export const useAIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    setError(null);
    setIsLoading(true);

    const newUserMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: userMessage }],
    };
    
    const historyForAPI = [...messages, newUserMessage];

    // Add user message and a temporary model message for the UI
    setMessages(prev => [...prev, newUserMessage, { role: 'model', parts: [{ text: '' }] }]);

    try {
      const stream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: historyForAPI,
        config: {
          systemInstruction: systemInstructionText,
        },
      });

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === 'model') {
            lastMessage.parts[0].text += chunkText;
          }
          return newMessages;
        });
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error("AI Assistant Error:", errorMessage);
      setError(`Error communicating with the AI service. Please check your API key and network connection. Details: ${errorMessage}`);
      setMessages(prev => [...prev.slice(0, -1)]); // Remove the empty model message
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, isLoading, error, sendMessage };
};