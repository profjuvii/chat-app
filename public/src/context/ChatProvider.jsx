import { useState, useCallback } from "react";
import { ChatContext } from "./ChatContext";

export function ChatProvider({ children }) {
  const [activeUser, setActiveUser] = useState({ name: "", online: false });
  const [messages, setMessages] = useState([]);

  const selectUser = useCallback((user) => {
    setActiveUser({
      name: user.name,
      online: user.online ?? false,
    });
    setMessages(user.messages || []);
  }, []);

  const sendMessage = useCallback(({ who = "me", text }) => {
    if (!text?.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), who, text: text.trim() },
    ]);
  }, []);

  return (
    <ChatContext.Provider
      value={{ activeUser, messages, selectUser, sendMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
}
