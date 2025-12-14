"use client";
import { Moon, Sparkles, Sun } from "lucide-react";
import { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import ChatList from "./ChatList";
import LoginComp from "./LoginComp";

export default function Main() {
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";

  const { isAuthenticated } = useKindeBrowserClient();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-linear-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-linear-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      <header
        className={`backdrop-blur-xl border-b transition-all duration-300 sticky top-0 z-50 ${
          isDark
            ? "bg-gray-900/50 border-purple-500/20"
            : "bg-white/50 border-purple-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? "bg-linear-to-br from-purple-500 to-pink-500"
                  : "bg-linear-to-br from-blue-500 to-purple-500"
              }`}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1
                className={`text-2xl font-bold transition-colors ${
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
                Your intelligent assistant
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        {isAuthenticated ? (
          <ChatList isDark={isDark} />
        ) : (
          <LoginComp isDark={isDark} />
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </main>
  );
}
