import { MessageSquare, Send, Search, User } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useState } from "react";

export function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(1);

  const conversations = [
    {
      id: 1,
      name: "Grand Ballroom - John Smith",
      lastMessage: "We can accommodate your request for the extra setup time.",
      time: "10:30 AM",
      unread: 2,
    },
    {
      id: 2,
      name: "Gourmet Delights Catering",
      lastMessage: "Here's the updated menu for your approval.",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Sarah Johnson - Wedding Planner",
      lastMessage: "The flower arrangements look perfect!",
      time: "2 days ago",
      unread: 1,
    },
    {
      id: 4,
      name: "Convention Center Team",
      lastMessage: "Your event is confirmed for June 10th.",
      time: "Mar 20",
      unread: 0,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "John Smith",
      content: "Hello! I received your inquiry about the Grand Ballroom for April 15th.",
      time: "10:15 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Yes, we need the space from 5 PM to midnight. Is that available?",
      time: "10:20 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "John Smith",
      content: "Absolutely! The ballroom is available. Would you also need setup time before 5 PM?",
      time: "10:25 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content: "Yes, we'd need access from 3 PM for setup. Is that possible?",
      time: "10:28 AM",
      isOwn: true,
    },
    {
      id: 5,
      sender: "John Smith",
      content: "We can accommodate your request for the extra setup time.",
      time: "10:30 AM",
      isOwn: false,
    },
  ];

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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <Badge className="ml-2 shrink-0">{conversation.unread}</Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Thread */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{conversations[0].name}</h3>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
