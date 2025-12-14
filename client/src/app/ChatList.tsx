import { Clock, MessageSquare, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";

export default function ChatList({ isDark }: { isDark: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "Website Design Ideas",
      preview: "Can you help me with modern website design...",
      date: "2 hours ago",
      messages: 15,
    },
    {
      id: 2,
      title: "React Best Practices",
      preview: "What are the best practices for React...",
      date: "5 hours ago",
      messages: 23,
    },
    {
      id: 3,
      title: "API Integration Help",
      preview: "I need help integrating a REST API...",
      date: "Yesterday",
      messages: 8,
    },
    {
      id: 4,
      title: "Database Schema Design",
      preview: "How should I structure my database...",
      date: "2 days ago",
      messages: 12,
    },
    {
      id: 5,
      title: "UI/UX Feedback",
      preview: "Can you review my app design...",
      date: "3 days ago",
      messages: 19,
    },
  ]);

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
      {/* New Chat Button */}
      <button
        className={`w-full p-6 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group ${
          isDark
            ? "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
            : "bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
        }`}
      >
        <span className="flex items-center justify-center gap-3 text-lg">
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          Start New Chat
        </span>
      </button>

      {/* Search Bar */}
      <div
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
          isDark
            ? "bg-gray-800/50 backdrop-blur-sm"
            : "bg-white/80 backdrop-blur-sm shadow-lg"
        }`}
      >
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search conversations..."
          className={`w-full pl-12 pr-4 py-4 bg-transparent outline-none transition-colors ${
            isDark
              ? "text-white placeholder-gray-500"
              : "text-gray-900 placeholder-gray-400"
          }`}
        />
      </div>

      {/* Chat List Header */}
      <div className="flex items-center justify-between">
        <h2
          className={`text-xl font-bold transition-colors ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Recent Conversations
        </h2>
        <span
          className={`text-sm transition-colors ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {filteredChats.length} chats
        </span>
      </div>

      {/* Chat Cards */}
      <div className="grid gap-4">
        {filteredChats.map((chat, index) => (
          <div
            key={chat.id}
            className={`group relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
              isDark
                ? "bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70"
                : "bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isDark
                        ? "bg-linear-to-br from-purple-500 to-pink-500"
                        : "bg-linear-to-br from-blue-500 to-purple-500"
                    }`}
                  >
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h3
                    className={`text-lg font-semibold truncate transition-colors ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {chat.title}
                  </h3>
                </div>
                <p
                  className={`text-sm mb-3 line-clamp-2 transition-colors ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {chat.preview}
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <span
                    className={`flex items-center gap-1 transition-colors ${
                      isDark ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    {chat.date}
                  </span>
                  <span
                    className={`transition-colors ${
                      isDark ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    {chat.messages} messages
                  </span>
                </div>
              </div>

              {/* Delete Button */}
              <button
                title="Delete Chat"
                onClick={(e) => {
                  e.stopPropagation();
                  //   deleteChat(chat.id);
                }}
                className={`opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    : "bg-red-100 text-red-600 hover:bg-red-200"
                }`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Hover Effect */}
            <div
              className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                isDark
                  ? "bg-linear-to-r from-purple-500/5 to-pink-500/5"
                  : "bg-linear-to-r from-blue-500/5 to-purple-500/5"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredChats.length === 0 && (
        <div className="text-center py-16">
          <MessageSquare
            className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? "text-gray-700" : "text-gray-300"
            }`}
          />
          <p
            className={`text-lg transition-colors ${
              isDark ? "text-gray-500" : "text-gray-600"
            }`}
          >
            No conversations found
          </p>
        </div>
      )}
    </div>
  );
}
