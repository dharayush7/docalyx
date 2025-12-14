"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Moon, Sun, Sparkles, User, Bot } from "lucide-react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState("dark");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content:
          "This is a demo response. In your actual app, you'd integrate with an AI API here!",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        isDark
          ? "bg-linear-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-linear-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      {/* Header */}
      <header
        className={`backdrop-blur-xl border-b transition-all duration-300 ${
          isDark
            ? "bg-gray-900/50 border-purple-500/20"
            : "bg-white/50 border-purple-200"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? "bg-linear-to-br from-purple-500 to-pink-500"
                  : "bg-linear-to-br from-blue-500 to-purple-500"
              }`}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1
                className={`text-xl font-bold transition-colors ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                AI Chat
              </h1>
              <p
                className={`text-sm transition-colors ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Powered by Next.js
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
              isDark
                ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-[slideIn_0.3s_ease-out] ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                  message.type === "ai"
                    ? isDark
                      ? "bg-linear-to-br from-purple-500 to-pink-500"
                      : "bg-linear-to-br from-blue-500 to-purple-500"
                    : isDark
                    ? "bg-linear-to-br from-blue-500 to-cyan-500"
                    : "bg-linear-to-br from-pink-500 to-orange-500"
                }`}
              >
                {message.type === "ai" ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[70%] rounded-2xl px-5 py-3 transition-all duration-300 ${
                  message.type === "ai"
                    ? isDark
                      ? "bg-gray-800/80 text-gray-100 backdrop-blur-sm"
                      : "bg-white/80 text-gray-900 backdrop-blur-sm shadow-lg"
                    : isDark
                    ? "bg-linear-to-br from-purple-600 to-pink-600 text-white"
                    : "bg-linear-to-br from-blue-600 to-purple-600 text-white"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-[slideIn_0.3s_ease-out]">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? "bg-linear-to-br from-purple-500 to-pink-500"
                    : "bg-linear-to-br from-blue-500 to-purple-500"
                }`}
              >
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div
                className={`rounded-2xl px-5 py-3 transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800/80 backdrop-blur-sm"
                    : "bg-white/80 backdrop-blur-sm shadow-lg"
                }`}
              >
                <div className="flex gap-1">
                  <span
                    className={`w-2 h-2 rounded-full animate-bounce ${
                      isDark ? "bg-purple-400" : "bg-purple-600"
                    }`}
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className={`w-2 h-2 rounded-full animate-bounce ${
                      isDark ? "bg-purple-400" : "bg-purple-600"
                    }`}
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className={`w-2 h-2 rounded-full animate-bounce ${
                      isDark ? "bg-purple-400" : "bg-purple-600"
                    }`}
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div
        className={`backdrop-blur-xl border-t transition-all duration-300 ${
          isDark
            ? "bg-gray-900/50 border-purple-500/20"
            : "bg-white/50 border-purple-200"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div
            className={`flex gap-3 rounded-2xl p-2 transition-all duration-300 ${
              isDark ? "bg-gray-800/50" : "bg-white/80 shadow-lg"
            }`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className={`flex-1 bg-transparent outline-none px-4 py-2 transition-colors ${
                isDark
                  ? "text-white placeholder-gray-500"
                  : "text-gray-900 placeholder-gray-400"
              }`}
            />
            <button
              title="send"
              onClick={handleSend}
              disabled={!input.trim()}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                isDark
                  ? "bg-linear-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  : "bg-linear-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
              }`}
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
