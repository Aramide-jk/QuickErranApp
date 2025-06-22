import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Paperclip,
  Phone,
  MoreVertical,
  Menu,
} from "lucide-react";
import DesktopSidebar from "./DesktopSidebar";
import profileImg from "/assets/img-src/profile.jpg";
//
const ChatScreen = ({ user }) => {
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I've accepted your request to pick up groceries from Shoprite.",
      sender: "runner",
      time: "10:30 AM",
      avatar: profileImg,
    },
    {
      id: 2,
      text: "Great! Please make sure to get the items on my list. I've sent ₦5,000 for the groceries.",
      sender: "user",
      time: "10:32 AM",
    },
    {
      id: 3,
      text: "Perfect! I'm heading to the store now. I'll send you photos of the items before purchasing.",
      sender: "runner",
      time: "10:35 AM",
      avatar: profileImg,
    },
    {
      id: 4,
      text: "Thank you! That would be great.",
      sender: "user",
      time: "10:36 AM",
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: profileImg,
      };

      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="desktop-layout">
      {/* Desktop Sidebar */}
      <DesktopSidebar user={user} currentPage="messages" />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setSidebarOpen(false)}>
          <div
            className="w-80 bg-white h-full"
            onClick={(e) => e.stopPropagation()}>
            <DesktopSidebar
              user={user}
              currentPage="messages"
              mobile
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="container-responsive  desktop-main">
        <div className="min-h-screen bg-white flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-300 bg-white">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 mr-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <Link to="/home" className="lg:hidden p-2">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>

              <div className="flex items-center ml-2 lg:ml-0">
                <img
                  src={profileImg}
                  alt="Runner"
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full mr-3"
                />
                <div>
                  <h1 className="text-lg lg:text-xl font-semibold text-text-dark">
                    Aramide Jamiu
                  </h1>
                  <p className="text-sm text-green-600">Active • On the way</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Phone className="w-5 h-5 text-green-900" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4  py-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-primary text-white mt-2"
                        : "bg-white border border-gray-200 shadow-sm"
                    }`}>
                    {msg.sender === "runner" && (
                      <div className="flex items-center mb-2">
                        <img
                          src={msg.avatar}
                          alt="Runner"
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-xs font-medium text-gray-800">
                          Aramide
                        </span>
                      </div>
                    )}
                    <p
                      className={` ${
                        msg.sender === "user" ? "text-white" : "text-gray-800"
                      }`}>
                      {msg.text}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        msg.sender === "user"
                          ? "text-white/70"
                          : "text-gray-500"
                      }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 lg:p-6 border-t  border-gray-300 bg-white">
            <div className="max-w-4xl mx-auto">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center space-x-3">
                <button
                  type="button"
                  className="p-3 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-900 focus:border-transparent"
                />

                <button
                  type="submit"
                  className="p-3 bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
