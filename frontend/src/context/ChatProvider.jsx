import { useState } from "react";
import { ChatContext } from "./ChatContext";

export const ChatProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const selectUser = ({ name, online, messages }) => {
    setActiveUser({ name, online });
    setMessages(messages || []);
  };

  const sendMessage = (msg) =>
    setMessages((prev) => [...prev, { who: "me", text: msg }]);

  return (
    <ChatContext.Provider
      value={{ activeUser, selectUser, messages, sendMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};
