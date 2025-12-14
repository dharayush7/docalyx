import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { Clock, LogIn, MessageSquare, Sparkles } from "lucide-react";

export default function LoginComp({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center space-y-8 animate-[fadeIn_0.6s_ease-out]">
        {/* Logo Animation */}
        <div className="flex justify-center">
          <div
            className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-300 animate-[float_3s_ease-in-out_infinite] ${
              isDark
                ? "bg-linear-to-br from-purple-500 to-pink-500 shadow-2xl shadow-purple-500/50"
                : "bg-linear-to-br from-blue-500 to-purple-500 shadow-2xl shadow-purple-500/30"
            }`}
          >
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>
        {/* Welcome Text */}
        <div className="space-y-4">
          <h2
            className={`text-4xl font-bold transition-colors ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome to AI Chat
          </h2>
          <p
            className={`text-lg transition-colors ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Your intelligent companion for conversations, ideas, and
            problem-solving
          </p>
        </div>
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
          {[
            { icon: MessageSquare, text: "Natural Conversations" },
            { icon: Sparkles, text: "AI Powered" },
            { icon: Clock, text: "Chat History" },
          ].map((feature, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-gray-800/50 text-gray-300"
                  : "bg-white/60 text-gray-700 shadow-lg"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon
                className={`w-8 h-8 mx-auto mb-2 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <p className="text-sm font-medium">{feature.text}</p>
            </div>
          ))}
        </div>
        {/* Login Button */}
        <LoginLink postLoginRedirectURL="/auth/callback">
          <button
            className={`group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              isDark
                ? "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                : "bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
            }`}
          >
            <span className="relative z-10 flex items-center gap-3">
              <LogIn className="w-5 h-5" />
              Sign In to Continue
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </LoginLink>
      </div>
    </div>
  );
}
