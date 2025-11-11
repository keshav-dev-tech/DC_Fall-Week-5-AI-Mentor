import { GoogleGenerativeAI } from "@google/generative-ai";
import { basePrompt } from "../prompts/basePrompt";
import { customPrompt } from "../prompts/customPrompt";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  alert("⚠️ Gemini API key missing! Add it to your environment variables.");
}

export const useGemini = () => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const storageKey = "chatMemory";

  const loadMemoryFromStorage = () => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn("Failed to read chat memory from storage.", error);
      return [];
    }
  };

  const persistMemoryToStorage = (chatMemory) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(chatMemory));
    } catch (error) {
      console.warn("Failed to persist chat memory to storage.", error);
    }
  };

  let memory = loadMemoryFromStorage();

  const askGemini = async (userInput) => {
    if (!apiKey) return "Missing API key.";

    // Build full conversation text from existing memory, including current user input
    const conversation = memory
      .map((m) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`)
      .join("\n");

    const fullPrompt = `
${basePrompt.trim()}

${customPrompt.trim()}

Here is our ongoing conversation:
${conversation}
User: ${userInput}
`;

    try {
      const result = await model.generateContent(fullPrompt);
      const reply = result.response.text();

      // Only add to memory after successful response
      memory.push({ role: "user", content: userInput });
      memory.push({ role: "model", content: reply });
      persistMemoryToStorage(memory);

      return reply;
    } catch (error) {
      console.error("Gemini API Error:", error);
      
      // Extract the actual error message from various possible error structures
      let errorMessage = "Error fetching response.";
      
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.error?.message) {
        errorMessage = error.response.error.message;
      } else if (error?.error?.message) {
        errorMessage = error.error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      
      // Don't add error messages to memory - they're not part of the conversation
      // Also don't add the user message since the request failed
      return errorMessage;
    }
  };

  const clearMemory = () => {
    memory = [];
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.warn("Failed to clear chat memory from storage.", error);
    }
  };

  return { askGemini, clearMemory };
};
