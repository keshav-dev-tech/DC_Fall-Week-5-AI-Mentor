import { useState, useRef, useEffect } from "react";
import { useGemini } from "./hooks/useGemini";

export default function App() {
  const { askGemini, clearMemory } = useGemini();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message immediately
    setHistory((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const reply = await askGemini(userMessage);
      setHistory((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      setHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to clear the conversation?")) {
      clearMemory();
      setHistory([]);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          AI Career Mentor
        </h1>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          Clear Chat
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {history.length === 0 && (
            <div className="text-center mt-20">
              <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                How can I help you today?
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Ask me anything about your career, goals, or professional development.
              </p>
            </div>
          )}

          {history.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  AI
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                </div>
              </div>
              {message.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-semibold text-sm">
                  You
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                AI
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message AI Career Mentor..."
                rows={1}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32 overflow-y-auto"
                style={{
                  minHeight: "52px",
                  height: "auto",
                }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl transition-colors flex-shrink-0"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
