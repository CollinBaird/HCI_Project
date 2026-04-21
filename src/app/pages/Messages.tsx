import { MessageSquare, Send, Search, User, Building2, ChefHat } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  getStoredConversations,
  addMessageToConversation,
  markConversationRead,
  getConversationsUpdatedEventName,
  type Conversation,
} from "../eventStore";

function ConversationIcon({ type }: { type: Conversation["type"] }) {
  if (type === "catering") return <ChefHat className="w-6 h-6 text-gray-400" />;
  return <Building2 className="w-6 h-6 text-gray-400" />;
}

export function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const refresh = useCallback(() => {
    setConversations(getStoredConversations());
  }, []);

  useEffect(() => {
    refresh();
    const eventName = getConversationsUpdatedEventName();
    window.addEventListener(eventName, refresh);
    return () => window.removeEventListener(eventName, refresh);
  }, [refresh]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedId, conversations]);

  const handleSelectConversation = (id: number) => {
    setSelectedId(id);
    markConversationRead(id);
    setDraft("");
  };

  const handleSend = () => {
    if (!draft.trim() || selectedId === null) return;
    addMessageToConversation(selectedId, draft.trim());
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = conversations.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="p-8 h-full">
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)]">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with venues and vendors</p>
        </div>

        <Card className="h-[calc(100%-5rem)] flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12 text-gray-400">
                  <MessageSquare className="w-10 h-10 mb-3 opacity-40" />
                  <p className="text-sm font-medium">No conversations yet</p>
                  <p className="text-xs mt-1">Book a venue or catering to start a conversation</p>
                </div>
              ) : (
                filtered.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv.id)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
                      selectedId === conv.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                      <ConversationIcon type={conv.type} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{conv.name}</h3>
                        <span className="text-xs text-gray-500 shrink-0 ml-1">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <Badge className="ml-2 shrink-0">{conv.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Message Thread */}
          <div className="flex-1 flex flex-col">
            {selected ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <ConversationIcon type={selected.type} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selected.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{selected.type} provider</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selected.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      {!message.isOwn && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mr-2 mt-1 shrink-0">
                          <User className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                      <div
                        className={`max-w-md px-4 py-3 rounded-2xl ${
                          message.isOwn
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-900 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isOwn ? "text-blue-200" : "text-gray-400"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Message ${selected.name}...`}
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!draft.trim()}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <MessageSquare className="w-14 h-14 mb-4 opacity-30" />
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm mt-1">Choose a booking conversation from the left</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
