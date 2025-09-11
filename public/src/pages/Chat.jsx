import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useChat } from "../context/ChatContext";
import "../styles/Chat.css";

const Chat = () => {
  const textareaRef = useRef(null);
  const chatRef = useRef(null);
  const [input, setInput] = useState("");
  const { activeUser, messages, sendMessage } = useChat();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
    }
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const inputHandler = (e) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const enterHandler = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeUser?.name) {
    return (
      <div className="empty--chat">
        <p>Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="win--chat">
      <div className="top-panel--chat">
        <h3>{activeUser.name}</h3>
        <p className={activeUser.online ? "blue" : ""}>
          {activeUser.online ? "online" : "offline"}
        </p>
      </div>

      <div ref={chatRef} className="main--chat">
        {messages.map((m) => (
          <pre key={m.id || m.text} className={`msg ${m.who}`}>
            {m.text}
          </pre>
        ))}
      </div>

      <div className="bottom-panel--chat">
        <div
          className="input-field--chat"
          onClick={() => textareaRef.current?.focus()}
        >
          <textarea
            ref={textareaRef}
            name="input"
            id="input-text"
            placeholder=" "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onInput={inputHandler}
            onKeyDown={enterHandler}
          ></textarea>
          <label htmlFor="input-text">Write new message...</label>
        </div>
        <button onClick={handleSend}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
